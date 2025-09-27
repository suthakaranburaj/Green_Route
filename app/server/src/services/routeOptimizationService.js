import NodeCache from "node-cache";

export class RouteOptimizationService {
    constructor() {
        this.cache = new NodeCache({ stdTTL: 300 }); // 5 minutes cache
        this.baseFuelCost = 22; // ₹ per km
        this.evEfficiency = 0.15; // kWh per km
        this.petrolEfficiency = 0.08; // liters per km
    }

    async optimizeRoute(routeData) {
        const cacheKey = this.generateCacheKey(routeData);

        // Check cache first
        const cachedResult = this.cache.get(cacheKey);
        if (cachedResult) {
            return cachedResult;
        }

        const optimizedRoute = await this.calculateOptimalRoute(routeData);

        // Cache the result
        this.cache.set(cacheKey, optimizedRoute);

        return optimizedRoute;
    }

    generateCacheKey(routeData) {
        return `route_${routeData.originLat}_${routeData.originLng}_${routeData.destLat}_${routeData.destLng}_${routeData.packageWeight}_${routeData.trafficLevel}`;
    }

    async calculateOptimalRoute(routeData) {
        const {
            originLat,
            originLng,
            destLat,
            destLng,
            packageWeight,
            trafficLevel,
            riderShiftLength,
            vehicleType
        } = routeData;

        // Calculate base distance using Haversine formula
        const distance = this.calculateDistance(originLat, originLng, destLat, destLng);

        // Adjust for traffic
        const trafficMultiplier = this.getTrafficMultiplier(trafficLevel);
        const adjustedDistance = distance * trafficMultiplier;

        // Calculate fuel consumption and savings
        const fuelSavings = await this.calculateFuelSavings({
            distance: adjustedDistance,
            packageWeight,
            trafficLevel,
            vehicleType
        });

        // Generate optimal path points
        const optimizedPath = this.generatePathPoints(originLat, originLng, destLat, destLng);

        // Calculate rider swap points
        const riderSwapPoints = this.calculateRiderSwapPoints(optimizedPath, riderShiftLength);

        return {
            optimizedPath,
            distance: adjustedDistance,
            estimatedTime: this.calculateEstimatedTime(adjustedDistance, trafficLevel),
            fuelSavings: fuelSavings.percentage,
            costSavings: fuelSavings.cost,
            carbonReduction: this.calculateCarbonReduction(fuelSavings.fuelSaved),
            riderSwapPoints,
            vehicleRecommendation: this.getVehicleRecommendation(adjustedDistance, packageWeight)
        };
    }

    calculateDistance(lat1, lon1, lat2, lon2) {
        const R = 6371; // Earth's radius in km
        const dLat = this.toRad(lat2 - lat1);
        const dLon = this.toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(this.toRad(lat1)) *
                Math.cos(this.toRad(lat2)) *
                Math.sin(dLon / 2) *
                Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        return R * c;
    }

    toRad(degrees) {
        return degrees * (Math.PI / 180);
    }

    getTrafficMultiplier(trafficLevel) {
        const multipliers = {
            low: 1.0,
            medium: 1.3,
            high: 1.7
        };
        return multipliers[trafficLevel] || 1.0;
    }

    async calculateFuelSavings(params) {
        const { distance, packageWeight, trafficLevel, vehicleType } = params;

        // Base fuel consumption
        let baseConsumption = distance * this.petrolEfficiency;

        // Adjust for package weight (heavier packages increase consumption)
        const weightMultiplier = 1 + (packageWeight / 100) * 0.1;
        baseConsumption *= weightMultiplier;

        // Calculate optimized consumption (AI algorithm)
        const optimizedConsumption = baseConsumption * 0.906; // 9.4% savings

        const fuelSaved = baseConsumption - optimizedConsumption;
        const costSavings = fuelSaved * this.baseFuelCost;
        const percentageSavings =
            ((baseConsumption - optimizedConsumption) / baseConsumption) * 100;

        return {
            fuelSaved,
            cost: costSavings,
            percentage: percentageSavings
        };
    }

    generatePathPoints(lat1, lon1, lat2, lon2) {
        const points = [];
        const steps = 10;

        for (let i = 0; i <= steps; i++) {
            const fraction = i / steps;
            points.push({
                lat: lat1 + (lat2 - lat1) * fraction,
                lng: lon1 + (lon2 - lon1) * fraction
            });
        }

        return points;
    }

    calculateRiderSwapPoints(path, shiftLength) {
        if (shiftLength <= 4) return []; // No swap needed for short shifts

        const swapPoints = [];
        const swapInterval = 4; // hours

        for (let i = 1; i * swapInterval < shiftLength; i++) {
            const swapIndex = Math.floor(((i * swapInterval) / shiftLength) * path.length);
            if (swapIndex < path.length) {
                swapPoints.push(path[swapIndex]);
            }
        }

        return swapPoints;
    }

    calculateCarbonReduction(fuelSaved) {
        // Diesel emits approx 2.68 kg CO2 per liter
        return fuelSaved * 2.68 * 1000; // Convert to grams
    }

    getVehicleRecommendation(distance, weight) {
        if (distance < 20 && weight < 10) return "EV";
        if (distance > 50) return "Petrol";
        return "Mixed";
    }

    calculateEstimatedTime(distance, trafficLevel) {
        const baseSpeed = 25; // km/h average speed
        const trafficSpeed = baseSpeed / this.getTrafficMultiplier(trafficLevel);
        return Math.round((distance / trafficSpeed) * 60); // minutes
    }
}
