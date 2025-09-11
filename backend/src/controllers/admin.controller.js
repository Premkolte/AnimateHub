import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Component from "../models/components.model.js";
import { uploadFileToGitHub } from "../functions/uploadFileToGithub.js";

// Admin - Get all pending components
export const getAllPendingComponents = asyncHandler(async (req, res) => {
    const components = await Component.find({ status: "pending" })
        .select("name description category");

    return res.status(200).json(
        new ApiResponse(200, "Components retrieved successfully", components)
    );
});

// Admin - Approve a component
export const approveComponentController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const component = await Component.findById(id);

    if (!component) throw new ApiError(404, "Component not found");

    component.status = "approved";

    const { success, message, data } = await uploadFileToGitHub(
        component.category,
        component.name,
        component.code
    );

    if (!success) throw new ApiError(500, message, data);

    component.repoLink = data.content.html_url;
    component.code = undefined;
    component.approvedBy = req.user._id;

    await component.save();

    return res.status(200).json(
        new ApiResponse(200, "Component approved successfully")
    );
});

// Admin - Reject a component
export const rejectComponentController = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const component = await Component.findById(id);

    if (!component) throw new ApiError(404, "Component not found");

    component.status = "rejected";
    await component.save();

    return res.status(200).json(
        new ApiResponse(200, "Component rejected successfully")
    );
});
