"use client";
import { useState } from "react";
import {
  Plus,
  Edit2,
  Trash2,
  Save,
  X,
  Search,
  ChevronDown,
  ChevronRight,
} from "lucide-react";

export default function SettingGroupManagement() {
  const [groups, setGroups] = useState([
    { id: 10, name: "page SEO", key: "seo", status: "Active", displayOrder: 1 },
    { id: 7, name: "Social", key: "social", status: "Active", displayOrder: 2 },
    {
      id: 6,
      name: "Constants",
      key: "constants",
      status: "Active",
      displayOrder: 3,
    },
    {
      id: 5,
      name: "Payment",
      key: "payment",
      status: "Active",
      displayOrder: 4,
    },
    { id: 3, name: "API", key: "api", status: "Active", displayOrder: 5 },
    { id: 2, name: "Custom", key: "custom", status: "Active", displayOrder: 6 },
    {
      id: 1,
      name: "General",
      key: "general",
      status: "Active",
      displayOrder: 7,
    },
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newGroup, setNewGroup] = useState({
    name: "",
    key: "",
    status: "Active",
  });
  const [editData, setEditData] = useState({
    name: "",
    key: "",
    status: "Active",
  });

  const handleAdd = () => {
    setIsAddModalOpen(true);
    setNewGroup({
      name: "",
      key: "",
      status: "Active",
    });
  };

  const handleEdit = (group) => {
    setSelectedGroup(group);
    setEditData({
      name: group.name,
      key: group.key,
      status: group.status,
    });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this setting group?")) {
      setGroups(groups.filter((group) => group.id !== id));
    }
  };

  const handleSaveNew = () => {
    const newId = Math.max(...groups.map((g) => g.id)) + 1;
    const displayOrder = Math.max(...groups.map((g) => g.displayOrder)) + 1;
    setGroups([
      ...groups,
      {
        id: newId,
        ...newGroup,
        displayOrder,
      },
    ]);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = () => {
    setGroups(
      groups.map((group) =>
        group.id === selectedGroup.id ? { ...group, ...editData } : group
      )
    );
    setIsEditModalOpen(false);
  };

  const handleStatusToggle = (id) => {
    setGroups(
      groups.map((group) =>
        group.id === id
          ? {
              ...group,
              status: group.status === "Active" ? "Inactive" : "Active",
            }
          : group
      )
    );
  };

  const filteredGroups = groups
    .filter(
      (group) =>
        group.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        group.key.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Setting Group Management All Group List
              </h1>
              <nav className="text-sm text-green-600 mt-1">
                Home / Setting Group
              </nav>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search groups..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-44"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <button
                onClick={handleAdd}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
              >
                <Plus size={18} className="mr-2" />
                Add Setting Group
              </button>
            </div>
          </div>
        </header>

        {/* Groups Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 text-gray-700 font-semibold">
            <div className="col-span-1">ID</div>
            <div className="col-span-4">Name</div>
            <div className="col-span-3">Group Key</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-center">Action</div>
          </div>

          <div className="divide-y divide-gray-200">
            {filteredGroups.map((group) => (
              <div
                key={group.id}
                className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50"
              >
                <div className="col-span-1 font-medium text-gray-900">
                  {group.id}
                </div>
                <div className="col-span-4 text-gray-900">{group.name}</div>
                <div className="col-span-3">
                  <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                    {group.key}
                  </code>
                </div>
                <div className="col-span-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      group.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {group.status}
                  </span>
                </div>
                <div className="col-span-2 flex justify-center space-x-3">
                  <button
                    onClick={() => handleEdit(group)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
                    title="Edit group"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(group.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                    title="Delete group"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Group Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Add Setting Group
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
                    Group Name
                  </label>
                  <input
                    type="text"
                    value={newGroup.name}
                    onChange={(e) =>
                      setNewGroup({ ...newGroup, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter group name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Key
                  </label>
                  <input
                    type="text"
                    value={newGroup.key}
                    onChange={(e) =>
                      setNewGroup({
                        ...newGroup,
                        key: e.target.value.toLowerCase().replace(/\s+/g, "_"),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter group key"
                  />
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
                        checked={newGroup.status === "Active"}
                        onChange={(e) =>
                          setNewGroup({ ...newGroup, status: e.target.value })
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2">Active</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="status"
                        value="Inactive"
                        checked={newGroup.status === "Inactive"}
                        onChange={(e) =>
                          setNewGroup({ ...newGroup, status: e.target.value })
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2">Inactive</span>
                    </label>
                  </div>
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
                  onClick={handleSaveNew}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center"
                >
                  <Plus size={18} className="mr-2" />
                  Add Group
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Group Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-md">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">
                  Edit Setting Group
                </h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Name
                  </label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) =>
                      setEditData({ ...editData, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Key
                  </label>
                  <input
                    type="text"
                    value={editData.key}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        key: e.target.value.toLowerCase().replace(/\s+/g, "_"),
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <div className="flex space-x-4">
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="edit-status"
                        value="Active"
                        checked={editData.status === "Active"}
                        onChange={(e) =>
                          setEditData({ ...editData, status: e.target.value })
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2">Active</span>
                    </label>
                    <label className="inline-flex items-center">
                      <input
                        type="radio"
                        name="edit-status"
                        value="Inactive"
                        checked={editData.status === "Inactive"}
                        onChange={(e) =>
                          setEditData({ ...editData, status: e.target.value })
                        }
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2">Inactive</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="px-4 py-2 text-gray-700 hover:text-gray-900 font-medium"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEdit}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center"
                >
                  <Save size={18} className="mr-2" />
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
