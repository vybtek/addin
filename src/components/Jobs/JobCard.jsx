"use client";
import { Clock, DollarSign, Heart, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const JobCard = ({ job, addToFavorites }) => {
  const [isClient, setIsClient] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
    const fetchFavoriteStatus = async () => {
      const token = localStorage.getItem("authToken");
      if (token) {
        try {
          const response = await fetch("https://api.vybtek.com/api/job-post-favorites", {
            headers: { "Authorization": `Bearer ${token}` },
          });
          const data = await response.json();
          if (data.success && Array.isArray(data.favorites)) {
            setIsFavorited(data.favorites.includes(job.id));
          } else {
            console.log("GET API response:", data); // Debug response
          }
        } catch (error) {
          console.error("Error fetching favorite status:", error);
        }
      }
    };
    fetchFavoriteStatus();
  }, [job.id]);

  const formatDate = (dateString) => {
    if (!isClient) return "";
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  const handleCardClick = () => {
    router.push(`/jobs/${job.id}`);
  };

  const handleButtonClick = (e) => {
    e.stopPropagation(); // Prevent card click from triggering
    router.push(`/jobs/${job.id}`);
  };

  const getFavorites = async () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const response = await fetch("https://api.vybtek.com/api/job-post-favorites", {
          headers: { "Authorization": `Bearer ${token}` },
        });
        const data = await response.json();
        if (data.success && Array.isArray(data.favorites)) {
          return data.favorites.includes(job.id);
        }
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    }
    return false;
  };

  const removeFromFavorites = async (jobPostId) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const response = await fetch(`https://api.vybtek.com/api/job-post-favorites/${jobPostId}`, {
          method: "DELETE",
          headers: {
            "Accept": "*/*",
            "Authorization": `Bearer ${token}`,
          },
        });
        const data = await response.json();
        return data.success;
      } catch (error) {
        console.error("Error removing from favorites:", error);
        return false;
      }
    }
    return false;
  };

  const handleHeartClick = async (e) => {
    e.stopPropagation(); // Prevent card click from triggering
    if (isFavorited) {
      const success = await removeFromFavorites(job.id);
      if (success) setIsFavorited(false);
    } else {
      const success = await addToFavorites(job.id);
      if (success) setIsFavorited(true);
    }
  };

  return (
    <div
      onClick={handleCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleCardClick()}
      className="text-left bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer focus:outline-none focus:ring-2 focus:ring-sky-500"
    >
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
        <div className="flex-1 space-y-4">
          <h3 className="text-xl font-bold text-gray-900 leading-tight">
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-2 bg-sky-50 px-3 py-1 rounded-full">
              <span className="font-medium text-sky-700">Level:</span>
              <span className="font-semibold text-sky-800">
                {job.experienceLevel}
              </span>
            </span>
            <span className="flex items-center gap-2 bg-green-50 px-3 py-1 rounded-full">
              <span className="font-medium text-green-700">Budget:</span>
              <span className="font-semibold text-green-800">{job.amount}</span>
            </span>
          </div>
          {job.description && (
            <p className="text-gray-600 text-base leading-relaxed line-clamp-3">
              {job.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {job.subjects.map((subject, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-sky-100 text-sky-700 rounded-full text-sm font-medium"
              >
                {subject}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            {job.paymentVerified && (
              <span className="flex items-center gap-2 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Payment Verified
              </span>
            )}
            <span className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              {job.location}
            </span>
            {job.ongoing && (
              <span className="flex items-center gap-2 text-orange-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Ongoing
              </span>
            )}
            <span className="flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-gray-400" />
              {job.amount}
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" />
              {formatDate(job.timeAgo)}
            </span>
            <span className="flex items-center gap-2">
              <span className="text-gray-500">
                Applications: {job.applications}
              </span>
            </span>
          </div>
        </div>
        <div className="flex lg:flex-col items-center lg:items-end gap-4">
          <button
            onClick={handleButtonClick}
            className="w-full lg:w-auto cursor-pointer bg-sky-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-sky-700 transition-colors duration-200"
          >
            Apply Now
          </button>
          <button
            onClick={handleHeartClick}
            className={`p-2 cursor-pointer transition-colors duration-200 ${
              isFavorited ? "text-red-500" : "text-gray-400 hover:text-red-500"
            }`}
            aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
          >
            <Heart className="w-5 h-5" fill={isFavorited ? "currentColor" : "none"} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;