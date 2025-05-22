"use client";

import { useState, useEffect } from "react";

// Sidebar Component
const Sidebar = ({ onFilterChange }) => {
  const [selectedLocation, setSelectedLocation] = useState("ALL LOCATIONS");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [hourlyRate, setHourlyRate] = useState(160);

  const locations = [
    "ALL LOCATIONS",
    "Aalo",
    "Adilabad",
    "Agartala",
    "Agra",
    "Ahmedabad",
    "Ahmednagar",
    "Aizawl",
    "Ajmer",
    "Akola",
    "Delhi",
    "Mumbai",
    "Bangalore",
    "Online",
  ];
  const subjects = [
    "Maths",
    "Science",
    "Social Studies",
    "English",
    "Computer Programming",
  ];

  useEffect(() => {
    onFilterChange({ selectedLocation, selectedSubjects, hourlyRate });
  }, [selectedLocation, selectedSubjects, hourlyRate]);

  const handleSubjectChange = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  return (
    <div className="w-full md:w-70 p-6 fixed top- left-0 h-screen overflow-y-auto">
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Location
        </label>
        <select
          className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 transition"
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          suppressHydrationWarning
        >
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Subjects
        </label>
        <div className="space-y-3">
          {subjects.map((subject) => (
            <label key={subject} className="flex items-center">
              <input
                type="checkbox"
                className="w-5 h-5 text-blue-600 rounded focus:ring-blue-500"
                checked={selectedSubjects.includes(subject)}
                onChange={() => handleSubjectChange(subject)}
                suppressHydrationWarning
              />
              <span className="ml-2 text-gray-600">{subject}</span>
            </label>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Hourly Rate: ₹{hourlyRate}
        </label>
        <input
          type="range"
          min="0"
          max="500"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          suppressHydrationWarning
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>₹0</span>
          <span>₹500</span>
        </div>
      </div>
    </div>
  );
};

// Tutor Card Component (unchanged)
const TutorCard = ({ name, experience, subjects, rate, rating, image }) => {
  const [isFavorited, setIsFavorited] = useState(false);

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
        <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
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
          Rate: <span className="text-green-600 font-medium">{rate}</span>
        </p>
        <p className="text-sm text-gray-600 mt-1">
          Rating:{" "}
          <span className="text-yellow-500 font-medium">{rating} ★</span>
        </p>
        <div className="flex gap-3 mt-3">
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            suppressHydrationWarning
          >
            Hire a Tutor
          </button>
          <button
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
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

// Main Page Component
export default function FindTalentsPage() {
  const [tutors, setTutors] = useState([
    {
      name: "Shiwani Parita",
      experience: "MSc graduate having 3 years experience...",
      subjects: ["Maths", "Science", "Social Studies", "English"],
      rate: "₹200",
      rating: 4.5,
      createdAt: "2023-05-10",
      location: "Delhi",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1887&auto=format&fit=crop",
    },
    {
      name: "Krishna Khant",
      experience: "Empowering Students with Quality Education",
      subjects: [
        "Class 8 Tuition",
        "Class 9 Tuition",
        "Class 10 Tuition",
        "Class 11 Tuition",
        "Class 12 Tuition",
        "Computer Programming",
        "Python",
        "Homework Help",
        "Digital Marketing",
      ],
      rate: "₹100",
      rating: 4.8,
      createdAt: "2024-01-15",
      location: "Mumbai",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1887&auto=format&fit=crop",
    },
    {
      name: "Himanshu Joshi",
      experience: "9+ maths tutor with 4 year experience",
      subjects: [
        "Class 9 Tuition",
        "Class 10 Tuition",
        "Class 11 Tuition",
        "Maths",
        "Science",
      ],
      rate: "₹50",
      rating: 4.2,
      createdAt: "2022-11-20",
      location: "Bangalore",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=1887&auto=format&fit=crop",
    },
    {
      name: "Nikhil",
      experience: "Academic Tutor",
      subjects: ["English", "Maths", "Social Studies", "Hindi", "Art & Craft"],
      rate: "₹250",
      rating: 4.0,
      createdAt: "2023-08-05",
      location: "Online",
      image:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=1880&auto=format&fit=crop",
    },
    {
      name: "Ram Singh Malla",
      experience: "I have been teaching maths for 4 years...",
      subjects: ["Maths", "Science"],
      rate: "₹100",
      rating: 4.7,
      createdAt: "2021-03-12",
      location: "Delhi",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1887&auto=format&fit=crop",
    },
    {
      name: "Nikhil Rayala",
      experience: "I provide instruction to students in their homes...",
      subjects: ["Home Tutor"],
      rate: "₹0.00",
      rating: 3.9,
      createdAt: "2024-06-01",
      location: "Online",
      image:
        "https://images.unsplash.com/photo-1522556189639-b1509e2e1f68?q=80&w=1887&auto=format&fit=crop",
    },
  ]);

  const [filters, setFilters] = useState({
    selectedLocation: "ALL LOCATIONS",
    selectedSubjects: [],
    hourlyRate: 160,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Relevance");

  const filteredTutors = tutors
    .filter((tutor) => {
      if (
        filters.selectedLocation !== "ALL LOCATIONS" &&
        tutor.location !== filters.selectedLocation
      ) {
        return false;
      }
      if (filters.selectedSubjects.length > 0) {
        return filters.selectedSubjects.every((subject) =>
          tutor.subjects.includes(subject)
        );
      }
      const tutorRate = parseFloat(tutor.rate.replace("₹", "")) || 0;
      return tutorRate <= filters.hourlyRate;
    })
    .filter((tutor) =>
      tutor.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "Rating") {
        return b.rating - a.rating;
      } else if (sortOption === "Newest") {
        return new Date(b.createdAt) - new Date(a.createdAt);
      } else if (sortOption === "Oldest") {
        return new Date(a.createdAt) - new Date(b.createdAt);
      }
      return 0;
    });

  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
        <Sidebar onFilterChange={setFilters} />
        <div className="flex-1 md:ml-80">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">FIND TUTORS</h1>
          <div className="flex flex-col sm:flex-row justify-between mb-6 gap-4">
            <input
              type="text"
              placeholder="Find tutors by name"
              className="flex-1 p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              suppressHydrationWarning
            />
            <select
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500"
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              suppressHydrationWarning
            >
              <option>Relevance</option>
              <option>Rating</option>
              <option>Newest</option>
              <option>Oldest</option>
            </select>
          </div>
          <div className="space-y-4">
            {filteredTutors.length > 0 ? (
              filteredTutors.map((tutor, index) => (
                <TutorCard
                  key={index}
                  name={tutor.name}
                  experience={tutor.experience}
                  subjects={tutor.subjects}
                  rate={tutor.rate}
                  rating={tutor.rating}
                  image={tutor.image}
                />
              ))
            ) : (
              <p className="text-gray-600 text-center">
                No tutors found matching your criteria.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
