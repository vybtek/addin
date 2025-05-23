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

const jobsData = [
  {
    id: 1,
    title:
      "Need a Tutor for Class-10 (CBSE) | Math & Science | Female | DPS | Area: Ashirwad Nagar, Shobhagpura, Udaipur",
    budget: 4000,
    subjects: ["Math", "Science"],
    paymentVerified: true,
    applications: 9,
    location: "Udaipur, RAJASTHAN",
    ongoing: true,
    amount: "₹4000.00",
    timeAgo: "2025-05-21T08:21:00Z",
    description:
      "Female Tutor for Class 10 Math & Science. Seeking a dedicated and qualified tutor for offline tutoring.",
    category: "Tutoring",
    specialty: ["Mathematics", "Science"],
    paymentType: "Fixed",
    experienceLevel: "Intermediate",
    client: {
      name: "Add-ins Tutor",
      rating: 5.0,
      reviews: 72,
      totalJobsPosted: 567,
      totalSpend: "₹14250.00",
      memberSince: "Apr 23, 2023",
    },
  },
  {
    id: 2,
    title:
      "Need a Tutor for Class-2 (CBSE) All Subjects | Male/Female | NA | Area: Sector 4, Udaipur",
    budget: 3500,
    subjects: ["Math", "Hindi", "English", "EVS"],
    paymentVerified: true,
    applications: 2,
    location: "Udaipur, RAJASTHAN",
    ongoing: true,
    amount: "₹3500.00",
    timeAgo: "2025-05-21T18:21:00Z",
    description:
      "Tutor for Class 2 All Subjects. Seeking a dedicated tutor for offline tutoring.",
    category: "Tutoring",
    specialty: ["Mathematics", "English", "Hindi"],
    paymentType: "Per Month",
    experienceLevel: "Beginner",
    client: {
      name: "Add-ins Tutor",
      rating: 5.0,
      reviews: 72,
      totalJobsPosted: 567,
      totalSpend: "₹14250.00",
      memberSince: "Apr 23, 2023",
    },
  },
  {
    id: 3,
    title:
      "Need a Tutor for Class-6 (CBSE) All Subjects | Female | MMPS | Area: Sector 4, Udaipur",
    budget: 3000,
    subjects: ["English", "Hindi", "Math", "EVS"],
    paymentVerified: true,
    applications: 0,
    location: "Udaipur, RAJASTHAN",
    ongoing: true,
    amount: "₹3000.00",
    timeAgo: "2025-05-21T16:21:00Z",
    description:
      "Female Tutor for Class 6 All Subjects. Seeking a dedicated tutor for offline tutoring.",
    category: "Tutoring",
    specialty: ["Mathematics", "English", "Hindi"],
    paymentType: "Fixed",
    experienceLevel: "Beginner",
    client: {
      name: "Add-ins Tutor",
      rating: 5.0,
      reviews: 72,
      totalJobsPosted: 567,
      totalSpend: "₹14250.00",
      memberSince: "Apr 23, 2023",
    },
  },
  {
    id: 4,
    title:
      "Need a Tutor for Class-9 (CBSE) Science & Math | Male | MMPS | Area: Sector 4, Udaipur",
    budget: 4500,
    subjects: ["Math", "Science"],
    paymentVerified: true,
    applications: 1,
    location: "Udaipur, RAJASTHAN",
    ongoing: true,
    amount: "₹4500.00",
    timeAgo: "2025-05-21T16:21:00Z",
    description:
      "Male Tutor for Class 9 Science & Math. Seeking a dedicated tutor for offline tutoring.",
    category: "Tutoring",
    specialty: ["Mathematics", "Science"],
    paymentType: "Fixed",
    experienceLevel: "Intermediate",
    client: {
      name: "Add-ins Tutor",
      rating: 5.0,
      reviews: 72,
      totalJobsPosted: 567,
      totalSpend: "₹14250.00",
      memberSince: "Apr 23, 2023",
    },
  },
];

