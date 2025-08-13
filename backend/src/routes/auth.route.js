import { Router } from "express";
import {
    loginController,
    logoutController,
    registerController,
    verifyUserMailController,
    resendVerificationEmail
} from "../controllers/auth.controller.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router()

// Authentication routes
router.post("/register", registerController)
router.post("/login", loginController)
router.post("/logout", logoutController)

// Email verification routes
router.get("/verify-email/:token", verifyUserMailController)
router.post("/resend-verification", authMiddleware, resendVerificationEmail)

export default router