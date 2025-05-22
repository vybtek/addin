import { Clock, DollarSign, Heart, MapPin, Share2 } from "lucide-react";
import { useState, useEffect } from "react";

const JobCard = ({ job }) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Function to format date consistently
  const formatDate = (dateString) => {
    if (!isClient) {
      // Return a placeholder or empty string during SSR
      return "";
    }

    try {
      const date = new Date(dateString);
      // Use a consistent format that won't vary by locale
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
    } catch (error) {
      return "Invalid date";
    }
  };

  return (
    <div className="bg-white rounded-lg hover:scale-101 shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
            {job.title}
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
            <span className="flex items-center gap-1">
              <span className="font-medium">Fixed:</span>
              <span className="font-semibold text-gray-900">
                Expert (₹ ₹ ₹)
              </span>
            </span>
            <span className="flex items-center gap-1">
              <span className="font-medium">Est. budget:</span>
              <span className="font-semibold text-gray-900">{job.amount}</span>
            </span>
          </div>
          {job.description && (
            <p className="text-gray-700 mb-4 leading-relaxed">
              {job.description}
            </p>
          )}
          <div className="flex flex-wrap gap-2 mb-4">
            {job.subjects.map((subject, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
              >
                {subject}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            {job.paymentVerified && (
              <span className="flex items-center gap-1 text-green-600">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                Payment Verified
              </span>
            )}
            <span className="flex items-center gap-1">
              <span>Applications: {job.applications}</span>
            </span>
            <span className="flex items-center gap-1">
              <MapPin className="w-4 h-4" />
              {job.location}
            </span>
            {job.ongoing && (
              <span className="flex items-center gap-1 text-orange-600">
                <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                Ongoing classes
              </span>
            )}
            <span className="flex items-center gap-1">
              <DollarSign className="w-4 h-4" />
              {job.amount}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatDate(job.timeAgo)}
            </span>
          </div>
        </div>
        <div className="flex lg:flex-col gap-2 lg:items-end">
          <button className="bg-sky-400 text-white px-6 py-2 rounded-lg hover:bg-sky-500 transition-colors font-medium">
            Apply Now
          </button>
          <div className="flex gap-2">
            <button className="p-2 text-gray-500 hover:text-red-500 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
            {/* <button className="p-2 text-gray-500 hover:text-blue-500 transition-colors">
              <Share2 className="w-5 h-5" />
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
