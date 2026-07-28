import React,{useState,useEffect} from "react";
import { useNavigate, useParams,useMatch } from "react-router-dom";
import api from "../../api/axios";

export default function Includes() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = useMatch("/admin/edit-includes/:id"); // Check if we are in edit mode based on the URL pattern
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [includes, setIncludes] = useState([]);
  const [newInclude, setNewInclude] = useState(""); // State for the new include item input

  const currentStep = 4;
  const steps = ["Package", "Itinerary", "Gallery", "Includes", "Exclude"];


//function to fetch existing includes if we are in edit mode
useEffect(() => {
  if (!isEditing) return; // if we are not in edit mode then we don't need to fetch existing includes
  setSaving(true);
  setError(null);
  //fetch existing includes
  const fetchIncludes = async () => {
    try{
      const response = await api.get(`/includes/${id}`);
      console.log(response.data);
      const existingIncludes = response.data.includes.map((item) => item.item);
      setIncludes(existingIncludes);
    }catch(error){
      console.log(error.response?.data);
      setError("Failed to fetch existing includes");
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
    setError(null);
    try{
      const response = isEditing
        ? await api.post(`/includes/${id}?_method=PUT`, { includes })
        : await api.post(`/includes/${id}`, { includes });

      console.log(response.data);

     if(isEditing) {
        navigate(`/admin/edit-excludes/${id}`);
      }
      else {
        navigate(`/admin/excludes/${id}`);
      }

    }
    catch(error){
      console.log(error.response?.data);
      setError("Failed to save includes");
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
      navigate(`/admin/edit-gallery/${id}`);
    } else {
      navigate(`/admin/gallery/${id}`);
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
    <div className="p-4 md:p-6 bg-slate-950 min-h-screen">
      {/* Header */}{" "}
      <div className="mb-6">
        {" "}
        <h1 className="text-2xl font-bold text-white">Package Includes</h1>{" "}
        <p className="text-slate-400 text-sm">
          Add services that are included in the package price{" "}
        </p>
        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
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
              value={newInclude}
              onChange={(event) => setNewInclude(event.target.value)}
              placeholder="Example: Airport pickup and drop"
              className="flex-1 rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />

            <button
              type="button"
              onClick={addInclude}
              className="px-5 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition whitespace-nowrap"
            >
              Add
            </button>
          </div>

          {/* Current items */}
          <div className="pt-2">
            <h3 className="text-sm font-semibold text-white mb-3">
              Included Items
            </h3>

            <div className="space-y-2">
              {includes.map((item, index) => (
                <div key={index} className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-950 px-4 py-3">
                  <p className="text-white text-sm">{item}</p>
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
