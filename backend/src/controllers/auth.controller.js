import { asyncHandler } from "../utils/asyncHandler"
import { ApiError } from "../utils/ApiError"
import { ApiResponse } from "../utils/ApiResponse"
import User from "../models/user.model"

export const registerController = asyncHandler(async (req, res) => {
    const { username, email, fullName, password } = req.body;

    if (!username || !email || !fullName || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findOne({ email })
    if (user) {
        throw new ApiError(400, "User already exists")
    }

    

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
        username,
        email,
        fullName,
        password: hashedPassword
    })

    res.status(201).json({
        success: true,
        message: "User registered successfully",
        data: newUser
    })



})
