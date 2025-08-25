"use client";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";

/**
 * @typedef {object} Review
 * @property {string} _id
 * @property {string} reviewer
 * @property {string} reviewee
 * @property {string} role
 * @property {number} rating
 * @property {string} comment
 * @property {string} createdAt
 */

const Reviews = () => {
  // Initialize state with an empty array, which is crucial.
  const [reviews, setReviews] = useState(/** @type {Review[]} */ ([]));
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://api.vybtek.com/api/reviews");

        if (!response.ok) {
          throw new Error(`Failed to fetch reviews. Status: ${response.status}`);
        }

        const responseData = await response.json();

        const reviewsArray = Array.isArray(responseData) ? responseData : responseData.data;

        if (Array.isArray(reviewsArray)) {
          setReviews(reviewsArray);
        } else {
          // This will be triggered if the API returns an unexpected structure.
          console.error("API did not return a valid array of reviews:", responseData);
          throw new Error("Invalid data format received from the server.");
        }

      } catch (e) {
        console.error("An error occurred while fetching reviews:", e);
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const renderContent = () => {
    if (isLoading) {
      return <p className="text-gray-500 text-sm">Loading reviews...</p>;
    }

    if (error) {
      return <p className="text-red-600 text-sm">Error: {error}</p>;
    }

    if (reviews.length === 0) {
      return <p className="text-gray-500 text-sm">No records found</p>;
    }

    return (
      <div className="space-y-6">
        {reviews.map((review) => (
          <div
            key={review._id}
            className="border-b border-gray-200 pb-4 last:border-b-0"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <span className="font-medium text-gray-800 mr-2">
                  Reviewer ID: {review.reviewer.slice(-6)}
                </span>
                <div className="flex">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      size={16}
                      className={
                        index < review.rating
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }
                    />
                  ))}
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(review.createdAt).toLocaleDateString("en-US", {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            </div>
            <p className="text-gray-600 text-sm">{review.comment}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-6 py-16">
      <div className="p-6 rounded-lg border border-gray-100">
        <h3 className="font-semibold text-lg text-gray-800 mb-4">Reviews</h3>
        {renderContent()}
      </div>
    </div>
  );
};

export default Reviews;