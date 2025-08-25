"use client";

import React, { useState } from "react";
import {
  CheckCircle,
  Users,
  Star,
  ArrowRight,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export default function HowItWorks() {
  const [hoveredStep, setHoveredStep] = useState(null);
  const [activeCard, setActiveCard] = useState(null);

  const steps = [
    {
      number: "01",
      title: "Post A Job",
      description:
        "Create an account and list your educational needs. Browse through a pool of qualified teachers ideal for your tutoring requirements.",
      icon: <Briefcase className="w-8 h-8" />,
    },
    {
      number: "02",
      title: "Evaluate The Bids",
      description:
        "Compare various tutors, review their credentials, and select the best fit for your needs based on experience and ratings.",
      icon: <Users className="w-8 h-8" />,
    },
    {
      number: "03",
      title: "Choose The Right Tutor",
      description:
        "Hire the best tutor at a suitable price, considering reviews and ratings, to boost your child's academic success with Addins Education.",
      icon: <Star className="w-8 h-8" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-24 relative">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-100/40 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 -left-40 w-80 h-80 bg-green-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-green-100 rounded-full text-sm font-medium text-green-800 mb-6">
            <CheckCircle className="w-4 h-4 mr-2" />
            Simple & Effective Process
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight mb-6">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            We strive to make finding and working with a tutor as simple and
            convenient as possible. Here’s how it works:
          </p>
        </div>

        <div className="relative mb-20">
          <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-green-300 to-transparent"></div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div
                key={step.number}
                className="relative group"
                onMouseEnter={() => setHoveredStep(index)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div
                  className={`relative bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform ${
                    hoveredStep === index ? "scale-105 -translate-y-2" : ""
                  } border border-gray-100`}
                >
                  <div className="absolute -top-6 left-8 bg-green-500 text-white rounded-2xl w-14 h-14 flex items-center justify-center text-lg font-bold shadow-lg">
                    {step.number}
                  </div>

                  <div className="mt-6">
                    <div className="inline-flex p-4 bg-green-100 rounded-2xl text-green-600 mb-6 shadow-sm">
                      {step.icon}
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {step.title}
                    </h3>

                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  <div
                    className={`absolute inset-0 bg-gradient-to-br from-green-500/5 to-green-600/5 rounded-3xl transition-opacity duration-500 ${
                      hoveredStep === index ? "opacity-100" : "opacity-0"
                    }`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            className={`relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform ${
              activeCard === "hire" ? "scale-105" : ""
            } border border-gray-100`}
            onMouseEnter={() => setActiveCard("hire")}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-100/50 rounded-full -ml-12 -mb-12"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="inline-flex p-4 bg-green-100 rounded-2xl text-green-600 mb-6 shadow-sm">
                <Users className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Hire Tutors
              </h3>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Your perfect tutor awaits! Hire qualified professionals from
                thousands of tutors and see why Addins Education is trusted by
                hundreds of parents.
              </p>

              <button className="group inline-flex items-center border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Post A Tutor Job
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>

          <div
            className={`relative overflow-hidden bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 p-8 transform ${
              activeCard === "teach" ? "scale-105" : ""
            } border border-gray-100`}
            onMouseEnter={() => setActiveCard("teach")}
            onMouseLeave={() => setActiveCard(null)}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-green-50 rounded-full -mr-16 -mt-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-100/50 rounded-full -ml-12 -mb-12"></div>

            <div className="relative z-10 flex flex-col items-center text-center">
              <div className="inline-flex p-4 bg-green-100 rounded-2xl text-green-600 mb-6 shadow-sm">
                <GraduationCap className="w-8 h-8" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Are You Looking For Teaching Jobs?
              </h3>

              <p className="text-gray-600 mb-8 leading-relaxed">
                Browse available teaching positions, review job descriptions
                (online and offline), and build a promising tutoring career with
                Addins Education.
              </p>

              <button className="group inline-flex items-center border-2 border-green-500 text-green-500 hover:bg-green-500 hover:text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Get Started
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </div>

        <div className="mt-20 bg-white rounded-3xl shadow-lg p-8 border border-gray-100">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "10K+", label: "Active Tutors" },
              { number: "50K+", label: "Happy Students" },
              { number: "95%", label: "Success Rate" },
              { number: "24/7", label: "Support" },
            ].map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2 group-hover:text-green-700 transition-colors duration-300">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
