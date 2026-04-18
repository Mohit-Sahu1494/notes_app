import jwt from "jsonwebtoken";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.utils.js";
import { asyncHandler } from "../utils/asyncHandler.utils.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization || req.headers.Authorization;
        const token = (authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null) || req.cookies?.accessToken;

        if (!token || token === "undefined" || token === "null") {
            return next(new ApiError(401, "Protocol Error: Access token missing"));
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken").lean();

        if (!user) {
            return next(new ApiError(401, "Identity node lost in database"));
        }

        req.user = user;
        next();
    } catch (error) {
        return next(new ApiError(401, "Invalid or expired token"));
    }
});