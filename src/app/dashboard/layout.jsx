"use client";

import Header from "@/components/dashboard/Home/Header";
import Sidebar from "@/components/dashboard/Home/Sidebar";

const Layout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-gray-100 text-gray-800">
      <aside>
        <Sidebar />
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
