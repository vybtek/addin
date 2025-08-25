"use client";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  MapPin,
  Clock,
  DollarSign,
  Users,
  Star,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
  Share2,
  Bookmark,
  Copy,
} from "lucide-react";

const JobDetails = () => {
  const router = useRouter();
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.vybtek.com/api/job-posts/${jobId}`
        );
        console.log("API Response Status:", response.status);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Raw API Response:", data);

        if (data.success && data.data) {
          const jobData = data.data;
          const transformedJob = {
            id: jobData.id,
            title: jobData.title || "Untitled Job",
            description: jobData.description || "No description available",
            category: jobData.category || "Uncategorized",
            specialty:
              jobData.specialties?.map((spec) => spec.specialty) ||
              jobData.specialty?.split(", ").filter(Boolean) ||
              [],
            subjects: jobData.subjects
              ? jobData.subjects.map((subject) =>
                  subject.subject_name ? subject.subject_name : subject
                )
              : [],
            experienceLevel: jobData.experience_level || "N/A",
            paymentType: jobData.payment_type || "N/A",
            budget: jobData.budget ? parseFloat(jobData.budget) : 0,
            amount: jobData.budget ? `₹${jobData.budget}.00` : "N/A",
            applications: jobData.applications || 0,
            created_at: jobData.created_at || new Date().toISOString(),
            total_students_required: jobData.total_students_required || 1,
            address: jobData.address || "",
            state: jobData.state || "",
            user: jobData.user || {},
            client: {
              name: jobData.user?.name || "N/A",
              memberSince: jobData.created_at
                ? new Date(jobData.created_at).toLocaleDateString("en-US", {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  })
                : "N/A",
            },
          };
          setJob(transformedJob);
        } else {
          setJob(null);
          console.warn("API did not return a valid success object or data");
        }
      } catch (error) {
        console.error("Error fetching job:", error.message);
        setError("Failed to load job details. Please try again later.");
        setJob(null);
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const getTimeAgo = (dateString) => {
    const postedDate = new Date(dateString);
    const now = new Date("2025-08-06T08:45:00Z"); // Adjusted to 02:15 PM IST
    const diffInMs = now - postedDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    return `Posted about ${diffInHours} hours ago`;
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(`https://www.addinsedu.com/p/class/${jobId}`);
    alert("Link copied to clipboard!");
  };

  const handleApplyJob = () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert('Please log in to apply for the job.');
      return;
    }
    router.push(`/apply-job?id=${jobId}`); // Use string URL with query parameter
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg font-medium animate-pulse">
          Loading...
        </p>
      </div>
    );
  }

  if (error || !job) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600 text-lg font-medium">
          {error || "Job not found"}
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/jobs")}
          className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-2 mb-8 transition-colors duration-200"
        >
          <span className="text-lg">←</span> Back to Job Listings
        </button>

        {/* Main Layout: Two Columns */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Job Details */}
          <div className="flex-1 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            {/* Job Title and Budget */}
            <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-8">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">
                  {job.title}
                </h1>
                <p className="text-sm text-gray-500 mt-2">
                  {job.category} - {job.specialty.join(", ") || "N/A"}
                </p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold text-gray-900">
                  {job.amount}
                </p>
                <p className="text-sm text-gray-500">Fixed Budget</p>
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-b border-gray-200 py-6 mb-8">
              <div className="flex items-start gap-3">
                <DollarSign className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Payment Type</p>
                  <p className="text-sm text-gray-900 font-medium">
                    {job.paymentType}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Experience Level</p>
                  <p className="text-sm text-gray-900 font-medium">
                    {job.experienceLevel}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Job Type</p>
                  <p className="text-sm text-gray-900 font-medium">One-time</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Users className="w-5 h-5 text-gray-500 mt-1" />
                <div>
                  <p className="text-sm font-medium text-gray-600">No. of Tutors</p>
                  <p className="text-sm text-gray-900 font-medium">
                    {job.total_students_required}
                  </p>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Job Description</h2>
              <p className="text-gray-700 leading-relaxed text-base">
                {job.description}
              </p>
            </div>

            {/* Skills Required */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-3">Skills Required</h2>
              <div className="flex flex-wrap gap-2">
                {job.subjects.length > 0 ? (
                  job.subjects.map((subject, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium"
                    >
                      {subject}
                    </span>
                  ))
                ) : job.specialty.length > 0 ? (
                  job.specialty.map((spec, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium"
                    >
                      {spec}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-600 text-sm">No skills specified</p>
                )}
              </div>
            </div>

            {/* Applications, Invites, Interviews, Hires */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-gray-200 pt-6">
              <div>
                <p className="text-sm font-medium text-gray-600">Applications</p>
                <p className="text-sm text-gray-900 font-medium">
                  {job.applications}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Invites</p>
                <p className="text-sm text-gray-900 font-medium">2</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Interviews</p>
                <p className="text-sm text-gray-900 font-medium">0</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Hires</p>
                <p className="text-sm text-gray-900 font-medium">0</p>
              </div>
            </div>
          </div>

          {/* Right Column: Client Information */}
          <div className="lg:w-96 bg-white rounded-xl shadow-sm border border-gray-200 p-6 sm:p-8">
            <p className="text-sm text-gray-500 mb-6">{getTimeAgo(job.created_at)}</p>
            <button
              onClick={handleApplyJob}
              className="w-full bg-sky-500 text-white px-6 py-3 rounded-lg hover:bg-sky-600 transition-colors duration-200 font-semibold text-base"
            >
              Apply Now
            </button>

            <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Client Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-900 font-medium">{job.client.name}</p>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-900 font-medium">{job.state || job.address}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 text-green-500 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <p className="text-sm text-gray-900 font-medium">Payment method verified</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 0 ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-900 font-medium">0 of 0 reviews</p>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-900 font-medium">0 total jobs posted</p>
              </div>
              <div className="flex items-center gap-3">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-900 font-medium">N/A total spent</p>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-900 font-medium">
                  Member since: {job.client.memberSince}
                </p>
              </div>
            </div>

            {/* Share & Bookmark Section */}
            <div className="mt-8 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Share & Bookmark</h3>
              <div className="flex items-center gap-3 flex-wrap">
                <button className="flex items-center bg-gray-100 text-gray-600 text-sm px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                  <span className="truncate max-w-[200px]">
                    https://www.addinsedu.com/p/class/{jobId}
                  </span>
                  <span
                    onClick={handleCopyLink}
                    className="ml-2 cursor-pointer bg-sky-500 text-white rounded-full p-1.5 hover:bg-sky-600 transition-colors duration-200"
                  >
                    <Copy className="w-4 h-4" />
                  </span>
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-colors duration-200">
                  <Facebook className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-blue-400 hover:border-blue-400 transition-colors duration-200">
                  <Twitter className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-blue-700 hover:border-blue-700 transition-colors duration-200">
                  <Linkedin className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-sky-500 hover:border-sky-500 transition-colors duration-200">
                  <Share2 className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-800 transition-colors duration-200">
                  <Bookmark className="w-5 h-5" />
                </button>
                <button className="w-10 h-10 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-red-500 hover:border-red-500 transition-colors duration-200">
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

export default JobDetails;