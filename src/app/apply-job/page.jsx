"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const ApplyJobPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const jobId = searchParams.get("id");
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    paymentType: "Per month",
    proposedAmount: 0,
    additionalDetails: "",
  });

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken || !jobId) {
      setError("Please log in or ensure a job is selected to apply.");
      setLoading(false);
      return;
    }

    const fetchJob = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.vybtek.com/api/job-posts/${jobId}`,
          {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && data.data) {
          const jobData = data.data;
          const budget = parseFloat(jobData.budget) || 0;
          setJob(jobData);
          setFormData({
            paymentType:
              jobData.payment_type === "Per month"
                ? "Per month"
                : "Per class session",
            proposedAmount: budget,
            additionalDetails: "",
          });
        }
      } catch (error) {
        console.error("Error fetching job:", error.message);
        setError(
          "Failed to load job details. Please ensure you are logged in."
        );
      } finally {
        setLoading(false);
      }
    };

    if (jobId) {
      fetchJob();
    }
  }, [jobId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");
    if (!authToken || !jobId) {
      alert(
        "Please log in or ensure a job is selected to submit the application."
      );
      return;
    }

    // Validate JWT token format
    const tokenParts = authToken.split(".");
    if (tokenParts.length !== 3) {
      alert("Invalid authentication token. Please log in again.");
      return;
    }

    let userId;
    try {
      const payload = JSON.parse(atob(tokenParts[1]));
      console.log("Decoded token payload:", payload); // Debug payload
      userId = payload.id || payload.user_id;
      if (!userId) {
        throw new Error("User ID not found in token payload");
      }
    } catch (error) {
      console.error("Error decoding token:", error.message);
      alert("Invalid authentication token. Please log in again.");
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("job_id", jobId);
    formDataToSend.append("user_id", userId);
    formDataToSend.append("payment_type", formData.paymentType);
    formDataToSend.append("proposed_amount", formData.proposedAmount);
    formDataToSend.append("additional_details", formData.additionalDetails);
    try {
      const response = await fetch(
        `https://api.vybtek.com/api/job-applications`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
          body: formDataToSend,
        }
      );
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response error:", errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      if (data.success) {
        alert(data.message || "Application submitted successfully!");
        router.push("/jobs");
      } else {
        alert(
          data.message || "Failed to submit application. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting application:", error.message);
      if (error.message.includes("401")) {
        alert("Authentication failed. Please log in again.");
      } else if (error.message.includes("500")) {
        alert("Server error occurred. Please try again or contact support.");
      } else {
        alert("An error occurred: " + error.message);
      }
    }
  };

  if (loading) return <p className="text-center text-gray-600">Loading...</p>;
  if (error || !job)
    return (
      <p className="text-center text-red-600">{error || "Job not found"}</p>
    );

  return (
    <div className="min-h-screen bg-gray-100 py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => router.back()}
          className="text-sky-600 hover:text-sky-700 font-medium flex items-center gap-2 mb-6 transition-colors duration-200"
        >
          <span className="text-lg">←</span> Back
        </button>
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6 sm:p-8">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
              Application for: {job?.title || "Job Title"}
            </h1>
            <div className="text-right">
              <p className="text-lg font-semibold text-gray-900">
                Budget: ₹{job?.budget || "N/A"}
              </p>
            </div>
          </div>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-md">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Application Details
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Payment Type
                  </label>
                  <select
                    name="paymentType"
                    value={formData.paymentType}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                  >
                    <option value="Per month">Per Monthly</option>
                    <option value="Per class session">Per Class Session</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Proposed Amount (₹)
                  </label>
                  <input
                    type="number"
                    name="proposedAmount"
                    value={formData.proposedAmount}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  Additional Details
                </label>
                <textarea
                  name="additionalDetails"
                  value={formData.additionalDetails}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm p-2"
                  rows="4"
                  placeholder="Add any additional details..."
                />
              </div>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-sky-500 text-white rounded-md hover:bg-sky-600 transition-colors duration-200 font-semibold"
              >
                Apply & Pay
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyJobPage;
