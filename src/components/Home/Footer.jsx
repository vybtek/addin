"use client";
import { useState } from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  ChevronUp,
} from "lucide-react";

export default function Footer() {
  const [hoveredCategory, setHoveredCategory] = useState(null);

  const categories = [
    {
      title: "Job Category",
      links: [
        { name: "Academic Tutor", href: "#" },
        { name: "Dance Trainer", href: "#" },
        { name: "Music Trainer", href: "#" },
        { name: "Yoga Trainer", href: "#" },
        { name: "Drawing & Painting", href: "#" },
        { name: "Writing & Languages", href: "#" },
      ],
    },
    {
      title: "Browse",
      links: [
        { name: "Find Jobs", href: "#" },
        { name: "Find Tutors", href: "#" },
        { name: "Tutor in Udaipur", href: "#" },
        { name: "Tutor in Ahmedabad", href: "#" },
        { name: "Tutor in Jaipur", href: "#" },
        { name: "Tutor in Mumbai", href: "#" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "#" },
        { name: "Contact Us", href: "#" },
        { name: "Enterprise", href: "#" },
        { name: "Privacy Policy", href: "#" },
        { name: "Refund Policy", href: "#" },
        { name: "Terms & Conditions", href: "#" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "FAQs", href: "#" },
        { name: "How it works", href: "#" },
        { name: "Membership", href: "#" },
      ],
    },
  ];

  const socialMedia = [
    { name: "Facebook", icon: <Facebook size={20} />, href: "#" },
    { name: "Twitter", icon: <Twitter size={20} />, href: "#" },
    { name: "LinkedIn", icon: <Linkedin size={20} />, href: "#" },
    { name: "Instagram", icon: <Instagram size={20} />, href: "#" },
    { name: "YouTube", icon: <Youtube size={20} />, href: "#" },
  ];

  return (
    <footer className="bg-black text-white w-full p-2">
      <div className="container mx-auto px-4 py-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="space-y-4"
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <h2
                className={`text-xl font-bold mb-4 ${
                  hoveredCategory === index ? "text-cyan-400" : ""
                } transition-colors duration-300`}
              >
                {category.title}
              </h2>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="hover:text-cyan-400 transition-colors duration-300 block py-1"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          {/* Social Media Icons */}
          <div className="flex space-x-4 mb-6 md:mb-0">
            {socialMedia.map((platform, index) => (
              <a
                key={index}
                href={platform.href}
                className="bg-gray-800 hover:bg-cyan-700 transition-colors duration-300 p-3 rounded-full flex items-center justify-center"
                aria-label={platform.name}
              >
                {platform.icon}
              </a>
            ))}
          </div>

          {/* Copyright Text */}
          <div className="text-gray-400">© 2025 Add-Ins Tutor Inc.</div>
        </div>
      </div>
    </footer>
  );
}
