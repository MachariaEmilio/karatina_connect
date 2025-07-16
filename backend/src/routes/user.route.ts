import { Router } from "express";
import { createUser } from "../controllers/user.controller";
import { validate } from "../middleware/validate.middleware";
import { createUserSchema } from "../validators/user.validator";

const router = Router();

router.post("/", validate(createUserSchema), createUser);

export default router;
