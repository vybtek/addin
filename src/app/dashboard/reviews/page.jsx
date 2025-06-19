"use client";
import { Star } from "lucide-react";

const Reviews = () => {
  // Dummy data
  const reviews = [
    {
      id: 1,
      reviewer: "Priya Sharma",
      rating: 5,
      date: "May 15, 2025",
      comment:
        "Arpit was an amazing tutor! He explained complex concepts in a simple way, and I improved my grades significantly. Highly recommend!",
    },
    {
      id: 2,
      reviewer: "Rahul Verma",
      rating: 4,
      date: "April 28, 2025",
      comment:
        "Great experience working with Arpit. He was punctual and knowledgeable, but I wish there were more practice sessions.",
    },
    {
      id: 3,
      reviewer: "Sneha Patel",
      rating: 5,
      date: "April 10, 2025",
      comment:
        "Arpit is a fantastic teacher! Very patient and encouraging. My confidence in the subject has grown so much.",
    },
    {
      id: 4,
      reviewer: "Amit Singh",
      rating: 3,
      date: "March 22, 2025",
      comment:
        "The sessions were good, but I felt they were a bit rushed. Arpit is knowledgeable, though, and I learned a lot.",
    },
  ];

  return (
    <div className="space-y-6 py-16">
      <div className="p-6 rounded-lg border border-gray-100">
        <h3 className="font-semibold text-lg text-gray-800 mb-4">Reviews</h3>
        {reviews.length === 0 ? (
          <p className="text-gray-500 text-sm">No record</p>
        ) : (
          <div className="space-y-6">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="border-b border-gray-200 pb-4 last:border-b-0"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <span className="font-medium text-gray-800 mr-2">
                      {review.reviewer}
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
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
                <p className="text-gray-600 text-sm">{review.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Reviews;
