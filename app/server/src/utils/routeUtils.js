// utils/routeUtils.js
export function generateRouteKey(originLat, originLng, destLat, destLng, vehicleType) {
    return `${originLat.toFixed(4)}_${originLng.toFixed(4)}_${destLat.toFixed(4)}_${destLng.toFixed(
        4
    )}_${vehicleType}`;
}

export function calculateFuelCost(distance, vehicleType, packageWeight = 0, trafficFactor = 1.0) {
    const baseRate = vehicleType === "ELECTRIC" ? 0.15 : 0.22; // ₹ per km
    const weightMultiplier = 1 + packageWeight * 0.002; // 0.2% increase per kg
    const trafficMultiplier = trafficFactor;

    return distance * baseRate * weightMultiplier * trafficMultiplier;
}

export function formatDistance(km) {
    return km < 1 ? `${(km * 1000).toFixed(0)}m` : `${km.toFixed(1)}km`;
}

export function formatTime(minutes) {
    if (minutes < 60) return `${minutes.toFixed(0)}min`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
}
