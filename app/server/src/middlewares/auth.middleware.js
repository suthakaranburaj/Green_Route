import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Authentication middleware
 */
export const authenticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
                timestamp: new Date().toISOString()
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");

        // Check if user still exists
        const user = await prisma.user.findUnique({
            where: { id: decoded.userId },
            select: { id: true, email: true, name: true }
        });

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Token is valid but user no longer exists.",
                timestamp: new Date().toISOString()
            });
        }

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid token.",
            timestamp: new Date().toISOString()
        });
    }
};

/**
 * Optional authentication middleware (doesn't throw error if no token)
 */
export const optionalAuthenticate = async (req, res, next) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "");

        if (token) {
            const decoded = jwt.verify(token, process.env.JWT_SECRET || "your-secret-key");
            const user = await prisma.user.findUnique({
                where: { id: decoded.userId },
                select: { id: true, email: true, name: true }
            });

            if (user) {
                req.user = user;
            }
        }

        next();
    } catch (error) {
        // Continue without authentication if token is invalid
        next();
    }
};
