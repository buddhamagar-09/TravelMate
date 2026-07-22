import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function Includes() {
const navigate = useNavigate();
const { id } = useParams();

const currentStep = 4;
const steps = ['Package', 'Itinerary', 'Gallery', 'Includes', 'Exclude'];

const handlePrevious = () => {
navigate(`/admin/gallery`);
};

const handleNext = () => {
navigate(`/admin/excludes`);
};

return ( <div className="p-4 md:p-6 bg-slate-950 min-h-screen">
{/* Header */} <div className="mb-6"> <h1 className="text-2xl font-bold text-white">Package Includes</h1> <p className="text-slate-400 text-sm">
Add services that are included in the package price </p> </div>


  {/* Progress */}
  <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 mb-6">
    <div className="flex items-center justify-between text-sm mb-3">
      {steps.map((step, index) => (
        <div key={step} className="flex flex-col items-center flex-1">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
              index + 1 <= currentStep
                ? 'bg-blue-600 text-white'
                : 'bg-slate-700 text-slate-300'
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
      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Include Item
        </label>
        <input
          type="text"
          placeholder="Example: Airport pickup and drop"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-300 mb-2">
          Description
        </label>
        <textarea
          rows="3"
          placeholder="Short description of this included service"
          className="w-full rounded-md border border-slate-700 bg-slate-950 px-4 py-3 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
        />
      </div>

      {/* Static preview list */}
      <div className="pt-2">
        <h3 className="text-sm font-semibold text-white mb-3">
          Current Included Items
        </h3>

        <div className="space-y-3">
          <div className="flex items-start justify-between rounded-md border border-slate-800 bg-slate-950 p-4">
            <div>
              <p className="font-medium text-white">
                Airport pickup and drop
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Private airport transfer before and after the trip.
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
              <p className="font-medium text-white">
                Tea house accommodation
              </p>
              <p className="text-sm text-slate-400 mt-1">
                Accommodation during the trek as per itinerary.
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
