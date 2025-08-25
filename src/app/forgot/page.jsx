"use client";
import Head from "next/head";
import React from "react";
import { CiMail } from "react-icons/ci";

export default function ForgotPassword() {
  return (
    <>
      <Head>
        <title>Forgot Password - Addins Education</title>
        <meta
          name="description"
          content="Reset your password for Addins Education at www.addinsedu.com. Enter your email to receive reset instructions."
        />
        <meta
          name="keywords"
          content="Addins Education forgot password, reset password, Udaipur tutoring"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="canonical"
          href="https://www.addinsedu.com/forgot-password"
        />
      </Head>
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-6 w-full max-w-md rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Forgot Password
          </h2>
          <form className="space-y-6">
            <div className="mb-4">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
                  aria-label="Enter your email address"
                  required
                />
                <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                  <CiMail />
                </span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Enter the email associated with your account.
              </p>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition-colors duration-300 shadow-md hover:shadow-lg"
              aria-label="Submit password reset request"
            >
              Submit
            </button>
          </form>
          <p className="text-center mt-6 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <a href="/sign-up" className="text-green-500 hover:underline">
              Register Now
            </a>
          </p>
        </div>
      </div>
    </>
  );
}
