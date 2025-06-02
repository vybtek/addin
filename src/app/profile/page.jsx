"use client";
import { useState, useCallback } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaShareAlt,
  FaEdit,
  FaCopy,
} from "react-icons/fa";

// Validation Utility
const validateField = (section, field, value, modalData) => {
  let error = "";
  if (section === "title" && !value.trim()) error = "Title is required";
  if (section === "about" && value.length > 500)
    error = "About section cannot exceed 500 characters";
  if (section === "classes" && !value.trim())
    error = "Classes/Subjects is required";
  if (section === "teaching") {
    if (field === "institute" && !value.trim())
      error = "Institute name is required";
    if (field === "jobTitle" && !value.trim()) error = "Job title is required";
    if (field === "city" && !value) error = "City is required";
    if (field === "state" && !value) error = "State is required";
    if (field === "role" && !value) error = "Role is required";
    if (field === "fromMonth" && !value) error = "Start month is required";
    if (field === "fromYear" && !value) error = "Start year is required";
    if (!modalData.teaching.currentlyWorking && field === "toMonth" && !value)
      error = "End month is required";
    if (!modalData.teaching.currentlyWorking && field === "toYear" && !value)
      error = "End year is required";
  }
  if (section === "education") {
    if (field === "institute" && !value.trim())
      error = "Institute name is required";
    if (field === "fromYear" && !value) error = "Start year is required";
    if (field === "toYear" && !value) error = "End year is required";
  }
  if (section === "awards") {
    if (field === "title" && !value.trim()) error = "Project title is required";
    if (field === "category" && !value) error = "Category is required";
  }
  if (section === "location" && field === "areaName" && !value.trim())
    error = "Area name is required";
  if (
    section === "hourlyRate" &&
    field === "rate" &&
    (!value || isNaN(value) || value <= 0)
  )
    error = "Valid rate is required";
  if (section === "availability" && field === "status" && !value)
    error = "Availability status is required";
  if (section === "language" && !value.trim()) error = "Language is required";
  return error;
};

// Profile Header Component
const ProfileHeader = ({ title, onEdit }) => (
  <div className="flex items-center mb-8 bg-white p-6 rounded-xl shadow-md">
    <img
      className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-6 flex-shrink-0"
      src="https://www.addinsedu.com/assets/default/images/default/thumb/default-member-logo.svg"
      alt="Profile"
    />
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-gray-800">Arpit</h1>
        <button
          onClick={() => onEdit("title")}
          className="text-blue-500 hover:text-blue-700 transition"
        >
          <FaEdit className="w-5 h-5 cursor-pointer" />
        </button>
      </div>
      <p className="text-gray-600 text-lg">{title}</p>
      <div className="flex items-center mt-2">
        {[...Array(5)].map((_, i) => (
          <svg
            key={i}
            className="w-5 h-5 text-yellow-400"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.5 3 1-5.5L2 7.5l5.5-1L10 2l2.5 4.5L18 7.5l-3.5 5 1 5.5L10 15z" />
          </svg>
        ))}
      </div>
    </div>
  </div>
);

// Section Card Component
const SectionCard = ({ title, onEdit, children, sectionKey, data }) => (
  <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-2xl font-semibold text-gray-800">{title}</h2>
      <button
        onClick={() => onEdit(sectionKey)}
        className="text-blue-500 hover:text-blue-700 transition"
      >
        <FaEdit className="w-5 h-5 cursor-pointer" />
      </button>
    </div>
    {children || (
      <p className="text-gray-600">{data || "No information added"}</p>
    )}
  </div>
);

