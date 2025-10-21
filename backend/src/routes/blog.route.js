import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { createBlog, getBlogById, deleteBlog ,getUserBlogs,updateBlogById,getBlogs,getBlogStats} from "../controllers/blog.controller.js";
import upload from "../utils/fileUpload.js";
const router = Router()

router.get("/", getBlogs);                    // Get paginated blogs with filters
router.get("/stats", getBlogStats);       

router.post("/create", authMiddleware, upload.single("blog-image"), createBlog)
router.get("/:id", authMiddleware, getBlogById)
router.delete("/:id", authMiddleware, deleteBlog)
router.get("/user", authMiddleware, getUserBlogs);
router.put("/:id", authMiddleware, upload.single("blog-image"), updateBlogById);

export default router