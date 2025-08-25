"use client";
import React, { useState, useMemo } from "react";
import { Filter } from "lucide-react";
import { useRouter } from "next/navigation";
import SearchBar from "../../components/Jobs/SearchBar";
import Filters from "../../components/Jobs/Filters";
import JobCard from "../../components/Jobs/JobCard";
import SortDropdown from "../../components/Jobs/SortDropdown";
import useFetchJobs from "../../hooks/useFetchJobs";

const JobsPage = () => {
  const router = useRouter();
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
  const [visibleJobs, setVisibleJobs] = useState(2);
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });
  const jobsPerPage = 4;
  const { jobs, loading, error } = useFetchJobs(
    "https://api.vybtek.com/api/job-posts"
  );

  const addToFavorites = async (jobPostId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setSnackbar({
        visible: true,
        message: "Please log in to add to favorites.",
      });
      setTimeout(() => router.push("/login"), 2000);
      return false;
    }

    try {
      const response = await fetch(
        "https://api.vybtek.com/api/job-post-favorites",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            job_post_id: jobPostId,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setSnackbar({ visible: true, message: "Job added to favorites!" });
        return true; // Return success to JobCard
      } else {
        throw new Error(data.message || "Failed to add job to favorites.");
      }
    } catch (error) {
      console.error("Error adding job to favorites:", error);
      setSnackbar({
        visible: true,
        message:
          error.message || "Failed to add job to favorites. Please try again.",
      });
      return false; // Return failure to JobCard
    }
  };

  const filteredAndSortedJobs = useMemo(() => {
    let filteredJobs = [...jobs];

    if (searchTerm) {
      filteredJobs = filteredJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (job.description &&
            job.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    if (filters.category !== "All Categories") {
      filteredJobs = filteredJobs.filter(
        (job) => job.category === filters.category
      );
    }

    if (filters.specialty !== "Specialty") {
      filteredJobs = filteredJobs.filter(
        (job) => job.specialty && job.specialty.includes(filters.specialty)
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

    const now = new Date("2025-08-05T12:00:00Z"); // 05:30 PM IST on August 5, 2025
    if (sortBy === "Newest") {
      filteredJobs.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
    } else if (sortBy === "Oldest") {
      filteredJobs.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
    } else {
      filteredJobs.sort((a, b) => {
        const appDiff = (b.applications || 0) - (a.applications || 0);
        const budgetDiff = (b.budget || 0) - (a.budget || 0);
        return appDiff !== 0 ? appDiff : budgetDiff;
      });
    }

    return filteredJobs;
  }, [searchTerm, sortBy, filters, jobs]);

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
          {loading && <p className="text-gray-600 mb-6">Loading jobs...</p>}
          {error && <p className="text-red-600 mb-6">{error}</p>}
          {!loading && !error && (
            <p className="text-gray-600 mb-6">
              {filteredAndSortedJobs.length} jobs found
            </p>
          )}

          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="bg-sky-400 text-white px-6 py-3 rounded-lg hover:bg-sky-500 transition-colors flex items-center gap-2 lg:w-auto w-full justify-center"
            >
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
          </div>

          {showFilters && <Filters filters={filters} setFilters={setFilters} />}
        </div>

        <div className="space-y-4">
          {loading && (
            <div className="text-center text-gray-600 py-8">
              <p className="text-lg font-medium">Loading jobs...</p>
            </div>
          )}
          {error && (
            <div className="text-center text-red-600 py-8">
              <p className="text-lg font-medium">{error}</p>
            </div>
          )}
          {displayedJobs.length > 0 &&
            !loading &&
            !error &&
            displayedJobs.map((job) => (
              <JobCard key={job.id} job={job} addToFavorites={addToFavorites} />
            ))}
          {!loading && !error && displayedJobs.length === 0 && (
            <div className="text-center text-gray-600 py-8">
              <p className="text-lg font-medium">No jobs found</p>
              <p className="text-sm">
                Try adjusting your filters or search term.
              </p>
            </div>
          )}
        </div>

        {filteredAndSortedJobs.length > 0 && !loading && !error && (
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

        {snackbar.visible && (
          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-red-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center max-w-md mx-4">
            <span>{snackbar.message}</span>
            <button
              onClick={() => setSnackbar({ visible: false, message: "" })}
              className="ml-4 text-white hover:text-blue-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobsPage;
