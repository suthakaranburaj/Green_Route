import Joi from "joi";

export const registerSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Please provide a valid email address",
        "string.empty": "Email is required",
        "any.required": "Email is required"
    }),
    password: Joi.string().min(6).required().messages({
        "string.min": "Password must be at least 6 characters long",
        "string.empty": "Password is required",
        "any.required": "Password is required"
    }),
    name: Joi.string().min(2).max(100).required().messages({
        "string.min": "Name must be at least 2 characters long",
        "string.max": "Name must not exceed 100 characters",
        "string.empty": "Name is required",
        "any.required": "Name is required"
    }),
    company: Joi.string().max(100).optional().messages({
        "string.max": "Company name must not exceed 100 characters"
    })
});

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.email": "Please provide a valid email address",
        "string.empty": "Email is required",
        "any.required": "Email is required"
    }),
    password: Joi.string().required().messages({
        "string.empty": "Password is required",
        "any.required": "Password is required"
    })
});

export const updateProfileSchema = Joi.object({
    name: Joi.string().min(2).max(100).optional().messages({
        "string.min": "Name must be at least 2 characters long",
        "string.max": "Name must not exceed 100 characters"
    }),
    company: Joi.string().max(100).optional().messages({
        "string.max": "Company name must not exceed 100 characters"
    }),
    email: Joi.string().email().optional().messages({
        "string.email": "Please provide a valid email address"
    })
})
    .min(1) // At least one field to update
    .messages({
        "object.min": "At least one field must be provided for update"
    });

export const userIdParamSchema = Joi.object({
    userId: Joi.string().required().messages({
        "string.base": "User ID must be a string",
        "any.required": "User ID is required"
    })
});
