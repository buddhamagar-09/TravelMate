import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleForm(e) {
    e.preventDefault();
    setLoading(true);
    const newErrors = {};
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name.trim() === "") {
      newErrors.name = "Name is required";
    } else if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    if (email.trim() == "") {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (password.trim() === "") {
      newErrors.password = "Password is required";
    }

    if (confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await api.post("/register", {
          name,
          email,
          password,
          confirmPassword,
        });
        console.log(response);
        toast.success("Account created successfully!");
        navigate("/login");
      } catch (error) {
        console.error("Error occurred while signing up:", error);
        toast.error("Error occurred while signing up. Please try again.");
      } finally {
        setLoading(false);
      }
      setSuccess(true);
      console.log("Form submitted successfully");
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setSuccess(false);
    }
  }

  const inputClass =
    "w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 px-4 py-3 text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:border-sky-500 outline-none transition-colors";

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="flex min-h-screen items-center justify-center px-4 py-10 sm:px-6">
        <div className="w-full max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
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
                <p className="text-sm font-semibold uppercase tracking-widest text-sky-400 mb-4">
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
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-500 mb-3">
                Account
              </p>

              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight text-slate-900 dark:text-white">
                Create account
              </h2>

              <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                Join TravelMate today — it only takes a minute.
              </p>

              <form onSubmit={handleForm} className="mt-8 space-y-4">
                {/* Name */}
                <div>
                  <input
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      setError((prev) => ({ ...prev, name: "" }));
                    }}
                    type="text"
                    placeholder="Full name"
                    className={inputClass}
                  />
                  <p className="text-red-500 text-sm mt-1 min-h-5">
                    {error.name}
                  </p>
                </div>

                {/* Email */}
                <div>
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError((prev) => ({ ...prev, email: "" }));
                    }}
                    type="email"
                    placeholder="Email address"
                    className={inputClass}
                  />
                  <p className="text-red-500 text-sm mt-1 min-h-5">
                    {error.email}
                  </p>
                </div>

                {/* Password */}
                <div>
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setError((prev) => ({ ...prev, password: "" }));
                    }}
                    type="password"
                    placeholder="Password"
                    className={inputClass}
                  />
                  <p className="text-red-500 text-sm mt-1 min-h-5">
                    {error.password}
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <input
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setError((prev) => ({
                        ...prev,
                        confirmPassword: "",
                      }));
                    }}
                    type="password"
                    placeholder="Confirm password"
                    className={inputClass}
                  />
                  <p className="text-red-500 text-sm mt-1 min-h-5">
                    {error.confirmPassword}
                  </p>
                </div>

                {/* Success */}
                {success && (
                  <div className="border border-sky-500 bg-sky-50 dark:bg-sky-500/10 text-sky-700 dark:text-sky-400 p-3 text-sm text-center">
                    Account created successfully!
                  </div>
                )}

                {/* Button */}
                <button
                  type="submit"
                  disabled={success || loading}
                  className="w-full bg-sky-500 hover:bg-sky-600 transition-colors text-white font-semibold py-3 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? "Creating account..." : "Sign up"}
                </button>

                <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                  Already have an account?{" "}
                  <span
                    onClick={() => navigate("/login")}
                    className="text-sky-500 hover:text-sky-600 cursor-pointer font-semibold transition-colors"
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