"use client";
import React, { useState, useEffect } from "react";
import TutorSteps from "../../components/Register/TutorSteps";
import { CiMail, CiUser } from "react-icons/ci";
import { MdOutlineLocalPhone } from "react-icons/md";
import { TbLockPassword } from "react-icons/tb";
import { useRouter } from "next/navigation";

const parseJwt = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map((c) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
      .join("")
  );
  return JSON.parse(jsonPayload);
};

const SignUpPage = () => {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Signup form, 2: OTP verification, 3+: Tutor steps
  const [formData, setFormData] = useState({
    userType: "Tutor",
    name: "",
    email: "",
    phone: "",
    city_id: "", // Using city_id as per previous updates
    password: "",
  });
  const [otp, setOTP] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showOTPInput, setShowOTPInput] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [otpError, setOtpError] = useState(null);
  const [otpSuccessMessage, setOtpSuccessMessage] = useState(null);
  const [authToken, setAuthToken] = useState(null);
  const [userId, setUserId] = useState(null);
  const [cities, setCities] = useState([]); // State to store fetched cities
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false); // State for dropdown visibility

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch("https://api.vybtek.com/api/cities", {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch cities");
        const data = await response.json();
        setCities(data.data || []); // Assuming the API returns { data: [ { id, name }, ... ] }
      } catch (error) {
        setApiError("Failed to load cities. Please try again later.");
        console.error("Error fetching cities:", error);
      }
    };
    fetchCities();
  }, []);

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Invalid email format";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(formData.phone))
      newErrors.phone = "Phone number must be 10 digits";
    if (!formData.city_id || formData.city_id === "")
      newErrors.city_id = "City is required";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";

    setErrors(newErrors);
    console.log("Validation errors:", newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: null }));
    }
  };

  const handleCitySelect = (cityId) => {
    handleInputChange("city_id", cityId);
    setIsCityDropdownOpen(false);
    setSearchTerm(""); // Clear search term after selection
  };

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSignup = async () => {
    setApiError(null);
    setSuccessMessage(null);
    setOtpError(null);
    setOtpSuccessMessage(null);

    if (!validateForm()) {
      console.log("Form validation failed, stopping signup.");
      return;
    }

    setIsLoading(true);

    try {
      console.log(
        "Sending fetch to:",
        "https://api.vybtek.com/api/users/signup"
      );
      console.log("Payload:", {
        user_type: formData.userType,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        city_id: formData.city_id,
        password: formData.password,
      });
      const response = await fetch(
        "https://api.vybtek.com/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
          },
          body: JSON.stringify({
            user_type: formData.userType,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            city_id: formData.city_id,
            password: formData.password,
          }),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Failed to parse JSON response:", jsonError);
        console.log("Response status:", response.status);
        console.log("Response statusText:", response.statusText);
        console.log("Response body (raw):", await response.text());
        throw new Error(`Invalid server response: ${response.statusText}`);
      }

      console.log("Response status:", response.status);
      console.log("Response data:", data);

      if (!response.ok) {
        console.log("Non-2xx response:", {
          status: response.status,
          statusText: response.statusText,
          error: data.error || "No error message",
        });
        throw new Error(
          data.error || `Registration failed with status ${response.status}`
        );
      }

      if (data.success || response.status === 200 || response.status === 201) {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          setAuthToken(data.token);
          console.log("Token stored in localStorage:", data.token);
        }
        setSuccessMessage(
          "Registration successful! Please enter the OTP sent to your email."
        );
        setRegisteredEmail(formData.email);
        setShowOTPInput(true);
        setStep(2);
      } else {
        console.log("Signup response not successful:", data);
        throw new Error(data.error || "Registration failed");
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      setApiError(
        error.message ||
          "An error occurred during registration. Please try again."
      );
    } finally {
      setIsLoading(false);
      console.log("Show OTP input state:", showOTPInput);
    }
  };

  const handleVerifyOTP = async () => {
    setOtpError(null);
    setOtpSuccessMessage(null);

    if (!registeredEmail.trim()) {
      setOtpError("Email is required");
      console.log("Validation failed: Email empty");
      return;
    }
    if (!otp.trim()) {
      setOtpError("OTP is required");
      console.log("Validation failed: OTP empty");
      return;
    }
    if (!/^\d{6}$/.test(otp)) {
      setOtpError("OTP must be a 6-digit number");
      console.log("Validation failed: Invalid OTP format");
      return;
    }

    setIsLoading(true);

    try {
      console.log(
        "Sending OTP verification fetch to:",
        "https://api.vybtek.com/api/users/verify-otp"
      );
      console.log("Payload:", { email: registeredEmail, otp });
      const response = await fetch(
        "https://api.vybtek.com/api/users/verify-otp",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ email: registeredEmail, otp }),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Failed to parse JSON response:", jsonError);
        console.log("Response status:", response.status);
        console.log("Response statusText:", response.statusText);
        console.log("Response body (raw):", await response.text());
        throw new Error("Invalid server response");
      }

      console.log("Verify OTP response:", { status: response.status, data });

      if (!response.ok) {
        if (data.error === "User already verified") {
          setOtpSuccessMessage(
            "This account is already verified. Please log in."
          );
          console.log("User already verified, resetting form");
          resetForm();
          return;
        }
        throw new Error(
          data.error || `Verification failed with status ${response.status}`
        );
      }

      if (data.success || response.status === 200 || response.status === 201) {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          setAuthToken(data.token);
          console.log(
            "Token stored in localStorage after OTP verification:",
            data.token
          );

          // Parse the token to extract user ID from payload
          const payload = parseJwt(data.token);
          console.log("Token payload:", payload);
          const userIdValue = payload.id; // Adjust this key if your payload uses a different one (e.g., 'user_id' or 'sub')

          if (userIdValue) {
            localStorage.setItem("user_id", userIdValue);
            setUserId(userIdValue);
            console.log(
              "User ID stored in localStorage from token payload:",
              userIdValue
            );
          } else {
            console.error("User ID not found in token payload:", payload);
            throw new Error("User ID not found in token payload");
          }
        }
        setOtpSuccessMessage("Email verified successfully!");
        localStorage.setItem("userType", formData.userType);
        console.log("OTP verification successful");
        resetOTPForm();
        if (formData.userType === "Tutor") {
          setStep(3); // Proceed to Tutor steps only after storing data
        } else {
          router.push("/dashboard"); // Redirect for Parent/Student
        }
      } else {
        throw new Error(data.error || "OTP verification failed");
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      setOtpError(
        error.message ||
          "An error occurred during OTP verification. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setOtpError(null);
    setOtpSuccessMessage(null);

    if (!registeredEmail.trim()) {
      setOtpError("Email is required");
      console.log("Validation failed: Email empty for resend");
      return;
    }

    setIsLoading(true);

    try {
      console.log(
        "Sending resend OTP fetch to:",
        "https://api.vybtek.com/api/users/signup"
      );
      console.log("Resend payload:", { email: registeredEmail, resend: true });
      const response = await fetch(
        "https://api.vybtek.com/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            accept: "*/*",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({ email: registeredEmail, resend: true }),
        }
      );

      let data;
      try {
        data = await response.json();
      } catch (jsonError) {
        console.error("Failed to parse JSON response:", jsonError);
        console.log("Response status:", response.status);
        console.log("Response statusText:", response.statusText);
        console.log("Response body (raw):", await response.text());
        throw new Error("Invalid server response");
      }

      console.log("Resend OTP response:", { status: response.status, data });

      if (!response.ok) {
        if (data.error === "User already verified") {
          setOtpSuccessMessage(
            "This account is already verified. Please log in."
          );
          console.log("User already verified, resetting form");
          resetForm();
          return;
        }
        throw new Error(
          data.error || `Resend OTP failed with status ${response.status}`
        );
      }

      if (data.success || response.status === 200 || response.status === 201) {
        if (data.token) {
          localStorage.setItem("authToken", data.token);
          setAuthToken(data.token);
          console.log(
            "Token stored in localStorage after resend OTP:",
            data.token
          );
        }
        setOtpSuccessMessage(
          "OTP resent successfully! Please check your email."
        );
        console.log("OTP resent successfully");
      } else {
        throw new Error(data.error || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP error:", error.message);
      setOtpError(
        error.message ||
          "An error occurred while resending OTP. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setOTP("");
    setShowOTPInput(false);
    setRegisteredEmail("");
    setFormData({
      userType: "Tutor",
      name: "",
      email: "",
      phone: "",
      city_id: "",
      password: "",
    });
    setErrors({});
    setApiError(null);
    setSuccessMessage(null);
    setOtpError(null);
    setOtpSuccessMessage(null);
    setStep(1);
    localStorage.removeItem("authToken");
    localStorage.removeItem("id");
    setAuthToken(null);
    setUserId(null);
  };

  const resetOTPForm = () => {
    setOTP("");
    setShowOTPInput(false);
    setRegisteredEmail("");
    setErrors({});
    setApiError(null);
    setSuccessMessage(null);
    setOtpError(null);
    setOtpSuccessMessage(null);
  };

  if (step >= 3 && formData.userType === "Tutor") {
    return (
      <TutorSteps
        initialData={{ ...formData, user_id: userId }}
        authToken={authToken}
      />
    );
  }

  return (
    <div className="flex justify-center items-center py-20 bg-white">
      <div className="bg-gray-100 p-8 w-full max-w-2xl rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          Join as a Tutor or Parent/Student
        </h2>

        {apiError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {apiError}
          </div>
        )}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {successMessage}
          </div>
        )}
        {otpError && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {otpError}
          </div>
        )}
        {otpSuccessMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-lg">
            {otpSuccessMessage}
          </div>
        )}

        {step === 1 && (
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <label className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="Tutor"
                checked={formData.userType === "Tutor"}
                onChange={(e) => handleInputChange("userType", e.target.value)}
                className="mr-2"
                disabled={isLoading || showOTPInput}
                suppressHydrationWarning
              />
              I'm a Tutor, looking for class
            </label>
            <label className="flex items-center border border-gray-300 rounded-lg px-4 py-2 bg-white cursor-pointer">
              <input
                type="radio"
                name="userType"
                value="Parent"
                checked={formData.userType === "Parent"}
                onChange={(e) => handleInputChange("userType", e.target.value)}
                className="mr-2"
                disabled={isLoading || showOTPInput}
                suppressHydrationWarning
              />
              I'm a Parent, hiring for a home tutor
            </label>
          </div>
        )}

        {step === 1 && (
          <>
            <div className="mb-4">
              <div
                className={`flex items-center border ${
                  errors.name ? "border-red-500" : "border-gray-300"
                } rounded-full px-4 py-2 bg-white`}
              >
                <CiUser className="w-5 h-5 text-gray-600 mr-2" />
                <input
                  type="text"
                  placeholder="Enter Name"
                  value={formData.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                  className="w-full outline-none bg-transparent"
                  disabled={isLoading || showOTPInput}
                  suppressHydrationWarning
                />
              </div>
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name}</p>
              )}
            </div>

            <div className="mb-4">
              <div
                className={`flex items-center border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-full px-4 py-2 bg-white`}
              >
                <CiMail className="w-5 h-5 text-gray-600 mr-2" />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  className="w-full outline-none bg-transparent"
                  disabled={isLoading || showOTPInput}
                  suppressHydrationWarning
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="mb-4">
              <div
                className={`flex items-center border ${
                  errors.phone ? "border-red-500" : "border-gray-300"
                } rounded-full px-4 py-2 bg-white`}
              >
                <MdOutlineLocalPhone className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(e) => handleInputChange("phone", e.target.value)}
                  className="w-full outline-none bg-transparent"
                  disabled={isLoading || showOTPInput}
                  suppressHydrationWarning
                />
              </div>
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="mb-4 relative">
              <div
                className={`flex items-center justify-between border ${
                  errors.city_id ? "border-red-500" : "border-gray-300"
                } rounded-full px-4 py-2 bg-white cursor-pointer`}
                onClick={() => setIsCityDropdownOpen(!isCityDropdownOpen)}
              >
                <span
                  className={
                    !formData.city_id ? "text-gray-500" : "text-gray-800"
                  }
                >
                  {formData.city_id
                    ? cities.find((city) => city.id === formData.city_id)
                        ?.name || "Select City"
                    : "Select City"}
                </span>
                <svg
                  className="w-4 h-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  ></path>
                </svg>
              </div>
              {isCityDropdownOpen && (
                <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <div className="p-2 border-b">
                    <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-gray-50">
                      <svg
                        className="w-5 h-5 text-gray-500 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        ></path>
                      </svg>
                      <input
                        type="text"
                        placeholder="Search city..."
                        className="w-full outline-none bg-transparent"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    </div>
                  </div>
                  <div className="max-h-40 overflow-y-auto">
                    {filteredCities.length > 0 ? (
                      filteredCities.map((city) => (
                        <div
                          key={city.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => handleCitySelect(city.id)}
                        >
                          {city.name}
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-2 text-gray-500">
                        No cities found
                      </div>
                    )}
                  </div>
                </div>
              )}
              {errors.city_id && (
                <p className="text-red-500 text-sm mt-1">{errors.city_id}</p>
              )}
            </div>

            <div className="mb-4">
              <div
                className={`flex items-center border ${
                  errors.password ? "border-red-500" : "border-gray-300"
                } rounded-full px-4 py-2 bg-white`}
              >
                <TbLockPassword className="w-5 h-5 text-gray-500 mr-2" />
                <input
                  type="password"
                  placeholder="Enter Password"
                  value={formData.password}
                  onChange={(e) =>
                    handleInputChange("password", e.target.value)
                  }
                  className="w-full outline-none bg-transparent"
                  disabled={isLoading || showOTPInput}
                  suppressHydrationWarning
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm mt-1">{errors.password}</p>
              )}
            </div>
          </>
        )}

        {step === 2 && showOTPInput && (
          <div className="mb-4">
            <div
              className={`flex items-center border ${
                otpError && !otp.trim() ? "border-red-500" : "border-gray-300"
              } rounded-full px-4 py-2 bg-white`}
            >
              <CiMail className="w-5 h-5 text-gray-600 mr-2" />
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOTP(e.target.value)}
                className="w-full outline-none bg-transparent"
                disabled={isLoading}
                maxLength={6}
                suppressHydrationWarning
              />
            </div>
            {otpError && (
              <p className="text-red-500 text-sm mt-1">{otpError}</p>
            )}
            <button
              onClick={handleResendOTP}
              disabled={isLoading}
              className={`w-full mt-2 py-2 rounded-full transition duration-200 ${
                isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-400 hover:bg-blue-500"
              } text-white`}
              suppressHydrationWarning
            >
              {isLoading ? "Resending..." : "Resend OTP"}
            </button>
          </div>
        )}

        {(step === 1 || step === 2) && (
          <button
            onClick={showOTPInput ? handleVerifyOTP : handleSignup}
            disabled={isLoading}
            className={`w-full py-2 rounded-full transition duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-cyan-500 hover:bg-cyan-600"
            } text-white`}
            suppressHydrationWarning
          >
            {isLoading
              ? showOTPInput
                ? "Verifying..."
                : "Registering..."
              : showOTPInput
              ? "Verify OTP"
              : "Signup"}
          </button>
        )}

        {(step === 1 || step === 2) && (
          <>
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
          </>
        )}
      </div>
    </div>
  );
};

export default SignUpPage;
