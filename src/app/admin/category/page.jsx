"use client";
import { useState } from "react";
import { Plus, Edit2, Trash2, Save, X, Search, Upload, Star, Eye } from "lucide-react";

export default function CategoryManagement() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Academic Tutor", description: "Professional academic tutoring services", status: "Active", categoryKey: "academic_tutor", displayOrder: 1, featured: true, thumbnail: "/api/placeholder/80/80", icon: "/api/placeholder/40/40" },
    { id: 2, name: "Dance Trainer", description: "Professional dance training services", status: "Active", categoryKey: "dance_trainer", displayOrder: 2, featured: false, thumbnail: "/api/placeholder/80/80", icon: "/api/placeholder/40/40" },
    { id: 4, name: "Music Trainer", description: "Professional music training services", status: "Active", categoryKey: "music_trainer", displayOrder: 3, featured: true, thumbnail: "/api/placeholder/80/80", icon: "/api/placeholder/40/40" },
    { id: 5, name: "Yoga Trainer", description: "Professional yoga training services", status: "Active", categoryKey: "yoga_trainer", displayOrder: 4, featured: false, thumbnail: "/api/placeholder/80/80", icon: "/api/placeholder/40/40" },
    { id: 13, name: "Drawing & Painting", description: "Art and painting classes", status: "Active", categoryKey: "drawing_painting", displayOrder: 5, featured: true, thumbnail: "/api/placeholder/80/80", icon: "/api/placeholder/40/40" },
    { id: 7, name: "Writing & Languages", description: "Writing and language courses", status: "Active", categoryKey: "writing_languages", displayOrder: 6, featured: false, thumbnail: "/api/placeholder/80/80", icon: "/api/placeholder/40/40" },
    { id: 8, name: "Personal Gym trainer", description: "Personal fitness training", status: "Active", categoryKey: "gym_trainer", displayOrder: 7, featured: true, thumbnail: "/api/placeholder/80/80", icon: "/api/placeholder/40/40" }
  ]);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [newCategory, setNewCategory] = useState({
    name: "",
    description: "",
    status: "Active",
    categoryKey: "",
    displayOrder: 1,
    featured: false,
    thumbnail: null,
    icon: null
  });
  const [editData, setEditData] = useState({
    name: "",
    description: "",
    status: "Active",
    categoryKey: "",
    displayOrder: 1,
    featured: false,
    thumbnail: null,
    icon: null
  });

  const handleAdd = () => {
    setIsAddModalOpen(true);
    setNewCategory({
      name: "",
      description: "",
      status: "Active",
      categoryKey: "",
      displayOrder: Math.max(...categories.map(c => c.displayOrder)) + 1,
      featured: false,
      thumbnail: null,
      icon: null
    });
  };

  const handleEdit = (category) => {
    setSelectedCategory(category);
    setEditData({ ...category });
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("Are you sure you want to delete this category?")) {
      setCategories(categories.filter(category => category.id !== id));
    }
  };

  const handleSaveNew = () => {
    const newId = Math.max(...categories.map(c => c.id)) + 1;
    setCategories([...categories, { 
      id: newId, 
      ...newCategory,
      categoryKey: newCategory.categoryKey || newCategory.name.toLowerCase().replace(/[^a-z0-9]+/g, '_')
    }]);
    setIsAddModalOpen(false);
  };

  const handleSaveEdit = () => {
    setCategories(categories.map(category => 
      category.id === selectedCategory.id 
        ? { ...category, ...editData }
        : category
    ));
    setIsEditModalOpen(false);
  };

  const handleStatusToggle = (id) => {
    setCategories(categories.map(category => 
      category.id === id 
        ? { ...category, status: category.status === "Active" ? "Inactive" : "Active" }
        : category
    ));
  };

  const handleFeaturedToggle = (id) => {
    setCategories(categories.map(category => 
      category.id === id 
        ? { ...category, featured: !category.featured }
        : category
    ));
  };

  const handleImageUpload = (e, field, isEdit = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (isEdit) {
          setEditData(prev => ({ ...prev, [field]: e.target.result }));
        } else {
          setNewCategory(prev => ({ ...prev, [field]: e.target.result }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  ).sort((a, b) => a.displayOrder - b.displayOrder);

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Category Management Category List</h1>
              <nav className="text-sm text-green-600 mt-1">Home / Category</nav>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
              <button
                onClick={handleAdd}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 flex items-center"
              >
                <Plus size={18} className="mr-2" />
                Add Category
              </button>
            </div>
          </div>
        </header>

        {/* Categories Table */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 text-gray-700 font-semibold">
            <div className="col-span-1">ID</div>
            <div className="col-span-3">Name</div>
            <div className="col-span-2">Thumbnail</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Featured</div>
            <div className="col-span-2 text-center">Action</div>
          </div>
          
          <div className="divide-y divide-gray-200">
            {filteredCategories.map((category) => (
              <div key={category.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-gray-50">
                <div className="col-span-1 font-medium text-gray-900">{category.id}</div>
                <div className="col-span-3">
                  <div className="font-medium text-gray-900">{category.name}</div>
                  <div className="text-sm text-gray-600">{category.description}</div>
                </div>
                <div className="col-span-2">
                  {category.thumbnail && (
                    <img 
                      src={category.thumbnail} 
                      alt={category.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                  )}
                </div>
                <div className="col-span-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    category.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {category.status}
                  </span>
                </div>
                <div className="col-span-2">
                  <button
                    onClick={() => handleFeaturedToggle(category.id)}
                    className={`p-2 rounded-full ${
                      category.featured 
                        ? "text-yellow-500 bg-yellow-100" 
                        : "text-gray-400 bg-gray-100"
                    }`}
                    title={category.featured ? "Remove featured" : "Mark as featured"}
                  >
                    <Star size={18} fill={category.featured ? "currentColor" : "none"} />
                  </button>
                </div>
                <div className="col-span-2 flex justify-center space-x-3">
                  <button
                    onClick={() => handleEdit(category)}
                    className="text-blue-600 hover:text-blue-800 p-2 rounded-lg hover:bg-blue-50"
                    title="Edit category"
                  >
                    <Edit2 size={18} />
                  </button>
                  <button
                    onClick={() => handleDelete(category.id)}
                    className="text-red-600 hover:text-red-800 p-2 rounded-lg hover:bg-red-50"
                    title="Delete category"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add Category Modal */}
        {isAddModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Add Category</h2>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name (en)</label>
                  <input
                    type="text"
                    value={newCategory.name}
                    onChange={(e) => setNewCategory({...newCategory, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter category name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={newCategory.status}
                    onChange={(e) => setNewCategory({...newCategory, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (en)</label>
                  <textarea
                    value={newCategory.description}
                    onChange={(e) => setNewCategory({...newCategory, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter category description"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Featured</label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={newCategory.featured}
                      onChange={(e) => setNewCategory({...newCategory, featured: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="ml-2">Mark as featured</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thumb Image</label>
                  <div className="flex items-center space-x-3">
                    <label className="flex-1">
                      <input
                        type="file"
                        onChange={(e) => handleImageUpload(e, 'thumbnail', false)}
                        className="hidden"
                        accept="image/*"
                      />
                      <div className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 text-center">
                        <Upload size={16} className="inline mr-2" />
                        Upload Thumbnail
                      </div>
                    </label>
                    {newCategory.thumbnail && (
                      <img src={newCategory.thumbnail} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon Image</label>
                  <div className="flex items-center space-x-3">
                    <label className="flex-1">
                      <input
                        type="file"
                        onChange={(e) => handleImageUpload(e, 'icon', false)}
                        className="hidden"
                        accept="image/*"
                      />
                      <div className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 text-center">
                        <Upload size={16} className="inline mr-2" />
                        Upload Icon
                      </div>
                    </label>
                    {newCategory.icon && (
                      <img src={newCategory.icon} alt="Preview" className="w-8 h-8 rounded object-cover" />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Key</label>
                  <input
                    type="text"
                    value={newCategory.categoryKey}
                    onChange={(e) => setNewCategory({...newCategory, categoryKey: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="auto-generated if empty"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                  <input
                    type="number"
                    value={newCategory.displayOrder}
                    onChange={(e) => setNewCategory({...newCategory, displayOrder: parseInt(e.target.value) || 1})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                  />
                </div>
                <div className="md:col-span-2 flex items-center">
                  <input
                    id="add-more"
                    type="checkbox"
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                  />
                  <label htmlFor="add-more" className="ml-2 text-sm text-gray-700">
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
                  Add Category
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Edit Category Modal */}
        {isEditModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <h2 className="text-xl font-bold text-gray-900">Edit Category</h2>
                <button
                  onClick={() => setIsEditModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 rounded-full hover:bg-gray-100"
                >
                  <X size={24} />
                </button>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name (en)</label>
                  <input
                    type="text"
                    value={editData.name}
                    onChange={(e) => setEditData({...editData, name: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    value={editData.status}
                    onChange={(e) => setEditData({...editData, status: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description (en)</label>
                  <textarea
                    value={editData.description}
                    onChange={(e) => setEditData({...editData, description: e.target.value})}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Featured</label>
                  <label className="inline-flex items-center">
                    <input
                      type="checkbox"
                      checked={editData.featured}
                      onChange={(e) => setEditData({...editData, featured: e.target.checked})}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="ml-2">Mark as featured</span>
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Thumb Image</label>
                  <div className="flex items-center space-x-3">
                    <label className="flex-1">
                      <input
                        type="file"
                        onChange={(e) => handleImageUpload(e, 'thumbnail', true)}
                        className="hidden"
                        accept="image/*"
                      />
                      <div className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 text-center">
                        <Upload size={16} className="inline mr-2" />
                        Upload Thumbnail
                      </div>
                    </label>
                    {editData.thumbnail && (
                      <img src={editData.thumbnail} alt="Preview" className="w-12 h-12 rounded-lg object-cover" />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Icon Image</label>
                  <div className="flex items-center space-x-3">
                    <label className="flex-1">
                      <input
                        type="file"
                        onChange={(e) => handleImageUpload(e, 'icon', true)}
                        className="hidden"
                        accept="image/*"
                      />
                      <div className="w-full px-3 py-2 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 text-center">
                        <Upload size={16} className="inline mr-2" />
                        Upload Icon
                      </div>
                    </label>
                    {editData.icon && (
                      <img src={editData.icon} alt="Preview" className="w-8 h-8 rounded object-cover" />
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category Key</label>
                  <input
                    type="text"
                    value={editData.categoryKey}
                    onChange={(e) => setEditData({...editData, categoryKey: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Display Order</label>
                  <input
                    type="number"
                    value={editData.displayOrder}
                    onChange={(e) => setEditData({...editData, displayOrder: parseInt(e.target.value) || 1})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    min="1"
                  />
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