import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useMatch } from "react-router-dom";
import api from "../../api/axios";

export default function AddPackage() {
  const { id } = useParams();
  const currentStep = 1;

  const steps = ["Package", "Itinerary", "Gallery", "Includes", "Exclude"];
  const navigate = useNavigate();

  const [packageId, setPackageId] = useState(null); // State to store the package ID after saving
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [location, setLocation] = useState("");
  const [bestSeason, setBestSeason] = useState("");
  const [maxAltitude, setMaxAltitude] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [shortOverview, setShortOverview] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [featuredImage, setFeaturedImage] = useState(null);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const isEditing = useMatch("/admin/edit-package/:id"); // Check if we are in edit mode based on the URL pattern

  // Fetch existing package data if editing
  useEffect(() => {
    if (!isEditing) return;

    const fetchPackage = async () => {
      try {
        const response = await api.get(`/packages/${id}`);

        const pkg = response.data;

        setName(pkg.title);
        setSlug(pkg.slug);
        setLocation(pkg.location);
        setDuration(pkg.duration);
        setPrice(pkg.price);
        setGroupSize(pkg.group_size);
        setMaxAltitude(pkg.max_altitude);
        setDifficulty(pkg.difficulty);
        setBestSeason(pkg.best_season);
        setShortOverview(pkg.short_description);
        setFullDescription(pkg.long_description);
      } catch (error) {
        console.log(error);
        setError("Failed to load package.");
      }
    };
    fetchPackage();
  }, [isEditing, id]);

  // Function to handle form submission
  const handleSubmit = async () => {
    setSaving(true);
    setError("");

    try {
      const formdata = new FormData();
      formdata.append("title", name);
      formdata.append("slug", slug);
      formdata.append("price", price);
      formdata.append("duration", duration);
      formdata.append("difficulty", difficulty);
      formdata.append("location", location);
      formdata.append("best_season", bestSeason);
      formdata.append("max_altitude", maxAltitude);
      formdata.append("group_size", groupSize);
      formdata.append("short_description", shortOverview);
      formdata.append("long_description", fullDescription);
      if (featuredImage) {
        formdata.append("featured_image", featuredImage);
      }

      let response;
      if (isEditing) {
        formdata.append("_method", "PUT");

        response = await api.post(`/packages/${id}`, formdata);
      } else {
        response = await api.post("/packages", formdata);
      }

      console.log(
        isEditing
          ? "Package updated successfully"
          : "Package created successfully",
      );
      console.log(response.data);

      if (!isEditing) {
        const newPackageId = response.data.package.id; // Assuming the API returns the new package ID
        setPackageId(newPackageId); // Store the package ID in state
        navigate(`/admin/itinerary/${newPackageId}`); // Store the package ID after saving
      } else {
        navigate(`/admin/edit-itinerary/${id}`);
      }
    } catch (err) {
      console.log(err.response.data.errors);
      setError("Failed to save package. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  // Function to handle "Next" button click
  const handleNext = () => {
    if (isEditing) {
      navigate(`/admin/edit-itinerary/${id}`);
    } else {
      navigate(`/admin/itinerary/${packageId}`);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-slate-950 min-h-screen">
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">
          {isEditing ? "Edit Package" : "Create a new travel package"}
        </h1>
        <p className="text-slate-400 text-sm">
          {isEditing
            ? "Edit the details of your travel package"
            : "Fill in the details for your new travel package"}
        </p>
      </div>

      {/* Progress */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between text-sm mb-3">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  index + 1 <= currentStep
                    ? "bg-blue-600 text-white"
                    : "bg-slate-700 text-slate-300"
                }`}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-xs text-slate-300">{step}</span>
            </div>
          ))}
        </div>

        {/* Progress bar */}
        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
        <h2 className="text-lg font-semibold text-white mb-4">
          Basic Package Information
        </h2>
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Package Title */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Package Title
              </label>
              <input
                type="text"
                placeholder="Everest Base Camp Trek"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">Slug</label>
              <input
                type="text"
                placeholder="everest-base-camp-trek"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Price (USD)
            </label>
            <input
              type="number"
              placeholder="1299"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Duration (Days)
            </label>
            <input
              type="number"
              placeholder="14"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Difficulty
            </label>
            <select
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            >
              <option>Select difficulty</option>
              <option>Easy</option>
              <option>Moderate</option>
              <option>Hard</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-300 mb-2">
              Location
            </label>
            <input
              type="text"
              placeholder="Khumbu, Nepal"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Best Season */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Best Season
              </label>
              <select
                value={bestSeason}
                onChange={(e) => setBestSeason(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
              >
                <option> season</option>
                <option>Spring (Mar-May)</option>
                <option>Summer (Jun-Aug)</option>
                <option>Autumn (Sep-Nov)</option>
                <option>Winter (Dec-Feb)</option>
                <option>Year Round</option>
              </select>
            </div>

            {/* Max Altitude */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Max Altitude
              </label>
              <input
                type="text"
                placeholder="5,364 m"
                value={maxAltitude}
                onChange={(e) => setMaxAltitude(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Group Size */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Group Size
              </label>
              <input
                type="number"
                placeholder="10"
                value={groupSize}
                onChange={(e) => setGroupSize(e.target.value)}
                className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-300 mb-2">
              Short Overview
            </label>
            <textarea
              rows="3"
              placeholder="Short package summary"
              value={shortOverview}
              onChange={(e) => setShortOverview(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-300 mb-2">
              Full Description
            </label>
            <textarea
              rows="6"
              placeholder="Detailed package description"
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-300 mb-2">
              Featured Image
            </label>
            <input
              type="file"
              onChange={(e) => setFeaturedImage(e.target.files[0])}
              className="w-full text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
        </div>

        {/* Buttons */}

        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 pt-4 border-t border-slate-800">
          <button
            onClick={handleNext}
            type="button"
            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            Next
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={saving}
            className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
          >
            {saving ? "Saving..." : "Save & Continue"}
          </button>
        </div>
      </div>
    </div>
  );
}
