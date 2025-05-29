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
        { name: "About Us", href: "/about-us" },
        { name: "Contact Us", href: "/contact-us" },
        { name: "Privacy Policy", href: "/privacy-policy" },
        { name: "Refund Policy", href: "/refund-policy" },
        { name: "Terms & Conditions", href: "/terms-and-conditions" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "FAQs", href: "/help" },
        { name: "How it works", href: "/how-it-works" },
        { name: "Membership", href: "/dashboard/membership" },
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
    <footer className="bg-black text-white w-full">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="space-y-4"
              onMouseEnter={() => setHoveredCategory(index)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <h2
                className={`text-lg font-semibold ${
                  hoveredCategory === index ? "text-cyan-400" : "text-gray-200"
                } transition-colors duration-300`}
              >
                {category.title}
              </h2>
              <ul className="space-y-2">
                {category.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 block text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex space-x-6">
            {socialMedia.map((platform, index) => (
              <a
                key={index}
                href={platform.href}
                className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                aria-label={platform.name}
              >
                {platform.icon}
              </a>
            ))}
          </div>
          <div className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Add-Ins Tutor Inc.
          </div>
        </div>
      </div>
    </footer>
  );
}