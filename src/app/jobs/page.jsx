"use client";
import React, { useState, useMemo } from "react";
import { Filter } from "lucide-react";
import SearchBar from "../../components/Jobs/SearchBar";
import Filters from "../../components/Jobs/Filters";
import JobCard from "../../components/Jobs/JobCard";
import SortDropdown from "../../components/Jobs/SortDropdown";

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
  },
  {
    id: 2,
    title:
      "Need a Tutor for Class-2 (CBSE) All Subjects | Female | Asian Global | Area: New CG road Chand Kheda, Ahmedabad",
    budget: 3500,
    subjects: ["Math", "Hindi", "English", "EVS"],
    paymentVerified: true,
    applications: 0,
    location: "Udaipur, RAJASTHAN",
    ongoing: true,
    amount: "₹3500.00",
    timeAgo: "2025-05-21T18:21:00Z",
    description:
      "Female Tutor for Class 2 All Subjects. Seeking a dedicated tutor for offline tutoring.",
    category: "Tutoring",
    specialty: ["Mathematics", "English", "Hindi"],
    paymentType: "Fixed",
    experienceLevel: "Beginner",
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
  },
];

const JobsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("Relevance");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    category: "All Categories",
    specialty: "Specialty",
    paymentType: "Payment Type",
    experienceLevel: "Experience Level",
    minBudget: "",
    maxBudget: "",
  });
  const [visibleJobs, setVisibleJobs] = useState(2); // Initially show 2 jobs
  const jobsPerPage = 2; // Load 2 more jobs per click

  const filteredAndSortedJobs = useMemo(() => {
    let filteredJobs = [...jobsData];

    // Apply filters
    if (searchTerm) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filters.category !== "All Categories") {
      filteredJobs = filteredJobs.filter(
        (job) => job.category === filters.category
      );
    }

    if (filters.specialty !== "Specialty") {
      filteredJobs = filteredJobs.filter((job) =>
        job.specialty.includes(filters.specialty)
      );
    }

    if (filters.paymentType !== "Payment Type") {
      filteredJobs = filteredJobs.filter(
        (job) => job.paymentType === filters.paymentType
      );
    }

    if (filters.experienceLevel !== "Experience Level") {
      filteredJobs = filteredJobs.filter(
        (job) => job.experienceLevel === filters.experienceLevel
      );
    }

    if (filters.minBudget) {
      filteredJobs = filteredJobs.filter(
        (job) => job.budget >= parseFloat(filters.minBudget)
      );
    }

    if (filters.maxBudget) {
      filteredJobs = filteredJobs.filter(
        (job) => job.budget <= parseFloat(filters.maxBudget)
      );
    }

    // Apply sorting
    if (sortBy === "Newest") {
      filteredJobs.sort((a, b) => new Date(b.timeAgo) - new Date(a.timeAgo));
    } else if (sortBy === "Oldest") {
      filteredJobs.sort((a, b) => new Date(a.timeAgo) - new Date(b.timeAgo));
    } else {
      // Relevance: prioritize by applications and budget
      filteredJobs.sort(
        (a, b) => b.applications - a.applications || b.budget - a.budget
      );
    }

    return filteredJobs;
  }, [searchTerm, sortBy, filters]);

  const handleLoadMore = () => {
    setVisibleJobs((prev) => prev + jobsPerPage);
  };

  const displayedJobs = filteredAndSortedJobs.slice(0, visibleJobs);
  const hasMoreJobs = visibleJobs < filteredAndSortedJobs.length;

  return (
    <div className="min-h-screen bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Requirements
          </h1>
          <p className="text-gray-600 mb-6">
            {filteredAndSortedJobs.length} jobs found
          </p>

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-sky-400 text-white px-6 py-3 cursor-pointer rounded-lg hover:bg-sky-500 transition-colors flex items-center gap-2 lg:w-auto w-full justify-center"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          </div>

          {showFilters && <Filters filters={filters} setFilters={setFilters} />}
        </div>

        <div className="space-y-4">
          {displayedJobs.length > 0 ? (
            displayedJobs.map((job) => <JobCard key={job.id} job={job} />)
          ) : (
            <div className="text-center text-gray-600 py-8">
              <p className="text-lg font-medium">No jobs found</p>
              <p className="text-sm">Try adjusting your filters or search term.</p>
            </div>
          )}
        </div>

        {filteredAndSortedJobs.length > 0 && (
          <div className="text-center mt-8">
            {hasMoreJobs ? (
              <button
                onClick={handleLoadMore}
                className="bg-gray-200 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Load More Jobs
              </button>
            ) : (
              <p className="text-gray-600 text-sm">No more jobs to load</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;