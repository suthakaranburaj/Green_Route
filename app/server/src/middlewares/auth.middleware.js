import { sendResponse } from "../utils/apiResonse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";
import { statusType } from "../utils/statusType.js";
import prisma from "../db/index.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
    const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        return sendResponse(
            res,
            false,
            null,
            "Unauthorized request: Token missing",
            statusType.UNAUTHORIZED
        );
    }

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await prisma.user.findUnique({
            where: { id: decodedToken.userId },
            select: {
                id: true,
                name: true,
                email: true,
                role: true,
                createdAt: true,
                updatedAt: true
                // Exclude password and refresh_token
            }
        });

        if (!user) {
            return sendResponse(
                res,
                false,
                null,
                "Unauthorized request: Invalid access token",
                statusType.UNAUTHORIZED
            );
        }

        req.user = user;
        next();
    } catch (error) {
        return sendResponse(
            res,
            false,
            null,
            error?.message || "Unauthorized request: Token verification failed",
            statusType.UNAUTHORIZED
        );
    }
});
