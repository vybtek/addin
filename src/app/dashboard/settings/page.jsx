"use client";
import React, { useState, useEffect } from "react";
import { Pencil } from "lucide-react";

const TutorSettingsPage = () => {
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [accountData, setAccountData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [locationData, setLocationData] = useState({
    address: "",
    locality: "",
    city: "",
    state: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  // Retrieve userId from localStorage on client-side mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUserId = localStorage.getItem("user_id");
      setUserId(storedUserId);
    }
  }, []);

  // Fetch user data when userId is available
  useEffect(() => {
    if (!userId) return;

    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `https://api.vybtek.com/api/users/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        console.log("API Response:", data); // Debug: Log the API response
        setAccountData({
          name: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
        });
        setLocationData({
          address: data.teacher_profile?.street || "", // Map street to address
          locality: data.teacher_profile?.locality || "", // Adjust if locality exists
          city: data.teacher_profile?.city || "",
          state: data.teacher_profile?.state || "", // Adjust if state exists
          postalCode: data.teacher_profile?.postal_code || "", // Use postal_code
        });
      } catch (err) {
        setError(err.message);
        console.error("Fetch Error:", err); // Debug: Log any errors
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [userId]);

  // Handle account update
  const handleAccountUpdate = async () => {
    if (!userId) return;
    try {
      const response = await fetch(
        `https://api.vybtek.com/api/users/${userId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(accountData),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update account");
      }
      setIsEditingAccount(false);
    } catch (err) {
      setError(err.message);
    }
  };

  // Handle location update
  const handleLocationUpdate = async () => {
    if (!userId) return;
    try {
      const response = await fetch(
        `https://api.vybtek.com/api/users/${userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            teacher_profile: {
              street: locationData.address,
              locality: locationData.locality,
              city: locationData.city,
              state: locationData.state,
              postal_code: locationData.postalCode,
            },
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update location");
      }
      setIsEditingLocation(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleAccountCancel = () => {
    setIsEditingAccount(false);
  };

  const handleLocationCancel = () => {
    setIsEditingLocation(false);
  };

  if (loading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">{error}</div>;
  }

  if (!userId) {
    return (
      <div className="text-center py-16 text-red-500">
        No user ID found. Please log in.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">
          Contact Info
        </h1>

        {/* Account Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Account</h2>
              {!isEditingAccount && (
                <button
                  onClick={() => setIsEditingAccount(true)}
                  className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Pencil className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-6">
              <div className="flex-1 space-y-4">
                {!isEditingAccount ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          User ID
                        </label>
                        <p className="text-gray-900">{userId}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <p className="text-gray-900">{accountData.email}</p>{" "}
                        {/* Removed masking for debugging */}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Name
                        </label>
                        <p className="text-gray-900">{accountData.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Phone
                        </label>
                        <p className="text-gray-900">{accountData.phone}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Name
                        </label>
                        <input
                          type="text"
                          value={accountData.name}
                          onChange={(e) =>
                            setAccountData({
                              ...accountData,
                              name: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email
                        </label>
                        <input
                          type="email"
                          value={accountData.email}
                          onChange={(e) =>
                            setAccountData({
                              ...accountData,
                              email: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={accountData.phone}
                          onChange={(e) =>
                            setAccountData({
                              ...accountData,
                              phone: e.target.value,
                            })
                          }
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div className="flex gap-3 pt-4">
                      <button
                        onClick={handleAccountUpdate}
                        className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                      >
                        Update
                      </button>
                      <button
                        onClick={handleAccountCancel}
                        className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Location Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Location</h2>
              {!isEditingLocation && (
                <button
                  onClick={() => setIsEditingLocation(true)}
                  className="p-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
                >
                  <Pencil className="w-5 h-5" />
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {isEditingLocation ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    placeholder="Enter address (Your address will not show to client or others)"
                    value={locationData.address}
                    onChange={(e) =>
                      setLocationData({
                        ...locationData,
                        address: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Locality/Area name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter locality"
                      value={locationData.locality}
                      onChange={(e) =>
                        setLocationData({
                          ...locationData,
                          locality: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      City
                    </label>
                    <select
                      value={locationData.city}
                      onChange={(e) =>
                        setLocationData({
                          ...locationData,
                          city: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors bg-white"
                    >
                      <option value="">Select City</option>
                      <option value="udaipur">Udaipur</option>
                      <option value="jaipur">Jaipur</option>
                      <option value="jodhpur">Jodhpur</option>
                      <option value="kota">Kota</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      State
                    </label>
                    <input
                      type="text"
                      placeholder="Enter state"
                      value={locationData.state}
                      onChange={(e) =>
                        setLocationData({
                          ...locationData,
                          state: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      placeholder="Enter pincode"
                      value={locationData.postalCode}
                      onChange={(e) =>
                        setLocationData({
                          ...locationData,
                          postalCode: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleLocationUpdate}
                    className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
                  >
                    Update
                  </button>
                  <button
                    onClick={handleLocationCancel}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors font-medium"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                {locationData.address ||
                locationData.locality ||
                locationData.city ||
                locationData.state ||
                locationData.postalCode ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Address
                      </label>
                      <p className="text-gray-900">
                        {locationData.address || "N/A"}
                      </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Locality
                        </label>
                        <p className="text-gray-900">
                          {locationData.locality || "N/A"}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <p className="text-gray-900">
                          {locationData.city || "N/A"}
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State
                        </label>
                        <p className="text-gray-900">
                          {locationData.state || "N/A"}
                        </p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Postal Code
                        </label>
                        <p className="text-gray-900">
                          {locationData.postalCode || "N/A"}
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="text-gray-500 mb-4">
                      No location information added yet
                    </p>
                    <button
                      onClick={() => setIsEditingLocation(true)}
                      className="text-blue-500 hover:text-blue-600 font-medium"
                    >
                      Add Location Details
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <p className="text-sm text-gray-600 flex-1">
              This is a <span className="font-medium">Tutor</span> account
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                Create new account
              </button>
              <button className="px-6 py-2 text-blue-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                Close my account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorSettingsPage;
