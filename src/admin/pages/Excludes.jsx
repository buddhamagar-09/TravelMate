import React from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Excludes() {
  const navigate = useNavigate();
  const { id } = useParams();

  const currentStep = 5;
  const steps = ["Package", "Itinerary", "Gallery", "Includes", "Exclude"];

  const handlePrevious = () => {
    navigate(`/admin/includes`);
  };

  const handleFinish = () => {
    navigate("/admin/view-packages");
  };

  return (
    <div className="p-4 md:p-6 bg-slate-950 min-h-screen">
      {/* Header */}{" "}
      <div className="mb-6">
        {" "}
        <h1 className="text-2xl font-bold text-white">Package Excludes</h1>{" "}
        <p className="text-slate-400 text-sm">
          Add expenses that are not included in the package price{" "}
        </p>{" "}
      </div>
      ```
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
          <div className="h-full bg-blue-600" style={{ width: "100%" }} />
        </div>
      </div>
      {/* Form */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              Exclude Item
            </label>
            <input
              type="text"
              placeholder="Example: International flight ticket"
              className="w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
            />
          </div>

      

          {/* Static preview list */}
          <div className="pt-2">
            <h3 className="text-sm font-semibold text-white mb-3">
              Current Excluded Items
            </h3>

            <div className="space-y-3">
              <div className="flex items-start justify-between rounded-md border border-slate-800 bg-slate-950 p-4">
                <div>
                  <p className="font-medium text-white">
                    International flight ticket
                  </p>
                  <p className="text-sm text-slate-400 mt-1">
                    Airfare from your home country to Nepal is not included.
                  </p>
                </div>

                <button
                  type="button"
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              </div>

              <div className="flex items-start justify-between rounded-md border border-slate-800 bg-slate-950 p-4">
                <div>
                  <p className="font-medium text-white">Personal expenses</p>
                  <p className="text-sm text-slate-400 mt-1">
                    Snacks, drinks, laundry, charging, and other personal costs.
                  </p>
                </div>

                <button
                  type="button"
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  Remove
                </button>
              </div>
            </div>
          </div>

          {/* Completion box */}
          <div className="rounded-lg border border-blue-500/30 bg-blue-500/10 p-4">
           <div>
                <p className="font-semibold text-white">Final Step</p>
                <p className="text-sm text-slate-300 mt-1">
                  After saving this form, the package setup will be completed
                  and the package can be viewed from the admin package list.
                </p>
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
              className="px-5 py-2 rounded-md border border-slate-700 text-slate-300 hover:bg-slate-800 transition"
            >
              Save Draft
            </button>

            <button
              type="button"
              onClick={handleFinish}
              className="px-5 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition"
            >
              Finish Package
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
