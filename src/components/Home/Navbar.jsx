"use client";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { IoIosRocket } from "react-icons/io";
import { AiOutlineLogin, AiOutlineLogout } from "react-icons/ai";
import { VscSignIn } from "react-icons/vsc";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Fetch auth token and user role from localStorage
    const token = localStorage.getItem("authToken");
    const storedUserType = localStorage.getItem("userType");
    setIsAuthenticated(!!token);
    // Normalize userType to match navLinks keys
    if (storedUserType) {
      const normalizedRole =
        storedUserType.charAt(0).toUpperCase() +
        storedUserType.slice(1).toLowerCase();
      setUserRole(normalizedRole);
    } else {
      setUserRole(null);
    }
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("userType");
    localStorage.removeItem("user_id");
    setIsAuthenticated(false);
    setUserRole(null);
    setMobileMenuOpen(false);
  };

  // Define navigation links based on role
  const navLinks = {
    Tutor: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/jobs", label: "Find Jobs" },
      { href: "/profile", label: "My Profile" },
      { href: "/contact-us", label: "Contact Us" },
    ],
    Parent: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/findtalents", label: "Find Tutors" },
      { href: "/job-post", label: "Post A Job" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/contact-us", label: "Contact Us" },
    ],
    Admin: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/dashboard", label: "Dashboard" },
      { href: "/manage-users", label: "Manage Users" },
      { href: "/manage-jobs", label: "Manage Jobs" },
      { href: "/contact-us", label: "Contact Us" },
    ],
    Guest: [
      { href: "/how-it-works", label: "How it works" },
      { href: "/contact-us", label: "Contact Us" },
      { href: "/jobs", label: "Jobs" },
      { href: "/findtalents", label: "Tutors" },
    ],
  };

  // Ensure links is always an array by checking if userRole is valid
  const validRoles = ["Tutor", "Parent", "Admin"];
  const links =
    isAuthenticated && userRole && validRoles.includes(userRole)
      ? navLinks[userRole]
      : navLinks.Guest;

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <div className="flex items-center">
                <img
                  src="https://www.addinsedu.com/assets/default/images/logo-1.png"
                  alt="Logo"
                  className="h-14 w-auto"
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-cyan-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="flex items-center text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
              >
                <span className="mr-1">
                  <AiOutlineLogout />
                </span>
                Log Out
              </button>
            ) : (
              <>
                <a
                  href="/login"
                  className="flex items-center text-green-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <span className="mr-1">
                    <AiOutlineLogin />
                  </span>
                  Log In
                </a>
                <a
                  href="/sign-up"
                  className="flex items-center text-green-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
                >
                  <span className="mr-1">
                    <VscSignIn />
                  </span>
                  Register
                </a>
                <a
                  href="/job-post"
                  className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center transition duration-300"
                >
                  <span className="mr-1">
                    <IoIosRocket />
                  </span>
                  Post A Job
                </a>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-cyan-500 hover:bg-gray-100 focus:outline-none"
              suppressHydrationWarning={true}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-gray-700 hover:bg-gray-100 hover:text-cyan-500 px-3 py-2 rounded-md text-base font-medium"
              >
                {link.label}
              </a>
            ))}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4 px-5">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center text-red-600 hover:text-red-700 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <span className="mr-1">
                    <AiOutlineLogout />
                  </span>
                  Log Out
                </button>
              ) : (
                <>
                  <a
                    href="/login"
                    className="flex items-center text-green-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <span className="mr-1">
                      <AiOutlineLogin />
                    </span>
                    Log In
                  </a>
                  <a
                    href="/sign-up"
                    className="flex items-center text-green-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
                  >
                    <span className="mr-1">
                      <VscSignIn />
                    </span>
                    Register
                  </a>
                </>
              )}
            </div>
            {!isAuthenticated && (
              <div className="mt-3 px-2 mb-3">
                <a
                  href="/post-job"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white justify-center px-4 py-2 rounded-full text-sm font-medium flex items-center transition duration-300"
                >
                  <span className="mr-1">
                    <IoIosRocket />
                  </span>
                  Post A Job
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
