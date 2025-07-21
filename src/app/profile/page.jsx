"use client";
import { useState, useCallback, useEffect } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaShareAlt,
  FaEdit,
  FaCopy,
  FaTimes,
  FaCheck,
  FaMapMarkerAlt,
  FaClock,
  FaMoneyBillWave,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaTrophy,
  FaGlobe,
  FaUser,
  FaBriefcase,
  FaStar,
  FaCalendarAlt,
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
  <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
    <div className="relative group">
      <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white text-4xl">
        <FaUser />
      </div>
      {/* <button
        onClick={() => onEdit("title")}
        className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 transition opacity-0 group-hover:opacity-100 focus:opacity-100"
        aria-label="Edit profile"
      >
        <FaEdit size={14} />
      </button> */}
    </div>
    <div className="flex-1 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
            Arpit
          </h1>
          <p className="text-gray-600 mt-1">
            {title || "No professional title added"}
          </p>
        </div>
        <button
          onClick={() => onEdit("title")}
          className="flex items-center gap-2 text-blue-500 cursor-pointer hover:text-blue-700 transition px-4 py-2 bg-blue-50 rounded-lg text-sm font-medium"
        >
          <FaEdit className="w-4 h-4" />
          Edit Title
        </button>
      </div>
      <div className="flex items-center mt-4">
        <div className="flex">
          {[...Array(5)].map((_, i) => (
            <FaStar key={i} className="w-5 h-5 text-yellow-400" />
          ))}
        </div>
        <span className="ml-2 text-gray-600 text-sm">5.0 (12 reviews)</span>
      </div>
    </div>
  </div>
);

// Section Card Component
const SectionCard = ({
  title,
  onEdit,
  children,
  sectionKey,
  className = "",
}) => {
  const icons = {
    about: <FaUser className="text-blue-500" />,
    classes: <FaChalkboardTeacher className="text-blue-500" />,
    teaching: <FaBriefcase className="text-blue-500" />,
    education: <FaGraduationCap className="text-blue-500" />,
    awards: <FaTrophy className="text-blue-500" />,
    location: <FaMapMarkerAlt className="text-blue-500" />,
    workHistory: <FaCalendarAlt className="text-blue-500" />,
    default: <FaGlobe className="text-blue-500" />,
  };

  return (
    <div
      className={`mb-6 bg-white p-6 rounded-2xl shadow-sm border border-gray-100 ${className}`}
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          {icons[sectionKey] || icons.default}
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        </div>
        {onEdit && (
          <button
            onClick={() => onEdit(sectionKey)}
            className="flex items-center gap-2 text-blue-500 cursor-pointer hover:text-blue-700 transition px-3 py-1.5 bg-blue-50 rounded-lg text-sm font-medium"
          >
            <FaEdit className="w-3.5 h-3.5" />
            Edit
          </button>
        )}
      </div>
      {children || (
        <p className="text-gray-500 italic">No information added yet</p>
      )}
    </div>
  );
};

// Experience Item Component
const ExperienceItem = ({ title, subtitle, period, description, isLast }) => (
  <div
    className={`flex gap-4 ${
      !isLast ? "pb-6 mb-6 border-b border-gray-100" : ""
    }`}
  >
    <div className="flex flex-col items-center">
      <div className="w-3 h-3 rounded-full bg-blue-500 mt-1.5"></div>
      {!isLast && <div className="w-0.5 h-full bg-gray-200 mt-1.5"></div>}
    </div>
    <div className="flex-1">
      <h3 className="font-medium text-gray-800">{title}</h3>
      {subtitle && <p className="text-gray-600 text-sm mt-1">{subtitle}</p>}
      {period && <p className="text-gray-500 text-sm mt-1">{period}</p>}
      {description && (
        <p className="text-gray-600 mt-3 text-sm leading-relaxed">
          {description}
        </p>
      )}
    </div>
  </div>
);

