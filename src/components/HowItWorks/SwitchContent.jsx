"use client";
import React, { useState } from "react";

const SwitchContent = () => {
  const [activeTab, setActiveTab] = useState("tutor");

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6 flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/2 flex justify-center items-center">
            <div className="relative w-full h-64 lg:h-96 rounded-lg overflow-hidden">
              <img
                src="https://addinsedu.com/assets/default/images/works-1.png"
                alt="Tutor and resume illustration"
                className="w-[80%] h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:w-1/2 space-y-6">
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setActiveTab("tutor")}
                className={`px-4 py-2 font-semibold rounded-lg transition-colors duration-300 ${
                  activeTab === "tutor"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                aria-label="Switch to Tutor/Trainer content"
              >
                Tutor/Trainer
              </button>
              <button
                onClick={() => setActiveTab("parents")}
                className={`px-4 py-2 font-semibold rounded-lg transition-colors duration-300 ${
                  activeTab === "parents"
                    ? "bg-green-500 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
                aria-label="Switch to Parents/Students content"
              >
                Parents/Students
              </button>
            </div>

            {activeTab === "tutor" ? (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  Create An Account
                </h2>
                <p className="text-gray-600">
                  Addins Education is a great place to find more clients and
                  grow your teaching career. Enjoy the freedom to choose your
                  ideal classes. Complete your profile, and we’ll highlight
                  suitable teaching jobs. Search for classes and subjects, and
                  respond to client invitations.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✔</span>
                    <span className="text-gray-600">
                      <strong>Wide Variety & High Pay:</strong> Clients post
                      jobs in hundreds of skill categories, offering top pay for
                      quality work.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✔</span>
                    <span className="text-gray-600">
                      <strong>Increased Success:</strong> Greater success in
                      classes increases your chances of being hired by clients
                      on Addins.
                    </span>
                  </li>
                </ul>
              </div>
            ) : (
              <div className="space-y-4">
                <h2 className="text-3xl font-bold text-gray-800">
                  Find Quality Tutor/Trainer
                </h2>
                <p className="text-gray-600">
                  Addins Education features a diverse pool of top talent,
                  including academics, dance trainers, music trainers, and more.
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✔</span>
                    <span className="text-gray-600">
                      Specify your requirements and skills needed. Our search
                      feature uses data science to match you with suitable
                      tutors based on their abilities.
                    </span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-green-500 mr-2">✔</span>
                    <span className="text-gray-600">
                      Receive a list of potential candidates or search for
                      talent, with tutors able to apply to your job postings.
                    </span>
                  </li>
                </ul>
                <p className="text-gray-600">
                  We ensure a fair and trustworthy marketplace with multiple
                  safeguards in place.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwitchContent;
