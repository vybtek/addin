"use client"
import React, { useState } from 'react';
import { Pencil } from 'lucide-react';

const TutorSettingsPage = () => {
  const [isEditingAccount, setIsEditingAccount] = useState(false);
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  
  const [accountData, setAccountData] = useState({
    name: 'Arpit',
    email: 'arpit56005@gmail.com',
    phone: '6367885453'
  });
  
  const [locationData, setLocationData] = useState({
    address: '',
    locality: '',
    city: '',
    state: '',
    postalCode: ''
  });

  const handleAccountUpdate = () => {
    setIsEditingAccount(false);
    // Handle update logic here
  };

  const handleLocationUpdate = () => {
    setIsEditingLocation(false);
    // Handle update logic here
  };

  const handleAccountCancel = () => {
    setIsEditingAccount(false);
    // Reset form data if needed
  };

  const handleLocationCancel = () => {
    setIsEditingLocation(false);
    // Reset form data if needed
  };

  return (
    <div className="min-h-screen bg-gray-50  py-16 ">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 mb-8">Contact Info</h1>
        
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
              {/* Profile Picture */}
              <div className="flex-shrink-0">
                <div className="relative">
                  <div className="w-20 h-20 bg-gray-400 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                      <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                    </div>
                  </div>
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-white border-2 border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors">
                    <Pencil className="w-4 h-4 text-gray-600" />
                  </button>
                </div>
              </div>
              
              {/* Account Details */}
              <div className="flex-1 space-y-4">
                {!isEditingAccount ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">User ID</label>
                        <p className="text-gray-900">arpit-6421gdiy</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <p className="text-gray-900">a*******05@gmail.com</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                        <p className="text-gray-900">{accountData.name}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                        <p className="text-gray-900">{accountData.phone}</p>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <input
                          type="text"
                          value={accountData.name}
                          onChange={(e) => setAccountData({...accountData, name: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={accountData.email}
                          onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                        <input
                          type="tel"
                          value={accountData.phone}
                          onChange={(e) => setAccountData({...accountData, phone: e.target.value})}
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                  <input
                    type="text"
                    placeholder="Enter address (Your address will not show to client or others)"
                    value={locationData.address}
                    onChange={(e) => setLocationData({...locationData, address: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Locality/Area name</label>
                    <input
                      type="text"
                      placeholder="Enter locality"
                      value={locationData.locality}
                      onChange={(e) => setLocationData({...locationData, locality: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                    <select
                      value={locationData.city}
                      onChange={(e) => setLocationData({...locationData, city: e.target.value})}
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
                    <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                    <input
                      type="text"
                      placeholder="Enter state"
                      value={locationData.state}
                      onChange={(e) => setLocationData({...locationData, state: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Postal Code</label>
                    <input
                      type="text"
                      placeholder="Enter pincode"
                      value={locationData.postalCode}
                      onChange={(e) => setLocationData({...locationData, postalCode: e.target.value})}
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
                <p className="text-gray-500 mb-4">No location information added yet</p>
                <button
                  onClick={() => setIsEditingLocation(true)}
                  className="text-blue-500 hover:text-blue-600 font-medium"
                >
                  Add Location Details
                </button>
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