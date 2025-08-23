import { Router } from "express";
import {
    createComponent,
    getAllComponents,
    getComponentById,
    updateComponent,
    deleteComponent,
} from "../controllers/components.controller.js";

import upload from "../utils/fileUpload.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

// Public routes
router.get("/", getAllComponents);
router.get("/:id", getComponentById);

// Protected routes - require authentication
router.use(authMiddleware);

router.post("/create", upload.single("code"), createComponent);
router.put("/update/:id", upload.single("code"), updateComponent);
router.delete("/delete/:id", deleteComponent);


export default router;