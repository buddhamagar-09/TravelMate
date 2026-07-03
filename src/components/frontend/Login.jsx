import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-white text-2xl font-bold">
            M
          </div>
        </div>
        <h1 className="text-3xl font-bold text-center text-green-500 mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-gray-400 mb-8">
          Login to your MotoMods Nepal account
        </p>

        <form className="space-y-4">
          <div>
            <input
              type="email"
              placeholder="Email Address"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>

          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-green-500"
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              className="text-sm text-blue-400 hover:text-blue-300"
            >
              Forgot Password?
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 transition duration-300 text-white font-semibold py-3 rounded-lg"
          >
            Login
          </button>

          <p className="text-center text-gray-400 text-sm mt-4">
            Don't have an account?
            <Link
              to="/signup"
              className="text-blue-400 hover:text-blue-300 ml-1"
            >
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
