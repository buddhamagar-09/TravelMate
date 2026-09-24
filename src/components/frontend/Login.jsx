
import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../../api/axios";
import { FiArrowRight, FiCheckCircle, FiLock, FiMail } from "react-icons/fi";
import { toast } from "react-hot-toast";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await api.post("/login", {
        email,
        password,
      });

      console.log(response.data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("user_id", response.data.user.id);

      toast.success("Login successful!");

      if (response.data.user.usertype === "admin") {
        navigate("/admin/");
      } else {
        const redirect = location.state?.redirectTo || "/";
        navigate(redirect);
      }
    } catch (err) {
      console.log(err.response?.data);

      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900">
      <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-5xl">

          {/* Main Login Container */}
          <div className="grid overflow-hidden border border-slate-200 bg-white shadow-xl lg:grid-cols-2">

          
            {/* LEFT SIDE */}
         

            <div className="relative hidden overflow-hidden bg-slate-900 p-10 lg:flex lg:flex-col lg:justify-between">

              {/* Decorative Background */}
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

              <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />

              <div className="relative z-10">

                {/* Logo */}
                <Link
                  to="/"
                  className="inline-flex items-center gap-3"
                >
                  <span className="flex h-11 w-11 items-center justify-center bg-blue-600 text-lg font-bold text-white">
                    T
                  </span>

                  <span className="text-xl font-bold tracking-tight text-white">
                    TravelMate
                  </span>
                </Link>

                {/* Welcome Text */}
                <div className="mt-24 max-w-md">

                  <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-blue-400">
                    Welcome back
                  </p>

                  <h1 className="text-4xl font-bold leading-tight text-white">
                    Your trips.
                    <br />
                    Your bookings.
                    <br />
                    <span className="text-blue-400">
                      Your journey.
                    </span>
                  </h1>

                  <p className="mt-6 text-base leading-7 text-slate-400">
                    Sign in to manage your bookings, explore travel packages,
                    and keep all your travel plans organized in one place.
                  </p>

                </div>
              </div>

              {/* Security Information */}
              <div className="relative z-10 border-t border-white/10 pt-6">

                <div className="space-y-4">

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center bg-blue-600/20 text-blue-400">
                      <FiCheckCircle className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        Easy travel management
                      </p>

                      <p className="text-xs text-slate-500">
                        Manage your trips and bookings easily.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center bg-blue-600/20 text-blue-400">
                      <FiLock className="h-5 w-5" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        Secure account access
                      </p>

                      <p className="text-xs text-slate-500">
                        Your account information is protected.
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            </div>

            
            {/* RIGHT SIDE */}
        

            <div className="flex items-center bg-white p-6 sm:p-10 lg:p-12">

              <div className="mx-auto w-full max-w-md">

                {/* Mobile Logo */}
                <div className="mb-10 lg:hidden">

                  <Link
                    to="/"
                    className="inline-flex items-center gap-3"
                  >
                    <span className="flex h-11 w-11 items-center justify-center bg-blue-600 text-lg font-bold text-white">
                      T
                    </span>

                    <span className="text-xl font-bold text-slate-900">
                      TravelMate
                    </span>
                  </Link>

                </div>

                {/* Header */}
                <div>

                  <p className="text-sm font-semibold uppercase tracking-wider text-blue-600">
                    Account
                  </p>

                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
                    Sign in
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    Enter your credentials to continue to TravelMate.
                  </p>

                </div>

             
                {/* LOGIN FORM */}
               

                <form
                  className="mt-8 space-y-5"
                  onSubmit={handleLogin}
                >

                  {/* EMAIL */}
                  <div>

                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700"
                    >
                      Email address
                    </label>

                    <div className="relative mt-2">

                      <FiMail
                        className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-4 h-4 w-4 text-slate-400"
                      />

                      <input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="username"
                        placeholder="you@example.com"
                        className="block w-full border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                      />

                    </div>

                  </div>

                  {/* PASSWORD */}
                  <div>

                    <div className="flex items-center justify-between">

                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-slate-700"
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        className="text-sm font-medium text-blue-600 transition hover:text-blue-700 hover:underline"
                      >
                        Forgot password?
                      </button>

                    </div>

                    <div className="relative mt-2">

                      <FiLock
                        className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-4 h-4 w-4 text-slate-400"
                      />

                      <input
                        id="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className="block w-full border border-slate-300 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-blue-600 focus:ring-2 focus:ring-blue-600/15"
                      />

                    </div>

                  </div>

                  {/* REMEMBER ME */}
                  <div className="flex items-center">

                    <label className="inline-flex cursor-pointer items-center">

                      <input
                        type="checkbox"
                        className="h-4 w-4 border-slate-300 text-blue-600 shadow-sm focus:ring-blue-500"
                      />

                      <span className="ml-2 text-sm text-slate-600">
                        Remember me
                      </span>

                    </label>

                  </div>

                  {/* LOGIN BUTTON */}
                  <div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-70"
                    >

                      {loading ? (
                        "Signing in..."
                      ) : (
                        <>
                          <FiArrowRight className="h-4 w-4" />
                          Sign in
                        </>
                      )}

                    </button>

                  </div>

                </form>

                {/* REGISTER */}
                <div className="mt-8 border-t border-slate-200 pt-6 text-center">

                  <p className="text-sm text-slate-500">

                    Don't have an account?{" "}

                    <Link
                      to="/signup"
                      className="font-semibold text-blue-600 transition hover:text-blue-700 hover:underline"
                    >
                      Create an account
                    </Link>

                  </p>

                </div>

                {/* FOOTER */}
                <p className="mt-8 text-center text-xs text-slate-400">
                  © {new Date().getFullYear()} TravelMate. All rights reserved.
                </p>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Login;


