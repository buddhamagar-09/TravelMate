import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../../api/axios";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/my-bookings");
      console.log("Fetched bookings:", response.data.bookings);

      setBookings(response.data.bookings || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

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
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading your bookings...</p>
      </div>
    );
  }

  return (
    <section className="min-h-screen bg-slate-50 py-12">
      <div className="container mx-auto max-w-6xl px-5">
        {/* Header */}
        <div className="mb-10 border-b border-slate-200 pb-6">
          <p className="mb-2 text-sm font-medium uppercase tracking-wide text-blue-600">
            TravelMate
          </p>

          <h1 className="text-3xl font-bold text-slate-900">My Bookings</h1>

          <p className="mt-2 text-slate-500">
            Keep track of your upcoming and previous trips.
          </p>
        </div>

        {/* No Bookings */}
        {bookings.length === 0 ? (
          <div className="border border-slate-200 bg-white px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
              <span className="text-2xl text-blue-600">✈</span>
            </div>

            <h2 className="text-xl font-semibold text-slate-800">
              No bookings yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">
              You haven't booked a trip yet. Explore our packages and start
              planning your next adventure.
            </p>

            <button className="mt-6 bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700">
              Explore Packages
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-slate-200 bg-white transition hover:border-slate-300"
              >
                {/* Top Section */}
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="h-56 w-full shrink-0 md:h-auto md:w-64">
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

                  {/* Main Content */}
                  <div className="flex-1">
                    {/* Package Header */}
                    <div className="flex flex-col gap-3 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                          Booking #{booking.id}
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-slate-900">
                          {booking.package?.title}
                        </h2>
                      </div>

                      <span
                        className={`w-fit px-3 py-1 text-xs font-semibold capitalize ${getBookingStatus(
                          booking.status,
                        )}`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    {/* Booking Details */}
                    <div className="grid grid-cols-2 gap-y-5 px-6 py-5 sm:grid-cols-4">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Travel Date
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {booking.travel_date}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Travelers
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          {booking.travelers}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Total
                        </p>

                        <p className="mt-1 text-sm font-semibold text-slate-800">
                          Rs. {Number(booking.total_price).toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Payment
                        </p>

                        <span
                          className={`mt-1 inline-block px-3 py-1 text-xs font-semibold capitalize ${getPaymentStatus(
                            booking.payment_status,
                          )}`}
                        >
                          {booking.payment_status}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 px-6 py-4">
                      <Link to={`/booking-details/${booking.id}`} className="text-sm font-semibold text-blue-600 transition hover:text-blue-800">
                        View Booking →
                      </Link>

                      <div className="flex gap-3">
                        {booking.status === "confirmed" &&
                          booking.payment_status === "pending" && (
                            <button className="bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700">
                              Pay Now
                            </button>
                          )}

                        {booking.status === "pending" && (
                          <button className="border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-300 hover:text-red-600">
                            Cancel
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBookings;
