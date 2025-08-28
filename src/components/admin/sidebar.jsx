"use client";

import { useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import {
  FaTachometerAlt,
  FaBell,
  FaCog,
  FaUser,
  FaUsers,
  FaBriefcase,
  FaEnvelope,
  FaBug,
  FaMoneyCheckAlt,
  FaCheck,
  FaSearch,
  FaMoon,
  FaSun,
  FaSignOutAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { FiChevronRight, FiChevronDown } from "react-icons/fi";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [dropdowns, setDropdowns] = useState({
    dashboard: false,
    notification: false,
    admin: false,
    settings: false,
    management: false,
    member: false,
    projects: false,
    userContact: false,
    reportIncorrect: false,
    fundManagement: false,
  });

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeHover, setActiveHover] = useState(null);

  const toggleDropdown = (key) => {
    setDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleMobileSidebar = () => {
    setIsMobileOpen(!isMobileOpen);
  };

  const handleLogout = () => {
    console.log("User logged out");
    router.push("/login");
  };

  // Sidebar menu configuration
  const menuItems = [
    {
      name: "Dashboard",
      path: "/admin",
      icon: <FaTachometerAlt className="mr-3 text-[18px]" />,
      badge: { text: "Hot", bg: "bg-green-100", textColor: "text-green-600" },
      active: pathname === "/admin",
      hasDropdown: false,
    },
    {
      name: "Notification",
      path: "/admin/notifications",
      icon: <FaBell className="mr-3 text-[18px]" />,
      badge: { text: "1873", bg: "bg-red-100", textColor: "text-red-600" },
      active: pathname === "/admin/notifications",
      hasDropdown: false,
    },
    {
      name: "Admin",
      path: "/admin/admin",
      icon: <FaUser className="mr-3 text-[18px]" />,
      hasDropdown: true,
      open: dropdowns.admin,
      subItems: [
        { name: "User", path: "/admin/user" },
        { name: "Role", path: "/admin/role" },
        { name: "Permission", path: "/admin/permission" },
      ],
      active:
        pathname.startsWith("/admin/admin") ||
        pathname.startsWith("/admin/user") ||
        pathname.startsWith("/admin/role") ||
        pathname.startsWith("/admin/permission"),
    },
    {
      name: "Settings",
      path: "/admin/settings",
      icon: <FaCog className="mr-3 text-[18px]" />,
      hasDropdown: true,
      open: dropdowns.settings,
      subItems: [
        { name: "All Settings", path: "/admin/all-settings" },
        { name: "Setting Group", path: "/admin/setting-group" },
      ],
      active: pathname.startsWith("/admin/settings"),
    },
    {
      name: "Management",
      path: "/admin/management",
      icon: <FaUsers className="mr-3 text-[18px]" />,
      hasDropdown: true,
      open: dropdowns.management,
      subItems: [
        { name: "Category", path: "/admin/category" },
        { name: "Countries", path: "/admin/country" },
        { name: "States", path: "/admin/states" },
        { name: "Skills", path: "/admin/skills" },
        { name: "Resource Management", path: "/admin/resource-management" },
      ],
      active: pathname.startsWith("/admin/management"),
    },
    {
      name: "Member",
      path: "/admin/member",
      icon: <FaUser className="mr-3 text-[18px]" />,
      hasDropdown: true,
      open: dropdowns.member,
      subItems: [
        { name: "All Members", path: "/admin/all-members" },
        { name: "Member Roles", path: "/admin/member-roles" },
        { name: "Member Permissions", path: "/admin/member-permissions" },
      ],
      active: pathname.startsWith("/admin/member"),
    },
    {
      name: "Projects",
      path: "/admin/projects",
      icon: <FaBriefcase className="mr-3 text-[18px]" />,
      hasDropdown: true,
      open: dropdowns.projects,
      subItems: [
        { name: "All Projects", path: "/admin/all-projects" },
        { name: "Project Categories", path: "/admin/project-categories" },
        { name: "Project Status", path: "/admin/project-status" },
      ],
      active: pathname.startsWith("/admin/projects"),
    },
    {
      name: "User Contact",
      path: "/admin/user-contact",
      icon: <FaEnvelope className="mr-3 text-[18px]" />,
      hasDropdown: true,
      open: dropdowns.userContact,
      subItems: [
        { name: "Contact List", path: "/admin/contact-list" },
        { name: "Message Templates", path: "/admin/message-templates" },
        { name: "Contact Settings", path: "/admin/contact-settings" },
      ],
      active: pathname.startsWith("/admin/user-contact"),
    },
    {
      name: "Report Incorrect",
      path: "/admin/report-incorrect",
      icon: <FaBug className="mr-3 text-[18px]" />,
      hasDropdown: true,
      open: dropdowns.reportIncorrect,
      subItems: [
        { name: "All Reports", path: "/admin/all-reports" },
        { name: "Report Categories", path: "/admin/report-categories" },
        { name: "Report Settings", path: "/admin/report-settings" },
      ],
      active: pathname.startsWith("/admin/report-incorrect"),
    },
    {
      name: "Fund Management",
      path: "/admin/fund-management",
      icon: <FaMoneyCheckAlt className="mr-3 text-[18px]" />,
      hasDropdown: true,
      open: dropdowns.fundManagement,
      subItems: [
        { name: "All Funds", path: "/admin/all-funds" },
        { name: "Fund Categories", path: "/admin/fund-categories" },
        { name: "Fund Allocation", path: "/admin/fund-allocation" },
      ],
      active: pathname.startsWith("/admin/fund-management"),
    },
  ];

  // Filter menu items based on search term
  const filteredMenuItems = menuItems.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.subItems &&
        item.subItems.some((sub) =>
          sub.name.toLowerCase().includes(searchTerm.toLowerCase())
        ))
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-blue-600 text-white"
        onClick={toggleMobileSidebar}
      >
        {isMobileOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen bg-white dark:bg-gray-900 pt-2 shadow-lg flex flex-col border-r border-gray-100 dark:border-gray-800
          transition-all duration-300 z-40
          ${isCollapsed ? "w-20" : "w-64"}
          ${
            isMobileOpen
              ? "translate-x-0"
              : "-translate-x-full md:translate-x-0"
          }
        `}
      >
        {/* Logo and collapse button */}
        <div className="h-16 flex items-center px-6 mb-2 justify-between">
          {!isCollapsed && (
            <img
              src="https://www.addinsedu.com/assets/default/images/logo-1.png"
              alt="Addins Logo"
              className="h-18 w-auto flex items-center dark:invert-[0.8]"
            />
          )}
          <button
            onClick={toggleSidebar}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isCollapsed ? (
              <FiChevronRight />
            ) : (
              <FiChevronRight className="rotate-180" />
            )}
          </button>
        </div>

        {/* Search bar (only visible when not collapsed) */}
        {!isCollapsed && (
          <div className="px-4 mb-4">
            <div className="relative">
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
              <input
                type="text"
                placeholder="Search menu..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 mt-1 overflow-y-auto">
          {filteredMenuItems.map((item, idx) => (
            <div key={idx}>
              {/* Main menu row */}
              <div
                className={`flex items-center px-6 py-2.5 rounded-lg mb-1 cursor-pointer transition-all duration-200 group
                  ${
                    item.active
                      ? "bg-green-50 dark:bg-green-900 text-green-700 dark:text-green-300 font-semibold"
                      : "hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-800 dark:text-gray-200"
                  }
                `}
                onClick={() => {
                  if (item.hasDropdown) {
                    toggleDropdown(item.name.toLowerCase().replace(/\s+/g, ""));
                  } else {
                    router.push(item.path);
                    setIsMobileOpen(false);
                  }
                }}
                onMouseEnter={() => setActiveHover(item.name)}
                onMouseLeave={() => setActiveHover(null)}
              >
                <div className="flex items-center justify-center w-6">
                  {item.icon}
                </div>

                {!isCollapsed && (
                  <>
                    <span className="flex-1 text-[16px] ml-3">{item.name}</span>

                    {item.badge && (
                      <span
                        className={`ml-2 px-2 py-0.5 rounded text-xs font-medium shadow-sm ${item.badge.bg} ${item.badge.textColor}`}
                      >
                        {item.badge.text}
                      </span>
                    )}
                  </>
                )}

                {isCollapsed && activeHover === item.name && (
                  <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded shadow-lg z-50">
                    {item.name}
                    {item.badge && (
                      <span className={`ml-1 ${item.badge.textColor}`}>
                        ({item.badge.text})
                      </span>
                    )}
                  </div>
                )}

                {item.hasDropdown ? (
                  item.open ? (
                    <FiChevronDown className="text-[18px] ml-2 text-green-500" />
                  ) : (
                    <FiChevronRight className="text-[18px] ml-2 text-gray-400" />
                  )
                ) : (
                  !isCollapsed && (
                    <FiChevronRight className="text-[18px] ml-2 text-gray-400" />
                  )
                )}
              </div>

              {item.hasDropdown && item.open && !isCollapsed && (
                <div className="ml-10 mt-1">
                  {item.subItems.map((sub, i) => (
                    <div
                      key={i}
                      className={`flex items-center py-2 px-2 text-[15px] rounded-lg mb-1 cursor-pointer transition-colors duration-200
                        ${
                          pathname === sub.path
                            ? "bg-green-100 dark:bg-green-800 text-green-700 dark:text-green-300 font-semibold"
                            : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }
                      `}
                      onClick={() => {
                        router.push(sub.path);
                        setIsMobileOpen(false);
                      }}
                    >
                      <FaCheck className="mr-3 text-green-400 text-base" />
                      {sub.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Bottom options */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          {/* Logout button */}
          <button
            onClick={handleLogout}
            className="flex items-center w-full p-2 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900 transition-colors duration-200"
          >
            <FaSignOutAlt className="text-lg" />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>

      {/* Add padding to main content when sidebar is collapsed */}
      <div
        className={`
          transition-all duration-300
          ${isCollapsed ? "md:pl-20" : "md:pl-64"}
        `}
      >
        {/* Your main content goes here */}
      </div>
    </>
  );
};

export default Sidebar;
