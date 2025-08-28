"use client";
import { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Save,
  CheckSquare,
  Square,
  Filter,
} from "lucide-react";

export default function MenuPermission() {
  const [roles] = useState([
    { id: 1, name: "Admin" },
    { id: 2, name: "Editor" },
    { id: 3, name: "Moderator" },
    { id: 4, name: "Viewer" },
  ]);

  const [selectedRole, setSelectedRole] = useState(null);
  const [expandedMenus, setExpandedMenus] = useState({});
  const [permissions, setPermissions] = useState({});

  // Menu structure with submenus and codes
  const menuStructure = [
    {
      id: "setting",
      name: "Setting",
      description: "Website Setting",
      code: "MEN0001",
      subMenus: [],
    },
    {
      id: "admin",
      name: "Admin",
      description: "Admin Control Panel",
      code: "MEN0004",
      subMenus: [],
    },
    {
      id: "management",
      name: "Management",
      description: "Management",
      code: "MEN0010",
      subMenus: [],
    },
    {
      id: "member",
      name: "Member",
      description: "Member Management",
      code: "MEN003_UST",
      subMenus: [],
    },
    {
      id: "projects",
      name: "Projects",
      description: "Project Management",
      code: "MEN0055",
      subMenus: [],
    },
    {
      id: "user-contact",
      name: "User Contact",
      description: "User Contact Management",
      code: "MEN0099",
      subMenus: [],
    },
    {
      id: "report-incorrect",
      name: "Report Incorrect",
      description: "Reports Management System",
      code: "MEN0061",
      subMenus: [],
    },
    {
      id: "fund-management",
      name: "Fund Management",
      description: "Fund Management",
      code: "MEN0078",
      subMenus: [],
    },
  ];

  const toggleMenu = (menuId) => {
    setExpandedMenus((prev) => ({
      ...prev,
      [menuId]: !prev[menuId],
    }));
  };

  const togglePermission = (menuId, subMenuId = null) => {
    setPermissions((prev) => {
      const newPermissions = { ...prev };
      const key = subMenuId ? `${menuId}-${subMenuId}` : menuId;

      newPermissions[key] = !newPermissions[key];
      return newPermissions;
    });
  };

  const selectAllPermissions = () => {
    const allPermissions = {};
    menuStructure.forEach((menu) => {
      allPermissions[menu.id] = true;
      menu.subMenus.forEach((subMenu) => {
        allPermissions[`${menu.id}-${subMenu.id}`] = true;
      });
    });
    setPermissions(allPermissions);
  };

  const clearAllPermissions = () => {
    setPermissions({});
  };

  const savePermissions = () => {
    alert(`Permissions saved successfully for ${selectedRole.name}`);
    // In a real application, you would send this data to your backend
    console.log("Saved permissions:", permissions);
  };

  const isMenuSelected = (menuId) => {
    return permissions[menuId] === true;
  };

  const MenuItem = ({ menu, level = 0 }) => {
    const hasSubMenus = menu.subMenus && menu.subMenus.length > 0;
    const isExpanded = expandedMenus[menu.id];
    const isSelected = isMenuSelected(menu.id);

    return (
      <div>
        <div
          className={`flex items-center p-3 hover:bg-gray-50 rounded-lg ${
            level > 0 ? "ml-6" : ""
          }`}
        >
          {hasSubMenus && (
            <button
              onClick={() => toggleMenu(menu.id)}
              className="mr-2 p-1 hover:bg-gray-100 rounded"
            >
              {isExpanded ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronRight size={16} />
              )}
            </button>
          )}
          {!hasSubMenus && level > 0 && <div className="w-6 mr-2" />}

          <button onClick={() => togglePermission(menu.id)} className="mr-3">
            {isSelected ? (
              <CheckSquare size={18} className="text-blue-600" />
            ) : (
              <Square size={18} className="text-gray-400" />
            )}
          </button>

          <div className="flex-1">
            <div className="font-medium text-gray-900">{menu.name}</div>
            <div className="text-sm text-gray-600">{menu.description}</div>
          </div>

          <div className="text-sm text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
            {menu.code}
          </div>
        </div>

        {hasSubMenus && isExpanded && (
          <div className="ml-6 border-l-2 border-gray-200 pl-2">
            {menu.subMenus.map((subMenu) => (
              <MenuItem key={subMenu.id} menu={subMenu} level={level + 1} />
            ))}
          </div>
        )}
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
                Menu Permission
              </h1>
              <nav className="text-sm text-green-600 mt-1">
                Home / Menu Permission
              </nav>
            </div>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <div className="relative">
                <select
                  value={selectedRole?.id || ""}
                  onChange={(e) =>
                    setSelectedRole(
                      roles.find((r) => r.id === parseInt(e.target.value)) ||
                        null
                    )
                  }
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64"
                >
                  <option value="">Select Role</option>
                  {roles.map((role) => (
                    <option key={role.id} value={role.id}>
                      {role.name}
                    </option>
                  ))}
                </select>
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Stats Card */}
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              Give Menu Permission
            </h2>
            <p className="text-gray-600">
              {selectedRole
                ? `Select permissions for ${selectedRole.name} role`
                : "Please select a role first to give permission"}
            </p>
          </div>
        </header>

        {!selectedRole ? (
          <div className="bg-white rounded-xl shadow-sm border p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Filter className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Role Selected
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Please select a role first to give permission
            </p>
          </div>
        ) : (
          <>
            {/* Bulk Actions */}
            <div className="bg-white p-4 rounded-xl shadow-sm border mb-6 flex items-center justify-between">
              <div>
                <span className="text-gray-600">Editing permissions for: </span>
                <span className="font-semibold text-blue-600">
                  {selectedRole.name}
                </span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={selectAllPermissions}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={clearAllPermissions}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>

            {/* Permissions Table */}
            <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 text-gray-700 font-semibold">
                <div className="col-span-5">Menu</div>
                <div className="col-span-5">Description</div>
                <div className="col-span-2">Menu Code</div>
              </div>

              <div className="divide-y divide-gray-200">
                {menuStructure.map((menu) => (
                  <MenuItem key={menu.id} menu={menu} />
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={() => setSelectedRole(null)}
                className="px-6 py-2 text-gray-700 hover:text-gray-900 font-medium border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={savePermissions}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center"
              >
                <Save size={18} className="mr-2" />
                Give Permission
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
