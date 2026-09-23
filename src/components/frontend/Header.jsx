import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import useTheme from "../Hook/ThemeContext";

import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";

import { FaSearch, FaPlane, FaTimes } from "react-icons/fa";
import api from "../../api/axios";

export default function Header() {
  const [searchTerm, setSearchTerm] = useState("");

  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const { themeMode, lightMode, darkMode } = useTheme();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  // Scroll effect for the header background color
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Theme toggle
  const toggleTheme = () => {
    themeMode === "light" ? darkMode() : lightMode();
  };

  // Logout
  const handleLogout = async () => {
    try {
      const response = await api.post("/logout");
      console.log(response);
    } catch (error) {
      console.log(error);
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
          ? "text-blue-600 dark:text-blue-400 font-semibold"
          : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  // Mobile navigation
  const mobileNavLinkStyle = ({ isActive }) =>
    `block px-4 py-2 transition-colors duration-300 ${
      isActive
        ? "text-blue-600 dark:text-blue-400 font-semibold"
        : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
    }`;

  // handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    if (searchTerm.trim() === "") {
      return; // Do not perform search if the input is empty
    }
    navigate(`/package?search=${encodeURIComponent(searchTerm.trim())}`);
  };

  //clear search input when navigating to a new page
  const clearSearch = () => {
    setSearchTerm("");
    navigate("/package");
  };

  return (
    <header
      className={
        isHomePage
          ? `fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
              scrolled
                ? "bg-white/60 backdrop-blur-lg shadow-lg"
                : "bg-transparent"
            }`
          : "sticky top-0 w-full z-50 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-md"
      }
    >
      <div className="max-w-screen-2xl mx-auto px-6">
        {/* ================= NAVBAR ================= */}
        <div className="flex items-center justify-between h-20">
          {/* ================= LOGO ================= */}
          <Link
            to="/"
            className={`text-xl sm:text-2xl font-bold whitespace-nowrap transition-colors duration-300 ${
              isHomePage && !scrolled
                ? "text-white"
                : "text-gray-900 dark:text-white"
            }`}
          >
            <FaPlane
              className={`inline-block text-3xl sm:text-4xl mr-2 transition-colors duration-300 ${
                isHomePage && !scrolled ? "text-blue-500" : "text-blue-600"
              }`}
            />
            Travel <span className="text-blue-600">Mate</span>
          </Link>

          {/* ================= DESKTOP NAVIGATION ================= */}
          <nav className="hidden lg:block">
            <ul className="flex items-center gap-2">
              <li>
                <NavLink to="/" className={navLinkStyle}>
                  Home
                </NavLink>
              </li>

              <li>
                <NavLink to="/package" className={navLinkStyle}>
                  Packages
                </NavLink>
              </li>

              <li>
                <NavLink to="/services" className={navLinkStyle}>
                  Services
                </NavLink>
              </li>

              <li>
                <NavLink to="/destination" className={navLinkStyle}>
                  Destinations
                </NavLink>
              </li>

              <li>
                <NavLink to="/about" className={navLinkStyle}>
                  About us
                </NavLink>
              </li>

              <li>
                <NavLink to="/my-bookings" className={navLinkStyle}>
                  Bookings
                </NavLink>
              </li>
            </ul>
          </nav>

          {/* ================= RIGHT SIDE ================= */}
          <div className="flex items-center gap-3">
            {/* Search */}
            <div
              className={`hidden lg:flex items-center w-64 px-4 py-2 rounded-full border backdrop-blur-md transition-all duration-300 ${
                isHomePage && !scrolled
                  ? "border-white/30 bg-white/10"
                  : "border-gray-300 bg-white/50 dark:border-gray-700 dark:bg-gray-800/70"
              }`}
            >
              <FaSearch
                className={
                  isHomePage && !scrolled
                    ? "text-white/80"
                    : "text-gray-500 dark:text-gray-400"
                }
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
                      ? "text-white placeholder:text-gray-200"
                      : "text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  }`}
                />

                {searchTerm && (
                  <button
                    type="button"
                    onClick={clearSearch}
                    className={
                      isHomePage && !scrolled
                        ? "text-white/80 hover:text-white"
                        : "text-gray-500 hover:text-gray-800 dark:text-gray-400 dark:hover:text-white"
                    }
                  >
                    <FaTimes size={14} />
                  </button>
                )}
              </form>
            </div>
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                themeMode === "light"
                  ? isHomePage && !scrolled
                    ? "bg-white/30"
                    : "bg-gray-300/70 dark:bg-gray-700"
                  : "bg-blue-600/80"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white flex items-center justify-center transition-transform duration-300 ${
                  themeMode === "light" ? "translate-x-0" : "translate-x-7"
                }`}
              >
                {themeMode === "light" ? "☀️" : "🌙"}
              </span>
            </button>

            {/* Desktop Login / Logout */}
            {!token && !user ? (
              <div className="hidden lg:flex items-center gap-3">
                {/* Register */}
                <Link
                  to="/signup"
                  className={`transition-colors duration-300 ${
                    isHomePage && !scrolled
                      ? "text-white hover:text-blue-300"
                      : "text-gray-800 dark:text-white hover:text-blue-600"
                  }`}
                >
                  Register
                </Link>

                {/* Login */}
                <Link
                  to="/login"
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white cursor-pointer shadow-sm transition hover:bg-blue-700"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-4">
                {/* Logout */}
                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white cursor-pointer shadow-sm transition hover:bg-blue-700"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className={`lg:hidden text-3xl transition-colors duration-300 ${
                isHomePage && !scrolled
                  ? "text-white"
                  : "text-gray-800 dark:text-white"
              }`}
              aria-label="Toggle menu"
            >
              {menuOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
            </button>
          </div>
        </div>

        {/* ================= MOBILE MENU ================= */}
        <div
          className={`lg:hidden overflow-hidden bg-white dark:bg-gray-900 rounded-b-xl shadow-lg transition-all duration-300 ${
            menuOpen ? "max-h-[600px] py-4" : "max-h-0"
          }`}
        >
          {/* Mobile Search */}
          <div className="px-4 pt-2">
            <div className="flex items-center w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-2 rounded-lg">
              <FaSearch className="text-gray-500 dark:text-gray-400" />

              <input
                type="text"
                placeholder="Search destinations..."
                className="ml-3 flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* Mobile Navigation */}
          <ul className="flex flex-col gap-1 pt-3">
            <li>
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={mobileNavLinkStyle}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/package"
                onClick={() => setMenuOpen(false)}
                className={mobileNavLinkStyle}
              >
                Packages
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/services"
                onClick={() => setMenuOpen(false)}
                className={mobileNavLinkStyle}
              >
                Services
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/destination"
                onClick={() => setMenuOpen(false)}
                className={mobileNavLinkStyle}
              >
                Destinations
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={mobileNavLinkStyle}
              >
                About us
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

          {/* ================= MOBILE LOGIN / LOGOUT ================= */}
          {!token && !user ? (
            <div className="flex flex-col gap-2 px-4 pt-4">
              <Link
                to="/login"
                onClick={() => setMenuOpen(false)}
                className="text-center px-4 py-2 border border-blue-500 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMenuOpen(false)}
                className="text-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
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
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
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
