import { Router } from "express";


// -------- Middleware
import authMiddleware from "../middlewares/auth.middleware.js";
import adminMiddleware from "../middlewares/admin.middleware.js";
import { approveComponentController, getAllPendingComponents, rejectComponentController } from "../controllers/admin.controller.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const router = Router()

router.use(authMiddleware)
router.use(adminMiddleware)


// ~--------------------- ROUTES

// check if user is admin 
router.get("/check", (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, "You are an admin"))
})

// Get all pending components
router.get("/pending-components", getAllPendingComponents)


// ------------ TO MANAGE COMPONENTS
// Approve a component
router.put("/approve-component/:id", approveComponentController)

// Reject a component
router.put("/reject-component/:id", rejectComponentController)




export default router