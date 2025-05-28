"use client";

import React, { useState, useEffect } from "react";

const Loader = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay (replace with actual loading logic)
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100); // Adjust delay as needed

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
      <div className="w-16 h-16 border-4 border-t-4 border-t-blue-500 border-gray-200 rounded-full animate-spin"></div>
    </div>
  );
};

export default Loader;
