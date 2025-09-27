import { asyncHandler, sendResponse, statusType } from "../utils/index.js";
import * as routeService from "../services/routeService.js";

/**
 * @desc    Optimize a delivery route using AI algorithms
 * @route   POST /api/routes/optimize
 * @access  Private
 */

export const optimizeRoute = asyncHandler(async (req, res) => {
    const {
        originLat,
        originLng,
        destLat,
        destLng,
        packageWeight,
        trafficLevel,
        riderShiftLength,
        vehicleType,
        userId
    } = req.body;

    const optimizedRoute = await routeService.optimizeRoute({
        originLat,
        originLng,
        destLat,
        destLng,
        packageWeight,
        trafficLevel,
        riderShiftLength,
        vehicleType,
        userId
    });

    return sendResponse(
        res,
        true,
        optimizedRoute,
        "Route optimized successfully",
        statusType.CREATED
    );
});

/**
 * @desc    Get route optimization history for a user
 * @route   GET /api/routes/history/:userId
 * @access  Private
 */
export const getRouteHistory = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { page = 1, limit = 10, startDate, endDate } = req.query;

    const history = await routeService.getRouteHistory(
        userId,
        parseInt(page),
        parseInt(limit),
        startDate,
        endDate
    );

    return sendResponse(res, true, history, "Route history retrieved successfully", statusType.OK);
});

/**
 * @desc    Get specific route by ID
 * @route   GET /api/routes/:id
 * @access  Private
 */
export const getRouteById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const route = await routeService.getRouteById(id);

    return sendResponse(res, true, route, "Route details retrieved successfully", statusType.OK);
});

/**
 * @desc    Get comprehensive analytics for user's routes
 * @route   GET /api/routes/analytics/:userId
 * @access  Private
 */
export const getRouteAnalytics = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { period = "30d" } = req.query;

    const analytics = await routeService.getRouteAnalytics(userId, period);

    return sendResponse(
        res,
        true,
        analytics,
        "Route analytics retrieved successfully",
        statusType.OK
    );
});

/**
 * @desc    Get carbon savings analytics for user
 * @route   GET /api/routes/carbon-savings/:userId
 * @access  Private
 */
export const getCarbonSavings = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    const carbonSavings = await routeService.getCarbonSavings(userId, startDate, endDate);

    return sendResponse(
        res,
        true,
        carbonSavings,
        "Carbon savings data retrieved successfully",
        statusType.OK
    );
});

/**
 * @desc    Get fuel savings analytics for user
 * @route   GET /api/routes/fuel-savings/:userId
 * @access  Private
 */
export const getFuelSavings = asyncHandler(async (req, res) => {
    const { userId } = req.params;
    const { startDate, endDate } = req.query;

    const fuelSavings = await routeService.getFuelSavings(userId, startDate, endDate);

    return sendResponse(
        res,
        true,
        fuelSavings,
        "Fuel savings data retrieved successfully",
        statusType.OK
    );
});