// Sidebar Component
const Sidebar = ({ profileData, onEdit, onCopy }) => {
  const stats = [
    {
      title: "Hourly Rate",
      key: "hourlyRate",
      value: profileData.hourlyRate
        ? `₹${profileData.hourlyRate}/hr`
        : "Not set",
      icon: <FaMoneyBillWave className="text-blue-500" />,
    },
    {
      title: "Total Hours",
      value: profileData.workingHours || "0",
      icon: <FaClock className="text-blue-500" />,
    },
    {
      title: "Total Earnings",
      value: profileData.earned || "₹0",
      icon: <FaMoneyBillWave className="text-blue-500" />,
    },
    {
      title: "Classes Taught",
      value: profileData.classesCount || "0",
      icon: <FaChalkboardTeacher className="text-blue-500" />,
    },
    {
      title: "Availability",
      key: "availability",
      value: profileData.availability
        ? profileData.availability === "available"
          ? "Available"
          : "Not Available"
        : "Not set",
      icon: <FaClock className="text-blue-500" />,
    },
    {
      title: "Teaching Mode",
      key: "teachingMode",
      value: profileData.teachingMode
        ? profileData.teachingMode.charAt(0).toUpperCase() +
          profileData.teachingMode.slice(1)
        : "Not set",
      icon: <FaGlobe className="text-blue-500" />,
    },
    {
      title: "Language",
      key: "language",
      value: profileData.language || "Not set",
      icon: <FaGlobe className="text-blue-500" />,
    },
  ];

  return (
    <div className="w-full md:w-80 lg:w-96 bg-white p-6 border-l border-gray-200 md:sticky md:top-0 md:h-screen md:overflow-y-auto">
      <div className="space-y-6">
        {stats.map(({ title, key, value, icon }) => (
          <div
            key={title}
            className="pb-4 border-b border-gray-100 last:border-0"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3 text-gray-700">
                <span className="text-blue-500">{icon}</span>
                <h3 className="font-medium">{title}</h3>
              </div>
              {key && (
                <button
                  onClick={() => onEdit(key)}
                  className="text-blue-500 hover:text-blue-700 cursor-pointer transition text-sm flex items-center gap-1"
                  aria-label={`Edit ${title}`}
                >
                  <FaEdit className="w-3 h-3" />
                </button>
              )}
            </div>
            <p className="text-gray-600 pl-9">{value}</p>
          </div>
        ))}

        <div className="pt-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-3">
            <FaShareAlt className="text-blue-500" />
            Share Profile
          </h3>
          <div className="flex items-center mb-4">
            <input
              type="text"
              readOnly
              value="https://www.addisedu.com/tutor/arpit-sharma"
              className="flex-1 p-2.5 text-sm border border-gray-300 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
              aria-label="Profile URL"
            />
            <button
              onClick={onCopy}
              className="p-2.5 bg-blue-500 cursor-pointer hover:bg-blue-600 text-white rounded-r-lg transition"
              aria-label="Copy profile link"
            >
              <FaCopy />
            </button>
          </div>
          <div className="flex justify-start gap-4">
            <button
              className="text-blue-600 hover:text-blue-800 cursor-pointer transition p-2 rounded-full bg-blue-50"
              aria-label="Share on Facebook"
            >
              <FaFacebook size={18} />
            </button>
            <button
              className="text-blue-400 hover:text-blue-600 cursor-pointer transition p-2 rounded-full bg-blue-50"
              aria-label="Share on Twitter"
            >
              <FaTwitter size={18} />
            </button>
            <button
              className="text-blue-700 hover:text-blue-900 cursor-pointer transition p-2 rounded-full bg-blue-50"
              aria-label="Share on LinkedIn"
            >
              <FaLinkedin size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, onSave, title, children }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-100 flex  items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div
        className="bg-white rounded-xl w-full max-w-md shadow-xl transform transition-all max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center p-5 border-b border-gray-200 sticky top-0 bg-white z-10">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition p-1 rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <FaTimes />
          </button>
        </div>
        <div className="p-5 overflow-y-auto flex-1">{children}</div>
        <div className="flex justify-end gap-3 p-5 border-t border-gray-200 sticky bottom-0 bg-white z-10">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 cursor-pointer rounded-lg transition font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-5 py-2.5 bg-blue-500 hover:bg-blue-600 cursor-pointer text-white rounded-lg transition font-medium flex items-center gap-2"
          >
            <FaCheck />
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

// Toast Component
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const Icon = type === "success" ? FaCheck : FaTimes;

  return (
    <div
      className={`fixed top-18 right-6 p-4 rounded-lg shadow-lg text-white flex items-start gap-3 max-w-sm ${
        type === "success" ? "bg-green-500" : "bg-red-500"
      } animate-fade-in-up`}
    >
      {/* <Icon className="flex-shrink-0 mt-0.5" /> */}
      <div>
        <p className="font-medium">
          {type === "success" ? "Success" : "Error"}
        </p>
        <p className="text-sm">{message}</p>
      </div>
      {/* <button
        onClick={onClose}
        className="ml-2 text-white cursor-pointer hover:text-white/80 transition"
        aria-label="Dismiss notification"
      >
        <FaTimes size={14} />
      </button> */}
    </div>
  );
};

