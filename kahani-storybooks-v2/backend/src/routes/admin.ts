import { Router } from "express";
import { z } from "zod";

import { sendEmail } from "../lib/email.js";
import { prisma } from "../lib/prisma.js";
import { stripe } from "../lib/stripe.js";
import { requireAdmin } from "../middleware/auth.js";

const listOrdersQuerySchema = z.object({
  q: z.string().optional(),
  status: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(100).default(50),
});

const applyDiscountSchema = z
  .object({
    code: z.string().optional(),
    reason: z.string().optional(),
    discountType: z.enum(["fixed", "percent"]),
    value: z.number().positive().max(10000),
  })
  .superRefine((value, ctx) => {
    if (value.discountType === "percent" && value.value > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["value"],
        message: "Percent discount must be less than or equal to 100",
      });
    }
  });

const refundSchema = z.object({
  amountCents: z.number().int().positive().optional(),
  reason: z.string().optional(),
});

export const adminRouter = Router();
adminRouter.use(requireAdmin);

adminRouter.get("/orders", async (req, res, next) => {
  try {
    const query = listOrdersQuerySchema.parse(req.query);
    const status = query.status;
    const q = query.q?.trim() ?? "";
    const skip = (query.page - 1) * query.pageSize;

    const where = {
      ...(status ? { status: status as any } : {}),
      ...(q
        ? {
            OR: [
              { orderNumber: { contains: q, mode: "insensitive" as const } },
              { customer: { email: { contains: q, mode: "insensitive" as const } } },
            ],
          }
        : {}),
    };

    const [orders, total] = await prisma.$transaction([
      prisma.order.findMany({
        where,
        include: {
          customer: {
            select: { email: true, name: true },
          },
          refunds: true,
          discounts: true,
        },
        orderBy: { createdAt: "desc" },
        skip,
        take: query.pageSize,
      }),
      prisma.order.count({ where }),
    ]);

    res.status(200).json({
      orders,
      pagination: {
        page: query.page,
        pageSize: query.pageSize,
        total,
        totalPages: Math.max(1, Math.ceil(total / query.pageSize)),
      },
    });
  } catch (error) {
    next(error);
  }
});

adminRouter.get("/orders/:orderId/audit", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
      include: {
        customer: {
          select: { email: true, name: true },
        },
        statusHistory: {
          include: {
            changedBy: {
              select: { id: true, email: true, role: true },
            },
          },
          orderBy: { createdAt: "desc" },
        },
        comments: {
          include: {
            user: { select: { id: true, email: true, role: true } },
            replies: {
              include: {
                user: { select: { id: true, email: true, role: true } },
              },
              orderBy: { createdAt: "asc" },
            },
          },
          orderBy: [{ pageNumber: "asc" }, { createdAt: "asc" }],
        },
        payments: {
          orderBy: { createdAt: "desc" },
        },
        refunds: true,
        discounts: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json({ order });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/orders/:orderId/discounts", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const input = applyDiscountSchema.parse(req.body);
    const admin = req.session
      ? await prisma.user.findUnique({ where: { id: req.session.userId } })
      : null;
    if (!admin) {
      return res.status(401).json({ error: "Admin session not found" });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: { customer: true },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    if (order.status !== "DRAFT" && order.status !== "PAYMENT_PENDING") {
      return res.status(400).json({
        error: "Discount can only be applied before payment is completed",
        status: order.status,
      });
    }

    const baseAmount = order.subtotalAmountCents + order.shippingAmountCents;
    const discountAmountCents =
      input.discountType === "fixed"
        ? Math.round(input.value)
        : Math.round((baseAmount * input.value) / 100);
    const boundedDiscount = Math.max(0, Math.min(discountAmountCents, baseAmount));
    const newTotal = Math.max(0, baseAmount - boundedDiscount);

    await prisma.$transaction([
      prisma.discount.create({
        data: {
          orderId,
          code: input.code,
          reason: input.reason,
          amountCents: boundedDiscount,
          createdByUserId: admin.id,
        },
      }),
      prisma.order.update({
        where: { id: orderId },
        data: {
          discountAmountCents: boundedDiscount,
          totalAmountCents: newTotal,
        },
      }),
      prisma.statusHistory.create({
        data: {
          orderId,
          fromStatus: order.status,
          toStatus: order.status,
          changedById: admin.id,
          note: `Discount applied (${input.discountType}: ${input.value})`,
        },
      }),
    ]);

    res.status(200).json({
      orderId,
      discountAmountCents: boundedDiscount,
      totalAmountCents: newTotal,
    });
  } catch (error) {
    next(error);
  }
});

adminRouter.post("/orders/:orderId/refunds", async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const input = refundSchema.parse(req.body);
    const admin = req.session
      ? await prisma.user.findUnique({ where: { id: req.session.userId } })
      : null;
    if (!admin) {
      return res.status(401).json({ error: "Admin session not found" });
    }

    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        customer: true,
        payments: true,
        refunds: true,
      },
    });

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    const successfulPayments = order.payments.filter(
      (payment) => payment.status === "succeeded" && payment.stripePaymentIntentId,
    );
    if (successfulPayments.length === 0) {
      return res.status(400).json({ error: "No successful payment found for this order" });
    }

    const totalPaid = successfulPayments.reduce((sum, payment) => sum + payment.amountCents, 0);
    const totalRefunded = order.refunds.reduce((sum, refund) => sum + refund.amountCents, 0);
    const maxRefundable = totalPaid - totalRefunded;

    if (maxRefundable <= 0) {
      return res.status(400).json({ error: "Order is already fully refunded" });
    }

    const refundAmount = input.amountCents ?? maxRefundable;
    if (refundAmount > maxRefundable) {
      return res.status(400).json({
        error: "Requested refund exceeds refundable balance",
        maxRefundable,
      });
    }

    const paymentForRefund = successfulPayments[successfulPayments.length - 1];
    const stripeRefund = await stripe.refunds.create({
      payment_intent: paymentForRefund.stripePaymentIntentId!,
      amount: refundAmount,
      metadata: {
        orderId,
        orderNumber: order.orderNumber,
        adminEmail: admin.email,
        note: input.reason ?? "",
      },
    });

    const nextTotalRefunded = totalRefunded + refundAmount;
    const nextStatus = nextTotalRefunded >= totalPaid ? "REFUNDED_FULL" : "REFUNDED_PARTIAL";

    await prisma.$transaction([
      prisma.refund.create({
        data: {
          orderId,
          stripeRefundId: stripeRefund.id,
          amountCents: refundAmount,
          reason: input.reason,
          createdByUserId: admin.id,
        },
      }),
      prisma.order.update({
        where: { id: orderId },
        data: { status: nextStatus },
      }),
      prisma.statusHistory.create({
        data: {
          orderId,
          fromStatus: order.status,
          toStatus: nextStatus,
          changedById: admin.id,
          note: `Refund issued (${refundAmount} cents)`,
        },
      }),
    ]);

    if (order.customer.email) {
      await sendEmail({
        to: order.customer.email,
        subject: `Refund processed for order ${order.orderNumber}`,
        html: `<p>A refund of $${(refundAmount / 100).toFixed(2)} has been issued for order ${order.orderNumber}.</p>`,
      });
    }

    res.status(200).json({
      orderId,
      stripeRefundId: stripeRefund.id,
      amountCents: refundAmount,
      status: nextStatus,
    });
  } catch (error) {
    next(error);
  }
});
