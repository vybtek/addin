"use client";
import { useState } from "react";
import Head from "next/head";
import {
  ChevronDown,
  ChevronUp,
  Users,
  Shield,
  DollarSign,
  Headphones,
  Calendar,
} from "lucide-react";

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [openQuestions, setOpenQuestions] = useState({});

  const toggleQuestion = (questionId) => {
    setOpenQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const categories = [
    { id: "General", label: "General", icon: Users },
    { id: "Fees", label: "Fees & Charges", icon: DollarSign },
    { id: "Account", label: "Managing Your Account", icon: Shield },
    { id: "Services", label: "Tutoring Services", icon: Headphones },
    { id: "Support", label: "Support", icon: Calendar },
    { id: "Shopping", label: "Student Resources", icon: Users },
  ];

  const faqData = {
    General: [
      {
        id: "g1",
        question: "What is Addins Education?",
        answer:
          "Addins Education is a tutoring platform offering personalized offline and online learning services to students across India, connecting them with qualified tutors.",
      },
      {
        id: "g2",
        question: "How do I start learning with Addins Education?",
        answer:
          "You can register on our website, select a tutor based on your needs, and schedule sessions through our platform or contact us directly.",
      },
      {
        id: "g3",
        question: "Who can use Addins Education services?",
        answer:
          "Our services are available to students of all ages, parents seeking tutors, and enterprises looking for educational solutions.",
      },
      {
        id: "g4",
        question: "What subjects are offered?",
        answer:
          "We offer tutoring in a wide range of subjects including math, science, languages, and more, tailored to individual learning needs.",
      },
    ],
    Fees: [
      {
        id: "f1",
        question: "How are tutoring fees determined?",
        answer:
          "Fees are set based on the tutor's experience, session duration, and subject complexity, with transparent pricing provided during registration.",
      },
      {
        id: "f2",
        question: "Are there any additional charges?",
        answer:
          "No additional charges apply beyond the agreed tutoring fees, though platform service fees may be included as per our terms.",
      },
      {
        id: "f3",
        question: "What payment methods are accepted?",
        answer:
          "We accept payments via bank transfer, UPI, and online wallets, processed securely through our platform.",
      },
    ],
    Account: [
      {
        id: "a1",
        question: "How do I create an account?",
        answer:
          "Visit www.addinsedu.com, click 'Register,' and provide your name, email, and other required details to set up your account.",
      },
      {
        id: "a2",
        question: "How can I update my profile?",
        answer:
          "Log in to your account, navigate to the 'Profile' section, and update your information as needed.",
      },
      {
        id: "a3",
        question: "What if I forget my password?",
        answer:
          "Use the 'Forgot Password' link on the login page to reset your password via email.",
      },
    ],
    Services: [
      {
        id: "s1",
        question: "What tutoring services are available?",
        answer:
          "We offer one-on-one tutoring, group classes, and customized learning plans, both online and at your location.",
      },
      {
        id: "s2",
        question: "How are tutors selected?",
        answer:
          "Tutors undergo a rigorous screening process including interviews and assessments to ensure quality education.",
      },
      {
        id: "s3",
        question: "Can I schedule a trial session?",
        answer:
          "Yes, trial sessions can be requested during registration to assess compatibility with a tutor.",
      },
    ],
    Support: [
      {
        id: "sp1",
        question: "How can I contact support?",
        answer:
          "Reach us at support@addinsedu.com or call +91 9664384937 for assistance with any issues.",
      },
      {
        id: "sp2",
        question: "What is the response time for support?",
        answer:
          "We aim to respond within 24 hours, though urgent queries may be addressed sooner.",
      },
      {
        id: "sp3",
        question: "How do I report a problem with a tutor?",
        answer:
          "Contact our support team with details of the issue, and we will investigate and resolve it promptly.",
      },
    ],
    Shopping: [
      {
        id: "sr1",
        question: "Where can I find learning resources?",
        answer:
          "Access study materials, practice tests, and guides in the 'Student Resources' section of our website.",
      },
      {
        id: "sr2",
        question: "Are resources available for free?",
        answer:
          "Some resources are free, while premium content requires a subscription or purchase.",
      },
      {
        id: "sr3",
        question: "How do I download resources?",
        answer:
          "Log in, navigate to the resource section, and download files directly after authentication.",
      },
    ],
  };

  const stats = [
    { icon: Users, number: "10,000+", text: "Students Served" },
    { icon: Shield, number: "100%", text: "Secure Transactions" },
    { icon: DollarSign, number: "Flexible", text: "Payment Plans" },
    { icon: Headphones, number: "24/7", text: "Support Availability" },
    { icon: Calendar, number: "Year-Round", text: "Tutoring Sessions" },
  ];

  return (
    <>
      <Head>
        <title>FAQ - Addins Education | Tutoring Support</title>
        <meta
          name="description"
          content="Find answers to common questions about Addins Education's tutoring services, fees, account management, and support on www.addinsedu.com."
        />
        <meta
          name="keywords"
          content="Addins Education FAQ, tutoring support, Udaipur tutoring, online learning, student resources"
        />
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="canonical" href="https://www.addinsedu.com/faq" />
      </Head>
      <div className="min-h-screen bg-gray-50 py-16">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center">
              <div>
                <h1 className="text-2xl font-medium text-gray-800 mb-4">
                  Frequently Asked Questions
                </h1>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        <IconComponent className="w-8 h-8 text-green-600" />
                      </div>
                      <div className="text-sm font-medium text-green-600">
                        {stat.number}
                      </div>
                      <div className="text-xs text-gray-600">{stat.text}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-80 bg-white rounded-lg shadow-sm h-fit">
              <div className="p-4">
                {categories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <button
                      key={category.id}
                      onClick={() => setActiveCategory(category.id)}
                      className={`cursor-pointer w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center transition-colors ${
                        activeCategory === category.id
                          ? "bg-green-50 text-green-600 border-l-4 border-green-600"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <IconComponent className="w-4 h-4 mr-3" />
                      <span className="text-sm font-medium">
                        {category.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-sm">
                <div className="p-6 border-b">
                  <h2 className="text-lg font-medium text-gray-800 flex items-center">
                    {activeCategory}
                    <div className="w-8 h-0.5 bg-green-600 ml-4"></div>
                  </h2>
                </div>

                <div className="divide-y divide-gray-100">
                  {faqData[activeCategory]?.map((faq) => (
                    <div key={faq.id}>
                      <button
                        onClick={() => toggleQuestion(faq.id)}
                        className="w-full text-left px-6 py-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
                        aria-expanded={openQuestions[faq.id]}
                      >
                        <div className="flex justify-between items-center cursor-pointer">
                          <span className="text-sm text-gray-800 pr-4 leading-5">
                            {faq.question}
                          </span>
                          {openQuestions[faq.id] ? (
                            <ChevronUp className="w-5 h-5 cursor-pointer text-gray-400 flex-shrink-0" />
                          ) : (
                            <ChevronDown className="w-5 cursor-pointer h-5 text-gray-400 flex-shrink-0" />
                          )}
                        </div>
                      </button>

                      {openQuestions[faq.id] && (
                        <div className="px-6 pb-4">
                          <div className="text-sm text-gray-600 leading-relaxed bg-gray-50 p-4 rounded-lg">
                            {faq.answer}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
