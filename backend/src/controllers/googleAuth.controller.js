import { OAuth2Client } from "google-auth-library";
import crypto from "crypto";
import User from "../models/user.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import sanatizeUserModelResponse from "../functions/sanatizeUserModelResponse.js";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper: set cookie with consistent options
const setAuthCookie = (res, token) => {
  return res.cookie("accessToken", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
};

// Helper: verify Google token and return payload
const verifyGoogleToken = async (credential) => {
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    return ticket.getPayload();
  } catch {
    throw new ApiError(401, "Invalid Google token");
  }
};

export const googleLoginController = asyncHandler(async (req, res) => {
  const { credential } = req.body;
  if (!credential) {
    throw new ApiError(400, "Google credential is required");
  }

  const payload = await verifyGoogleToken(credential);
  const { email, name, given_name, picture } = payload;

  // Try to find existing user
  let user = await User.findOne({ email });

  if (user) {
    // Ensure Google users are marked verified
    if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }

    const accessToken = user.generateAccessToken();
    const sanitizedUser = sanatizeUserModelResponse(user.toObject(), true);

    return setAuthCookie(res, accessToken)
      .status(200)
      .json(new ApiResponse(200, "User logged in successfully", { user: sanitizedUser, accessToken }));
  }

  // Create new user if not found
  const generatedPassword = crypto.randomBytes(32).toString("hex");
  const newUser = new User({
    email,
    fullName: name,
    username: given_name || email.split("@")[0],
    password: generatedPassword,
    avatarUrl: picture || "https://i.pinimg.com/736x/14/43/55/144355d7b36c5f646435423798281ce9.jpg",
    isVerified: true,
  });

  await newUser.save();

  const accessToken = newUser.generateAccessToken();
  const sanitizedNewUser = sanatizeUserModelResponse(newUser.toObject(), false);

  return setAuthCookie(res, accessToken)
    .status(201)
    .json(new ApiResponse(201, "User created successfully", { user: sanitizedNewUser, accessToken }));
});
