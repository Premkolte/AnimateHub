import { OAuth2Client } from 'google-auth-library';
import User from '../models/user.model.js';
import crypto from 'crypto';
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import sanatizeUserModelResponse from "../functions/sanatizeUserModelResponse.js";
import { ApiError } from '../utils/ApiError.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLoginController = asyncHandler(async (req, res) => {
    try {
        const { credential } = req.body;
        if (!credential) {
            throw new ApiError(400, "Google credential is required");
        }
        // Verify the Google token
        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        
        const payload = ticket.getPayload();
        const { email, name, given_name,picture } = payload;
        // Check if user exists
        let user = await User.findOne({ email });
        
        if (user) {
            // User exists, log them in
           const accessToken = user.generateAccessToken();
            if (user && !user.isVerified) {
                // Update verification status for Google users
                user.isVerified = true;
                await user.save();
            }
            res.cookie("accessToken", accessToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            });

            user=sanatizeUserModelResponse(user.toObject(), true);
            return res.status(200).json(new ApiResponse(200, "User logged in successfully", { user, accessToken }));
        } else {
            // Create new user
            const hashedPassword = crypto.randomBytes(32).toString('hex');  
            const newUser = new User({
                email,
                fullName: name,
                username: given_name || email.split('@')[0],
                password: hashedPassword,
                avatarUrl: picture || "https://i.pinimg.com/736x/14/43/55/144355d7b36c5f646435423798281ce9.jpg",
                isVerified: true, // Google accounts are pre-verified
            });
            
            await newUser.save();

            const accessToken = newUser.generateAccessToken();

            res.cookie("accessToken", accessToken, {
                maxAge: 7 * 24 * 60 * 60 * 1000,
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            });
            user=sanatizeUserModelResponse(newUser.toObject(), false);
            return res.status(201).json(new ApiResponse(201, "User created successfully", { user, accessToken }));
        }
    } catch (error) {
        console.error("Google auth error:", error);
        throw new ApiError(500, "Google authentication failed");
    }
});