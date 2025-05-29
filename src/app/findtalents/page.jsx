"use client";

import { useState } from "react";
import Sidebar from "../../components/FindTalents/Sidebar";
import TutorCard from "../../components/FindTalents/TutorCard";

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
      description:
        "I am an MSc graduate with 3 years of tutoring experience, specializing in Maths, Science, Social Studies, and English. I focus on building a strong foundation for my students and helping them excel in their studies.",
      availability: "Monday to Friday, 4 PM - 8 PM",
      education: "MSc in Physics, University of Delhi",
      reviews: 42,
      totalStudents: 120,
      memberSince: "May 10, 2023",
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
      description:
        "I am passionate about empowering students through quality education. I teach a wide range of subjects, including programming and digital marketing, and provide personalized tutoring for students from Class 8 to 12.",
      availability: "Weekdays, 3 PM - 9 PM",
      education: "BTech in Computer Science, IIT Mumbai",
      reviews: 65,
      totalStudents: 200,
      memberSince: "Jan 15, 2024",
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
      description:
        "With over 4 years of experience, I specialize in teaching Maths and Science for students in Classes 9 to 11. My goal is to make learning fun and engaging while ensuring academic success.",
      availability: "Monday to Saturday, 5 PM - 9 PM",
      education: "BSc in Mathematics, Bangalore University",
      reviews: 38,
      totalStudents: 90,
      memberSince: "Nov 20, 2022",
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
      description:
        "I am an academic tutor with expertise in English, Maths, Social Studies, Hindi, and Art & Craft. I provide online tutoring sessions tailored to each student's needs.",
      availability: "Flexible, Online Only",
      education: "BA in Education, IGNOU",
      reviews: 25,
      totalStudents: 60,
      memberSince: "Aug 5, 2023",
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
      description:
        "I have been teaching Maths and Science for 4 years, focusing on building conceptual clarity and problem-solving skills for my students.",
      availability: "Monday to Friday, 3 PM - 7 PM",
      education: "MSc in Mathematics, Delhi University",
      reviews: 50,
      totalStudents: 150,
      memberSince: "Mar 12, 2021",
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
      description:
        "I provide home tutoring services, offering personalized instruction to students in various subjects. My approach is student-centered, focusing on individual learning needs.",
      availability: "Flexible, Home Visits",
      education: "BEd, Osmania University",
      reviews: 15,
      totalStudents: 40,
      memberSince: "Jun 1, 2024",
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
        <div className="flex-1 ">
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
