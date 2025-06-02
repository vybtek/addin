"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  DollarSign,
  Star,
  Facebook,
  Twitter,
  Linkedin,
  Share2,
  Bookmark,
  Heart,
  Users,
  Copy,
} from "lucide-react";

// Same tutor data as in FindTalentsPage
const tutorsData = [
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
];

const TutorDetails = () => {
  const router = useRouter();
  const { tutorId } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Decode the tutorId from the URL and find the matching tutor
    const tutorName = tutorId?.replace(/-/g, " ").toLowerCase();
    const foundTutor = tutorsData.find(
      (t) => t.name.toLowerCase() === tutorName
    );
    setTutor(foundTutor);
    setLoading(false);
  }, [tutorId]);

  // Calculate time difference for "Member since"
  const getTimeAgo = (dateString) => {
    const joinedDate = new Date(dateString);
    const now = new Date("2025-05-23T16:51:00+05:30"); // Current date and time in IST
    const diffInMs = now - joinedDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return `Joined ${diffInDays} days ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center">
        <p className="text-blue-600 text-lg font-medium animate-pulse">
          Loading tutor details...
        </p>
      </div>
    );
  }

  if (!tutor) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg font-medium">Tutor not found</p>
      </div>
    );
  }

  // Function to handle URL copy to clipboard
  const handleCopyLink = () => {
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(currentUrl);
    alert("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen py-24 bg-gradient-to-b from-blue-50 to-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => router.push("/findtalents")}
          className="text-blue-600 cursor-pointer font-medium mb-8 flex items-center gap-2 hover:text-blue-800 transition-colors"
        >
          <span className="text-lg">←</span> Back to Find Tutors
        </button>

        {/* Main Layout: Two Columns */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Tutor Details */}
          <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover-scale fade-in">
            {/* Tutor Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start mb-8">
              <div className="flex items-center gap-6">
                <img
                  src={tutor.image}
                  alt={tutor.name}
                  className="w-20 h-20 rounded-full object-cover border-4 border-blue-100 shadow-sm"
                />
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {tutor.name}
                  </h1>
                  <p className="text-sm text-gray-600 mt-2 italic">
                    {tutor.experience}
                  </p>
                </div>
              </div>
              <div className="text-right mt-4 sm:mt-0">
                <p className="text-2xl font-semibold text-blue-600">
                  {tutor.rate}/hr
                </p>
                <p className="text-sm text-gray-500">Hourly Rate</p>
              </div>
            </div>

            {/* Tutor Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-b border-gray-200 py-6 mb-8">
              <div className="flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-600">Rate</p>
                  <p className="text-base text-gray-900">{tutor.rate}/hr</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Star className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-600">Rating</p>
                  <p className="text-base text-gray-900">{tutor.rating}/5</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Availability
                  </p>
                  <p className="text-base text-gray-900">
                    {tutor.availability}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Total Students
                  </p>
                  <p className="text-base text-gray-900">
                    {tutor.totalStudents}
                  </p>
                </div>
              </div>
            </div>

            {/* Tutor Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                About Me
              </h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {tutor.description}
              </p>
            </div>

            {/* Subjects Taught */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Subjects Taught
              </h2>
              <div className="flex flex-wrap gap-3">
                {tutor.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium hover:bg-blue-200 transition-colors"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Education
              </h2>
              <p className="text-gray-700 text-base">{tutor.education}</p>
            </div>
          </div>

          {/* Right Column: Tutor Information */}
          <div className="lg:w-96 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover-scale fade-in">
            <p className="text-sm text-gray-500 mb-6">
              {getTimeAgo(tutor.createdAt)}
            </p>
            <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg mb-6">
              Contact Tutor
            </button>

            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Tutor Information
            </h2>
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-blue-500" />
                <p className="text-base text-gray-900">{tutor.location}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(tutor.rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                        }`}
                    />
                  ))}
                </div>
                <p className="text-base text-gray-900">
                  {tutor.rating} of {tutor.reviews} reviews
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-500" />
                <p className="text-base text-gray-900">
                  {tutor.totalStudents} students taught
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-500" />
                <p className="text-base text-gray-900">
                  Member since: {tutor.memberSince}
                </p>
              </div>
            </div>

            {/* Share & Bookmark Section */}
            <div className="mt-8 border-t border-gray-200 pt-5">
              <h3 className="text-base font-semibold text-gray-900 mb-4">
                Share & Bookmark
              </h3>
              <div className="flex items-center gap-3 flex-wrap">
                {/* URL Button with Copy Icon */}
                <button
                  onClick={handleCopyLink}
                  className="flex items-center bg-gray-200 text-gray-600 text-sm px-4 py-2 rounded-full hover:bg-gray-300 transition-colors"
                >
                  <span className="truncate max-w-[200px]">
                    {typeof window !== "undefined" ? window.location.href : ""}
                  </span>
                  <span className="ml-3 bg-blue-600 text-white rounded-full p-1.5">
                    <Copy className="h-5 w-5" />
                  </span>
                </button>

                {/* Social Media Icons */}
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-colors">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-blue-400 hover:border-blue-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-blue-700 hover:border-blue-700 transition-colors">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-blue-500 hover:border-blue-500 transition-colors">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-800 transition-colors">
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-red-500 hover:border-red-500 transition-colors">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorDetails;
