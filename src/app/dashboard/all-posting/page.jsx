"use client";

import { useEffect, useState } from "react";
import { FaRegClock, FaInfoCircle, FaEdit } from "react-icons/fa";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // for debugging

  useEffect(() => {
    const API_URL = "https://api.vybtek.com/api/job-posts";

    const fetchProjects = async () => {
      try {
        const res = await fetch(API_URL, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        console.log("API Response:", data);

        // Handle different response structures
        if (Array.isArray(data)) {
          setProjects(data);
        } else if (Array.isArray(data.data)) {
          setProjects(data.data);
        } else if (Array.isArray(data.jobs)) {
          setProjects(data.jobs);
        } else {
          setProjects([]);
          setError("Unexpected API response format");
        }
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message || "Failed to fetch projects");
        setProjects([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="p-2 bg-gray-50 min-h-screen pt-10">
      <div className="bg-white rounded-lg shadow p-4">
        <h1 className="text-xl font-semibold mb-4">My Posted Projects</h1>

        {loading ? (
          <p className="text-gray-600">Loading...</p>
        ) : error ? (
          <p className="text-red-500">⚠️ {error}</p>
        ) : projects.length === 0 ? (
          <p className="text-gray-500">No projects found.</p>
        ) : (
          projects.map((project) => (
            <div
              key={project.id}
              className="border-t first:border-t-0 border-gray-200 py-4 flex flex-col md:flex-row md:justify-between md:items-center gap-4"
            >
              {/* Left Section */}
              <div>
                <div className="text-gray-800 font-medium">{project.title}</div>
                <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-sm font-medium inline-block mt-1">
                  {project.status || "N/A"}
                </span>

                <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FaRegClock /> Posted {project.posted || "N/A"}
                  </span>
                  <span className="flex items-center gap-1">
                    <FaInfoCircle /> Public - Open
                  </span>
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <div className="font-semibold">{project.bids ?? 0}</div>
                  <div className="text-xs text-gray-500">Bids</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{project.messages ?? 0}</div>
                  <div className="text-xs text-gray-500">Messages</div>
                </div>
                <div className="text-center">
                  <div className="font-semibold">{project.hired ?? 0}</div>
                  <div className="text-xs text-gray-500">Hired</div>
                </div>

                <button className="relative bg-sky-400 text-white px-4 py-1 rounded-full hover:bg-sky-500 transition">
                  Applications
                  <span className="absolute top-0 right-0 -mt-2 -mr-2 bg-sky-300 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {project.proposals ?? 0}
                  </span>
                </button>

                <button className="bg-gray-500 p-2 rounded-full text-white hover:bg-gray-600">
                  <FaEdit />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
