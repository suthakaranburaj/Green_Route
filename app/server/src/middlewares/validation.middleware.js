/**
 * Validation middleware using Joi schemas
 */
export const validate = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body || req.params || req.query, {
            abortEarly: false,
            allowUnknown: false
        });

        if (error) {
            const errorDetails = error.details.map((detail) => ({
                field: detail.path.join("."),
                message: detail.message
            }));

            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: errorDetails,
                timestamp: new Date().toISOString()
            });
        }

        next();
    };
};
