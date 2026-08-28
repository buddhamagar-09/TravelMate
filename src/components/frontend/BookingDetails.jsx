import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBooking = async () => {
    try {
      const response = await api.get(`/booking-details/${id}`);
      // console.log("Fetched booking:", response.data.bookingDetails);

      setBooking(response.data.bookingDetails || null);
    } catch (error) {
      // console.error("Error fetching booking:", error);
      toast.error("Error fetching booking details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  // handle cancel booking
  const handleCancelBooking = async (id) => {
    try {
      const response = await api.patch(`/bookings/${id}/cancel-booking`);
      toast.success("Booking cancelled successfully!");
      fetchBooking(); // Refresh booking details after cancellation
    }
    catch (error) {
      toast.error("Error cancelling booking");
  }
};

  const getBookingStatus = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "confirmed":
        return "bg-green-100 text-green-700";

      case "cancelled":
        return "bg-red-100 text-red-700";

      case "completed":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPaymentStatus = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "paid":
        return "bg-green-100 text-green-700";

      case "failed":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto px-5">
          <div className="flex min-h-[400px] items-center justify-center">
         {/* <div className="h-20 w-20 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div> */}
          <p className="text-gray-600">Loading booking details...</p>
          </div>
        </div>
      </section>
    );
  }

  if (!booking) {
    return (
      <section className="min-h-screen bg-slate-50 py-12">
        <div className="container mx-auto max-w-4xl px-5">
          <div className="border border-slate-200 bg-white p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-800">
              Booking not found
            </h2>

            <p className="mt-2 text-sm text-slate-500">
              We couldn't find the booking you're looking for.
            </p>

            <button
              onClick={() => navigate("/my-bookings")}
              className="mt-6 bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              Back to My Bookings
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto max-w-5xl px-5">

        {/* Back Button */}
        <button
          onClick={() => navigate("/my-bookings")}
          className="mb-6 text-sm font-semibold text-blue-600 transition hover:text-blue-800"
        >
          ← Back to My Bookings
        </button>

        {/* Header */}
        <div className="mb-6 border-b border-slate-200 pb-6">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
            Booking #{booking.id}
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold text-slate-900">
              {booking.package?.title}
            </h1>

            <span
              className={`w-fit px-4 py-2 text-sm font-semibold capitalize ${getBookingStatus(
                booking.status
              )}`}
            >
              {booking.status}
            </span>
          </div>
        </div>

        {/* Package */}
        <div className="border border-slate-200 bg-white">

          <div className="flex flex-col md:flex-row">

            {/* Package Image */}
            <div className="h-64 w-full md:h-auto md:w-80">
              <img
                src={
                  booking.package?.featured_image
                    ? `http://127.0.0.1:8000/storage/${booking.package.featured_image}`
                    : "/placeholder.jpg"
                }
                alt={booking.package?.title}
                className="h-full w-full object-cover"
              />
            </div>

            {/* Package Info */}
            <div className="flex-1 p-6">
              <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                Travel Package
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900">
                {booking.package?.title}
              </h2>

              {booking.package?.location && (
                <p className="mt-2 text-sm text-slate-500">
                  📍 {booking.package.location}
                </p>
              )}

              <div className="mt-6">
                <button
                  onClick={() =>
                    navigate(`/package/${booking.package?.id}`)
                  }
                  className="border border-blue-600 px-5 py-2.5 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
                >
                  View Package
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <div className="mt-6 border border-slate-200 bg-white">

          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-lg font-bold text-slate-900">
              Trip Details
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 px-6 py-6 sm:grid-cols-2 lg:grid-cols-4">

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Travel Date
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {booking.travel_date}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Travelers
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {booking.travelers}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Total Price
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                Rs. {Number(booking.total_price).toLocaleString()}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Payment
              </p>

              <span
                className={`mt-1 inline-block px-3 py-1 text-xs font-semibold capitalize ${getPaymentStatus(
                  booking.payment_status
                )}`}
              >
                {booking.payment_status}
              </span>
            </div>

          </div>
        </div>

        {/* Customer Information */}
        <div className="mt-6 border border-slate-200 bg-white">

          <div className="border-b border-slate-100 px-6 py-5">
            <h2 className="text-lg font-bold text-slate-900">
              Customer Information
            </h2>
          </div>

          <div className="grid grid-cols-1 gap-6 px-6 py-6 sm:grid-cols-3">

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Full Name
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {booking.user.name}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Email
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {booking.user.email}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Phone
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {booking.phone_number}
              </p>
            </div>

          </div>
        </div>

        {/* Special Request */}
        {booking.special_request && (
          <div className="mt-6 border border-slate-200 bg-white">

            <div className="border-b border-slate-100 px-6 py-5">
              <h2 className="text-lg font-bold text-slate-900">
                Special Request
              </h2>
            </div>

            <div className="px-6 py-6">
              <p className="text-sm leading-6 text-slate-600">
                {booking.special_request}
              </p>
            </div>

          </div>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-wrap justify-end gap-3">

          {booking.status === "confirmed" &&
            booking.payment_status === "pending" && (
              <button
                className="bg-blue-600 px-7 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Pay Now
              </button>
            )}

          {booking.status === "pending" && (
            <button 
              onClick={() => handleCancelBooking(booking.id)}
              className="border border-red-300 px-7 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Cancel Booking
            </button>
          )}

        </div>

      </div>
    </section>
    
  );
};

export default BookingDetails;