"use client";
import React, { useState, useEffect, useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import { IoIosSearch } from "react-icons/io";

const SearchableCitySelect = ({ selectedCity, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayValue, setDisplayValue] = useState("Select City");
  const dropdownRef = useRef(null);

  // Sample list of Indian cities
  const cities = [
    "Aalo",
    "Adilabad",
    "Agartala",
    "Agra",
    "Ahmedabad",
    "Ajmer",
    "Bengaluru",
    "Bhopal",
    "Bhubaneswar",
    "Chennai",
    "Delhi",
    "Dehradun",
    "Hyderabad",
    "Indore",
    "Jaipur",
    "Kolkata",
    "Lucknow",
    "Mumbai",
    "Nagpur",
    "Patna",
    "Pune",
    "Raipur",
    "Shimla",
    "Surat",
    "Vadodara",
  ];

  // Filter cities based on search term
  const filteredCities = cities.filter((city) =>
    city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle selection of a city
  const handleSelectCity = (city) => {
    onChange(city);
    setDisplayValue(city);
    setIsOpen(false);
    setSearchTerm("");
  };

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Update display value when selectedCity changes
  useEffect(() => {
    if (selectedCity) {
      setDisplayValue(selectedCity);
    }
  }, [selectedCity]);

  return (
    <div className="relative w-full mb-4" ref={dropdownRef}>
      {/* Select header */}
      <div
        className="flex items-center justify-between w-full border border-gray-300 rounded-full px-4 py-2 bg-white cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`${!selectedCity ? "text-gray-500" : "text-gray-800"}`}
        >
          {displayValue}
        </span>
        <FaChevronDown className="w-4 h-4 text-gray-400" />
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          {/* Search input */}
          <div className="p-2 border-b">
            <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-50">
              <IoIosSearch className="w-5 h-5 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search city..."
                className="w-full outline-none bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* City list */}
          <div className="max-h-40 overflow-y-auto">
            {filteredCities.length > 0 ? (
              filteredCities.map((city) => (
                <div
                  key={city}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleSelectCity(city)}
                >
                  {city}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No cities found</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchableCitySelect;
