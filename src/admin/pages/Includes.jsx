import React,{useState,useEffect} from "react";
import { useNavigate, useParams,useMatch } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

export default function Includes() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = useMatch("/admin/edit-includes/:id"); // Check if we are in edit mode based on the URL pattern
  const [saving, setSaving] = useState(false);

  const [includes, setIncludes] = useState([]);
  const [newInclude, setNewInclude] = useState(""); // State for the new include item input

  const currentStep = 5;
  const steps = ["Package", "Itinerary", "Gallery", "Highlights", "Includes", "Exclude"];

  // Function to fetch existing includes if we are in edit mode
  useEffect(() => {
    if (!isEditing) return; // if we are not in edit mode then we don't need to fetch existing includes
    setSaving(true);

    //fetch existing includes
    const fetchIncludes = async () => {
      try{
        const response = await api.get(`/includes/${id}`);
        console.log(response.data);
        const existingIncludes = response.data.includes.map((item) => item.item);
        setIncludes(existingIncludes);
      }catch(error){
        console.log(error.response?.data);
        toast.error("Failed to fetch existing includes. Please try again.");
      }
      finally{
        setSaving(false);
      }
    }
    fetchIncludes();
}, [id, isEditing]);


// Function to handle form submission
  const handleSubmit = async () => {

    setSaving(true);
    try{
      const response = isEditing
        ? await api.post(`/includes/${id}?_method=PUT`, { includes })
        : await api.post(`/includes/${id}`, { includes });

      console.log(response.data);
      toast.success(
        isEditing
          ? "Includes updated successfully"
          : "Includes created successfully",
      );

     if(isEditing) {
        navigate(`/admin/edit-excludes/${id}`);
      }
      else {
        navigate(`/admin/excludes/${id}`);
      }

    }
    catch(error){
      console.log(error.response?.data);
      toast.error(
        isEditing
          ? "Failed to update includes. Please try again."
          : "Failed to create includes. Please try again.",
      );
      
    }
    finally{
      setSaving(false);
    }

  }

// Function to add a new item to the list
  const addInclude = () => {
    if(!newInclude.trim()) return; // Prevent adding empty items
    setIncludes([...includes, newInclude.trim()]);
    setNewInclude(""); // Clear the input field
  };
// Function to remove an item from the list
  const removeInclude = (index) => {
    setIncludes(includes.filter((_, i) => i !== index));
  };

// Navigation handlers
  const handlePrevious = () => {
   if(isEditing) {
      navigate(`/admin/edit-highlights/${id}`);
    } else {
      navigate(`/admin/highlights/${id}`);
    }
  };
// Navigation handlers
  const handleNext = () => {
      if(isEditing) {
        navigate(`/admin/edit-excludes/${id}`);
      }
      else {
        navigate(`/admin/excludes/${id}`);
      }
  };

  return (
    <div className="p-4 md:p-6 bg-[#EEF4EF] min-h-screen">
      {/* Header */}{" "}
      <div className="mb-6">
        {" "}
        <h1 className="text-2xl font-bold text-slate-900">Package Includes</h1>{" "}
        <p className="text-slate-600 text-sm">
          Add services that are included in the package price{" "}
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
          <div
            className="h-full bg-[#064E3B]"
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
              value={newInclude}
              onChange={(event) => setNewInclude(event.target.value)}
              placeholder="Example: Airport pickup and drop"
              className="flex-1 rounded-md border border-[#CDD9CF] bg-[#FFFFFF] px-4 py-3 text-slate-900 placeholder-slate-500 focus:border-[#064E3B] focus:outline-none"
            />

            <button
              type="button"
              onClick={addInclude}
              className="px-5 py-3 rounded-md bg-[#064E3B] text-white hover:bg-[#04382A] transition whitespace-nowrap"
            >
              Add
            </button>
          </div>

          {/* Current items */}
          <div className="pt-2">
            <h3 className="text-sm font-semibold text-slate-900 mb-3">
              Included Items
            </h3>

            <div className="space-y-2">
              {includes.map((item, index) => (
                <div key={index} className="flex items-center justify-between rounded-md border border-[#DDE7DF] bg-[#FFFFFF] px-4 py-3">
                  <p className="text-slate-900 text-sm">{item}</p>
                  <button
                    type="button"
                    onClick={() => removeInclude(index)}
                  >   
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
              className="px-5 py-2 rounded-md bg-[#064E3B] text-white hover:bg-[#04382A] transition"
            >
             {saving ? "Saving..." : "Save & Continue"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
