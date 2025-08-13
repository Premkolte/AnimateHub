import User from '../models/user.model.js'
import jwt from 'jsonwebtoken'
import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const authMiddleware = asyncHandler(async (req, res, next) => {
    let accessToken = req.cookies.accessToken

    if (!accessToken) {
        accessToken = req.headers['x-access-token'] || req.headers['authorization']
        if (accessToken && accessToken.startsWith('Bearer ')) {
            accessToken = accessToken.split(' ')[1]
        }
    }

    if (!accessToken) {
        throw new ApiError(401, "No valid authorization token provided")
    }

    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET)
    console.log(decoded)


    if (!decoded.id || !decoded.username || !decoded.email) {
        throw new ApiError(401, "Invalid authorization token")
    }

    const user = await User.findById(decoded.id)

    if (!user) {
        throw new ApiError(401, "User not found")
    }

    req.user = user

    next()
})

export default authMiddleware