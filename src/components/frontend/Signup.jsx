import React, { useState } from "react";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const [success, setSuccess] = useState(false);

  async function handleForm(e) {
    e.preventDefault();
    const newErrors = {};
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    //name validation
    if (name.trim() === "") {
      newErrors.name = "Name is required";
    }
    else if (name.trim().length < 3) {
      newErrors.name = "Name must be at least 3 characters long";
    }

    //email validation
    if (email.trim() == "") {
      newErrors.email = "Email is required";
    } else if (!emailPattern.test(email)) {
      newErrors.email = "Invalid email format";
    }

    //password validation
    if (password.trim() === "") {
      newErrors.password = "Password is required";
    }
    //confirm password validation
    if (confirmPassword.trim() === "") {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setSuccess(true);
      console.log("Form submitted successfully");
      console.log({ name, email, password });
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    } else {
      setSuccess(false);
    }
  }
  return (
  <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4 py-10">
    <div className="w-full max-w-md bg-gray-800 rounded-2xl shadow-2xl p-8">
      
      <h1 className="text-3xl font-bold text-center text-green-500 mb-2">
        Create Account
      </h1>

      <p className="text-center text-gray-400 mb-8">
        Join MotoMods Nepal today
      </p>

      <form onSubmit={handleForm} className="space-y-4">
        
        {/* Name */}
        <div>
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError((prev) => ({ ...prev, name: "" }));
            }}
            type="text"
            placeholder="Full Name"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-green-500"
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
            placeholder="Email Address"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-green-500"
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
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-green-500"
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
            placeholder="Confirm Password"
            className="w-full p-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-green-500"
          />
          <p className="text-red-500 text-sm mt-1 min-h-5">
            {error.confirmPassword}
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-500/20 border border-green-500 text-green-400 p-3 rounded-lg text-center">
            Account created successfully!
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={success}
          className="w-full bg-green-600 hover:bg-green-700 transition duration-300 text-white font-semibold py-3 rounded-lg"
        >
          Sign Up
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-400 text-sm mt-4">
          Already have an account?
          <span className="text-blue-400 hover:text-blue-300 cursor-pointer ml-1">
            Login
          </span>
        </p>
      </form>
    </div>
  </div>
);
}

export default Signup;
