import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useMatch } from "react-router-dom";
import api from "../../api/axios";

export default function GalleryStep() {
  const navigate = useNavigate();
  const { id } = useParams();

  const currentStep = 3;
  const steps = ["Package", "Itinerary", "Gallery", "Includes", "Exclude"];

  const isEditing = useMatch("/admin/edit-gallery/:id"); // Check if we are in edit mode based on the URL pattern
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  // State to hold the selected images
  const [images, setImages] = useState([]);

  //fetch existing images if we are in edit mode
  useEffect(() => {
    if (!isEditing) return; // if we are not in edit mode then we don't need to fetch existing images

    const fetchImages = async () => {
      setSaving(true);
      try {
        const response = await api.get(`/gallery/${id}`);
        console.log(response.data);
        const galleryImages = response.data.gallery.map((image) => ({
          id: image.id,
          url: `http://127.0.0.1:8000/storage/${image.image_path}`,
          file: null, // No file object for existing images
        }));
        setImages(galleryImages);
      } catch (error) {
        console.log(error.response?.data);
        setError("Failed to fetch existing images");
      } finally {
        setSaving(false);
      }
    };
    fetchImages();
  }, [id, isEditing]);

  // Function to handle file input change
  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const newImages = files.map((file, index) => ({
      id: Date.now() + index,
      file,
      url: URL.createObjectURL(file),
      featured: false,
    }));
    setImages((prevImages) => [...prevImages, ...newImages]);
    event.target.value = "";
  };

  //handle submit
  const handleSubmit = async () => {
    setSaving(true);
    const formData = new FormData();

    images.forEach((image) => {
      if (image.file) {
        formData.append("images[]", image.file);
      }
    });

    try {
      const response = isEditing
        ? await api.post(`/gallery/${id}?_method=PUT`, formData)
        : await api.post(`/gallery/${id}`, formData);

      console.log(response.data);
      if (!isEditing) {
        navigate(`/admin/includes/${id}`);
      } else {
        navigate(`/admin/edit-includes/${id}`);
      }
    } catch (error) {
      console.log(error.response?.data);
      setError("Failed to submit gallery");
    } finally {
      setSaving(false);
    }
  };

  const handlePrevious = () => {
    if (isEditing) {
      navigate(`/admin/edit-itinerary/${id}`);
    } else {
      navigate(`/admin/itinerary/${id}`);
    }
  };

  const handleNext = () => {
    if (isEditing) {
      navigate(`/admin/edit-gallery/${id}`);
    } else {
      navigate(`/admin/gallery/${id}`);
    }
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
        {error && (
          <div className="bg-red-600 text-white p-2 rounded mb-4 text-center">
            {error}
          </div>
        )}

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

          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
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
              <img
                src={image.url}
                alt="Package preview"
                className="w-full h-48 object-cover"
              />
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
              onClick={handleSubmit}
              disabled={saving}
              className="px-5 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              {saving ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
