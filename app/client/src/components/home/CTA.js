// CTA.js
"use client";

import Link from "next/link";
import {
  ArrowRight,
  Star,
  Users,
  Zap,
  Sparkles,
  PieChart,
  Shield,
  Play,
} from "lucide-react";

export function CTA() {
  const testimonials = [
    {
      rating: 5,
      content:
        "Green-Route reduced our last-mile fuel costs by 9.4% in just 3 months. The AI optimization is incredible.",
      name: "Rajesh Kumar",
      role: "Logistics Manager, E-commerce Firm",
    },
    {
      rating: 5,
      content:
        "We saved ₹1.4 Cr annually after implementing Green-Route. The ROI was immediate and substantial.",
      name: "Priya Sharma",
      role: "Operations Head, D2C Brand",
    },
    {
      rating: 5,
      content:
        "The carbon reduction angle helped us meet sustainability goals while cutting costs. Brilliant solution.",
      name: "Amit Patel",
      role: "Supply Chain Director, 3PL Company",
    },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-blue-600 to-emerald-600 py-20">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/3 w-72 h-72 bg-white/10 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 mb-8">
            <Sparkles className="w-4 h-4 text-white mr-2" />
            <span className="text-sm font-medium text-white">
              AI-Powered Logistics Optimization
            </span>
          </div>

          {/* Main Content */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            Cut Last-Mile Fuel Costs by
            <br />
            <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Up to 9.4%
            </span>
          </h2>

          <p className="text-xl sm:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed">
            Green-Route AI engine optimizes delivery routes, reduces fuel
            consumption, and cuts carbon emissions for D2C and 3PL companies.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2 flex items-center justify-center">
                <PieChart className="w-8 h-8 mr-2 text-yellow-300" />
                9.4%
              </div>
              <div className="text-blue-100">Average Fuel Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2 flex items-center justify-center">
                <Shield className="w-8 h-8 mr-2 text-yellow-300" />
                ₹1.4 Cr
              </div>
              <div className="text-blue-100">Potential Annual Savings</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white mb-2 flex items-center justify-center">
                <Users className="w-8 h-8 mr-2 text-yellow-300" />
                20t CO₂
              </div>
              <div className="text-blue-100">Carbon Reduction/Year</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/demo"
              className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-green-600 bg-white rounded-2xl hover:bg-gray-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Sparkles className="w-5 h-5 mr-2 group-hover:animate-bounce" />
              Start Saving Now
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>

            <a
              href="#"
              className="group inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-white/20 backdrop-blur-sm rounded-2xl border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-200" />
              Watch Case Study
            </a>
          </div>

          {/* Testimonials */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-300 fill-current"
                    />
                  ))}
                </div>
                <p className="text-blue-100 mb-4 text-sm">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold text-white text-sm">
                    {testimonial.name}
                  </div>
                  <div className="text-blue-200 text-xs">
                    {testimonial.role}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Text */}
          <div className="mt-12">
            <p className="text-blue-100 text-sm">
              Trusted by leading D2C brands and 3PL companies across India
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
