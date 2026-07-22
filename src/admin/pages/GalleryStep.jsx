import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function GalleryStep() {
  const navigate = useNavigate();
  const { id } = useParams();

  const currentStep = 3;
  const steps = ["Package", "Itinerary", "Gallery", "Includes", "Exclude"];

  // Static preview data for UI
  const [images] = useState([
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800",
      featured: true,
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800",
      featured: false,
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800",
      featured: false,
    },
  ]);

  const handlePrevious = () => {
    navigate(`/admin/itinerary`);
  };

  const handleNext = () => {
    navigate(`/admin/includes`);
  };

  return (
    <div className="p-4 md:p-6 bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Package Gallery</h1>
        <p className="text-slate-400 text-sm">
          Upload package images and choose a featured cover image
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

        <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-blue-600"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Upload Section */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
        <h2 className="text-lg font-semibold text-white mb-4">Upload Images</h2>

        <label className="block w-full border-2 border-dashed border-slate-700 rounded-lg p-10 text-center cursor-pointer hover:border-blue-500 transition">
          <div className="flex flex-col items-center gap-3">
            <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center">
              <svg
                className="w-7 h-7 text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>

            <div>
              <p className="text-white font-medium">Click to upload images</p>
              <p className="text-sm text-slate-400 mt-1">
                JPG, PNG, WEBP up to 5MB each
              </p>
            </div>
          </div>

          <input type="file" multiple accept="image/*" className="hidden" />
        </label>
      </div>

      {/* Preview Grid */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-white">Image Preview</h2>
          <span className="text-sm text-slate-400">{images.length} images</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {images.map((image) => (
            <div
              key={image.id}
              className="rounded-lg overflow-hidden border border-slate-800 bg-slate-950"
            >
              <div className="relative">
                <img
                  src={image.url}
                  alt="Package preview"
                  className="w-full h-48 object-cover"
                />

                {image.featured && (
                  <span className="absolute top-3 left-3 bg-blue-600 text-white text-xs px-2 py-1 rounded-md font-medium">
                    Featured
                  </span>
                )}
              </div>

              <div className="p-4 flex items-center justify-between">
                <button
                  type="button"
                  className={`text-sm font-medium ${
                    image.featured
                      ? "text-blue-400"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {image.featured ? "Cover Image" : "Set as Cover"}
                </button>

                <button
                  type="button"
                  className="text-red-400 hover:text-red-300 text-sm font-medium"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 pt-4 border-t border-slate-800">
          <button
            type="button"
            onClick={handlePrevious}
            className="px-5 py-2 rounded-md bg-slate-800 text-white hover:bg-slate-700 transition"
          >
            ← Previous
          </button>

          <div className="flex gap-3">
             <button
            type="button"
            onClick={handleNext}
            className="px-5 py-2 rounded-md bg-slate-800 text-white hover:bg-slate-700 transition"
          >
            Next →
          </button>
            <button
              type="button"
              onClick={handleNext}
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
