// Features.js
"use client";

import { useState } from "react";
import {
  PieChart,
  Shield,
  Smartphone,
  BookOpen,
  Target,
  CreditCard,
  Users,
  Rocket,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Map,
  Cpu,
  Zap,
  BarChart,
} from "lucide-react";

export function Features() {
  const [activeTab, setActiveTab] = useState(0);

  const features = [
    {
      id: 1,
      icon: "Cpu",
      title: "AI Route Optimization",
      description:
        "Advanced algorithms that calculate optimal routes based on real-time data",
      color: "from-purple-500 to-pink-500",
      featuresList: [
        "Real-time traffic analysis",
        "Dynamic route adjustments",
        "Multi-stop optimization",
        "Fuel consumption prediction",
      ],
    },
    {
      id: 2,
      icon: "Zap",
      title: "Fuel Cost Reduction",
      description:
        "Cut last-mile delivery costs by up to 9.4% with intelligent routing",
      color: "from-green-500 to-blue-500",
      featuresList: [
        "Petrol/EV route optimization",
        "Rider swap point calculation",
        "Package weight consideration",
        "Shift length optimization",
      ],
    },
    {
      id: 3,
      icon: "BarChart",
      title: "Carbon Emission Tracking",
      description:
        "Monitor and reduce your carbon footprint with detailed analytics",
      color: "from-orange-500 to-red-500",
      featuresList: [
        "CO₂ savings calculation",
        "Sustainability reporting",
        "Carbon credit tracking",
        "Environmental impact metrics",
      ],
    },
  ];

  // Get icon component based on feature name
  const getFeatureIcon = (iconName) => {
    const iconMap = {
      PieChart,
      Shield,
      BookOpen,
      Target,
      CreditCard,
      Users,
      TrendingUp,
      Cpu,
      Zap,
      BarChart,
      Map,
    };
    return iconMap[iconName] || PieChart;
  };

  return (
    <section className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            AI-Powered Logistics{" "}
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Features
            </span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Advanced features designed to optimize your last-mile delivery
            operations and maximize efficiency
          </p>
        </div>

        {/* Feature Tabs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Tab Navigation */}
          <div className="space-y-4">
            {features.map((feature, index) => {
              const Icon = getFeatureIcon(feature.icon);
              return (
                <button
                  key={feature.id}
                  onClick={() => setActiveTab(index)}
                  className={`w-full p-6 rounded-2xl border-2 transition-all duration-300 text-left group ${
                    activeTab === index
                      ? "border-green-500 bg-green-50 dark:bg-green-900/20 shadow-lg"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div
                      className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {feature.description}
                      </p>
                    </div>
                    <ArrowRight
                      className={`w-5 h-5 transition-transform duration-300 ${
                        activeTab === index
                          ? "text-green-500 transform translate-x-1"
                          : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                      }`}
                    />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Feature Content */}
          <div className="lg:pl-8">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-700">
              <div className="flex items-center mb-6">
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${features[activeTab].color} flex items-center justify-center shadow-lg mr-4`}
                >
                  {(() => {
                    const Icon = getFeatureIcon(features[activeTab].icon);
                    return <Icon className="w-8 h-8 text-white" />;
                  })()}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {features[activeTab].title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {features[activeTab].description}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features[activeTab].featuresList.map((feature, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-3 p-3 rounded-xl bg-white dark:bg-gray-800 shadow-sm border border-gray-200 dark:border-gray-700"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ready to optimize your logistics?
                    </p>
                    <p className="text-lg font-semibold text-gray-900 dark:text-white">
                      Start saving today
                    </p>
                  </div>
                  <button className="px-6 py-3 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                    <Rocket className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Features Grid */}
        <div className="mt-20">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-12">
            Advanced Capabilities
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: "Map",
                title: "Real-time Traffic Analysis",
                description:
                  "Live traffic data integration for dynamic route adjustments",
                color: "from-blue-500 to-purple-500",
              },
              {
                icon: "Users",
                title: "Rider Management",
                description:
                  "Optimize rider assignments and shift patterns for maximum efficiency",
                color: "from-green-500 to-teal-500",
              },
              {
                icon: "PieChart",
                title: "Performance Analytics",
                description:
                  "Detailed insights into fuel savings and operational efficiency",
                color: "from-orange-500 to-red-500",
              },
            ].map((feature, index) => {
              const Icon = getFeatureIcon(feature.icon);
              return (
                <div
                  key={index}
                  className="group p-6 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
                >
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
