
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import crypto from "crypto";
import User from "../models/user.model.js";
import { sendVerificationEmail } from "../services/emailService.js";
import sanatizeUserModelResponse from "../functions/sanatizeUserModelResponse.js";

// Helper: set cookie with consistent options
const setAuthCookie = (res, token) => {
  return res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

export const registerController = asyncHandler(async (req, res) => {
  const { username, email, fullName, password } = req.body;

  if (!username || !email || !fullName || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existingUser = await User.findOne({ $or: [{ email }, { username }] });
  if (existingUser) {
    throw new ApiError(400, "User already exists with this email or username");
  }

  let user = new User({ username, email, fullName, password });

  const verificationToken = crypto.randomBytes(32).toString("hex");
  user.emailVerificationToken = verificationToken;
  user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24h

  await user.save();
  await sendVerificationEmail(user.email, verificationToken, user.fullName);

  const accessToken = user.generateAccessToken();
  user = sanatizeUserModelResponse(user.toObject(), true);

  return setAuthCookie(res, accessToken)
    .status(201)
    .json(
      new ApiResponse(
        201,
        "User created successfully. Please check your email to verify your account.",
        { user, accessToken }
      )
    );
});

export const loginController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    throw new ApiError(400, "Both fields are required");
  }

  let user = await User.findOne({ username });
  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) throw new ApiError(401, "Invalid password");

  const accessToken = user.generateAccessToken();
  user = sanatizeUserModelResponse(user.toObject(), true);

  const message = user.isVerified
    ? "User logged in successfully"
    : "User logged in successfully. Please verify your email to fully access the website.";

  return setAuthCookie(res, accessToken)
    .status(200)
    .json(new ApiResponse(200, message, { user, accessToken }));
});

export const logoutController = asyncHandler(async (_req, res) => {
  res.clearCookie("accessToken");
  return res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully"));
});

export const getCurrentUserController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "-password -__v -_id -emailVerificationToken -emailVerificationExpires -createdAt -updatedAt -resetPasswordToken -resetPasswordExpires"
  );

  if (!user) throw new ApiError(404, "User not found");

  return res
    .status(200)
    .json(new ApiResponse(200, "User fetched successfully", { user }));
});

export const updatePasswordController = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Both fields are required");
  }

  let user = await User.findById(req.user.id);
  if (!user) throw new ApiError(404, "User not found");

  const isPasswordValid = await user.verifyPassword(currentPassword);
  if (!isPasswordValid) throw new ApiError(401, "Invalid current password");

  user.password = newPassword;
  await user.save();

  const accessToken = user.generateAccessToken();
  user = sanatizeUserModelResponse(user.toObject(), true);

  return setAuthCookie(res, accessToken)
    .status(200)
    .json(
      new ApiResponse(200, "Password updated successfully", {
        user,
        accessToken,
      })
    );
});
