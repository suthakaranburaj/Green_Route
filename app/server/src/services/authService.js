import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { v4 as uuidv4 } from "uuid";

const prisma = new PrismaClient();

/**
 * Register a new user
 */
export const registerUser = async (userData) => {
    const { email, password, name, company } = userData;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
        where: { email }
    });

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create user
    const user = await prisma.user.create({
        data: {
            id: uuidv4(),
            email,
            password: hashedPassword,
            name,
            company
        },
        select: {
            id: true,
            email: true,
            name: true,
            company: true,
            createdAt: true,
            updatedAt: true
        }
    });

    return user;
};

/**
 * Login user
 */
export const loginUser = async (email, password) => {
    // Find user by email
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error("Invalid email or password");
    }

    // Check password
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    // Return user without password
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};

/**
 * Get user profile
 */
export const getUserProfile = async (userId) => {
    const user = await prisma.user.findUnique({
        where: { id: userId },
        select: {
            id: true,
            email: true,
            name: true,
            company: true,
            createdAt: true,
            updatedAt: true,
            routes: {
                select: {
                    id: true,
                    originLat: true,
                    originLng: true,
                    destLat: true,
                    destLng: true,
                    fuelSavings: true,
                    carbonReduction: true,
                    createdAt: true
                },
                orderBy: {
                    createdAt: "desc"
                },
                take: 10
            },
            _count: {
                select: {
                    routes: true,
                    orders: true
                }
            }
        }
    });

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

/**
 * Update user profile
 */
export const updateUserProfile = async (userId, updateData) => {
    const { email, ...otherData } = updateData;

    // Check if email is being updated and if it's already taken
    if (email) {
        const existingUser = await prisma.user.findUnique({
            where: { email },
            select: { id: true }
        });

        if (existingUser && existingUser.id !== userId) {
            throw new Error("Email is already taken");
        }
    }

    const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
            ...(email && { email }),
            ...otherData
        },
        select: {
            id: true,
            email: true,
            name: true,
            company: true,
            createdAt: true,
            updatedAt: true
        }
    });

    return updatedUser;
};

/**
 * Delete user account and all associated data
 */
export const deleteUserAccount = async (userId) => {
    return await prisma.$transaction(async (tx) => {
        // Delete user's orders
        await tx.order.deleteMany({
            where: { userId }
        });

        // Delete user's routes
        await tx.route.deleteMany({
            where: { userId }
        });

        // Delete user
        await tx.user.delete({
            where: { id: userId }
        });
    });
};

/**
 * Change user password
 */
export const changePassword = async (userId, currentPassword, newPassword) => {
    const user = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!user) {
        throw new Error("User not found");
    }

    // Verify current password
    const isCurrentPasswordValid = await bcrypt.compare(currentPassword, user.password);
    if (!isCurrentPasswordValid) {
        throw new Error("Current password is incorrect");
    }

    // Hash new password
    const saltRounds = 12;
    const hashedNewPassword = await bcrypt.hash(newPassword, saltRounds);

    // Update password
    await prisma.user.update({
        where: { id: userId },
        data: { password: hashedNewPassword }
    });

    return true;
};
