import { Router } from "express";

import { validate } from "../middleware/validate.middleware";
import { createCategorySchema } from "../schema/category.schema";
import { createCategory, deleteCategory, getAllCategories, getCategoryById } from "../controllers/category.controller";


const router = Router();

router.post("/", validate(createCategorySchema), createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategoryById);
router.delete("/:id", deleteCategory);

export default router;
