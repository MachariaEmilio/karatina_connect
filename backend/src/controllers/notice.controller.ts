// src/controllers/notice.controller.ts
import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";

export const getNotices = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const notices = await prisma.notice.findMany();
    res.json({ status: "success", data: notices });
  } catch (err) {
    next(err);
  }
};

export const createNotice = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      title,
      content,
      userId,
      categoryId,
      location,
      images,
      expiresAt,
      isPinned,
    } = req.body;

    const notice = await prisma.notice.create({
      data: {
        title,
        content,
        location,
        images,
        expiresAt: expiresAt ? new Date(expiresAt) : null,
        isPinned: isPinned ?? false,
        user: { connect: { id: userId } },
        category: { connect: { id: categoryId } },
      },
    });

    res.status(201).json({ status: "success", data: notice });
  } catch (err) {
    next(err);
  }
};
