import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useTheme from "../Hook/ThemeContext";

import {
  FaPlane,
  FaSearch,
  FaTimes,
  FaSun,
  FaMoon,
  FaChevronDown,
} from "react-icons/fa";
import { HiOutlineXMark, HiOutlineBars3 } from "react-icons/hi2";
import { toast } from "react-hot-toast";
import api from "../../api/axios";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Packages dropdown (desktop)
  const [packagesOpen, setPackagesOpen] = useState(false);
  const packagesRef = useRef(null);

  // Packages dropdown (mobile)
  const [mobilePackagesOpen, setMobilePackagesOpen] = useState(false);

  const navigate = useNavigate();

  const { themeMode, lightMode, darkMode } = useTheme();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Fetch packages for search suggestions using React Query
  const { data: packages = [] } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const response = await api.get("/packages");
      return response.data;
    },
    onError: () => {
      toast.error("Failed to load search suggestions");
    },
  });

  // Suggestions
  const suggestions = packages.filter((packageitem) => {
    return packageitem.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Clear search term when navigating to any page other than /package
  useEffect(() => {
    if (location.pathname !== "/package") {
      setSearchTerm("");
    }
  }, [location.pathname]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Close desktop packages dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (packagesRef.current && !packagesRef.current.contains(e.target)) {
        setPackagesOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    themeMode === "light" ? darkMode() : lightMode();
  };

  // Logout
  const handleLogout = async () => {
    try {
      await api.post("/logout");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  // Desktop navigation
  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 transition-colors duration-300 ${
      isHomePage && !scrolled
        ? isActive
          ? "text-white font-semibold"
          : "text-gray-200 hover:text-white"
        : isActive
          ? "text-[#064E3B] dark:text-[#064E3B] font-semibold"
          : "text-gray-700 dark:text-gray-300 hover:text-[#064E3B] dark:hover:text-[#064E3B]"
    }`;

  // Mobile navigation
  const mobileNavLinkStyle = ({ isActive }) =>
    `block px-4 py-2 transition-colors duration-300 ${
      isActive
        ? "text-[#064E3B] dark:text-[#064E3B] font-semibold"
        : "text-gray-700 dark:text-gray-300 hover:text-[#064E3B] dark:hover:text-[#064E3B]"
    }`;

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      return;
    }
    navigate(`/package?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  // Clear search input when navigating to a new page
  const clearSearch = () => {
    setSearchTerm("");
    navigate("/package");
  };

  return (
    <header
      className={
        isHomePage
          ? `fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
              scrolled
                ? "bg-[#FFFFFF] dark:bg-[#FFFFFF] border-b border-[#DDE7DF] dark:border-[#DDE7DF]"
                : "bg-transparent border-b border-transparent"
            }`
          : "sticky top-0 w-full z-50 bg-[#FFFFFF] dark:bg-[#FFFFFF] border-b border-[#DDE7DF] dark:border-[#DDE7DF]"
      }
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-8">
        {/* ================= NAVBAR ================= */}
        <div className="flex items-center justify-between h-20">
          {/* ================= LOGO ================= */}
          <Link
            to="/"
            className={`flex items-center gap-2 text-xl sm:text-2xl font-bold whitespace-nowrap transition-colors duration-300 ${
              isHomePage && !scrolled
                ? "text-white"
                : "text-slate-900 dark:text-slate-900"
            }`}
          >
            <FaPlane
              className={`text-2xl sm:text-3xl transition-colors duration-300 ${
                isHomePage && !scrolled ? "text-emerald-400" : "text-[#064E3B]"
              }`}
            />
            <span>
              Travel{" "}
              <span
                className={`transition-colors duration-300 ${
                  isHomePage && !scrolled ? "text-emerald-400" : "text-[#064E3B]"
                }`}
              >
                Mate
              </span>
            </span>
          </Link>

          {/* ================= DESKTOP NAV ================= */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-1">
              <li>
                <NavLink to="/" className={navLinkStyle}>
                  Home
                </NavLink>
              </li>

              {/* Packages with dropdown */}
              <li
                ref={packagesRef}
                className="relative"
                onMouseEnter={() => setPackagesOpen(true)}
                onMouseLeave={() => setPackagesOpen(false)}
              >
                <NavLink to="/package" className={navLinkStyle}>
                  <span className="inline-flex items-center gap-1.5">
                    Packages
                    <FaChevronDown
                      className={`text-xs transition-transform duration-200 ${
                        packagesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </span>
                </NavLink>

                {packagesOpen && (
                  <div className="absolute top-full left-0 pt-3 w-60 z-50">
                    <div
                      className={`border overflow-hidden py-1.5 ${
                        isHomePage && !scrolled
                          ? "bg-[#064E3B]/95 backdrop-blur-md border-white/10 shadow-2xl shadow-black/40"
                          : "bg-[#FFFFFF] dark:bg-[#FFFFFF] border-[#DDE7DF] dark:border-[#DDE7DF] shadow-xl"
                      }`}
                    >
                      <PackageDropdownItem
                        to="/package?category=all"
                        label="All Packages"
                        dark={isHomePage && !scrolled}
                      />
                      <PackageDropdownItem
                        to="/package?category=trekking"
                        label="Trekking"
                        dark={isHomePage && !scrolled}
                      />
                      <PackageDropdownItem
                        to="/package?category=tour"
                        label="Tours"
                        dark={isHomePage && !scrolled}
                      />
                      <PackageDropdownItem
                        to="/package?category=wildlife"
                        label="Wildlife Safaris"
                        dark={isHomePage && !scrolled}
                      />

                      {/* ... */}
                    </div>
                  </div>
                )}
              </li>

              <li>
                <NavLink to="/plan" className={navLinkStyle}>
                  Plan
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" className={navLinkStyle}>
                  About
                </NavLink>
              </li>

              <li>
                <NavLink to="/my-bookings" className={navLinkStyle}>
                  Bookings
                </NavLink>
              </li>
              <li>
                <NavLink to="/my-plans" className={navLinkStyle}>
                  My Plans
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-3">
            {/* Desktop Search */}
            <div
              className={`hidden lg:flex relative items-center w-64 px-4 py-2 border transition-colors duration-300 ${
                isHomePage && !scrolled
                  ? "border-white/30 bg-[#FFFFFF]/10"
                  : "border-[#CDD9CF] bg-[#FFFFFF] dark:border-[#CDD9CF] dark:bg-[#FFFFFF]"
              }`}
            >
              <FaSearch
                className={`text-sm ${
                  isHomePage && !scrolled
                    ? "text-white/80"
                    : "text-slate-500 dark:text-slate-600"
                }`}
              />

              <form
                id="searchform"
                onSubmit={handleSearch}
                action=""
                method="get"
                className="flex-1 flex items-center"
              >
                <input
                  type="text"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                  placeholder="Search destinations..."
                  className={`ml-3 flex-1 bg-transparent outline-none text-sm ${
                    isHomePage && !scrolled
                      ? "text-white placeholder:text-slate-200"
                      : "text-slate-800 dark:text-slate-900 placeholder:text-slate-500 dark:placeholder:text-slate-500"
                  }`}
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className={`ml-2 ${
                      isHomePage && !scrolled
                        ? "text-white/80 hover:text-white"
                        : "text-slate-500 hover:text-slate-800 dark:text-slate-600 dark:hover:text-white"
                    }`}
                  >
                    <FaTimes size={14} />
                  </button>
                )}
              </form>

              {/* Suggestions dropdown */}
              {searchTerm && suggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-[#FFFFFF] dark:bg-[#FFFFFF] border border-[#DDE7DF] dark:border-[#DDE7DF] overflow-hidden z-50">
                  {suggestions.slice(0, 5).map((packageItem) => (
                    <button
                      key={packageItem.id}
                      type="button"
                      onClick={() => {
                        setSearchTerm(packageItem.title);
                        navigate(
                          `/package?search=${encodeURIComponent(packageItem.title)}`,
                        );
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-[#EEF4EF] dark:hover:bg-[#EEF4EF] border-b border-[#E4EDE6] dark:border-[#DDE7DF] last:border-b-0 transition-colors"
                    >
                      <div className="font-medium text-sm text-slate-900 dark:text-slate-900">
                        {packageItem.title}
                      </div>

                      <div className="text-xs text-slate-500 dark:text-slate-600 mt-0.5">
                        {packageItem.location}
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`grid place-items-center w-9 h-9 border transition-colors duration-300 ${
                isHomePage && !scrolled
                  ? "border-white/30 text-white hover:bg-[#FFFFFF]/10"
                  : "border-[#CDD9CF] dark:border-[#CDD9CF] text-slate-700 dark:text-slate-700 hover:bg-[#EEF4EF] dark:hover:bg-[#EEF4EF]"
              }`}
            >
              {themeMode === "light" ? (
                <FaSun className="text-sm" />
              ) : (
                <FaMoon className="text-sm" />
              )}
            </button>

            {/* Desktop Login / Logout */}
            {!token && !user ? (
              <div className="hidden lg:flex items-center gap-4">
                <Link
                  to="/signup"
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isHomePage && !scrolled
                      ? "text-white hover:text-emerald-300"
                      : "text-slate-700 dark:text-slate-800 hover:text-[#064E3B]"
                  }`}
                >
                  Register
                </Link>

                <Link
                  to="/login"
                  className="bg-[#064E3B] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#04382A]"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-4">
                <button
                  onClick={handleLogout}
                  className="bg-[#064E3B] px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-[#04382A]"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden text-2xl transition-colors duration-300 ${
                isHomePage && !scrolled
                  ? "text-white"
                  : "text-slate-800 dark:text-slate-900"
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div
          className={`lg:hidden overflow-hidden bg-[#FFFFFF] dark:bg-[#FFFFFF] border-t border-[#DDE7DF] dark:border-[#DDE7DF] transition-[max-height] duration-300 ${
            menuOpen ? "max-h-150 py-4" : "max-h-0"
          }`}
        >
          {/* Mobile Search */}
          <div className="px-4 pt-2">
            <form
              onSubmit={handleSearch}
              className="flex items-center w-full border border-[#CDD9CF] dark:border-[#CDD9CF] bg-[#FFFFFF] dark:bg-[#FFFFFF] px-4 py-2"
            >
              <FaSearch className="text-sm text-slate-500 dark:text-slate-600" />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search destinations..."
                className="ml-3 flex-1 bg-transparent outline-none text-sm text-slate-800 dark:text-slate-900 placeholder:text-slate-500 dark:placeholder:text-slate-500"
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className="ml-2 text-slate-500 hover:text-slate-800 dark:text-slate-600 dark:hover:text-white"
                >
                  <FaTimes size={14} />
                </button>
              )}
            </form>
          </div>

          {/* Mobile Nav */}
          <ul className="flex flex-col pt-3">
            <li>
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={mobileNavLinkStyle}
              >
                Home
              </NavLink>
            </li>

            {/* Packages with sub-items */}
            <li>
              <button
                type="button"
                onClick={() => setMobilePackagesOpen(!mobilePackagesOpen)}
                className="w-full flex items-center justify-between px-4 py-2 text-gray-700 dark:text-gray-300 hover:text-[#064E3B] dark:hover:text-[#064E3B] transition-colors duration-300"
              >
                <span>Packages</span>
                <FaChevronDown
                  className={`text-xs transition-transform duration-200 ${
                    mobilePackagesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {mobilePackagesOpen && (
                <div className="pl-4">
                  <NavLink
                    to="/package"
                    onClick={() => setMenuOpen(false)}
                    className={mobileNavLinkStyle}
                  >
                    All Packages
                  </NavLink>

                  <NavLink
                    to="/package?category=trekking"
                    onClick={() => setMenuOpen(false)}
                    className={mobileNavLinkStyle}
                  >
                    Treks
                  </NavLink>

                  <NavLink
                    to="/package?category=tour"
                    onClick={() => setMenuOpen(false)}
                    className={mobileNavLinkStyle}
                  >
                    Tours
                  </NavLink>

                  <NavLink
                    to="/package?category=wildlife"
                    onClick={() => setMenuOpen(false)}
                    className={mobileNavLinkStyle}
                  >
                    Wildlife Safaris
                  </NavLink>
                </div>
              )}
            </li>

            <li>
              <NavLink
                to="/plan"
                onClick={() => setMenuOpen(false)}
                className={mobileNavLinkStyle}
              >
                Plan
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={mobileNavLinkStyle}
              >
                About
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/my-bookings"
                onClick={() => setMenuOpen(false)}
                className={mobileNavLinkStyle}
              >
                Bookings
              </NavLink>
            </li>
          </ul>

          {/* Mobile Login / Logout */}
          {!token && !user ? (
            <div className="flex flex-col gap-2 px-4 pt-4">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-center px-4 py-2 border border-[#064E3B] text-[#064E3B] hover:bg-[#04382A] hover:text-white transition-colors"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-center px-4 py-2 bg-[#064E3B] text-white hover:bg-[#04382A] transition-colors"
              >
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3 px-4 pt-4">
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full bg-[#064E3B] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#04382A]"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

/* ---------- Subcomponent ---------- */

function PackageDropdownItem({ to, label, dark }) {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 px-4 py-2.5 text-sm transition-colors ${
        dark
          ? "text-slate-200 hover:bg-[#FFFFFF]/10 hover:text-white"
          : "text-slate-700 dark:text-slate-700 hover:bg-[#EEF4EF] dark:hover:bg-[#EEF4EF]/60 hover:text-[#064E3B]"
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          dark ? "bg-[#064E3B]" : "bg-[#DCE7DE] dark:bg-[#CDD9CF]"
        }`}
      />
      <span>{label}</span>
    </Link>
  );
}
