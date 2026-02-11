import { Router } from "express";
import { Role } from "@prisma/client";
import { z } from "zod";

import { generateOrderNumber } from "../lib/order-number.js";
import { sendEmail } from "../lib/email.js";
import { prisma } from "../lib/prisma.js";

const lineItemSchema = z.object({
  sku: z.string().min(1),
  title: z.string().min(1),
  quantity: z.number().int().positive(),
  unitAmountCents: z.number().int().nonnegative(),
  metadata: z.record(z.any()).optional(),
});

const createDraftSchema = z.object({
  customerEmail: z.string().email(),
  customerName: z.string().optional(),
  currency: z.string().default("USD"),
  items: z.array(lineItemSchema).min(1),
});

export const ordersRouter = Router();

ordersRouter.get("/:orderId", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      select: {
        id: true,
        orderNumber: true,
        status: true,
        previewUnlockedAt: true,
        totalAmountCents: true,
        createdAt: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/draft", async (req, res, next) => {
  try {
    const input = createDraftSchema.parse(req.body);
    const subtotal = input.items.reduce(
      (sum, item) => sum + item.quantity * item.unitAmountCents,
      0,
    );

    const user = await prisma.user.upsert({
      where: { email: input.customerEmail },
      update: {
        name: input.customerName ?? undefined,
      },
      create: {
        email: input.customerEmail,
        name: input.customerName,
      },
    });

    const order = await prisma.order.create({
      data: {
        orderNumber: generateOrderNumber(),
        customerId: user.id,
        status: "DRAFT",
        currency: input.currency.toUpperCase(),
        subtotalAmountCents: subtotal,
        totalAmountCents: subtotal,
        items: {
          create: input.items.map((item) => ({
            sku: item.sku,
            title: item.title,
            quantity: item.quantity,
            unitAmountCents: item.unitAmountCents,
            lineAmountCents: item.quantity * item.unitAmountCents,
            metadata: item.metadata,
          })),
        },
      },
    });

    await prisma.statusHistory.create({
      data: {
        orderId: order.id,
        toStatus: "DRAFT",
        note: "Draft order created",
      },
    });

    res.status(201).json({
      orderId: order.id,
      orderNumber: order.orderNumber,
      status: order.status,
    });
  } catch (error) {
    next(error);
  }
});

ordersRouter.post("/:orderId/approve", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const session = req.session;
    if (!session) {
      return res.status(401).json({ error: "Authentication required" });
    }

    const orderForAccess = await prisma.order.findUnique({
      where: { id: orderId },
      include: { customer: true },
    });
    if (!orderForAccess) {
      return res.status(404).json({ error: "Order not found" });
    }
    const isModerator =
      session.role === Role.DESIGNER ||
      session.role === Role.ADMIN ||
      session.role === Role.FINANCE_ADMIN;
    if (!isModerator && orderForAccess.customerId !== session.userId) {
      return res.status(403).json({ error: "You do not have access to this order" });
    }

    const unresolvedCount = await prisma.pageComment.count({
      where: {
        orderId,
        status: {
          in: ["OPEN", "DESIGNER_REPLIED", "CUSTOMER_REPLIED", "REOPENED"],
        },
      },
    });

    if (unresolvedCount > 0) {
      return res.status(400).json({
        error: "Cannot approve order while comments are unresolved",
        unresolvedCount,
      });
    }

    const before = orderForAccess;

    const order = await prisma.order.update({
      where: { id: orderId },
      data: {
        status: "APPROVED_BY_CUSTOMER",
        approvedAt: new Date(),
      },
      select: {
        id: true,
        orderNumber: true,
        status: true,
        approvedAt: true,
      },
    });

    await prisma.statusHistory.create({
      data: {
          orderId,
          fromStatus: before.status,
          toStatus: "APPROVED_BY_CUSTOMER",
          changedById: session.userId,
          note: "Approved by customer after all comment threads were resolved",
      },
    });

    if (before.customer.email) {
      await sendEmail({
        to: before.customer.email,
        subject: `Order ${before.orderNumber} approved`,
        html: `<p>Your order ${before.orderNumber} is approved and ready for production.</p>`,
      });
    }

    res.status(200).json(order);
  } catch (error) {
    next(error);
  }
});
