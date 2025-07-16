import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt.util";

// Allow attaching `userId` to request
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export const verifyTokenMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const { userId } = await verifyToken(token);
    req.userId = userId;
    next();
  } catch (err) {
    console.error("JWT verification failed:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
