import jwt from "jsonwebtoken";

/**
 * Generate JWT token
 */
export const generateToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET || "your-secret-key", {
        expiresIn: process.env.JWT_EXPIRES_IN || "30d"
    });
};

/**
 * Verify JWT token
 */
export const verifyToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
};

/**
 * Extract user from token (for WebSocket connections, etc.)
 */
export const getUserFromToken = async (token) => {
    try {
        const decoded = verifyToken(token);
        // You would typically fetch user from database here
        return { userId: decoded.userId };
    } catch (error) {
        return null;
    }
};
