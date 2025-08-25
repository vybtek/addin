"use client";
import { useState, useEffect } from "react";
import Sidebar from "../../components/FindTalents/Sidebar";
import TutorCard from "../../components/FindTalents/TutorCard";

export default function FindTalentsPage() {
  const [tutors, setTutors] = useState([]);
  const [filters, setFilters] = useState({
    selectedLocation: "ALL LOCATIONS",
    selectedSubjects: [],
    hourlyRate: 5000,
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("Relevance");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTutors = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.vybtek.com/api/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Raw API Response:", data);
        if (data && Array.isArray(data)) {
          const transformedTutors = data
            .filter((teacher) => teacher.teacher_profile)
            .map((teacher) => ({
              id: teacher.id,
              name: teacher.name || "Unknown",
              experience:
                teacher.teacher_profile?.experience
                  ?.map((exp) => `${exp.job_title} at ${exp.institute_name}`)
                  .join(", ") || "No experience",
              subjects: Array.isArray(teacher.teacher_profile?.subjects)
                ? teacher.teacher_profile.subjects
                : [], // Ensure subjects is always an array
              rate: `₹${teacher.teacher_profile?.charges_hourly || 0}`,
              rating: 0,
              createdAt: "",
              location: teacher.teacher_profile?.city || "Unknown",
              image: teacher.teacher_profile?.profile_photo_url || null,
              description: teacher.teacher_profile?.about || "No description",
              availability:
                teacher.teacher_profile?.mode === "both"
                  ? "Flexible"
                  : teacher.teacher_profile?.mode || "",
              education:
                teacher.teacher_profile?.education
                  ?.map((edu) => `${edu.degree} from ${edu.institution}`)
                  .join(", ") || "No education",
              reviews: 0,
              totalStudents: 0,
              memberSince: "",
            }));
          setTutors(transformedTutors);
          console.log("Transformed Tutors:", transformedTutors);
        } else {
          setTutors([]);
          console.warn("No valid data array returned from API");
        }
      } catch (error) {
        console.error("Error fetching tutors:", error);
        setError("Failed to fetch tutors. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTutors();
  }, []);

  const filteredTutors = tutors
    .filter((tutor) => {
      const tutorRate = parseFloat(tutor.rate.replace("₹", "")) || 0;
      const locationMatch =
        filters.selectedLocation === "ALL LOCATIONS" ||
        tutor.location === filters.selectedLocation;
      const subjectMatch =
        filters.selectedSubjects.length === 0 ||
        filters.selectedSubjects.every((subject) =>
          tutor.subjects.includes(subject)
        );
      const rateMatch = tutorRate <= filters.hourlyRate;
      console.log("Filter Check for", tutor.name, {
        tutorRate,
        filtersHourlyRate: filters.hourlyRate,
        locationMatch,
        subjectMatch,
        rateMatch,
      });
      return locationMatch && subjectMatch && rateMatch;
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

  console.log("Filtered Tutors:", filteredTutors);

  return (
    <div className="min-h-screen py-16 bg-gray-100">
      <div className="container mx-auto p-6 flex flex-col md:flex-row gap-6">
        <Sidebar onFilterChange={setFilters} />
        <div className="flex-1">
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
            {loading ? (
              <p className="text-gray-600 text-center">Loading...</p>
            ) : error ? (
              <p className="text-red-600 text-center">{error}</p>
            ) : filteredTutors.length > 0 ? (
              filteredTutors.map((tutor, index) => (
                <TutorCard
                  key={index}
                  teacher_id={tutor.id}
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