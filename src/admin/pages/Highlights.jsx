import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useMatch } from "react-router-dom";
import { toast } from "react-hot-toast";
import api from "../../api/axios";

export default function Highlights() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = useMatch("/admin/edit-highlights/:id");
  const [saving, setSaving] = useState(false);

  const [highlights, setHighlights] = useState([]);
  const [newHighlight, setNewHighlight] = useState("");

  const currentStep = 4;
  const steps = [
    "Package",
    "Itinerary",
    "Gallery",
    "Highlights",
    "Includes",
    "Exclude",
  ];

  //fetch existing highlights if we are in edit mode
  useEffect(() => {
    if (!isEditing) return;

    const fetchHighlights = async () => {
      setSaving(true);
      try {
        const response = await api.get(`/trek-highlights/${id}`);
        const existingHighlights = response.data.highlights.map(
          (item) => item.highlight,
        );
        setHighlights(existingHighlights);
      } catch (error) {
        console.log(error.response?.data);
        toast.error("Failed to fetch existing highlights. Please try again.");
      } finally {
        setSaving(false);
      }
    };

    fetchHighlights();
  }, [id, isEditing]);

  // Function to handle form submission
  const handleSubmit = async () => {
    setSaving(true);
    try {
      // TODO: Add API call when backend is ready
      const response = isEditing
        ? await api.post(`/trek-highlights/${id}?_method=PUT`, { highlights })
        : await api.post(`/trek-highlights/${id}`, { highlights });

      console.log("Response:", response.data); // Log the response data for debugging
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
    <div className="p-4 md:p-6 bg-[#EEF4EF] min-h-screen">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">Trek Highlights</h1>
        <p className="text-slate-600 text-sm">
          Add key highlights and attractions of the trek
        </p>
      </div>

      {/* Progress */}
      <div className="bg-[#FFFFFF] border border-[#DDE7DF] rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between text-sm mb-3">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  index + 1 <= currentStep
                    ? "bg-[#047857] text-white"
                    : "bg-[#DCE7DE] text-slate-700"
                }`}
              >
                {index + 1}
              </div>
              <span className="mt-2 text-xs text-slate-700">{step}</span>
            </div>
          ))}
        </div>

        <div className="w-full h-2 bg-[#DCE7DE] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#047857]"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Form */}
      <div className="bg-[#FFFFFF] border border-[#DDE7DF] rounded-lg p-6">
        <div className="space-y-5">
          {/* Add item */}
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={newHighlight}
              onChange={(event) => setNewHighlight(event.target.value)}
              placeholder="Example: Visit Everest Base Camp"
              className="flex-1 rounded-md border border-[#CDD9CF] bg-[#FFFFFF] px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-[#047857] focus:outline-none"
            />

            <button
              type="button"
              onClick={addHighlight}
              className="px-5 py-3 rounded-md bg-[#047857] text-white hover:bg-[#065F46] transition whitespace-nowrap"
            >
              Add
            </button>
          </div>

          {/* Current items */}
          <div className="pt-2">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Added Highlights
            </h3>

            <div className="space-y-2">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border border-[#DDE7DF] bg-[#FFFFFF] px-4 py-3"
                >
                  <p className="text-slate-900 text-sm">{item}</p>
                  <button type="button" onClick={() => removeHighlight(index)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-8 pt-4 border-t border-[#DDE7DF]">
          <button
            type="button"
            onClick={handlePrevious}
            className="px-5 py-2 rounded-md bg-[#EEF4EF] text-slate-900 hover:bg-[#DCE7DE] transition"
          >
            ← Previous
          </button>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2 rounded-md bg-[#EEF4EF] text-slate-900 hover:bg-[#DCE7DE] transition"
            >
              Next →
            </button>

            <button
              type="button"
              onClick={handleSubmit}
              className="px-5 py-2 rounded-md bg-[#047857] text-white hover:bg-[#065F46] transition"
            >
              {saving ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
