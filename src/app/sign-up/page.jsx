"use client"
import React, { useState } from "react";
import SearchableCitySelect from "../../components/Register/SearchableCitySelect";
import { CiMail, CiUser } from "react-icons/ci";
import { MdOutlineLocalPhone } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";

const RegisterPage = () => {
  const [userType, setUserType] = useState("tutor");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = () => {
    console.log("Signing up with:", {
      userType,
      name,
      email,
      phone,
      city,
      password,
    });
    // Add signup logic here
  };

  return (
    <div className="flex justify-center items-center py-20 bg-white">
      <div className="bg-gray-100 p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold text-center mb-6">
          Join as a Tutor or Parent/Student
        </h2>

        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <label className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white">
            <input
              type="radio"
              name="userType"
              value="tutor"
              checked={userType === "tutor"}
              onChange={(e) => setUserType(e.target.value)}
              className="mr-2"
            />
            I'm a tutor, looking for class
          </label>
          <label className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white">
            <input
              type="radio"
              name="userType"
              value="parent"
              checked={userType === "parent"}
              onChange={(e) => setUserType(e.target.value)}
              className="mr-2"
            />
            I'm a Parent, hiring for a home tutor
          </label>
        </div>

        <div className="mb-4"> 
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white">
            <CiUser className="w-5 h-5 text-gray-600 mr-2"/>
            <input
              type="text"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full outline-none bg-transparent"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white">
           <CiMail className="w-5 h-5 text-gray-600 mr-2"/>
            <input
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full outline-none bg-transparent"
            />
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white">
           <MdOutlineLocalPhone  className="w-5 h-5 text-gray-500 mr-2"/>
            <input
              type="tel"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full outline-none bg-transparent"
            />
          </div>
        </div>

        {/* Searchable City Select */}
        <SearchableCitySelect selectedCity={city} onChange={setCity} />

        <div className="mb-4">
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white">
            <TbLockPassword className="w-5 h-5 text-gray-500 mr-2"/>
            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full outline-none bg-transparent"
            />
          </div>
        </div>

        <button
          onClick={handleSignup}
          className="w-full bg-cyan-400 text-white py-2 rounded-full hover:bg-cyan-500 transition duration-200"
        >
          Signup
        </button>

        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-gray-500">OR</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <p className="text-center">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-500 hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;