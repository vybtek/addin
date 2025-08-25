"use client";
import React, { useState, useCallback, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PostRequirement() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    title: "",
    studentName: "",
    class_level: "",
    school_name: "",
    board_id: "",
    category: "",
    specialties: [],
    customSpecialty: "",
    subjects: [],
    subjects_labels: [],
    preferred_gender: "",
    experience_level: "",
    require_cover_letter: false,
    visibility: "Anyone",
    total_students_required: 1,
    payment_type: "Hourly",
    budget: "",
    project_duration: "",
    hours_required: "",
    address: "",
    city_id: null,
    availability: "",
    special_notes: "",
  });
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ visible: false, message: "" });
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [errorCategories, setErrorCategories] = useState(null);
  const [subjects, setSubjects] = useState([]);
  const [loadingSubjects, setLoadingSubjects] = useState(true);
  const [errorSubjects, setErrorSubjects] = useState(null);
  const [cities, setCities] = useState([]);
  const [loadingCities, setLoadingCities] = useState(true);
  const [errorCities, setErrorCities] = useState(null);
  const [boards, setBoards] = useState([]);
  const [loadingBoards, setLoadingBoards] = useState(true);
  const [errorBoards, setErrorBoards] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [jobPostId, setJobPostId] = useState(null); // Store job post ID after submission

  const experienceLevels = ["Beginner", "Intermediate", "Expert"];
  const preferredGenders = ["Male", "Female", "No Preference"];
  const paymentTypes = ["Hourly", "Fixed"];
  const visibilities = ["Anyone", "Registered Users"];
  const availabilities = ["Weekdays 4-6 PM", "Weekends", "Flexible", "Other"];

  useEffect(() => {
    // Check authentication status
    const token = localStorage.getItem("authToken");
    let user_id;
    try {
      user_id = token ? JSON.parse(atob(token.split(".")[1])).id : null;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
    setIsAuthenticated(!!user_id);
    console.log("isAuthenticated:", !!user_id, "Token:", token);

    // Fetch categories
    const fetchCategories = async () => {
      try {
        setLoadingCategories(true);
        const response = await fetch(
          "https://api.vybtek.com/api/categories"
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          const categoryNames = data.data.map((cat) => cat.name).sort();
          setCategories(categoryNames);
        } else {
          throw new Error("Invalid categories data");
        }
      } catch (error) {
        console.error("Error fetching categories:", error.message);
        setErrorCategories("Failed to load categories.");
        setCategories([]);
      } finally {
        setLoadingCategories(false);
      }
    };

    // Fetch subjects
    const fetchSubjects = async () => {
      try {
        setLoadingSubjects(true);
        const response = await fetch("https://api.vybtek.com/api/subjects");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setSubjects(data.data);
        } else {
          throw new Error("Invalid subjects data");
        }
      } catch (error) {
        console.error("Error fetching subjects:", error.message);
        setErrorSubjects("Failed to load subjects.");
        setSubjects([]);
      } finally {
        setLoadingSubjects(false);
      }
    };

    // Fetch cities
    const fetchCities = async () => {
      try {
        setLoadingCities(true);
        const response = await fetch("https://api.vybtek.com/api/cities");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setCities(data.data);
        } else {
          throw new Error("Invalid cities data");
        }
      } catch (error) {
        console.error("Error fetching cities:", error.message);
        setErrorCities("Failed to load cities.");
        setCities([]);
      } finally {
        setLoadingCities(false);
      }
    };

    // Fetch boards
    const fetchBoards = async () => {
      try {
        setLoadingBoards(true);
        const response = await fetch("https://api.vybtek.com/api/boards");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setBoards(data.data);
        } else {
          throw new Error("Invalid boards data");
        }
      } catch (error) {
        console.error("Error fetching boards:", error.message);
        setErrorBoards("Failed to load boards.");
        setBoards([]);
      } finally {
        setLoadingBoards(false);
      }
    };

    fetchCategories();
    fetchSubjects();
    fetchCities();
    fetchBoards();
  }, []);

  // Pre-select board_id and category when data is loaded
  useEffect(() => {
    if (boards.length > 0 && !form.board_id) {
      setForm((prev) => ({ ...prev, board_id: boards[0]?.id || "" }));
    }
    if (categories.length > 0 && !form.category) {
      setForm((prev) => ({ ...prev, category: categories[0] || "" }));
    }
  }, [boards, categories]);

  const handleInputChange = (key, value) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSpecialtyToggle = (specialty) => {
    setForm((prev) => {
      const specialties = prev.specialties.includes(specialty)
        ? prev.specialties.filter((s) => s !== specialty)
        : [...prev.specialties, specialty];
      return { ...prev, specialties };
    });
  };

  const handleSubjectToggle = (subjectId, subjectName) => {
    setForm((prev) => {
      const subjects = prev.subjects.includes(subjectId)
        ? prev.subjects.filter((s) => s !== subjectId)
        : [...prev.subjects, subjectId];
      const subjects_labels = prev.subjects_labels.includes(subjectName)
        ? prev.subjects_labels.filter((s) => s !== subjectName)
        : [...prev.subjects_labels, subjectName];
      return { ...prev, subjects, subjects_labels };
    });
  };

  const handleCustomSpecialty = () => {
    if (
      form.customSpecialty &&
      !form.specialties.includes(form.customSpecialty)
    ) {
      setForm((prev) => ({
        ...prev,
        specialties: [...prev.specialties, form.customSpecialty],
        customSpecialty: "",
      }));
    }
  };

  const validateStep = (currentStep) => {
    if (currentStep === 1) {
      console.log("Validating step 1:", {
        studentName: form.studentName,
        class_level: form.class_level,
        school_name: form.school_name,
        board_id: form.board_id,
        category: form.category,
      });
      return (
        form.studentName &&
        form.class_level &&
        form.school_name &&
        form.board_id &&
        form.category
      );
    } else if (currentStep === 2) {
      return (
        form.specialties.length > 0 &&
        form.subjects.length > 0 &&
        form.experience_level &&
        form.preferred_gender &&
        form.require_cover_letter !== undefined
      );
    } else if (currentStep === 3) {
      return (
        form.budget &&
        form.project_duration &&
        form.hours_required &&
        form.availability &&
        form.address &&
        form.city_id &&
        form.special_notes
      );
    }
    return true;
  };

  const handleNext = () => {
    console.log("handleNext called, step:", step);
    console.log("Form state:", form);
    console.log("isAuthenticated:", isAuthenticated);
    console.log("Validation result:", validateStep(step));
    console.log("Loading states:", {
      loading,
      loadingCategories,
      loadingBoards,
      loadingSubjects,
      loadingCities,
    });
    if (!isAuthenticated) {
      setSnackbar({ visible: true, message: "Please log in to continue." });
      setTimeout(() => router.push("/login"), 2000);
      return;
    }
    if (!validateStep(step)) {
      setSnackbar({
        visible: true,
        message: "Please fill in all required fields.",
      });
      return;
    }
    setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.push("/jobs");
    }
  };

  const addToFavorites = async (jobPostId) => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      setSnackbar({
        visible: true,
        message: "Please log in to add to favorites.",
      });
      setTimeout(() => router.push("/login"), 2000);
      return;
    }

    try {
      const response = await fetch(
        "https://api.vybtek.com/api/job-post-favorites",
        {
          method: "POST",
          headers: {
            Accept: "*/*",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            job_post_id: jobPostId,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        setSnackbar({ visible: true, message: "Job added to favorites!" });
      } else {
        throw new Error(data.message || "Failed to add job to favorites.");
      }
    } catch (error) {
      console.error("Error adding job to favorites:", error);
      setSnackbar({
        visible: true,
        message:
          error.message || "Failed to add job to favorites. Please try again.",
      });
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!isAuthenticated) {
      setSnackbar({ visible: true, message: "Please log in to post a job." });
      setTimeout(() => router.push("/login"), 2000);
      return;
    }
    if (!validateStep(step)) {
      setSnackbar({
        visible: true,
        message: "Please fill in all required fields.",
      });
      return;
    }

    const token = localStorage.getItem("authToken");
    let user_id;
    try {
      user_id = token ? JSON.parse(atob(token.split(".")[1])).id : null;
    } catch (error) {
      console.error("Error decoding token:", error);
      setSnackbar({
        visible: true,
        message: "Invalid token. Please log in again.",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return;
    }

    if (!user_id) {
      setSnackbar({
        visible: true,
        message: "User not logged in. Please log in to post a job.",
      });
      setTimeout(() => {
        router.push("/login");
      }, 2000);
      return;
    }

    setLoading(true);
    try {
      const boardName = boards.find((b) => b.id === form.board_id)?.name || "";
      const title = `Tutor for ${[
        form.class_level ? `Class: ${form.class_level}` : "",
        boardName ? `Board: ${boardName}` : "",
        form.subjects_labels.length ? form.subjects_labels.join(", ") : "",
        form.preferred_gender ? `Gender: ${form.preferred_gender}` : "",
        form.school_name ? `School: ${form.school_name}` : "",
        form.address
          ? `Location: ${form.address}${
              form.city_id
                ? `, ${cities.find((c) => c.id === form.city_id)?.name || ""}`
                : ""
            }`
          : "",
      ]
        .filter(Boolean)
        .join(" | ")} | Addins - teaching jobs`;

      const payload = {
        user_id,
        board_id: form.board_id,
        city_id: form.city_id || null,
        class_level: form.class_level,
        subjects: form.subjects,
        subjects_labels: form.subjects_labels,
        specialties: form.specialties,
        preferred_gender: form.preferred_gender,
        school_name: form.school_name,
        address: form.address,
        availability: form.availability,
        budget: parseFloat(form.budget).toFixed(2),
        category: form.category,
        experience_level: form.experience_level,
        require_cover_letter: form.require_cover_letter ? 1 : 0,
        visibility: form.visibility,
        total_students_required: form.total_students_required,
        payment_type: form.payment_type,
        project_duration: form.project_duration,
        hours_required: form.hours_required,
        state: cities.find((c) => c.id === form.city_id)?.name || "",
        special_notes: form.special_notes,
        title,
      };

      const response = await fetch("https://api.vybtek.com/api/job-posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        setSnackbar({ visible: true, message: data.message });
        const jobPostId = data.data?.id; // Assuming job_post_id is in data.data.id
        setJobPostId(jobPostId); // Store job post ID for favorite button
        setForm({
          title: "",
          studentName: "",
          class_level: "",
          school_name: "",
          board_id: "",
          category: categories[0] || "",
          specialties: [],
          customSpecialty: "",
          subjects: [],
          subjects_labels: [],
          preferred_gender: "",
          experience_level: "",
          require_cover_letter: false,
          visibility: "Anyone",
          total_students_required: 1,
          payment_type: "Hourly",
          budget: "",
          project_duration: "",
          hours_required: "",
          address: "",
          city_id: null,
          availability: "",
          special_notes: "",
        });
        setStep(1);
        // Do not redirect immediately to allow favorite action
      } else {
        throw new Error(data.message || "Failed to post job.");
      }
    } catch (error) {
      console.error("Error posting requirement:", error);
      if (
        error.message.includes("foreign key constraint fails") ||
        error.message.includes("Invalid user_id") ||
        error.message.includes("Invalid board_id") ||
        error.message.includes("Invalid city_id")
      ) {
        setSnackbar({
          visible: true,
          message:
            "Invalid data provided. Please log in again or check selections.",
        });
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      } else {
        setSnackbar({
          visible: true,
          message:
            error.message || "Failed to post requirement. Please try again.",
        });
      }
    } finally {
      setLoading(false);
    }
  }, [form, router, categories, cities, boards, isAuthenticated]);

  const renderStepIndicator = () => (
    <div className="flex items-center justify-between mb-8 px-4 max-w-md mx-auto">
      {[1, 2, 3].map((s) => (
        <div key={s} className="flex flex-col items-center relative z-10">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center border-4 ${
              step >= s
                ? "border-blue-500 bg-white text-blue-600"
                : "border-gray-200 bg-gray-100 text-gray-400"
            } transition-all duration-300`}
          >
            <span className="font-bold text-lg">{s}</span>
          </div>
          <span
            className={`text-xs mt-2 font-medium ${
              step >= s ? "text-blue-600" : "text-gray-500"
            }`}
          >
            {s === 1 ? "Student Info" : s === 2 ? "Tutor Details" : "Finalize"}
          </span>
        </div>
      ))}
      <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 mx-12">
        <div
          className={`h-full bg-blue-500 transition-all duration-500 ${
            step === 1 ? "w-0" : step === 2 ? "w-1/2" : "w-full"
          }`}
        ></div>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 transition-all duration-300 transform hover:shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
        Student Information
      </h2>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Student Name *
          </label>
          <input
            type="text"
            placeholder="Enter student's full name"
            value={form.studentName}
            onChange={(e) => handleInputChange("studentName", e.target.value)}
            suppressHydrationWarning // Temporary fix for hydration mismatch
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Class Level *
            </label>
            <input
              type="text"
              placeholder="e.g., 10th Grade"
              value={form.class_level}
              onChange={(e) => handleInputChange("class_level", e.target.value)}
              suppressHydrationWarning // Temporary fix for hydration mismatch
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              School Name *
            </label>
            <input
              type="text"
              placeholder="e.g., ABC Public School"
              value={form.school_name}
              onChange={(e) => handleInputChange("school_name", e.target.value)}
              suppressHydrationWarning // Temporary fix for hydration mismatch
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Board *
            </label>
            {loadingBoards ? (
              <div className="animate-pulse h-12 rounded-lg bg-gray-100"></div>
            ) : errorBoards ? (
              <p className="text-red-500 text-sm">{errorBoards}</p>
            ) : (
              <select
                value={form.board_id}
                onChange={(e) => handleInputChange("board_id", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
              >
                <option value="">Select Board</option>
                {boards.map((board) => (
                  <option key={board.id} value={board.id}>
                    {board.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            {loadingCategories ? (
              <div className="animate-pulse h-12 rounded-lg bg-gray-100"></div>
            ) : errorCategories ? (
              <p className="text-red-500 text-sm">{errorCategories}</p>
            ) : (
              <select
                value={form.category}
                onChange={(e) => handleInputChange("category", e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 transition-all duration-300 transform hover:shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
        Tutor Requirements
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subjects Needed * (Select one or more)
          </label>
          {loadingSubjects ? (
            <div className="animate-pulse h-24 rounded-lg bg-gray-100"></div>
          ) : errorSubjects ? (
            <p className="text-red-500 text-sm">{errorSubjects}</p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => handleSubjectToggle(subject.id, subject.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    form.subjects.includes(subject.id)
                      ? "bg-blue-100 text-blue-700 border border-blue-300"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
                  }`}
                >
                  {subject.name}
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Special Skills Needed
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Add custom skill (e.g., Dyslexia specialist)"
              value={form.customSpecialty}
              onChange={(e) =>
                handleInputChange("customSpecialty", e.target.value)
              }
              suppressHydrationWarning // Temporary fix for hydration mismatch
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
            <button
              onClick={handleCustomSpecialty}
              disabled={!form.customSpecialty}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors"
            >
              Add
            </button>
          </div>
          {form.specialties.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {form.specialties.map((specialty) => (
                <div
                  key={specialty}
                  className="flex items-center bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
                >
                  {specialty}
                  <button
                    onClick={() => handleSpecialtyToggle(specialty)}
                    className="ml-2 text-blue-500 hover:text-blue-700"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Preferred Gender *
            </label>
            <div className="space-y-2">
              {preferredGenders.map((gender) => (
                <label
                  key={gender}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="preferred_gender"
                    value={gender}
                    checked={form.preferred_gender === gender}
                    onChange={(e) =>
                      handleInputChange("preferred_gender", e.target.value)
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    suppressHydrationWarning // Temporary fix for hydration mismatch
                  />
                  <span className="text-gray-700">{gender}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Experience Level *
            </label>
            <div className="space-y-2">
              {experienceLevels.map((level) => (
                <label
                  key={level}
                  className="flex items-center space-x-3 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="experience_level"
                    value={level}
                    checked={form.experience_level === level}
                    onChange={(e) =>
                      handleInputChange("experience_level", e.target.value)
                    }
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                    suppressHydrationWarning // Temporary fix for hydration mismatch
                  />
                  <span className="text-gray-700">{level}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="coverLetter"
            checked={form.require_cover_letter}
            onChange={(e) =>
              handleInputChange("require_cover_letter", e.target.checked)
            }
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            suppressHydrationWarning // Temporary fix for hydration mismatch
          />
          <label
            htmlFor="coverLetter"
            className="ml-2 block text-sm font-medium text-gray-700"
          >
            Require Cover Letter *
          </label>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-6 transition-all duration-300 transform hover:shadow-md">
      <h2 className="text-xl font-bold text-gray-800 mb-6 pb-2 border-b border-gray-100">
        Final Details
      </h2>
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Availability *
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {availabilities.map((availability) => (
              <button
                key={availability}
                onClick={() => handleInputChange("availability", availability)}
                className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                  form.availability === availability
                    ? "bg-blue-100 text-blue-700 border-blue-300"
                    : "bg-gray-50 text-gray-700 hover:bg-gray-100 border-gray-200"
                }`}
              >
                {availability}
              </button>
            ))}
          </div>
          {form.availability === "Other" && (
            <input
              type="text"
              placeholder="Specify your availability"
              value={form.availability}
              onChange={(e) =>
                handleInputChange("availability", e.target.value)
              }
              suppressHydrationWarning // Temporary fix for hydration mismatch
              className="mt-3 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget (₹) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">₹</span>
              <input
                type="number"
                placeholder="500"
                value={form.budget}
                onChange={(e) => handleInputChange("budget", e.target.value)}
                suppressHydrationWarning // Temporary fix for hydration mismatch
                className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Duration *
            </label>
            <input
              type="text"
              placeholder="e.g., 3 months"
              value={form.project_duration}
              onChange={(e) =>
                handleInputChange("project_duration", e.target.value)
              }
              suppressHydrationWarning // Temporary fix for hydration mismatch
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hours Required *
            </label>
            <input
              type="text"
              placeholder="e.g., 10 hours"
              value={form.hours_required}
              onChange={(e) =>
                handleInputChange("hours_required", e.target.value)
              }
              suppressHydrationWarning // Temporary fix for hydration mismatch
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address *
          </label>
          <input
            type="text"
            placeholder="Full address with landmarks"
            value={form.address}
            onChange={(e) => handleInputChange("address", e.target.value)}
            suppressHydrationWarning // Temporary fix for hydration mismatch
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City *
          </label>
          {loadingCities ? (
            <div className="animate-pulse h-12 rounded-lg bg-gray-100"></div>
          ) : errorCities ? (
            <p className="text-red-500 text-sm">{errorCities}</p>
          ) : (
            <select
              value={form.city_id || ""}
              onChange={(e) =>
                handleInputChange("city_id", e.target.value || null)
              }
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Special Notes *
          </label>
          <textarea
            placeholder="Any additional requirements or information..."
            value={form.special_notes}
            onChange={(e) => handleInputChange("special_notes", e.target.value)}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all min-h-[120px]"
            rows="4"
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 pb-12 py-12">
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 pt-16 pb-10 px-4 shadow-md">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-white mb-2">
            Post Your Tutoring Requirement
          </h1>
          <p className="text-blue-100 max-w-2xl mx-auto">
            Fill in the details below to find the perfect tutor for your needs
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 -mt-8">
        {renderStepIndicator()}

        <div className="step-content transition-opacity duration-300">
          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}
          {step === 3 && renderStep3()}
        </div>

        <div className="flex flex-col sm:flex-row justify-between gap-4 mt-8">
          <button
            onClick={handleBack}
            suppressHydrationWarning // Temporary fix for hydration mismatch
            className="px-6 py-3 border border-gray-300 rounded-xl font-medium text-gray-700 hover:bg-gray-50 transition-colors flex-1 sm:flex-none sm:w-auto"
          >
            {step === 1 ? "Cancel" : "Back"}
          </button>

          {step < 3 ? (
            <button
              onClick={handleNext}
              disabled={
                loading ||
                !isAuthenticated ||
                loadingCategories ||
                loadingBoards ||
                loadingSubjects ||
                loadingCities
              }
              className={`px-6 py-3 rounded-xl font-medium text-white transition-colors flex-1 sm:flex-none sm:w-auto ${
                loading ||
                !isAuthenticated ||
                loadingCategories ||
                loadingBoards ||
                loadingSubjects ||
                loadingCities
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Continue
            </button>
          ) : (
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={handleSubmit}
                disabled={
                  loading ||
                  !isAuthenticated ||
                  loadingCategories ||
                  loadingBoards ||
                  loadingSubjects ||
                  loadingCities
                }
                className={`px-6 py-3 rounded-xl font-medium text-white transition-colors flex-1 sm:flex-none sm:w-auto ${
                  loading ||
                  !isAuthenticated ||
                  loadingCategories ||
                  loadingBoards ||
                  loadingSubjects ||
                  loadingCities
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
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
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  "Submit Requirement"
                )}
              </button>
              {jobPostId && (
                <button
                  onClick={() => addToFavorites(jobPostId)}
                  className="px-6 py-3 rounded-xl font-medium text-white bg-yellow-500 hover:bg-yellow-600 transition-colors flex-1 sm:flex-none sm:w-auto"
                >
                  Add to Favorites
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {snackbar.visible && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center max-w-md mx-4">
          <span>{snackbar.message}</span>
          <button
            onClick={() => setSnackbar({ visible: false, message: "" })}
            className="ml-4 text-white hover:text-blue-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
