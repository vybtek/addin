"use client";

import { useEffect, useState } from "react";

// Sidebar Component
const Sidebar = ({ onFilterChange }) => {
  const [selectedLocation, setSelectedLocation] = useState("ALL LOCATIONS");
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [hourlyRate, setHourlyRate] = useState(2000);
  const [locations, setLocations] = useState(["ALL LOCATIONS"]); // Initialize with default
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [errorLocations, setErrorLocations] = useState(null);
  const [subjects, setSubjects] = useState([]); // Initialize subjects
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [errorSubjects, setErrorSubjects] = useState(null);

  useEffect(() => {
    // Fetch locations from API
    const fetchLocations = async () => {
      try {
        setLoadingLocations(true);
        const response = await fetch("https://api.vybtek.com/api/cities");
        console.log("API Response Status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Raw API Response (Locations):", data);
        if (data.success && Array.isArray(data.data)) {
          setLocations(["ALL LOCATIONS", ...data.data.map((loc) => loc.name).sort()]);
        } else {
          setLocations(["ALL LOCATIONS"]);
          console.warn("API did not return a valid success object with data array");
        }
      } catch (error) {
        console.error("Error fetching locations:", error.message);
        setErrorLocations("Failed to load locations. Using default.");
        setLocations(["ALL LOCATIONS"]);
      } finally {
        setLoadingLocations(false);
      }
    };

    // Fetch subjects from API
    const fetchSubjects = async () => {
      try {
        setLoadingSubjects(true);
        const response = await fetch("https://api.vybtek.com/api/subjects");
        console.log("API Response Status (Subjects):", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Raw API Response (Subjects):", data);
        if (data.success && Array.isArray(data.data)) {
          setSubjects(data.data.map((subject) => subject.name).sort());
        } else {
          setSubjects([]);
          console.warn("API did not return a valid success object with data array for subjects");
        }
      } catch (error) {
        console.error("Error fetching subjects:", error.message);
        setErrorSubjects("Failed to load subjects. Using empty list.");
        setSubjects([]);
      } finally {
        setLoadingSubjects(false);
      }
    };

    fetchLocations();
    fetchSubjects();
  }, []);

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
        {loadingLocations ? (
          <p className="text-gray-600 text-sm">Loading locations...</p>
        ) : errorLocations ? (
          <p className="text-red-600 text-sm">{errorLocations}</p>
        ) : (
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
        )}
      </div>
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Subjects
        </label>
        {loadingSubjects ? (
          <p className="text-gray-600 text-sm">Loading subjects...</p>
        ) : errorSubjects ? (
          <p className="text-red-600 text-sm">{errorSubjects}</p>
        ) : (
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
        )}
      </div>
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Hourly Rate: ₹{hourlyRate}
        </label>
        <input
          type="range"
          min="0"
          max="5000"
          value={hourlyRate}
          onChange={(e) => setHourlyRate(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          suppressHydrationWarning
        />
        <div className="flex justify-between text-sm text-gray-500 mt-2">
          <span>₹0</span>
          <span>₹5000</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;