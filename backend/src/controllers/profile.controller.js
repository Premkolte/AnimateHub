// This file will be used to update user profile - user can update his profile (like username, profilepic, bio, his links etc.)

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";

import sanatizeUserModelResponse from "../functions/sanatizeUserModelResponse.js";
import cloudinary from "../utils/cloudinary.js";


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
    if (username?.trim()) updateFields.username = username.toLowerCase().trim();
    if (fullName?.trim()) updateFields.fullName = fullName.trim();
    if (bio !== undefined) updateFields.bio = bio.trim();
    if (website !== undefined) updateFields.website = website.trim();
    if (github !== undefined) updateFields.github = github.trim();
    if (linkedin !== undefined) updateFields.linkedin = linkedin.trim();
    if (twitter !== undefined) updateFields.twitter = twitter.trim();

    // Update user
    let updatedUser = await User.findByIdAndUpdate(
        userId,
        { $set: updateFields },
        { new: true, runValidators: true }
    );

    if (!updatedUser) {
        throw new ApiError(404, "User not found");
    }

    updatedUser = sanatizeUserModelResponse(updatedUser.toObject(), false);

    return res.status(200).json(
        new ApiResponse(200, "Profile updated successfully", updatedUser)
    );
});


// Update user avatar
export const updateAvatar = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const file = req.file;

    if (!file) {
        throw new ApiError(400, "Avatar image is required");
    }

    try {
        // Convert buffer to base64
        const base64Image = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;

        // Upload to Cloudinary using base64
        const result = await cloudinary.uploader.upload(base64Image, {
            folder: 'animatehub/profile-pictures',
            width: 300,
            height: 300,
            gravity: 'face',
            crop: 'fill',
            format: 'webp',
            quality: 'auto',
            fetch_format: 'auto'
        });

        // Update user's avatarUrl
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: { avatarUrl: result.secure_url } },
            { new: true }
        );

        if (!updatedUser) {
            throw new ApiError(404, "User not found");
        }

        const sanitizedUser = sanatizeUserModelResponse(updatedUser.toObject(), false);

        return res.status(200).json(
            new ApiResponse(200, "Avatar updated successfully", { avatarUrl: sanitizedUser.avatarUrl })
        );

    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw new ApiError(500, 'Error uploading profile picture');
    }
});


// Get user profile by username
export const getProfile = asyncHandler(async (req, res) => {
    const { username } = req.params;

    if (!username?.trim()) {
        throw new ApiError(400, "Username is required");
    }

    let user = await User.findOne({ username: username.toLowerCase() })

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    user = sanatizeUserModelResponse(user.toObject(), false)

    return res.status(200).json(
        new ApiResponse(200, "Profile retrieved successfully", user)
    );
});


