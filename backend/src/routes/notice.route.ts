// src/routes/notice.route.ts
import { Router } from "express";
import { createNotice, getNotices } from "../controllers/notice.controller";
import { validate } from "../middleware/validate.middleware";
import { createNoticeSchema } from "../validators/notice.validator";

const router = Router();

router.get("/", getNotices);
router.post("/", validate(createNoticeSchema), createNotice);


export default router;
