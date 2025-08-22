import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { updateProfile, getProfile, updateAvatar } from "../controllers/profile.controller.js";
import upload from "../utils/fileUpload.js";

const router = Router();

// Public route to get any user's profile by username - /profile/u/:username
router.get("/u/:username", getProfile);

// Protected routes (require authentication)
router.use(authMiddleware);

// Update current user's profile - /profile/update
router.patch("/update", updateProfile);

// Update current user's avatar - /profile/update/avatar
router.patch("/update/avatar", upload.single("avatar"), updateAvatar);

export default router;