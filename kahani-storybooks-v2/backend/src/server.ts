import cors from "cors";
import express from "express";

import { env } from "./config/env.js";
import { attachSession } from "./middleware/auth.js";
import { errorHandler, notFoundHandler } from "./middleware/error-handler.js";
import { adminRouter } from "./routes/admin.js";
import { authRouter } from "./routes/auth.js";
import { commentsRouter } from "./routes/comments.js";
import { healthRouter } from "./routes/health.js";
import { ordersRouter } from "./routes/orders.js";
import { paymentsRouter } from "./routes/payments.js";
import { webhooksRouter } from "./routes/webhooks.js";

const app = express();

const allowedOrigins = [
  env.FRONTEND_URL,
  ...(env.FRONTEND_URLS ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean),
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin not allowed by CORS"));
    },
    credentials: true,
  }),
);
app.use(attachSession);

app.get("/", (_req, res) => {
  res.status(200).json({
    service: "kahani-v2-backend",
    docs: "/health",
  });
});

// Stripe webhook requires raw body for signature verification.
app.use("/webhooks/stripe", express.raw({ type: "application/json" }));
app.use("/webhooks", webhooksRouter);

app.use(express.json());

app.use("/health", healthRouter);
app.use("/api/auth", authRouter);
app.use("/api/admin", adminRouter);
app.use("/api/orders", ordersRouter);
app.use("/api/payments", paymentsRouter);
app.use("/api", commentsRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.PORT, () => {
  console.log(`Kahani v2 backend listening on http://localhost:${env.PORT}`);
});
