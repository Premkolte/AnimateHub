import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { addComment ,deleteComment} from "../controllers/comment.controller.js";
const router = Router()
router.post("/:blogId",authMiddleware,addComment)
router.delete(":blogId/delete/:commentId",authMiddleware,deleteComment)


export default router