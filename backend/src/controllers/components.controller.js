import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

import Component from "../models/components.model.js";
import User from "../models/user.model.js";

// ---------- Utility Functions ----------

/**
 * Read uploaded file content as UTF-8 text
 */
const readCodeFile = (file) => {
    if (!file?.buffer) {
        throw new ApiError(400, "Invalid or missing file buffer");
    }
    try {
        return file.buffer.toString("utf-8");
    } catch {
        throw new ApiError(400, "Error reading the uploaded file");
    }
};

/**
 * Ensure user is owner of the component or an admin
 */
const checkOwnershipOrAdmin = (component, userId, isAdmin, action) => {
    const isOwner = component.submittedBy.toString() === userId.toString();
    if (!isOwner && !isAdmin) {
        throw new ApiError(403, `Not authorized to ${action} this component`);
    }
};

/**
 * Build query for component retrieval
 */
const buildComponentQuery = ({ category, status, search }) => {
    const query = {};
    if (category) query.category = category;
    if (status) query.status = status;
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: "i" } },
            { description: { $regex: search, $options: "i" } },
            { tags: { $in: [new RegExp(search, "i")] } },
        ];
    }
    return query;
};

// ---------- Controller Functions ----------

// Create a new component - only logged-in users
export const createComponent = asyncHandler(async (req, res) => {
    const { name, description, tags, category } = req.body;
    const codeFile = req.file;
    const submittedBy = req.user?._id;

    if (!name || !description || !category) {
        throw new ApiError(400, "Name, description, and category are required");
    }
    if (!codeFile) {
        throw new ApiError(400, "Code file is required");
    }

    const existingComponent = await Component.findOne({ name });
    if (existingComponent) {
        throw new ApiError(400, "Component with this name already exists");
    }

    const code = readCodeFile(codeFile);

    await Component.create({
        name,
        description,
        code,
        tags,
        category,
        submittedBy,
        status: "pending",
    });

    return res
        .status(201)
        .json(new ApiResponse(201, "Component created and pending admin approval"));
});

// Get all components - public
export const getAllComponents = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10 } = req.query;

    const query = buildComponentQuery(req.query);
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 },
        populate: [
            { path: "submittedBy", select: "username avatarUrl" },
            { path: "approvedBy", select: "username" },
        ],
    };

    const components = await Component.paginate(query, options);
    return res
        .status(200)
        .json(new ApiResponse(200, "Components retrieved successfully", components));
});

// Get single component by ID - public
export const getComponentById = asyncHandler(async (req, res) => {
    const component = await Component.findById(req.params.id)
        .populate("submittedBy", "username avatarUrl")
        .populate("approvedBy", "username");

    if (!component) {
        throw new ApiError(404, "Component not found");
    }

    return res
        .status(200)
        .json(new ApiResponse(200, "Component retrieved successfully", component));
});

// Update component - private (owner or admin)
export const updateComponent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, tags, category } = req.body;
    const codeFile = req.file;
    const userId = req.user?._id;
    const isAdmin = req.user?.role === "admin";

    const component = await Component.findById(id);
    if (!component) {
        throw new ApiError(404, "Component not found");
    }

    checkOwnershipOrAdmin(component, userId, isAdmin, "update");

    if (name && name !== component.name) {
        const existingComponent = await Component.findOne({ name });
        if (existingComponent) {
            throw new ApiError(400, "Component with this name already exists");
        }
    }

    const updateData = {
        ...(name && { name }),
        ...(description && { description }),
        ...(tags && { tags }),
        ...(category && { category }),
        ...(codeFile && { code: readCodeFile(codeFile) }),
    };

    const updatedComponent = await Component.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );

    return res
        .status(200)
        .json(new ApiResponse(200, "Component updated successfully", updatedComponent));
});

// Delete component - private (owner or admin)
export const deleteComponent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?._id;
    const isAdmin = req.user?.role === "admin";

    const component = await Component.findById(id);
    if (!component) {
        throw new ApiError(404, "Component not found");
    }

    checkOwnershipOrAdmin(component, userId, isAdmin, "delete");

    await Component.findByIdAndDelete(id);

    return res
        .status(200)
        .json(new ApiResponse(200, "Component deleted successfully"));
});

// Get approved components of a given user (public)
export const getApprovedComponentsOfLoggedInUser = asyncHandler(async (req, res) => {
    const { username } = req.params;
    const user = await User.findOne({ username }).select("_id").lean();

    if (!user) {
        throw new ApiError(
            404,
            "No user found with this username, please refresh the page or try later."
        );
    }

    const components = await Component.find({ submittedBy: user._id, status: "approved" });

    return res
        .status(200)
        .json(new ApiResponse(200, "Components retrieved successfully", components));
});

// Get pending components of logged-in user (private)
export const getPendingComponentsOfLoggedInUser = asyncHandler(async (req, res) => {
    const components = await Component.find({
        submittedBy: req.user._id,
        status: "pending",
    });

    return res
        .status(200)
        .json(new ApiResponse(200, "Components retrieved successfully", components));
});

// Get rejected components of logged-in user (private)
export const getRejectedComponentsOfLoggedInUser = asyncHandler(async (req, res) => {
    const components = await Component.find({
        submittedBy: req.user._id,
        status: "rejected",
    });

    return res
        .status(200)
        .json(new ApiResponse(200, "Components retrieved successfully", components));
});
