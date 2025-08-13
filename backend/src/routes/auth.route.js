import { Router } from "express";
import {
    getCurrentUserController,
    loginController,
    logoutController,
    registerController,
    updatePasswordController
} from "../controllers/auth.controller.js";

import { verifyUserMailController, resendVerificationEmail } from "../controllers/user.controller.js";

import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router()

// Authentication routes
router.post("/register", registerController)
router.post("/login", loginController)
router.post("/logout", logoutController)
router.get("/check", authMiddleware, getCurrentUserController)

// Email verification routes
router.get("/verify-email/:token", verifyUserMailController)
router.post("/resend-verification", authMiddleware, resendVerificationEmail)
router.post("/update-password", authMiddleware, updatePasswordController)

export default router