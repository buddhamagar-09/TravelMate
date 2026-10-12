import React, { useState, useEffect } from "react";
import { useNavigate, useParams, useMatch } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

export default function ItineraryStep() {
  const currentStep = 2;

  const steps = ["Package", "Itinerary", "Gallery", "Highlights", "Includes", "Exclude"];

  const { id } = useParams(); // Get the package ID from the URL
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const isEditing = useMatch("/admin/edit-itinerary/:id"); // Check if we are in edit mode based on the URL pattern

  // Static demo data
  const [days, setDays] = useState([
    {
      day_number: 1,
      title: "",
      description: "",
      overnight_stay: "",
    },
  ]);

  // Add another itinerary day
  const addDay = () => {
    setDays([
      ...days,
      {
        day_number: days.length + 1,
        title: "",
        description: "",
        overnight_stay: "",
      },
    ]);
  };

  const handleSubmit = async () => {
    // Here you can handle the submission of the itinerary data to your backend or API
    setLoading(true);
    console.log("Submitting Itinerary:", days);
    try {
      const response = isEditing
        ? await api.put(`/itinerary/${id}`, { itinerary: days })
        : await api.post(`/itinerary/${id}`, { itinerary: days });

      console.log(response.data);
      toast.success(
        isEditing
          ? "Itinerary updated successfully"
          : "Itinerary created successfully",
      );

      if (!isEditing) {
        navigate(`/admin/gallery/${id}`);
      } else {
        navigate(`/admin/edit-gallery/${id}`);
      }
    } catch (error) {
      console.log(error.response.data);
     toast.error(
        isEditing
          ? "Failed to update itinerary. Please try again."
          : "Failed to create itinerary. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  // if we are in editing mode then we need to fetch the existing itinerary data for the package and populate the form
  useEffect(() => {
    if (!isEditing) return;

    const fetchItinerary = async () => {
      setLoading(true);

      try {
        const response = await api.get(`/itinerary/${id}`);
        setDays(response.data.itinerary);
      } catch (error) {
        console.error(error);
        toast.error("Failed to fetch existing itinerary. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchItinerary();
  }, [isEditing, id]);

  const handlePrevious = () => {
    if (isEditing) {
      navigate(`/admin/edit-package/${id}`);
    } else {
      navigate(`/admin/add-package`);
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
    <div className="p-4 md:p-6 bg-[#EEF4EF] min-h-screen">
      {/* Page title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          {isEditing ? "Edit Itinerary" : "Add Itinerary"}
        </h1>
        <p className="text-slate-600 text-sm">
          {isEditing
            ? "Update the day-by-day itinerary for this package."
            : "Create a day-by-day itinerary for this package."}
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

      {/* Itinerary Form */}
      <div className="bg-[#FFFFFF] border border-[#DDE7DF] rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-slate-900">
            Day-by-Day Itinerary
          </h2>
         

          <button
            type="button"
            onClick={addDay}
            className="px-4 py-2 bg-[#047857] text-white rounded-md hover:bg-[#065F46] transition text-sm"
          >
            + Add Day
          </button>
        </div>

        <div className="space-y-6">
          {days.map((item, index) => (
            <div
              key={index}
              className="border border-[#DDE7DF] rounded-lg p-5 bg-[#FFFFFF]/40"
            >
              {/* Day Header */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-slate-900 font-semibold">
                  Day {item.day_number}
                </h3>

                <span className="text-xs px-2 py-1 rounded bg-[#EEF4EF] text-slate-700">
                  Itinerary
                </span>
              </div>

              {/* Day Title */}
              <div className="mb-4">
                <label className="block text-sm text-slate-700 mb-2">
                  Day Title
                </label>

                <input
                  value={item.title}
                  onChange={(e) => {
                    const updated = [...days];
                    updated[index].title = e.target.value;
                    setDays(updated);
                  }}
                  type="text"
                  placeholder="Arrival in Kathmandu"
                  className="w-full px-3 py-2 rounded-md bg-[#EEF4EF] border border-[#CDD9CF] text-slate-900 placeholder-slate-500 focus:outline-none focus:border-[#047857]"
                />
              </div>

              {/* Description */}
              <div className="mb-4">
                <label className="block text-sm text-slate-700 mb-2">
                  Description
                </label>

                <textarea
                  value={item.description}
                  onChange={(e) => {
                    const updated = [...days];
                    updated[index].description = e.target.value;
                    setDays(updated);
                  }}
                  rows="4"
                  placeholder="Describe the activities, trekking hours, sightseeing, meals, and important information for this day..."
                  className="w-full px-3 py-2 rounded-md bg-[#EEF4EF] border border-[#CDD9CF] text-slate-900 placeholder-slate-500 focus:outline-none focus:border-[#047857] resize-none"
                />
              </div>

              {/* Overnight */}
              <div>
                <label className="block text-sm text-slate-700 mb-2">
                  Overnight Stay
                </label>

                <input
                  value={item.overnight_stay}
                  onChange={(e) => {
                    const updated = [...days];
                    updated[index].overnight_stay = e.target.value;
                    setDays(updated);
                  }}
                  type="text"
                  placeholder="Kathmandu"
                  className="w-full px-3 py-2 rounded-md bg-[#EEF4EF] border border-[#CDD9CF] text-slate-900 placeholder-slate-500 focus:outline-none focus:border-[#047857]"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 mt-6 pt-4 border-t border-[#DDE7DF]">
          {/* Left */}
          <button
            onClick={handlePrevious}
            type="button"
            className="px-5 py-2 rounded-md bg-[#EEF4EF] text-slate-900 hover:bg-[#DCE7DE] transition"
          >
            ← Previous
          </button>

          {/* Right */}
          <div className="flex gap-3">
            <button
              onClick={handleNext}
              type="button"
              className="px-5 py-2 rounded-md bg-[#EEF4EF] text-slate-900 hover:bg-[#DCE7DE] transition"
            >
              Next →
            </button>

            <button
              onClick={handleSubmit}
              type="button"
              disabled={loading}
              className="px-5 py-2 rounded-md bg-[#047857] text-white hover:bg-[#065F46] transition"
            >
              {loading ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
