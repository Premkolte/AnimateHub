// This file will be used to update user profile - user can update his profile (like username, profilepic, bio, his links etc.)

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

import sanatizeUserModelResponse from "../functions/sanatizeUserModelResponse.js";

// Update user profile
export const updateProfile = asyncHandler(async (req, res) => {
    const { username, fullName, bio, website, github, linkedin, twitter } = req.body;
    const userId = req.user._id;

    // Check if username is being updated and if it's already taken
    if (username) {
        const existingUser = await User.findOne({
            username: username.toLowerCase(),
            _id: { $ne: userId } // Exclude current user from the check
        });

        if (existingUser) {
            throw new ApiError(400, "Username is already taken");
        }
    }

    // Prepare update object
    const updateFields = {};
    if (username) updateFields.username = username.toLowerCase();
    if (fullName) updateFields.fullName = fullName;
    if (bio !== undefined) updateFields.bio = bio;
    if (website !== undefined) updateFields.website = website;
    if (github !== undefined) updateFields.github = github;
    if (linkedin !== undefined) updateFields.linkedin = linkedin;
    if (twitter !== undefined) updateFields.twitter = twitter;

    // Update user
    let updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateFields },
        { new: true, runValidators: true }
    )

    updatedUser = sanatizeUserModelResponse(updatedUser.toObject(), false)


    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Profile updated successfully", updatedUser)
    );
});


// Get user profile by username
export const getProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username?.trim()) {
        throw new ApiError(400, "Username is required");
    }

    let user = await User.findOne({ username: username.toLowerCase() })

    user = sanatizeUserModelResponse(user.toObject(), false)

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Profile retrieved successfully", user)
    );
});


