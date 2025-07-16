import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { AppError } from "../utils/AppError";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return next(new AppError("Email already exists", 400));

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password, // in production: hash this!
      },
    });

    res.status(201).json({ status: "success", data: user });
  } catch (err) {
    next(err);
  }
};
