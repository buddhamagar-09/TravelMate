import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetchPackages from "../Hook/FetchPackages";
import { calculateMatchScore } from "../../utils/matchScore.js";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import PlanResultCard from "./PlanResultCard.jsx";


export default function Plan() {
  const { packages, fetchPackages, loading } = useFetchPackages();

  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [budgetMin, setBudgetMin] = useState("");
  const [budgetMax, setBudgetMax] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [groupSize, setGroupSize] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [planTitle, setPlanTitle] = useState("");
  const [saving, setSaving] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPackages();
  }, []);

  const currentPlan = useMemo(
    () => ({
      category: category || null,
      location: location.trim() || null,
      budget_min: budgetMin ? Number(budgetMin) : null,
      budget_max: budgetMax ? Number(budgetMax) : null,
      duration: duration || null,
      difficulty: difficulty || null,
      group_size: groupSize ? Number(groupSize) : null,
    }),
    [category, location, budgetMin, budgetMax, duration, difficulty, groupSize],
  );

  const hasAnyPreference = useMemo(
    () => Object.values(currentPlan).some((v) => v !== null),
    [currentPlan],
  );

  const rankedPackages = useMemo(() => {
    if (!submitted || !hasAnyPreference) return [];
    return packages
      .map((pkg) => ({
        ...pkg,
        matchScore: calculateMatchScore(currentPlan, pkg),
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [packages, currentPlan, submitted, hasAnyPreference]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasAnyPreference) return;
    setSubmitted(true);
  };

  const handleSavePlan = async () => {
    if (!hasAnyPreference) {
      toast.error("Set at least one preference before saving.");
      return;
    }

    if (!token) {
      toast.error("Please log in to save your plan.");
      navigate("/login", { state: { redirectTo: "/plan" } });
      return;
    }

    setSaving(true);
    try {
      await api.post("/plans", {
        title: planTitle.trim() || null,
        ...currentPlan,
      });
      toast.success("Plan saved!");
      navigate("/my-plans");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to save plan.");
      console.log(error.response?.data);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = () => {
    setCategory("");
    setLocation("");
    setBudgetMin("");
    setBudgetMax("");
    setDuration("");
    setDifficulty("");
    setGroupSize("");
    setPlanTitle("");
    setSubmitted(false);
  };

  const inputClass =
    "w-full border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 px-4 py-2.5 text-sm text-slate-800 dark:text-white placeholder-slate-400 focus:outline-none focus:border-sky-500 transition-colors";

  const labelClass =
    "block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-2";

  return (
    <>
      {/* HEADER */}
      <section className="bg-slate-900 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-sky-400 mb-3">
            Personalized Planning
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Find your perfect trip
          </h1>
          <p className="mt-4 text-base lg:text-lg text-slate-300 max-w-xl leading-relaxed">
            Tell us what you're looking for, and we'll match you with the best
            packages across Nepal.
          </p>
        </div>
      </section>

      {/* FORM */}
      <section className="bg-white dark:bg-slate-950 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 lg:py-14">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              <div>
                <label className={labelClass}>Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Any category</option>
                  <option value="trekking">Trekking</option>
                  <option value="tour">Tour</option>
                  <option value="wildlife">Wildlife Safari</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Location</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Khumbu, Pokhara, Chitwan"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Any duration</option>
                  <option value="short">Short (≤ 7 days)</option>
                  <option value="medium">Medium (8 – 14 days)</option>
                  <option value="long">Long (15+ days)</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Budget (min)</label>
                <input
                  type="number"
                  min="0"
                  value={budgetMin}
                  onChange={(e) => setBudgetMin(e.target.value)}
                  placeholder="Rs. 0"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Budget (max)</label>
                <input
                  type="number"
                  min="0"
                  value={budgetMax}
                  onChange={(e) => setBudgetMax(e.target.value)}
                  placeholder="Rs. 500000"
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Difficulty</label>
                <select
                  value={difficulty}
                  onChange={(e) => setDifficulty(e.target.value)}
                  className={inputClass}
                >
                  <option value="">Any difficulty</option>
                  <option value="Easy">Easy</option>
                  <option value="Moderate">Moderate</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className={labelClass}>Group Size</label>
                <input
                  type="number"
                  min="1"
                  value={groupSize}
                  onChange={(e) => setGroupSize(e.target.value)}
                  placeholder="e.g. 6"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="submit"
                className="bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
              >
                Find matches
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 text-sm font-medium text-slate-600 dark:text-slate-300 border border-slate-300 dark:border-slate-700 hover:border-slate-400 dark:hover:border-slate-600 transition-colors"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* RESULTS */}
      {submitted && (
        <section className="bg-slate-50 dark:bg-slate-900 py-14 lg:py-16 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-500 mb-2">
                Results
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                {rankedPackages.length}{" "}
                {rankedPackages.length === 1 ? "match" : "matches"} found
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Ranked by how well they fit your preferences.
              </p>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div
                    key={i}
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
            ) : rankedPackages.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <p className="text-slate-500 dark:text-slate-400">
                  No packages to show yet.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
                {rankedPackages.map((pkg) => (
                  <PlanResultCard key={pkg.id} pkg={pkg} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* SAVE PLAN */}
      {submitted && hasAnyPreference && (
        <section className="bg-white dark:bg-slate-950 py-14 lg:py-16 transition-colors duration-300 border-t border-slate-200 dark:border-slate-800">
          <div className="max-w-5xl mx-auto px-6 lg:px-8">
            <div className="border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 overflow-hidden">
              <div className="grid md:grid-cols-5">
                {/* LEFT — context */}
                <div className="md:col-span-2 p-8 lg:p-10 border-b md:border-b-0 md:border-r border-slate-200 dark:border-slate-800">
                  <p className="text-xs font-semibold uppercase tracking-widest text-sky-500 mb-3">
                    Save Plan
                  </p>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white leading-snug mb-3">
                    Keep these matches for later
                  </h3>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
                    Save your preferences and revisit this list any time from
                    your account.
                  </p>

                  <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                    <SaveBullet text="Revisit matches whenever you like" />
                    <SaveBullet text="See how new packages score against your plan" />
                    <SaveBullet text="Compare multiple trips side by side" />
                  </ul>
                </div>

                {/* RIGHT — form */}
                <div className="md:col-span-3 p-8 lg:p-10 bg-white dark:bg-slate-950">
                  <label className={labelClass}>Plan name (optional)</label>
                  <input
                    type="text"
                    value={planTitle}
                    onChange={(e) => setPlanTitle(e.target.value)}
                    placeholder="e.g. Summer Trek 2026"
                    className={inputClass}
                  />

                  <p className="mt-3 text-xs text-slate-500 dark:text-slate-500">
                    Leave blank and we'll name it after your preferences.
                  </p>

                  <div className="mt-6">
                    <button
                      type="button"
                      onClick={handleSavePlan}
                      disabled={saving}
                      className="w-full bg-sky-500 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-sky-600 disabled:bg-slate-300 dark:disabled:bg-slate-700 disabled:cursor-not-allowed"
                    >
                      {saving ? "Saving..." : "Save Plan"}
                    </button>

                    <p className="mt-3 text-center text-xs text-slate-400 dark:text-slate-500">
                      Secure · Free · One click
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

/* ---------- Subcomponent ---------- */


function SaveBullet({ text }) {
  return (
    <li className="flex items-start gap-3">
      <span className="text-sky-500 font-semibold shrink-0 mt-0.5">✓</span>
      <span className="leading-relaxed">{text}</span>
    </li>
  );
}
