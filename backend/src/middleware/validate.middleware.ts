import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../utils/AppError";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: any) {
      const issues = error.errors?.map((err: any) => err.message).join(", ");
      next(new AppError(`Validation error: ${issues}`, 400));
    }
  };
