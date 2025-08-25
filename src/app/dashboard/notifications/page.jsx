"use client";

import { useEffect, useState } from "react";
import { formatDistanceToNow, format } from "date-fns";

export default function Notifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = localStorage.getItem("userType");
    const userId = localStorage.getItem("user_id");
    setRole(storedRole || "");

    const fetchNotifications = async () => {
      try {
        let activityUrl = "";

        if (storedRole === "Tutor") {
          activityUrl = "https://api.vybtek.com/api/tutor/activity-feed";
        } else if (storedRole === "Parent") {
          activityUrl = `https://api.vybtek.com/api/job-posts/user/${userId}/applications`;
        }

        if (activityUrl) {
          const res = await fetch(activityUrl);
          const data = await res.json();
          setNotifications(data || []);
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto py-18 max-w-5xl">
        <h1 className="text-3xl font-extrabold text-gray-700 dark:text-white mb-6 tracking-tight">
          Notifications
        </h1>

        <div className="bg-white dark:bg-gray-800 rounded-xl p-6 transition-all duration-300">
          {loading ? (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              Loading notifications...
            </p>
          ) : notifications.length > 0 ? (
            <ul className="space-y-4">
              {notifications.map((item, i) => {
                const applicant = item.applicant || {};
                const job = item.job_post || {};
                const createdAt = item.created_at
                  ? new Date(item.created_at)
                  : null;

                return (
                  <li
                    key={i}
                    className="border-l-4 border-blue-500 bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:bg-blue-50 dark:hover:bg-gray-600 transition-all duration-200 ease-in-out transform hover:-translate-y-0.5"
                  >
                    {/* Profile Image */}
                    <div className="flex items-start gap-4">
                      <div className="w-11 h-11 rounded-full bg-gray-200 overflow-hidden flex-shrink-0">
                        {applicant.profile_image ? (
                          <img
                            src={applicant.profile_image}
                            alt={applicant.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <svg
                            className="w-full h-full text-gray-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v1.2h19.2V19.2c0-3.2-6.4-4.8-9.6-4.8z" />
                          </svg>
                        )}
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <p className="text-gray-900 dark:text-gray-100 font-medium">
                          {applicant.name || "Unknown"}
                        </p>
                        <p
                          className="text-sm text-gray-700 dark:text-gray-300 truncate max-w-[500px]"
                          title={job.title || ""}
                        >
                          You have a new proposal for the project{" "}
                          {job.title || "N/A"}
                        </p>

                        {/* Date & Time */}
                        {createdAt && (
                          <div className="flex items-center text-xs text-gray-500 mt-1 gap-4">
                            <span className="flex items-center gap-1">
                              📅 {format(createdAt, "yyyy-MM-dd HH:mm:ss")}
                            </span>
                            <span className="flex items-center gap-1">
                              ⏱{" "}
                              {formatDistanceToNow(createdAt, {
                                addSuffix: true,
                              })}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 text-center py-8">
              No notifications found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
