// Hero.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Play,
  Sparkles,
  Zap,
  Shield,
  Users,
  PieChart,
  CreditCard,
  Smartphone,
  Rocket,
  TrendingUp,
  Target,
  Cpu,
  Map,
} from "lucide-react";

export function Hero() {
  const [currentFeature, setCurrentFeature] = useState(0);

  const features = [
    {
      icon: "Cpu",
      title: "AI-Powered Route Optimization",
      description:
        "Advanced algorithms that reduce fuel consumption by up to 9.4%",
    },
    {
      icon: "Map",
      title: "Real-time Traffic Intelligence",
      description:
        "Dynamic routing based on live traffic conditions and weather",
    },
    {
      icon: "TrendingUp",
      title: "Substantial Cost Savings",
      description: "Potential annual savings of ₹1.4 Cr for 5k orders/day",
    },
    {
      icon: "Target",
      title: "Carbon Emission Reduction",
      description: "Save 20t CO₂ annually while optimizing operations",
    },
  ];

  // Get icon component based on feature name
  const getFeatureIcon = (iconName) => {
    const iconMap = {
      PieChart,
      Shield,
      TrendingUp,
      Target,
      Cpu,
      Map,
    };
    return iconMap[iconName] || PieChart;
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [features.length]);

  const CurrentFeatureIcon = getFeatureIcon(features[currentFeature]?.icon);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-emerald-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 sm:pt-24 sm:pb-20">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-gradient-to-r from-green-100 to-blue-100 dark:from-green-900/20 dark:to-blue-900/20 border border-green-200 dark:border-green-800 mb-8">
            <Sparkles className="w-4 h-4 text-green-600 dark:text-green-400 mr-2" />
            <span className="text-sm font-medium text-green-800 dark:text-green-200">
              AI-Powered Logistics Optimization
            </span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-green-600 via-blue-600 to-emerald-600 bg-clip-text text-transparent">
              Cut Last-Mile Fuel Costs
            </span>
            <br />
            <span className="text-gray-700 dark:text-gray-300">
              with AI Route Optimization
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Green-Route AI engine reduces last-mile delivery costs by 9.4% using
            advanced algorithms, real-time traffic data, and intelligent rider
            management for D2C and 3PL companies.
          </p>

          {/* Feature Carousel */}
          <div className="mb-12">
            <div className="inline-flex items-center px-6 py-3 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border border-gray-200 dark:border-gray-700 shadow-lg">
              <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center mr-3">
                <CurrentFeatureIcon className="w-4 h-4 text-white" />
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold text-gray-900 dark:text-white">
                  {features[currentFeature]?.title}
                </div>
                <div className="text-xs text-gray-600 dark:text-gray-400">
                  {features[currentFeature]?.description}
                </div>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/demo"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl hover:from-green-700 hover:to-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Rocket className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Start Saving Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <button className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 rounded-2xl border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Watch Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { value: "9.4%", label: "Average Fuel Savings" },
              { value: "₹1.4 Cr", label: "Annual Savings Potential" },
              { value: "20t CO₂", label: "Carbon Reduction/Year" },
              { value: "1.2M", label: "Orders Optimized" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
