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
    <div className="p-4 md:p-6 bg-slate-950 min-h-screen">
      {/* Header */}
      <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">View Reviews</h1>

          <p className="text-sm text-slate-400">Manage your reviews.</p>
        </div>

        {/* Search */}
        <div className="relative w-full md:w-80">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 text-lg" />

          <input
            type="text"
            placeholder="Search review..."
            className="w-full rounded-md border border-slate-700 bg-slate-900 py-2.5 pl-10 pr-4 text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
          />
        </div>
      </div>

      {/* Table */}

      {loading ? (
        <SkeletonLoader rows={5} />
      ) : (
        <div className="overflow-x-auto rounded-lg border border-slate-800 bg-slate-900">
          <table className="min-w-full text-sm">
            <thead className="border-b border-slate-800 bg-slate-950">
              <tr className="text-slate-300">
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
                  className="border-b border-slate-800 hover:bg-slate-800 transition"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">{review.user?.name}</td>
                  <td className="px-6 py-4">{review.package?.title}</td>

                  <td className="px-6 py-4 font-medium text-white">
                    {review.rating} Stars
                  </td>

                  <td className="px-6 py-4 text-slate-300">{review.comment}</td>
                  <td
                    className={`px-6 py-4 font-medium ${
                      review.status === "active" ? "text-blue-500" : "text-red-500"
                    }`}
                  >
                    {review.status}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <button
                      onClick={() => toggleStatus(review.id)}
                      className={`px-4 py-2 rounded-lg text-white ${
                        review.status === "active"
                          ? "bg-red-600 hover:bg-red-700"
                          : "bg-blue-600 hover:bg-blue-700"
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
