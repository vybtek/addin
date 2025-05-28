"use client";

import StatsCharts from "@/components/dashboard/Home/Chart";
import Header from "@/components/dashboard/Home/Header";

// components/StatsCard.jsx
const StatsCard = ({ icon, title, value }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex-1 flex items-center border border-gray-100">
    <span className="text-4xl mr-4">{icon}</span>
    <div>
      <h3 className="text-gray-500 text-sm uppercase tracking-wide">{title}</h3>
      <p className="text-xl font-semibold text-gray-800">{value}</p>
    </div>
  </div>
);

// components/ActivityFeed.jsx
const ActivityFeed = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-6">
    <h3 className="font-semibold text-lg text-gray-800 mb-4">Activity Feed</h3>
    <p className="text-gray-500 text-sm">No record found</p>
  </div>
);

// components/RecentClasses.jsx
const RecentClasses = () => (
  <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
    <h3 className="font-semibold text-lg text-gray-800 mb-4">Recent Classes</h3>
    <p className="text-gray-500 text-sm">No record found</p>
  </div>
);

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">

      <div className="flex-1 py-24">
        <Header />
        <div className="p-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatsCard icon="💰" title="Earned" value="₹0.00" />
            <StatsCard icon="🤝" title="Total Classes" value="0" />
            <StatsCard icon="🎉" title="Total Offers" value="0" />
            <StatsCard icon="⏰" title="Total Working Hour" value="0.00" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="col-span-3">
              <ActivityFeed />
              <RecentClasses />
              <StatsCharts />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
