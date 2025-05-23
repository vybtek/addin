"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

// Tutor Card Component
const TutorCard = ({ name, experience, subjects, rate, rating, image }) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const router = useRouter(); // Initialize useRouter hook

  // Navigate to the tutor details page using the tutor's name as a slug
  const handleViewDetails = () => {
    const tutorSlug = name.replace(/\s+/g, "-").toLowerCase();
    router.push(`/findtalents/${tutorSlug}`);
  };

  return (
    <div className="flex items-start p-4 bg-white border-b hover:bg-gray-50 transition">
      <img
        src={image}
        alt={`${name}'s profile`}
        className="w-16 h-16 rounded-full mr-4 object-cover"
        onError={(e) =>
          (e.target.src =
            "https://www.addinsedu.com/assets/default/images/default/thumb/default-member-logo.svg")
        }
        suppressHydrationWarning
      />
      <div className="flex-1">
        {/* Tutor name is clickable and navigates to the tutor details page */}
        <h3
          onClick={handleViewDetails}
          className="text-lg cursor-pointer hover:text-sky-400 font-semibold text-gray-800"
        >
          {name}
        </h3>
        <p className="text-sm text-gray-600">{experience}</p>
        <div className="flex flex-wrap gap-2 mt-2">
          {subjects.map((subject, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded"
            >
              {subject}
            </span>
          ))}
        </div>
        <p className="text-sm text-gray-600 mt-2">
          Rate: <span className="text-green-600 font-medium">{rate}/hr</span>
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Rating:{" "}
          <span className="text-yellow-500 font-medium">{rating} ★</span>
        </p>
        <div className="flex gap-3 mt-3">
          {/* "Hire a Tutor" button navigates to the tutor details page */}
          <button
            onClick={handleViewDetails}
            className="bg-blue-600 text-white px-4 cursor-pointer py-2 rounded-lg hover:bg-blue-700 transition"
            suppressHydrationWarning
          >
            Hire a Tutor
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 cursor-pointer rounded-lg hover:bg-gray-300 transition"
            suppressHydrationWarning
          >
            Invite for a Demo
          </button>
        </div>
      </div>
      <button
        onClick={() => setIsFavorited(!isFavorited)}
        className="ml-2"
        suppressHydrationWarning
      >
        <svg
          className={`w-6 h-6 ${
            isFavorited ? "text-red-500" : "text-gray-400"
          }`}
          fill={isFavorited ? "currentColor" : "none"}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      </button>
    </div>
  );
};

export default TutorCard;