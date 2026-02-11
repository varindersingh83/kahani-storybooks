import type { NextFunction, Request, Response } from "express";
import { Role } from "@prisma/client";

import { parseCookies, verifySessionToken, type SessionPayload } from "../lib/session.js";

declare module "express-serve-static-core" {
  interface Request {
    session?: SessionPayload;
  }
}

export function attachSession(req: Request, _res: Response, next: NextFunction) {
  const cookies = parseCookies(req.headers.cookie);
  const token = cookies.kahani_session;
  if (token) {
    const payload = verifySessionToken(token);
    if (payload) {
      req.session = payload;
    }
  }
  next();
}

export function requireAuth(req: Request, res: Response, next: NextFunction) {
  if (!req.session) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}

export function requireAdmin(req: Request, res: Response, next: NextFunction) {
  if (!req.session) {
    return res.status(401).json({ error: "Authentication required" });
  }

  if (req.session.role !== Role.ADMIN && req.session.role !== Role.FINANCE_ADMIN) {
    return res.status(403).json({ error: "Admin role required" });
  }

  next();
}
