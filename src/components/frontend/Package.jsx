import React, { useState, useMemo } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import api from "../../api/axios";
import useFetchPackages from "../Hook/FetchPackages";

function Package() {
  const { packages, fetchPackages, loading } = useFetchPackages();

  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  // Filter state
  const [category, setCategory] = useState("all");
  const [duration, setDuration] = useState("all");
  const [difficulty, setDifficulty] = useState("all");

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
      const matchCategory =
        category === "all" || pkg.category === category;

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
      <section className="bg-slate-900 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-400 mb-3">
            Packages
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Explore Nepal
          </h1>
          <p className="mt-4 text-base lg:text-lg text-slate-300 max-w-xl leading-relaxed">
            Discover trekking, hiking, cultural tours and unforgettable
            adventures across Nepal.
          </p>
        </div>
      </section>

      {/* ==================== FILTERS ==================== */}
      <div className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 flex flex-wrap gap-3 items-center">
          {/* Category */}
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-200 px-4 py-2 focus:outline-none focus:border-sky-500 transition"
          >
            <option value="all">All Categories</option>
            <option value="trekking">Trekking</option>
            <option value="tour">Tour</option>
            <option value="wildlife">Wildlife Safari</option>
          </select>

          {/* Duration */}
          <select
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-200 px-4 py-2 focus:outline-none focus:border-sky-500 transition"
          >
            <option value="all">Any Duration</option>
            <option value="short">less than 7 days</option>
            <option value="medium">8 - 14 days</option>
            <option value="long">15 + days</option>
          </select>

          {/* Difficulty */}
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            className="border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-700 dark:text-slate-200 px-4 py-2 focus:outline-none focus:border-sky-500 transition"
          >
            <option value="all">Any Difficulty</option>
            <option value="Easy">Easy</option>
            <option value="Moderate">Moderate</option>
            <option value="Hard">Hard</option>
          </select>

          {/* Reset */}
          {(category !== "all" || duration !== "all" || difficulty !== "all") && (
            <button
              onClick={() => {
                setCategory("all");
                setDuration("all");
                setDifficulty("all");
              }}
              className="text-sm text-sky-500 hover:text-sky-600 transition ml-auto"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* ==================== GRID ==================== */}
      <section className="bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden animate-pulse"
                >
                  <div className="w-full h-56 bg-slate-200 dark:bg-slate-800" />
                  <div className="p-4">
                    <div className="h-5 bg-slate-200 dark:bg-slate-800 w-3/4" />
                    <div className="h-4 bg-slate-200 dark:bg-slate-800 w-1/2 mt-2" />
                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <div className="h-3 bg-slate-200 dark:bg-slate-800 w-10" />
                        <div className="h-7 bg-slate-200 dark:bg-slate-800 w-20 mt-2" />
                      </div>
                      <div className="h-4 bg-slate-200 dark:bg-slate-800 w-12" />
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
                  className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={`http://localhost:8000/storage/${pkg.featured_image}`}
                      alt={pkg.title}
                      className="w-full h-56 object-cover"
                    />
                    {/* Category badge */}
                    {pkg.category && (
                      <span className="absolute top-3 left-3 bg-sky-500 text-white text-xs font-medium px-2 py-1">
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
                    <h2 className="font-semibold text-base text-slate-900 dark:text-white line-clamp-2 leading-snug min-h-11">
                      {pkg.title}
                    </h2>

                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          From
                        </p>
                        <p className="text-xl font-bold text-sky-500">
                          Rs. {pkg.price}
                        </p>
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
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-400">
                No packages found matching your filters.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Package;