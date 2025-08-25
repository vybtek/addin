"use client";
import React, { useState, useEffect } from "react";
import { CiCreditCard1 } from "react-icons/ci";
import { FaEye, FaTrash } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Favorites() {
  const router = useRouter();
  const [favoriteItems, setFavoriteItems] = useState([]);
  const [snackbar, setSnackbar] = useState({ visible: true, message: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userRole, setUserRole] = useState(null);

  // Fetch user role and favorite items
  useEffect(() => {
    const fetchFavorites = async () => {
      const token = localStorage.getItem("authToken");
      const role = localStorage.getItem("userType");
      console.log("Auth Token:", token, "User Role:", role); // Log for debugging
      setUserRole(role);

      if (!token || !role) {
        setSnackbar({
          visible: true,
          message: "Please log in to view favorites.",
        });
        setLoading(false);
        setTimeout(() => router.push("/login"), 2000);
        return;
      }

      if (role !== "Tutor" && role !== "Parent") {
        setError("Invalid user role.");
        setLoading(false);
        return;
      }

      try {
        const endpoint =
          role === "Tutor"
            ? "https://api.vybtek.com/api/job-post-favorites"
            : "https://api.vybtek.com/api/teachers/favorites";
        const response = await fetch(endpoint, {
          method: "GET",
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("API Response Status:", response.status); // Log status
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("API Response Data:", data); // Log full response

        // Check if data.data is an array
        if (Array.isArray(data.data)) {
          setFavoriteItems(data.data);
        } else {
          throw new Error("Invalid response format: Expected data array.");
        }
      } catch (error) {
        console.error("Error fetching favorite items:", error.message);
        setError(
          error.message || "Failed to fetch favorite items. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [router]);

  // Remove from favorites
  const removeFromFavorites = async (itemId) => {
    const token = localStorage.getItem("authToken");
    const role = localStorage.getItem("userType");
    console.log(
      "Removing item ID:",
      itemId,
      "with token:",
      token,
      "role:",
      role
    ); // Log for debugging
    if (!token || !role) {
      setSnackbar({
        visible: true,
        message: "Please log in to remove from favorites.",
      });
      setTimeout(() => router.push("/login"), 2000);
      return;
    }

    try {
      const endpoint =
        role === "Tutor"
          ? `https://api.vybtek.com/api/job-post-favorites/${itemId}`
          : `https://api.vybtek.com/api/teachers/${itemId}/favorites`;
      const response = await fetch(endpoint, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Remove Favorite Response:", data);

      if (data.success) {
        setFavoriteItems(
          favoriteItems.filter((item) =>
            role === "Tutor"
              ? item.job_post.id !== itemId
              : item.teacher_id !== itemId
          )
        );
        setSnackbar({ visible: true, message: "Item removed from favorites!" });
      } else {
        throw new Error(
          data.message || "Failed to remove item from favorites."
        );
      }
    } catch (error) {
      console.error("Error removing item from favorites:", error.message);
      setSnackbar({
        visible: true,
        message:
          error.message ||
          "Failed to remove item from favorites. Please try again.",
      });
    }
  };

  // Helper function to format budget
  const formatBudget = (budget) => {
    if (budget === null || budget === undefined) return "N/A";
    const num = Number(budget);
    return isNaN(num) ? "N/A" : `₹${num.toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6 flex items-center">
          <span className="mr-2">
            <CiCreditCard1 className="text-3xl" />
          </span>{" "}
          My Favorite {userRole === "Tutor" ? "Projects" : "Teachers"}
        </h1>

        {loading && (
          <div className="text-center text-gray-600 py-8">
            <p className="text-lg font-medium">Loading favorite items...</p>
          </div>
        )}
        {error && (
          <div className="text-center text-red-600 py-8">
            <p className="text-lg font-medium">{error}</p>
            <button
              onClick={() => {
                setLoading(true);
                setError(null);
                fetchFavorites(); // Retry fetching
              }}
              className="mt-4 bg-sky-400 text-white px-6 py-2 rounded-lg hover:bg-sky-500 transition-colors"
            >
              Retry
            </button>
          </div>
        )}
        {!loading && !error && favoriteItems.length > 0 ? (
          <div className="space-y-4">
            {favoriteItems.map((item) => (
              <div
                key={item.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4 flex justify-between items-start hover:shadow-lg transition-shadow duration-200"
              >
                <div>
                  <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                    {userRole === "Tutor"
                      ? item.job_post.title
                      : item.teacher_details?.name || "N/A"}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    {userRole === "Tutor"
                      ? item.job_post.description
                      : item.teacher_details?.description ||
                        "No description available"}
                  </p>
                  <div className="mt-2 flex items-center space-x-4 text-sm">
                    <span className="text-green-600 font-medium">
                      {userRole === "Tutor" ? "Fixed Price" : "Rate"}:{" "}
                      {formatBudget(
                        userRole === "Tutor"
                          ? item.job_post.budget
                          : item.teacher_details?.budget
                      )}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      Category:{" "}
                      {userRole === "Tutor"
                        ? item.job_post.category
                        : item.teacher_details?.category || "N/A"}
                    </span>
                    <span className="text-gray-500 dark:text-gray-400">
                      Posted:{" "}
                      {userRole === "Tutor"
                        ? item.job_post.created_at
                          ? new Date(
                              item.job_post.created_at
                            ).toLocaleDateString()
                          : "N/A"
                        : item.teacher_details?.created_at
                        ? new Date(
                            item.teacher_details.created_at
                          ).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button
                    className="p-2 rounded-full cursor-pointer text-blue-500 hover:bg-blue-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    aria-label="View"
                    onClick={() =>
                      router.push(
                        userRole === "Tutor"
                          ? `/jobs/${item.job_post.id}`
                          : `/teachers/${item.teacher_id}`
                      )
                    }
                  >
                    <FaEye size={18} />
                  </button>
                  <button
                    className="p-2 rounded-full cursor-pointer text-red-500 hover:bg-red-100 dark:hover:bg-gray-700 transition-colors duration-200"
                    aria-label="Remove from favorites"
                    onClick={() =>
                      removeFromFavorites(
                        userRole === "Tutor"
                          ? item.job_post.id
                          : item.teacher_id
                      )
                    }
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          !loading &&
          !error && (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No favorite {userRole === "Tutor" ? "projects" : "teachers"}{" "}
              found.
            </p>
          )
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
}
