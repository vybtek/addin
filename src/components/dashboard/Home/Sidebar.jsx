"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState } from "react";
import {
  FaTachometerAlt,
  FaBell,
  FaHeart,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { VscLayoutSidebarRight } from "react-icons/vsc";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <FaTachometerAlt className="mr-3 text-xl" />,
    },
    {
      name: "Notifications",
      path: "/dashboard/notifications",
      icon: <FaBell className="mr-3 text-xl" />,
    },
    {
      name: "Favorite",
      path: "/dashboard/favorite",
      icon: <FaHeart className="mr-3 text-xl" />,
    },
    {
      name: "Reviews",
      path: "/dashboard/reviews",
      icon: <FaStar className="mr-3 text-xl" />,
    },
    {
      name: "Settings",
      path: "/dashboard/settings",
      icon: <FaCog className="mr-3 text-xl" />,
    },
    {
      name: "Logout",
      path: "/logout",
      icon: <FaSignOutAlt className="mr-3 text-xl" />,
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-16 left-0 z-50 p-2 text-black mb-4 rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={24} /> : <VscLayoutSidebarRight size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`h-full fixed py-28 w-64 bg-white shadow-lg flex flex-col p-6 transition-transform duration-300 ease-in-out z-40
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          lg:relative lg:translate-x-0 lg:w-64 lg:min-h-screen lg:py-24`}
      >
        {/* Profile Section */}
        <div className="flex items-center mb-8">
          <img
            src="https://www.addinsedu.com/assets/default/images/default/thumb/default-member-logo.svg"
            alt="Profile"
            className="w-14 h-14 rounded-full mr-4 border-2 border-gray-200 object-cover"
          />
          <div>
            <h2 className="font-semibold text-lg text-gray-800">Arpit</h2>
            <p className="text-sm text-gray-500">₹0.00</p>
          </div>
        </div>

        {/* Profile Button */}
        <button
          onClick={() => router.push("/profile")}
          className="bg-blue-500 text-white py-2 px-6 rounded-lg mb-6 text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
        >
          My Profile
        </button>

        {/* Navigation */}
        <nav className="flex-1">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              onClick={() => {
                router.push(item.path);
                setIsOpen(false); // Close sidebar on mobile after click
              }}
              className={`flex items-center py-3 px-4 text-gray-600 hover:bg-gray-100 rounded-lg mb-2 cursor-pointer transition-colors duration-200 ${
                pathname === item.path
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : ""
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </a>
          ))}
        </nav>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </>
  );
};

export default Sidebar;