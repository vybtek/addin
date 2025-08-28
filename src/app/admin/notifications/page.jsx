"use client";

import React, { useState } from "react";
import {
  Trash2,
  Bell,
  CheckCircle,
  AlertCircle,
  Info,
  User,
  Settings,
  Mail,
  Filter,
  Search,
  Eye,
  EyeOff,
  Calendar,
} from "lucide-react";

// NotificationItem Component
function NotificationItem({
  id,
  notification,
  date,
  unread,
  type = "info",
  onDelete,
  onToggleRead,
}) {
  const getIcon = () => {
    switch (type) {
      case "user":
        return <User className="w-5 h-5" />;
      case "system":
        return <Settings className="w-5 h-5" />;
      case "message":
        return <Mail className="w-5 h-5" />;
      case "alert":
        return <AlertCircle className="w-5 h-5" />;
      default:
        return <Info className="w-5 h-5" />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case "user":
        return "bg-blue-100 text-blue-600";
      case "system":
        return "bg-green-100 text-green-600";
      case "message":
        return "bg-purple-100 text-purple-600";
      case "alert":
        return "bg-amber-100 text-amber-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getTypeLabel = () => {
    switch (type) {
      case "user":
        return "User Activity";
      case "system":
        return "System Update";
      case "message":
        return "New Message";
      case "alert":
        return "Important Alert";
      default:
        return "Information";
    }
  };

  return (
    <div
      className={`group relative flex items-start gap-4 p-6 transition-all duration-200 hover:bg-gray-50 ${
        unread
          ? "bg-blue-50/50 border-l-4 border-l-blue-500"
          : "border-l-4 border-l-transparent"
      }`}
    >
      {/* Icon */}
      <div
        className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center ${getIconBg()}`}
      >
        {getIcon()}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                #{id}
              </span>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full ${getIconBg()}`}
              >
                {getTypeLabel()}
              </span>
              {unread && (
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  New
                </span>
              )}
            </div>
            <p
              className={`text-base leading-relaxed ${
                unread ? "font-medium text-gray-900" : "text-gray-700"
              }`}
            >
              {notification}
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500 mt-3">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 ml-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => onToggleRead(id)}
              className={`p-2 rounded-lg transition-colors ${
                unread
                  ? "text-blue-600 hover:bg-blue-100"
                  : "text-gray-400 hover:bg-gray-100"
              }`}
              title={unread ? "Mark as read" : "Mark as unread"}
            >
              {unread ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
            <button
              onClick={() => onDelete(id)}
              className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"
              title="Delete notification"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Filter Component
function FilterBar({ filter, setFilter, searchTerm, setSearchTerm }) {
  const filters = [
    { key: "all", label: "All" },
    { key: "unread", label: "Unread" },
    { key: "user", label: "User" },
    { key: "system", label: "System" },
    { key: "message", label: "Messages" },
    { key: "alert", label: "Alerts" },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-4 p-4 bg-white rounded-xl shadow-sm border mb-6">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search notifications..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f.key
                ? "bg-blue-100 text-blue-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>
    </div>
  );
}

// Main Notifications Component
export default function Notifications() {
  const [notifications, setNotifications] = useState([
    {
      id: 5001,
      notification:
        "New user registered: John Doe has successfully created an account and completed the verification process.",
      date: "27 Aug 2025 03:15 PM",
      unread: true,
      type: "user",
    },
    {
      id: 5002,
      notification:
        "System update completed successfully. All services are running normally with improved performance and security patches.",
      date: "27 Aug 2025 02:45 PM",
      unread: true,
      type: "system",
    },
    {
      id: 5003,
      notification:
        "New message received from support team regarding the recent feature updates and user feedback.",
      date: "27 Aug 2025 01:30 PM",
      unread: false,
      type: "message",
    },
    {
      id: 5004,
      notification:
        "Database backup completed successfully. All data has been securely stored in the backup server.",
      date: "27 Aug 2025 12:15 PM",
      unread: false,
      type: "system",
    },
    {
      id: 5005,
      notification:
        "Security alert: Multiple failed login attempts detected from unusual location. Account has been temporarily locked for safety.",
      date: "26 Aug 2025 10:30 AM",
      unread: true,
      type: "alert",
    },
    {
      id: 5006,
      notification:
        "Monthly performance report is ready. System uptime was 99.98% with average response time of 120ms.",
      date: "25 Aug 2025 09:00 AM",
      unread: false,
      type: "info",
    },
  ]);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const handleDelete = (id) => {
    setNotifications(notifications.filter((item) => item.id !== id));
  };

  const handleToggleRead = (id) => {
    setNotifications(
      notifications.map((item) =>
        item.id === id ? { ...item, unread: !item.unread } : item
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((item) => ({ ...item, unread: false })));
  };

  const handleClearAll = () => {
    if (confirm("Are you sure you want to clear all notifications?")) {
      setNotifications([]);
    }
  };

  // Filter notifications based on selected filter and search term
  const filteredNotifications = notifications.filter((item) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "unread" && item.unread) ||
      item.type === filter;

    const matchesSearch =
      item.notification.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.type.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  const unreadCount = notifications.filter((item) => item.unread).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
            <div className="mb-4 sm:mb-0">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                Notifications
              </h1>
              <p className="text-gray-600">
                Stay updated with your admin activities and system events
              </p>
            </div>
            <nav className="text-sm text-gray-500">
              <span className="hover:text-gray-700 cursor-pointer">
                Dashboard
              </span>
              <span className="mx-2">/</span>
              <span className="text-gray-900 font-medium">Notifications</span>
            </nav>
          </div>

          {/* Stats and Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 sm:p-6 rounded-xl shadow-sm border">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total notifications</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {notifications.length}
                  </p>
                </div>
              </div>
              {unreadCount > 0 && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">
                      Unread notifications
                    </p>
                    <p className="text-lg font-semibold text-blue-600">
                      {unreadCount}
                    </p>
                  </div>
                </div>
              )}
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllAsRead}
                  className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  Mark all as read
                </button>
              )}
              {notifications.length > 0 && (
                <button
                  onClick={handleClearAll}
                  className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear all
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Filter Bar */}
        <FilterBar
          filter={filter}
          setFilter={setFilter}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Notifications List */}
        <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
          {filteredNotifications.length > 0 ? (
            <div className="divide-y divide-gray-100">
              {filteredNotifications.map((item) => (
                <NotificationItem
                  key={item.id}
                  {...item}
                  onDelete={handleDelete}
                  onToggleRead={handleToggleRead}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No notifications found
              </h3>
              <p className="text-gray-500 max-w-md mx-auto">
                {searchTerm || filter !== "all"
                  ? "Try adjusting your search or filter to find what you're looking for."
                  : "You're all caught up! Check back later for new updates."}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
