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
      path: "/dashboard",
      icon: <FaTachometerAlt className="mr-3 text-lg" />,
    },
    {
      name: "Notifications",
      path: "/dashboard/notifications",
      icon: <FaBell className="mr-3 text-lg" />,
    },
    {
      name: "Favorite",
      path: "/dashboard/favorite",
      icon: <FaHeart className="mr-3 text-lg" />,
    },
    {
      name: "Reviews",
      path: "/dashboard/reviews",
      icon: <FaStar className="mr-3 text-lg" />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <FaCog className="mr-3 text-lg" />,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <FaSignOutAlt className="mr-3 text-lg" />,
    },
  ];

  return (
    <div className="w-64 bg-white flex flex-col p-6 min-h-screen py-24">
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


export default Sidebar;