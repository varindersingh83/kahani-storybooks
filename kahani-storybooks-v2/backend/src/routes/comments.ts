import { Router } from "express";
import { Role } from "@prisma/client";
import { z } from "zod";

import { sendEmail } from "../lib/email.js";
import { prisma } from "../lib/prisma.js";
import { requireAuth } from "../middleware/auth.js";

const createCommentSchema = z.object({
  pageNumber: z.number().int().positive(),
  body: z.string().min(1),
});

const createReplySchema = z.object({
  body: z.string().min(1),
});

export const commentsRouter = Router();
commentsRouter.use(requireAuth);

function canModerate(role: Role) {
  return role === Role.DESIGNER || role === Role.ADMIN || role === Role.FINANCE_ADMIN;
}

commentsRouter.get("/orders/:orderId/comments", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const session = req.session!;
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: { customerId: true },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (!canModerate(session.role) && order.customerId !== session.userId) {
      return res.status(403).json({ error: "You do not have access to this order comments" });
    }

    const comments = await prisma.pageComment.findMany({
      where: { orderId },
      include: {
        user: true,
        replies: {
          include: { user: true },
          orderBy: { createdAt: "asc" },
        },
      },
      orderBy: [{ pageNumber: "asc" }, { createdAt: "asc" }],
    });

    res.status(200).json(comments);
  } catch (error) {
    next(error);
  }
});

commentsRouter.post("/orders/:orderId/comments", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const input = createCommentSchema.parse(req.body);
    const session = req.session!;
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { customer: true },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    if (!canModerate(session.role) && order.customerId !== session.userId) {
      return res.status(403).json({ error: "You do not have access to this order comments" });
    }

    const comment = await prisma.pageComment.create({
      data: {
        orderId,
        pageNumber: input.pageNumber,
        body: input.body,
        userId: session.userId,
        status: "OPEN",
      },
      include: {
        user: true,
        replies: true,
      },
    });

    if (order.customer.email && canModerate(session.role)) {
      await sendEmail({
        to: order.customer.email,
        subject: `New designer comment on order ${order.orderNumber}`,
        html: `<p>Your designer left a comment on page ${input.pageNumber} for order ${order.orderNumber}.</p>`,
      });
    }

    res.status(201).json(comment);
  } catch (error) {
    next(error);
  }
});

commentsRouter.post("/comments/:commentId/replies", async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const input = createReplySchema.parse(req.body);
    const session = req.session!;

    const comment = await prisma.pageComment.findUnique({
      where: { id: commentId },
      include: {
        user: true,
        order: {
          include: {
            customer: true,
          },
        },
      },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (!canModerate(session.role) && comment.order.customerId !== session.userId) {
      return res.status(403).json({ error: "You do not have access to this comment thread" });
    }

    const reply = await prisma.commentReply.create({
      data: {
        commentId,
        userId: session.userId,
        body: input.body,
      },
      include: { user: true },
    });

    const nextStatus = canModerate(session.role) ? "DESIGNER_REPLIED" : "CUSTOMER_REPLIED";

    await prisma.pageComment.update({
      where: { id: commentId },
      data: {
        status: nextStatus,
      },
    });

    const shouldNotifyCustomer = canModerate(session.role) && comment.order.customer.email;

    if (shouldNotifyCustomer) {
      await sendEmail({
        to: comment.order.customer.email,
        subject: `Kahani update on page ${comment.pageNumber}`,
        html: `<p>You received a designer reply on your order ${comment.order.orderNumber}.</p><p>${input.body}</p>`,
      });
    }

    res.status(201).json({
      ...reply,
      threadStatus: nextStatus,
    });
  } catch (error) {
    next(error);
  }
});

commentsRouter.post("/comments/:commentId/resolve", async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const session = req.session!;
    const existing = await prisma.pageComment.findUnique({
      where: { id: commentId },
      include: { order: { include: { customer: true } } },
    });

    if (!existing) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (!canModerate(session.role) && existing.order.customerId !== session.userId) {
      return res.status(403).json({ error: "You do not have access to this comment thread" });
    }

    const comment = await prisma.pageComment.update({
      where: { id: commentId },
      data: {
        status: "RESOLVED",
        resolvedAt: new Date(),
        resolvedByUserId: session.userId,
      },
    });

    if (existing.order.customer.email && canModerate(session.role)) {
      await sendEmail({
        to: existing.order.customer.email,
        subject: `Comment resolved on order ${existing.order.orderNumber}`,
        html: `<p>A designer marked your page ${existing.pageNumber} thread as resolved.</p>`,
      });
    }

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
});

commentsRouter.post("/comments/:commentId/reopen", async (req, res, next) => {
  try {
    const { commentId } = req.params;
    const session = req.session!;
    const existing = await prisma.pageComment.findUnique({
      where: { id: commentId },
      include: { order: true },
    });
    if (!existing) {
      return res.status(404).json({ error: "Comment not found" });
    }
    if (!canModerate(session.role) && existing.order.customerId !== session.userId) {
      return res.status(403).json({ error: "You do not have access to this comment thread" });
    }

    const comment = await prisma.pageComment.update({
      where: { id: commentId },
      data: {
        status: "REOPENED",
        resolvedAt: null,
        resolvedByUserId: null,
      },
    });

    res.status(200).json(comment);
  } catch (error) {
    next(error);
  }
});
