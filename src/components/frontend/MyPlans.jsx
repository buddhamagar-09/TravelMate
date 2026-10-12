import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
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

export default function MyPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!token) {
      navigate("/login", { state: { redirectTo: "/my-plans" } });
      return;
    }

    const fetchPlans = async () => {
      setLoading(true);
      try {
        const { data } = await api.get("/plans");
        setPlans(data);
      } catch (error) {
        toast.error("Failed to load your plans.");
        console.log(error.response?.data);
      } finally {
        setLoading(false);
      }
    };

    fetchPlans();
  }, [token, navigate]);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this plan?")) return;

    try {
      await api.delete(`/plans/${id}`);
      setPlans((prev) => prev.filter((p) => p.id !== id));
      toast.success("Plan deleted.");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete plan.");
    }
  };

  return (
    <>
      {/* HEADER */}
      <section className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border-b border-[#DDE7DF] dark:border-[#DDE7DF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#064E3B] mb-3">
            Your Plans
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Saved trip plans
          </h1>
          <p className="mt-4 text-base lg:text-lg text-slate-600 max-w-xl leading-relaxed">
            All your saved preferences in one place. Revisit any plan to see the
            latest matching packages.
          </p>
        </div>
      </section>

      {/* LIST */}
      <section className="bg-[#EEF4EF] dark:bg-[#FFFFFF] py-14 lg:py-16 transition-colors duration-300 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border border-[#DDE7DF] dark:border-[#DDE7DF] p-6 animate-pulse"
                >
                  <div className="h-5 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-2/3 mb-3" />
                  <div className="h-3 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-1/3 mb-6" />
                  <div className="h-4 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-full mb-2" />
                  <div className="h-4 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-5/6" />
                </div>
              ))}
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-20 bg-[#FFFFFF] dark:bg-[#FFFFFF] border border-[#DDE7DF] dark:border-[#DDE7DF]">
              <p className="text-slate-500 dark:text-slate-600">
                No packages available. Try editing your preferences or{" "}
                <Link to="/plan" className="text-[#064E3B] hover:underline">
                  create a new plan
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}




function PlanCard({ plan, onDelete }) {
  const chips = [];

  if (plan.category) chips.push(CATEGORY_LABELS[plan.category] || plan.category);
  if (plan.duration) chips.push(DURATION_LABELS[plan.duration] || plan.duration);
  if (plan.difficulty) chips.push(plan.difficulty);

  const title = plan.title || generateTitle(plan);

  return (
    <div className="group flex flex-col bg-[#FFFFFF] dark:bg-[#FFFFFF] border border-[#DDE7DF] dark:border-[#DDE7DF] p-6 transition-shadow duration-300 hover:shadow-lg hover:shadow-slate-300/40 dark:hover:shadow-black/40">
      {/* Title */}
      <div className="mb-4">
        <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-900 leading-snug truncate">
          {title}
        </h3>
        <p className="text-xs text-slate-400 mt-1">
          Created {new Date(plan.created_at).toLocaleDateString()}
        </p>
      </div>

      {/* Growing section */}
      <div className="flex-1">
        {/* Chips */}
        {chips.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {chips.map((chip, i) => (
              <span
                key={i}
                className="text-xs font-medium px-2 py-1 bg-[#EEF4EF] dark:bg-[#EEF4EF] text-slate-700 dark:text-slate-700"
              >
                {chip}
              </span>
            ))}
          </div>
        )}

        {/* Details */}
        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-600 mb-5">
          {plan.location && (
            <p>
              <span className="text-slate-400">Location:</span> {plan.location}
            </p>
          )}
          {(plan.budget_min != null || plan.budget_max != null) && (
            <p>
              <span className="text-slate-400">Budget:</span>{" "}
              {plan.budget_min != null
                ? `Rs. ${plan.budget_min.toLocaleString()}`
                : "Rs. 0"}{" "}
              –{" "}
              {plan.budget_max != null
                ? `Rs. ${plan.budget_max.toLocaleString()}`
                : "Any"}
            </p>
          )}
          {plan.group_size && (
            <p>
              <span className="text-slate-400">Group size:</span>{" "}
              {plan.group_size}
            </p>
          )}
        </div>
      </div>

      {/* Actions — pinned to bottom */}
      <div className="flex items-center justify-between pt-4 border-t border-[#E4EDE6] dark:border-[#DDE7DF] mt-auto">
        <Link
          to={`/my-plans/${plan.id}`}
          className="text-sm font-semibold text-[#064E3B] hover:text-[#064E3B] transition-colors"
        >
          View matches →
        </Link>

        <button
          onClick={() => onDelete(plan.id)}
          className="text-sm font-medium text-slate-500 hover:text-red-500 transition-colors"
        >
          Delete
        </button>
      </div>
    </div>
  );
}


function generateTitle(plan) {
  const parts = [];

  if (plan.category)
    parts.push(CATEGORY_LABELS[plan.category] || plan.category);
  if (plan.location) parts.push(`in ${plan.location}`);

  if (parts.length === 0) return "Untitled plan";
  return parts.join(" ");
}
