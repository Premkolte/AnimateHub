import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import User from "../models/user.model.js"

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


    const newUser = new User({
        username,
        email,
        fullName,
        password
    })

    let user = await newUser.save();
    const accessToken = user.generateAccessToken();

    // remove unnecessary details
    user = user.toObject();
    user.password = undefined;
    user.bio = undefined
    user.website = undefined
    user.isVerified = undefined
    user.role = undefined
    user.avatarUrl = undefined
    user.__v = undefined;
    user._id = undefined;



    return res
        .cookie(accessToken)
        .status(201)
        .json(new ApiResponse(201, "User created successfully, please verify your email via link", { user, accessToken }))
})

export const verifyUserController = asyncHandler(async (req, res) => {

})


export const loginController = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        throw new ApiError(400, "Both fields are required")
    }

    const user = await User.findOne({ username })
    if (!user) {
        throw new ApiError(404, "User not found")
    }

    const isPasswordValid = await user.verifyPassword(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid password")
    }

    const accessToken = user.generateAccessToken();

    // remove unnecessary details
    user = user.toObject();
    user.password = undefined;
    user.bio = undefined
    user.website = undefined
    user.__v = undefined;
    user._id = undefined;


    return res
        .cookie(accessToken)
        .status(200)
        .json(new ApiResponse(200, "User logged in successfully", { user, accessToken }))
})

export const logoutController = asyncHandler(async (req, res) => {
    res.clearCookie("accessToken");
    return res.status(200).json(new ApiResponse(200, "User logged out successfully"))
})


