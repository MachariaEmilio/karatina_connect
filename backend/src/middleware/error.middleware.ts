import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import logger from "../utils/Logger";


export const errorHandler = (
  err: AppError | Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err instanceof AppError ? err.statusCode : 500;
  const message =
    err instanceof AppError ? err.message : "Internal Server Error";

  logger.error(`${req.method} ${req.originalUrl} - ${message}`);

  res.status(statusCode).json({
    status: "error",
    message,
    ...(process.env.NODE_ENV !== "production" && { stack: err.stack }),
  });
};
