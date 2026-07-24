import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));

      if (response.data.user.usertype === "admin") {
        navigate("/admin/");
      } else {
        navigate("/");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900 flex items-center justify-center px-4 py-10 transition-colors duration-300">
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-2xl p-8">
        {/* Logo */}
        <div className="flex justify-center mb-5">
          <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
            T
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-blue-600">
          Welcome Back
        </h1>

        <p className="text-center text-gray-500 dark:text-gray-300 mt-2 mb-8">
          Sign in to continue your journey with TravelMate
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          {/* Email */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Email Address
            </label>

            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              Password
            </label>

            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              className="w-full p-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-blue-600 hover:text-blue-700 transition"
            >
              Forgot Password?
            </button>
          </div>
          {error && <div className="text-red-500 text-sm mb-3">{error}</div>}

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-xl shadow-md"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* Divider */}
          <div className="flex items-center">
            <div className="flex-1 border-t border-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-300"></div>
          </div>

          {/* Register */}
          <p className="text-center text-gray-600 dark:text-gray-300">
            Don't have an account?
            <Link
              to="/signup"
              className="ml-1 text-blue-600 hover:text-blue-700 font-semibold"
            >
              Create Account
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
