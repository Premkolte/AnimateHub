import { ApiError } from '../utils/ApiError.js'
import { asyncHandler } from '../utils/asyncHandler.js'

const adminMiddleware = asyncHandler(async (req, res, next) => {
    if (req.user.role !== 'admin') {
        throw new ApiError(403, "You are not authorized to perform this action")
    }

    next()
})

export default adminMiddleware