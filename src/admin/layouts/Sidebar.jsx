import React from "react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Sidebar({ sidebarOpen, setSidebarOpen }) {
  const [openPackages, setOpenPackages] = useState(false);

  return (
    <>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300 ${
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-72 bg-[#FFFFFF] border-r border-[#DDE7DF] transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#DDE7DF]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#047857] flex items-center justify-center text-white font-bold text-lg">
              T
            </div>
            <div>
              <h1 className="text-slate-900 font-bold text-lg">TravelMate</h1>
              <p className="text-slate-600 text-xs">Admin Panel</p>
            </div>
          </div>

          {/* Mobile close button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 rounded-lg hover:bg-[#EEF4EF]"
          >
            <svg
              className="w-5 h-5 text-slate-900"
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
        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-2">
       

          <NavLink
            to=""
            className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-700 hover:bg-[#EEF4EF] hover:text-slate-900"
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
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3"
              />
            </svg>
            <span>Home</span>
          </NavLink>

          {/* Section */}
          <div className="pt-6">
            <p className="px-4 text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
              Management
            </p>

            {/* Packages Dropdown */}
            <div className="space-y-1">
              <button
                onClick={() => setOpenPackages(!openPackages)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-slate-700 hover:bg-[#EEF4EF] hover:text-slate-900 transition"
              >
                <div className="flex items-center gap-3">
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
                      d="M20 13V7a2 2 0 00-2-2H6a2 2 0 00-2 2v6m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0H4"
                    />
                  </svg>
                  <span>Packages</span>
                </div>

                <svg
                  className={`w-4 h-4 transition-transform ${
                    openPackages ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {openPackages && (
                <div className="ml-6 space-y-1">
                  <NavLink
                    to="/admin/add-package"
                    className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-[#EEF4EF] hover:text-slate-900 transition"
                  >
                    Add Package
                  </NavLink>

                  <NavLink
                    to="/admin/view-packages"
                    className="block px-4 py-2 rounded-lg text-slate-700 hover:bg-[#EEF4EF] hover:text-slate-900 transition"
                  >
                    View Packages
                  </NavLink>
                </div>
              )}

              {/* Simple links */}
              <NavLink
                to="/admin/view-users"
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-700 hover:bg-[#EEF4EF] hover:text-slate-900"
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
                    d="M17 20h5V4H2v16h5m10 0v-2a4 4 0 00-4-4H9a4 4 0 00-4 4v2m12 0H7m10-10a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
                <span>Users</span>
              </NavLink>

              <NavLink
                to="/admin/view-bookings"
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-700 hover:bg-[#EEF4EF] hover:text-slate-900"
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
                    d="M8 7V3m8 4V3m-9 8h10m-11 9h12a2 2 0 002-2V7a2 2 0 00-2-2H6a2 2 0 00-2 2v11a2 2 0 002 2z"
                  />
                </svg>
                <span>Bookings</span>
              </NavLink>
              <NavLink
                to="/admin/reviews"
                className="flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 text-slate-700 hover:bg-[#EEF4EF] hover:text-slate-900"
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
                    d="M11.049 2.927c.3-.921 1.608-2.023 3.176-2.023s2.877 1.102 3.176 2.023c.458 1.498-.365 3.06-1.859 3.06H9c-1.494 0-2.317-1.562-1.859-3.06z"
                  />
                </svg>
                <span>Reviews</span>
              </NavLink>
            </div>
          </div>
        </nav>

        {/* Footer */}
      </aside>
    </>
  );
}
