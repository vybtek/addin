"use client";
import Head from "next/head";
import { useState } from "react";
import { Check, Award } from "lucide-react";

export default function MembershipPlans() {
  const [billingCycle, setBillingCycle] = useState("monthly");

  const plans = [
    {
      name: "Basic Plan",
      price: "Free",
      period: "/mo",
      features: [
        "Verified freelancer work history and reviews on Addins Education",
        "25 bids",
        "10 portfolio items",
        "10 skills",
        "10.00% commission",
      ],
      buttonText: "Current Plan",
      isPopular: false,
      isDisabled: true,
    },
    {
      name: "Standard Plan",
      price: billingCycle === "monthly" ? "₹599.00" : "₹5390.00",
      period: billingCycle === "monthly" ? "/mo" : "/year",
      features: [
        "Verified freelancer work history and reviews on Addins Education",
        "25 bids",
        "10 portfolio items",
        "15 skills",
        "8.00% commission",
      ],
      buttonText: "Select Plan",
      isPopular: true,
      isDisabled: false,
    },
    {
      name: "Premium Plan",
      price: billingCycle === "monthly" ? "₹799.00" : "₹7190.00",
      period: billingCycle === "monthly" ? "/mo" : "/year",
      features: [
        "Verified freelancer work history and reviews on Addins Education",
        "50 bids",
        "15 portfolio items",
        "30 skills",
        "7.00% commission",
      ],
      buttonText: "Select Plan",
      isPopular: false,
      isDisabled: false,
    },
  ];

  return (
    <>
      <Head>
        <title>Membership Plans - Addins Education</title>
        <meta
          name="description"
          content="Explore membership plans for Addins Education to enhance your tutoring experience at www.addinsedu.com."
        />
        <meta
          name="keywords"
          content="Addins Education plans, tutoring membership, Udaipur tutoring"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="canonical"
          href="https://www.addinsedu.com/membership-plans"
        />
      </Head>
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Membership Plans
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto italic">
              Choose the perfect plan to enhance your tutoring experience with
              Addins Education. Flexible options to suit your needs.
            </p>
          </div>

          <div className="flex items-center justify-center mb-12">
            <div className="flex items-center bg-white rounded-full p-1 shadow-sm border">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="billing"
                  value="monthly"
                  checked={billingCycle === "monthly"}
                  onChange={(e) => setBillingCycle(e.target.value)}
                  className="sr-only"
                  aria-label="Billed Monthly"
                />
                <span
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    billingCycle === "monthly"
                      ? "bg-green-500 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Billed Monthly
                </span>
              </label>
              <label className="flex items-center cursor-pointer ml-2">
                <input
                  type="radio"
                  name="billing"
                  value="yearly"
                  checked={billingCycle === "yearly"}
                  onChange={(e) => setBillingCycle(e.target.value)}
                  className="sr-only"
                  aria-label="Billed Yearly"
                />
                <span
                  className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                    billingCycle === "yearly"
                      ? "bg-green-500 text-white shadow-md"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  Billed Yearly
                </span>
              </label>
              {billingCycle === "yearly" && (
                <span className="ml-3 bg-green-100 text-green-700 px-3 py-1 rounded-full text-xs font-medium">
                  Save 10%
                </span>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative bg-white rounded-2xl shadow-lg overflow-hidden transition-transform hover:scale-105 ${
                  plan.isPopular
                    ? "bg-gradient-to-br from-green-400 to-green-500 text-white transform scale-105"
                    : ""
                }`}
                aria-label={`${plan.name} Plan Details`}
              >
                <div
                  className={`p-8 text-center ${
                    plan.isPopular ? "" : "border-b border-gray-100"
                  }`}
                >
                  <div className="flex justify-center mb-4">
                    <div
                      className={`p-3 rounded-full ${
                        plan.isPopular
                          ? "bg-white bg-opacity-20"
                          : "bg-green-100"
                      }`}
                    >
                      <Award
                        className={`w-8 h-8 ${
                          plan.isPopular ? "text-green-700" : "text-green-600"
                        }`}
                      />
                    </div>
                  </div>

                  <h3
                    className={`text-xl font-semibold mb-4 ${
                      plan.isPopular ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {plan.name}
                  </h3>

                  <div className="mb-0">
                    <span
                      className={`text-4xl font-bold ${
                        plan.isPopular ? "text-white" : "text-gray-900"
                      }`}
                    >
                      {plan.price}
                    </span>
                    {plan.period && (
                      <span
                        className={`text-sm ${
                          plan.isPopular ? "text-green-100" : "text-gray-500"
                        }`}
                      >
                        {plan.period}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h4
                    className={`font-semibold mb-4 text-center ${
                      plan.isPopular ? "text-white" : "text-gray-700"
                    }`}
                  >
                    Features
                  </h4>

                  <ul className="space-y-4 mb-6">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check
                          className={`w-5 h-5 mt-0.5 mr-3 flex-shrink-0 ${
                            plan.isPopular ? "text-white" : "text-green-500"
                          }`}
                        />
                        <span
                          className={`text-sm ${
                            plan.isPopular ? "text-white" : "text-gray-600"
                          }`}
                        >
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    disabled={plan.isDisabled}
                    className={`w-full py-3 px-6 rounded-xl font-medium transition-all ${
                      plan.isPopular
                        ? "bg-white text-green-500 cursor-pointer hover:bg-gray-50 shadow-lg"
                        : plan.isDisabled
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-green-500 text-white cursor-pointer hover:bg-green-600 shadow-lg"
                    }`}
                    aria-label={
                      plan.isDisabled ? "Current Plan" : "Select Plan"
                    }
                  >
                    {plan.buttonText}
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-sm text-gray-500">
              * Monthly, billing. Cancel anytime. All plans include core features
              and 24/7 support.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
