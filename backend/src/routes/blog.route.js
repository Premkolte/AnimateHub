import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createBlog, getBlogById, deleteBlog } from "../controllers/blog.controller.js";
import upload from "../utils/fileUpload.js";
const router = Router()



router.post("/create", authMiddleware, upload.single("blog-image"), createBlog)
router.get("/:id", authMiddleware, getBlogById)
router.delete("/:id", authMiddleware, deleteBlog)
export default router