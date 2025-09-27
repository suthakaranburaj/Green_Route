import { PrismaClient } from "@prisma/client";
import { RouteOptimizationService } from "./routeOptimizationService.js";

const prisma = new PrismaClient();
const routeOptimizationService = new RouteOptimizationService();

/**
 * Optimize a delivery route
 */
export const optimizeRoute = async (routeData) => {
    return await prisma.$transaction(async (tx) => {
        // Optimize the route using AI service
        const optimizedResult = await routeOptimizationService.optimizeRoute(routeData);

        // Save the optimized route to database
        const savedRoute = await tx.route.create({
            data: {
                userId: routeData.userId,
                originLat: routeData.originLat,
                originLng: routeData.originLng,
                destLat: routeData.destLat,
                destLng: routeData.destLng,
                packageWeight: routeData.packageWeight,
                trafficLevel: routeData.trafficLevel,
                riderShiftLength: routeData.riderShiftLength,
                vehicleType: routeData.vehicleType,
                optimizedPath: optimizedResult.optimizedPath,
                fuelSavings: optimizedResult.fuelSavings,
                distance: optimizedResult.distance,
                estimatedTime: optimizedResult.estimatedTime,
                riderSwapPoints: optimizedResult.riderSwapPoints,
                carbonReduction: optimizedResult.carbonReduction
            },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        company: true
                    }
                }
            }
        });

        return {
            ...savedRoute,
            costSavings: optimizedResult.costSavings,
            vehicleRecommendation: optimizedResult.vehicleRecommendation
        };
    });
};

/**
 * Get route history for a user
 */
export const getRouteHistory = async (userId, page = 1, limit = 10, startDate, endDate) => {
    const skip = (page - 1) * limit;

    const whereClause = {
        userId,
        ...(startDate &&
            endDate && {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                }
            })
    };

    const [routes, totalCount] = await Promise.all([
        prisma.route.findMany({
            where: whereClause,
            orderBy: { createdAt: "desc" },
            skip,
            take: limit,
            include: {
                orders: {
                    select: {
                        id: true,
                        status: true,
                        createdAt: true
                    }
                }
            }
        }),
        prisma.route.count({ where: whereClause })
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
        routes,
        pagination: {
            currentPage: page,
            totalPages,
            totalCount,
            hasNext: page < totalPages,
            hasPrev: page > 1
        }
    };
};

/**
 * Get specific route by ID
 */
export const getRouteById = async (routeId) => {
    const route = await prisma.route.findUnique({
        where: { id: routeId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    company: true
                }
            },
            orders: {
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true
                        }
                    }
                }
            }
        }
    });

    if (!route) {
        throw new Error("Route not found");
    }

    return route;
};

/**
 * Get comprehensive route analytics
 */
export const getRouteAnalytics = async (userId, period = "30d") => {
    const dateRange = getDateRangeFromPeriod(period);

    const analytics = await prisma.route.groupBy({
        by: ["vehicleType", "trafficLevel"],
        where: {
            userId,
            createdAt: {
                gte: dateRange.start,
                lte: dateRange.end
            }
        },
        _count: {
            id: true
        },
        _avg: {
            fuelSavings: true,
            distance: true,
            carbonReduction: true
        },
        _sum: {
            distance: true,
            carbonReduction: true
        }
    });

    const totalStats = await prisma.route.aggregate({
        where: {
            userId,
            createdAt: {
                gte: dateRange.start,
                lte: dateRange.end
            }
        },
        _count: { id: true },
        _avg: { fuelSavings: true },
        _sum: { distance: true, carbonReduction: true }
    });

    return {
        period,
        totalRoutes: totalStats._count.id,
        averageFuelSavings: totalStats._avg.fuelSavings,
        totalDistance: totalStats._sum.distance,
        totalCarbonReduction: totalStats._sum.carbonReduction,
        breakdown: analytics
    };
};

/**
 * Get carbon savings analytics
 */
export const getCarbonSavings = async (userId, startDate, endDate) => {
    const whereClause = {
        userId,
        ...(startDate &&
            endDate && {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                }
            })
    };

    const carbonData = await prisma.route.findMany({
        where: whereClause,
        select: {
            id: true,
            createdAt: true,
            carbonReduction: true,
            distance: true,
            vehicleType: true
        },
        orderBy: { createdAt: "asc" }
    });

    const totalCarbonReduction = carbonData.reduce(
        (sum, route) => sum + (route.carbonReduction || 0),
        0
    );

    return {
        totalCarbonReduction,
        carbonData,
        equivalentTrees: Math.round(totalCarbonReduction / 22000), // approx CO2 absorbed by a tree in a year
        equivalentCars: (totalCarbonReduction / 4600).toFixed(2) // approx annual CO2 from a car
    };
};

/**
 * Get fuel savings analytics
 */
export const getFuelSavings = async (userId, startDate, endDate) => {
    const whereClause = {
        userId,
        ...(startDate &&
            endDate && {
                createdAt: {
                    gte: new Date(startDate),
                    lte: new Date(endDate)
                }
            })
    };

    const fuelData = await prisma.route.aggregate({
        where: whereClause,
        _avg: {
            fuelSavings: true
        },
        _sum: {
            distance: true
        },
        _count: {
            id: true
        }
    });

    const estimatedCostSavings = (fuelData._sum.distance || 0) * 0.094 * 22; // 9.4% savings at ₹22/km

    return {
        averageFuelSavings: fuelData._avg.fuelSavings,
        totalDistance: fuelData._sum.distance,
        totalRoutes: fuelData._count.id,
        estimatedCostSavings,
        estimatedFuelSaved: (fuelData._sum.distance || 0) * 0.094 * 0.08 // 9.4% savings at 0.08L/km
    };
};

// Helper function to calculate date ranges
const getDateRangeFromPeriod = (period) => {
    const endDate = new Date();
    let startDate = new Date();

    switch (period) {
        case "7d":
            startDate.setDate(endDate.getDate() - 7);
            break;
        case "30d":
            startDate.setDate(endDate.getDate() - 30);
            break;
        case "90d":
            startDate.setDate(endDate.getDate() - 90);
            break;
        case "1y":
            startDate.setFullYear(endDate.getFullYear() - 1);
            break;
        default:
            startDate.setDate(endDate.getDate() - 30);
    }

    return { start: startDate, end: endDate };
};
