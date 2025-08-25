"use client";
import React, { useState } from "react";
import { CiMail } from "react-icons/ci";
import { TbLockPassword } from "react-icons/tb";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      // Login request
      console.log(
        "Sending login request to:",
        "https://api.vybtek.com/api/users/login"
      );
      console.log("Payload:", { email, password });
      const response = await fetch(
        "https://api.vybtek.com/api/users/login",
        {
          method: "POST",
          headers: {
            accept: "*/*",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      // Read response body as text first
      const responseText = await response.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (jsonError) {
        console.error("Failed to parse JSON response:", jsonError);
        console.log("Response status:", response.status);
        console.log("Response statusText:", response.statusText);
        console.log("Response body (raw):", responseText);
        throw new Error("Invalid server response");
      }

      console.log("Login response:", { status: response.status, data });

      if (!response.ok) {
        throw new Error(
          data.error || "Login failed. Please check your credentials."
        );
      }

      // Store token if returned in response
      if (!data.token) {
        throw new Error("No token received from login response");
      }
      localStorage.setItem("authToken", data.token);
      console.log("Token stored in localStorage:", data.token);

      // Validate and store user ID from login response
      if (!data.user?.id) {
        console.error("No user ID found in login response:", data);
        throw new Error("User ID not found in login response");
      }
      localStorage.setItem("user_id", data.user.id);
      console.log("User ID stored in localStorage:", data.user.id);
      console.log("Login successful:", data);
      localStorage.setItem("userType", data.user.userType);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error("Fetch error:", err.message);
      setError(
        err.message || "An error occurred during login. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-white px-4">
      <div className="bg-gray-100 p-6 sm:p-8 w-full max-w-md sm:max-w-lg md:max-w-xl rounded-lg shadow-md">
        <h2 className="text-xl sm:text-2xl font-bold text-center mb-6">
          Log In
        </h2>

        {error && (
          <div className="mb-4 text-red-500 text-sm text-center">{error}</div>
        )}

        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white">
            <CiMail className="text-lg mr-2 text-gray-500" />
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none text-sm sm:text-base"
              disabled={isLoading}
              suppressHydrationWarning // Temporary fix for hydration mismatch
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white">
            <TbLockPassword className="text-lg text-gray-500 mr-2" />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none text-sm sm:text-base"
              disabled={isLoading}
              suppressHydrationWarning // Temporary fix for hydration mismatch
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
          className="w-full bg-cyan-400 text-white py-2 rounded-full hover:bg-cyan-500 transition duration-200 disabled:bg-cyan-300"
          disabled={isLoading}
          suppressHydrationWarning // Temporary fix for hydration mismatch
        >
          {isLoading ? "Logging in..." : "Log In"}
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500 text-sm">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <p className="text-center text-sm sm:text-base">
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
