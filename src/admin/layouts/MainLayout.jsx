import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Footer from "./Footer";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#EEF4EF] text-slate-900">
      {/* Sidebar */}
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      {/* Main wrapper - exactly like CoreUI wrapper */}
      <div className="lg:pl-72 flex flex-col min-h-screen transition-all duration-300">
        <Header setSidebarOpen={setSidebarOpen} />

        <main className="flex-1 p-4 sm:p-6 bg-[#EEF4EF] overflow-y-auto">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
}