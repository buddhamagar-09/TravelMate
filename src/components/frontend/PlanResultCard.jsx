import React from "react";
import { Link } from "react-router-dom";

const CATEGORY_LABELS = {
  trekking: "Trekking",
  tour: "Tour",
  wildlife: "Wildlife Safari",
};

export default function PlanResultCard({ pkg }) {
  return (
    <div className="group bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-300/40 dark:hover:shadow-black/40">
      <div className="relative overflow-hidden">
        <img
          src={`http://localhost:8000/storage/${pkg.featured_image}`}
          alt={pkg.title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {pkg.category && (
          <span className="absolute top-3 left-3 bg-sky-500 text-white text-xs font-medium px-2 py-1">
            {CATEGORY_LABELS[pkg.category] ?? pkg.category}
          </span>
        )}

        {pkg.matchScore != null && (
          <span
            className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 ${
              pkg.matchScore >= 90
                ? "bg-emerald-500 text-white"
                : pkg.matchScore >= 70
                  ? "bg-sky-500 text-white"
                  : "bg-slate-700 text-slate-200"
            }`}
          >
            {pkg.matchScore}% match
          </span>
        )}
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-base text-slate-900 dark:text-white line-clamp-2 leading-snug min-h-11">
          {pkg.title}
        </h2>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              From
            </p>
            <p className="text-xl font-bold text-sky-500">Rs. {pkg.price}</p>
          </div>

          <Link
            to={`/package/${pkg.id}`}
            className="text-sm font-semibold text-sky-500 hover:text-sky-600 transition-colors"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}