export const config = {
    jwtSecret: process.env.JWT_SECRET || "your-super-secret-jwt-key-change-in-production",
    jwtExpiresIn: process.env.JWT_EXPIRES_IN || "30d",
    bcryptSaltRounds: parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12,
    nodeEnv: process.env.NODE_ENV || "development"
};
