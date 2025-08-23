import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { updateProfile, getProfile, updateAvatar } from "../controllers/profile.controller.js";
import { getPendingComponentsOfLoggedInUser, getRejectedComponentsOfLoggedInUser } from "../controllers/components.controller.js";
import upload from "../utils/fileUpload.js";

const router = Router();
// Protected routes (require authentication)
router.use(authMiddleware);

// Public route to get any user's profile by username - /profile/u/:username
router.get("/u/:username", getProfile);

// Update current user's profile - /profile/update
router.patch("/update", updateProfile);

// Update current user's avatar - /profile/update/avatar
router.patch("/update/avatar", upload.single("avatar"), updateAvatar);

// Get current user's pending componenets
router.get("/pending-components", getPendingComponentsOfLoggedInUser);

// Get current user's rejected componenets
router.get("/rejected-components", getRejectedComponentsOfLoggedInUser);

export default router;