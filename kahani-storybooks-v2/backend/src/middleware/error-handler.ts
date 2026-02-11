import type { NextFunction, Request, Response } from "express";

export function notFoundHandler(req: Request, res: Response) {
  res.status(404).json({
    error: "Not Found",
    path: req.path,
  });
}

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction,
) {
  const error = err as { message?: string; status?: number };
  const status = error.status ?? 500;

  res.status(status).json({
    error: status === 500 ? "Internal Server Error" : "Request Failed",
    message: error.message ?? "Unexpected error",
  });
}