// Sidebar Component
const Sidebar = ({ profileData, onEdit, onCopy }) => (
  <div className="w-full md:w-90 bg-white p-6 border-l border-gray-600 md:h-screen md:sticky md:top-0">
    {[
      {
        title: "Hourly Rate",
        key: "hourlyRate",
        value: profileData.hourlyRate,
      },
      { title: "Total Working Hours", value: profileData.workingHours },
      { title: "Earned", value: profileData.earned },
      { title: "Classes", value: profileData.classesCount },
      {
        title: "Availability",
        key: "availability",
        value: profileData.availability,
      },
      {
        title: "Teaching Mode Preference",
        key: "teachingMode",
        value: profileData.teachingMode,
      },
      { title: "Language", key: "language", value: profileData.language },
    ].map(({ title, key, value }) => (
      <div key={title} className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          {key && (
            <button
              onClick={() => onEdit(key)}
              className="text-blue-500 hover:text-blue-700 transition"
            >
              <FaEdit className="w-5 h-5 cursor-pointer" />
            </button>
          )}
        </div>
        <p className="text-gray-600">{value || "Not set"}</p>
      </div>
    ))}
    <div className="mb-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-2">Share</h3>
      <div className="flex items-center">
        <input
          type="text"
          readOnly
          value="https://www.addisedu.com/tutor"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={onCopy}
          className="ml-2 p-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
        >
          <FaCopy />
        </button>
      </div>
      <div className="flex mt-4 space-x-4">
        <a
          href="#"
          className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
        >
          <FaFacebook size={24} />
        </a>
        <a
          href="#"
          className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
        >
          <FaTwitter size={24} />
        </a>
        <a
          href="#"
          className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
        >
          <FaLinkedin size={24} />
        </a>
        <a
          href="#"
          className="text-blue-500 hover:text-blue-700 transition cursor-pointer"
        >
          <FaShareAlt size={24} />
        </a>
      </div>
    </div>
  </div>
);

