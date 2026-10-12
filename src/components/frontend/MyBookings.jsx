import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

const MyBookings = () => {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/my-bookings");
      setBookings(response.data.bookings || []);
    } catch (error) {
      // silent
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    try {
      await api.patch(`/bookings/${id}/cancel-booking`);
      toast.success("Booking cancelled successfully!");
      fetchBookings();
    } catch (error) {
      toast.error("Error cancelling booking");
    }
  };

  const handleEsewaPayment = async (bookingId) => {
    setPaying(true);
    try {
      const response = await api.post("/esewa/initiate", {
        booking_id: bookingId,
      });

      const { payment_url, payment_data } = response.data;
      const form = document.createElement("form");
      form.action = payment_url;
      form.method = "POST";

      const fields = [
        "amount",
        "tax_amount",
        "total_amount",
        "transaction_uuid",
        "product_code",
        "product_service_charge",
        "product_delivery_charge",
        "success_url",
        "failure_url",
        "signed_field_names",
        "signature",
      ];

      fields.forEach((field) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = field;
        input.value = payment_data[field];
        form.appendChild(input);
      });

      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.log("Esewa Error:", error);
      console.log("Response:", error.response?.data);
      toast.error(error.response?.data?.message || "Unable to start payment");
    } finally {
      setPaying(false);
    }
  };

  const getBookingStatus = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-50 dark:text-amber-700 dark:border-amber-200";
      case "confirmed":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-50 dark:text-emerald-700 dark:border-emerald-200";
      case "cancelled":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-50 dark:text-red-700 dark:border-red-200";
      case "completed":
        return "bg-[#065F46]/10 text-[#065F46] border-[#065F46]/20 dark:bg-[#065F46]/10 dark:text-[#065F46] dark:border-[#065F46]/20";
      default:
        return "bg-[#EEF4EF] text-slate-700 border-[#DDE7DF] dark:bg-[#EEF4EF] dark:text-slate-700 dark:border-[#CDD9CF]";
    }
  };

  const getPaymentStatus = (status) => {
    switch (status) {
      case "pending":
        return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-50 dark:text-amber-700 dark:border-amber-200";
      case "paid":
        return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-50 dark:text-emerald-700 dark:border-emerald-200";
      case "failed":
        return "bg-red-50 text-red-700 border-red-200 dark:bg-red-50 dark:text-red-700 dark:border-red-200";
      default:
        return "bg-[#EEF4EF] text-slate-700 border-[#DDE7DF] dark:bg-[#EEF4EF] dark:text-slate-700 dark:border-[#CDD9CF]";
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#EEF4EF] dark:bg-[#FFFFFF] py-12 transition-colors">
        <div className="container mx-auto px-5">
          <div className="flex min-h-100 items-center justify-center">
            <p className="text-sm text-slate-500 dark:text-slate-600">
              Loading bookings...
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#EEF4EF] dark:bg-[#FFFFFF] py-12 transition-colors">
      <div className="container mx-auto max-w-6xl px-5">
        {/* Header */}
        <div className="mb-10 border-b border-[#DDE7DF] dark:border-[#DDE7DF] pb-6">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#065F46]">
            TravelMate
          </p>

          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-900">
            My Bookings
          </h1>

          <p className="mt-2 text-slate-500 dark:text-slate-600">
            Keep track of your upcoming and previous trips.
          </p>
        </div>

        {/* No Bookings */}
        {bookings.length === 0 ? (
          <div className="border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#FFFFFF] dark:bg-[#FFFFFF] px-6 py-16 text-center">
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center border border-[#065F46] text-[#065F46]">
              <span className="text-2xl">✈</span>
            </div>

            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-900">
              No bookings yet
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm text-slate-500 dark:text-slate-600">
              You haven't booked a trip yet. Explore our packages and start
              planning your next adventure.
            </p>

            <button
              onClick={() => navigate("/package")}
              className="mt-6 bg-[#065F46] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#064E3B] cursor-pointer"
            >
              Explore Packages
            </button>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#FFFFFF] dark:bg-[#FFFFFF]"
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
                    <div className="flex flex-col gap-3 border-b border-[#E4EDE6] dark:border-[#DDE7DF] px-6 py-5 sm:flex-row sm:items-start sm:justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                          Booking #{booking.id}
                        </p>

                        <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-slate-900">
                          {booking.package?.title}
                        </h2>
                      </div>

                      <span
                        className={`inline-flex w-fit items-center border px-3 py-1 text-xs font-semibold capitalize ${getBookingStatus(
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
                        <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-900">
                          {booking.travel_date}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Travelers
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-900">
                          {booking.travelers}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Total
                        </p>
                        <p className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-900">
                          Rs. {Number(booking.total_price).toLocaleString()}
                        </p>
                      </div>

                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          Payment
                        </p>
                        <span
                          className={`mt-1 inline-flex items-center border px-3 py-1 text-xs font-semibold capitalize ${getPaymentStatus(
                            booking.payment_status,
                          )}`}
                        >
                          {booking.payment_status}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#E4EDE6] dark:border-[#DDE7DF] px-6 py-4">
                      <Link
                        to={`/booking-details/${booking.id}`}
                        className="text-sm font-semibold text-[#065F46] transition-colors hover:text-[#065F46]"
                      >
                        View Booking →
                      </Link>

                      <div className="flex gap-3">
                        {booking.status === "confirmed" &&
                          booking.payment_status === "pending" && (
                            <button
                              onClick={() => handleEsewaPayment(booking.id)}
                              disabled={paying}
                              className="bg-[#065F46] px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#064E3B] disabled:cursor-not-allowed disabled:opacity-60"
                            >
                              {paying ? "Processing..." : "Pay Now"}
                            </button>
                          )}

                        {booking.status === "pending" && (
                          <button
                            onClick={() =>
                              handleCancelBooking(booking.id, "cancelled")
                            }
                            className="border border-[#CDD9CF] dark:border-[#CDD9CF] px-5 py-2.5 text-sm font-semibold text-slate-600 dark:text-slate-700 transition-colors hover:border-red-300 hover:text-red-600 dark:hover:border-red-300 dark:hover:text-red-700"
                          >
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