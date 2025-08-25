"use client";
import React, { useState, useEffect } from "react";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (replace with actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Extended to show the animation better
    
    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 z-50">
      <div className="flex flex-col items-center space-y-6">
        {/* Main Logo Animation */}
        <div className="relative">
          {/* Outer rotating ring - represents growth and connection */}
          <div className="w-24 h-24 border-4 border-blue-200 rounded-full animate-spin absolute"></div>
          <div className="w-24 h-24 border-t-4 border-t-blue-500 rounded-full animate-spin absolute"></div>
          
          {/* Inner educational elements */}
          <div className="w-24 h-24 flex items-center justify-center relative">
            {/* Book icon animation */}
            <div className="relative">
              <div className="w-8 h-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-sm transform animate-pulse">
                {/* Book pages */}
                <div className="absolute top-1 left-1 w-6 h-1 bg-white rounded-full opacity-80"></div>
                <div className="absolute top-2.5 left-1 w-5 h-1 bg-white rounded-full opacity-60"></div>
                <div className="absolute top-4 left-1 w-4 h-1 bg-white rounded-full opacity-40"></div>
              </div>
              {/* Floating knowledge dots */}
              <div className="absolute -top-2 -right-2 w-2 h-2 bg-yellow-400 rounded-full animate-bounce"></div>
              <div className="absolute -bottom-2 -left-2 w-1.5 h-1.5 bg-green-400 rounded-full animate-bounce delay-300"></div>
              <div className="absolute -top-1 -left-3 w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-500"></div>
            </div>
          </div>
        </div>

        {/* Brand Text with Typewriter Effect */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            <span className="text-blue-600">Add-ins</span>
            <span className="text-indigo-600"> Edu</span>
          </h2>
          <div className="flex items-center justify-center space-x-1">
            <span className="text-sm text-gray-600">Connecting</span>
            {/* <div className="flex space-x-1">
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-indigo-500 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce delay-200"></div>
            </div> */}
            <span className="text-sm text-gray-600">Learners</span>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="flex space-x-2">
          {[1, 2, 3, 4].map((item, index) => (
            <div
              key={item}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === 0
                  ? "bg-blue-500 animate-pulse"
                  : index === 1
                  ? "bg-blue-400 animate-pulse delay-200"
                  : index === 2
                  ? "bg-blue-300 animate-pulse delay-400"
                  : "bg-blue-200 animate-pulse delay-600"
              }`}
            ></div>
          ))}
        </div>

        {/* Loading Text */}
        <div className="text-center">
          <p className="text-sm text-gray-500 animate-pulse">
            Preparing your learning experience...
          </p>
        </div>

        {/* Decorative Elements - Floating Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {/* Math symbols */}
          <div className="absolute top-1/4 left-1/4 text-blue-300 text-xl animate-bounce delay-1000 opacity-50">
            ∑
          </div>
          <div className="absolute top-1/3 right-1/4 text-green-300 text-lg animate-bounce delay-1500 opacity-50">
            π
          </div>
          <div className="absolute bottom-1/3 left-1/3 text-purple-300 text-lg animate-bounce delay-2000 opacity-50">
            α
          </div>
          <div className="absolute bottom-1/4 right-1/3 text-pink-300 text-xl animate-bounce delay-2500 opacity-50">
            ∞
          </div>
          
          {/* Book and education icons */}
          <div className="absolute top-1/5 right-1/5 w-4 h-4 bg-yellow-300 rounded transform rotate-45 animate-pulse delay-1000 opacity-40"></div>
          <div className="absolute bottom-1/5 left-1/5 w-3 h-3 bg-red-300 rounded-full animate-pulse delay-1500 opacity-40"></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;