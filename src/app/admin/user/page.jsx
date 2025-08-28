"use client";
import { useState } from "react";

export default function AdminUser() {
  const [users, setUsers] = useState([
    {
      id: 1,
      username: "superadmin",
      name: "Rahul Purbia",
      email: "rahul@example.com",
      role: "Super Admin",
      registeredOn: "02 Dec, 2017 07:27 AM",
      status: "Active",
    },
    {
      id: 2,
      username: "admin",
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "Admin",
      registeredOn: "15 Mar, 2020 10:45 AM",
      status: "Active",
    },
    {
      id: 3,
      username: "editor",
      name: "Maria Garcia",
      email: "maria@example.com",
      role: "Editor",
      registeredOn: "22 Jul, 2021 03:15 PM",
      status: "Inactive",
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "Admin",
    status: "Active",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);

  // Filter users based on search term
  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAdd = () => {
    setSelectedUser(null);
    setFormData({
      username: "",
      name: "",
      email: "",
      password: "",
      role: "Admin",
      status: "Active",
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      username: user.username,
      name: user.name,
      email: user.email,
      password: "",
      role: user.role,
      status: user.status,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setUsers(users.filter((user) => user.id !== id));
    setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
  };

  const handleBulkDelete = () => {
    setUsers(users.filter((user) => !selectedRows.includes(user.id)));
    setSelectedRows([]);
  };

  const handleSave = () => {
    const currentDate = new Date()
      .toLocaleString("en-US", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      })
      .replace(",", "");

    if (selectedUser) {
      // Update existing user
      setUsers(
        users.map((u) =>
          u.id === selectedUser.id
            ? { ...u, ...formData, registeredOn: u.registeredOn }
            : u
        )
      );
      setIsEditModalOpen(false);
    } else {
      // Add new user
      const newId = Math.max(...users.map((u) => u.id)) + 1 || 1;
      setUsers([
        ...users,
        { id: newId, ...formData, registeredOn: currentDate },
      ]);
      setIsAddModalOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const toggleRowSelection = (id) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const toggleSelectAll = () => {
    if (selectedRows.length === filteredUsers.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows(filteredUsers.map((user) => user.id));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 py-14">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Admin User Management
            </h1>
            <nav className="text-sm text-green-600 mt-1">Home / Admin User</nav>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <div className="relative mr-4">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 w-full md:w-64"
              />
              <svg
                className="w-5 h-5 absolute left-3 top-2.5 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
            <button
              onClick={handleAdd}
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add User
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedRows.length > 0 && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6 flex items-center">
            <span className="text-blue-700 mr-4">
              {selectedRows.length} user{selectedRows.length !== 1 ? "s" : ""}{" "}
              selected
            </span>
            <button
              onClick={handleBulkDelete}
              className="bg-red-100 text-red-700 px-3 py-1 rounded-md text-sm hover:bg-red-200 flex items-center"
            >
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              Delete Selected
            </button>
          </div>
        )}

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 text-gray-700 font-semibold">
            <div className="col-span-1 flex items-center">
              <input
                type="checkbox"
                checked={
                  selectedRows.length === filteredUsers.length &&
                  filteredUsers.length > 0
                }
                onChange={toggleSelectAll}
                className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
              />
            </div>
            <div className="col-span-2">Username</div>
            <div className="col-span-2">Name</div>
            <div className="col-span-2">Email</div>
            <div className="col-span-1">Role</div>
            <div className="col-span-2">Registered On</div>
            <div className="col-span-1">Status</div>
            <div className="col-span-1">Actions</div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <UserItem
                  key={user.id}
                  user={user}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  isSelected={selectedRows.includes(user.id)}
                  onSelect={() => toggleRowSelection(user.id)}
                />
              ))
            ) : (
              <div className="p-8 text-center text-gray-500">
                No users found. {searchTerm && "Try a different search term."}
              </div>
            )}
          </div>
        </div>

        {/* Add User Modal */}
        {isAddModalOpen && (
          <Modal
            title="Add Admin User"
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleSave}
            actionText="Add"
          >
            <UserForm
              formData={formData}
              handleChange={handleChange}
              isEdit={false}
            />
          </Modal>
        )}

        {/* Edit User Modal */}
        {isEditModalOpen && (
          <Modal
            title="Edit Admin User"
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSave}
            actionText="Save"
          >
            <UserForm
              formData={formData}
              handleChange={handleChange}
              isEdit={true}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

// UserItem Component
function UserItem({ user, onEdit, onDelete, isSelected, onSelect }) {
  return (
    <div className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50 transition-colors duration-200">
      <div className="col-span-1 flex items-center">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelect}
          className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
        />
      </div>
      <div className="col-span-2 font-medium text-gray-900">
        {user.username}
      </div>
      <div className="col-span-2 text-gray-900">{user.name}</div>
      <div className="col-span-2 text-gray-600 text-sm">{user.email}</div>
      <div className="col-span-1">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            user.role === "Super Admin"
              ? "bg-purple-100 text-purple-800"
              : user.role === "Admin"
              ? "bg-blue-100 text-blue-800"
              : "bg-gray-100 text-gray-800"
          }`}
        >
          {user.role}
        </span>
      </div>
      <div className="col-span-2 text-gray-600 text-sm">
        {user.registeredOn}
      </div>
      <div className="col-span-1">
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            user.status === "Active"
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {user.status}
        </span>
      </div>
      <div className="col-span-1 flex space-x-2">
        <button
          onClick={() => onEdit(user)}
          className="text-blue-500 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50"
          title="Edit user"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
        </button>
        <button
          onClick={() => onDelete(user.id)}
          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
          title="Delete user"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

// UserForm Component
function UserForm({ formData, handleChange, isEdit }) {
  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Username
        </label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          disabled={isEdit}
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Full Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          {isEdit ? "New Password (leave blank to keep current)" : "Password"}
        </label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Role
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        >
          <option value="Admin">Admin</option>
          <option value="Super Admin">Super Admin</option>
          <option value="Editor">Editor</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Status
        </label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="status"
              value="Active"
              checked={formData.status === "Active"}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500"
            />
            <span className="ml-2">Active</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="status"
              value="Inactive"
              checked={formData.status === "Inactive"}
              onChange={handleChange}
              className="h-4 w-4 text-green-600 focus:ring-green-500"
            />
            <span className="ml-2">Inactive</span>
          </label>
        </div>
      </div>
      {!isEdit && (
        <div className="flex items-center">
          <input
            id="add-more"
            type="checkbox"
            className="h-4 w-4 text-green-600 focus:ring-green-500 rounded"
          />
          <label htmlFor="add-more" className="ml-2 text-sm text-gray-700">
            Add more records after saving
          </label>
        </div>
      )}
    </div>
  );
}

// Modal Component
function Modal({ title, onClose, onSave, actionText, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6">{children}</div>
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
          >
            {actionText}
          </button>
        </div>
      </div>
    </div>
  );
}
