"use client";

import { useEffect, useState } from "react";
import StatsCharts from "@/components/dashboard/Home/Chart";
import { formatDistanceToNow, format } from "date-fns";
import Header from "@/components/dashboard/Home/Header";
import Head from "next/head";

const StatsCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex-1 flex items-center border border-gray-100">
    <span className="text-4xl mr-4">{icon}</span>
    <div>
      <h3 className="text-gray-500 text-sm uppercase tracking-wide">{title}</h3>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

const ActivityFeed = ({ data }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
    <h3 className="font-semibold text-lg text-gray-800 mb-4">Activity Feed</h3>
    {data.length > 0 ? (
      <ul className="space-y-3">
        {data.map((item, i) => {
          const applicant = item.applicant || {};
          const job = item.job_post || {};
          const createdAt = item.created_at ? new Date(item.created_at) : null;

          return (
            <li
              key={i}
              className="flex items-start gap-4 p-3 rounded-md hover:bg-gray-50 transition"
            >
              {/* Profile Image */}
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
                <p className="text-sm font-medium text-gray-900">
                  {applicant.name || "Unknown"}
                </p>

                <p
                  className="text-sm text-gray-700 truncate max-w-[500px]"
                  title={job.title || ""}
                >
                  You have a new proposal for the project {job.title || "N/A"}
                </p>

                {/* Date & Time */}
                <div className="flex items-center text-xs text-gray-500 mt-1 gap-4">
                  {createdAt && (
                    <>
                      <span className="flex items-center gap-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-3.5 h-3.5 text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M8 7V3m8 4V3m-9 8h10m-4 4h-6m8 4h-6m10-8V5a2 2 0 00-2-2h-1m-6 0H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V9z"
                          />
                        </svg>
                        {format(createdAt, "yyyy-MM-dd HH:mm:ss")}
                      </span>

                      <span className="flex items-center gap-1">
                        ⏱ {formatDistanceToNow(createdAt, { addSuffix: true })}
                      </span>
                    </>
                  )}
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    ) : (
      <p className="text-gray-500 text-sm">No record found</p>
    )}
  </div>
);

const RecentClasses = ({ data }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <h3 className="font-semibold text-lg text-gray-800 mb-4">Recent Classes</h3>
    {data.length > 0 ? (
      <ul className="space-y-2">
        {data.map((cls, i) => (
          <li key={i} className="text-gray-700 text-sm border-b pb-2">
            {cls.name || cls.title || "Class"} – {cls.date || "N/A"}
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-gray-500 text-sm">No record found</p>
    )}
  </div>
);

export default function Dashboard() {
  const [role, setRole] = useState("");
  const [activityFeed, setActivityFeed] = useState([]);
  const [recentClasses, setRecentClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedRole = localStorage.getItem("userType");
    const userId = localStorage.getItem("user_id");
    setRole(storedRole || "");

    const fetchData = async () => {
      try {
        let activityUrl = "";
        let classesUrl = "";

        if (storedRole === "Tutor") {
          activityUrl = "https://api.vybtek.com/api/tutor/activity-feed"; // Replace with actual endpoint
          classesUrl = "https://api.vybtek.com/api/tutor/recent-classes"; // Replace with actual endpoint
        } else if (storedRole === "Parent") {
          activityUrl = `https://api.vybtek.com/api/job-posts/user/${userId}/applications`; // Replace with actual endpoint
        }

        // Fetch activity feed
        if (activityUrl) {
          const res = await fetch(activityUrl);
          const data = await res.json();
          setActivityFeed(data || []);
        }

        // Fetch recent classes only for tutor
        if (storedRole === "Tutor" && classesUrl) {
          const res = await fetch(classesUrl);
          const data = await res.json();
          setRecentClasses(data || []);
        }
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Dashboard | Tutor Platform</title>
        <meta
          name="description"
          content="Comprehensive dashboard for tutors and parents."
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <main className="flex min-h-screen bg-gray-50">
        <section className="flex-1 py-14">
          <header>
            <h1 className="sr-only">Tutor Platform Dashboard</h1>
          </header>
          <div className="p-2">
            <section
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
              aria-label="Statistics"
            >
              {/* StatsCard */}
            </section>
            <section
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
              aria-label="Main Content"
            >
              <article className="col-span-3">
                <ActivityFeed data={activityFeed} />
                {role === "Tutor" && <RecentClasses data={recentClasses} />}
                <StatsCharts />
              </article>
            </section>
          </div>
        </section>
      </main>
    </>
  );
}
