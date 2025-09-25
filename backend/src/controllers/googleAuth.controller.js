import { OAuth2Client } from "google-auth-library";
import User from "../models/user.model.js";
import crypto from "crypto";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import sanatizeUserModelResponse from "../functions/sanatizeUserModelResponse.js";
import { ApiError } from "../utils/ApiError.js";

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

export const googleLoginController = asyncHandler(async (req, res) => {
  const { credential } = req.body;
  if (!credential) {
    throw new ApiError(400, "Google credential is required");
  }

  // Verify the Google token
  let payload;
  try {
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    payload = ticket.getPayload();
  } catch (err) {
    throw new ApiError(401, "Invalid Google token");
  }

  const { email, name, given_name, picture } = payload;

  // Check if user exists
  let user = await User.findOne({ email });

  if (user) {
    // Ensure Google users are marked verified
    if (!user.isVerified) {
      user.isVerified = true;
      await user.save();
    }

    const accessToken = user.generateAccessToken();
    user = sanatizeUserModelResponse(user.toObject(), true);

    return setAuthCookie(res, accessToken)
      .status(200)
      .json(
        new ApiResponse(200, "User logged in successfully", { user, accessToken })
      );
  }

  // Create new user
  const hashedPassword = crypto.randomBytes(32).toString("hex");
  const newUser = new User({
    email,
    fullName: name,
    username: given_name || email.split("@")[0],
    password: hashedPassword,
    avatarUrl:
      picture ||
      "https://i.pinimg.com/736x/14/43/55/144355d7b36c5f646435423798281ce9.jpg",
    isVerified: true, // Google accounts are pre-verified
  });

  await newUser.save();

  const accessToken = newUser.generateAccessToken();
  const sanitizedUser = sanatizeUserModelResponse(newUser.toObject(), false);

  return setAuthCookie(res, accessToken)
    .status(201)
    .json(
      new ApiResponse(201, "User created successfully", {
        user: sanitizedUser,
        accessToken,
      })
    );
});
