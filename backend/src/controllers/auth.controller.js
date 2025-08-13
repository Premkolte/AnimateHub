import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import crypto from "crypto"
import User from "../models/user.model.js"
import { sendVerificationEmail } from "../services/emailService.js"

export const registerController = asyncHandler(async (req, res) => {
    const { username, email, fullName, password } = req.body;

    if (!username || !email || !fullName || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const userWithEmail = await User.findOne({ email })
    if (userWithEmail) {
        throw new ApiError(400, "User already exists")
    }

    const userWithUsername = await User.findOne({ username })
    if (userWithUsername) {
        throw new ApiError(400, "A user already exists with this username")
    }


    let user = new User({
        username,
        email,
        fullName,
        password
    })

    // Generate verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Save verification token to user
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpires;
    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken, user.fullName);

    // Generate access token with limited permissions until email is verified
    const accessToken = user.generateAccessToken();

    // Remove sensitive data before sending response
    user = user.toObject();
    user.password = undefined;
    user.bio = undefined;
    user.website = undefined;
    user.role = undefined;
    user.avatarUrl = undefined;
    user.__v = undefined;
    user._id = undefined;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    return res
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        .status(201)
        .json(new ApiResponse(201, "User created successfully. Please check your email to verify your account.", { user, accessToken }))
})

export const verifyUserMailController = asyncHandler(async (req, res) => {
    const { token } = req.params;

    if (!token) {
        throw new ApiError(400, "Verification token is required");
    }

    // Find user with this verification token
    const user = await User.findOne({
        emailVerificationToken: token,
        emailVerificationExpires: { $gt: Date.now() }
    });

    if (!user) {
        throw new ApiError(400, "Invalid or expired verification token");
    }

    // Mark user as verified and clear verification token
    user.isVerified = true;
    user.emailVerificationToken = undefined;
    user.emailVerificationExpires = undefined;

    await user.save();

    // Generate a new access token and set it as cookie
    const accessToken = user.generateAccessToken();

    return res
        .status(200)
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        .json(
            new ApiResponse(200, "Email verified successfully. You can now log in.", { accessToken })
        );
})

export const resendVerificationEmail = asyncHandler(async (req, res) => {

    const email = req.user.email

    if (!email) {
        throw new ApiError(400, "Email is required");
    }


    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    if (user.isVerified) {
        throw new ApiError(400, "Email is already verified");
    }

    // Generate new verification token
    const verificationToken = crypto.randomBytes(32).toString('hex');
    const verificationExpires = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    // Update user with new verification token
    user.emailVerificationToken = verificationToken;
    user.emailVerificationExpires = verificationExpires;
    await user.save();

    // Send verification email
    await sendVerificationEmail(user.email, verificationToken, user.fullName);

    return res.status(200).json(
        new ApiResponse(200, "Verification email resent successfully. Please check your email.")
    );
})


export const loginController = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(400, "Both fields are required");
    }

    const user = await User.findOne({ username });
    if (!user) {
        throw new ApiError(404, "User not found");
    }

    const isPasswordValid = await user.verifyPassword(password);
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password");
    }

    const accessToken = user.generateAccessToken();

    // Remove sensitive data before sending response
    const userObj = user.toObject();
    userObj.password = undefined;
    userObj.bio = undefined;
    userObj.website = undefined;
    userObj.__v = undefined;
    userObj._id = undefined;
    userObj.emailVerificationToken = undefined;
    userObj.emailVerificationExpires = undefined;

    let message = "User logged in successfully";
    if (!user.isVerified) {
        message = "User logged in successfully. Please verify your email to fully access the website.";
    }

    return res
        .cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        })
        .status(200)
        .json(new ApiResponse(200, message, { user: userObj, accessToken }));
})

export const logoutController = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken");
    return res.status(200).json(new ApiResponse(200, "User logged out successfully"))
})


