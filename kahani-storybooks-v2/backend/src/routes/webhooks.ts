import { Router } from "express";
import Stripe from "stripe";

import { env } from "../config/env.js";
import { sendEmail } from "../lib/email.js";
import { prisma } from "../lib/prisma.js";
import { stripe } from "../lib/stripe.js";

export const webhooksRouter = Router();

async function recordStatusChange(orderId: string, toStatus: "PAID" | "PAYMENT_PENDING") {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
    select: { status: true },
  });

  if (!order) {
    return;
  }

  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: toStatus,
      previewUnlockedAt: toStatus === "PAID" ? new Date() : undefined,
    },
  });

  await prisma.statusHistory.create({
    data: {
      orderId,
      fromStatus: order.status,
      toStatus,
      note: `Updated from Stripe webhook to ${toStatus}`,
    },
  });
}

webhooksRouter.post("/stripe", async (req, res, next) => {
  try {
    if (!env.STRIPE_WEBHOOK_SECRET) {
      return res.status(400).json({ error: "STRIPE_WEBHOOK_SECRET is not configured" });
    }

    const signature = req.headers["stripe-signature"];
    if (!signature || Array.isArray(signature)) {
      return res.status(400).json({ error: "Missing Stripe signature header" });
    }

    const event = stripe.webhooks.constructEvent(
      req.body,
      signature,
      env.STRIPE_WEBHOOK_SECRET,
    );

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;
      const orderId = session.metadata?.orderId;

      if (orderId) {
        await recordStatusChange(orderId, "PAID");

        const amountCents = session.amount_total ?? 0;
        const intentId =
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id;

        await prisma.payment.upsert({
          where: {
            stripePaymentIntentId: intentId ?? `missing-${session.id}`,
          },
          update: {
            status: "succeeded",
            amountCents,
            currency: (session.currency ?? "usd").toUpperCase(),
            eventType: event.type,
            metadata: JSON.parse(JSON.stringify(session)),
          },
          create: {
            orderId,
            stripePaymentIntentId: intentId ?? undefined,
            amountCents,
            currency: (session.currency ?? "usd").toUpperCase(),
            status: "succeeded",
            eventType: event.type,
            metadata: JSON.parse(JSON.stringify(session)),
          },
        });

        const order = await prisma.order.findUnique({
          where: { id: orderId },
          include: { customer: true },
        });

        if (order?.customer.email) {
          await sendEmail({
            to: order.customer.email,
            subject: `Your Kahani receipt (${order.orderNumber})`,
            html: `<p>Thanks for your order!</p><p>Order: ${order.orderNumber}</p><p>Amount paid: $${(amountCents / 100).toFixed(2)}</p>`,
          });
        }
      }
    }

    if (event.type === "payment_intent.payment_failed") {
      const intent = event.data.object as Stripe.PaymentIntent;
      const orderId = intent.metadata?.orderId;

      if (orderId) {
        await recordStatusChange(orderId, "PAYMENT_PENDING");
        await prisma.payment.create({
          data: {
            orderId,
            stripePaymentIntentId: intent.id,
            amountCents: intent.amount,
            currency: intent.currency.toUpperCase(),
            status: "failed",
            eventType: event.type,
            metadata: JSON.parse(JSON.stringify(intent)),
          },
        });
      }
    }

    res.status(200).json({ received: true });
  } catch (error) {
    next(error);
  }
});
