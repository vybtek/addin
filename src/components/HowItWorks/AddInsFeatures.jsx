"use client";
import React from "react";

const AddInsFeatures = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="flex flex-col lg:flex-row items-center gap-8 mb-12">
          <div className="lg:w-1/2 flex justify-center">
            <div className="w-full h-64 lg:h-80 rounded-lg overflow-hidden">
              <img
                src="https://addinsedu.com/assets/default/images/works-2a.png"
                alt="Search Jobs Illustration"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="lg:w-1/2 space-y-4 mt-16">
            <h2 className="text-3xl font-bold text-gray-800">Search Jobs</h2>
            <p className="text-gray-600">
              Addins Education makes it easy to connect with clients and start
              impactful work.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <span className="text-gray-600">
                  <strong>Organized Hiring:</strong> Advanced algorithms match
                  you with projects suited to your skills.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <span className="text-gray-600">
                  <strong>Top-Rated Talent Programs:</strong> Gain higher
                  visibility through our internal review programs.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <span className="text-gray-600">
                  <strong>Collaborate:</strong> Work with others on projects to
                  meet your goals.
                </span>
              </li>
            </ul>
            <p className="text-gray-600 italic">
              Addins Education provides a safe, secure, and trusted marketplace
              for hiring talent.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row-reverse items-center gap-8 mb-12">
          <div className="lg:w-1/2 flex justify-center">
            <div className="w-full h-64 lg:h-80 rounded-lg overflow-hidden">
              <img
                src="https://addinsedu.com/assets/default/images/works-3a.png"
                alt="Work Efficiently Illustration"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="lg:w-1/2 space-y-4 mt-16">
            <h2 className="text-3xl font-bold text-gray-800">
              Work Efficiently, Effectively
            </h2>
            <p className="text-gray-600">
              Use our tools to work smarter with Addins Education. Collaborate
              with clients to achieve your goals.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <span className="text-gray-600">
                  <strong>Client Checklists:</strong> Share checklists with
                  clients to stay on track.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <span className="text-gray-600">
                  <strong>Share Feedback:</strong> Provide secure feedback using
                  our tools.
                </span>
              </li>
            </ul>
            <p className="text-gray-600">
              <strong>Try our Marie tool to manage your work!</strong>
            </p>
            <p className="text-gray-600 italic">
              Manage files, track time, and get paid with our user-friendly
              platform.
            </p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="lg:w-1/2 flex justify-center">
            <div className="w-full h-64 lg:h-80 rounded-lg overflow-hidden">
              <img
                src="https://addinsedu.com/assets/default/images/works-4a.png"
                alt="Get Paid On Time Illustration"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
          </div>
          <div className="lg:w-1/2 space-y-4 mt-16">
            <h2 className="text-3xl font-bold text-gray-800">
              Get Paid On Time
            </h2>
            <p className="text-gray-600">
              Addins Education ensures payment protection for all your work,
              regardless of project size.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <span className="text-gray-600">
                  <strong>All Freelancers:</strong> Secure payments through
                  Addins Education.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-2">✔</span>
                <span className="text-gray-600">
                  <strong>Hourly & Fixed-Price:</strong> Timely payments for all
                  project types.
                </span>
              </li>
            </ul>
            <p className="text-gray-600 italic">
              Enjoy a secure payment platform designed for freelancers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddInsFeatures;
