import React from "react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      title: "Post A Job",
      description:
        "Create an account and list your educational needs. Browse through the pool of teachers ideal for your tutoring needs.",
      image: (
        <img
          src="https://www.addinsedu.com/assets/default/images/icon_job.png"
          alt="Post A Job"
          className="w-16 h-16 object-cover "
        />
      ),
    },
    {
      number: "02",
      title: "Evaluate The Bids",
      description:
        "Compare the various tutors and settle on one that is the best for your needs. Get info and milestones touched for credibility.",
      image: (
        <img
          src="https://www.addinsedu.com/assets/default/images/icon_bid.png"
          alt="Evaluate The Bids"
          className="w-16 h-16 object-cover "
        />
      ),
    },
    {
      number: "03",
      title: "Choose The Right Tutor",
      description:
        "Hire the best tutor per suitable price, review, and Ratings; boost your child’s career with add-ins.",
      image: (
        <img
          src="https://www.addinsedu.com/assets/default/images/icon_pay.png"
          alt="Choose The Right Tutor"
          className="w-16 h-16 object-cover "
        />
      ),
    },
  ];

  return (
    <div className="py-24 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 tracking-tight">
            How It Works
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We try to make finding and working with a tutor as simple and
            convenient as feasible at our tutoring website. This is how it goes:
          </p>
        </div>

        {/* Steps Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative bg-white rounded-2xl shadow-md p-6"
            >
              <div className="absolute -top-4 left-4 bg-teal-500 text-white rounded-full w-12 h-12 flex items-center justify-center text-lg font-bold">
                {step.number}
              </div>
              <div className="mt-8 flex flex-col items-center">
                <div className="mb-4">{step.image}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                  {step.title}
                </h3>
                <p className="text-sm text-gray-600 text-center">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Hire Tutors Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Card: Hire Tutors */}
          <div className="bg-gray-100 rounded-md shadow-md p-8 flex flex-col items-center text-center">
            <div className="mb-4">
              <img
                src="https://www.addinsedu.com/assets/default/images/icon_hire.png"
                alt="Hire Tutors"
                className="w-16 h-16 object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Hire Tutors
            </h3>
            <p className="text-gray-600 mb-6">
              Your perfect Tutor waits! Hire the most qualified applicants from
              thousands of Tutors and get the job done. Find out why Add Ins
              Tutor is trusted by hundreds of Parents.
            </p>
            <button
              fdprocessedid="testing"
              className="border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-6 py-3 rounded-full font-semibold"
            >
              Post A Tutor Job
            </button>
          </div>

          {/* Right Card: Teaching Jobs */}
          <div className="bg-gray-100 rounded-md shadow-md p-8 flex flex-col items-center text-center">
            <div className="mb-4">
              <img
                src="https://www.addinsedu.com/assets/default/images/icon_job.png"
                alt="Teaching Jobs"
                className="w-16 h-16 object-cover"
              />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">
              Are You Looking For Teaching Jobs?
            </h3>
            <p className="text-gray-600 mb-6">
              Browse available teaching positions, look over job descriptions
              both online and offline, find new clients, develop a promising
              tutoring career. Understand the work requirements, put your skills
              to use, and you will be hired.
            </p>
            <button
              fdprocessedid="testing"
              className="border-2 border-teal-500 text-teal-500 hover:bg-teal-500 hover:text-white px-6 py-3 rounded-full font-semibold"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
