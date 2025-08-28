"use client";
import { useState } from "react";
import { Edit2, Trash2, Plus, Save, X, Check, ChevronDown, ChevronRight } from "lucide-react";

export default function RoleManagement() {
  const [roles, setRoles] = useState([
    { 
      id: 1, 
      name: "Admin", 
      status: "Active", 
      permissions: {
        notification: [1875],
        setting: ["Admin", "Management", "Member", "Projects"],
        userContact: ["Report Incorrect"],
        fundManagement: true
      }
    },
    { 
      id: 2, 
      name: "Editor", 
      status: "Active", 
      permissions: {
        notification: [1500],
        setting: ["Management", "Member", "Projects"],
        userContact: ["Report Incorrect"],
        fundManagement: false
      }
    },
    { 
      id: 3, 
      name: "Moderator", 
      status: "Active", 
      permissions: {
        notification: [1200],
        setting: ["Member", "Projects"],
        userContact: [],
        fundManagement: false
      }
    }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState(null);
  const [formData, setFormData] = useState({ 
    name: '', 
    status: 'Active', 
    permissions: {
      notification: [],
      setting: [],
      userContact: [],
      fundManagement: false
    }
  });
  const [expandedSections, setExpandedSections] = useState({});

  // Permission options
  const permissionOptions = {
    notification: [1875, 1500, 1200, 1000],
    setting: ["Admin", "Management", "Member", "Projects"],
    userContact: ["Report Incorrect", "Support Tickets", "Feedback"],
    fundManagement: true
  };

  const handleAdd = () => {
    setSelectedRole(null);
    setFormData({ 
      name: '', 
      status: 'Active', 
      permissions: {
        notification: [],
        setting: [],
        userContact: [],
        fundManagement: false
      }
    });
    setIsAddModalOpen(true);
  };

  const handleEdit = (role) => {
    setSelectedRole(role);
    setFormData({ 
      name: role.name, 
      status: role.status, 
      permissions: {...role.permissions}
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this role?")) {
      setRoles(roles.filter((role) => role.id !== id));
    }
  };

  const handleSave = () => {
    if (selectedRole) {
      // Update existing role
      setRoles(roles.map((role) => 
        role.id === selectedRole.id ? { ...role, ...formData } : role
      ));
      setIsEditModalOpen(false);
    } else {
      // Add new role
      const newId = Math.max(...roles.map((r) => r.id)) + 1 || 1;
      setRoles([...roles, { id: newId, ...formData }]);
      setIsAddModalOpen(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePermission = (category, value) => {
    setFormData(prev => {
      const newPermissions = {...prev.permissions};
      
      if (category === 'fundManagement') {
        newPermissions.fundManagement = !newPermissions.fundManagement;
      } else {
        const currentValues = newPermissions[category] || [];
        if (currentValues.includes(value)) {
          newPermissions[category] = currentValues.filter(v => v !== value);
        } else {
          newPermissions[category] = [...currentValues, value];
        }
      }
      
      return { ...prev, permissions: newPermissions };
    });
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const PermissionSection = ({ title, category, options, type = 'checkbox' }) => (
    <div className="mb-4">
      <button 
        type="button"
        onClick={() => toggleSection(category)}
        className="flex items-center justify-between w-full text-left font-semibold text-gray-800 mb-2 p-2 hover:bg-gray-50 rounded"
      >
        <span>{title}</span>
        {expandedSections[category] ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
      </button>
      
      {expandedSections[category] && (
        <div className="ml-4 space-y-2">
          {type === 'checkbox' ? (
            options.map(option => (
              <label key={option} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.permissions[category]?.includes(option)}
                  onChange={() => togglePermission(category, option)}
                  className="rounded text-blue-600 focus:ring-blue-500"
                />
                <span>{option}</span>
              </label>
            ))
          ) : (
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.permissions[category]}
                onChange={() => togglePermission(category)}
                className="rounded text-blue-600 focus:ring-blue-500"
              />
              <span>Enable Fund Management</span>
            </label>
          )}
        </div>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Role Management All Role List</h1>
            <nav className="text-sm text-green-600 mt-1">Home / Role Management</nav>
          </div>
          <button
            onClick={handleAdd}
            className="mt-4 md:mt-0 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
          >
            <Plus size={18} className="mr-2" />
            Add Role
          </button>
        </header>

        {/* Roles Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 text-gray-700 font-semibold">
            <div className="col-span-2">ID</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-3">Status</div>
            <div className="col-span-4 text-center">Action</div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {roles.map((role) => (
              <div key={role.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50">
                <div className="col-span-2 font-medium text-gray-900">{role.id}</div>
                <div className="col-span-3 text-gray-900">{role.name}</div>
                <div className="col-span-3">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    role.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {role.status}
                  </span>
                </div>
                <div className="col-span-4 flex justify-center space-x-3">
                  <button
                    onClick={() => handleEdit(role)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
                    title="Edit role"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(role.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                    title="Delete role"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

    

        {/* Add Role Modal */}
        {isAddModalOpen && (
          <Modal 
            title="Add Role"
            onClose={() => setIsAddModalOpen(false)}
            onSave={handleSave}
            actionText="Add"
          >
            <RoleForm 
              formData={formData} 
              handleChange={handleChange}
              PermissionSection={PermissionSection}
              permissionOptions={permissionOptions}
            />
          </Modal>
        )}

        {/* Edit Role Modal */}
        {isEditModalOpen && (
          <Modal 
            title="Edit Role"
            onClose={() => setIsEditModalOpen(false)}
            onSave={handleSave}
            actionText="Save"
          >
            <RoleForm 
              formData={formData} 
              handleChange={handleChange}
              PermissionSection={PermissionSection}
              permissionOptions={permissionOptions}
            />
          </Modal>
        )}
      </div>
    </div>
  );
}

// RoleForm Component
function RoleForm({ formData, handleChange, PermissionSection, permissionOptions }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter role name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
        <div className="flex space-x-4">
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="status"
              value="Active"
              checked={formData.status === 'Active'}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2">Active</span>
          </label>
          <label className="inline-flex items-center">
            <input
              type="radio"
              name="status"
              value="Inactive"
              checked={formData.status === 'Inactive'}
              onChange={handleChange}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-2">Inactive</span>
          </label>
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Permissions</h3>
        
        <PermissionSection 
          title="Notification" 
          category="notification" 
          options={permissionOptions.notification} 
        />
        
        <PermissionSection 
          title="Setting" 
          category="setting" 
          options={permissionOptions.setting} 
        />
        
        <PermissionSection 
          title="User Contact" 
          category="userContact" 
          options={permissionOptions.userContact} 
        />
        
        <PermissionSection 
          title="Fund Management" 
          category="fundManagement" 
          options={permissionOptions.fundManagement} 
          type="toggle"
        />
      </div>
    </div>
  );
}

// Modal Component
function Modal({ title, onClose, onSave, actionText, children }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
          >
            <X size={24} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <div className="flex items-center">
            <input
              id="add-more"
              type="checkbox"
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
            />
            <label htmlFor="add-more" className="ml-2 text-sm text-gray-700">
              Add more record
            </label>
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
            >
              Cancel
            </button>
            <button
              onClick={onSave}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center"
            >
              <Save size={18} className="mr-2" />
              {actionText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}