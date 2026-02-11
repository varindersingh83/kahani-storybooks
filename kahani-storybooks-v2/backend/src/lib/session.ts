import crypto from "node:crypto";

import type { Role } from "@prisma/client";

import { env } from "../config/env.js";

export type SessionPayload = {
  userId: string;
  email: string;
  role: Role;
  exp: number;
};

function b64url(input: string) {
  return Buffer.from(input).toString("base64url");
}

function signData(data: string) {
  return crypto.createHmac("sha256", env.AUTH_SESSION_SECRET).update(data).digest("base64url");
}

export function createSessionToken(payload: Omit<SessionPayload, "exp">, maxAgeSeconds = 60 * 60 * 24 * 7) {
  const exp = Math.floor(Date.now() / 1000) + maxAgeSeconds;
  const fullPayload: SessionPayload = { ...payload, exp };
  const payloadEncoded = b64url(JSON.stringify(fullPayload));
  const signature = signData(payloadEncoded);
  return `${payloadEncoded}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  const [payloadEncoded, signature] = token.split(".");
  if (!payloadEncoded || !signature) {
    return null;
  }

  const expected = signData(payloadEncoded);
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expected))) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(payloadEncoded, "base64url").toString("utf8")) as SessionPayload;
    if (!payload.exp || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function parseCookies(cookieHeader?: string) {
  const cookies: Record<string, string> = {};
  if (!cookieHeader) return cookies;

  const parts = cookieHeader.split(";");
  for (const part of parts) {
    const [key, ...rest] = part.trim().split("=");
    if (!key) continue;
    cookies[key] = decodeURIComponent(rest.join("="));
  }

  return cookies;
}
