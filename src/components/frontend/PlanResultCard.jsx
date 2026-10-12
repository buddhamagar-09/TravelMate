import React from "react";
import { Link } from "react-router-dom";

const CATEGORY_LABELS = {
  trekking: "Trekking",
  tour: "Tour",
  wildlife: "Wildlife Safari",
};

export default function PlanResultCard({ pkg }) {
  return (
    <div className="group bg-[#FFFFFF] dark:bg-[#FFFFFF] border border-[#DDE7DF] dark:border-[#DDE7DF] overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-300/40 dark:hover:shadow-black/40">
      <div className="relative overflow-hidden">
        <img
          src={`http://localhost:8000/storage/${pkg.featured_image}`}
          alt={pkg.title}
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {pkg.category && (
          <span className="absolute top-3 left-3 bg-[#047857] text-white text-xs font-medium px-2 py-1">
            {CATEGORY_LABELS[pkg.category] ?? pkg.category}
          </span>
        )}

        {pkg.matchScore != null && (
          <span
            className={`absolute top-3 right-3 text-xs font-medium px-2 py-1 ${
              pkg.matchScore >= 90
                ? "bg-emerald-500 text-white"
                : pkg.matchScore >= 70
                  ? "bg-[#047857] text-white"
                  : "bg-[#CDD9CF] text-slate-200"
            }`}
          >
            {pkg.matchScore}% match
          </span>
        )}
      </div>

      <div className="p-4">
        <h2 className="font-semibold text-base text-slate-900 dark:text-slate-900 line-clamp-2 leading-snug min-h-11">
          {pkg.title}
        </h2>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-xs uppercase tracking-wide text-slate-400">
              From
            </p>
            <p className="text-xl font-bold text-[#047857]">Rs. {pkg.price}</p>
          </div>

          <Link
            to={`/package/${pkg.id}`}
            className="text-sm font-semibold text-[#047857] hover:text-[#047857] transition-colors"
          >
            View →
          </Link>
        </div>
      </div>
    </div>
  );
}