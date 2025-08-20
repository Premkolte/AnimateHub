import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { updateProfile, getProfile } from "../controllers/profile.controller.js";

const router = Router();

// Public route to get any user's profile by username - /profile/:username
router.get("/:username", getProfile);

// Protected routes (require authentication)
router.use(authMiddleware);

// Update current user's profile - /profile/update
router.patch("/update", updateProfile);

export default router;