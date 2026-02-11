import { Router } from "express";
import { Role } from "@prisma/client";

import { env } from "../config/env.js";
import { prisma } from "../lib/prisma.js";
import { createSessionToken } from "../lib/session.js";
import { requireAuth } from "../middleware/auth.js";

const bootstrapEmails = new Set(
  (env.ADMIN_BOOTSTRAP_EMAILS ?? "")
    .split(",")
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean),
);

export const authRouter = Router();

function backendBaseUrl() {
  return env.BACKEND_PUBLIC_URL ?? `http://localhost:${env.PORT}`;
}

authRouter.get("/google/start", (req, res) => {
  if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
    return res.status(400).json({ error: "Google OAuth is not configured" });
  }

  const returnTo = typeof req.query.returnTo === "string" ? req.query.returnTo : "/#/"; // hash route
  const state = Buffer.from(JSON.stringify({ returnTo })).toString("base64url");
  const redirectUri = `${backendBaseUrl()}/api/auth/google/callback`;

  const params = new URLSearchParams({
    client_id: env.GOOGLE_CLIENT_ID,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "openid email profile",
    access_type: "offline",
    prompt: "consent",
    state,
  });

  res.redirect(`https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`);
});

authRouter.get("/google/callback", async (req, res) => {
  try {
    const code = typeof req.query.code === "string" ? req.query.code : "";
    const state = typeof req.query.state === "string" ? req.query.state : "";
    const redirectUri = `${backendBaseUrl()}/api/auth/google/callback`;

    if (!code || !env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET) {
      return res.redirect(`${env.FRONTEND_URL}/#/auth/callback?status=error`);
    }

    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: env.GOOGLE_CLIENT_ID,
        client_secret: env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri,
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) {
      return res.redirect(`${env.FRONTEND_URL}/#/auth/callback?status=error`);
    }

    const tokenJson = (await tokenResponse.json()) as {
      access_token: string;
      id_token?: string;
    };

    const profileResponse = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: { Authorization: `Bearer ${tokenJson.access_token}` },
    });

    if (!profileResponse.ok) {
      return res.redirect(`${env.FRONTEND_URL}/#/auth/callback?status=error`);
    }

    const profile = (await profileResponse.json()) as {
      sub: string;
      email: string;
      name?: string;
    };

    const email = profile.email.toLowerCase();
    const role = bootstrapEmails.has(email) ? Role.ADMIN : Role.CUSTOMER;
    const user = await prisma.user.upsert({
      where: { email },
      update: {
        googleSub: profile.sub,
        name: profile.name,
      },
      create: {
        email,
        googleSub: profile.sub,
        name: profile.name,
        role,
      },
    });

    const token = createSessionToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.setHeader(
      "Set-Cookie",
      `kahani_session=${token}; HttpOnly; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Lax`,
    );

    let returnTo = "/#/";
    if (state) {
      try {
        const decoded = JSON.parse(Buffer.from(state, "base64url").toString("utf8")) as { returnTo?: string };
        if (decoded.returnTo) returnTo = decoded.returnTo;
      } catch {
        // keep default
      }
    }

    res.redirect(`${env.FRONTEND_URL}${returnTo}`);
  } catch {
    res.redirect(`${env.FRONTEND_URL}/#/auth/callback?status=error`);
  }
});

authRouter.get("/me", requireAuth, async (req, res) => {
  const user = await prisma.user.findUnique({
    where: { id: req.session!.userId },
    select: {
      id: true,
      email: true,
      name: true,
      role: true,
    },
  });

  res.status(200).json({ user });
});

authRouter.post("/logout", (_req, res) => {
  res.setHeader(
    "Set-Cookie",
    "kahani_session=; HttpOnly; Path=/; Max-Age=0; SameSite=Lax",
  );
  res.status(200).json({ ok: true });
});
