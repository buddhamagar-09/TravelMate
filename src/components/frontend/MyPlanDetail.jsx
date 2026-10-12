import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import useFetchPackages from "../Hook/FetchPackages";
import { calculateMatchScore } from "../../utils/matchScore.js";
import PlanResultCard from "./PlanResultCard";
import { toast } from "react-hot-toast";

const CATEGORY_LABELS = {
  trekking: "Trekking",
  tour: "Tour",
  wildlife: "Wildlife",
};

const DURATION_LABELS = {
  short: "≤ 7 days",
  medium: "8 – 14 days",
  long: "15+ days",
};

export default function MyPlanDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const { packages, fetchPackages, loading: packagesLoading } =
    useFetchPackages();

  const [plan, setPlan] = useState(null);
  const [planLoading, setPlanLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login", { state: { redirectTo: `/my-plans/${id}` } });
      return;
    }

    const fetchPlan = async () => {
      setPlanLoading(true);
      try {
        const { data } = await api.get(`/plans/${id}`);
        setPlan(data);
      } catch (error) {
        toast.error("Plan not found.");
        navigate("/my-plans");
      } finally {
        setPlanLoading(false);
      }
    };

    fetchPlan();
    fetchPackages();
  }, [id, token, navigate]);

  const rankedPackages = useMemo(() => {
    if (!plan) return [];
    return packages
      .map((pkg) => ({
        ...pkg,
        matchScore: calculateMatchScore(plan, pkg),
      }))
      .sort((a, b) => b.matchScore - a.matchScore);
  }, [packages, plan]);

  const handleDelete = async () => {
    if (!window.confirm("Delete this plan?")) return;

    try {
      await api.delete(`/plans/${id}`);
      toast.success("Plan deleted.");
      navigate("/my-plans");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete plan.");
    }
  };

  if (planLoading) {
    return (
      <section className="bg-[#EEF4EF] dark:bg-[#FFFFFF] py-20 min-h-[60vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="h-8 w-64 bg-[#DCE7DE] dark:bg-[#EEF4EF] animate-pulse mb-4" />
          <div className="h-4 w-96 bg-[#DCE7DE] dark:bg-[#EEF4EF] animate-pulse" />
        </div>
      </section>
    );
  }

  if (!plan) return null;

  const title = plan.title || generateTitle(plan);
  const chips = [];
  if (plan.category) chips.push(CATEGORY_LABELS[plan.category] || plan.category);
  if (plan.duration) chips.push(DURATION_LABELS[plan.duration] || plan.duration);
  if (plan.difficulty) chips.push(plan.difficulty);

  return (
    <>
      {/* HEADER */}
      <section className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border-b border-[#DDE7DF] dark:border-[#DDE7DF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-14 lg:py-16">
          <Link
            to="/my-plans"
            className="text-sm font-medium text-[#064E3B] hover:text-[#064E3B] transition-colors"
          >
            ← Back to my plans
          </Link>

          <h1 className="mt-4 text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            {title}
          </h1>

          <p className="mt-3 text-sm text-slate-500">
            Created {new Date(plan.created_at).toLocaleDateString()}
          </p>

          {/* Chips */}
          {chips.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2">
              {chips.map((chip, i) => (
                <span
                  key={i}
                  className="text-xs font-medium px-2.5 py-1 bg-[#064E3B]/10 text-[#064E3B]"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}

          {/* Details */}
          <div className="mt-5 flex flex-wrap gap-x-8 gap-y-2 text-sm text-slate-600">
            {plan.location && (
              <span>
                <span className="text-slate-500">Location:</span>{" "}
                {plan.location}
              </span>
            )}
            {(plan.budget_min != null || plan.budget_max != null) && (
              <span>
                <span className="text-slate-500">Budget:</span>{" "}
                {plan.budget_min != null
                  ? `Rs. ${plan.budget_min.toLocaleString()}`
                  : "Rs. 0"}{" "}
                –{" "}
                {plan.budget_max != null
                  ? `Rs. ${plan.budget_max.toLocaleString()}`
                  : "Any"}
              </span>
            )}
            {plan.group_size && (
              <span>
                <span className="text-slate-500">Group size:</span>{" "}
                {plan.group_size}
              </span>
            )}
          </div>
        </div>
      </section>

      {/* RESULTS */}
      <section className="bg-[#EEF4EF] dark:bg-[#FFFFFF] py-14 lg:py-16 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-sm font-semibold uppercase tracking-widest text-[#064E3B] mb-2">
                Matches
              </p>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-900">
                {rankedPackages.length}{" "}
                {rankedPackages.length === 1 ? "package" : "packages"} ranked
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-600 mt-1">
                Sorted by how well each package fits this plan.
              </p>
            </div>

            <button
              onClick={handleDelete}
              className="text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
            >
              Delete this plan
            </button>
          </div>

          {packagesLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border border-[#DDE7DF] dark:border-[#DDE7DF] h-80 animate-pulse"
                />
              ))}
            </div>
          ) : rankedPackages.length === 0 ? (
            <div className="text-center py-16 bg-[#FFFFFF] dark:bg-[#FFFFFF] border border-[#DDE7DF] dark:border-[#DDE7DF]">
              <p className="text-slate-500 dark:text-slate-600">
                No packages available.
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
    </>
  );
}

function generateTitle(plan) {
  const parts = [];
  if (plan.category) parts.push(CATEGORY_LABELS[plan.category] || plan.category);
  if (plan.location) parts.push(`in ${plan.location}`);
  if (parts.length === 0) return "Untitled plan";
  return parts.join(" ");
}