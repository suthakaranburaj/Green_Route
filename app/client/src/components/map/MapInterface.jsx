// MapInterface.js
"use client";

import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import { Navigation } from "lucide-react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix for default markers in Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Custom icons with updated theme
const originIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiMxNjlINzYiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjEyIiB5PSIxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5TPC90ZXh0Pgo8L3N2Zz4K",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const destinationIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiM4QjVGQjIiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjx0ZXh0IHg9IjEyIiB5PSIxNiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZmlsbD0iI2ZmZiIgZm9udC1mYW1pbHk9IkFyaWFsIiBmb250LXNpemU9IjEwIj5EPC90ZXh0Pgo8L3N2Zz4K",
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const swapPointIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTIiIGN5PSIxMiIgcj0iMTAiIGZpbGw9IiNGRjkwMzAiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+CjxwYXRoIGQ9Ik03IDEwTDEzIDEwTTEwIDdWMTMiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+Cjwvc3ZnPg==",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

// Map controller component
function MapController({ center, zoom }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center, zoom);
  }, [map, center, zoom]);

  return null;
}

// Click handler component
function MapClickHandler({ onMapClick, enabled }) {
  const map = useMap();

  useEffect(() => {
    if (!enabled) return;

    const handleClick = (e) => {
      onMapClick(e.latlng);
    };

    map.on("click", handleClick);
    return () => {
      map.off("click", handleClick);
    };
  }, [map, onMapClick, enabled]);

  return null;
}

export default function MapInterface({
  onRouteSelect,
  optimizationResult,
  isLoading = false,
}) {
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [clickMode, setClickMode] = useState("origin");
  const mapRef = useRef();

  const defaultCenter = [12.9716, 77.5946];
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const [zoom, setZoom] = useState(12);

  const handleMapClick = (latlng) => {
    if (clickMode === "origin") {
      setOrigin(latlng);
      setClickMode("destination");
    } else if (clickMode === "destination") {
      setDestination(latlng);
      setClickMode("none");

      if (onRouteSelect) {
        onRouteSelect({
          origin: { lat: origin.lat, lng: origin.lng },
          destination: { lat: latlng.lat, lng: latlng.lng },
        });
      }
    }
  };

  const clearRoute = () => {
    setOrigin(null);
    setDestination(null);
    setClickMode("origin");
    if (onRouteSelect) {
      onRouteSelect(null);
    }
  };

  const setToCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setMapCenter([latitude, longitude]);
          setZoom(15);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    }
  };

  useEffect(() => {
    if (origin && destination && mapRef.current) {
      const map = mapRef.current;
      const bounds = L.latLngBounds([origin, destination]);
      map.fitBounds(bounds, { padding: [20, 20] });
    }
  }, [origin, destination]);

  return (
    <div className="relative w-full h-full">
      {/* Map Controls */}
      <div className="absolute top-6 left-6 z-[1000] space-y-3">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-6 space-y-4 min-w-[250px] border border-white/20 dark:border-gray-700/50">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900 dark:text-white flex items-center">
              <Navigation className="w-5 h-5 text-green-600 mr-2" />
              Route Selection
            </h3>
            <button
              onClick={clearRoute}
              className="text-sm text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
            >
              Clear
            </button>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => setClickMode("origin")}
              className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                clickMode === "origin"
                  ? "bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/30 dark:to-emerald-900/30 border border-green-300 dark:border-green-700 shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-600 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {origin ? "Origin Set" : "Set Origin"}
                </span>
              </div>
              {origin && (
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  {origin.lat.toFixed(4)}, {origin.lng.toFixed(4)}
                </div>
              )}
            </button>

            <button
              onClick={() => setClickMode("destination")}
              className={`w-full text-left p-3 rounded-xl transition-all duration-300 ${
                clickMode === "destination"
                  ? "bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 border border-blue-300 dark:border-blue-700 shadow-lg"
                  : "bg-gray-100 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600"
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-blue-600 rounded-full"></div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {destination ? "Destination Set" : "Set Destination"}
                </span>
              </div>
              {destination && (
                <div className="text-xs text-gray-600 dark:text-gray-400 mt-2">
                  {destination.lat.toFixed(4)}, {destination.lng.toFixed(4)}
                </div>
              )}
            </button>
          </div>

          <button
            onClick={setToCurrentLocation}
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-2 px-3 rounded-xl text-sm font-medium hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            Use My Location
          </button>
        </div>

        {/* Loading Indicator */}
        {isLoading && (
          <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-white/20 dark:border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="animate-spin rounded-full h-6 w-6 border-2 border-green-600 border-t-transparent"></div>
              <div>
                <div className="text-sm font-medium text-gray-900 dark:text-white">
                  Optimizing Route
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  AI is calculating the best path...
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Route Info */}
        {(origin || destination) && (
          <div className="bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-4 border border-green-200 dark:border-green-800">
            <div className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Route Info
            </div>
            <div className="space-y-1 text-xs text-gray-600 dark:text-gray-400">
              {origin && (
                <div>
                  📍 Origin: {origin.lat.toFixed(4)}, {origin.lng.toFixed(4)}
                </div>
              )}
              {destination && (
                <div>
                  🎯 Destination: {destination.lat.toFixed(4)},{" "}
                  {destination.lng.toFixed(4)}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Map */}
      <MapContainer
        center={mapCenter}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapController center={mapCenter} zoom={zoom} />
        <MapClickHandler
          onMapClick={handleMapClick}
          enabled={clickMode !== "none"}
        />

        {/* Origin Marker */}
        {origin && (
          <Marker position={origin} icon={originIcon}>
            <Popup>
              <div className="text-center">
                <strong>📍 Origin</strong>
                <br />
                Lat: {origin.lat.toFixed(4)}
                <br />
                Lng: {origin.lng.toFixed(4)}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Destination Marker */}
        {destination && (
          <Marker position={destination} icon={destinationIcon}>
            <Popup>
              <div className="text-center">
                <strong>🎯 Destination</strong>
                <br />
                Lat: {destination.lat.toFixed(4)}
                <br />
                Lng: {destination.lng.toFixed(4)}
              </div>
            </Popup>
          </Marker>
        )}

        {/* Original Route */}
        {optimizationResult?.optimizedRoute?.originalPath && (
          <Polyline
            positions={optimizationResult.optimizedRoute.originalPath}
            color="#EF4444"
            weight={4}
            opacity={0.7}
            dashArray="10, 10"
          />
        )}

        {/* Optimized Route */}
        {optimizationResult?.optimizedRoute?.optimizedPath && (
          <Polyline
            positions={optimizationResult.optimizedRoute.optimizedPath}
            color="#10B981"
            weight={6}
            opacity={0.9}
          />
        )}

        {/* Rider Swap Points */}
        {optimizationResult?.optimizedRoute?.riderSwapPoints?.map(
          (point, index) => (
            <Marker
              key={index}
              position={[point.lat, point.lng]}
              icon={swapPointIcon}
            >
              <Popup>
                <div className="text-center">
                  <strong>🔄 Rider Swap Point #{index + 1}</strong>
                  <br />
                  {point.reason}
                  <br />
                  ⏱️ Wait: {point.estimatedWait}min
                </div>
              </Popup>
            </Marker>
          )
        )}
      </MapContainer>
    </div>
  );
}
