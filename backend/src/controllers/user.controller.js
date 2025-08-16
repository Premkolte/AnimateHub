import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import crypto from "crypto";
import User from "../models/user.model.js";
import { sendVerificationEmail, sendPasswordResetEmail } from "../services/emailService.js";

export const verifyUserMailController = asyncHandler(async (req, res) => {
    const { token } = req.params;

    if (!token) {
        throw new ApiError(400, "Verification token is required");
    }

    const user = await User.findOne({
        emailVerificationToken: token,
        emailVerificationExpires: { $gt: Date.now() }
    }).select("-password -__v -_id -emailVerificationToken -emailVerificationExpires -createdAt -updatedAt -resetPasswordToken -resetPasswordExpires");

    if (!user) {
        throw new ApiError(400, "Invalid or expired verification token");
    }

    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    const accessToken = user.generateAccessToken();

    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .json(
            new ApiResponse(200, "Email verified successfully. You can now log in.", { user, accessToken })
        );
});

export const resendVerificationEmail = asyncHandler(async (req, res) => {
    const email = req.user.email;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email }).select("-password -__v -_id -emailVerificationToken -emailVerificationExpires -createdAt -updatedAt -resetPasswordToken -resetPasswordExpires");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.isVerified) {
        throw new ApiError(400, "Email is already verified");
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpires;
    await user.save();

    await sendVerificationEmail(user.email, verificationToken, user.fullName);

    return res.status(200).json(
        new ApiResponse(200, "Verification email resent successfully. Please check your email.")
    );
});

export const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.body;

    if (!email) {
        throw new ApiError(400, "Email is required");
    }

    const user = await User.findOne({ email }).select("-password -__v -_id -emailVerificationToken -emailVerificationExpires -createdAt -updatedAt -resetPasswordToken -resetPasswordExpires");

    if (!user) {
        throw new ApiError(404, `No user found with the following email: ${email}`);
    }

    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = Date.now() + 3600000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetTokenExpiry;
    await user.save();

    await sendPasswordResetEmail(user.email, resetToken, user.fullName);

    return res.status(200).json(
        new ApiResponse(200, "Password reset link sent to your email. It will expire in 1 hour.")
    );
});

export const resetPassword = asyncHandler(async (req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!token) {
        throw new ApiError(400, "Reset token is required");
    }

    if (!newPassword || newPassword.length < 8) {
        throw new ApiError(400, "Password must be at least 8 characters long");
    }

    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }
    }).select("-password -__v -_id -emailVerificationToken -emailVerificationExpires -createdAt -updatedAt -resetPasswordToken -resetPasswordExpires");

    if (!user) {
        throw new ApiError(400, "Invalid or expired reset token");
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return res.status(200).json(
        new ApiResponse(200, "Password reset successful. You can now log in with your new password.")
    );
});
