// RouteOptimization.js
"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import {
  Map,
  Zap,
  Clock,
  Cog,
  Navigation,
  RotateCcw,
  BarChart3,
  Truck,
  Battery,
  Sparkles,
  ArrowRight,
  Route,
  Target,
  Leaf,
  Coins,
  Gauge,
  Play,
} from "lucide-react";
import toast from "react-hot-toast";
import {
  getCarbonSavings,
  getFuelSavings,
  getRouteHistory,
  getRouteAnalytics,
  optimizeRoute,
} from "@/services/routesServices";

// Dynamically import the map component (SSR compatibility)
const MapInterface = dynamic(() => import("@/components/map/MapInterface"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading map...</p>
      </div>
    </div>
  ),
});

export default function RouteOptimization() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [optimizationParams, setOptimizationParams] = useState({
    packageWeight: "5",
    riderShiftLength: "480",
    vehicleType: "bike",
    trafficConditions: "moderate",
  });

  const handleRouteSelect = (route) => {
    setSelectedRoute(route);
    setResult(null);
  };

  const handleOptimize = async () => {
    if (!selectedRoute) {
      toast.error("Please select origin and destination on the map");
      return;
    }

    setLoading(true);
    setResult(null);

    // Simulate API call with mock data
    setTimeout(() => {
      const mockResult = {
        fuelSaved: 9.4,
        timeSaved: 15,
        distance: 12.5,
        optimizedRoute: {
          co2Saved: 3200,
          originalPath: [
            [12.9716, 77.5946],
            [12.975, 77.6],
            [13.1986, 77.7066],
          ],
          optimizedPath: [
            [12.9716, 77.5946],
            [12.98, 77.61],
            [13.1986, 77.7066],
          ],
          riderSwapPoints: [
            {
              lat: 12.98,
              lng: 77.61,
              reason: "Battery Swap",
              estimatedWait: 5,
            },
          ],
        },
      };

      setResult(mockResult);
      toast.success("Route optimized successfully!");
      setLoading(false);
    }, 2000);
  };

  const handleParamChange = (key, value) => {
    setOptimizationParams((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const resetAll = () => {
    setSelectedRoute(null);
    setResult(null);
    setOptimizationParams({
      packageWeight: "5",
      riderShiftLength: "480",
      vehicleType: "bike",
      trafficConditions: "moderate",
    });
  };

  const sampleRoutes = [
    {
      name: "Bangalore City Center to Airport",
      origin: { lat: 12.9716, lng: 77.5946 },
      destination: { lat: 13.1986, lng: 77.7066 },
    },
    {
      name: "Delhi Metro Routes",
      origin: { lat: 28.6139, lng: 77.209 },
      destination: { lat: 28.7041, lng: 77.1025 },
    },
    {
      name: "Mumbai Coastal Route",
      origin: { lat: 19.076, lng: 72.8777 },
      destination: { lat: 18.922, lng: 72.8347 },
    },
  ];

  const loadSampleRoute = (route) => {
    setSelectedRoute({
      origin: route.origin,
      destination: route.destination,
    });
    setResult(null);
  };

  return (
    <div className="overflow-y-hidden min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-emerald-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative overflow-hidden max-w-9xl mx-auto">
        {/* Header */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-b border-white/20 dark:border-gray-700/50">
          <div className="px-6 py-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 mb-4">
              <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-sm font-medium text-green-800 dark:text-green-200">
                AI-Powered Route Optimization
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white flex items-center mb-2">
              <Map className="h-8 w-8 text-green-600 mr-3" />
              <span className="bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
                AI Route Optimizer
              </span>
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-300">
              Click on the map to set origin and destination, then optimize for
              fuel efficiency
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 h-[calc(100vh-200px)]">
          {/* Sidebar - Controls and Results */}
          <div className="xl:col-span-1 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-r border-white/20 dark:border-gray-700/50 overflow-y-auto">
            <div className="p-6 space-y-6">
              {/* Route Selection Status */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-4 border border-green-200 dark:border-green-800">
                <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                  <Route className="w-5 h-5 text-green-600 mr-2" />
                  Route Selection
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Origin:
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        selectedRoute ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {selectedRoute ? "✓ Set" : "✗ Not set"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Destination:
                    </span>
                    <span
                      className={`text-sm font-medium ${
                        selectedRoute ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {selectedRoute ? "✓ Set" : "✗ Not set"}
                    </span>
                  </div>
                </div>
                {selectedRoute && (
                  <button
                    onClick={resetAll}
                    className="w-full mt-3 flex items-center justify-center space-x-2 text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <RotateCcw className="h-4 w-4" />
                    <span>Reset Route</span>
                  </button>
                )}
              </div>

              {/* Optimization Parameters */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                  <Cog className="w-5 h-5 text-blue-600 mr-2" />
                  Optimization Parameters
                </h3>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Gauge className="w-4 h-4 inline mr-1" />
                    Package Weight (kg)
                  </label>
                  <input
                    type="number"
                    min="0"
                    step="0.1"
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    value={optimizationParams.packageWeight}
                    onChange={(e) =>
                      handleParamChange("packageWeight", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Clock className="w-4 h-4 inline mr-1" />
                    Shift Length (minutes)
                  </label>
                  <input
                    type="number"
                    min="30"
                    step="30"
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    value={optimizationParams.riderShiftLength}
                    onChange={(e) =>
                      handleParamChange("riderShiftLength", e.target.value)
                    }
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Truck className="w-4 h-4 inline mr-1" />
                    Vehicle Type
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    value={optimizationParams.vehicleType}
                    onChange={(e) =>
                      handleParamChange("vehicleType", e.target.value)
                    }
                  >
                    <option value="bike">Motorcycle</option>
                    <option value="scooter">Electric Scooter</option>
                    <option value="car">Car</option>
                    <option value="truck">Small Truck</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    <Navigation className="w-4 h-4 inline mr-1" />
                    Traffic Conditions
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-white/50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                    value={optimizationParams.trafficConditions}
                    onChange={(e) =>
                      handleParamChange("trafficConditions", e.target.value)
                    }
                  >
                    <option value="light">Light Traffic</option>
                    <option value="moderate">Moderate Traffic</option>
                    <option value="heavy">Heavy Traffic</option>
                    <option value="congested">Congested</option>
                  </select>
                </div>
              </div>

              {/* Optimize Button */}
              <button
                onClick={handleOptimize}
                disabled={!selectedRoute || loading}
                className="w-full group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 disabled:opacity-50 disabled:hover:transform-none"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    <span>Optimizing...</span>
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2 group-hover:animate-bounce" />
                    <span>Optimize Route</span>
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
                  </>
                )}
              </button>

              {/* Quick Test Routes */}
              <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-2xl p-4 border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-200 mb-3 flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  Quick Test Routes
                </h4>
                <div className="space-y-2">
                  {sampleRoutes.map((route, index) => (
                    <button
                      key={index}
                      onClick={() => loadSampleRoute(route)}
                      className="w-full text-left p-3 bg-white/50 dark:bg-gray-800/50 rounded-xl text-sm text-blue-700 dark:text-blue-300 hover:bg-white dark:hover:bg-gray-700 transition-colors border border-blue-200 dark:border-blue-700"
                    >
                      {route.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Results Display */}
              {result && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
                    <BarChart3 className="h-5 w-5 text-green-600 mr-2" />
                    Optimization Results
                  </h3>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-3 rounded-2xl text-white shadow-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Zap className="h-4 w-4" />
                        <span className="text-sm font-semibold">
                          Fuel Savings
                        </span>
                      </div>
                      <div className="text-xl font-bold">
                        {result.fuelSaved?.toFixed(1)}%
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-blue-500 to-cyan-600 p-3 rounded-2xl text-white shadow-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm font-semibold">
                          Time Saved
                        </span>
                      </div>
                      <div className="text-xl font-bold">
                        {result.timeSaved} min
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-emerald-500 to-teal-600 p-3 rounded-2xl text-white shadow-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Leaf className="h-4 w-4" />
                        <span className="text-sm font-semibold">CO₂ Saved</span>
                      </div>
                      <div className="text-xl font-bold">
                        {(
                          (result.optimizedRoute?.co2Saved || 0) / 1000
                        ).toFixed(1)}{" "}
                        kg
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-3 rounded-2xl text-white shadow-lg">
                      <div className="flex items-center space-x-2 mb-1">
                        <Truck className="h-4 w-4" />
                        <span className="text-sm font-semibold">Distance</span>
                      </div>
                      <div className="text-xl font-bold">
                        {result.distance?.toFixed(1)} km
                      </div>
                    </div>
                  </div>

                  {result.optimizedRoute?.riderSwapPoints && (
                    <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-4 rounded-2xl border border-amber-200 dark:border-amber-800">
                      <h4 className="font-medium text-amber-800 dark:text-amber-200 mb-2">
                        Rider Swap Points
                      </h4>
                      <div className="space-y-1">
                        {result.optimizedRoute.riderSwapPoints.map(
                          (point, index) => (
                            <div
                              key={index}
                              className="text-sm text-amber-700 dark:text-amber-300"
                            >
                              • {point.reason} ({point.estimatedWait} min wait)
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Map Area */}
          <div className="xl:col-span-3 relative">
            <MapInterface
              onRouteSelect={handleRouteSelect}
              optimizationResult={result}
              isLoading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