const JobDetails = () => {
  const router = useRouter();
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundJob = jobsData.find((job) => job.id === parseInt(jobId));
    setJob(foundJob);
    setLoading(false);
  }, [jobId]);

  // Calculate time difference for "Posted X ago"
  const getTimeAgo = (dateString) => {
    const postedDate = new Date(dateString);
    const now = new Date("2025-05-23T14:33:00+05:30"); // Current date and time in IST
    const diffInMs = now - postedDate;
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    return `Posted about ${diffInHours} hours ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-gray-600">Job not found</p>
      </div>
    );
  }

  // Function to handle URL copy to clipboard
  const handleCopyLink = () => {
    navigator.clipboard.writeText("https://www.addinsedu.com/p/clas");
    alert("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-gray-50 py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() => router.push("/jobs")}
          className="text-sky-500 cursor-pointer mb-6 flex items-center gap-1"
        >
          <span>←</span> Back to Job Listings
        </button>

        {/* Main Layout: Two Columns */}
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            {/* Job Title and Budget */}
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {job.title}
                </h1>
                <p className="text-sm text-gray-500 mt-1">
                  {job.category} - {job.specialty.join(", ")}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-semibold text-gray-900">
                  {job.amount}
                </p>
                <p className="text-sm text-gray-500">Fixed Budget</p>
              </div>
            </div>

            {/* Job Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-b border-gray-200 py-4 mb-6">
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Payment Type
                  </p>
                  <p className="text-sm text-gray-900">{job.paymentType}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Experience Level
                  </p>
                  <p className="text-sm text-gray-900">{job.experienceLevel}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">Job Type</p>
                  <p className="text-sm text-gray-900">
                    {job.ongoing ? "Ongoing classes" : "One-time"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    No. of Tutors
                  </p>
                  <p className="text-sm text-gray-900">1</p>
                </div>
              </div>
            </div>

            {/* Job Description */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Job Description
              </h2>
              <p className="text-gray-700 leading-relaxed">{job.description}</p>
            </div>

            {/* Skills Required */}
            <div className="mb-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Skills Required
              </h2>
              <div className="flex flex-wrap gap-2">
                {job.subjects.map((subject, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            {/* Applications, Invites, Interviews, Hires */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-gray-200 pt-4">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Applications
                </p>
                <p className="text-sm text-gray-900">{job.applications}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Invites</p>
                <p className="text-sm text-gray-900">2</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Interviews</p>
                <p className="text-sm text-gray-900">0</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Hires</p>
                <p className="text-sm text-gray-900">0</p>
              </div>
            </div>
          </div>

          {/* Right Column: Client Information */}
          <div className="lg:w-80 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <p className="text-sm text-gray-500 mb-4">
              {getTimeAgo(job.timeAgo)}
            </p>
            <button className="w-full cursor-pointer bg-sky-400 text-white px-6 py-2 rounded-lg hover:bg-sky-500 transition-colors font-medium mb-6">
              Apply Now
            </button>

            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Client Information
            </h2>
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-900">{job.client.name}</p>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-900">{job.location}</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 text-green-500 flex items-center">
                  <span className="w-3 h-3 bg-green-500 rounded-full"></span>
                </div>
                <p className="text-sm text-gray-900">Payment method verified</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-900">
                  {job.client.rating} of {job.client.reviews} reviews
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-900">
                  {job.client.totalJobsPosted} total jobs posted
                </p>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-900">
                  {job.client.totalSpend} total spent
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-gray-500" />
                <p className="text-sm text-gray-900">
                  Member since: {job.client.memberSince}
                </p>
              </div>
            </div>

            {/* Share & Bookmark Section */}
            <div className="mt-6 border-t border-gray-200 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">
                Share & Bookmark
              </h3>
              <div className="flex items-center gap-2 flex-wrap">
                {/* URL Button with Copy Icon */}
                <button className="flex items-center bg-gray-100 text-gray-600 text-sm px-3 py-1 rounded-full hover:bg-gray-200 transition-colors">
                  <span className="truncate max-w-[200px]">
                    https://www.addinsedu.com/p/class
                  </span>
                  <span
                    onClick={handleCopyLink}
                    className="ml-2 cursor-pointer bg-sky-400 text-white rounded-full p-1"
                  >
                    <Copy className="w-4 h-4" />
                  </span>
                </button>
                {/* Social Media Icons */}
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-blue-600 hover:border-blue-600 transition-colors">
                  <Facebook className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-blue-400 hover:border-blue-400 transition-colors">
                  <Twitter className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-blue-700 hover:border-blue-700 transition-colors">
                  <Linkedin className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-sky-500 hover:border-sky-500 transition-colors">
                  <Share2 className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-gray-800 hover:border-gray-800 transition-colors">
                  <Bookmark className="w-4 h-4" />
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full border border-gray-300 text-gray-600 hover:text-red-500 hover:border-red-500 transition-colors">
                  <Heart className="w-4 h-4" />
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
