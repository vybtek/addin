"use client";

import { useEffect, useState } from "react";

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
    <div className="w-full md:w-70 p-6">
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

export default Sidebar;