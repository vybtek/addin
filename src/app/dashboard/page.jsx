"use client";

import { useRouter, usePathname } from "next/navigation"; // Use next/navigation instead of next/router
import {
  FaTachometerAlt,
  FaEnvelope,
  FaBell,
  FaHeart,
  FaStar,
  FaChartBar,
  FaBriefcase,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname(); // Use usePathname to get the current path

  const menuItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: <FaTachometerAlt className="mr-3 text-lg" />,
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: <FaBell className="mr-3 text-lg" />,
    },
    {
      name: "Favourite",
      path: "/favourite",
      icon: <FaHeart className="mr-3 text-lg" />,
    },
    {
      name: "Reviews",
      path: "/reviews",
      icon: <FaStar className="mr-3 text-lg" />,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: <FaCog className="mr-3 text-lg" />,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <FaSignOutAlt className="mr-3 text-lg" />,
    },
  ];

  return (
    <div className="w-64 bg-white shadow-lg flex flex-col p-6 min-h-screen py-24">
      <div className="flex items-center mb-8">
        <img
          src="https://www.addinsedu.com/assets/default/images/default/thumb/default-member-logo.svg"
          alt="Profile"
          className="w-12 h-12 rounded-full mr-4 border-2 border-gray-200"
        />
        <div>
          <h2 className="font-semibold text-lg text-gray-800">Arpit</h2>
          <p className="text-sm text-gray-500">₹0.00</p>
        </div>
      </div>
      <button
        onClick={() => router.push("/profile")}
        className="bg-blue-400 cursor-pointer text-white py-2 px-6 rounded-lg mb-6 text-sm font-medium hover:bg-blue-500 transition"
      >
        My profile
      </button>
      <nav className="flex-1">
        {menuItems.map((item, idx) => (
          <a
            key={idx}
            onClick={() => router.push(item.path)}
            className={`flex items-center py-3 px-4 text-gray-600 hover:bg-gray-100 rounded-lg mb-1 cursor-pointer ${
              pathname === item.path ? "bg-gray-100 text-blue-500" : ""
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
};

// components/Header.jsx
const Header = () => {
  const handleVerifyDocuments = () => {
    alert("Redirecting to document verification...");
  };

  const handleResendEmail = () => {
    alert("Resending verification email...");
  };

  return (
    <div className="bg-yellow-50  flex justify-center space-x-18 py-24">
      <div className="flex items-center text-red-500 text-sm">
        <span className="mr-2 text-lg">⚠️</span> Please verify your documents
        <button
          onClick={handleVerifyDocuments}
          className="ml-3 cursor-pointer bg-blue-100 text-blue-600 py-1 px-4 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
        >
          Verify Now
        </button>
      </div>
      <div className="flex items-center text-red-500 text-sm">
        <span className="mr-2 text-lg">⚠️</span> Your email is not verified
        <button
          onClick={handleResendEmail}
          className="ml-3 cursor-pointer bg-blue-100 text-blue-600 py-1 px-4 rounded-lg text-sm font-medium hover:bg-blue-200 transition"
        >
          Resend Email
        </button>
      </div>
    </div>
  );
};

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

import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StatsCharts = () => {
  const earningData = {
    labels: [
      "Jun (24)",
      "Jul (24)",
      "Aug (24)",
      "Sep (24)",
      "Oct (24)",
      "Nov (24)",
      "Dec (24)",
      "Jan (25)",
      "Feb (25)",
      "Mar (25)",
      "Apr (25)",
      "May (25)",
    ],
    datasets: [
      {
        label: "Earnings",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        borderColor: "#3B82F6",
        backgroundColor: "#3B82F6",
        fill: false,
        tension: 0,
        pointRadius: 4,
        pointHoverRadius: 6,
      },
    ],
  };

  const earningOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        min: 0,
        max: 1,
        ticks: {
          stepSize: 0.1,
          callback: (value) => value.toFixed(1),
        },
        grid: {
          color: "#E5E7EB",
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
      },
    },
  };

  const projectData = {
    labels: ["Pending Offer", "Processing Contract", "Completed Contract"],
    datasets: [
      {
        label: "Projects",
        data: [0, 0, 0],
        backgroundColor: ["#FBBF24", "#3B82F6", "#10B981"],
        borderWidth: 0,
      },
    ],
  };

  const projectOptions = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      x: {
        display: false,
      },
      y: {
        display: false,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
      <h3 className="font-semibold text-lg text-gray-800 mb-4">
        Earning Stats
      </h3>
      <div className="h-64">
        <Line data={earningData} options={earningOptions} />
      </div>
      <h3 className="font-semibold text-lg text-gray-800 mt-6 mb-4">
        Project Stats
      </h3>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center text-sm">
          <span className="w-4 h-4 bg-yellow-400 mr-2 rounded"></span> Pending
          Offer
        </div>
        <div className="flex items-center text-sm">
          <span className="w-4 h-4 bg-blue-500 mr-2 rounded"></span> Processing
          Contract
        </div>
        <div className="flex items-center text-sm">
          <span className="w-4 h-4 bg-green-500 mr-2 rounded"></span> Completed
          Contract
        </div>
      </div>
      <div className="h-32">
        <Bar data={projectData} options={projectOptions} />
      </div>
    </div>
  );
};

// app/dashboard/page.jsx
// import { Sidebar, Header, StatsCard, ActivityFeed, RecentClasses, StatsCharts } from '../../components';

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1">
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
