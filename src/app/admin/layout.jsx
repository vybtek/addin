"use client";
import Sidebar from "@/components/admin/Sidebar";
import React from "react";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-50 text-gray-800" role="main">
      <aside
        className="w-64 shrink-0 bg-white shadow-lg"
        aria-label="Dashboard Sidebar"
      >
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main
          className="flex-1 p-6 overflow-y-auto"
          role="region"
          aria-label="Main Content"
        >
          {children}
          {/* Footer */}
          <footer className="text-center text-gray-500 text-sm">
            Copyright © 2025 All rights reserved.
          </footer>
        </main>
      </div>
    </div>
  );
};

export default Layout;
