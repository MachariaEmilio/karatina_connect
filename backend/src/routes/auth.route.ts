import express from "express";
import { loginUser, registerUser, getMe } from "../controllers/auth.controller";
import { verifyToken } from "../utils/jwt.util";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", verifyToken, getMe);

export default router;
