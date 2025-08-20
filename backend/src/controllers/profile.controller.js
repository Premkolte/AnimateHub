// This file will be used to update user profile - user can update his profile (like username, profilepic, bio, his links etc.)

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

// Update user profile
const updateProfile = asyncHandler(async (req, res) => {
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
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateFields },
        { new: true, runValidators: true }
    ).select("-password -refreshToken -resetPasswordToken -resetPasswordExpires -emailVerificationToken -emailVerificationExpires");

    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Profile updated successfully", updatedUser)
    );
});

// Get user profile
const getProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).select(
        "-password -refreshToken -resetPasswordToken -resetPasswordExpires -emailVerificationToken -emailVerificationExpires"
    );

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, "Profile retrieved successfully", user)
    );
});

export {
    updateProfile,
    getProfile
};
