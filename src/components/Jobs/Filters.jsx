import React, { useState, useEffect } from "react";
import { Search } from "lucide-react";

const Filters = ({ filters, setFilters }) => {
  const [categories, setCategories] = useState(["All Categories"]); // Initialize with default
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);
  const [specialties, setSpecialties] = useState(["Specialty"]); // Initialize with default
  const [loadingSpecialties, setLoadingSpecialties] = useState(true);
  const [errorSpecialties, setErrorSpecialties] = useState(null);
  const paymentTypes = ["Payment Type", "Fixed", "Hourly"];
  const experienceLevels = [
    "Experience Level",
    "Beginner",
    "Intermediate",
    "Expert",
  ];

  useEffect(() => {
    // Fetch categories from API
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await fetch("https://api.vybtek.com/api/categories");
        console.log("API Response Status (Categories):", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Raw API Response (Categories):", data);
        if (data.success && Array.isArray(data.data)) {
          setCategories([
            "All Categories",
            ...data.data.map((cat) => cat.name).sort(),
          ]);
        } else {
          setCategories(["All Categories"]);
          console.warn(
            "API did not return a valid success object with data array for categories"
          );
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        setErrorCategories("Failed to load categories. Using default.");
        setCategories(["All Categories"]);
      } finally {
        setLoadingCategories(false);
      }
    };

    // Fetch specialties from API
    const fetchSpecialties = async () => {
      try {
        setLoadingSpecialties(true);
        const response = await fetch("https://api.vybtek.com/api/subjects");
        console.log("API Response Status (Specialties):", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Raw API Response (Specialties):", data);
        if (data.success && Array.isArray(data.data)) {
          setSpecialties([
            "Specialty",
            ...data.data.map((spec) => spec.name).sort(),
          ]);
        } else {
          setSpecialties(["Specialty"]);
          console.warn(
            "API did not return a valid success object with data array for specialties"
          );
        }
      } catch (error) {
        console.error("Error fetching specialties:", error.message);
        setErrorSpecialties("Failed to load specialties. Using default.");
        setSpecialties(["Specialty"]);
      } finally {
        setLoadingSpecialties(false);
      }
    };

    fetchCategories();
    fetchSpecialties();
  }, []);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="border-t pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category
          </label>
          {loadingCategories ? (
            <p className="text-gray-600 text-sm">Loading categories...</p>
          ) : errorCategories ? (
            <p className="text-red-600 text-sm">{errorCategories}</p>
          ) : (
            <select
              value={filters.category}
              onChange={(e) => handleFilterChange("category", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Select category"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialty
          </label>
          {loadingSpecialties ? (
            <p className="text-gray-600 text-sm">Loading specialties...</p>
          ) : errorSpecialties ? (
            <p className="text-red-600 text-sm">{errorSpecialties}</p>
          ) : (
            <select
              value={filters.specialty}
              onChange={(e) => handleFilterChange("specialty", e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Select specialty"
            >
              {specialties.map((specialty) => (
                <option key={specialty} value={specialty}>
                  {specialty}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Payment Type
          </label>
          <select
            value={filters.paymentType}
            onChange={(e) => handleFilterChange("paymentType", e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Select payment type"
          >
            {paymentTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Experience Level
          </label>
          <select
            value={filters.experienceLevel}
            onChange={(e) =>
              handleFilterChange("experienceLevel", e.target.value)
            }
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            aria-label="Select experience level"
          >
            {experienceLevels.map((level) => (
              <option key={level} value={level}>
                {level}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Budget
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              value={filters.minBudget}
              onChange={(e) => handleFilterChange("minBudget", e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Minimum budget"
              min="0"
            />
            <input
              type="number"
              placeholder="Max"
              value={filters.maxBudget}
              onChange={(e) => handleFilterChange("maxBudget", e.target.value)}
              className="flex-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              aria-label="Maximum budget"
              min="0"
            />
            <button
              className="bg-sky-400 text-white px-6 py-3 rounded-lg hover:bg-sky-500 transition-colors"
              aria-label="Apply budget filter"
            >
              <Search className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
