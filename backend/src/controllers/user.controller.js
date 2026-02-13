import crypto from "crypto";
import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
  sendOTPEmail
} from "../services/emailService.js";
import sanatizeUserModelResponse from "../functions/sanatizeUserModelResponse.js";

// Common cookie options
const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
};

/**
 * ✅ Verify user's email using token
 */
export const verifyUserMailController = asyncHandler(async (req, res) => {
  const { token } = req.params;
  if (!token) throw new ApiError(400, "Verification token is required");

  let user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: Date.now() }
  });

  if (!user) throw new ApiError(400, "Invalid or expired verification token");

  user.isVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  const accessToken = user.generateAccessToken();
  user = sanatizeUserModelResponse(user.toObject(), true);

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOptions)
    .json(
      new ApiResponse(200, "Email verified successfully. You can now log in.", {
        user,
        accessToken
      })
    );
});

/**
 * ✉️ Resend verification email
 */
export const resendVerificationEmail = asyncHandler(async (req, res) => {
  const { email } = req.user;
  if (!email) throw new ApiError(400, "Email is required");

  const user = await User.findOne({ email });
  if (!user) throw new ApiError(404, "User not found");
  if (user.isVerified) throw new ApiError(400, "Email is already verified");

  user.emailVerificationToken = crypto.randomBytes(32).toString("hex");
  user.emailVerificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);
  await user.save();

  await sendVerificationEmail(
    user.email,
    user.emailVerificationToken,
    user.fullName
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Verification email resent successfully. Please check your email."
      )
    );
});

/**
 * 🔑 Forgot Password
 */
export const forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new ApiError(400, "Email is required");

  const user = await User.findOne({ email });
  if (!user)
    throw new ApiError(404, `No user found with the following email: ${email}`);

  user.resetPasswordToken = crypto.randomBytes(32).toString("hex");
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  await sendPasswordResetEmail(
    user.email,
    user.resetPasswordToken,
    user.fullName
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Password reset link sent to your email. It will expire in 1 hour."
      )
    );
});

/**
 * 🔒 Reset Password
 */
export const resetPassword = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  if (!token) throw new ApiError(400, "Reset token is required");
  if (!newPassword || newPassword.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters long");
  }

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) throw new ApiError(400, "Invalid or expired reset token");

  user.password = newPassword;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Password reset successful. You can now log in with your new password."
      )
    );
});
