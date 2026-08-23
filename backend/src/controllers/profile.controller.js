// User Profile Controller
// Handles updating profile info, avatar, and retrieving user profiles

import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

import User from "../models/user.model.js";
import sanatizeUserModelResponse from "../functions/sanatizeUserModelResponse.js";
import cloudinary from "../utils/cloudinary.js";

/**
 * Validate if a username is available (excluding the current user)
 */
const validateUsernameAvailability = async (username, userId) => {
  if (!username) return;
  const existingUser = await User.findOne({
    username: username.toLowerCase(),
    _id: { $ne: userId }
  });
  if (existingUser) {
    throw new ApiError(400, "Username is already taken");
  }
};

/**
 * Build update object safely
 */
const buildUpdateFields = ({ username, fullName, bio, website, github, linkedin, twitter }) => {
  const fields = {};
  if (username?.trim()) fields.username = username.toLowerCase().trim();
  if (fullName?.trim()) fields.fullName = fullName.trim();
  if (bio !== undefined) fields.bio = bio.trim();
  if (website !== undefined) fields.website = website.trim();
  if (github !== undefined) fields.github = github.trim();
  if (linkedin !== undefined) fields.linkedin = linkedin.trim();
  if (twitter !== undefined) fields.twitter = twitter.trim();
  return fields;
};

// Update user profile
export const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { username, ...rest } = req.body;

  await validateUsernameAvailability(username, userId);

  const updateFields = buildUpdateFields({ username, ...rest });

  let updatedUser = await User.findByIdAndUpdate(
    userId,
    { $set: updateFields },
    { new: true, runValidators: true }
  );

  if (!updatedUser) throw new ApiError(404, "User not found");

  updatedUser = sanatizeUserModelResponse(updatedUser.toObject(), false);

  return res.status(200).json(
    new ApiResponse(200, "Profile updated successfully", updatedUser)
  );
});

// Update user avatar
export const updateAvatar = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const file = req.file;

  if (!file) throw new ApiError(400, "Avatar image is required");

  try {
    const base64Image = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "animatehub/profile-pictures",
      width: 300,
      height: 300,
      gravity: "face",
      crop: "fill",
      format: "webp",
      quality: "auto",
      fetch_format: "auto"
    });

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: { avatarUrl: result.secure_url } },
      { new: true }
    );

    if (!updatedUser) throw new ApiError(404, "User not found");

    const sanitizedUser = sanatizeUserModelResponse(updatedUser.toObject(), false);

    return res.status(200).json(
      new ApiResponse(200, "Avatar updated successfully", { avatarUrl: sanitizedUser.avatarUrl })
    );
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    throw new ApiError(500, "Error uploading profile picture");
  }
});

// Get user profile by username
export const getProfile = asyncHandler(async (req, res) => {
  const { username } = req.params;

  if (!username?.trim()) throw new ApiError(400, "Username is required");

  let user = await User.findOne({ username: username.toLowerCase() });
  if (!user) throw new ApiError(404, "User not found");

  user = sanatizeUserModelResponse(user.toObject(), false);

  if (req.user.username.toLowerCase() !== username.toLowerCase()) {
    user.email = undefined;
    user.pendingSubmissions = undefined;
    user.isMyProfile = false;
  } else {
    user.isMyProfile = true;
  }

  return res.status(200).json(
    new ApiResponse(200, "Profile retrieved successfully", user)
  );
});
