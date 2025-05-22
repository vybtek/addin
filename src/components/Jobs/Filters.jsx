// Filters.jsx
import React from "react";
import { Search } from "lucide-react";

const Filters = ({ filters, setFilters }) => {
  const categories = ["All Categories", "Teaching", "Tutoring"];
  const specialties = [
    "Specialty",
    "Mathematics",
    "Science",
    "English",
    "Hindi",
  ];
  const paymentTypes = ["Payment Type", "Fixed", "Hourly"];
  const experienceLevels = [
    "Experience Level",
    "Beginner",
    "Intermediate",
    "Expert",
  ];

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
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Specialty
          </label>
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
