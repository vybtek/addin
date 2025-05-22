import React from "react";
import { CiMail } from "react-icons/ci";

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <div className="bg-gray-100 p-6  w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-4">Forgot Password</h2>
        <div className="mb-4">
          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 pl-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
              <CiMail />
            </span>
          </div>
        </div>
        <button className="w-full bg-cyan-400 text-white p-3 rounded-lg hover:bg-cyan-500 transition">
          Submit
        </button>
        <p className="text-center mt-4 text-sm">
          Don't have an account?
          <a href="/sign-up" className="text-cyan-400 hover:underline">
            Register Now
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
