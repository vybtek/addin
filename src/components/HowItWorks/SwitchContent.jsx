"use client";
import React, { useState } from 'react';

const SwitchContent = () => {
  const [activeTab, setActiveTab] = useState('tutor');

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 flex items-center justify-center  ">
      <div className="max-w-5xl w-full bg-white p-6 flex flex-col lg:flex-row gap-8">
        {/* Left Section - Image */}
        <div className="lg:w-1/2 flex justify-center items-center">
          <div className="relative w-full h-64 lg:h-96 rounded-lg overflow-hidden">
            {/* Replace this with the actual image path in your project */}
            <img
              src="https://addinsedu.com/assets/default/images/works-1.png" // Update this path to where your image is stored
              alt="Tutor and resume illustration"
              className="w-[80%] h-full object-cover"
            />
          </div>
        </div>

        {/* Right Section - Content */}
        <div className="lg:w-1/2 space-y-6">
          {/* Toggle Tabs */}
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => setActiveTab('tutor')}
              className={`px-4 py-2 font-semibold rounded-lg transition-colors duration-300 ${
                activeTab === 'tutor'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Tutor/Trainer
            </button>
            <button
              onClick={() => setActiveTab('parents')}
              className={`px-4 py-2 font-semibold rounded-lg transition-colors duration-300 ${
                activeTab === 'parents'
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              Parents/Students
            </button>
          </div>

          {/* Content Based on Active Tab */}
          {activeTab === 'tutor' ? (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">Create An Account</h2>
              <p className="text-gray-600">
                Add-Ins is a great place to find more clients and run and grow your own teaching career. Freedom to work on ideal classes. On Add-Ins, you run your own clients and choose your own classes. Just complete your profile and we’ll highlight ideal teaching jobs. Also search classes & Subjects, and respond to client invitations.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✔</span>
                  <span className="text-gray-600">
                    <strong>Wide variety and high pay:</strong> Clients are now posting jobs in hundreds of skill categories, paying top price for great work.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✔</span>
                  <span className="text-gray-600">
                    <strong>More and more success:</strong> The greater the success you have on classes, the more likely you are to get hired by clients that use Add-Ins.
                  </span>
                </li>
              </ul>
            </div>
          ) : (
            <div className="space-y-4">
              <h2 className="text-3xl font-bold text-gray-800">Find Quality Tutor/Trainer</h2>
              <p className="text-gray-600">
                Add-Ins feature the diverse variety of top talent, including Academics, Hobbies, Dance Trainers, Music Trainers, and more.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✔</span>
                  <span className="text-gray-600">
                    Tell us about your requirements and the particular skills you require. Add-Ins examine your requirements. Our search feature employs data science to highlight Tutors/Trainers based on their abilities, assisting you in finding talent that is a good fit.
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✔</span>
                  <span className="text-gray-600">
                    We give you a list of potential candidates. You can also search for talent on our website, and tutors can watch your job and submit proposals as well.
                  </span>
                </li>
              </ul>
              <p className="text-gray-600">
                We have put several safeguards in place to guarantee that Add-Ins is a fair and trustworthy marketplace.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SwitchContent;