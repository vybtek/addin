"use client";
import { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  Users,
  Shield,
  DollarSign,
  Headphones,
  Calendar,
} from "lucide-react";

export default function FlipkartFAQ() {
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
    { id: "Services", label: "Services", icon: Headphones },
    { id: "Support", label: "Fulfillment", icon: Calendar },
    { id: "Shopping", label: "Addins", icon: Users },
  ];

  const faqData = {
    General: [
      {
        id: "g1",
        question: "Why should I sell on Flipkart?",
        answer:
          "Selling on Flipkart gives you access to millions of customers across India, advanced logistics support, marketing tools, and a trusted platform that ensures secure transactions.",
      },
      {
        id: "g2",
        question: "How does selling on Flipkart.com work?",
        answer:
          "You can register as a seller, list your products, manage inventory, fulfill orders through our logistics network, and receive payments directly to your account.",
      },
      {
        id: "g3",
        question:
          "What is the minimum listing quantity to sell on Flipkart.com?",
        answer:
          "There is no minimum listing quantity requirement. You can start selling with even a single product in most categories.",
      },
      {
        id: "g4",
        question: "What products can I sell on Flipkart.com?",
        answer:
          "You can sell a wide range of products including electronics, fashion, home & kitchen, books, sports, automotive parts, and many more categories.",
      },
      {
        id: "g5",
        question: "What do I need to register to sell on Flipkart.com?",
        answer:
          "You need valid business documents like GST certificate, PAN card, bank account details, and address proof to register as a seller.",
      },
      {
        id: "g6",
        question: "I don't have a website- can I still sell on Flipkart.com?",
        answer:
          "Yes, you don't need your own website to sell on Flipkart. Our platform provides all the tools you need to showcase and sell your products.",
      },
      {
        id: "g7",
        question: "What is FAssured?",
        answer:
          "FAssured is a quality certification program that highlights products meeting Flipkart's quality standards for faster delivery, easy returns, and reliable service.",
      },
      {
        id: "g8",
        question: "Can I offer both products and services on Flipkart.com?",
        answer:
          "Currently, Flipkart primarily focuses on physical products. However, certain service categories may be available in specific programs.",
      },
    ],
    Fees: [
      {
        id: "f1",
        question: "Who decides the price of my products?",
        answer:
          "As a seller, you have complete control over pricing your products. You can set competitive prices based on market research and your business strategy.",
      },
      {
        id: "f2",
        question: "What are the charges for selling on Flipkart.com?",
        answer:
          "Flipkart charges a commission fee that varies by category, typically ranging from 2-20%. Additional charges may apply for fulfillment services.",
      },
      {
        id: "f3",
        question: "Will I get charged for listing products on Flipkart.com?",
        answer:
          "No, listing products on Flipkart is completely free. You only pay commission when you make a sale.",
      },
      {
        id: "f4",
        question: "How and when do I get paid?",
        answer:
          "Payments are processed within 7-15 days after successful delivery and completion of the return window. Funds are directly transferred to your registered bank account.",
      },
    ],
    Account: [
      {
        id: "a1",
        question: "How do I list my products on Flipkart.com?",
        answer:
          "You can list products through the Seller Hub dashboard by providing product details, images, pricing, and inventory information.",
      },
      {
        id: "a2",
        question: "How do I manage my orders on Flipkart.com?",
        answer:
          "Use the Seller Hub to track orders, manage inventory, process shipments, handle returns, and communicate with customers.",
      },
      {
        id: "a3",
        question: "What do I need to list my products on Flipkart.com?",
        answer:
          "You need high-quality product images, detailed descriptions, accurate pricing, inventory count, and proper product categorization.",
      },
      {
        id: "a4",
        question:
          "Can I get help with catalogue development (product images, descriptions, etc.)?",
        answer:
          "Yes, Flipkart offers catalogue support services and guidelines to help you create compelling product listings that drive sales.",
      },
    ],
    Services: [
      {
        id: "a1",
        question: "How do I list my products on Flipkart.com?",
        answer:
          "You can list products through the Seller Hub dashboard by providing product details, images, pricing, and inventory information.",
      },
      {
        id: "a2",
        question: "How do I manage my orders on Flipkart.com?",
        answer:
          "Use the Seller Hub to track orders, manage inventory, process shipments, handle returns, and communicate with customers.",
      },
      {
        id: "a3",
        question: "What do I need to list my products on Flipkart.com?",
        answer:
          "You need high-quality product images, detailed descriptions, accurate pricing, inventory count, and proper product categorization.",
      },
      {
        id: "a4",
        question:
          "Can I get help with catalogue development (product images, descriptions, etc.)?",
        answer:
          "Yes, Flipkart offers catalogue support services and guidelines to help you create compelling product listings that drive sales.",
      },
    ],
    Support: [
      {
        id: "a1",
        question: "How do I list my products on Flipkart.com?",
        answer:
          "You can list products through the Seller Hub dashboard by providing product details, images, pricing, and inventory information.",
      },
      {
        id: "a2",
        question: "How do I manage my orders on Flipkart.com?",
        answer:
          "Use the Seller Hub to track orders, manage inventory, process shipments, handle returns, and communicate with customers.",
      },
      {
        id: "a3",
        question: "What do I need to list my products on Flipkart.com?",
        answer:
          "You need high-quality product images, detailed descriptions, accurate pricing, inventory count, and proper product categorization.",
      },
      {
        id: "a4",
        question:
          "Can I get help with catalogue development (product images, descriptions, etc.)?",
        answer:
          "Yes, Flipkart offers catalogue support services and guidelines to help you create compelling product listings that drive sales.",
      },
    ],
    Shopping: [
      {
        id: "a1",
        question: "How do I list my products on Flipkart.com?",
        answer:
          "You can list products through the Seller Hub dashboard by providing product details, images, pricing, and inventory information.",
      },
      {
        id: "a2",
        question: "How do I manage my orders on Flipkart.com?",
        answer:
          "Use the Seller Hub to track orders, manage inventory, process shipments, handle returns, and communicate with customers.",
      },
      {
        id: "a3",
        question: "What do I need to list my products on Flipkart.com?",
        answer:
          "You need high-quality product images, detailed descriptions, accurate pricing, inventory count, and proper product categorization.",
      },
      {
        id: "a4",
        question:
          "Can I get help with catalogue development (product images, descriptions, etc.)?",
        answer:
          "Yes, Flipkart offers catalogue support services and guidelines to help you create compelling product listings that drive sales.",
      },
    ],
  };

  const stats = [
    { icon: Users, number: "45 crore+", text: "Flipkart customers" },
    { icon: Shield, number: "7*", text: "days secure & regular payments" },
    { icon: DollarSign, number: "Low cost", text: "of doing business" },
    { icon: Headphones, number: "One click", text: "Seller Support" },
    {
      icon: Calendar,
      number: "Access to",
      text: "The Big Billion Days & more",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex flex-col lg:flex-row justify-center items-start lg:items-center">
            <div className="mb-6 lg:mb-0">
              <h1 className="text-2xl font-medium justify-start text-gray-800 mb-4">
                Frequently Asked Questions
              </h1>

              {/* Stats */}
              {/* <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {stats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="text-center">
                      <div className="flex justify-center mb-2">
                        <IconComponent className="w-8 h-8 text-blue-600" />
                      </div>
                      <div className="text-sm font-medium text-blue-600">{stat.number}</div>
                      <div className="text-xs text-gray-600">{stat.text}</div>
                    </div>
                  );
                })}
              </div> */}
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
                    className={`cursor-pointer w-full text-left px-4 py-3 rounded-lg mb-2 flex items-center transition-colors ${activeCategory === category.id
                        ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
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
                  <div className="w-8 h-0.5 bg-blue-600 ml-4"></div>
                </h2>
              </div>

              <div className="divide-y divide-gray-100">
                {faqData[activeCategory]?.map((faq) => (
                  <div key={faq.id}>
                    <button
                      onClick={() => toggleQuestion(faq.id)}
                      className="w-full text-left px-6 py-4 hover:bg-gray-50 focus:outline-none focus:bg-gray-50 transition-colors"
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
  );
}
