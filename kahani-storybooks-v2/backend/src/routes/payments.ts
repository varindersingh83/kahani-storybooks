import { Router } from "express";
import { z } from "zod";

import { generateOrderNumber } from "../lib/order-number.js";
import { prisma } from "../lib/prisma.js";
import { stripe } from "../lib/stripe.js";

const checkoutItemSchema = z.object({
  sku: z.string().min(1),
  title: z.string().min(1),
  quantity: z.number().int().positive(),
  unitAmountCents: z.number().int().nonnegative(),
});

const createCheckoutSchema = z.object({
  orderId: z.string().min(1).optional(),
  customerEmail: z.string().email(),
  customerName: z.string().optional(),
  currency: z.string().default("usd"),
  items: z.array(checkoutItemSchema).min(1),
  successUrl: z.string().url(),
  cancelUrl: z.string().url(),
});

export const paymentsRouter = Router();

paymentsRouter.post("/checkout-session", async (req, res, next) => {
  try {
    const input = createCheckoutSchema.parse(req.body);
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

    const order = input.orderId
      ? await prisma.order.update({
          where: { id: input.orderId },
          data: {
            customerId: user.id,
            status: "PAYMENT_PENDING",
            currency: input.currency.toUpperCase(),
            subtotalAmountCents: subtotal,
            totalAmountCents: subtotal,
            items: {
              deleteMany: {},
              create: input.items.map((item) => ({
                sku: item.sku,
                title: item.title,
                quantity: item.quantity,
                unitAmountCents: item.unitAmountCents,
                lineAmountCents: item.quantity * item.unitAmountCents,
              })),
            },
          },
        })
      : await prisma.order.create({
          data: {
            orderNumber: generateOrderNumber(),
            customerId: user.id,
            status: "PAYMENT_PENDING",
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
              })),
            },
          },
        });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: input.customerEmail,
      line_items: input.items.map((item) => ({
        quantity: item.quantity,
        price_data: {
          currency: input.currency.toLowerCase(),
          unit_amount: item.unitAmountCents,
          product_data: {
            name: item.title,
          },
        },
      })),
      payment_intent_data: {
        setup_future_usage: "off_session",
        metadata: {
          orderId: order.id,
          orderNumber: order.orderNumber,
        },
      },
      metadata: {
        orderId: order.id,
        orderNumber: order.orderNumber,
      },
      success_url: input.successUrl,
      cancel_url: input.cancelUrl,
    });

    await prisma.order.update({
      where: { id: order.id },
      data: {
        stripeCheckoutSessionId: session.id,
      },
    });

    await prisma.statusHistory.create({
      data: {
        orderId: order.id,
        toStatus: "PAYMENT_PENDING",
        note: "Checkout session created",
      },
    });

    res.status(200).json({
      id: session.id,
      url: session.url,
      orderId: order.id,
      orderNumber: order.orderNumber,
    });
  } catch (error) {
    next(error);
  }
});
