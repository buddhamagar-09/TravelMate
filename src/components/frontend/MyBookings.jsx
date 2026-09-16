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
      // console.log("Fetched bookings:", response.data.bookings);

      setBookings(response.data.bookings || []);
    } catch (error) {
      // console.error("Error fetching bookings:", error);
      // toast.error("Error fetching bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleCancelBooking = async (id) => {
    try {
      const response = await api.patch(`/bookings/${id}/cancel-booking`);
      // console.log("Booking cancelled:", response.data);
      toast.success("Booking cancelled successfully!");
      fetchBookings(); // Refresh bookings after cancellation
    } catch (error) {
      // console.error("Error cancelling booking:", error);
      toast.error("Error cancelling booking");
    }
  };
  //handle Esewa Payment
  const handleEsewaPayment = async (bookingId) => {
    setPaying(true);
    try {
      const response = await api.post("/esewa/initiate", {
        booking_id: bookingId,
      });

      const { payment_url, payment_data } = response.data;
      // console.log("Full Response:", response.data);
      // console.log("Payment URL:", payment_url);
      // console.log("Payment Data:", JSON.stringify(payment_data, null, 2));
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
          <div className="flex min-h-100 items-center justify-center">
            {/* <div className="h-20 w-20 border-4 border-slate-300 border-t-slate-600 rounded-full animate-spin"></div> */}
            <p className="text-gray-600">Loading bookings...</p>
          </div>
        </div>
      </section>
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

            <button
              onClick={() => navigate("/package")}
              className="mt-6 bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 cursor-pointer"
            >
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
                      <Link
                        to={`/booking-details/${booking.id}`}
                        className="text-sm font-semibold text-blue-600 transition hover:text-blue-800"
                      >
                        View Booking →
                      </Link>

                      <div className="flex gap-3">
                        {booking.status === "confirmed" &&
                          booking.payment_status === "pending" && (
                            <button
                              onClick={() => handleEsewaPayment(booking.id)}
                              disabled={paying}
                              className="bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                            >
                              {paying ? "Processing..." : "Pay Now"}
                            </button>
                          )}

                        {booking.status === "pending" && (
                          <button
                            onClick={() =>
                              handleCancelBooking(booking.id, "cancelled")
                            }
                            className="border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:border-red-300 hover:text-red-600"
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