// Modal Component
const Modal = ({ isOpen, onClose, onSave, title, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
      <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl transform transition-transform duration-300 scale-100">
        <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-2xl">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition"
          >
            Cancel
          </button>
          <h2 className="text-lg font-semibold">{title}</h2>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition"
          >
            Save
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
};

// Toast Component
const Toast = ({ message, type }) => (
  <div
    className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${type === "success" ? "bg-green-500" : "bg-red-500"
      }`}
  >
    {message}
  </div>
);

// Edit Modal Content Component
const EditModalContent = ({ section, modalData, errors, onChange }) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const years = Array.from({ length: 50 }, (_, i) => 2025 - i);

  switch (section) {
    case "title":
      return (
        <div>
          <label className="block mb-2 text-gray-700 font-medium">
            Your Title
          </label>
          <p className="text-gray-500 mb-4">
            Enter a single sentence description of your professional
            skills/experience
          </p>
          <input
            type="text"
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.title
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
              }`}
            value={modalData.title}
            onChange={(e) => onChange(section, "title", e.target.value)}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
          <p className="text-gray-500 mt-2">
            EXAMPLE: 10+ Class Maths Tutor with 5 years experience
          </p>
        </div>
      );
    case "about":
      return (
        <div>
          <p className="text-gray-500 mb-4">
            Use this space to show clients you have the skills and experience
            they are looking for.
          </p>
          <textarea
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.about
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
              }`}
            value={modalData.about}
            onChange={(e) => onChange(section, "about", e.target.value)}
            rows="5"
          />
          {errors.about && (
            <p className="text-red-500 text-sm mt-1">{errors.about}</p>
          )}
        </div>
      );
    case "classes":
      return (
        <div>
          <p className="text-gray-500 mb-4">
            Use this space to show clients you have the Classes/Subjects and
            experience they are looking for.
          </p>
          <input
            type="text"
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.classes
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
              }`}
            value={modalData.classes}
            onChange={(e) => onChange(section, "classes", e.target.value)}
          />
          {errors.classes && (
            <p className="text-red-500 text-sm mt-1">{errors.classes}</p>
          )}
        </div>
      );
    case "teaching":
      return (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">
                Institute Name
              </label>
              <input
                type="text"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${errors.institute
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
                value={modalData.teaching.institute}
                onChange={(e) => onChange(section, "institute", e.target.value)}
                placeholder="Enter institute name"
              />
              {errors.institute && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.institute}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">
                Job Title
              </label>
              <input
                type="text"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${errors.jobTitle
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
                value={modalData.teaching.jobTitle}
                onChange={(e) => onChange(section, "jobTitle", e.target.value)}
                placeholder="Enter job title"
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.jobTitle}
                </p>
              )}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">
                City
              </label>
              <select
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${errors.city
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
                value={modalData.teaching.city}
                onChange={(e) => onChange(section, "city", e.target.value)}
              >
                <option value="">Select City</option>
                <option>Mumbai</option>
                <option>Delhi</option>
                <option>Bangalore</option>
                <option>Chennai</option>
                <option>Kolkata</option>
              </select>
              {errors.city && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.city}
                </p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">
                State
              </label>
              <select
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${errors.state
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
                value={modalData.teaching.state}
                onChange={(e) => onChange(section, "state", e.target.value)}
              >
                <option value="">Select State</option>
                <option>Maharashtra</option>
                <option>Delhi</option>
                <option>Karnataka</option>
                <option>Tamil Nadu</option>
                <option>West Bengal</option>
              </select>
              {errors.state && (
                <p className="text-red-500 text-xs sm:text-sm mt-1">
                  {errors.state}
                </p>
              )}
            </div>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">
              Teaching Role
            </label>
            <select
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${errors.role
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
              value={modalData.teaching.role}
              onChange={(e) => onChange(section, "role", e.target.value)}
            >
              <option value="">Select Role</option>
              <option>Teacher</option>
              <option>Tutor</option>
              <option>Professor</option>
              <option>Instructor</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs sm:text-sm mt-1">
                {errors.role}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">
              Period From
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <select
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${errors.fromMonth
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                    }`}
                  value={modalData.teaching.fromMonth}
                  onChange={(e) =>
                    onChange(section, "fromMonth", e.target.value)
                  }
                >
                  <option value="">Select Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                {errors.fromMonth && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.fromMonth}
                  </p>
                )}
              </div>
              <div>
                <select
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${errors.fromYear
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                    }`}
                  value={modalData.teaching.fromYear}
                  onChange={(e) =>
                    onChange(section, "fromYear", e.target.value)
                  }
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.fromYear && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.fromYear}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">
              Period To
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <select
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${errors.toMonth
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                    }`}
                  value={modalData.teaching.toMonth}
                  onChange={(e) => onChange(section, "toMonth", e.target.value)}
                  disabled={modalData.teaching.currentlyWorking}
                >
                  <option value="">Select Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                {errors.toMonth && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.toMonth}
                  </p>
                )}
              </div>
              <div>
                <select
                  className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${errors.toYear
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                    }`}
                  value={modalData.teaching.toYear}
                  onChange={(e) => onChange(section, "toYear", e.target.value)}
                  disabled={modalData.teaching.currentlyWorking}
                >
                  <option value="">Select Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
                {errors.toYear && (
                  <p className="text-red-500 text-xs sm:text-sm mt-1">
                    {errors.toYear}
                  </p>
                )}
              </div>
            </div>
          </div>
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                checked={modalData.teaching.currentlyWorking}
                onChange={(e) =>
                  onChange(section, "currentlyWorking", e.target.checked)
                }
              />
              <span className="text-gray-700 text-sm sm:text-base">
                I currently work here
              </span>
            </label>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">
              Description (Optional)
            </label>
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 text-sm sm:text-base"
              value={modalData.teaching.description}
              onChange={(e) => onChange(section, "description", e.target.value)}
              rows="4"
              placeholder="Describe your role and responsibilities"
            />
          </div>
        </div>
      );
    case "education":
      return (
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Institute
            </label>
            <input
              type="text"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.institute
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
              value={modalData.education.institute}
              onChange={(e) => onChange(section, "institute", e.target.value)}
            />
            {errors.institute && (
              <p className="text-red-500 text-sm mt-1">{errors.institute}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Session
            </label>
            <div className="flex gap-2">
              <select
                className={`w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.fromYear
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
                value={modalData.education.fromYear}
                onChange={(e) => onChange(section, "fromYear", e.target.value)}
              >
                <option value="">From</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                className={`w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.toYear
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
                value={modalData.education.toYear}
                onChange={(e) => onChange(section, "toYear", e.target.value)}
              >
                <option value="">To</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            {(errors.fromYear || errors.toYear) && (
              <p className="text-red-500 text-sm mt-1">
                {errors.fromYear || errors.toYear}
              </p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Degree (Optional)
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              value={modalData.education.degree}
              onChange={(e) => onChange(section, "degree", e.target.value)}
              placeholder="Ex- 12th, B.Tech"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Area of Study (Optional)
            </label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              value={modalData.education.areaOfStudy}
              onChange={(e) => onChange(section, "areaOfStudy", e.target.value)}
              placeholder="Ex- Science, Software Engineering"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Description (Optional)
            </label>
            <textarea
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              value={modalData.education.description}
              onChange={(e) => onChange(section, "description", e.target.value)}
              rows="4"
            />
          </div>
        </div>
      );
    case "awards":
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Project Title
              </label>
              <input
                type="text"
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.title
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
                value={modalData.awards.title}
                onChange={(e) => onChange(section, "title", e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm mt-1">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Category
              </label>
              <select
                className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.category
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                  }`}
                value={modalData.awards.category}
                onChange={(e) => onChange(section, "category", e.target.value)}
              >
                <option value="">Category</option>
                <option>Award</option>
                <option>Project</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-sm mt-1">{errors.category}</p>
              )}
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Project URL (Optional)
              </label>
              <input
                type="text"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                value={modalData.awards.url}
                onChange={(e) => onChange(section, "url", e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Completion Date (Optional)
              </label>
              <input
                type="date"
                className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
                value={modalData.awards.completionDate}
                onChange={(e) =>
                  onChange(section, "completionDate", e.target.value)
                }
              />
            </div>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Project Overview
            </label>
            <textarea
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              value={modalData.awards.overview}
              onChange={(e) => onChange(section, "overview", e.target.value)}
              rows="4"
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Image (Optional)
            </label>
            <div className="border-dashed border-2 border-gray-300 p-4 text-center rounded-lg">
              <p className="text-gray-500">Drag & drop here</p>
              <p className="text-gray-500">or</p>
              <button className="text-blue-500 hover:text-blue-700 transition">
                Click to select file
              </button>
            </div>
          </div>
        </div>
      );
    case "location":
      return (
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Enter Location on Map
            </label>
            <input
              type="text"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.mapLocation
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
              value={modalData.location.mapLocation}
              onChange={(e) => onChange(section, "mapLocation", e.target.value)}
              placeholder="Your address will not show to clients or others"
            />
            <p className="text-red-500 text-sm mt-1">
              Move red marker on map for location accuracy
            </p>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Locality/Area Name
            </label>
            <input
              type="text"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.areaName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
              value={modalData.location.areaName}
              onChange={(e) => onChange(section, "areaName", e.target.value)}
              placeholder="Enter locality"
            />
            {errors.areaName && (
              <p className="text-red-500 text-sm mt-1">{errors.areaName}</p>
            )}
          </div>
        </div>
      );
    case "hourlyRate":
      return (
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              I Prefer to Work With
            </label>
            <div className="flex gap-2 mb-4">
              <button
                className={`px-4 py-2 rounded-lg transition ${modalData.hourlyRate.type === "hourly"
                    ? "bg-blue-500 text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                  }`}
                onClick={() => onChange(section, "type", "hourly")}
              >
                Hourly Class Rate
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition ${modalData.hourlyRate.type === "monthly"
                    ? "bg-blue-500 text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                  }`}
                onClick={() => onChange(section, "type", "monthly")}
              >
                Monthly Class Rate
              </button>
            </div>
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              {modalData.hourlyRate.type === "hourly" ? "Hourly" : "Monthly"}{" "}
              Class Rate
            </label>
            <input
              type="number"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.rate
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
                }`}
              value={modalData.hourlyRate.rate}
              onChange={(e) => onChange(section, "rate", e.target.value)}
              placeholder={`Enter ${modalData.hourlyRate.type} rate`}
            />
            {errors.rate && (
              <p className="text-red-500 text-sm mt-1">{errors.rate}</p>
            )}
          </div>
        </div>
      );
    case "availability":
      return (
        <div className="space-y-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              I Am Currently
            </label>
            <div className="flex gap-2 mb-4">
              <button
                className={`px-4 py-2 rounded-lg transition ${modalData.availability.status === "available"
                    ? "bg-blue-500 text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                  }`}
                onClick={() => onChange(section, "status", "available")}
              >
                Available
              </button>
              <button
                className={`px-4 py-2 rounded-lg transition ${modalData.availability.status === "not available"
                    ? "bg-blue-500 text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                  }`}
                onClick={() => onChange(section, "status", "not available")}
              >
                Not Available
              </button>
            </div>
            {errors.status && (
              <p className="text-red-500 text-sm mt-1">{errors.status}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">
              Availability Hours
            </label>
            {[
              "more than 30 hrs/week",
              "less than 30 hrs/week",
              "as needed",
            ].map((option) => (
              <label key={option} className="flex items-center mb-2">
                <input
                  type="radio"
                  name="hours"
                  className="mr-2 h-4 w-4"
                  checked={modalData.availability.hours === option}
                  onChange={() => onChange(section, "hours", option)}
                />
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </label>
            ))}
          </div>
        </div>
      );
    case "teachingMode":
      return (
        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            My Teaching Preference Is
          </label>
          <div className="flex gap-2">
            {["offline", "online", "both"].map((mode) => (
              <button
                key={mode}
                className={`px-4 py-2 rounded-lg transition ${modalData.teachingMode === mode
                    ? "bg-blue-500 text-white"
                    : "border border-gray-300 hover:bg-gray-100"
                  }`}
                onClick={() => onChange(section, "teachingMode", mode)}
              >
                {mode.charAt(0).toUpperCase() + mode.slice(1)}
              </button>
            ))}
          </div>
        </div>
      );
    case "language":
      return (
        <div>
          <label className="block mb-1 text-gray-700 font-medium">
            Primary Language
          </label>
          <input
            type="text"
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.language
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
              }`}
            value={modalData.language}
            onChange={(e) => onChange(section, "language", e.target.value)}
            placeholder="Enter primary language"
          />
          {errors.language && (
            <p className="text-red-500 text-sm mt-1">{errors.language}</p>
          )}
        </div>
      );
    default:
      return null;
  }
};

// Main ProfilePage Component
export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState({
    title: false,
    about: false,
    classes: false,
    teaching: false,
    education: false,
    awards: false,
    location: false,
    hourlyRate: false,
    availability: false,
    teachingMode: false,
    language: false,
  });

  const [profileData, setProfileData] = useState({
    title: "Enter your title",
    about: "",
    classes: "",
    teaching: [],
    education: [],
    awards: [],
    location: "",
    hourlyRate: "",
    workingHours: "0.00",
    earned: "₹0.00",
    classesCount: "0",
    availability: "",
    teachingMode: "",
    language: "",
  });

  const [modalData, setModalData] = useState({
    title: "",
    about: "",
    classes: "",
    teaching: {
      institute: "",
      jobTitle: "",
      city: "",
      state: "",
      role: "",
      fromMonth: "",
      fromYear: "",
      toMonth: "",
      toYear: "",
      currentlyWorking: false,
      description: "",
    },
    education: {
      institute: "",
      fromYear: "",
      toYear: "",
      degree: "",
      areaOfStudy: "",
      description: "",
    },
    awards: {
      title: "",
      category: "",
      url: "",
      completionDate: "",
      overview: "",
    },
    location: { mapLocation: "", areaName: "" },
    hourlyRate: { type: "hourly", rate: "" },
    availability: { status: "available", hours: "" },
    teachingMode: "online",
    language: "",
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const handleEditToggle = useCallback(
    (section) => {
      setIsEditing((prev) => ({ ...prev, [section]: !prev[section] }));
      setErrors({});
      setModalData((prev) => ({
        ...prev,
        title: section === "title" ? profileData.title : prev.title,
        about: section === "about" ? profileData.about : prev.about,
        classes: section === "classes" ? profileData.classes : prev.classes,
        teaching:
          section === "teaching"
            ? {
              institute: "",
              jobTitle: "",
              city: "",
              state: "",
              role: "",
              fromMonth: "",
              fromYear: "",
              toMonth: "",
              toYear: "",
              currentlyWorking: false,
              description: "",
            }
            : prev.teaching,
        education:
          section === "education"
            ? {
              institute: "",
              fromYear: "",
              toYear: "",
              degree: "",
              areaOfStudy: "",
              description: "",
            }
            : prev.education,
        awards:
          section === "awards"
            ? {
              title: "",
              category: "",
              url: "",
              completionDate: "",
              overview: "",
            }
            : prev.awards,
        location:
          section === "location"
            ? {
              mapLocation: profileData.location,
              areaName: profileData.location,
            }
            : prev.location,
        hourlyRate:
          section === "hourlyRate"
            ? { type: "hourly", rate: profileData.hourlyRate }
            : prev.hourlyRate,
        availability:
          section === "availability"
            ? { status: profileData.availability || "available", hours: "" }
            : prev.availability,
        teachingMode:
          section === "teachingMode"
            ? profileData.teachingMode || "online"
            : prev.teachingMode,
        language: section === "language" ? profileData.language : prev.language,
      }));
    },
    [profileData]
  );

  const handleModalChange = useCallback(
    (section, field, value) => {
      setModalData((prev) => ({
        ...prev,
        [section]:
          typeof prev[section] === "object"
            ? { ...prev[section], [field]: value }
            : value,
      }));
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(section, field, value, modalData),
      }));
    },
    [modalData]
  );

  const handleSave = useCallback(
    (section) => {
      const sectionErrors = {};
      if (section === "title")
        sectionErrors.title = validateField(
          "title",
          "title",
          modalData.title,
          modalData
        );
      if (section === "about")
        sectionErrors.about = validateField(
          "about",
          "about",
          modalData.about,
          modalData
        );
      if (section === "classes")
        sectionErrors.classes = validateField(
          "classes",
          "classes",
          modalData.classes,
          modalData
        );
      if (section === "teaching") {
        sectionErrors.institute = validateField(
          "teaching",
          "institute",
          modalData.teaching.institute,
          modalData
        );
        sectionErrors.jobTitle = validateField(
          "teaching",
          "jobTitle",
          modalData.teaching.jobTitle,
          modalData
        );
        sectionErrors.city = validateField(
          "teaching",
          "city",
          modalData.teaching.city,
          modalData
        );
        sectionErrors.state = validateField(
          "teaching",
          "state",
          modalData.teaching.state,
          modalData
        );
        sectionErrors.role = validateField(
          "teaching",
          "role",
          modalData.teaching.role,
          modalData
        );
        sectionErrors.fromMonth = validateField(
          "teaching",
          "fromMonth",
          modalData.teaching.fromMonth,
          modalData
        );
        sectionErrors.fromYear = validateField(
          "teaching",
          "fromYear",
          modalData.teaching.fromYear,
          modalData
        );
        if (!modalData.teaching.currentlyWorking) {
          sectionErrors.toMonth = validateField(
            "teaching",
            "toMonth",
            modalData.teaching.toMonth,
            modalData
          );
          sectionErrors.toYear = validateField(
            "teaching",
            "toYear",
            modalData.teaching.toYear,
            modalData
          );
        }
      }
      if (section === "education") {
        sectionErrors.institute = validateField(
          "education",
          "institute",
          modalData.education.institute,
          modalData
        );
        sectionErrors.fromYear = validateField(
          "education",
          "fromYear",
          modalData.education.fromYear,
          modalData
        );
        sectionErrors.toYear = validateField(
          "education",
          "toYear",
          modalData.education.toYear,
          modalData
        );
      }
      if (section === "awards") {
        sectionErrors.title = validateField(
          "awards",
          "title",
          modalData.awards.title,
          modalData
        );
        sectionErrors.category = validateField(
          "awards",
          "category",
          modalData.awards.category,
          modalData
        );
      }
      if (section === "location")
        sectionErrors.areaName = validateField(
          "location",
          "areaName",
          modalData.location.areaName,
          modalData
        );
      if (section === "hourlyRate")
        sectionErrors.rate = validateField(
          "hourlyRate",
          "rate",
          modalData.hourlyRate.rate,
          modalData
        );
      if (section === "availability")
        sectionErrors.status = validateField(
          "availability",
          "status",
          modalData.availability.status,
          modalData
        );
      if (section === "language")
        sectionErrors.language = validateField(
          "language",
          "language",
          modalData.language,
          modalData
        );

      if (Object.values(sectionErrors).some((error) => error)) {
        setErrors(sectionErrors);
        setToast({
          message: "Please fix the errors before saving.",
          type: "error",
        });
        setTimeout(() => setToast(null), 3000);
        return;
      }

      setProfileData((prev) => ({
        ...prev,
        title: section === "title" ? modalData.title : prev.title,
        about: section === "about" ? modalData.about : prev.about,
        classes: section === "classes" ? modalData.classes : prev.classes,
        teaching:
          section === "teaching"
            ? [...prev.teaching, modalData.teaching]
            : prev.teaching,
        education:
          section === "education"
            ? [...prev.education, modalData.education]
            : prev.education,
        awards:
          section === "awards"
            ? [...prev.awards, modalData.awards]
            : prev.awards,
        location:
          section === "location" ? modalData.location.areaName : prev.location,
        hourlyRate:
          section === "hourlyRate"
            ? modalData.hourlyRate.rate
            : prev.hourlyRate,
        availability:
          section === "availability"
            ? modalData.availability.status
            : prev.availability,
        teachingMode:
          section === "teachingMode"
            ? modalData.teachingMode
            : prev.teachingMode,
        language: section === "language" ? modalData.language : prev.language,
      }));

      setToast({
        message: `${section.charAt(0).toUpperCase() + section.slice(1)
          } updated successfully!`,
        type: "success",
      });
      setTimeout(() => setToast(null), 3000);
      handleEditToggle(section);
    },
    [modalData, handleEditToggle]
  );

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText("https://www.addisedu.com/tutor");
    setToast({ message: "Link copied to clipboard!", type: "success" });
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <div className="min-h-screen py-24 bg-gray-50 flex flex-col md:flex-row font-sans">
      <div className="flex-1 p-8 max-w-4xl mx-auto">
        <ProfileHeader title={profileData.title} onEdit={handleEditToggle} />
        <SectionCard
          title="About"
          sectionKey="about"
          data={profileData.about}
          onEdit={handleEditToggle}
        />
        <SectionCard
          title="Work History & Reviews"
          sectionKey="workHistory"
          onEdit={handleEditToggle}
        >
          <p className="text-gray-600">No record found</p>
        </SectionCard>
        <SectionCard
          title="Your Classes/Subjects"
          sectionKey="classes"
          data={profileData.classes}
          onEdit={handleEditToggle}
        />
        <SectionCard
          title="Teaching Experience"
          sectionKey="teaching"
          onEdit={handleEditToggle}
        >
          {profileData.teaching.length > 0 ? (
            profileData.teaching.map((exp, index) => (
              <div
                key={index}
                className="text-gray-600 mb-4 border-l-4 border-blue-500 pl-4"
              >
                <p className="font-medium">
                  {exp.jobTitle} at {exp.institute}
                </p>
                <p>
                  {exp.city}, {exp.state}
                </p>
                <p>
                  {exp.fromMonth} {exp.fromYear} -{" "}
                  {exp.currentlyWorking
                    ? "Present"
                    : `${exp.toMonth} ${exp.toYear}`}
                </p>
                <p className="mt-2">{exp.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No information added</p>
          )}
        </SectionCard>
        <SectionCard
          title="Education"
          sectionKey="education"
          onEdit={handleEditToggle}
        >
          {profileData.education.length > 0 ? (
            profileData.education.map((edu, index) => (
              <div
                key={index}
                className="text-gray-600 mb-4 border-l-4 border-blue-500 pl-4"
              >
                <p className="font-medium">{edu.institute}</p>
                <p>
                  {edu.degree}, {edu.areaOfStudy}
                </p>
                <p>
                  {edu.fromYear} - {edu.toYear}
                </p>
                <p className="mt-2">{edu.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No information added</p>
          )}
        </SectionCard>
        <SectionCard
          title="Awards"
          sectionKey="awards"
          onEdit={handleEditToggle}
        >
          {profileData.awards.length > 0 ? (
            profileData.awards.map((award, index) => (
              <div
                key={index}
                className="text-gray-600 mb-4 border-l-4 border-blue-500 pl-4"
              >
                <p className="font-medium">
                  {award.title} - {award.category}
                </p>
                <p>{award.completionDate}</p>
                <p className="mt-2">{award.overview}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No information added</p>
          )}
        </SectionCard>
        <SectionCard
          title="Location"
          sectionKey="location"
          data={profileData.location}
          onEdit={handleEditToggle}
        />
      </div>
      <Sidebar
        profileData={profileData}
        onEdit={handleEditToggle}
        onCopy={copyToClipboard}
      />
      {Object.keys(isEditing).map((section) => (
        <Modal
          key={section}
          isOpen={isEditing[section]}
          onClose={() => handleEditToggle(section)}
          onSave={() => handleSave(section)}
          title={`Edit ${section.charAt(0).toUpperCase() + section.slice(1)}`}
        >
          <EditModalContent
            section={section}
            modalData={modalData}
            errors={errors}
            onChange={handleModalChange}
          />
        </Modal>
      ))}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
