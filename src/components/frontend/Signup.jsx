import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../api/axios";

function Signup() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onTouched", reValidateMode: "onChange" });

  async function onSubmit(data) {
    setFormError("");
    setLoading(true);
    try {
      await api.post("/register", data);
      navigate("/login");
    } catch (err) {
      setFormError(
        err.response?.data?.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  const getInputClass = (hasError) =>
    `w-full border bg-[#FFFFFF] dark:bg-[#FFFFFF] px-4 py-3 text-sm text-slate-900 dark:text-slate-900 placeholder:text-slate-400 outline-none transition-colors ${
      hasError
        ? "border-red-500 focus:border-red-500"
        : "border-[#CDD9CF] dark:border-[#CDD9CF] focus:border-[#047857]"
    }`;

  const errorClass = "text-red-500 text-sm mt-1 min-h-5";

  return (
    <div className="min-h-screen bg-[#EEF4EF] dark:bg-[#FFFFFF] transition-colors duration-300">
      <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#FFFFFF] dark:bg-[#FFFFFF]">
            {/* ============ LEFT SIDE (image) ============ */}
            <div
              className="relative hidden md:flex items-center justify-center p-10"
              style={{
                backgroundImage: "url('/images/banners/nature1.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="absolute inset-0 bg-slate-950/55" />

              <div className="relative max-w-sm text-center">
                <p className="text-sm font-semibold uppercase tracking-widest text-emerald-400 mb-4">
                  Join TravelMate
                </p>

                <h1 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
                  Welcome to TravelMate
                </h1>

                <p className="text-slate-200 leading-relaxed">
                  Discover destinations, plan your trips, and create
                  unforgettable memories. Join our community of travelers and
                  start your adventure today.
                </p>
              </div>
            </div>

            {/* ============ RIGHT SIDE (form) ============ */}
            <div className="p-8 sm:p-10 lg:p-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-[#047857] mb-3">
                Account
              </p>

              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-900">
                Create account
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-600">
                Join TravelMate today — it only takes a minute.
              </p>

              <form
                onSubmit={handleSubmit(onSubmit)}
                noValidate
                className="mt-8 space-y-4"
              >
                {/* Name */}
                <div>
                  <input
                    type="text"
                    placeholder="Full name"
                    className={getInputClass(!!errors.name)}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 3,
                        message: "Name must be at least 3 characters long",
                      },
                      pattern: {
                        value: /^[A-Za-z][A-Za-z\s'.]*$/,
                        message:
                          "Name can only contain letters, spaces, apostrophes and periods",
                      },
                    })}
                  />
                  <p className={errorClass}>{errors.name?.message}</p>
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    placeholder="Email address"
                    className={getInputClass(!!errors.email)}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Za-z][^\s@]*@[^\s@]+\.[^\s@]+$/,
                        message:
                          "Invalid email format",
                      },
                    })}
                  />
                  <p className={errorClass}>{errors.email?.message}</p>
                </div>

                {/* Password */}
                <div>
                  <input
                    type="password"
                    placeholder="Password"
                    className={getInputClass(!!errors.password)}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters long",
                      },
                    })}
                  />
                  <p className={errorClass}>{errors.password?.message}</p>
                </div>

                {/* Confirm Password */}
                <div>
                  <input
                    type="password"
                    placeholder="Confirm password"
                    className={getInputClass(!!errors.confirmPassword)}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value, allValues) =>
                        value === allValues.password ||
                        "Passwords do not match",
                    })}
                  />
                  <p className={errorClass}>
                    {errors.confirmPassword?.message}
                  </p>
                </div>

                {/* Form error (API) */}
                {formError && (
                  <div className="border border-red-500 bg-red-50 dark:bg-red-50 p-3 text-center text-sm text-red-600 dark:text-red-700">
                    {formError}
                  </div>
                )}

                {/* Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#047857] hover:bg-[#065F46] transition-colors text-white font-semibold py-3 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating account..." : "Sign up"}
                </button>

                <p className="text-center text-sm text-slate-500 dark:text-slate-600">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-[#047857] hover:text-[#047857] cursor-pointer font-semibold transition-colors"
                  >
                    Login
                  </span>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;
