"use client";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { IoIosRocket } from "react-icons/io";
import { AiOutlineLogin } from "react-icons/ai";
import { VscSignIn } from "react-icons/vsc";
import Link from "next/link";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

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
            <a
              href="/how-it-works"
              className="text-gray-700 hover:text-cyan-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              How it works
            </a>
            <a
              href="/contact-us"
              className="text-gray-700 hover:text-cyan-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Contact Us
            </a>
            <a
              href="/jobs"
              className="text-gray-700 hover:text-cyan-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Jobs
            </a>
            <a
              href="/findtalents"
              className="text-gray-700 hover:text-cyan-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Tutors
            </a>
            <a
              href="/dashboard"
              className="text-gray-700 hover:text-cyan-500 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              Dashboard
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex md:items-center md:space-x-2">
            <a
              href="/login"
              className="flex items-center text-green-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium transition duration-300"
            >
              <span className="mr-1">
                <AiOutlineLogin />
              </span>{" "}
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
              href="/sign-up"
              className="bg-sky-400 hover:bg-sky-500 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center transition duration-300"
            >
              <span className="mr-1">
                <IoIosRocket />
              </span>
              Post A Job
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-cyan-500 hover:bg-gray-100 focus:outline-none"
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
            <a
              href="#how-it-works"
              className="block text-gray-700 hover:bg-gray-100 hover:text-cyan-500 px-3 py-2 rounded-md text-base font-medium"
            >
              How it works
            </a>
            <a
              href="#contact-us"
              className="block text-gray-700 hover:bg-gray-100 hover:text-cyan-500 px-3 py-2 rounded-md text-base font-medium"
            >
              Contact Us
            </a>
            <a
              href="#jobs"
              className="block text-gray-700 hover:bg-gray-100 hover:text-cyan-500 px-3 py-2 rounded-md text-base font-medium"
            >
              Jobs
            </a>
            <a
              href="findtalens"
              className="block text-gray-700 hover:bg-gray-100 hover:text-cyan-500 px-3 py-2 rounded-md text-base font-medium"
            >
              Tutors
            </a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-4 px-5">
              <a
                href="#login"
                className="flex items-center text-green-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                <span className="mr-1">
                  <AiOutlineLogin />
                </span>{" "}
                Log In
              </a>
              <a
                href="#register"
                className="flex items-center text-green-600 hover:text-green-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                <span className="mr-1">
                  <VscSignIn />
                </span>{" "}
                Register
              </a>
            </div>
            <div className="mt-3 px-2 mb-3">
              <a
                href="#post-job"
                className="bg-cyan-500 hover:bg-cyan-600 text-white justify-center px-4 py-2 rounded-full text-sm font-medium flex items-center transition duration-300"
              >
                <span className="mr-1">
                  <IoIosRocket />
                </span>{" "}
                Post A Job
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
