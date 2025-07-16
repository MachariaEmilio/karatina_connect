import { Request, Response, NextFunction } from "express";
import prisma from "../prisma";


export const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await prisma.category.create({
      data: req.body,
    });
    res.status(201).json({ status: "success", data: category });
  } catch (err) {
    next(err);
  }
};

export const getAllCategories = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await prisma.category.findMany();
    res.status(200).json({ status: "success", data: categories });
  } catch (err) {
    next(err);
  }
};

export const getCategoryById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const category = await prisma.category.findUnique({
      where: { id: req.params.id },
    });

    if (!category) {
      return res
        .status(404)
        .json({ status: "error", message: "Category not found" });
    }

    res.status(200).json({ status: "success", data: category });
  } catch (err) {
    next(err);
  }
};

export const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await prisma.category.delete({
      where: { id: req.params.id },
    });

    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
