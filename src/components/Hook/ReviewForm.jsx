import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function ReviewForm({ packageId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!token) {
      navigate("/login", {
        state: {
          redirectTo: `/package/${packageId}`,
        },
      });
      return;
    }

    if (rating === 0) return;

    setSubmitting(true);
    try {
      const response = await api.post(`/reviews`, {
        package_id: packageId,
        rating,
        comment,
      });
      setRating(0);
      setComment("");
      toast.success(response.data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to submit review.",
      );
      console.log("Error submitting review:", error.response?.data);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#FFFFFF] dark:bg-[#FFFFFF] p-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-900 mb-2">
          Leave a Review
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-600">
          Share your experience with this package.
        </p>
      </div>

      <form onSubmit={handleSubmitReview}>
        {/* Rating */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Your Rating
          </p>

          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                className="focus:outline-none transition-transform hover:scale-110"
              >
                <FaStar
                  size={28}
                  className={
                    star <= rating
                      ? "text-amber-400"
                      : "text-slate-300 dark:text-slate-700"
                  }
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment */}
        <div className="mb-5">
          <label className="block text-xs font-semibold uppercase tracking-widest text-slate-400 mb-3">
            Your Review
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Tell us about your experience..."
            rows="5"
            className="w-full border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#FFFFFF] dark:bg-[#FFFFFF] p-4 text-sm text-slate-700 dark:text-slate-800 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:border-[#065F46] transition resize-none"
          />
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={rating === 0 || submitting}
          className="w-full bg-[#065F46] py-4 text-white font-semibold transition-colors hover:bg-[#064E3B] disabled:bg-[#DCE7DE] dark:disabled:bg-[#DCE7DE] disabled:cursor-not-allowed"
        >
          {submitting ? "Posting..." : "Post Review"}
        </button>
      </form>
    </div>
  );
}

export default ReviewForm;