"use client";
import React, { useState, useEffect, useRef } from "react";
import {
  FaSchool,
  FaBookOpen,
  FaCalendarAlt,
  FaHome,
  FaMapMarkerAlt,
  FaGenderless,
  FaBriefcase,
  FaCamera,
  FaInfoCircle,
} from "react-icons/fa";
import { useRouter } from "next/navigation";

const TutorSteps = ({ initialData, authToken }) => {
  const router = useRouter();
  const userId = localStorage.getItem("user_id") || initialData.user_id || "";
  const [step, setStep] = useState(3);
  const [formData, setFormData] = useState({
    street: "",
    city_id: "",
    postal_code: "",
    latitude: "",
    longitude: "",
    gender: "",
    dob: new Date(),
    mode: "",
    charges_monthly: "",
    charges_hourly: "",
    about: "",
    profile_photo: null,
    educations: [],
    experiences: [],
    categories: [],
    subjects: [],
    preferred_classes: [],
    ...initialData,
  });
  const [educationForm, setEducationForm] = useState({
    institution: "",
    from_year: "",
    to_year: "",
    degree: "",
    area_of_study: "",
    description: "",
  });
  const [experienceForm, setExperienceForm] = useState({
    institute_name: "",
    job_title: "",
    city: "", // Changed from city_id to city
    state: "",
    teaching_role: "",
    period_from_month: "",
    period_from_year: "",
    period_to_month: "",
    period_to_year: "",
    currently_work_here: false,
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [modalVisible, setModalVisible] = useState({
    education: false,
    experience: false,
  });
  const [editingIndex, setEditingIndex] = useState({
    education: null,
    experience: null,
  });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [availableCategories, setAvailableCategories] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [availableClasses, setAvailableClasses] = useState([]);
  const [teacherId, setTeacherId] = useState(userId);
  const [cities, setCities] = useState([]); // State to store fetched cities
  const [searchTerm, setSearchTerm] = useState(""); // State for search input
  const [isCityDropdownOpen, setIsCityDropdownOpen] = useState(false); // State for city dropdown visibility
  const [isExperienceCityDropdownOpen, setIsExperienceCityDropdownOpen] =
    useState(false); // State for experience city dropdown visibility
  const fadeAnim = useRef({ opacity: 0 });

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const [categoriesRes, subjectsRes, classesRes, citiesRes] =
          await Promise.all([
            fetch("https://api.vybtek.com/api/categories", {
              headers: { Authorization: `Bearer ${authToken}` },
            }),
            fetch("https://api.vybtek.com/api/subjects", {
              headers: { Authorization: `Bearer ${authToken}` },
            }),
            fetch("https://api.vybtek.com/api/preferred-classes", {
              headers: { Authorization: `Bearer ${authToken}` },
            }),
            fetch("https://api.vybtek.com/api/cities", {
              headers: { Authorization: `Bearer ${authToken}` },
            }),
          ]);
        const [categoriesData, subjectsData, classesData, citiesData] =
          await Promise.all([
            categoriesRes.json(),
            subjectsRes.json(),
            classesRes.json(),
            citiesRes.json(),
          ]);
        setAvailableCategories(categoriesData.data || []);
        setAvailableSubjects(subjectsData.data || []);
        setAvailableClasses(classesData.data || []);
        setCities(citiesData.data || []); // Assuming the API returns { data: [ { id, name }, ... ] }
      } catch (error) {
        setApiError("Failed to load categories, subjects, classes, or cities.");
      }
    };
    fetchOptions();

    const animation = setInterval(() => {
      fadeAnim.current = { opacity: fadeAnim.current.opacity + 0.1 };
      if (fadeAnim.current.opacity >= 1) clearInterval(animation);
    }, 30);
    return () => clearInterval(animation);
  }, [step, authToken]);

  const validateStep3 = () => {
    const newErrors = {};
    if (!formData.street.trim())
      newErrors.street = "Street address is required";
    if (!formData.city_id) newErrors.city_id = "City is required";
    if (!formData.postal_code.trim())
      newErrors.postal_code = "Postal code is required";
    else if (!/^\d{6}$/.test(formData.postal_code))
      newErrors.postal_code = "Postal code must be 6 digits";
    if (!formData.latitude || isNaN(formData.latitude))
      newErrors.latitude = "Valid latitude is required";
    if (!formData.longitude || isNaN(formData.longitude))
      newErrors.longitude = "Valid longitude is required";
    if (!formData.gender) newErrors.gender = "Gender is required";
    if (!formData.dob) newErrors.dob = "Date of Birth is required";
    if (!formData.mode) newErrors.mode = "Teaching mode is required";
    if (!formData.charges_monthly || formData.charges_monthly <= 0)
      newErrors.charges_monthly = "Monthly charges must be positive";
    if (!formData.charges_hourly || formData.charges_hourly <= 0)
      newErrors.charges_hourly = "Hourly charges must be positive";
    if (!formData.about.trim()) newErrors.about = "About section is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep4 = () => true;
  const validateStep5 = () => true;
  const validateStep6 = () => {
    const newErrors = {};
    if (formData.categories.length === 0)
      newErrors.categories = "At least one category is required";
    if (formData.subjects.length === 0)
      newErrors.subjects = "At least one subject is required";
    if (formData.preferred_classes.length === 0)
      newErrors.preferred_classes = "At least one preferred class is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateEducationForm = () => {
    const newErrors = {};
    if (!educationForm.institution.trim())
      newErrors.institution = "Institution is required";
    if (!educationForm.from_year) newErrors.from_year = "From year is required";
    else if (
      isNaN(educationForm.from_year) ||
      educationForm.from_year < 1900 ||
      educationForm.from_year > new Date().getFullYear()
    ) {
      newErrors.from_year = "Invalid From year";
    }
    if (!educationForm.to_year) newErrors.to_year = "To year is required";
    else if (
      isNaN(educationForm.to_year) ||
      educationForm.to_year < 1900 ||
      educationForm.to_year > new Date().getFullYear() + 1
    ) {
      newErrors.to_year = "Invalid To year";
    }
    if (!educationForm.degree.trim()) newErrors.degree = "Degree is required";
    if (
      educationForm.from_year &&
      educationForm.to_year &&
      parseInt(educationForm.from_year) > parseInt(educationForm.to_year)
    ) {
      newErrors.to_year = "To year must be after From year";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateExperienceForm = () => {
    const newErrors = {};
    if (!experienceForm.institute_name.trim())
      newErrors.institute_name = "Institute name is required";
    if (!experienceForm.job_title.trim())
      newErrors.job_title = "Job title is required";
    if (!experienceForm.city.trim()) newErrors.city = "City is required"; // Changed to city
    if (!experienceForm.state.trim()) newErrors.state = "State is required";
    if (!experienceForm.teaching_role.trim())
      newErrors.teaching_role = "Teaching role is required";
    if (!experienceForm.period_from_month)
      newErrors.period_from_month = "From month is required";
    if (!experienceForm.period_from_year)
      newErrors.period_from_year = "From year is required";
    if (!experienceForm.currently_work_here) {
      if (!experienceForm.period_to_month)
        newErrors.period_to_month = "To month is required";
      if (!experienceForm.period_to_year)
        newErrors.period_to_year = "To year is required";
      if (
        experienceForm.period_from_year &&
        experienceForm.period_to_year &&
        parseInt(experienceForm.period_from_year) >
          parseInt(experienceForm.period_to_year)
      ) {
        newErrors.period_to_year = "To year must be after From year";
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleEducationChange = (field, value) => {
    const parsedValue = field.includes("year")
      ? value
        ? parseInt(value)
        : ""
      : value;
    setEducationForm((prev) => ({ ...prev, [field]: parsedValue }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleExperienceChange = (field, value) => {
    const parsedValue = field.includes("year")
      ? value
        ? parseInt(value)
        : ""
      : value;
    setExperienceForm((prev) => ({ ...prev, [field]: parsedValue }));
    setErrors((prev) => ({ ...prev, [field]: null }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, profile_photo: file }));
      setSuccessMessage("Profile image selected");
    }
  };

  const saveEducation = async () => {
    if (validateEducationForm() && teacherId) {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.vybtek.com/api/teacher-educations",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              teacher_id: teacherId,
              ...educationForm,
              from_year: parseInt(educationForm.from_year),
              to_year: parseInt(educationForm.to_year),
            }),
          }
        );
        if (!response.ok)
          throw new Error(
            (await response.json()).error || "Failed to save education"
          );
        const savedEducation = await response.json();
        setFormData((prev) => ({
          ...prev,
          educations: [
            ...prev.educations,
            savedEducation.data || educationForm,
          ],
        }));
        setSuccessMessage("Education saved successfully");
        resetEducationForm();
      } catch (error) {
        setApiError(
          error.message || "Failed to save education. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setApiError(
        "Please complete all required fields or create a teacher profile first."
      );
    }
  };

  const saveExperience = async () => {
    if (validateExperienceForm() && teacherId) {
      setIsLoading(true);
      try {
        const response = await fetch(
          "https://api.vybtek.com/api/teacher-experiences",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({
              teacher_id: teacherId,
              ...experienceForm,
              period_from_year: parseInt(experienceForm.period_from_year),
              period_to_year: experienceForm.period_to_year
                ? parseInt(experienceForm.period_to_year)
                : null,
            }),
          }
        );
        if (!response.ok)
          throw new Error(
            (await response.json()).error || "Failed to save experience"
          );
        const savedExperience = await response.json();
        setFormData((prev) => ({
          ...prev,
          experiences: [
            ...prev.experiences,
            savedExperience.data || experienceForm,
          ],
        }));
        setSuccessMessage("Experience saved successfully");
        resetExperienceForm();
      } catch (error) {
        setApiError(
          error.message || "Failed to save experience. Please try again."
        );
      } finally {
        setIsLoading(false);
      }
    } else {
      setApiError(
        "Please complete all required fields or create a teacher profile first."
      );
    }
  };

  const handleEditEducation = (index) => {
    setEducationForm(formData.educations[index]);
    setEditingIndex((prev) => ({ ...prev, education: index }));
    setModalVisible((prev) => ({ ...prev, education: true }));
  };

  const handleEditExperience = (index) => {
    setExperienceForm(formData.experiences[index]);
    setEditingIndex((prev) => ({ ...prev, experience: index }));
    setModalVisible((prev) => ({ ...prev, experience: true }));
  };

  const handleDeleteEducation = (index) => {
    setFormData((prev) => ({
      ...prev,
      educations: prev.educations.filter((_, i) => i !== index),
    }));
    setSuccessMessage("Education deleted");
  };

  const handleDeleteExperience = (index) => {
    setFormData((prev) => ({
      ...prev,
      experiences: prev.experiences.filter((_, i) => i !== index),
    }));
    setSuccessMessage("Experience deleted");
  };

  const resetEducationForm = () => {
    setEducationForm({
      institution: "",
      from_year: "",
      to_year: "",
      degree: "",
      area_of_study: "",
      description: "",
    });
    setModalVisible((prev) => ({ ...prev, education: false }));
    setEditingIndex((prev) => ({ ...prev, education: null }));
    setErrors({});
  };

  const resetExperienceForm = () => {
    setExperienceForm({
      institute_name: "",
      job_title: "",
      city: "", // Changed from city_id to city
      state: "",
      teaching_role: "",
      period_from_month: "",
      period_from_year: "",
      period_to_month: "",
      period_to_year: "",
      currently_work_here: false,
      description: "",
    });
    setModalVisible((prev) => ({ ...prev, experience: false }));
    setEditingIndex((prev) => ({ ...prev, experience: null }));
    setErrors({});
  };

  const handleNext = async () => {
    setApiError(null);
    setSuccessMessage(null);

    if (step === 3 && !validateStep3()) {
      setApiError("Please complete all personal details");
      return;
    }
    if (step === 6 && !validateStep6()) {
      setApiError(
        "Please select at least one category, subject, and preferred class"
      );
      return;
    }

    if (step === 3) {
      setIsLoading(true);
      try {
        const formDataPayload = new FormData();
        formDataPayload.append("user_id", userId);
        formDataPayload.append("street", formData.street.trim() || "");
        formDataPayload.append("city_id", formData.city_id || "");
        formDataPayload.append(
          "postal_code",
          formData.postal_code.trim() || ""
        );
        formDataPayload.append("latitude", formData.latitude || "");
        formDataPayload.append("longitude", formData.longitude || "");
        formDataPayload.append("gender", formData.gender || "");
        formDataPayload.append(
          "dob",
          formData.dob ? formData.dob.toLocaleDateString("en-GB") : ""
        );
        formDataPayload.append("mode", formData.mode || "");
        formDataPayload.append(
          "charges_monthly",
          formData.charges_monthly || "0"
        );
        formDataPayload.append(
          "charges_hourly",
          formData.charges_hourly || "0"
        );
        formDataPayload.append("about", formData.about.trim() || "");
        if (formData.profile_photo)
          formDataPayload.append("profile_photo", formData.profile_photo);

        const tutorResponse = await fetch(
          "https://api.vybtek.com/api/teachers",
          {
            method: "POST",
            headers: { Authorization: `Bearer ${authToken}` },
            body: formDataPayload,
          }
        );
        const tutorData = await tutorResponse.json();
        if (!tutorResponse.ok)
          throw new Error(
            tutorData.message || "Failed to create tutor profile"
          );
        setTeacherId(tutorData.id); // Store the teacher_id
        setSuccessMessage("Teacher profile created successfully!");
      } catch (error) {
        setApiError(
          error.message || "Failed to save teacher profile. Please try again."
        );
        return;
      } finally {
        setIsLoading(false);
      }
    }

    if (step < 6) {
      setStep(step + 1);
      return;
    }

    setIsLoading(true);
    try {
      const teacher_id = teacherId; // Use the stored teacher_id
      if (!teacher_id)
        throw new Error(
          "Teacher profile not created. Please complete Step 3 first."
        );

      for (const category_id of formData.categories) {
        const response = await fetch(
          "https://api.vybtek.com/api/teacher-categories",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ teacher_id, category_id }),
          }
        );
        if (!response.ok)
          throw new Error(
            (await response.json()).error || "Failed to save category"
          );
      }

      for (const subject_id of formData.subjects) {
        const response = await fetch(
          "https://api.vybtek.com/api/teacher-subjects",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ teacher_id, subject_id }),
          }
        );
        if (!response.ok)
          throw new Error(
            (await response.json()).error || "Failed to save subject"
          );
      }

      for (const preferred_class_id of formData.preferred_classes) {
        const response = await fetch(
          "https://api.vybtek.com/api/teacher-preferred-classes",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify({ teacher_id, preferred_class_id }),
          }
        );
        if (!response.ok)
          throw new Error(
            (await response.json()).error || "Failed to save preferred class"
          );
      }

      setSuccessMessage("Profile saved successfully! Redirecting...");
      setTimeout(() => router.push("/profile"), 2000);
    } catch (error) {
      setApiError(error.message || "Failed to save profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderInput = (
    label,
    field,
    type = "text",
    icon,
    placeholder,
    required = true,
    handler = handleInputChange
  ) => (
    <div className="mb-4">
      <label className="text-sm text-gray-900 font-medium mb-2 block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`flex items-center border ${
          errors[field] ? "border-red-500" : "border-gray-300"
        } rounded-full px-4 py-2 bg-white`}
      >
        {icon}
        <input
          type={type}
          placeholder={placeholder}
          value={formData[field]}
          onChange={(e) => handler(field, e.target.value)}
          className="w-full outline-none bg-transparent"
          disabled={isLoading}
        />
      </div>
      {errors[field] && (
        <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
      )}
    </div>
  );

  const renderSelect = (
    label,
    field,
    options,
    icon,
    required = true,
    handler = handleInputChange
  ) => (
    <div className="mb-4">
      <label className="text-sm text-gray-900 font-medium mb-2 block">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`flex items-center border ${
          errors[field] ? "border-red-500" : "border-gray-300"
        } rounded-lg px-4 py-2 bg-white`}
      >
        {icon}
        <select
          value={formData[field]}
          onChange={(e) => handler(field, e.target.value)}
          className="w-full outline-none bg-transparent"
          disabled={isLoading}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      {errors[field] && (
        <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
      )}
    </div>
  );

  const renderMultiSelect = (label, field, options, icon) => (
    <div className="mb-4">
      <label className="text-sm text-gray-900 font-medium mb-2 block">
        {label} <span className="text-red-500">*</span>
      </label>
      <div
        className={`flex items-center border ${
          errors[field] ? "border-red-500" : "border-gray-300"
        } rounded-lg px-4 py-2 bg-white`}
      >
        {icon}
        <select
          multiple
          value={formData[field]}
          onChange={(e) =>
            handleInputChange(
              field,
              Array.from(e.target.selectedOptions, (option) => option.value)
            )
          }
          className="w-full outline-none bg-transparent"
          disabled={isLoading}
        >
          {options.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.name}
            </option>
          ))}
        </select>
      </div>
      {errors[field] && (
        <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
      )}
    </div>
  );

  const renderCityDropdown = (
    label,
    field,
    value,
    handler,
    isOpen,
    setIsOpen
  ) => (
    <div className="mb-4 relative">
      <label className="text-sm text-gray-900 font-medium mb-2 block">
        {label} <span className="text-red-500">*</span>
      </label>
      <div
        className={`flex items-center justify-between border ${
          errors[field] ? "border-red-500" : "border-gray-300"
        } rounded-full px-4 py-2 bg-white cursor-pointer`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={!value ? "text-gray-500" : "text-gray-800"}>
          {value
            ? cities.find((city) => city.id === value)?.name ||
              value ||
              "Select City"
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
      {isOpen && (
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
                  onClick={() => {
                    handler(field, city.id); // Changed to city.name for string
                    setIsOpen(false);
                    setSearchTerm(""); // Clear search term after selection
                  }}
                >
                  {city.name}
                </div>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">No cities found</div>
            )}
          </div>
        </div>
      )}
      {errors[field] && (
        <p className="text-red-500 text-sm mt-1">{errors[field]}</p>
      )}
    </div>
  );

  const filteredCities = cities.filter((city) =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderStep3 = () => (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <FaHome className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900 ml-2">
          Personal Details
        </h3>
      </div>
      {renderInput(
        "Street Address",
        "street",
        "text",
        <FaHome className="w-5 h-5 text-gray-600 mr-2" />,
        "Enter street address"
      )}
      {renderCityDropdown(
        "City",
        "city_id",
        formData.city_id,
        handleInputChange,
        isCityDropdownOpen,
        setIsCityDropdownOpen
      )}
      {renderInput(
        "Postal Code",
        "postal_code",
        "text",
        <FaMapMarkerAlt className="w-5 h-5 text-gray-600 mr-2" />,
        "Enter postal code"
      )}
      {renderInput(
        "Latitude",
        "latitude",
        "number",
        <FaMapMarkerAlt className="w-5 h-5 text-gray-600 mr-2" />,
        "Enter latitude (e.g., 19.0760)"
      )}
      {renderInput(
        "Longitude",
        "longitude",
        "number",
        <FaMapMarkerAlt className="w-5 h-5 text-gray-600 mr-2" />,
        "Enter longitude (e.g., 72.8777)"
      )}
      {renderSelect(
        "Gender",
        "gender",
        [
          { value: "Male", label: "Male" },
          { value: "Female", label: "Female" },
          { value: "Other", label: "Other" },
        ],
        <FaGenderless className="w-5 h-5 text-gray-600 mr-2" />
      )}
      <div className="mb-4">
        <label className="text-sm text-gray-900 font-medium mb-2 block">
          Date of Birth <span className="text-red-500">*</span>
        </label>
        <div
          className={`flex items-center border ${
            errors.dob ? "border-red-500" : "border-gray-300"
          } rounded-full px-4 py-2 bg-white cursor-pointer`}
          onClick={() => setShowDatePicker(true)}
        >
          <FaCalendarAlt className="w-5 h-5 text-gray-600 mr-2" />
          <input
            type="text"
            value={formData.dob.toLocaleDateString("en-GB")}
            readOnly
            className="w-full outline-none bg-transparent"
            disabled={isLoading}
          />
        </div>
        {showDatePicker && (
          <input
            type="date"
            value={formData.dob.toISOString().split("T")[0]}
            onChange={(e) => handleInputChange("dob", new Date(e.target.value))}
            className="mt-2 w-full border border-gray-300 rounded-lg p-2"
            onBlur={() => setShowDatePicker(false)}
          />
        )}
        {errors.dob && (
          <p className="text-red-500 text-sm mt-1">{errors.dob}</p>
        )}
      </div>
      {renderSelect(
        "Teaching Mode",
        "mode",
        [
          { value: "online", label: "Online" },
          { value: "offline", label: "Offline" },
          { value: "both", label: "Both" },
        ],
        <FaBriefcase className="w-5 h-5 text-gray-600 mr-2" />
      )}
      {renderInput(
        "Monthly Charges (INR)",
        "charges_monthly",
        "number",
        <FaBriefcase className="w-5 h-5 text-gray-600 mr-2" />,
        "Enter monthly charges"
      )}
      {renderInput(
        "Hourly Charges (INR)",
        "charges_hourly",
        "number",
        <FaBriefcase className="w-5 h-5 text-gray-600 mr-2" />,
        "Enter hourly charges"
      )}
      <div className="mb-4">
        <label className="text-sm text-gray-900 font-medium mb-2 block">
          About <span className="text-red-500">*</span>
        </label>
        <div
          className={`flex items-center border ${
            errors.about ? "border-red-500" : "border-gray-300"
          } rounded-full px-4 py-2 bg-white`}
        >
          <FaInfoCircle className="w-5 h-5 text-gray-600 mr-2" />
          <textarea
            placeholder="Tell us about yourself"
            value={formData.about}
            onChange={(e) => handleInputChange("about", e.target.value)}
            className="w-full outline-none bg-transparent resize-none"
            rows={4}
            disabled={isLoading}
          />
        </div>
        {errors.about && (
          <p className="text-red-500 text-sm mt-1">{errors.about}</p>
        )}
      </div>
      <div className="flex items-center mb-4">
        <FaCamera className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900 ml-2">
          Profile Photo
        </h3>
      </div>
      <div className="flex flex-col items-center mb-4">
        <label className="w-24 h-24 rounded-full border border-gray-300 overflow-hidden cursor-pointer">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
            disabled={isLoading}
          />
          {formData.profile_photo ? (
            <img
              src={URL.createObjectURL(formData.profile_photo)}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-200 flex justify-center items-center flex-col">
              <FaCamera className="w-8 h-8 text-blue-600" />
              <span className="text-xs text-gray-600">Add Photo</span>
            </div>
          )}
        </label>
        <span className="text-base text-gray-900 mt-2">
          {formData.name || "Your Name"}
        </span>
      </div>
    </div>
  );

  const renderEducationModal = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
        modalVisible.education ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg p-6 max-h-[80%] w-full max-w-md overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaSchool className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 ml-2">
              {editingIndex.education !== null
                ? "Edit Education"
                : "Add Education"}
            </h3>
          </div>
          <button
            onClick={resetEducationForm}
            className="p-2 bg-gray-100 rounded-full"
          >
            <span className="text-gray-600">✕</span>
          </button>
        </div>
        {renderInput(
          "Institution",
          "institution",
          "text",
          <FaSchool className="w-5 h-5 text-gray-600 mr-2" />,
          "Enter institution",
          true,
          handleEducationChange
        )}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="text-sm text-gray-900 font-medium mb-2 block">
              From Year <span className="text-red-500">*</span>
            </label>
            <select
              value={educationForm.from_year}
              onChange={(e) =>
                handleEducationChange("from_year", e.target.value)
              }
              className={`w-full border ${
                errors.from_year ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2`}
            >
              <option value="">Select year</option>
              {Array.from(
                { length: new Date().getFullYear() - 1900 + 1 },
                (_, i) => 1900 + i
              )
                .reverse()
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
            {errors.from_year && (
              <p className="text-red-500 text-sm mt-1">{errors.from_year}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="text-sm text-gray-900 font-medium mb-2 block">
              To Year <span className="text-red-500">*</span>
            </label>
            <select
              value={educationForm.to_year}
              onChange={(e) => handleEducationChange("to_year", e.target.value)}
              className={`w-full border ${
                errors.to_year ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2`}
            >
              <option value="">Select year</option>
              {Array.from(
                { length: new Date().getFullYear() - 1900 + 2 },
                (_, i) => 1900 + i
              )
                .reverse()
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
            {errors.to_year && (
              <p className="text-red-500 text-sm mt-1">{errors.to_year}</p>
            )}
          </div>
        </div>
        {renderInput(
          "Degree",
          "degree",
          "text",
          <FaSchool className="w-5 h-5 text-gray-600 mr-2" />,
          "Enter degree (e.g., B.Tech)",
          true,
          handleEducationChange
        )}
        {renderInput(
          "Area of Study",
          "area_of_study",
          "text",
          <FaSchool className="w-5 h-5 text-gray-600 mr-2" />,
          "Enter area of study",
          false,
          handleEducationChange
        )}
        <div className="mb-4">
          <label className="text-sm text-gray-900 font-medium mb-2 block">
            Description
          </label>
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white">
            <FaSchool className="w-5 h-5 text-gray-600 mr-2" />
            <textarea
              placeholder="Description (optional)"
              value={educationForm.description}
              onChange={(e) =>
                handleEducationChange("description", e.target.value)
              }
              className="w-full outline-none bg-transparent resize-none"
              rows={3}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={saveEducation}
            disabled={isLoading}
            className={`flex-1 py-2 rounded-full transition duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isLoading
              ? "Saving..."
              : editingIndex.education !== null
              ? "Update"
              : "Add"}
          </button>
          <button
            onClick={resetEducationForm}
            className="flex-1 py-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderExperienceModal = () => (
    <div
      className={`fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center ${
        modalVisible.experience ? "" : "hidden"
      }`}
    >
      <div className="bg-white rounded-lg p-6 max-h-[80%] w-full max-w-md overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaBriefcase className="w-6 h-6 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900 ml-2">
              {editingIndex.experience !== null
                ? "Edit Experience"
                : "Add Experience"}
            </h3>
          </div>
          <button
            onClick={resetExperienceForm}
            className="p-2 bg-gray-100 rounded-full"
          >
            <span className="text-gray-600">✕</span>
          </button>
        </div>
        {renderInput(
          "Institute Name",
          "institute_name",
          "text",
          <FaSchool className="w-5 h-5 text-gray-600 mr-2" />,
          "Enter institute name",
          true,
          handleExperienceChange
        )}
        {renderInput(
          "Job Title",
          "job_title",
          "text",
          <FaBriefcase className="w-5 h-5 text-gray-600 mr-2" />,
          "Enter job title",
          true,
          handleExperienceChange
        )}
        {renderCityDropdown(
          "City",
          "city", // Changed from city_id to city
          experienceForm.city,
          handleExperienceChange,
          isExperienceCityDropdownOpen,
          setIsExperienceCityDropdownOpen
        )}
        {renderInput(
          "State",
          "state",
          "text",
          <FaMapMarkerAlt className="w-5 h-5 text-gray-600 mr-2" />,
          "Enter state",
          true,
          handleExperienceChange
        )}
        {renderInput(
          "Teaching Role",
          "teaching_role",
          "text",
          <FaBriefcase className="w-5 h-5 text-gray-600 mr-2" />,
          "Enter teaching role",
          true,
          handleExperienceChange
        )}
        <div className="flex gap-3 mb-4">
          <div className="flex-1">
            <label className="text-sm text-gray-900 font-medium mb-2 block">
              From Month <span className="text-red-500">*</span>
            </label>
            <select
              value={experienceForm.period_from_month}
              onChange={(e) =>
                handleExperienceChange("period_from_month", e.target.value)
              }
              className={`w-full border ${
                errors.period_from_month ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2`}
            >
              <option value="">Select month</option>
              {[
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ].map((month) => (
                <option key={month} value={month}>
                  {month}
                </option>
              ))}
            </select>
            {errors.period_from_month && (
              <p className="text-red-500 text-sm mt-1">
                {errors.period_from_month}
              </p>
            )}
          </div>
          <div className="flex-1">
            <label className="text-sm text-gray-900 font-medium mb-2 block">
              From Year <span className="text-red-500">*</span>
            </label>
            <select
              value={experienceForm.period_from_year}
              onChange={(e) =>
                handleExperienceChange("period_from_year", e.target.value)
              }
              className={`w-full border ${
                errors.period_from_year ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2`}
            >
              <option value="">Select year</option>
              {Array.from(
                { length: new Date().getFullYear() - 1900 + 1 },
                (_, i) => 1900 + i
              )
                .reverse()
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
            {errors.period_from_year && (
              <p className="text-red-500 text-sm mt-1">
                {errors.period_from_year}
              </p>
            )}
          </div>
        </div>
        {!experienceForm.currently_work_here && (
          <div className="flex gap-3 mb-4">
            <div className="flex-1">
              <label className="text-sm text-gray-900 font-medium mb-2 block">
                To Month <span className="text-red-500">*</span>
              </label>
              <select
                value={experienceForm.period_to_month}
                onChange={(e) =>
                  handleExperienceChange("period_to_month", e.target.value)
                }
                className={`w-full border ${
                  errors.period_to_month ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2`}
              >
                <option value="">Select month</option>
                {[
                  "January",
                  "February",
                  "March",
                  "April",
                  "May",
                  "June",
                  "July",
                  "August",
                  "September",
                  "October",
                  "November",
                  "December",
                ].map((month) => (
                  <option key={month} value={month}>
                    {month}
                  </option>
                ))}
              </select>
              {errors.period_to_month && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.period_to_month}
                </p>
              )}
            </div>
            <div className="flex-1">
              <label className="text-sm text-gray-900 font-medium mb-2 block">
                To Year <span className="text-red-500">*</span>
              </label>
              <select
                value={experienceForm.period_to_year}
                onChange={(e) =>
                  handleExperienceChange("period_to_year", e.target.value)
                }
                className={`w-full border ${
                  errors.period_to_year ? "border-red-500" : "border-gray-300"
                } rounded-lg p-2`}
              >
                <option value="">Select year</option>
                {Array.from(
                  { length: new Date().getFullYear() - 1900 + 2 },
                  (_, i) => 1900 + i
                )
                  .reverse()
                  .map((year) => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
              </select>
              {errors.period_to_year && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.period_to_year}
                </p>
              )}
            </div>
          </div>
        )}
        <div className="mb-4">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={experienceForm.currently_work_here}
              onChange={(e) =>
                handleExperienceChange("currently_work_here", e.target.checked)
              }
              className="mr-2"
            />
            <span className="text-sm text-gray-900">I currently work here</span>
          </label>
        </div>
        <div className="mb-4">
          <label className="text-sm text-gray-900 font-medium mb-2 block">
            Description
          </label>
          <div className="flex items-center border border-gray-300 rounded-full px-4 py-2 bg-white">
            <FaBriefcase className="w-5 h-5 text-gray-600 mr-2" />
            <textarea
              placeholder="Description (optional)"
              value={experienceForm.description}
              onChange={(e) =>
                handleExperienceChange("description", e.target.value)
              }
              className="w-full outline-none bg-transparent resize-none"
              rows={3}
            />
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={saveExperience}
            disabled={isLoading}
            className={`flex-1 py-2 rounded-full transition duration-200 ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            } text-white`}
          >
            {isLoading
              ? "Saving..."
              : editingIndex.experience !== null
              ? "Update"
              : "Add"}
          </button>
          <button
            onClick={resetExperienceForm}
            className="flex-1 py-2 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );

  const renderStep4 = () => (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <FaSchool className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900 ml-2">Education</h3>
      </div>
      <button
        onClick={() =>
          setModalVisible((prev) => ({ ...prev, education: true }))
        }
        className="w-full py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 mb-3"
      >
        Add Education
      </button>
      {formData.educations.length > 0 && (
        <div className="mt-3">
          {formData.educations.map((edu, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-3 mb-3 border border-gray-300"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">
                    {edu.institution}
                  </p>
                  <p className="text-sm text-gray-600">
                    Degree: {edu.degree} ({edu.from_year} - {edu.to_year})
                  </p>
                  <p className="text-sm text-gray-600">
                    Area: {edu.area_of_study || "N/A"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Description: {edu.description || "N/A"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditEducation(index)}
                    className="p-2 bg-gray-100 rounded-full"
                  >
                    <span className="text-blue-600">✏️</span>
                  </button>
                  <button
                    onClick={() => handleDeleteEducation(index)}
                    className="p-2 bg-gray-100 rounded-full"
                  >
                    <span className="text-red-600">🗑️</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderStep5 = () => (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <FaBriefcase className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900 ml-2">Experience</h3>
      </div>
      <button
        onClick={() =>
          setModalVisible((prev) => ({ ...prev, experience: true }))
        }
        className="w-full py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 mb-3"
      >
        Add Experience
      </button>
      {formData.experiences.length > 0 && (
        <div className="mt-3">
          {formData.experiences.map((exp, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-3 mb-3 border border-gray-300"
            >
              <div className="flex justify-between items-center">
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium">
                    {exp.institute_name} - {exp.job_title}
                  </p>
                  <p className="text-sm text-gray-600">
                    City: {exp.city || "N/A"}, State: {exp.state}
                  </p>
                  <p className="text-sm text-gray-600">
                    Role: {exp.teaching_role}
                  </p>
                  <p className="text-sm text-gray-600">
                    Period: {exp.period_from_month} {exp.period_from_year} -{" "}
                    {exp.currently_work_here
                      ? "Present"
                      : `${exp.period_to_month} ${exp.period_to_year}`}
                  </p>
                  <p className="text-sm text-gray-600">
                    Description: {exp.description || "N/A"}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEditExperience(index)}
                    className="p-2 bg-gray-100 rounded-full"
                  >
                    <span className="text-blue-600">✏️</span>
                  </button>
                  <button
                    onClick={() => handleDeleteExperience(index)}
                    className="p-2 bg-gray-100 rounded-full"
                  >
                    <span className="text-red-600">🗑️</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  const renderStep6 = () => (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <FaBookOpen className="w-6 h-6 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900 ml-2">
          Categories, Subjects & Classes
        </h3>
      </div>
      {renderMultiSelect(
        "Categories",
        "categories",
        availableCategories,
        <FaBookOpen className="w-5 h-5 text-gray-600 mr-2" />
      )}
      {renderMultiSelect(
        "Subjects",
        "subjects",
        availableSubjects,
        <FaBookOpen className="w-5 h-5 text-gray-600 mr-2" />
      )}
      {renderMultiSelect(
        "Preferred Classes",
        "preferred_classes",
        availableClasses,
        <FaBookOpen className="w-5 h-5 text-gray-600 mr-2" />
      )}
    </div>
  );

  return (
    <div className="flex justify-center items-center py-20 bg-gray-100 min-h-screen">
      <div className="bg-white p-8 w-full max-w-2xl rounded-lg shadow-md">
        <div className="bg-blue-600 py-6 px-4 mb-4 rounded-t-lg">
          <div className="flex items-center justify-center relative">
            <button
              onClick={() => router.push("/")}
              className="absolute left-0 p-2 bg-white/30 rounded-full"
            >
              <span className="text-white">←</span>
            </button>
            <div className="text-center">
              <h2 className="text-xl font-semibold text-white">
                Teacher Registration
              </h2>
              <p className="text-sm text-gray-200">Step {step - 2} of 4</p>
            </div>
          </div>
        </div>

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

        <div style={fadeAnim.current}>
          {step === 3 && renderStep3()}
          {step === 4 && renderStep4()}
          {step === 5 && renderStep5()}
          {step === 6 && renderStep6()}
          <div className="flex justify-between mt-4 gap-3">
            <button
              onClick={() => setStep(step - 1)}
              disabled={step === 3 || isLoading}
              className={`py-2 px-4 rounded-full transition duration-200 ${
                step === 3 || isLoading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gray-600 hover:bg-gray-700"
              } text-white`}
            >
              Previous
            </button>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/")}
                className="py-2 px-4 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50"
              >
                Cancel
              </button>
              <button
                onClick={handleNext}
                disabled={isLoading}
                className={`py-2 px-4 rounded-full transition duration-200 ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                } text-white`}
              >
                {isLoading ? "Processing..." : step === 6 ? "Complete" : "Next"}
              </button>
            </div>
          </div>
          <hr className="my-4 border-gray-300" />
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Sign In
            </a>
          </p>
        </div>

        {renderEducationModal()}
        {renderExperienceModal()}
      </div>
    </div>
  );
};

export default TutorSteps;
