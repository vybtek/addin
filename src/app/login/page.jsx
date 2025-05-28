"use client";
import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in with:", email, password);
    // login logic here
  };

  return (
    <div className="flex justify-center items-center h-screen bg-white">
      <div className="bg-gray-100 p-8  w-[40%]">
        <h2 className="text-2xl font-bold text-center mb-6">Log In</h2>

        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
            <CiMail className="text-lg mr-2" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
            <TbLockPassword className="text-lg text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="text-right mb-4">
          <a href="/forgot" className="text-cyan-500 text-sm hover:underline">
            Forgot Password?
          </a>
        </div>

        <button
          onClick={handleLogin}
          className="w-full bg-cyan-400 text-white py-2 rounded-full hover:bg-cyan-500 transition duration-200"
        >
          Log In
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <p className="text-center">
          Don't have an account?{" "}
          <a href="/sign-up" className="text-cyan-500 hover:underline">
            Register Now
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
