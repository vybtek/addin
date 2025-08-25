// src/hooks/useFetchJobs.js
import { useState, useEffect } from "react";

const useFetchJobs = (url) => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        setLoading(true);
        const response = await fetch(url);
        console.log("API Response Status:", response.status);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
        const data = await response.json();
        console.log("Raw API Response:", data);

        if (data.success && data.data) {
          const transformJobs = (jobData) => {
            return (Array.isArray(jobData) ? jobData : [jobData]).map((job) => ({
              id: job.id || crypto.randomUUID(),
              title: job.title || "Untitled Job",
              description: job.description || "No description available",
              category: job.category || "Uncategorized",
              specialty: job.specialties?.map((spec) => spec.specialty).filter(Boolean) || job.specialty?.split(", ").filter(Boolean) || [],
              subjects: job.subjects?.map((sub) => sub.subject).filter(Boolean) || [],
              experienceLevel: job.experience_level || "N/A",
              paymentType: job.payment_type || "N/A",
              budget: job.budget ? parseFloat(job.budget) : 0,
              amount: job.budget ? `₹${job.budget}.00` : "N/A",
              applications: job.applications || 0,
              created_at: job.created_at || new Date().toISOString(),
              location: job.address || job.state || "N/A",
              client: {
                name: job.user?.name || "Unknown",
                memberSince: job.created_at ? new Date(job.created_at).toLocaleDateString("en-US", { month: "short", day: "2-digit", year: "numeric" }) : "N/A",
              },
            }));
          };

          setJobs(transformJobs(data.data));
        } else {
          setJobs([]);
          console.warn("API did not return a valid success object or data");
        }
      } catch (error) {
        console.error("Error fetching jobs:", error.message);
        setError("Failed to load jobs. Please try again later.");
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [url]);

  return { jobs, loading, error };
};

export default useFetchJobs;