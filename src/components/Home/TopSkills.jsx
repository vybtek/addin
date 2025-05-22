import React from "react";

export default function TopSkills() {
  const skills = [
    [
      "Science",
      "Class 3 – 5 Tuition",
      "Maths Classes",
      "Class 10 Tuition",
      "Class 8 Tuition",
      "Class 9 Tuition",
      "Class 6 Tuition",
      "Class 7 Tuition",
    ],
    [
      "English",
      "Nursery – KG Tuition",
      "Class 11 Tuition",
      "Class 12 Tuition",
      "Social Studies",
      "Hindi",
      "Math",
      "Class 1–3",
    ],
    [
      "Economics",
      "EVS",
      "Accounts",
      "Computer",
      "English Speaking",
      "Political Science",
      "Class 1–8 Tuition",
      "Drawing Classes",
    ],
    [
      "Physics Classes",
      "Biology",
      "Chemistry",
      "History",
      "Class 3 to 8",
      "Computer Classes",
      "Business Studies",
    ],
  ];

  // Handler for skill click
  const handleSkillClick = (skill) => {
    console.log(`Clicked skill: ${skill}`);
    // Add your logic here, e.g., navigate, open modal, etc.
  };

  return (
    <div className="py-16 bg-gradient-to-b from-gray-50 to-teal-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Top Skills
          </h2>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {skills.map((column, colIndex) => (
            <div key={colIndex} className="flex flex-col space-y-2">
              {column.map((skill, skillIndex) => (
                <div
                  key={skillIndex}
                  className="flex items-center bg-white rounded-lg p-2 transition-all duration-300 hover:bg-teal-50"
                >
                  <div className="w-6 h-6 bg-teal-500 rounded-full flex items-center justify-center mr-2">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  {/* Clickable skill */}
                  {/* <button
                    onClick={() => handleSkillClick(skill)}
                    className="text-gray-800 hover:text-teal-400 text-sm font-medium focus:outline-none"
                  >
                    {skill}
                  </button> */}

                  {/* Alternative: Use <a> tag for navigation */}

                  <a
                    href={`/skills/${skill.toLowerCase().replace(/\s+/g, "-")}`} // Example URL
                    className="text-gray-800 hover:text-teal-400 text-sm font-medium"
                  >
                    {skill}
                  </a>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
