import React, { useState, useMemo, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import api from "../../api/axios";
import useFetchPackages from "../Hook/FetchPackages";

function Package() {
  const { packages, fetchPackages, loading } = useFetchPackages();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");
  const categoryQuery = searchParams.get("category");

  // Filter state
  const [category, setCategory] = useState(categoryQuery || "all");
  const [duration, setDuration] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

  useEffect(() => {
    setCategory(categoryQuery || "all");
  }, [categoryQuery]);

  const { data: searchResults = [] } = useQuery({
    queryKey: ["search-packages", searchQuery],
    queryFn: async () => {
      const response = await api.get(
        `/search-packages?query=${encodeURIComponent(searchQuery)}`,
      );
      return response.data;
    },
    enabled: !!searchQuery,
    onError: () => {
      toast.error("Failed to search packages. Please try again.");
    },
  });

  const basePackages = searchQuery ? searchResults : packages;

  // Apply filters client-side
  const displayPackages = useMemo(() => {
    return basePackages.filter((pkg) => {
      const matchCategory = category === "all" || pkg.category === category;

      const matchDifficulty =
        difficulty === "all" || pkg.difficulty === difficulty;

      const matchDuration = (() => {
        if (duration === "all") return true;
        const days = parseInt(pkg.duration, 10);
        if (isNaN(days)) return true;
        if (duration === "short") return days <= 7;
        if (duration === "medium") return days > 7 && days <= 14;
        if (duration === "long") return days > 14;
        return true;
      })();

      return matchCategory && matchDifficulty && matchDuration;
    });
  }, [basePackages, category, difficulty, duration]);

  return (
    <>
      {/* ==================== PAGE HEADER ==================== */}
      <section className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border-b border-[#DDE7DF] dark:border-[#DDE7DF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#064E3B] mb-3">
            Packages
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Explore Nepal
          </h1>
          <p className="mt-4 text-base lg:text-lg text-slate-600 max-w-xl leading-relaxed">
            Discover trekking, hiking, cultural tours and unforgettable
            adventures across Nepal.
          </p>
        </div>
      </section>

      {/* ==================== FILTERS ==================== */}
      <div className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border-b border-[#DDE7DF] dark:border-[#DDE7DF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* Label */}
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-400 hidden sm:inline">
              Filter
            </span>

            <div className="hidden sm:block h-5 w-px bg-[#DCE7DE] dark:bg-[#EEF4EF]" />

            {/* Category */}
            <FilterSelect
              value={category}
              onChange={setCategory}
              options={[
                { value: "all", label: "All Categories" },
                { value: "trekking", label: "Trekking" },
                { value: "tour", label: "Tour" },
                { value: "wildlife", label: "Wildlife Safari" },
              ]}
            />

            {/* Duration */}
            <FilterSelect
              value={duration}
              onChange={setDuration}
              options={[
                { value: "all", label: "Any Duration" },
                { value: "short", label: "Less than 7 days" },
                { value: "medium", label: "8 – 14 days" },
                { value: "long", label: "15+ days" },
              ]}
            />

            {/* Difficulty */}
            <FilterSelect
              value={difficulty}
              onChange={setDifficulty}
              options={[
                { value: "all", label: "Any Difficulty" },
                { value: "Easy", label: "Easy" },
                { value: "Moderate", label: "Moderate" },
                { value: "Hard", label: "Hard" },
              ]}
            />

            {/* Clear */}
            {(category !== "all" ||
              duration !== "all" ||
              difficulty !== "all") && (
              <button
                onClick={() => {
                  setCategory("all");
                  setDuration("all");
                  setDifficulty("all");
                }}
                className="ml-auto inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-600 hover:text-[#064E3B] dark:hover:text-[#064E3B] transition-colors"
              >
                <span className="text-base leading-none">×</span>
                Clear filters
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ==================== GRID ==================== */}
      <section className="bg-[#EEF4EF] dark:bg-[#FFFFFF] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border border-[#DDE7DF] dark:border-[#DDE7DF] overflow-hidden animate-pulse"
                >
                  <div className="w-full h-56 bg-[#DCE7DE] dark:bg-[#EEF4EF]" />
                  <div className="p-4">
                    <div className="h-5 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-3/4" />
                    <div className="h-4 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-1/2 mt-2" />
                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <div className="h-3 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-10" />
                        <div className="h-7 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-20 mt-2" />
                      </div>
                      <div className="h-4 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : displayPackages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {displayPackages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="group bg-[#FFFFFF] dark:bg-[#FFFFFF] border border-[#DDE7DF] dark:border-[#DDE7DF] overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-300/40 dark:hover:shadow-black/40"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={`http://localhost:8000/storage/${pkg.featured_image}`}
                      alt={pkg.title}
                      className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Category badge */}
                    {pkg.category && (
                      <span className="absolute top-3 left-3 bg-[#064E3B] text-white text-xs font-medium px-2 py-1">
                        {pkg.category === "trekking"
                          ? "Trekking"
                          : pkg.category === "tour"
                            ? "Tour"
                            : pkg.category === "wildlife"
                              ? "Wildlife"
                              : pkg.category}
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
                        <p className="text-xl font-bold text-[#064E3B]">
                          Rs. {pkg.price}
                        </p>
                      </div>

                      <Link
                        to={`/package/${pkg.id}`}
                        className="text-sm font-semibold text-[#064E3B] hover:text-[#064E3B] transition-colors"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-600">
                No packages found matching your filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FilterSelect({ value, onChange, options }) {
  const isActive = value !== "all";

  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`appearance-none cursor-pointer text-sm pr-9 pl-4 py-2 border transition-colors focus:outline-none focus:border-[#064E3B] ${
          isActive
            ? "border-[#064E3B] bg-[#064E3B]/10 dark:bg-[#064E3B]/10 text-[#064E3B] dark:text-[#064E3B] font-medium"
            : "border-[#CDD9CF] dark:border-[#CDD9CF] bg-[#FFFFFF] dark:bg-[#FFFFFF] text-slate-700 dark:text-slate-800 hover:border-[#B8C7BB] dark:hover:border-[#CDD9CF]"
        }`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      {/* Custom chevron */}
      <span
        className={`pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs transition-colors ${
          isActive ? "text-[#064E3B]" : "text-slate-400"
        }`}
      >
        ▼
      </span>
    </div>
  );
}

export default Package;
