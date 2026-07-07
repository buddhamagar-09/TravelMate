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
 <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
  <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">

    {/* LEFT SIDE */}
    <div
      className="hidden md:flex items-center justify-center bg-blue-600 p-10"
      style={{
        backgroundImage: "url('images/banners/nature1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-black/50 p-8 rounded-xl text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome to Travel Mate
        </h1>

        <p className="text-gray-200 leading-7">
         Discover destinations, plan your trips, and create unforgettable memories with Travel Mate. Join our community of travelers and start your adventure today!
        </p>
      </div>
    </div>

    {/* RIGHT SIDE */}
    <div className="p-10">

      <h1 className="text-3xl font-bold text-center text-blue-600 mb-2">
        Create Account
      </h1>

      <p className="text-center text-gray-500 mb-8">
        Join Travel Mate today
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
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
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
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
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
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
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
            className="w-full p-3 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
          />

          <p className="text-red-500 text-sm mt-1 min-h-5">
            {error.confirmPassword}
          </p>
        </div>

        {/* Success */}
        {success && (
          <div className="bg-blue-100 border border-blue-600 text-blue-700 p-3 rounded-lg text-center">
            Account created successfully!
          </div>
        )}

        {/* Button */}
        <button
          type="submit"
          disabled={success}
          className="w-full bg-blue-600 hover:bg-blue-700 transition duration-300 text-white font-semibold py-3 rounded-lg"
        >
          Sign Up
        </button>

        <p className="text-center text-gray-500 text-sm">
          Already have an account?
          <span className="text-blue-600 hover:text-blue-700 cursor-pointer ml-1 font-semibold">
            Login
          </span>
        </p>

      </form>
    </div>

  </div>
</div>
);
}

export default Signup;
