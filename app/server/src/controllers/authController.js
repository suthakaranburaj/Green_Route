import { asyncHandler, sendResponse, statusType } from "../utils/index.js";
import * as authService from "../services/authService.js";
import { generateToken } from "../utils/auth.js";

/**
 * @desc    Register a new user
 * @route   POST /api/auth/register
 * @access  Public
 */
export const registerUser = asyncHandler(async (req, res) => {
    const { email, password, name, company } = req.body;

    const user = await authService.registerUser({
        email,
        password,
        name,
        company
    });

    // Generate JWT token
    const token = generateToken(user.id);

    return sendResponse(
        res,
        true,
        {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                company: user.company,
                createdAt: user.createdAt
            },
            token
        },
        "User registered successfully",
        statusType.CREATED
    );
});

/**
 * @desc    Authenticate user and get token
 * @route   POST /api/auth/login
 * @access  Public
 */
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await authService.loginUser(email, password);

    // Generate JWT token
    const token = generateToken(user.id);

    return sendResponse(
        res,
        true,
        {
            user: {
                id: user.id,
                email: user.email,
                name: user.name,
                company: user.company,
                createdAt: user.createdAt
            },
            token
        },
        "Login successful",
        statusType.OK
    );
});

/**
 * @desc    Get user profile
 * @route   GET /api/auth/profile/:userId
 * @access  Private
 */
export const getUserProfile = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Ensure user can only access their own profile
    if (req.user.id !== userId) {
        return sendResponse(res, false, null, "Access denied", statusType.FORBIDDEN);
    }

    const userProfile = await authService.getUserProfile(userId);

    return sendResponse(
        res,
        true,
        userProfile,
        "User profile retrieved successfully",
        statusType.OK
    );
});

/**
 * @desc    Update user profile
 * @route   PUT /api/auth/profile/:userId
 * @access  Private
 */
export const updateUserProfile = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const updateData = req.body;

    // Ensure user can only update their own profile
    if (req.user.id !== userId) {
        return sendResponse(res, false, null, "Access denied", statusType.FORBIDDEN);
    }

    const updatedUser = await authService.updateUserProfile(userId, updateData);

    return sendResponse(res, true, updatedUser, "User profile updated successfully", statusType.OK);
});

/**
 * @desc    Delete user account
 * @route   DELETE /api/auth/profile/:userId
 * @access  Private
 */
export const deleteUserAccount = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Ensure user can only delete their own account
    if (req.user.id !== userId) {
        return sendResponse(res, false, null, "Access denied", statusType.FORBIDDEN);
    }

    await authService.deleteUserAccount(userId);

    return sendResponse(res, true, null, "User account deleted successfully", statusType.OK);
});
