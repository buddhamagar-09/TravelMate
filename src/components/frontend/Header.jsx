import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useTheme from "../Hook/ThemeContext";

import { FaPlane, FaSearch, FaTimes, FaSun, FaMoon } from "react-icons/fa";
import { HiOutlineXMark, HiOutlineBars3 } from "react-icons/hi2";
import { toast } from "react-hot-toast";
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

  //suggestion
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
        ? `fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
            scrolled
              ? "bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800"
              : "bg-transparent border-b border-transparent"
          }`
        : "sticky top-0 w-full z-50 bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800"
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
              : "text-slate-900 dark:text-white"
          }`}
        >
          <FaPlane
            className={`text-2xl sm:text-3xl transition-colors duration-300 ${
              isHomePage && !scrolled ? "text-sky-400" : "text-sky-500"
            }`}
          />
          <span>
            Travel <span className="text-sky-500">Mate</span>
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

            <li>
              <NavLink to="/package" className={navLinkStyle}>
                Packages
              </NavLink>
            </li>

            <li>
              <NavLink to="/plan" className={navLinkStyle}>
                Plan
              </NavLink>
            </li>

            <li>
              <NavLink to="/destination" className={navLinkStyle}>
                Destinations
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
          </ul>
        </nav>

        {/* ================= RIGHT SIDE ================= */}
        <div className="flex items-center gap-3">
          {/* Desktop Search */}
          <div
            className={`hidden lg:flex relative items-center w-64 px-4 py-2 border transition-colors duration-300 ${
              isHomePage && !scrolled
                ? "border-white/30 bg-white/10"
                : "border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900"
            }`}
          >
            <FaSearch
              className={`text-sm ${
                isHomePage && !scrolled
                  ? "text-white/80"
                  : "text-slate-500 dark:text-slate-400"
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
                    : "text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
                }`}
              />

              {searchTerm && (
                <button
                  type="button"
                  onClick={clearSearch}
                  className={`ml-2 ${
                    isHomePage && !scrolled
                      ? "text-white/80 hover:text-white"
                      : "text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
                  }`}
                >
                  <FaTimes size={14} />
                </button>
              )}
            </form>

            {/* Suggestions dropdown */}
            {searchTerm && suggestions.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden z-50">
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
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-900 border-b border-slate-100 dark:border-slate-800 last:border-b-0 transition-colors"
                  >
                    <div className="font-medium text-sm text-slate-900 dark:text-white">
                      {packageItem.title}
                    </div>

                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {packageItem.location}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Theme Toggle — simplified */}
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`grid place-items-center w-9 h-9 border transition-colors duration-300 ${
              isHomePage && !scrolled
                ? "border-white/30 text-white hover:bg-white/10"
                : "border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900"
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
                    ? "text-white hover:text-sky-300"
                    : "text-slate-700 dark:text-slate-200 hover:text-sky-500"
                }`}
              >
                Register
              </Link>

              <Link
                to="/login"
                className="bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
              >
                Login
              </Link>
            </div>
          ) : (
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={handleLogout}
                className="bg-sky-500 px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
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
                : "text-slate-800 dark:text-white"
            }`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
          </button>
        </div>
      </div>

      {/* ================= MOBILE MENU ================= */}
      <div
        className={`lg:hidden overflow-hidden bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 transition-[max-height] duration-300 ${
          menuOpen ? "max-h-150 py-4" : "max-h-0"
        }`}
      >
        {/* Mobile Search */}
        <div className="px-4 pt-2">
          <form
            onSubmit={handleSearch}
            className="flex items-center w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2"
          >
            <FaSearch className="text-sm text-slate-500 dark:text-slate-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search destinations..."
              className="ml-3 flex-1 bg-transparent outline-none text-sm text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400"
            />

            {searchTerm && (
              <button
                type="button"
                onClick={clearSearch}
                className="ml-2 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white"
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
              to="/plan"
              onClick={() => setMenuOpen(false)}
              className={mobileNavLinkStyle}
            >
              Plan
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
              className="text-center px-4 py-2 border border-sky-500 text-sky-500 hover:bg-sky-500 hover:text-white transition-colors"
            >
              Login
            </Link>

            <Link
              to="/signup"
              onClick={() => setMenuOpen(false)}
              className="text-center px-4 py-2 bg-sky-500 text-white hover:bg-sky-600 transition-colors"
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
              className="w-full bg-sky-500 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
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