// Edit Modal Content Component
const EditModalContent = ({ section, modalData, errors, onChange }) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const years = Array.from(
    { length: 30 },
    (_, i) => new Date().getFullYear() - i
  );

  switch (section) {
    case "title":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Professional Title
            </label>
            <p className="text-gray-500 text-sm mb-3">
              A brief description of your expertise (e.g., "Math Tutor with 5+
              Years Experience")
            </p>
            <input
              type="text"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.title
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              value={modalData.title}
              onChange={(e) => onChange(section, "title", e.target.value)}
              placeholder="Enter your professional title"
            />
            {errors.title && (
              <p className="text-red-500 text-sm mt-1">{errors.title}</p>
            )}
          </div>
        </div>
      );
    case "about":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              About You
            </label>
            <p className="text-gray-500 text-sm mb-3">
              Describe your teaching approach, qualifications, and what makes
              you unique
            </p>
            <textarea
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 min-h-[150px] ${
                errors.about
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              value={modalData.about}
              onChange={(e) => onChange(section, "about", e.target.value)}
              placeholder="Tell students about yourself and your teaching style..."
            />
            <div className="flex justify-between items-center mt-1">
              {errors.about ? (
                <p className="text-red-500 text-sm">{errors.about}</p>
              ) : (
                <span className="text-gray-400 text-sm">
                  {500 - (modalData.about?.length || 0)} characters remaining
                </span>
              )}
            </div>
          </div>
        </div>
      );
    case "classes":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2">
              Subjects You Teach
            </label>
            <p className="text-gray-500 text-sm mb-3">
              List the subjects or classes you specialize in (comma separated)
            </p>
            <input
              type="text"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 ${
                errors.classes
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              value={modalData.classes}
              onChange={(e) => onChange(section, "classes", e.target.value)}
              placeholder="e.g., Mathematics, Physics, Chemistry"
            />
            {errors.classes && (
              <p className="text-red-500 text-sm mt-1">{errors.classes}</p>
            )}
          </div>
        </div>
      );
    case "teaching":
      return (
        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Institute Name
              </label>
              <input
                type="text"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                  errors.institute
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                value={modalData.teaching.institute}
                onChange={(e) => onChange(section, "institute", e.target.value)}
                placeholder="School/University name"
              />
              {errors.institute && (
                <p className="text-red-500 text-xs mt-1">{errors.institute}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Job Title
              </label>
              <input
                type="text"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                  errors.jobTitle
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                value={modalData.teaching.jobTitle}
                onChange={(e) => onChange(section, "jobTitle", e.target.value)}
                placeholder="Your position"
              />
              {errors.jobTitle && (
                <p className="text-red-500 text-xs mt-1">{errors.jobTitle}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                City
              </label>
              <select
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                  errors.city
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
                <option>Hyderabad</option>
                <option>Chennai</option>
              </select>
              {errors.city && (
                <p className="text-red-500 text-xs mt-1">{errors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                State
              </label>
              <select
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                  errors.state
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
                <option>Telangana</option>
                <option>Tamil Nadu</option>
              </select>
              {errors.state && (
                <p className="text-red-500 text-xs mt-1">{errors.state}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Role
            </label>
            <select
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                errors.role
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              value={modalData.teaching.role}
              onChange={(e) => onChange(section, "role", e.target.value)}
            >
              <option value="">Select Role</option>
              <option>Teacher</option>
              <option>Professor</option>
              <option>Tutor</option>
              <option>Lecturer</option>
              <option>Instructor</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-xs mt-1">{errors.role}</p>
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Start Date
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  className={`p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                    errors.fromMonth
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  value={modalData.teaching.fromMonth}
                  onChange={(e) =>
                    onChange(section, "fromMonth", e.target.value)
                  }
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  className={`p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                    errors.fromYear
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  value={modalData.teaching.fromYear}
                  onChange={(e) =>
                    onChange(section, "fromYear", e.target.value)
                  }
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              {(errors.fromMonth || errors.fromYear) && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fromMonth || errors.fromYear}
                </p>
              )}
            </div>

            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                End Date
              </label>
              <div className="grid grid-cols-2 gap-2">
                <select
                  className={`p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                    errors.toMonth
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  value={modalData.teaching.toMonth}
                  onChange={(e) => onChange(section, "toMonth", e.target.value)}
                  disabled={modalData.teaching.currentlyWorking}
                >
                  <option value="">Month</option>
                  {months.map((month) => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>
                <select
                  className={`p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                    errors.toYear
                      ? "border-red-500 focus:ring-red-500"
                      : "border-gray-300 focus:ring-blue-500"
                  }`}
                  value={modalData.teaching.toYear}
                  onChange={(e) => onChange(section, "toYear", e.target.value)}
                  disabled={modalData.teaching.currentlyWorking}
                >
                  <option value="">Year</option>
                  {years.map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
              {(errors.toMonth || errors.toYear) &&
                !modalData.teaching.currentlyWorking && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.toMonth || errors.toYear}
                  </p>
                )}
            </div>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="currentlyWorking"
              className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
              checked={modalData.teaching.currentlyWorking}
              onChange={(e) =>
                onChange(section, "currentlyWorking", e.target.checked)
              }
            />
            <label htmlFor="currentlyWorking" className="text-gray-700 text-sm">
              I currently work here
            </label>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Description (Optional)
            </label>
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 text-sm min-h-[100px]"
              value={modalData.teaching.description}
              onChange={(e) => onChange(section, "description", e.target.value)}
              placeholder="Describe your responsibilities and achievements..."
            />
          </div>
        </div>
      );
    case "education":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Institute Name
            </label>
            <input
              type="text"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                errors.institute
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              value={modalData.education.institute}
              onChange={(e) => onChange(section, "institute", e.target.value)}
              placeholder="School/University name"
            />
            {errors.institute && (
              <p className="text-red-500 text-xs mt-1">{errors.institute}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Duration
            </label>
            <div className="grid grid-cols-2 gap-3">
              <select
                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                  errors.fromYear
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                value={modalData.education.fromYear}
                onChange={(e) => onChange(section, "fromYear", e.target.value)}
              >
                <option value="">Start Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
              <select
                className={`p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                  errors.toYear
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                value={modalData.education.toYear}
                onChange={(e) => onChange(section, "toYear", e.target.value)}
              >
                <option value="">End Year</option>
                {years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
            {(errors.fromYear || errors.toYear) && (
              <p className="text-red-500 text-xs mt-1">
                {errors.fromYear || errors.toYear}
              </p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Degree (Optional)
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 text-sm"
              value={modalData.education.degree}
              onChange={(e) => onChange(section, "degree", e.target.value)}
              placeholder="e.g., B.Sc, M.A, Ph.D"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Field of Study (Optional)
            </label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 text-sm"
              value={modalData.education.areaOfStudy}
              onChange={(e) => onChange(section, "areaOfStudy", e.target.value)}
              placeholder="e.g., Computer Science, Mathematics"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Description (Optional)
            </label>
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 text-sm min-h-[80px]"
              value={modalData.education.description}
              onChange={(e) => onChange(section, "description", e.target.value)}
              placeholder="Notable achievements or specializations..."
            />
          </div>
        </div>
      );
    case "awards":
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Title
              </label>
              <input
                type="text"
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                  errors.title
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                value={modalData.awards.title}
                onChange={(e) => onChange(section, "title", e.target.value)}
                placeholder="Award or project name"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">{errors.title}</p>
              )}
            </div>
            <div>
              <label className="block text-gray-700 font-medium mb-1 text-sm">
                Category
              </label>
              <select
                className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                  errors.category
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                value={modalData.awards.category}
                onChange={(e) => onChange(section, "category", e.target.value)}
              >
                <option value="">Select category</option>
                <option>Award</option>
                <option>Certification</option>
                <option>Project</option>
                <option>Publication</option>
              </select>
              {errors.category && (
                <p className="text-red-500 text-xs mt-1">{errors.category}</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Date Received (Optional)
            </label>
            <input
              type="date"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 text-sm"
              value={modalData.awards.completionDate}
              onChange={(e) =>
                onChange(section, "completionDate", e.target.value)
              }
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              URL (Optional)
            </label>
            <input
              type="url"
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 text-sm"
              value={modalData.awards.url}
              onChange={(e) => onChange(section, "url", e.target.value)}
              placeholder="Link to certificate or project"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Description
            </label>
            <textarea
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 text-sm min-h-[100px]"
              value={modalData.awards.overview}
              onChange={(e) => onChange(section, "overview", e.target.value)}
              placeholder="Describe the award or project..."
            />
          </div>
        </div>
      );
    case "location":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Your Location
            </label>
            <p className="text-gray-500 text-xs mb-2">
              Your exact address will not be shared with students
            </p>
            <input
              type="text"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                errors.mapLocation
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              value={modalData.location.mapLocation}
              onChange={(e) => onChange(section, "mapLocation", e.target.value)}
              placeholder="Search for your location"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Area/Locality Name
            </label>
            <input
              type="text"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                errors.areaName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              value={modalData.location.areaName}
              onChange={(e) => onChange(section, "areaName", e.target.value)}
              placeholder="e.g., Andheri West, Koramangala"
            />
            {errors.areaName && (
              <p className="text-red-500 text-xs mt-1">{errors.areaName}</p>
            )}
          </div>

          <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center text-gray-400">
            Map Preview (Interactive map would go here)
          </div>
        </div>
      );
    case "hourlyRate":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-3 text-sm">
              Rate Type
            </label>
            <div className="flex gap-3">
              <button
                className={`flex-1 py-2 px-4 rounded-lg border transition ${
                  modalData.hourlyRate.type === "hourly"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => onChange(section, "type", "hourly")}
              >
                Hourly Rate
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-lg border transition ${
                  modalData.hourlyRate.type === "monthly"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => onChange(section, "type", "monthly")}
              >
                Monthly Rate
              </button>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              {modalData.hourlyRate.type === "hourly" ? "Hourly" : "Monthly"}{" "}
              Rate (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                ₹
              </span>
              <input
                type="number"
                className={`w-full pl-8 p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                  errors.rate
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
                value={modalData.hourlyRate.rate}
                onChange={(e) => onChange(section, "rate", e.target.value)}
                placeholder={`Enter your ${modalData.hourlyRate.type} rate`}
              />
            </div>
            {errors.rate && (
              <p className="text-red-500 text-xs mt-1">{errors.rate}</p>
            )}
          </div>
        </div>
      );
    case "availability":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-3 text-sm">
              Current Availability
            </label>
            <div className="flex gap-3">
              <button
                className={`flex-1 py-2 px-4 rounded-lg border transition ${
                  modalData.availability.status === "available"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => onChange(section, "status", "available")}
              >
                Available
              </button>
              <button
                className={`flex-1 py-2 px-4 rounded-lg border transition ${
                  modalData.availability.status === "not available"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => onChange(section, "status", "not available")}
              >
                Not Available
              </button>
            </div>
            {errors.status && (
              <p className="text-red-500 text-xs mt-1">{errors.status}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-2 text-sm">
              Weekly Availability
            </label>
            <div className="space-y-2">
              {[
                "More than 30 hours/week",
                "Less than 30 hours/week",
                "As needed - flexible hours",
              ].map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="radio"
                    name="availabilityHours"
                    className="h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300"
                    checked={modalData.availability.hours === option}
                    onChange={() => onChange(section, "hours", option)}
                  />
                  <span className="ml-2 text-gray-700 text-sm">{option}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
      );
    case "teachingMode":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-3 text-sm">
              Preferred Teaching Mode
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <button
                className={`py-3 px-4 rounded-lg border transition ${
                  modalData.teachingMode === "offline"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => onChange(section, "teachingMode", "offline")}
              >
                In-Person
              </button>
              <button
                className={`py-3 px-4 rounded-lg border transition ${
                  modalData.teachingMode === "online"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => onChange(section, "teachingMode", "online")}
              >
                Online
              </button>
              <button
                className={`py-3 px-4 rounded-lg border transition ${
                  modalData.teachingMode === "both"
                    ? "bg-blue-500 text-white border-blue-500"
                    : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                }`}
                onClick={() => onChange(section, "teachingMode", "both")}
              >
                Both
              </button>
            </div>
          </div>
        </div>
      );
    case "language":
      return (
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-1 text-sm">
              Primary Teaching Language
            </label>
            <input
              type="text"
              className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm ${
                errors.language
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
              value={modalData.language}
              onChange={(e) => onChange(section, "language", e.target.value)}
              placeholder="e.g., English, Hindi"
            />
            {errors.language && (
              <p className="text-red-500 text-xs mt-1">{errors.language}</p>
            )}
          </div>
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
    title: "Mathematics Tutor with 5+ Years Experience",
    about:
      "Passionate mathematics educator with a focus on making complex concepts accessible. Specialized in algebra, calculus, and geometry for high school and college students. My teaching approach combines conceptual understanding with practical problem-solving techniques.",
    classes: "Mathematics, Algebra, Calculus, Geometry, Trigonometry",
    teaching: [
      {
        institute: "Delhi Public School",
        jobTitle: "Senior Mathematics Teacher",
        city: "Delhi",
        state: "Delhi",
        role: "Teacher",
        fromMonth: "June",
        fromYear: "2018",
        toMonth: "Present",
        toYear: "",
        currentlyWorking: true,
        description:
          "Teach mathematics to grades 9-12, develop curriculum, and mentor students for competitive exams.",
      },
      {
        institute: "ABC Coaching Center",
        jobTitle: "Mathematics Tutor",
        city: "Noida",
        state: "Uttar Pradesh",
        role: "Tutor",
        fromMonth: "January",
        fromYear: "2015",
        toMonth: "May",
        toYear: "2018",
        currentlyWorking: false,
        description:
          "Provided individual and group tutoring for IIT-JEE and board exam preparation.",
      },
    ],
    education: [
      {
        institute: "University of Delhi",
        fromYear: "2012",
        toYear: "2015",
        degree: "M.Sc",
        areaOfStudy: "Mathematics",
        description:
          "Specialized in Applied Mathematics. Thesis on Differential Equations.",
      },
      {
        institute: "St. Stephen's College",
        fromYear: "2009",
        toYear: "2012",
        degree: "B.Sc (Hons)",
        areaOfStudy: "Mathematics",
        description: "Graduated with First Class Honors.",
      },
    ],
    awards: [
      {
        title: "Best Teacher Award",
        category: "Award",
        completionDate: "2020-05-15",
        overview:
          "Recognized for excellence in teaching and student engagement.",
      },
      {
        title: "Mathematics Olympiad Coach",
        category: "Certification",
        completionDate: "2019-08-20",
        overview:
          "Trained 3 students who qualified for National Mathematics Olympiad.",
      },
    ],
    location: "Saket, New Delhi",
    hourlyRate: "800",
    workingHours: "245",
    earned: "₹1,96,000",
    classesCount: "32",
    availability: "available",
    teachingMode: "both",
    language: "English, Hindi",
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

      // Initialize modal data with existing profile data when opening
      if (!isEditing[section]) {
        setModalData((prev) => {
          if (
            section === "teaching" ||
            section === "education" ||
            section === "awards"
          ) {
            // For array sections, start with empty form for new entry
            return {
              ...prev,
              [section]: modalData[section], // Keep the existing empty structure
            };
          } else if (section === "hourlyRate") {
            return {
              ...prev,
              hourlyRate: {
                type: "hourly",
                rate: profileData.hourlyRate || "",
              },
            };
          } else if (section === "availability") {
            return {
              ...prev,
              availability: {
                status: profileData.availability || "available",
                hours: "",
              },
            };
          } else if (section === "location") {
            return {
              ...prev,
              location: {
                mapLocation: profileData.location || "",
                areaName: profileData.location || "",
              },
            };
          } else {
            return {
              ...prev,
              [section]: profileData[section] || "",
            };
          }
        });
      }
    },
    [isEditing, modalData, profileData]
  );

  const handleModalChange = useCallback(
    (section, field, value) => {
      setModalData((prev) => {
        if (
          typeof prev[section] === "object" &&
          !Array.isArray(prev[section])
        ) {
          return {
            ...prev,
            [section]: {
              ...prev[section],
              [field]: value,
            },
          };
        }
        return {
          ...prev,
          [section]: value,
        };
      });

      // Validate the field
      const error = validateField(section, field, value, modalData);
      setErrors((prev) => ({
        ...prev,
        [field]: error,
      }));
    },
    [modalData]
  );

  const handleSave = useCallback(
    (section) => {
      // Validate all relevant fields for the section
      const sectionErrors = {};

      if (section === "title") {
        sectionErrors.title = validateField(
          "title",
          "title",
          modalData.title,
          modalData
        );
      } else if (section === "about") {
        sectionErrors.about = validateField(
          "about",
          "about",
          modalData.about,
          modalData
        );
      } else if (section === "classes") {
        sectionErrors.classes = validateField(
          "classes",
          "classes",
          modalData.classes,
          modalData
        );
      } else if (section === "teaching") {
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
      } else if (section === "education") {
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
      } else if (section === "awards") {
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
      } else if (section === "location") {
        sectionErrors.areaName = validateField(
          "location",
          "areaName",
          modalData.location.areaName,
          modalData
        );
      } else if (section === "hourlyRate") {
        sectionErrors.rate = validateField(
          "hourlyRate",
          "rate",
          modalData.hourlyRate.rate,
          modalData
        );
      } else if (section === "availability") {
        sectionErrors.status = validateField(
          "availability",
          "status",
          modalData.availability.status,
          modalData
        );
      } else if (section === "language") {
        sectionErrors.language = validateField(
          "language",
          "language",
          modalData.language,
          modalData
        );
      }

      // Check if there are any errors
      const hasErrors = Object.values(sectionErrors).some((error) => error);

      if (hasErrors) {
        setErrors(sectionErrors);
        setToast({
          message: "Please fix the errors before saving.",
          type: "error",
        });
        return;
      }

      // Update profile data based on the section
      setProfileData((prev) => {
        if (
          section === "teaching" ||
          section === "education" ||
          section === "awards"
        ) {
          // For array sections, add the new entry
          return {
            ...prev,
            [section]: [...prev[section], modalData[section]],
          };
        } else if (section === "hourlyRate") {
          return {
            ...prev,
            hourlyRate: modalData.hourlyRate.rate,
          };
        } else if (section === "availability") {
          return {
            ...prev,
            availability: modalData.availability.status,
          };
        } else if (section === "location") {
          return {
            ...prev,
            location: modalData.location.areaName,
          };
        } else {
          return {
            ...prev,
            [section]: modalData[section],
          };
        }
      });

      setToast({
        message: `${
          section.charAt(0).toUpperCase() + section.slice(1)
        } updated successfully!`,
        type: "success",
      });

      handleEditToggle(section);
    },
    [modalData, handleEditToggle]
  );

  const copyToClipboard = useCallback(() => {
    navigator.clipboard.writeText(
      "https://www.addisedu.com/tutor/arpit-sharma"
    );
    setToast({ message: "Profile link copied to clipboard!", type: "success" });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row font-sans antialiased">
      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 max-w-4xl mx-auto w-full">
        <ProfileHeader title={profileData.title} onEdit={handleEditToggle} />

        {/* About Section */}
        <SectionCard title="About" sectionKey="about" onEdit={handleEditToggle}>
          <p className="text-gray-600 whitespace-pre-line">
            {profileData.about}
          </p>
        </SectionCard>

        {/* Work History Section */}
        <SectionCard title="Work History & Reviews" sectionKey="workHistory">
          <div className="space-y-1">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800">Student Reviews</h3>
              <span className="text-sm text-gray-500">12 reviews</span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="text-4xl font-bold text-gray-800">5.0</div>
              <div className="flex flex-col">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-yellow-400" />
                  ))}
                </div>
                <span className="text-sm text-gray-500 mt-1">
                  Based on 12 reviews
                </span>
              </div>
            </div>

            <button className="w-full py-2.5 border border-blue-500 text-blue-500 rounded-lg font-medium hover:bg-blue-50 transition">
              View All Reviews
            </button>
          </div>
        </SectionCard>

        {/* Classes Section */}
        <SectionCard
          title="Subjects"
          sectionKey="classes"
          onEdit={handleEditToggle}
        >
          <div className="flex flex-wrap gap-2">
            {profileData.classes.split(", ").map((subject, index) => (
              <span
                key={index}
                className="px-3 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm"
              >
                {subject}
              </span>
            ))}
          </div>
        </SectionCard>

        {/* Teaching Experience Section */}
        <SectionCard
          title="Teaching Experience"
          sectionKey="teaching"
          onEdit={handleEditToggle}
        >
          <div className="space-y-6">
            {profileData.teaching.length > 0 ? (
              profileData.teaching.map((exp, index) => (
                <ExperienceItem
                  key={index}
                  title={`${exp.jobTitle} at ${exp.institute}`}
                  subtitle={`${exp.city}, ${exp.state} • ${exp.role}`}
                  period={`${exp.fromMonth} ${exp.fromYear} - ${
                    exp.currentlyWorking
                      ? "Present"
                      : `${exp.toMonth} ${exp.toYear}`
                  }`}
                  description={exp.description}
                  isLast={index === profileData.teaching.length - 1}
                />
              ))
            ) : (
              <p className="text-gray-500 italic">
                No teaching experience added
              </p>
            )}
          </div>
        </SectionCard>

        {/* Education Section */}
        <SectionCard
          title="Education"
          sectionKey="education"
          onEdit={handleEditToggle}
        >
          <div className="space-y-6">
            {profileData.education.length > 0 ? (
              profileData.education.map((edu, index) => (
                <ExperienceItem
                  key={index}
                  title={edu.institute}
                  subtitle={`${edu.degree}${
                    edu.degree && edu.areaOfStudy ? ", " : ""
                  }${edu.areaOfStudy}`}
                  period={`${edu.fromYear} - ${edu.toYear}`}
                  description={edu.description}
                  isLast={index === profileData.education.length - 1}
                />
              ))
            ) : (
              <p className="text-gray-500 italic">
                No education information added
              </p>
            )}
          </div>
        </SectionCard>

        {/* Awards Section */}
        <SectionCard
          title="Awards & Certifications"
          sectionKey="awards"
          onEdit={handleEditToggle}
        >
          <div className="space-y-6">
            {profileData.awards.length > 0 ? (
              profileData.awards.map((award, index) => (
                <ExperienceItem
                  key={index}
                  title={`${award.title} • ${award.category}`}
                  period={
                    award.completionDate
                      ? new Date(award.completionDate).toLocaleDateString(
                          "en-US",
                          { year: "numeric", month: "long" }
                        )
                      : ""
                  }
                  description={award.overview}
                  isLast={index === profileData.awards.length - 1}
                />
              ))
            ) : (
              <p className="text-gray-500 italic">
                No awards or certifications added
              </p>
            )}
          </div>
        </SectionCard>

        {/* Location Section */}
        <SectionCard
          title="Location"
          sectionKey="location"
          onEdit={handleEditToggle}
        >
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-blue-500 mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-800">{profileData.location}</p>
              <p className="text-gray-500 text-sm mt-1">
                Your exact address is not shared with students
              </p>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Sidebar */}
      <Sidebar
        profileData={profileData}
        onEdit={handleEditToggle}
        onCopy={copyToClipboard}
      />

      {/* Edit Modals */}
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

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
