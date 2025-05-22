// SortDropdown.jsx
import React, { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const SortDropdown = ({ sortBy, setSortBy }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);
  const sortOptions = ["Relevance", "Newest", "Oldest"];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    // Add event listener when dropdown is open
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="flex items-center gap-2 text-gray-700">
        <span className="font-medium">Sort by:</span>
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center cursor-pointer gap-1 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          aria-expanded={showDropdown}
          aria-label="Sort options"
        >
          {sortBy}
          <ChevronDown className="w-4 h-4" />
        </button>
        {showDropdown && (
          <div className="absolute top-full right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-32">
            {sortOptions.map((option) => (
              <button
                key={option}
                onClick={() => {
                  setSortBy(option);
                  setShowDropdown(false);
                }}
                className="block w-full text-left px-4 py-2 hover:bg-gray-50 first:rounded-t-lg last:rounded-b-lg transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SortDropdown;
