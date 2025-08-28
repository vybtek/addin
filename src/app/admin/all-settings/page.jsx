"use client";
import { useState } from "react";
import {
  Search,
  Edit,
  Trash2,
  Plus,
  Save,
  X,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

export default function Settings() {
  const [activeTab, setActiveTab] = useState("default");
  const [settings, setSettings] = useState([
    {
      id: 1,
      category: "default",
      name: "Admin Default Language",
      key: "admin_default_lang",
      value: "en",
      type: "select",
      options: ["en", "es", "fr", "de", "zh"],
      displayOrder: 1,
      variable: "Yes",
    },
    {
      id: 2,
      category: "default",
      name: "Language",
      key: "language",
      value: "en",
      type: "select",
      options: ["en", "es", "fr", "de", "zh"],
      displayOrder: 2,
      variable: "Yes",
    },
    {
      id: 3,
      category: "general",
      name: "Timezone",
      key: "timezone",
      value: "UTC+0",
      type: "select",
      options: ["UTC+0", "UTC+1", "UTC+2", "UTC+3", "UTC+4", "UTC+5"],
      displayOrder: 3,
      variable: "Yes",
    },

    // Custom Settings
    {
      id: 4,
      category: "custom",
      name: "Active Theme",
      key: "active_theme",
      value: "default",
      type: "select",
      options: ["default", "dark", "light", "professional", "educational"],
      displayOrder: 1,
      variable: "Yes",
    },
    {
      id: 5,
      category: "custom",
      name: "Admin Short Code",
      key: "admin_short_code",
      value: "CA",
      type: "text",
      displayOrder: 2,
      variable: "No",
    },
    {
      id: 6,
      category: "custom",
      name: "CSS Version",
      key: "version_css",
      value: "1.0",
      type: "text",
      displayOrder: 3,
      variable: "No",
    },
    {
      id: 7,
      category: "custom",
      name: "Default SEO Site Description",
      key: "default_seo_site_description",
      value:
        "Addins is a platform dedicated to empowering educators and connecting students. We offer a comprehensive range of services, including home tutoring, online tutoring, and teaching job opportunities. Join us to enhance your teaching career or find the perfect tutor for personalized learning.",
      type: "textarea",
      displayOrder: 4,
      variable: "No",
    },

    // API Settings
    {
      id: 8,
      category: "api",
      name: "Facebook App ID",
      key: "fb_app_id",
      value: "206224582160237",
      type: "text",
      displayOrder: 1,
      variable: "No",
    },
    {
      id: 9,
      category: "api",
      name: "Facebook App Secret",
      key: "fb_app_secret",
      value: "455f1d38e8f4d0c5931ffb270295057d",
      type: "password",
      displayOrder: 2,
      variable: "No",
    },
    {
      id: 10,
      category: "api",
      name: "Google Api Key",
      key: "google_apiKey",
      value: "AlzaSyDQXtDYRkW5F4p62vHkG3o8a4sgPnjWYk4",
      type: "password",
      displayOrder: 3,
      variable: "No",
    },
    {
      id: 11,
      category: "api",
      name: "Google Client Id",
      key: "google_client_id",
      value:
        "26249774669-ja3li9la34i5tg136004v10lg5m5mgqk.apps.googleusercontent.com",
      type: "text",
      displayOrder: 4,
      variable: "No",
    },
    {
      id: 12,
      category: "api",
      name: "Google Map API Key",
      key: "google_map_api_key",
      value: "AlzaSyDQXtDYRkW5F4p62vHkG3o8a4sgPnjWYk4",
      type: "password",
      displayOrder: 5,
      variable: "No",
    },

    // Payment Settings
    {
      id: 13,
      category: "payment",
      name: "Currency Conversion Rate 1 AED_TO_USD",
      key: "AED_TO_USD",
      value: "27",
      type: "number",
      displayOrder: 1,
      variable: "Yes",
    },
    {
      id: 14,
      category: "payment",
      name: "Enable Bank Withdraw",
      key: "enable_bank_withdraw",
      value: "1",
      type: "checkbox",
      displayOrder: 2,
      variable: "Yes",
    },
    {
      id: 15,
      category: "payment",
      name: "Enable Paypal Withdraw",
      key: "enable_paypal_withdraw",
      value: "1",
      type: "checkbox",
      displayOrder: 3,
      variable: "Yes",
    },
    {
      id: 16,
      category: "payment",
      name: "Enable Stripe Withdraw",
      key: "enable_stripe_withdraw",
      value: "1",
      type: "checkbox",
      displayOrder: 4,
      variable: "Yes",
    },
    {
      id: 17,
      category: "payment",
      name: "Paypal Payment Enable",
      key: "enable_paypal",
      value: "1",
      type: "checkbox",
      displayOrder: 5,
      variable: "Yes",
    },

    // Social Settings
    {
      id: 18,
      category: "social",
      name: "Facebook Link",
      key: "facebook_url",
      value: "https://www.facebook.com/addinseduc/",
      type: "url",
      displayOrder: 1,
      variable: "No",
    },
    {
      id: 19,
      category: "social",
      name: "Twitter Link",
      key: "twitter_url",
      value: "https://twitter.com/addinsedu/",
      type: "url",
      displayOrder: 2,
      variable: "No",
    },
    {
      id: 20,
      category: "social",
      name: "LinkedIn Link",
      key: "linkedin_url",
      value: "https://in.linkedin.com/company/addins",
      type: "url",
      displayOrder: 3,
      variable: "No",
    },
    {
      id: 21,
      category: "social",
      name: "Instagram Link",
      key: "instagram_url",
      value: "https://www.instagram.com/addinseduc/",
      type: "url",
      displayOrder: 4,
      variable: "No",
    },

    // Constants Settings
    {
      id: 22,
      category: "constants",
      name: "Max File Upload Size",
      key: "max_upload_size",
      value: "10",
      type: "number",
      displayOrder: 1,
      variable: "Yes",
    },
    {
      id: 23,
      category: "constants",
      name: "Session Timeout",
      key: "session_timeout",
      value: "30",
      type: "number",
      displayOrder: 2,
      variable: "Yes",
    },
    {
      id: 24,
      category: "constants",
      name: "Password Expiry Days",
      key: "password_expiry",
      value: "90",
      type: "number",
      displayOrder: 3,
      variable: "Yes",
    },

    // Page SEO Settings
    {
      id: 25,
      category: "page-seo",
      name: "Meta Keywords",
      key: "meta_keywords",
      value: "education, tutoring, teaching, online learning, home tutoring",
      type: "text",
      displayOrder: 1,
      variable: "No",
    },
    {
      id: 26,
      category: "page-seo",
      name: "Meta Description",
      key: "meta_description",
      value:
        "Addins - Your trusted platform for quality education and tutoring services",
      type: "textarea",
      displayOrder: 2,
      variable: "No",
    },
    {
      id: 27,
      category: "page-seo",
      name: "OG Image URL",
      key: "og_image",
      value: "https://addins.com/images/og-image.jpg",
      type: "url",
      displayOrder: 3,
      variable: "No",
    },
  ]);

  const [isEditing, setIsEditing] = useState(null);
  const [editData, setEditData] = useState({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newSetting, setNewSetting] = useState({
    name: "",
    key: "",
    value: "",
    type: "text",
    category: "default",
    displayOrder: 1,
    variable: "No",
    options: [],
  });
  const [searchTerm, setSearchTerm] = useState("");

  const tabs = [
    { id: "default", label: "Default" },
    { id: "general", label: "General" },
    { id: "custom", label: "Custom" },
    { id: "api", label: "API" },
    { id: "payment", label: "Payment" },
    { id: "constants", label: "Constants" },
    { id: "social", label: "Social" },
    { id: "page-seo", label: "Page SEO" },
  ];

  const filteredSettings = settings
    .filter((setting) => setting.category === activeTab)
    .filter(
      (setting) =>
        setting.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        setting.key.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.displayOrder - b.displayOrder);

  const handleEdit = (setting) => {
    setIsEditing(setting.id);
    setEditData({ ...setting });
  };

  const handleSave = (id) => {
    setSettings(
      settings.map((setting) =>
        setting.id === id ? { ...setting, ...editData } : setting
      )
    );
    setIsEditing(null);
    setEditData({});
  };

  const handleCancel = () => {
    setIsEditing(null);
    setEditData({});
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this setting?")) {
      setSettings(settings.filter((setting) => setting.id !== id));
    }
  };

  const handleAdd = () => {
    const newId = Math.max(...settings.map((s) => s.id)) + 1;
    setSettings([...settings, { id: newId, ...newSetting }]);
    setIsAddModalOpen(false);
    setNewSetting({
      name: "",
      key: "",
      value: "",
      type: "text",
      category: "default",
      displayOrder: Math.max(...settings.map((s) => s.displayOrder)) + 1,
      variable: "No",
      options: [],
    });
  };

  const handleInputChange = (e, field) => {
    setEditData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleNewSettingChange = (e, field) => {
    setNewSetting((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleOptionsChange = (e, index) => {
    const newOptions = [...editData.options];
    newOptions[index] = e.target.value;
    setEditData((prev) => ({
      ...prev,
      options: newOptions,
    }));
  };

  const addOption = () => {
    setEditData((prev) => ({
      ...prev,
      options: [...(prev.options || []), ""],
    }));
  };

  const removeOption = (index) => {
    setEditData((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }));
  };

  const SettingRow = ({ setting }) => {
    const isCurrentEditing = isEditing === setting.id;

    return (
      <div className="grid grid-cols-12 gap-4 p-4 items-center border-b border-gray-200 hover:bg-gray-50">
        <div className="col-span-4">
          {isCurrentEditing ? (
            <input
              type="text"
              value={editData.name}
              onChange={(e) => handleInputChange(e, "name")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <div className="font-medium text-gray-900">{setting.name}</div>
          )}
        </div>

        <div className="col-span-3">
          {isCurrentEditing ? (
            <input
              type="text"
              value={editData.key}
              onChange={(e) => handleInputChange(e, "key")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          ) : (
            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
              {setting.key}
            </code>
          )}
        </div>

        <div className="col-span-3">
          {isCurrentEditing ? (
            setting.type === "select" ? (
              <div className="space-y-2">
                <select
                  value={editData.value}
                  onChange={(e) => handleInputChange(e, "value")}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {editData.options?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                <div className="text-sm text-gray-600">Options:</div>
                {editData.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionsChange(e, index)}
                      className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                    />
                    <button
                      onClick={() => removeOption(index)}
                      className="text-red-600 hover:text-red-800 p-1"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
                <button
                  onClick={addOption}
                  className="text-sm text-blue-600 hover:text-blue-800 flex items-center"
                >
                  <Plus size={14} className="mr-1" />
                  Add Option
                </button>
              </div>
            ) : (
              <input
                type="text"
                value={editData.value}
                onChange={(e) => handleInputChange(e, "value")}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            )
          ) : (
            <span className="text-gray-700">{setting.value}</span>
          )}
        </div>

        <div className="col-span-2 flex justify-center space-x-2">
          {isCurrentEditing ? (
            <>
              <button
                onClick={() => handleSave(setting.id)}
                className="text-green-600 hover:text-green-800 p-1"
                title="Save"
              >
                <Save size={18} />
              </button>
              <button
                onClick={handleCancel}
                className="text-gray-600 hover:text-gray-800 p-1"
                title="Cancel"
              >
                <X size={18} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => handleEdit(setting)}
                className="text-blue-600 hover:text-blue-800 p-1"
                title="Edit"
              >
                <Edit size={18} />
              </button>
              <button
                onClick={() => handleDelete(setting.id)}
                className="text-red-600 hover:text-red-800 p-1"
                title="Delete"
              >
                <Trash2 size={18} />
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Settings Default Setting
              </h1>
              <nav className="text-sm text-green-600 mt-1">Home / Settings</nav>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Advance Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
              >
                <Plus size={18} className="mr-2" />
                Add Setting
              </button>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white p-4 rounded-xl shadow-sm border">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-blue-100 text-blue-700"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </header>

        {/* Settings Table */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 text-gray-700 font-semibold">
            <div className="col-span-4">Setting Name</div>
            <div className="col-span-3">Key</div>
            <div className="col-span-3">Value</div>
            <div className="col-span-2 text-center">Action</div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredSettings.length > 0 ? (
              filteredSettings.map((setting) => (
                <SettingRow key={setting.id} setting={setting} />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No settings found for{" "}
                {tabs.find((t) => t.id === activeTab)?.label} tab.
                {searchTerm && " Try a different search term."}
              </div>
            )}
          </div>
        </div>

        {/* Add Setting Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Add New Setting
                </h2>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Setting Name
                  </label>
                  <input
                    type="text"
                    value={newSetting.name}
                    onChange={(e) => handleNewSettingChange(e, "name")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Key
                  </label>
                  <input
                    type="text"
                    value={newSetting.key}
                    onChange={(e) => handleNewSettingChange(e, "key")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Value
                  </label>
                  <input
                    type="text"
                    value={newSetting.value}
                    onChange={(e) => handleNewSettingChange(e, "value")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category
                  </label>
                  <select
                    value={newSetting.category}
                    onChange={(e) => handleNewSettingChange(e, "category")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {tabs.map((tab) => (
                      <option key={tab.id} value={tab.id}>
                        {tab.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Type
                  </label>
                  <select
                    value={newSetting.type}
                    onChange={(e) => handleNewSettingChange(e, "type")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="text">Text</option>
                    <option value="select">Select</option>
                    <option value="checkbox">Checkbox</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Variable
                  </label>
                  <select
                    value={newSetting.variable}
                    onChange={(e) => handleNewSettingChange(e, "variable")}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    id="add-more"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <label
                    htmlFor="add-more"
                    className="ml-2 text-sm text-gray-700"
                  >
                    Add more record
                  </label>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAdd}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Add Setting
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
