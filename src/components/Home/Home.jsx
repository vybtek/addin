import { useState } from "react";
import { Search } from "lucide-react";

export default function HeroBanner() {
  const [searchQuery, setSearchQuery] = useState("");

  const featuredCategories = [
    { name: "Math Tutor", color: "indigo-700" },
    { name: "Class 8", color: "indigo-700" },
    { name: "Class 10", color: "indigo-700" },
    { name: "Music Tutor", color: "indigo-700" },
    { name: "Physics Tutor", color: "indigo-700" },
    { name: "Yoga Tutor", color: "indigo-700" },
  ];

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    // Add your search functionality here
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-cyan-400 to-blue-500 py-24 md:py-34">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white opacity-10"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-white opacity-10"></div>
        <div className="absolute top-1/3 right-1/4 w-16 h-16 rounded-full bg-white opacity-5"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Main Heading */}
          <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Find the best tutor near you.
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
            Your One-Stop Destination for Personalized Learning: Find Expert
            Tutors Near you Online.
          </p>

          {/* Search Box */}
          <div className="flex flex-col sm:flex-row justify-center mb-8 max-w-2xl mx-auto">
            <div className="relative flex-grow mb-3 sm:mb-0">
              <input
                type="text"
                placeholder="Try 'Math Tutor' or 'Class 10'"
                className="w-full px-6 py-4 rounded-l-full sm:rounded-r-none rounded-r-full bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-600 shadow-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                suppressHydrationWarning
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-indigo-700 hover:bg-indigo-800 text-white font-medium py-4 px-8 rounded-r-full sm:rounded-l-none rounded-l-full transition duration-300 shadow-md flex items-center justify-center"
              suppressHydrationWarning
            >
              <Search size={20} className="mr-2" />
              Search
            </button>
          </div>

          {/* Categories */}
          <div className="text-center">
            <p className="text-gray-800 mb-4 font-medium">
              Or browse featured categories:
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {featuredCategories.map((category, index) => (
                <button
                  key={index}
                  className={`bg-indigo-700 hover:bg-indigo-800 text-white px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md`}
                  suppressHydrationWarning
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
