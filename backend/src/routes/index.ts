import { Router } from "express";
import noticeRoutes from "./notice.route";
import userRoutes from "./user.route";
import categoryRoutes from "./category.route";
import authRoute from "./auth.route";

const router = Router();
router.use("/auth", authRoute);

router.use("/notices", noticeRoutes);
router.use("/users", userRoutes);
router.use("/categories", categoryRoutes);

export default router;
