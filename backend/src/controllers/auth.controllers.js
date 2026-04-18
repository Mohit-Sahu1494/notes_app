import { asyncHandler } from "../utils/asyncHandler.utils.js";
import { ApiError } from "../utils/apiError.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import { User } from "../models/user.models.js";

const generateAccessandRefreshToken = async (user_id) => {
    try {
        const user = await User.findById(user_id);
        if (!user) throw new ApiError(404, "User node not found");

        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });

        return { accessToken, refreshToken };
    } catch (error) {
        throw new ApiError(500, "Terminal Error: Token generation failed");
    }
};

const cookieOptions = {
    httpOnly: true,
    secure: true,
    sameSite: "None"
};

// ====================================== User Registration  ======================================

export const register = asyncHandler(async (req, res) => {
    const { username, email, password, name} = req.body;

    if ([username, email, password].some((field) => !field || field.toString().trim() === "")) {
        throw new ApiError(400, "All fields and OTP are required");
    }

    const existedUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existedUser) throw new ApiError(409, "User already exists");

    const user = await User.create({
        username: username.toLowerCase(),
        email,
        password,
        name: name || username
    });

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id);
    const createdUser = await User.findById(user._id).select("-password -refreshToken");
    
    return res
        .status(201)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(201, { user: createdUser, accessToken }, "User registered successfully"));
});






// ====================================== User Login  =======================================

export const login = asyncHandler(async (req, res) => {
    const { email, username, password } = req.body;
    
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) throw new ApiError(404, "User not found");

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) throw new ApiError(401, "Invalid credentials");

    const { accessToken, refreshToken } = await generateAccessandRefreshToken(user._id);
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    // --- CRITICAL FIX START ---
    // JSON me { user: loggedInUser, accessToken } bhejna zaroori hai
    return res
        .status(200)
        .cookie("accessToken", accessToken, cookieOptions)
        .cookie("refreshToken", refreshToken, cookieOptions)
        .json(new ApiResponse(
            200, 
            { user: loggedInUser, accessToken },
            "Logged in successfully"
        ));
});

export const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            new: true
        }
    );

    const options = {
        httpOnly: true,
        secure: true,
        sameSite: "None"
    };

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "User logged out"));
});

export const fetchProfile = asyncHandler(async (req, res) => {
    return res
        .status(200)
        .json(new ApiResponse(200, req.user, "User profile fetched successfully"));
});

