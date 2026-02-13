import crypto from "crypto";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import User from "../models/user.model.js";
import { sendVerificationEmail, sendLoginConfirmationEmail, sendOTPEmail } from "../services/emailService.js";
import sanatizeUserModelResponse from "../functions/sanatizeUserModelResponse.js";

/**
 * @desc Helper - Sets the authentication cookie with consistent options
 * @param {Object} res - Express response object
 * @param {String} token - JWT access token
 */
const setAuthCookie = (res, token) => {
  return res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

/**
 * @desc Register a new user
 * @route POST /api/auth/register
 * @access Public
 */
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

  const otp = crypto.randomInt(100000, 999999).toString().padStart(6, '0');
  const expiresAt = new Date(Date.now() + 15 * 60 * 1000);

  user.emailVerificationOTP = otp;
  user.emailVerificationOTPExpires = expiresAt;
  user.isEmailVerified = false;

  await user.save();
  await sendOTPEmail(user.email, otp, user.fullName);

  user = sanatizeUserModelResponse(user.toObject(), true);

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        "User created successfully. Please check your email for OTP to verify your account.",
        { user }
      )
    );
});

/**
 * @desc Login user
 * @route POST /api/auth/login
 * @access Public
 */
export const loginController = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    throw new ApiError(400, "Both fields are required");
  }

  let user = await User.findOne({ username });
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.verifyPassword(password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid password");
  }

  const accessToken = user.generateAccessToken();
  user = sanatizeUserModelResponse(user.toObject(), true);

  const message = user.isVerified
    ? "User logged in successfully"
    : "User logged in successfully. Please verify your email to fully access the website.";

  // Send login confirmation email asynchronously
  const loginTime = new Date().toLocaleString();
  sendLoginConfirmationEmail(user.email, user.fullName, loginTime).catch((err) => {
    console.error("Failed to send login confirmation email:", err);
  });

  return setAuthCookie(res, accessToken)
    .status(200)
    .json(new ApiResponse(200, message, { user, accessToken }));
});

/**
 * @desc Logout user
 * @route POST /api/auth/logout
 * @access Private
 */
export const logoutController = asyncHandler(async (_req, res) => {
  res.clearCookie("accessToken");
  return res
    .status(200)
    .json(new ApiResponse(200, "User logged out successfully"));
});

/**
 * @desc Get currently authenticated user
 * @route GET /api/auth/me
 * @access Private
 */
export const getCurrentUserController = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).select(
    "-password -__v -_id -emailVerificationToken -emailVerificationExpires -createdAt -updatedAt -resetPasswordToken -resetPasswordExpires"
  );

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "User fetched successfully", { user }));
});

/**
 * @desc Update user password
 * @route PATCH /api/auth/update-password
 * @access Private
 */
export const updatePasswordController = asyncHandler(async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  if (!currentPassword || !newPassword) {
    throw new ApiError(400, "Both fields are required");
  }

  let user = await User.findById(req.user.id);
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.verifyPassword(currentPassword);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid current password");
  }

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
