import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { signToken } from "../utils/jwt.util";
import prisma from "../prisma";

export const registerUser = async (req: Request, res: Response) => {
  const { name, email, password, location } = req.body;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing)
    return res.status(400).json({ message: "Email already in use" });

  const hashed = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: { name, email, password: hashed, location },
  });

  res.status(201).json({ message: "User registered", user });
};

export const loginUser = async (req: Request, res: Response) => {

  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user.id);

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err });
  }
};

export const getMe = async (req: Request, res: Response) => {
  // `req.userId` is added by the auth middleware
  const user = await prisma.user.findUnique({ where: { id: req.userId } });
  res.json({ user });
};
