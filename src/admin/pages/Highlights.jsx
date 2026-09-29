import React, { useState } from "react";
import { useNavigate, useParams, useMatch } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function Highlights() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = useMatch("/admin/edit-highlights/:id");
  const [saving, setSaving] = useState(false);

  const [highlights, setHighlights] = useState([]);
  const [newHighlight, setNewHighlight] = useState("");

  const currentStep = 4;
  const steps = ["Package", "Itinerary", "Gallery", "Highlights", "Includes", "Exclude"];

  // Function to handle form submission
  const handleSubmit = async () => {
    setSaving(true);
    try {
      // TODO: Add API call when backend is ready
      // const response = isEditing
      //   ? await api.post(`/highlights/${id}?_method=PUT`, { highlights })
      //   : await api.post(`/highlights/${id}`, { highlights });

      toast.success(
        isEditing
          ? "Highlights updated successfully"
          : "Highlights saved successfully",
      );

      if (isEditing) {
        navigate(`/admin/edit-includes/${id}`);
      } else {
        navigate(`/admin/includes/${id}`);
      }
    } catch (error) {
      console.log(error.response?.data);
      toast.error(
        isEditing
          ? "Failed to update highlights. Please try again."
          : "Failed to save highlights. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  // Function to add a new item to the list
  const addHighlight = () => {
    if (!newHighlight.trim()) return;
    setHighlights([...highlights, newHighlight.trim()]);
    setNewHighlight("");
  };

  // Function to remove an item from the list
  const removeHighlight = (index) => {
    setHighlights(highlights.filter((_, i) => i !== index));
  };

  // Navigation handlers
  const handlePrevious = () => {
    if (isEditing) {
      navigate(`/admin/edit-gallery/${id}`);
    } else {
      navigate(`/admin/gallery/${id}`);
    }
  };

  const handleNext = () => {
    if (isEditing) {
      navigate(`/admin/edit-includes/${id}`);
    } else {
      navigate(`/admin/includes/${id}`);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Trek Highlights</h1>
        <p className="text-slate-400 text-sm">
          Add key highlights and attractions of the trek
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

      {/* Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
        <div className="space-y-5">
          {/* Add item */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newHighlight}
              onChange={(event) => setNewHighlight(event.target.value)}
              placeholder="Example: Visit Everest Base Camp"
              className="flex-1 rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={addHighlight}
              className="px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition whitespace-nowrap"
            >
              Add
            </button>
          </div>

          {/* Current items */}
          <div className="pt-2">
            <h3 className="text-sm font-semibold text-white mb-3">
              Added Highlights
            </h3>

            <div className="space-y-2">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-950 px-4 py-3">
                  <p className="text-white text-sm">{item}</p>
                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8 pt-4 border-t border-slate-800">
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
