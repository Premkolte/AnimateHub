import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createBlog } from "../controllers/blog.controller.js";
import upload from "../utils/fileUpload.js";
const router=Router()




router.post("/create",authMiddleware,upload.single("blog-image"),createBlog)
export default router