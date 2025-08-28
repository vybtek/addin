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

const TutorDetails = () => {
  const router = useRouter();
  const { tutorId } = useParams();
  const [tutor, setTutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch tutor details from API based on tutorId
    const fetchTutorDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://api.vybtek.com/api/users");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Raw API Response:", data); // Debug API response
        if (data && Array.isArray(data)) {
          const tutorName = tutorId?.replace(/-/g, " ").toLowerCase();
          const foundTutor = data.find(
            (teacher) =>
              teacher.name?.toLowerCase() === tutorName &&
              teacher.teacher_profile
          );
          if (foundTutor && foundTutor.teacher_profile) {
            const transformedTutor = {
              name: foundTutor.name || "Unknown user",
              experience: foundTutor.teacher_profile?.experience
                ?.map((exp) => `${exp.job_title} at ${exp.institute_name}`)
                .join(", ") || "No experience found",
              subjects: foundTutor.teacher_profile?.subjects || [],
              rateHourly: `₹${foundTutor.teacher_profile?.charges_hourly || 0}/hr`, // Hourly rate
              rateMonthly: `₹${foundTutor.teacher_profile?.charges_monthly || 0}/mo`, // Monthly rate
              rating: 0, // Add logic to calculate rating if available
              createdAt: "", // Add logic to determine join date
              location: foundTutor.teacher_profile?.city || "Unknown city",
              image: foundTutor.teacher_profile?.profile_photo_url || null,
              description: foundTutor.teacher_profile?.about || "No description found",
              availability:
                foundTutor.teacher_profile?.mode === "both"
                  ? "Flexible"
                  : foundTutor.teacher_profile?.mode || "",
              education: foundTutor.teacher_profile?.education
                ?.map((edu) => `${edu.degree} from ${edu.institution}`)
                .join(", ") || "No education found",
              reviews: 0, // Add logic if reviews are available
              totalStudents: 0, // Add logic if total students are available
              memberSince: "", // Add logic to determine member since
              preferredClasses: foundTutor.teacher_profile?.preferred_classes || [],
            };
            setTutor(transformedTutor);
          } else {
            setTutor(null);
          }
        } else {
          setTutor(null);
          console.warn("No valid data array returned from API");
        }
      } catch (error) {
        console.error("Error fetching tutor details:", error);
        setError("Failed to fetch tutor details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchTutorDetails();
  }, [tutorId]);

  // Calculate time difference for "Member since"
  const getTimeAgo = (dateString) => {
    const joinedDate = new Date(dateString || "2021-01-01"); // Fallback date
    const now = new Date("2025-08-04T14:18:00+05:30"); // Current date and time in IST
    const diffInMs = now - joinedDate;
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    return `Joined ${diffInDays} days ago`;
  };

  // Function to handle URL copy to clipboard
  const handleCopyLink = () => {
    const currentUrl =
      typeof window !== "undefined" ? window.location.href : "";
    navigator.clipboard.writeText(currentUrl);
    alert("Link copied to clipboard!");
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

  if (!tutor || error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg font-medium">
          {error || "Tutor not found"}
        </p>
      </div>
    );
  }

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
          <div className="flex-1 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:scale-[1.02] transition-transform duration-300">
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
                  {tutor.rateHourly} | {tutor.rateMonthly}
                </p>
                <p className="text-sm text-gray-500">Hourly | Monthly Rate</p>
              </div>
            </div>

            {/* Tutor Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-b border-gray-200 py-6 mb-8">
              {/* <div className="flex items-center gap-3">
                <DollarSign className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-600">Rate</p>
                  <p className="text-base text-gray-900">
                    {tutor.rateHourly} | {tutor.rateMonthly}
                  </p>
                </div>
              </div> */}
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
                  <p className="text-base text-gray-900">{tutor.availability}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-blue-500" />
                <div>
                  <p className="text-sm font-semibold text-gray-600">
                    Total Students
                  </p>
                  <p className="text-base text-gray-900">{tutor.totalStudents}</p>
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

            {/* Preferred Classes */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Preferred Classes
              </h2>
              <div className="flex flex-wrap gap-3">
                {tutor.preferredClasses.map((className, index) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-green-100 text-green-700 rounded-full text-sm font-medium hover:bg-green-200 transition-colors"
                  >
                    {className}
                  </span>
                ))}
              </div>
            </div>

            {/* Education */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Education
              </h2>
              <p className="text-gray-700 text-base">{tutor.education}</p>
            </div>

            {/* Teaching Experience */}
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-3">
                Teaching Experience
              </h2>
              <p className="text-gray-700 text-base">{tutor.experience}</p>
            </div>
          </div>

          {/* Right Column: Tutor Information */}
          <div className="lg:w-96 bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:scale-[1.02] transition-transform duration-300">
            <p className="text-sm text-gray-500 mb-6">{getTimeAgo(tutor.createdAt)}</p>
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