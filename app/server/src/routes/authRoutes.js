import express from "express";
import {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUserAccount
} from "../controllers/authController.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
    registerSchema,
    loginSchema,
    updateProfileSchema,
    userIdParamSchema
} from "../validations/authValidation.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", validate(registerSchema), registerUser);
router.post("/login", validate(loginSchema), loginUser);
router.get("/profile/:userId", authenticate, validate(userIdParamSchema), getUserProfile);
router.put("/profile/:userId", authenticate, validate(updateProfileSchema), updateUserProfile);
router.delete("/profile/:userId", authenticate, validate(userIdParamSchema), deleteUserAccount);

export default router;
