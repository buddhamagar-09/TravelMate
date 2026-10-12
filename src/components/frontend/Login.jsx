import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../api/axios";
import { FiArrowRight, FiCheckCircle, FiLock, FiMail } from "react-icons/fi";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched" });

  const handleLogin = async (data) => {
    setFormError("");
    setLoading(true);

    try {
      const response = await api.post("/login", data);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      localStorage.setItem("user_id", response.data.user.id);

      if (response.data.user.usertype === "admin") {
        navigate("/admin/");
      } else {
        navigate(location.state?.redirectTo || "/");
      }
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#EEF4EF] dark:bg-[#FFFFFF] text-slate-900 dark:text-slate-900 transition-colors">
      <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-5xl">
          {/* Main Login Container */}
          <div className="grid overflow-hidden border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#FFFFFF] dark:bg-[#FFFFFF] lg:grid-cols-2">
            {/* LEFT SIDE */}
            <div className="relative hidden bg-[#EEF4EF] dark:bg-[#EEF4EF] p-10 lg:flex lg:flex-col lg:justify-between">
              <div>
                {/* Logo */}
                <Link to="/" className="inline-flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center bg-[#064E3B] text-lg font-bold text-white">
                    T
                  </span>

                  <span className="text-xl font-bold tracking-tight text-slate-900">
                    TravelMate
                  </span>
                </Link>

                {/* Welcome Text */}
                <div className="mt-24 max-w-md">
                  <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#064E3B]">
                    Welcome back
                  </p>

                  <h1 className="text-4xl font-bold leading-tight text-slate-900">
                    Your trips.
                    <br />
                    Your bookings.
                    <br />
                    <span className="text-[#064E3B]">Your journey.</span>
                  </h1>

                  <p className="mt-6 text-base leading-7 text-slate-600">
                    Sign in to manage your bookings, explore travel packages,
                    and keep all your travel plans organized in one place.
                  </p>
                </div>
              </div>

              {/* Security Information */}
              <div className="border-t border-[#DDE7DF] pt-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center border border-[#064E3B]/30 text-[#064E3B]">
                      <FiCheckCircle className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-900">
                        Easy travel management
                      </p>

                      <p className="text-xs text-slate-500">
                        Manage your trips and bookings easily.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center border border-[#064E3B]/30 text-[#064E3B]">
                      <FiLock className="h-4 w-4" />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-slate-900">
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
            <div className="flex items-center bg-[#FFFFFF] dark:bg-[#FFFFFF] p-6 sm:p-10 lg:p-12">
              <div className="mx-auto w-full max-w-md">
                {/* Mobile Logo */}
                <div className="mb-10 lg:hidden">
                  <Link to="/" className="inline-flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center bg-[#064E3B] text-lg font-bold text-white">
                      T
                    </span>

                    <span className="text-xl font-bold text-slate-900 dark:text-slate-900">
                      TravelMate
                    </span>
                  </Link>
                </div>

                {/* Header */}
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#064E3B]">
                    Account
                  </p>

                  <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-900">
                    Sign in
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-600">
                    Enter your credentials to continue to TravelMate.
                  </p>
                </div>

                {/* LOGIN FORM */}
                <form
                  className="mt-8 space-y-5"
                  onSubmit={handleSubmit(handleLogin)}
                  noValidate
                >
                  {/* FORM ERROR (API) */}
                  {formError && (
                    <div className="border border-red-500 bg-red-50 dark:bg-red-50 p-3 text-center text-sm text-red-600 dark:text-red-700">
                      {formError}
                    </div>
                  )}

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-slate-700 dark:text-slate-700"
                    >
                      Email address
                    </label>

                    <div className="relative mt-2">
                      <FiMail className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-4 h-4 w-4 text-slate-400" />

                      <input
                        id="email"
                        type="email"
                        autoComplete="username"
                        placeholder="you@example.com"
                        className="block w-full border border-[#CDD9CF] dark:border-[#CDD9CF] bg-[#FFFFFF] dark:bg-[#FFFFFF] py-3 pl-11 pr-4 text-sm text-slate-900 dark:text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#064E3B]"
                        {...register("email", {
                          required: "Email is required",
                          pattern: {
                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                            message: "Invalid email format",
                          },
                        })}
                      />
                    </div>

                    <p className="mt-1 min-h-5 text-sm text-red-500">
                      {errors.email?.message}
                    </p>
                  </div>

                  {/* PASSWORD */}
                  <div>
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-slate-700 dark:text-slate-700"
                      >
                        Password
                      </label>

                      <button
                        type="button"
                        className="text-sm font-medium text-[#064E3B] transition-colors hover:text-[#064E3B] hover:underline"
                      >
                        Forgot password?
                      </button>
                    </div>

                    <div className="relative mt-2">
                      <FiLock className="pointer-events-none absolute inset-y-0 left-0 my-auto ml-4 h-4 w-4 text-slate-400" />

                      <input
                        id="password"
                        type="password"
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        className="block w-full border border-[#CDD9CF] dark:border-[#CDD9CF] bg-[#FFFFFF] dark:bg-[#FFFFFF] py-3 pl-11 pr-4 text-sm text-slate-900 dark:text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#064E3B]"
                        {...register("password", {
                          required: "Password is required",
                        })}
                      />
                    </div>

                    <p className="mt-1 min-h-5 text-sm text-red-500">
                      {errors.password?.message}
                    </p>
                  </div>

                  {/* REMEMBER ME */}
                  <div className="flex items-center">
                    <label className="inline-flex cursor-pointer items-center">
                      <input
                        type="checkbox"
                        className="h-4 w-4 border-[#CDD9CF] text-[#064E3B] focus:ring-[#064E3B]"
                      />

                      <span className="ml-2 text-sm text-slate-600 dark:text-slate-700">
                        Remember me
                      </span>
                    </label>
                  </div>

                  {/* LOGIN BUTTON */}
                  <div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="flex w-full items-center justify-center gap-2 bg-[#064E3B] px-5 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-[#04382A] disabled:cursor-not-allowed disabled:opacity-70"
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
                <div className="mt-8 border-t border-[#DDE7DF] dark:border-[#DDE7DF] pt-6 text-center">
                  <p className="text-sm text-slate-500 dark:text-slate-600">
                    Don't have an account?{" "}
                    <Link
                      to="/signup"
                      className="font-semibold text-[#064E3B] transition-colors hover:text-[#064E3B] hover:underline"
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
