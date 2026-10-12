import React, { useState, useEffect } from "react";
import { useNavigate, useParams,useMatch } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

export default function Excludes() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [saving, setSaving] = React.useState(false);

  const [excludes, setExcludes] = useState([]);
  const [newExclude, setNewExclude] = useState(""); // State for the new exclude item input

  const currentStep = 6;
  const steps = ["Package", "Itinerary", "Gallery", "Highlights", "Includes", "Exclude"];

  const isEditing = useMatch("/admin/edit-excludes/:id"); // Check if we are in edit mode based on the URL pattern
  //function to fetch existing includes if we are in edit mode
useEffect(() => {
  if (!isEditing) return; // if we are not in edit mode then we don't need to fetch existing includes
  setSaving(true);
  //fetch existing includes
  const fetchExcludes = async () => {
    try{
      const response = await api.get(`/excludes/${id}`);
      console.log(response.data);
      const existingExcludes = response.data.excludes.map((item) => item.item);
      setExcludes(existingExcludes);
    }catch(error){
      console.log(error.response?.data);
      toast.error("Failed to fetch existing excludes. Please try again.");
    }
    finally{
      setSaving(false);
    }
  }
  fetchExcludes();
}, [id, isEditing]);

  const handleSubmit = async () => {
    setSaving(true);
   

    try {
     if(isEditing) {
        await api.post(`/excludes/${id}?_method=PUT`, { excludes });
      }
      else {
        await api.post(`/excludes/${id}`, { excludes });
      }
      toast.success(
        isEditing
          ? "Excludes updated successfully"
          : "Excludes created successfully",
      );
      navigate("/admin/view-packages");

    } catch (error) {
      console.log(error.response?.data);
      toast.error(
        isEditing
          ? "Failed to update excludes. Please try again."
          : "Failed to create excludes. Please try again.",
      );
   
    } finally {
      setSaving(false);
    }
  };

  const addExclude = () => {
    if (!newExclude.trim()) return;

    setExcludes((prev) => [...prev, newExclude.trim()]);
    setNewExclude("");
  };

  const removeExclude = (index) => {
    setExcludes((prev) => prev.filter((_, i) => i !== index));
  };

  const handlePrevious = () => {
    if(isEditing) {
      navigate(`/admin/edit-includes/${id}`);
    } else {
      navigate(`/admin/includes/${id}`);
    }
  };

  return (
    <div className="p-4 md:p-6 bg-[#EEF4EF] min-h-screen">
      {/* Header */}{" "}
      <div className="mb-6">
        {" "}
        <h1 className="text-2xl font-bold text-slate-900">Package Excludes</h1>{" "}
        <p className="text-slate-600 text-sm">
          Add expenses that are not included in the package price{" "}
        </p>{" "}
      </div>
      {/* Progress */}
      <div className="bg-[#FFFFFF] border border-[#DDE7DF] rounded-lg p-4 mb-6">
        <div className="flex items-center justify-between text-sm mb-3">
          {steps.map((step, index) => (
            <div key={step} className="flex flex-col items-center flex-1">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                  index + 1 <= currentStep
                    ? "bg-[#064E3B] text-white"
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
          <div className="h-full bg-[#064E3B]" style={{ width: "100%" }} />
        </div>
      </div>
      {/* Form */}
    
      <div className="bg-[#FFFFFF] border border-[#DDE7DF] rounded-lg p-6">
        <div className="space-y-5">
          <div className="flex flex-col sm:flex-row gap-3 items-start">
            <input
              type="text"
              placeholder="Example: International flight ticket"
              className="w-full rounded-md border border-[#CDD9CF] bg-[#FFFFFF] px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-[#064E3B] focus:outline-none"
              value={newExclude}
              onChange={(e) => setNewExclude(e.target.value)}
            />

            <button
              type="button"
              onClick={addExclude}
              className="px-5 py-3 rounded-md bg-[#064E3B] text-white hover:bg-[#04382A] transition whitespace-nowrap"
            >
              Add
            </button>
          </div>

          {/* Static preview list */}
          <div className="pt-2">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Current Excluded Items
            </h3>

            <div className="space-y-3">
              {excludes.map((exclude, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-md border border-[#DDE7DF] bg-[#FFFFFF] p-4 mb-3"
                >
                  <div className="flex items-center gap-2">
                    <p className="text-slate-900">{exclude}</p>
                  </div>

                  <button
                    type="button"
                    onClick={() => removeExclude(index)}
                    className="rounded  px-3 py-1 text-sm text-slate-900 hover:bg-red-700"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Completion box */}
          <div className="rounded-lg border border-[#064E3B]/30 bg-[#064E3B]/10 p-4">
            <div>
              <p className="font-semibold text-slate-900">Final Step</p>
              <p className="text-sm text-slate-700 mt-1">
                After saving this form, the package setup will be completed and
                the package can be viewed from the admin package list.
              </p>
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
              onClick={handleSubmit}
              className="px-5 py-2 rounded-md bg-[#064E3B] text-white hover:bg-[#04382A] transition"
            >
              {saving ? "Saving..." : "Save & Finish"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
