import Joi from "joi";

export const optimizeRouteSchema = Joi.object({
    originLat: Joi.number().min(-90).max(90).required().messages({
        "number.base": "Origin latitude must be a number",
        "number.min": "Origin latitude must be between -90 and 90",
        "number.max": "Origin latitude must be between -90 and 90",
        "any.required": "Origin latitude is required"
    }),
    originLng: Joi.number().min(-180).max(180).required().messages({
        "number.base": "Origin longitude must be a number",
        "number.min": "Origin longitude must be between -180 and 180",
        "number.max": "Origin longitude must be between -180 and 180",
        "any.required": "Origin longitude is required"
    }),
    destLat: Joi.number().min(-90).max(90).required().messages({
        "number.base": "Destination latitude must be a number",
        "number.min": "Destination latitude must be between -90 and 90",
        "number.max": "Destination latitude must be between -90 and 90",
        "any.required": "Destination latitude is required"
    }),
    destLng: Joi.number().min(-180).max(180).required().messages({
        "number.base": "Destination longitude must be a number",
        "number.min": "Destination longitude must be between -180 and 180",
        "number.max": "Destination longitude must be between -180 and 180",
        "any.required": "Destination longitude is required"
    }),
    packageWeight: Joi.number().min(0).max(1000).required().messages({
        "number.base": "Package weight must be a number",
        "number.min": "Package weight must be at least 0 kg",
        "number.max": "Package weight must be less than 1000 kg",
        "any.required": "Package weight is required"
    }),
    trafficLevel: Joi.string().valid("low", "medium", "high").required().messages({
        "string.base": "Traffic level must be a string",
        "any.only": "Traffic level must be one of: low, medium, high",
        "any.required": "Traffic level is required"
    }),
    riderShiftLength: Joi.number().integer().min(1).max(24).required().messages({
        "number.base": "Rider shift length must be a number",
        "number.integer": "Rider shift length must be an integer",
        "number.min": "Rider shift length must be at least 1 hour",
        "number.max": "Rider shift length must be at most 24 hours",
        "any.required": "Rider shift length is required"
    }),
    vehicleType: Joi.string().valid("petrol", "ev", "mixed").required().messages({
        "string.base": "Vehicle type must be a string",
        "any.only": "Vehicle type must be one of: petrol, ev, mixed",
        "any.required": "Vehicle type is required"
    }),
    userId: Joi.string().optional()
});

export const userIdParamSchema = Joi.object({
    userId: Joi.string().required().messages({
        "string.base": "User ID must be a string",
        "any.required": "User ID is required"
    })
});

export const routeIdParamSchema = Joi.object({
    id: Joi.string().required().messages({
        "string.base": "Route ID must be a string",
        "any.required": "Route ID is required"
    })
});

export const dateRangeSchema = Joi.object({
    startDate: Joi.date().optional(),
    endDate: Joi.date().optional().min(Joi.ref("startDate")).messages({
        "date.min": "End date must be after start date"
    })
});
