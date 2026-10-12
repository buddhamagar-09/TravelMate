import React from "react";
import api from "../../api/axios";
import { useState, useEffect } from "react";
import { FiSearch, FiTrash2 } from "react-icons/fi";
import SkeletonLoader from "../../components/Hook/SkeletonLoader";
import { toast } from "react-hot-toast";

export default function ViewReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchreviews();
  }, []);

  const fetchreviews = async () => {
    setLoading(true);
    try {
      const response = await api.get("/view-reviews");
      console.log(response.data);
      setReviews(response.data.reviews);
    } catch (error) {
      console.log(error.response?.data);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (id) => {
    if (
      window.confirm(
        "Are you sure you want to change the status of this review?",
      )
    ) {
      try {
        const response = await api.patch(`/reviews/${id}/toggle-status`);
        console.log(response.data);
        toast.success("Review status changed successfully!");
        fetchreviews();
      } catch (error) {
        console.log(error.response?.data);
        toast.error("Failed to change review status. Please try again.");
      }
    }
  };

  return (
    <div className="p-4 md:p-6 bg-[#EEF4EF] min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">View Reviews</h1>

          <p className="text-sm text-slate-600">Manage your reviews.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600 text-lg" />

          <input
            type="text"
            placeholder="Search review..."
            className="w-full rounded-md border border-[#CDD9CF] bg-[#FFFFFF] py-2.5 pl-10 pr-4 text-slate-900 placeholder-slate-500 focus:border-[#065F46] focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}

      {loading ? (
        <SkeletonLoader rows={5} />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-[#DDE7DF] bg-[#FFFFFF]">
          <table className="min-w-full text-sm">
            <thead className="border-b border-[#DDE7DF] bg-[#FFFFFF]">
              <tr className="text-slate-700">
                <th className="px-6 py-4 text-left font-semibold">S.No</th>
                <th className="px-6 py-4 text-left font-semibold">User</th>
                <th className="px-6 py-4 text-left font-semibold">Package</th>
                <th className="px-6 py-4 text-left font-semibold">Rating</th>
                <th className="px-6 py-4 text-left font-semibold">Comment</th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-center font-semibold">Action</th>
              </tr>
            </thead>

            <tbody>
              {reviews.map((review, index) => (
                <tr
                  key={review.id}
                  className="border-b border-[#DDE7DF] hover:bg-[#EEF4EF] transition"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{review.user?.name}</td>
                  <td className="px-6 py-4">{review.package?.title}</td>

                  <td className="px-6 py-4 font-medium text-slate-900">
                    {review.rating} Stars
                  </td>

                  <td className="px-6 py-4 text-slate-700">{review.comment}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center gap-2 border px-3 py-1.5 text-xs font-medium ${
                        review.status === "active"
                          ? "border-[#065F46]/30 bg-[#065F46]/10 text-[#065F46]"
                          : "border-red-500/30 bg-red-500/10 text-red-400"
                      }`}
                    >
                      <span
                        className={`h-1.5 w-1.5 ${
                          review.status === "active"
                            ? "bg-[#065F46]"
                            : "bg-red-400"
                        }`}
                      ></span>

                      {review.status === "active" ? "Active" : "Blocked"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleStatus(review.id)}
                      className={`border px-3 py-1.5 text-xs font-medium transition ${
                        review.status === "active"
                          ? "border-red-500/40 bg-red-500/10 text-red-400 hover:border-red-500 hover:bg-red-500/15 hover:text-red-300"
                          : "border-[#065F46]/40 bg-[#065F46]/10 text-[#065F46] hover:border-[#065F46] hover:bg-[#064E3B]/15 hover:text-[#065F46]"
                      }`}
                    >
                      {review.status === "active" ? "Block" : "Unblock"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
