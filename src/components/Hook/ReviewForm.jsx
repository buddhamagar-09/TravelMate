import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import api from "../../api/axios";
import { toast } from "react-hot-toast";
import {useNavigate} from "react-router-dom";

function ReviewForm({ packageId }) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if(!token)
    {
      navigate("/login",{
        state:{
          redirectTo: `/package/${packageId}`,
        }
      });
      return;
    }

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
      toast.error(error.response?.data?.message);
      console.log("Error submitting review:", error.response?.data);
    }
  };

  return (
    <section className="mt-12 px-5">
      <div className="max-w-7xl mx-auto border-t border-gray-200 pt-10 pb-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Leave a Review
          </h2>

          <p className="text-gray-500 mb-7">
            Share your experience with this package.
          </p>

          <form onSubmit={handleSubmitReview} className="text-left">
            {/* Rating */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <FaStar
                    size={30}
                    className={
                      star <= rating ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                </button>
              ))}
            </div>

            {/* Comment */}
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write your review..."
              rows="5"
              className="w-full border border-gray-200 rounded-xl p-4 text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none shadow-sm"
            />

            {/* Submit */}
            <div className="flex justify-center mt-5">
              <button
                type="submit"
                disabled={rating === 0}
                className="px-7 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Submit Review
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ReviewForm;
