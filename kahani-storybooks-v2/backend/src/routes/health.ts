import { Router } from "express";

import { prisma } from "../lib/prisma.js";
import { stripe } from "../lib/stripe.js";

export const healthRouter = Router();

healthRouter.get("/", async (_req, res) => {
  const result = {
    ok: true,
    service: "kahani-v2-backend",
    timestamp: new Date().toISOString(),
    checks: {
      db: "unknown" as "ok" | "error" | "unknown",
      stripe: "unknown" as "ok" | "error" | "unknown",
    },
  };

  try {
    await prisma.$queryRaw`SELECT 1`;
    result.checks.db = "ok";
  } catch {
    result.checks.db = "error";
    result.ok = false;
  }

  try {
    await stripe.accounts.retrieve();
    result.checks.stripe = "ok";
  } catch {
    result.checks.stripe = "error";
    result.ok = false;
  }

  res.status(result.ok ? 200 : 503).json(result);
});
