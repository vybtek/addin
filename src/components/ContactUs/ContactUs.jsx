"use client";
import React, { useRef, useState } from "react";
import Head from "next/head";

const ContactUs = () => {
  const fileInputRef = useRef(null);
  const [formData, setFormData] = useState({
    inquiry_title: "",
    email: "",
    description: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      console.log("Selected files:", files);
    } else {
      console.log("No files selected or input cleared.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsSubmitting(true);

    if (!formData.inquiry_title || !formData.email || !formData.description) {
      setError("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address.");
      setIsSubmitting(false);
      return;
    }

    const data = new FormData();
    data.append("inquiry_title", formData.inquiry_title);
    data.append("email", formData.email);
    data.append("description", formData.description);

    const files = fileInputRef.current?.files;
    if (files && files.length > 0) {
      Array.from(files).forEach((file) => {
        data.append("attachments", file);
      });
    }

    try {
      const response = await fetch("https://api.vybtek.com/api/contacts", {
        method: "POST",
        headers: {
          accept: "*/*",
        },
        body: data,
      });

      if (response.ok) {
        setSuccess("Your inquiry has been submitted successfully!");
        setFormData({ inquiry_title: "", email: "", description: "" });
        if (fileInputRef.current) fileInputRef.current.value = "";
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Failed to submit the form.");
      }
    } catch (err) {
      setError(
        "An error occurred while submitting the form. Check console for details."
      );
      console.error("API call error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Head>
        <title>Contact Us - Addins Education | Get in Touch</title>
        <meta
          name="description"
          content="Contact Addins Education for inquiries, support, or feedback. Reach us via email, phone, or our online form. Located in Udaipur, Rajasthan, India."
        />
        <meta
          name="keywords"
          content="contact Addins Education, Udaipur education, tutoring services, inquiry form, Rajasthan education"
        />
        <meta name="robots" content="index, follow" />
      </Head>
      <section className="py-30 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-6xl mx-auto">
          <header className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Get in Touch
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Fill out the form below or reach us via email, phone, or social
              media.
            </p>
          </header>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-2xl font-semibold text-gray-800 mb-6">
                Send Us a Message
              </h2>
              {error && (
                <p className="text-red-500 bg-red-50 p-3 rounded-lg mb-4">
                  {error}
                </p>
              )}
              {success && (
                <p className="text-green-500 bg-green-50 p-3 rounded-lg mb-4">
                  {success}
                </p>
              )}
              <form
                onSubmit={handleSubmit}
                className="space-y-6"
                aria-label="Contact Form"
              >
                <div>
                  <label
                    htmlFor="inquiry_title"
                    className="block text-gray-600 font-medium mb-2"
                  >
                    Inquiry Type <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="inquiry_title"
                    type="text"
                    name="inquiry_title"
                    value={formData.inquiry_title}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                    placeholder="What is your inquiry about?"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-gray-600 font-medium mb-2"
                  >
                    Your Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                    placeholder="Your email address"
                    required
                    aria-required="true"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block text-gray-600 font-medium mb-2"
                  >
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 transition-all"
                    rows="5"
                    placeholder="Tell us more about your request"
                    required
                    aria-required="true"
                  ></textarea>
                </div>
                <div>
                  <label className="block text-gray-600 font-medium mb-2">
                    Attach Files
                  </label>
                  <p className="text-gray-500 text-sm mb-3">
                    Upload images or PDFs to support your inquiry
                  </p>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,.pdf"
                    multiple
                    onChange={handleFileChange}
                    aria-label="File upload for inquiry attachments"
                  />
                  <button
                    type="button"
                    onClick={handleFileUpload}
                    className="px-5 py-2.5 bg-sky-100 text-sky-600 rounded-lg hover:bg-sky-200 transition-colors duration-200"
                  >
                    Upload Files
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-5 py-3 text-white font-semibold rounded-lg bg-sky-500 hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:ring-opacity-50 ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  aria-label={isSubmitting ? "Submitting form" : "Submit form"}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        ></path>
                      </svg>
                      Submitting...
                    </span>
                  ) : (
                    "Submit"
                  )}
                </button>
              </form>
            </div>

            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Our Office
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  319, Amrit Shree, Ashok Nagar, Udaipur 313001, Rajasthan,
                  India
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Email Us
                </h3>
                <p className="text-gray-600 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-sky-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <a
                    href="mailto:info.addinstutor@gmail.com"
                    className="text-sky-600 hover:underline"
                    aria-label="Email Addins Education"
                  >
                    info.addinstutor@gmail.com
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Call Us
                </h3>
                <p className="text-gray-600 flex items-center">
                  <svg
                    className="w-5 h-5 mr-2 text-sky-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    ></path>
                  </svg>
                  <a
                    href="tel:+919664384937"
                    className="text-sky-600 hover:underline"
                    aria-label="Call Addins Education"
                  >
                    +91 9664384937
                  </a>
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  Connect With Us
                </h3>
                <div className="flex space-x-4">
                  {[
                    {
                      href: "https://www.facebook.com/addinseduc/",
                      icon: (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-label="Facebook"
                        >
                          <path d="M12 2C6.477 2 2 6.477 2 12c0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.126 22 16.99 22 12c0-5.523-4.477-10-10-10z"></path>
                        </svg>
                      ),
                      color: "hover:bg-blue-600",
                    },
                    {
                      href: "https://www.instagram.com/addinseduc/",
                      icon: (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-label="Instagram"
                        >
                          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.332.014 7.052.072c-4.95.233-6.728 2.014-6.961 6.96C.014 8.332 0 8.741 0 12c0 3.259.014 3.668.072 4.948.233 4.947 2.014 6.728 6.96 6.961C8.332 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.947-.233 6.728-2.014 6.961-6.96.058-1.281.072-1.689.072-4.948 0-3.259-.014-3.668-.072-4.948-.233-4.947-2.014-6.728-6.96-6.961C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"></path>
                        </svg>
                      ),
                      color: "hover:bg-gradient-to-t from-pink-700 to-blue-900",
                    },
                    {
                      href: "https://in.linkedin.com/company/addins",
                      icon: (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-label="LinkedIn"
                        >
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-1.337-.478-2.251-1.677-2.251-.916 0-1.462.617-1.703 1.213-.087.214-.11.514-.11.811v5.831h-3s.04-9.463 0-10.446h3v1.479c.399-.615 1.11-1.494 2.703-1.494 1.972 0 3.447 1.292 3.447 4.064v6.397z"></path>
                        </svg>
                      ),
                      color: "hover:bg-blue-800",
                    },
                    {
                      href: "https://www.youtube.com",
                      icon: (
                        <svg
                          className="w-6 h-6"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          aria-label="YouTube"
                        >
                          <path d="M23.498 6.186a2.917 2.917 0 0 0-2.048-2.048C19.996 3.5 12 3.5 12 3.5s-7.996 0-9.45.638a2.917 2.917 0 0 0-2.048 2.048C0 7.64 0 12 0 12s0 4.36.502 5.814a2.917 2.917 0 0 0 2.048 2.048C4.004 20.5 12 20.5 12 20.5s7.996 0 9.45-.638a2.917 2.917 0 0 0 2.048-2.048C24 16.36 24 12 24 12s0-4.36-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                        </svg>
                      ),
                      color: "hover:bg-red-500",
                    },
                  ].map((link, index) => (
                    <a
                      key={index}
                      href={link.href}
                      className={`text-sky-500 hover:text-white ${link.color} border border-sky-500 rounded-full p-2 transition-colors duration-200`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {link.icon}
                    </a>
                  ))}
                </div>
              </div>
              <div className="w-full h-64 rounded-xl overflow-hidden shadow-lg">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3627.054977295105!2d73.69361437523734!3d24.585443178110084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3967e56a0b35f351%3A0x65e7c8f6620a0242!2sChohtta%20Chetak%20Rd%2C%20Hathipole%2C%20City%27s%20Prime%20Health%20Care%20Area%2C%20Udaipur%2C%20Rajasthan%20313001%2C%20India!5e0!3m2!1sen!2sus!4v1739876543210"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Addins Education Location Map"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactUs;
