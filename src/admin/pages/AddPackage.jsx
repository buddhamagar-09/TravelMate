import React from "react";
import { useNavigate } from "react-router-dom";
export default function AddPackage() {
  const currentStep = 1;

  const steps = ["Package", "Itinerary", "Gallery", "Includes", "Exclude"];
  const navigate = useNavigate();

  //const $id = 1; // Replace with the actual package ID after saving the package
  
  const handleNext = () => {
    // Navigate to the next step (Itenaries page)
    navigate(`/admin/itinerary`);
  };

  return (
    <div className="p-4 md:p-6 bg-slate-950 min-h-screen">
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Add Package</h1>
        <p className="text-slate-400 text-sm">Create a new travel package</p>
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
                className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">Slug</label>
              <input
                type="text"
                placeholder="everest-base-camp-trek"
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
              className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-2">
              Difficulty
            </label>
            <select className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500">
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
              className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Best Season */}
            <div>
              <label className="block text-sm text-slate-300 mb-2">
                Best Season
              </label>
              <select className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500">
                <option>Select season</option>
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
              className="w-full px-3 py-2 rounded-md bg-slate-800 border border-slate-700 text-white focus:outline-none focus:border-blue-500 resize-none"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm text-slate-300 mb-2">
              Featured Image
            </label>
            <input
              type="file"
              className="w-full text-slate-300 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 pt-4 border-t border-slate-800">
          <button
            type="button"
            className="px-5 py-2 rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
          >
            Save Package
          </button>

          <div className="flex gap-3">
            <button
              onClick={handleNext}
              type="button"
              className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Next
            </button>
            <button
              type="button"
              className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Save & Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
