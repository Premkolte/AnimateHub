import { asyncHandler } from "../utils/asyncHandler";
import { ApiResponse } from "../utils/ApiResponse";
import { ApiError } from "../utils/ApiError";
import { Component } from "../models/components.model";

// Create a new component - only logged in users can create components
const createComponent = asyncHandler(async (req, res) => {
    const { name, description, code, tags, category } = req.body;
    const submittedBy = req.user?._id;

    if (!name || !description || !category) {
        throw new ApiError(400, "Name, description, category and code are required");
    }

    if (!code){
        throw new ApiError(400, "We cannot add a blank code.");
    }

    // Check if component with same name already exists
    const existingComponent = await Component.findOne({ name });
    if (existingComponent) {
        throw new ApiError(400, "Component with this name already exists");
    }

    const component = await Component.create({
        name,
        description,
        code,
        tags,
        category,
        submittedBy,
        status: "pending"
    });

    return res
        .status(201)
        .json(new ApiResponse(201, component, "Component created successfully"));
});

// Get all components - public route
const getAllComponents = asyncHandler(async (req, res) => {
    const { category, status, search, page = 1, limit = 10 } = req.query;
    
    const query = {};
    
    if (category) {
        query.category = category;
    }
    
    if (status) {
        query.status = status;
    }
    
    if (search) {
        query.$or = [
            { name: { $regex: search, $options: 'i' } },
            { description: { $regex: search, $options: 'i' } },
            { tags: { $in: [new RegExp(search, 'i')] } }
        ];
    }
    
    const options = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort: { createdAt: -1 },
        populate: [
            { path: 'submittedBy', select: 'username avatarUrl' },
            { path: 'approvedBy', select: 'username' }
        ]
    };

    const components = await Component.paginate(query, options);
    
    return res
        .status(200)
        .json(new ApiResponse(200, components, "Components retrieved successfully"));
});

// Get single component by ID - public route
const getComponentById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    
    const component = await Component.findById(id)
        .populate('submittedBy', 'username avatarUrl')
        .populate('approvedBy', 'username');
        
    if (!component) {
        throw new ApiError(404, "Component not found");
    }
    
    return res
        .status(200)
        .json(new ApiResponse(200, component, "Component retrieved successfully"));
});

// Update component - private route (owner or admin)
const updateComponent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, description, code, tags, category } = req.body;
    const userId = req.user?._id;
    const isAdmin = req.user?.role === 'admin';
    
    const component = await Component.findById(id);
    
    if (!component) {
        throw new ApiError(404, "Component not found");
    }
    
    // Check if user is the owner or admin
    if (component.submittedBy.toString() !== userId.toString() && !isAdmin) {
        throw new ApiError(403, "Not authorized to update this component");
    }
    
    
    // Check if name is being updated and if it's already taken
    if (name && name !== component.name) {
        const existingComponent = await Component.findOne({ name });
        if (existingComponent) {
            throw new ApiError(400, "Component with this name already exists");
        }
    }
    
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (code !== undefined) updateData.code = code;
    if (tags) updateData.tags = tags;
    if (category) updateData.category = category;

    
    const updatedComponent = await Component.findByIdAndUpdate(
        id,
        { $set: updateData },
        { new: true, runValidators: true }
    );
    
    return res
        .status(200)
        .json(new ApiResponse(200, updatedComponent, "Component updated successfully"));
});

// Delete component - private route (owner or admin)
const deleteComponent = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const userId = req.user?._id;
    const isAdmin = req.user?.role === 'admin';
    
    const component = await Component.findById(id);
    
    if (!component) {
        throw new ApiError(404, "Component not found");
    }
    
    // Check if user is the owner or admin
    if (component.submittedBy.toString() !== userId.toString() && !isAdmin) {
        throw new ApiError(403, "Not authorized to delete this component");
    }
    
    await Component.findByIdAndDelete(id);
    
    return res
        .status(200)
        .json(new ApiResponse(200, null, "Component deleted successfully"));
});

export {
    createComponent,
    getAllComponents,
    getComponentById,
    updateComponent,
    deleteComponent
};
