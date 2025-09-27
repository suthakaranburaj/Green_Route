import express from "express";
import {
    optimizeRoute,
    getRouteHistory,
    getRouteById,
    getRouteAnalytics,
    getCarbonSavings,
    getFuelSavings
} from "../controllers/routeController.js";
import { validate } from "../middlewares/validation.middleware.js";
import {
    optimizeRouteSchema,
    userIdParamSchema,
    routeIdParamSchema,
    dateRangeSchema
} from "../validations/routeValidation.js";

const router = express.Router();

router.post("/optimize", validate(optimizeRouteSchema), optimizeRoute);
router.get("/history/:userId", validate(userIdParamSchema), getRouteHistory);
router.get("/:id", validate(routeIdParamSchema), getRouteById);
router.get("/analytics/:userId", validate(userIdParamSchema), getRouteAnalytics);
router.get("/carbon-savings/:userId", validate(userIdParamSchema), getCarbonSavings);
router.get("/fuel-savings/:userId", validate(userIdParamSchema), getFuelSavings);

export default router;
