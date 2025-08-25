"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaBell,
  FaHeart,
  FaStar,
  FaCog,
  FaSignOutAlt,
  FaTimes,
  FaEnvelope,
  FaBriefcase,
  FaPlusCircle,
  FaChevronDown,
} from "react-icons/fa";
import { VscLayoutSidebarRight } from "react-icons/vsc";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [role, setRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isJobsOpen, setIsJobsOpen] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("userType");
    const userId = localStorage.getItem("user_id");
    const token = localStorage.getItem("authToken");

    if (storedRole) setRole(storedRole.toLowerCase());

    if (userId && token) {
      fetch(`https://api.vybtek.com/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setUserData(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching user:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt className="mr-3 text-xl" /> },
    { name: "Notifications", path: "/dashboard/notifications", icon: <FaBell className="mr-3 text-xl" /> },
    { name: "Favorite", path: "/dashboard/favorite", icon: <FaHeart className="mr-3 text-xl" /> },
    { name: "Reviews", path: "/dashboard/reviews", icon: <FaStar className="mr-3 text-xl" /> },
    { name: "MemberShip", path: "/dashboard/membership", icon: <FaStar className="mr-3 text-xl" /> },
    { name: "Settings", path: "/dashboard/settings", icon: <FaCog className="mr-3 text-xl" /> },
    { name: "Logout", path: "/logout", icon: <FaSignOutAlt className="mr-3 text-xl" /> },
  ];

  const jobsSubItems = [
    { name: "All Posting", path: "/dashboard/all-posting" },
    { name: "Post A Job", path: "/dashboard/post-job" },
  ];

  const toggleSidebar = () => setIsOpen(!isOpen);
  const toggleJobs = () => setIsJobsOpen(!isJobsOpen);

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        className="lg:hidden fixed top-16 left-0 z-50 p-2 text-black rounded-md"
        onClick={toggleSidebar}
      >
        {isOpen ? <FaTimes size={24} /> : <VscLayoutSidebarRight size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`h-full fixed py-28 w-64 bg-white shadow-lg flex flex-col p-6 transition-transform duration-300 ease-in-out z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:relative lg:translate-x-0 lg:w-64 lg:min-h-screen lg:py-24`}
      >
        {/* Profile Section */}
        <div className="flex items-center mb-8">
          {loading ? (
            <div className="animate-pulse flex items-center space-x-4">
              <div className="w-14 h-14 bg-gray-200 rounded-full"></div>
              <div>
                <div className="h-4 bg-gray-200 rounded w-24 mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-16"></div>
              </div>
            </div>
          ) : (
            <>
              <img
                src={
                  userData?.profileImage ||
                  "https://www.addinsedu.com/assets/default/images/default/thumb/default-member-logo.svg"
                }
                alt="Profile"
                className="w-14 h-14 rounded-full mr-4 border-2 border-gray-200 object-cover"
              />
              <div>
                <h2 className="font-semibold text-lg text-gray-800">
                  {userData?.name || "User"}
                </h2>
                <p className="text-sm text-gray-500">
                  ₹{userData?.balance ?? "0.00"}
                </p>
              </div>
            </>
          )}
        </div>

        {/* My Profile Button (Hide for Parent) */}
        {role !== "parent" && (
          <button
            onClick={() => router.push("/profile")}
            className="bg-blue-500 text-white py-2 px-6 rounded-lg mb-6 text-sm font-medium hover:bg-blue-600 transition-colors duration-200"
          >
            My Profile
          </button>
        )}

        {/* Navigation */}
        <nav className="flex-1">
          {menuItems.map((item, idx) => (
            <a
              key={idx}
              onClick={() => {
                router.push(item.path);
                setIsOpen(false);
              }}
              className={`flex items-center py-3 px-4 text-gray-600 hover:bg-gray-100 rounded-lg mb-2 cursor-pointer transition-colors duration-200 ${
                pathname === item.path ? "bg-blue-50 text-blue-600 font-semibold" : ""
              }`}
            >
              {item.icon}
              <span className="text-sm font-medium">{item.name}</span>
            </a>
          ))}

          {/* Jobs Dropdown */}
          <div>
            <div
              onClick={toggleJobs}
              className={`flex items-center py-3 px-4 text-gray-600 hover:bg-gray-100 rounded-lg mb-2 cursor-pointer transition-colors duration-200 ${
                isJobsOpen || jobsSubItems.some((subItem) => pathname === subItem.path)
                  ? "bg-blue-50 text-blue-600 font-semibold"
                  : ""
              }`}
            >
              <FaBriefcase className="mr-3 text-xl" />
              <span className="text-sm font-medium flex-1">Jobs</span>
              <FaChevronDown
                className={`text-xl transition-transform ${
                  isJobsOpen ? "rotate-180" : ""
                }`}
              />
            </div>
            {isJobsOpen && (
              <div className="ml-8">
                {jobsSubItems.map((subItem, idx) => (
                  <a
                    key={idx}
                    onClick={() => {
                      router.push(subItem.path);
                      setIsOpen(false);
                      setIsJobsOpen(false);
                    }}
                    className={`flex items-center py-2 px-4 text-gray-600 hover:bg-gray-100 rounded-lg mb-1 cursor-pointer transition-colors duration-200 ${
                      pathname === subItem.path ? "bg-blue-100 text-blue-600 font-medium" : ""
                    }`}
                  >
                    <span className="text-sm">{subItem.name}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
};

export default Sidebar;