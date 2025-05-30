Photo Gallery page content:
const handleUpload = async () => {
  if (selectedFiles.length + galleryImages.length > 16) {
    alert("Only 16 photos can be added in the system.");
    return;
  }

  const formData = new FormData();
  selectedFiles.forEach(file => {
    formData.append('images', file);
  });

  try {
    const response = await fetch('/api/upload-images', {
      method: 'POST',
      body: formData,
    });

    const uploadedImages = await response.json();
    addImages(uploadedImages);
    setSelectedFiles([]);
  } catch (error) {
    alert('Error uploading images: ' + error.message);
  }
};

Draggable gallery item component


<!-- profile page code -->
"use client";
import { useState } from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaShareAlt, FaEdit, FaCopy } from 'react-icons/fa';

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState({
    title: false,
    about: false,
    classes: false,
    teaching: false,
    education: false,
    awards: false,
    location: false,
    hourlyRate: false,
    availability: false,
    teachingMode: false,
    language: false,
  });

  const [profileData, setProfileData] = useState({
    title: 'Enter your title',
    about: '',
    classes: '',
    teaching: [],
    education: [],
    awards: [],
    location: '',
    hourlyRate: '',
    workingHours: '0.00',
    earned: '₹0.00',
    classesCount: '0',
    availability: '',
    teachingMode: '',
    language: '',
  });

  const [modalData, setModalData] = useState({
    title: '',
    about: '',
    classes: '',
    teaching: { institute: '', jobTitle: '', city: '', state: '', role: '', fromMonth: '', fromYear: '', toMonth: '', toYear: '', currentlyWorking: false, description: '' },
    education: { institute: '', fromYear: '', toYear: '', degree: '', areaOfStudy: '', description: '' },
    awards: { title: '', category: '', url: '', completionDate: '', overview: '' },
    location: { mapLocation: '', areaName: '' },
    hourlyRate: { type: 'hourly', rate: '' },
    availability: { status: 'available', hours: '' },
    teachingMode: 'online',
    language: '',
  });

  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState(null);

  const validateField = (section, field, value) => {
    let error = '';
    if (section === 'title' && !value.trim()) error = 'Title is required';
    if (section === 'about' && value.length > 500) error = 'About section cannot exceed 500 characters';
    if (section === 'classes' && !value.trim()) error = 'Classes/Subjects is required';
    if (section === 'teaching') {
      if (field === 'institute' && !value.trim()) error = 'Institute name is required';
      if (field === 'jobTitle' && !value.trim()) error = 'Job title is required';
      if (field === 'city' && !value) error = 'City is required';
      if (field === 'state' && !value) error = 'State is required';
      if (field === 'role' && !value) error = 'Role is required';
      if (field === 'fromMonth' && !value) error = 'Start month is required';
      if (field === 'fromYear' && !value) error = 'Start year is required';
      if (!modalData.teaching.currentlyWorking && field === 'toMonth' && !value) error = 'End month is required';
      if (!modalData.teaching.currentlyWorking && field === 'toYear' && !value) error = 'End year is required';
    }
    if (section === 'education') {
      if (field === 'institute' && !value.trim()) error = 'Institute name is required';
      if (field === 'fromYear' && !value) error = 'Start year is required';
      if (field === 'toYear' && !value) error = 'End year is required';
    }
    if (section === 'awards') {
      if (field === 'title' && !value.trim()) error = 'Project title is required';
      if (field === 'category' && !value) error = 'Category is required';
    }
    if (section === 'location' && field === 'areaName' && !value.trim()) error = 'Area name is required';
    if (section === 'hourlyRate' && field === 'rate' && (!value || isNaN(value) || value <= 0)) error = 'Valid rate is required';
    if (section === 'availability' && field === 'status' && !value) error = 'Availability status is required';
    if (section === 'language' && !value.trim()) error = 'Language is required';
    return error;
  };

  const handleEditToggle = (section) => {
    setIsEditing((prev) => ({ ...prev, [section]: !prev[section] }));
    setErrors({});
    if (section === 'title') setModalData((prev) => ({ ...prev, title: profileData.title }));
    if (section === 'about') setModalData((prev) => ({ ...prev, about: profileData.about }));
    if (section === 'classes') setModalData((prev) => ({ ...prev, classes: profileData.classes }));
    if (section === 'teaching') setModalData((prev) => ({ ...prev, teaching: { institute: '', jobTitle: '', city: '', state: '', role: '', fromMonth: '', fromYear: '', toMonth: '', toYear: '', currentlyWorking: false, description: '' } }));
    if (section === 'education') setModalData((prev) => ({ ...prev, education: { institute: '', fromYear: '', toYear: '', degree: '', areaOfStudy: '', description: '' } }));
    if (section === 'awards') setModalData((prev) => ({ ...prev, awards: { title: '', category: '', url: '', completionDate: '', overview: '' } }));
    if (section === 'location') setModalData((prev) => ({ ...prev, location: { mapLocation: profileData.location, areaName: profileData.location } }));
    if (section === 'hourlyRate') setModalData((prev) => ({ ...prev, hourlyRate: { type: 'hourly', rate: profileData.hourlyRate } }));
    if (section === 'availability') setModalData((prev) => ({ ...prev, availability: { status: profileData.availability || 'available', hours: '' } }));
    if (section === 'teachingMode') setModalData((prev) => ({ ...prev, teachingMode: profileData.teachingMode || 'online' }));
    if (section === 'language') setModalData((prev) => ({ ...prev, language: profileData.language }));
  };

  const handleModalChange = (section, field, value) => {
    setModalData((prev) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value },
    }));
    setErrors((prev) => ({ ...prev, [field]: validateField(section, field, value) }));
  };

  const handleSave = (section) => {
    const sectionErrors = {};
    if (section === 'title') sectionErrors.title = validateField('title', 'title', modalData.title);
    if (section === 'about') sectionErrors.about = validateField('about', 'about', modalData.about);
    if (section === 'classes') sectionErrors.classes = validateField('classes', 'classes', modalData.classes);
    if (section === 'teaching') {
      sectionErrors.institute = validateField('teaching', 'institute', modalData.teaching.institute);
      sectionErrors.jobTitle = validateField('teaching', 'jobTitle', modalData.teaching.jobTitle);
      sectionErrors.city = validateField('teaching', 'city', modalData.teaching.city);
      sectionErrors.state = validateField('teaching', 'state', modalData.teaching.state);
      sectionErrors.role = validateField('teaching', 'role', modalData.teaching.role);
      sectionErrors.fromMonth = validateField('teaching', 'fromMonth', modalData.teaching.fromMonth);
      sectionErrors.fromYear = validateField('teaching', 'fromYear', modalData.teaching.fromYear);
      if (!modalData.teaching.currentlyWorking) {
        sectionErrors.toMonth = validateField('teaching', 'toMonth', modalData.teaching.toMonth);
        sectionErrors.toYear = validateField('teaching', 'toYear', modalData.teaching.toYear);
      }
    }
    if (section === 'education') {
      sectionErrors.institute = validateField('education', 'institute', modalData.education.institute);
      sectionErrors.fromYear = validateField('education', 'fromYear', modalData.education.fromYear);
      sectionErrors.toYear = validateField('education', 'toYear', modalData.education.toYear);
    }
    if (section === 'awards') {
      sectionErrors.title = validateField('awards', 'title', modalData.awards.title);
      sectionErrors.category = validateField('awards', 'category', modalData.awards.category);
    }
    if (section === 'location') sectionErrors.areaName = validateField('location', 'areaName', modalData.location.areaName);
    if (section === 'hourlyRate') sectionErrors.rate = validateField('hourlyRate', 'rate', modalData.hourlyRate.rate);
    if (section === 'availability') sectionErrors.status = validateField('availability', 'status', modalData.availability.status);
    if (section === 'language') sectionErrors.language = validateField('language', 'language', modalData.language);

    if (Object.values(sectionErrors).some((error) => error)) {
      setErrors(sectionErrors);
      setToast({ message: 'Please fix the errors before saving.', type: 'error' });
      setTimeout(() => setToast(null), 3000);
      return;
    }

    if (section === 'title') setProfileData((prev) => ({ ...prev, title: modalData.title }));
    if (section === 'about') setProfileData((prev) => ({ ...prev, about: modalData.about }));
    if (section === 'classes') setProfileData((prev) => ({ ...prev, classes: modalData.classes }));
    if (section === 'teaching') setProfileData((prev) => ({ ...prev, teaching: [...prev.teaching, modalData.teaching] }));
    if (section === 'education') setProfileData((prev) => ({ ...prev, education: [...prev.education, modalData.education] }));
    if (section === 'awards') setProfileData((prev) => ({ ...prev, awards: [...prev.awards, modalData.awards] }));
    if (section === 'location') setProfileData((prev) => ({ ...prev, location: modalData.location.areaName }));
    if (section === 'hourlyRate') setProfileData((prev) => ({ ...prev, hourlyRate: modalData.hourlyRate.rate }));
    if (section === 'availability') setProfileData((prev) => ({ ...prev, availability: modalData.availability.status }));
    if (section === 'teachingMode') setProfileData((prev) => ({ ...prev, teachingMode: modalData.teachingMode }));
    if (section === 'language') setProfileData((prev) => ({ ...prev, language: modalData.language }));

    setToast({ message: `${section.charAt(0).toUpperCase() + section.slice(1)} updated successfully!`, type: 'success' });
    setTimeout(() => setToast(null), 3000);
    handleEditToggle(section);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText('https://www.addisedu.com/tutor');
    setToast({ message: 'Link copied to clipboard!', type: 'success' });
    setTimeout(() => setToast(null), 3000);
  };

  const Modal = ({ isOpen, onClose, onSave, title, children }) => {
    if (!isOpen) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 transition-opacity duration-300">
        <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl transform transition-transform duration-300 scale-100">
          <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-t-2xl">
            <button onClick={onClose} className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition">Cancel</button>
            <h2 className="text-lg font-semibold">{title}</h2>
            <button onClick={onSave} className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition">Save</button>
          </div>
          <div className="p-6">{children}</div>
        </div>
      </div>
    );
  };

  const Toast = ({ message, type }) => (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg text-white ${type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
      {message}
    </div>
  );

  return (
    <div className="min-h-screen py-24 bg-gray-50 flex flex-col md:flex-row font-sans">
      {/* Main Content */}
      <div className="flex-1 p-8 max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center mb-8 bg-white p-6 rounded-xl shadow-md">
          <img className="w-20 h-20 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mr-6 flex-shrink-0" src='https://www.addinsedu.com/assets/default/images/default/thumb/default-member-logo.svg'/>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-800">Arpit</h1>
              <button onClick={() => handleEditToggle('title')} className="text-blue-500 hover:text-blue-700 transition">
                <FaEdit className="w-5 h-5 cursor-pointer" />
              </button>
            </div>
            <p className="text-gray-600 text-lg">{profileData.title}</p>
            <div className="flex items-center mt-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 15l-5.5 3 1-5.5L2 7.5l5.5-1L10 2l2.5 4.5L18 7.5l-3.5 5 1 5.5L10 15z" />
                </svg>
              ))}
            </div>
          </div>
        </div>

        {/* About */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">About</h2>
            <button onClick={() => handleEditToggle('about')} className="text-blue-500 hover:text-blue-700 transition">
              <FaEdit className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
          <p className="text-gray-600 leading-relaxed">{profileData.about || 'No information added'}</p>
        </div>

        {/* Work History & Reviews */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Work History & Reviews</h2>
          <p className="text-gray-600">No record found</p>
        </div>

        {/* Classes/Subjects */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Your Classes/Subjects</h2>
            <button onClick={() => handleEditToggle('classes')} className="text-blue-500 hover:text-blue-700 transition">
              <FaEdit className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
          <p className="text-gray-600">{profileData.classes || 'No information added'}</p>
        </div>

        {/* Teaching Experience */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Teaching Experience</h2>
            <button onClick={() => handleEditToggle('teaching')} className="text-blue-500 hover:text-blue-700 transition">
              <FaEdit className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
          {profileData.teaching.length > 0 ? (
            profileData.teaching.map((exp, index) => (
              <div key={index} className="text-gray-600 mb-4 border-l-4 border-blue-500 pl-4">
                <p className="font-medium">{exp.jobTitle} at {exp.institute}</p>
                <p>{exp.city}, {exp.state}</p>
                <p>{exp.fromMonth} {exp.fromYear} - {exp.currentlyWorking ? 'Present' : `${exp.toMonth} ${exp.toYear}`}</p>
                <p className="mt-2">{exp.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No information added</p>
          )}
        </div>

        {/* Education */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Education</h2>
            <button onClick={() => handleEditToggle('education')} className="text-blue-500 hover:text-blue-700 transition">
              <FaEdit className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
          {profileData.education.length > 0 ? (
            profileData.education.map((edu, index) => (
              <div key={index} className="text-gray-600 mb-4 border-l-4 border-blue-500 pl-4">
                <p className="font-medium">{edu.institute}</p>
                <p>{edu.degree}, {edu.areaOfStudy}</p>
                <p>{edu.fromYear} - {edu.toYear}</p>
                <p className="mt-2">{edu.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No information added</p>
          )}
        </div>

        {/* Awards */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Awards</h2>
            <button onClick={() => handleEditToggle('awards')} className="text-blue-500 hover:text-blue-700 transition">
              <FaEdit className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
          {profileData.awards.length > 0 ? (
            profileData.awards.map((award, index) => (
              <div key={index} className="text-gray-600 mb-4 border-l-4 border-blue-500 pl-4">
                <p className="font-medium">{award.title} - {award.category}</p>
                <p>{award.completionDate}</p>
                <p className="mt-2">{award.overview}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-600">No information added</p>
          )}
        </div>

        {/* Location */}
        <div className="mb-8 bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-gray-800">Location</h2>
            <button onClick={() => handleEditToggle('location')} className="text-blue-500 hover:text-blue-700 transition">
              <FaEdit className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
          <p className="text-gray-600">{profileData.location || 'No information added'}</p>
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-full md:w-90 bg-white p-6 border-l border-gray-600 md:h-screen md: md:top-0">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Hourly Rate</h3>
            <button onClick={() => handleEditToggle('hourlyRate')} className="text-blue-500 hover:text-blue-700 transition">
              <FaEdit className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
          <p className="text-gray-600">{profileData.hourlyRate || 'Not set'}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Working Hours</h3>
          <p className="text-gray-600">{profileData.workingHours}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Earned</h3>
          <p className="text-gray-600">{profileData.earned}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Classes</h3>
          <p className="text-gray-600">{profileData.classesCount}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Availability</h3>
            <button onClick={() => handleEditToggle('availability')} className="text-blue-500 hover:text-blue-700 transition">
              <FaEdit className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
          <p className="text-gray-600">{profileData.availability || 'Not set'}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Teaching Mode Preference</h3>
            <button onClick={() => handleEditToggle('teachingMode')} className="text-blue-500 hover:text-blue-700 transition">
              <FaEdit className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
          <p className="text-gray-600">{profileData.teachingMode || 'Not set'}</p>
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-gray-800">Language</h3>
            <button onClick={() => handleEditToggle('language')} className="text-blue-500 hover:text-blue-700 transition">
              <FaEdit className="w-5 h-5 cursor-pointer" />
            </button>
          </div>
          <p className="text-gray-600">{profileData.language || 'Not set'}</p>
        </div>

        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Share</h3>
          <div className="flex items-center">
            <input
              type="text"
              readOnly
              value="https://www.addisedu.com/tutor"
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button onClick={copyToClipboard} className="ml-2 p-2 cursor-pointer bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition">
              <FaCopy />
            </button>
          </div>
          <div className="flex mt-4 space-x-4">
            <a href="#" className="text-blue-500 hover:text-blue-700 transition cursor-pointer"><FaFacebook size={24} /></a>
            <a href="#" className="text-blue-500 hover:text-blue-700 transition cursor-pointer"><FaTwitter size={24} /></a>
            <a href="#" className="text-blue-500 hover:text-blue-700 transition cursor-pointer"><FaLinkedin size={24} /></a>
            <a href="#" className="text-blue-500 hover:text-blue-700 transition cursor-pointer"><FaShareAlt size={24} /></a>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal isOpen={isEditing.title} onClose={() => handleEditToggle('title')} onSave={() => handleSave('title')} title="Edit Your Title">
        <label className="block mb-2 text-gray-700 font-medium">Your Title</label>
        <p className="text-gray-500 mb-4">Enter a single sentence description of your professional skills/experience (e.g., Maths Tutor with 5 years experience)</p>
        <input
          type="text"
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
          value={modalData.title}
          onChange={(e) => setModalData((prev) => ({ ...prev, title: e.target.value }))}
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
        <p className="text-gray-500 mt-2">EXAMPLE: 10+ Class Maths Tutor with 5 years experience</p>
      </Modal>

      <Modal isOpen={isEditing.about} onClose={() => handleEditToggle('about')} onSave={() => handleSave('about')} title="Overview">
        <p className="text-gray-500 mb-4">Use this space to show clients you have the skills and experience they are looking for.</p>
        <p className="text-gray-500 mb-4">Describe your strengths and skills<br />Highlight projects, accomplishments, and education<br />Keep it short and error-free</p>
        <textarea
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.about ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
          value={modalData.about}
          onChange={(e) => setModalData((prev) => ({ ...prev, about: e.target.value }))}
          rows="5"
        />
        {errors.about && <p className="text-red-500 text-sm mt-1">{errors.about}</p>}
      </Modal>

      <Modal isOpen={isEditing.classes} onClose={() => handleEditToggle('classes')} onSave={() => handleSave('classes')} title="My Classes/Subjects">
        <p className="text-gray-500 mb-4">Use this space to show clients you have the Classes/Subjects and experience they are looking for.</p>
        <input
          type="text"
          className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.classes ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
          value={modalData.classes}
          onChange={(e) => setModalData((prev) => ({ ...prev, classes: e.target.value }))}
        />
        {errors.classes && <p className="text-red-500 text-sm mt-1">{errors.classes}</p>}
      </Modal>

      <Modal isOpen={isEditing.teaching} onClose={() => handleEditToggle('teaching')} onSave={() => handleSave('teaching')} title="Add Experience">
  <div className="space-y-6">
    {/* Institute and Job Title */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">Institute Name</label>
        <input
          type="text"
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
            errors.institute ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          value={modalData.teaching.institute}
          onChange={(e) => handleModalChange('teaching', 'institute', e.target.value)}
          placeholder="Enter institute name"
        />
        {errors.institute && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.institute}</p>}
      </div>
      <div>
        <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">Job Title</label>
        <input
          type="text"
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
            errors.jobTitle ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          value={modalData.teaching.jobTitle}
          onChange={(e) => handleModalChange('teaching', 'jobTitle', e.target.value)}
          placeholder="Enter job title"
        />
        {errors.jobTitle && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.jobTitle}</p>}
      </div>
    </div>

    {/* City and State */}
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div>
        <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">City</label>
        <select
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
            errors.city ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          value={modalData.teaching.city}
          onChange={(e) => handleModalChange('teaching', 'city', e.target.value)}
        >
          <option value="">Select City</option>
          <option>Mumbai</option>
          <option>Delhi</option>
          <option>Bangalore</option>
          <option>Chennai</option>
          <option>Kolkata</option>
        </select>
        {errors.city && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.city}</p>}
      </div>
      <div>
        <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">State</label>
        <select
          className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
            errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
          }`}
          value={modalData.teaching.state}
          onChange={(e) => handleModalChange('teaching', 'state', e.target.value)}
        >
          <option value="">Select State</option>
          <option>Maharashtra</option>
          <option>Delhi</option>
          <option>Karnataka</option>
          <option>Tamil Nadu</option>
          <option>West Bengal</option>
        </select>
        {errors.state && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.state}</p>}
      </div>
    </div>

    {/* Teaching Role */}
    <div>
      <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">Teaching Role</label>
      <select
        className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
          errors.role ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
        }`}
        value={modalData.teaching.role}
        onChange={(e) => handleModalChange('teaching', 'role', e.target.value)}
      >
        <option value="">Select Role</option>
        <option>Teacher</option>
        <option>Tutor</option>
        <option>Professor</option>
        <option>Instructor</option>
      </select>
      {errors.role && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.role}</p>}
    </div>

    {/* Period From */}
    <div>
      <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">Period From</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <select
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
              errors.fromMonth ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            value={modalData.teaching.fromMonth}
            onChange={(e) => handleModalChange('teaching', 'fromMonth', e.target.value)}
          >
            <option value="">Select Month</option>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          {errors.fromMonth && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.fromMonth}</p>}
        </div>
        <div>
          <select
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
              errors.fromYear ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            value={modalData.teaching.fromYear}
            onChange={(e) => handleModalChange('teaching', 'fromYear', e.target.value)}
          >
            <option value="">Select Year</option>
            {Array.from({ length: 50 }, (_, i) => 2025 - i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.fromYear && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.fromYear}</p>}
        </div>
      </div>
    </div>

    {/* Period To */}
    <div>
      <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">Period To</label>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <select
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
              errors.toMonth ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            value={modalData.teaching.toMonth}
            onChange={(e) => handleModalChange('teaching', 'toMonth', e.target.value)}
            disabled={modalData.teaching.currentlyWorking}
          >
            <option value="">Select Month</option>
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((month) => (
              <option key={month} value={month}>{month}</option>
            ))}
          </select>
          {errors.toMonth && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.toMonth}</p>}
        </div>
        <div>
          <select
            className={`w-full p-3 border rounded-lg focus:outline-none focus:ring-2 text-sm sm:text-base ${
              errors.toYear ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
            }`}
            value={modalData.teaching.toYear}
            onChange={(e) => handleModalChange('teaching', 'toYear', e.target.value)}
            disabled={modalData.teaching.currentlyWorking}
          >
            <option value="">Select Year</option>
            {Array.from({ length: 50 }, (_, i) => 2025 - i).map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {errors.toYear && <p className="text-red-500 text-xs sm:text-sm mt-1">{errors.toYear}</p>}
        </div>
      </div>
    </div>

    {/* Currently Working Checkbox */}
    <div>
      <label className="flex items-center">
        <input
          type="checkbox"
          className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
          checked={modalData.teaching.currentlyWorking}
          onChange={(e) => handleModalChange('teaching', 'currentlyWorking', e.target.checked)}
        />
        <span className="text-gray-700 text-sm sm:text-base">I currently work here</span>
      </label>
    </div>

    {/* Description */}
    <div>
      <label className="block mb-1 text-gray-700 font-medium text-sm sm:text-base">Description (Optional)</label>
      <textarea
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500 text-sm sm:text-base"
        value={modalData.teaching.description}
        onChange={(e) => handleModalChange('teaching', 'description', e.target.value)}
        rows="4"
        placeholder="Describe your role and responsibilities"
      />
    </div>
  </div>
</Modal>


      <Modal isOpen={isEditing.education} onClose={() => handleEditToggle('education')} onSave={() => handleSave('education')} title="Add Education">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Institute</label>
          <input
            type="text"
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.institute ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            value={modalData.education.institute}
            onChange={(e) => handleModalChange('education', 'institute', e.target.value)}
          />
          {errors.institute && <p className="text-red-500 text-sm mt-1">{errors.institute}</p>}
        </div>
        <div className="mt-4">
          <label className="block mb-1 text-gray-700 font-medium">Session</label>
          <div className="flex gap-2">
            <select
              className={`w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.fromYear ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              value={modalData.education.fromYear}
              onChange={(e) => handleModalChange('education', 'fromYear', e.target.value)}
            >
              <option value="">From</option>
              {Array.from({ length: 50 }, (_, i) => 2025 - i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select
              className={`w-1/2 p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.toYear ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              value={modalData.education.toYear}
              onChange={(e) => handleModalChange('education', 'toYear', e.target.value)}
            >
              <option value="">To</option>
              {Array.from({ length: 50 }, (_, i) => 2025 - i).map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
          </div>
          {(errors.fromYear || errors.toYear) && (
            <p className="text-red-500 text-sm mt-1">{errors.fromYear || errors.toYear}</p>
          )}
        </div>
        <div className="mt-4">
          <label className="block mb-1 text-gray-700 font-medium">Degree (Optional)</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
            value={modalData.education.degree}
            onChange={(e) => handleModalChange('education', 'degree', e.target.value)}
            placeholder="Ex- 12th, B.Tech"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-1 text-gray-700 font-medium">Area of Study (Optional)</label>
          <input
            type="text"
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
            value={modalData.education.areaOfStudy}
            onChange={(e) => handleModalChange('education', 'areaOfStudy', e.target.value)}
            placeholder="Ex- Science, Software Engineering"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-1 text-gray-700 font-medium">Description (Optional)</label>
          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
            value={modalData.education.description}
            onChange={(e) => handleModalChange('education', 'description', e.target.value)}
            rows="4"
          />
        </div>
      </Modal>

      <Modal isOpen={isEditing.awards} onClose={() => handleEditToggle('awards')} onSave={() => handleSave('awards')} title="Add Projects & Awards">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Project Title</label>
            <input
              type="text"
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              value={modalData.awards.title}
              onChange={(e) => handleModalChange('awards', 'title', e.target.value)}
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Category</label>
            <select
              className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
              value={modalData.awards.category}
              onChange={(e) => handleModalChange('awards', 'category', e.target.value)}
            >
              <option value="">Category</option>
              <option>Award</option>
              <option>Project</option>
            </select>
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Project URL (Optional)</label>
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              value={modalData.awards.url}
              onChange={(e) => handleModalChange('awards', 'url', e.target.value)}
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-700 font-medium">Completion Date (Optional)</label>
            <input
              type="date"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
              value={modalData.awards.completionDate}
              onChange={(e) => handleModalChange('awards', 'completionDate', e.target.value)}
            />
          </div>
        </div>
        <div className="mt-4">
          <label className="block mb-1 text-gray-700 font-medium">Project Overview</label>
          <textarea
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-500"
            value={modalData.awards.overview}
            onChange={(e) => handleModalChange('awards', 'overview', e.target.value)}
            rows="4"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-1 text-gray-700 font-medium">Image (Optional)</label>
          <div className="border-dashed border-2 border-gray-300 p-4 text-center rounded-lg">
            <p className="text-gray-500">Drag & drop here</p>
            <p className="text-gray-500">or</p>
            <button className="text-blue-500 hover:text-blue-700 transition">Click to select file</button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isEditing.location} onClose={() => handleEditToggle('location')} onSave={() => handleSave('location')} title="Add Location">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Enter Location on Map</label>
          <input
            type="text"
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.mapLocation ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            value={modalData.location.mapLocation}
            onChange={(e) => handleModalChange('location', 'mapLocation', e.target.value)}
            placeholder="Your address will not show to clients or others"
          />
          <p className="text-red-500 text-sm mt-1">Move red marker on map for location accuracy</p>
        </div>
        <div className="mt-4">
          <label className="block mb-1 text-gray-700 font-medium">Locality/Area Name</label>
          <input
            type="text"
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.areaName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            value={modalData.location.areaName}
            onChange={(e) => handleModalChange('location', 'areaName', e.target.value)}
            placeholder="Enter locality"
          />
          {errors.areaName && <p className="text-red-500 text-sm mt-1">{errors.areaName}</p>}
        </div>
      </Modal>

      <Modal isOpen={isEditing.hourlyRate} onClose={() => handleEditToggle('hourlyRate')} onSave={() => handleSave('hourlyRate')} title="Change Hourly Class Rate">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">I Prefer to Work With</label>
          <div className="flex gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded-lg transition ${modalData.hourlyRate.type === 'hourly' ? 'bg-blue-500 text-white' : 'border border-gray-300 hover:bg-gray-100'}`}
              onClick={() => handleModalChange('hourlyRate', 'type', 'hourly')}
            >
              Hourly Class Rate
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition ${modalData.hourlyRate.type === 'monthly' ? 'bg-blue-500 text-white' : 'border border-gray-300 hover:bg-gray-100'}`}
              onClick={() => handleModalChange('hourlyRate', 'type', 'monthly')}
            >
              Monthly Class Rate
            </button>
          </div>
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">{modalData.hourlyRate.type === 'hourly' ? 'Hourly' : 'Monthly'} Class Rate</label>
          <input
            type="number"
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.rate ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            value={modalData.hourlyRate.rate}
            onChange={(e) => handleModalChange('hourlyRate', 'rate', e.target.value)}
            placeholder={`Enter ${modalData.hourlyRate.type} rate`}
          />
          {errors.rate && <p className="text-red-500 text-sm mt-1">{errors.rate}</p>}
        </div>
      </Modal>

      <Modal isOpen={isEditing.availability} onClose={() => handleEditToggle('availability')} onSave={() => handleSave('availability')} title="Change Availability">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">I Am Currently</label>
          <div className="flex gap-2 mb-4">
            <button
              className={`px-4 py-2 rounded-lg transition ${modalData.availability.status === 'available' ? 'bg-blue-500 text-white' : 'border border-gray-300 hover:bg-gray-100'}`}
              onClick={() => handleModalChange('availability', 'status', 'available')}
            >
              Available
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition ${modalData.availability.status === 'not available' ? 'bg-blue-500 text-white' : 'border border-gray-300 hover:bg-gray-100'}`}
              onClick={() => handleModalChange('availability', 'status', 'not available')}
            >
              Not Available
            </button>
          </div>
          {errors.status && <p className="text-red-500 text-sm mt-1">{errors.status}</p>}
        </div>
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Availability Hours</label>
          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="hours"
              className="mr-2 h-4 w-4"
              checked={modalData.availability.hours === 'more than 30 hrs/week'}
              onChange={() => handleModalChange('availability', 'hours', 'more than 30 hrs/week')}
            />
            More than 30 hrs/week
          </label>
          <label className="flex items-center mb-2">
            <input
              type="radio"
              name="hours"
              className="mr-2 h-4 w-4"
              checked={modalData.availability.hours === 'less than 30 hrs/week'}
              onChange={() => handleModalChange('availability', 'hours', 'less than 30 hrs/week')}
            />
            Less than 30 hrs/week
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              name="hours"
              className="mr-2 h-4 w-4"
              checked={modalData.availability.hours === 'as needed'}
              onChange={() => handleModalChange('availability', 'hours', 'as needed')}
            />
            As needed - open to offers
          </label>
        </div>
      </Modal>

      <Modal isOpen={isEditing.teachingMode} onClose={() => handleEditToggle('teachingMode')} onSave={() => handleSave('teachingMode')} title="Change Teaching Mode">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">My Teaching Preference Is</label>
          <div className="flex gap-2">
            <button
              className={`px-4 py-2 rounded-lg transition ${modalData.teachingMode === 'offline' ? 'bg-blue-500 text-white' : 'border border-gray-300 hover:bg-gray-100'}`}
              onClick={() => setModalData((prev) => ({ ...prev, teachingMode: 'offline' }))}
            >
              Offline
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition ${modalData.teachingMode === 'online' ? 'bg-blue-500 text-white' : 'border border-gray-300 hover:bg-gray-100'}`}
              onClick={() => setModalData((prev) => ({ ...prev, teachingMode: 'online' }))}
            >
              Online
            </button>
            <button
              className={`px-4 py-2 rounded-lg transition ${modalData.teachingMode === 'both' ? 'bg-blue-500 text-white' : 'border border-gray-300 hover:bg-gray-100'}`}
              onClick={() => setModalData((prev) => ({ ...prev, teachingMode: 'both' }))}
            >
              Offline & Online
            </button>
          </div>
        </div>
      </Modal>

      <Modal isOpen={isEditing.language} onClose={() => handleEditToggle('language')} onSave={() => handleSave('language')} title="Change Language">
        <div>
          <label className="block mb-1 text-gray-700 font-medium">Primary Language</label>
          <input
            type="text"
            className={`w-full p-2 border rounded-lg focus:outline-none focus:ring-2 ${errors.language ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'}`}
            value={modalData.language}
            onChange={(e) => setModalData((prev) => ({ ...prev, language: e.target.value }))}
            placeholder="Enter primary language"
          />
          {errors.language && <p className="text-red-500 text-sm mt-1">{errors.language}</p>}
        </div>
      </Modal>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}