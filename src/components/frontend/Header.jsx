import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useTheme from "../Hook/ThemeContext";
import { HiOutlineBars3, HiOutlineXMark } from "react-icons/hi2";
import { FaSearch, FaPlane } from "react-icons/fa";
import api from "../../api/axios";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { themeMode, lightMode, darkMode } = useTheme();

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  const toggleTheme = () => {
    themeMode === "light" ? darkMode() : lightMode();
  };
  const navLinkStyle = ({ isActive }) =>
    `px-4 py-2 transition-colors duration-300 ${
      isActive
        ? "text-black dark:text-white font-medium"
        : "text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white"
    }`;

  //logout function
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

  return (
    <header className="sticky top-0 z-50 bg-gray-90 dark:bg-gray-900 backdrop-blur-md shadow-lg transition-colors duration-300">
      <div className="max-w-screen-2xl mx-auto px-6">
        {/* Navbar */}
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap transition-colors"
          >
            <FaPlane className="inline-block text-3xl sm:text-4xl text-blue-600 mr-2" />
            Travel <span className="text-blue-600"> Mate</span>
          </Link>
          {/* Desktop Navigation */}
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
          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* search icon */}
            <div className="hidden lg:flex items-center w-64 px-4 py-2 rounded-full border border-gray-300 bg-white shadow-sm transition-colors duration-300 dark:bg-gray-800 dark:border-gray-700">
              <FaSearch className="text-gray-500 dark:text-gray-400" />

              <input
                type="text"
                placeholder="Search destinations..."
                className="ml-3 flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                themeMode === "light" ? "bg-gray-300" : "bg-blue-600"
              }`}
            >
              <span
                className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white dark:bg-gray-200 flex items-center justify-center transition-transform duration-300 ${
                  themeMode === "light" ? "translate-x-0" : "translate-x-7"
                }`}
              >
                {themeMode === "light" ? "☀️" : "🌙"}
              </span>
            </button>

            {/* Desktop Buttons */}

            {!token && !user ? (
              <div className="hidden lg:flex items-center gap-3">
                <Link to="/signup" className=" text-black dark:text-white ">
                  Register
                </Link>
                <Link
                  to="/login"
                  className="px-5 py-1 border border-blue-500 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-500 hover:text-white transition"
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-4">
                {/* <span className="  bg-slate-50 px-4 py-2 text-sm font-medium text-slate-700 transition-colors duration-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200">
                 {user.name}
                </span> */}

                <button
                  onClick={handleLogout}
                  className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white cursor-pointer shadow-sm transition hover:bg-blue-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
                >
                  Logout
                </button>
              </div>
            )}

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden text-gray-800 dark:text-white"
            >
              {menuOpen ? <HiOutlineXMark /> : <HiOutlineBars3 />}
            </button>
          </div>
        </div>
        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden bg-white dark:bg-gray-900 transition-all duration-300 ${
            menuOpen ? "max-h-175 py-4" : "max-h-0"
          }`}
        >
          {/* search icon */}
          <div className="px-4 pt-4">
            <div className="flex items-center w-full border border-gray-300 dark:border-gray-700 bg-gray-100 dark:bg-gray-800 px-4 py-2">
              <FaSearch className="text-gray-500 dark:text-gray-400" />

              <input
                type="text"
                placeholder="Search destinations..."
                className="ml-3 flex-1 bg-transparent outline-none text-sm text-gray-800 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
              />
            </div>
          </div>

          <ul className="flex flex-col gap-2 pt-2">
            <li>
              <NavLink
                to="/"
                onClick={() => setMenuOpen(false)}
                className={navLinkStyle}
              >
                Home
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/package"
                onClick={() => setMenuOpen(false)}
                className={navLinkStyle}
              >
                Packages
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/services"
                onClick={() => setMenuOpen(false)}
                className={navLinkStyle}
              >
                Services
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/destination"
                onClick={() => setMenuOpen(false)}
                className={navLinkStyle}
              >
                Destinations
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                onClick={() => setMenuOpen(false)}
                className={navLinkStyle}
              >
                About us
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/my-bookings"
                onClick={() => setMenuOpen(false)}
                className={navLinkStyle}
              >
                Bookings
              </NavLink>
            </li>
          </ul>

          {/* Mobile Buttons */}
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
            <div className="flex flex-col gap-3 px-4 pt-4 lg:hidden">
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                className="w-full rounded-2xl bg-blue-600 px-4 cursor-pointer py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
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

export default Header;
