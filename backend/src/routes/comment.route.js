import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { addComment ,deleteComment ,updateComment, 
  getAllCommentsOnPost } from "../controllers/comment.controller.js";
const router = Router()

router.get("/:blogId", getAllCommentsOnPost);

// secured routes
router.post("/:blogId",authMiddleware,addComment)
router.delete(":blogId/delete/:commentId",authMiddleware,deleteComment)
router.put("/:blogId/update/:commentId", authMiddleware, updateComment);



export default router