import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [paying, setPaying] = useState(false);

  const fetchBooking = async () => {
    try {
      const response = await api.get(`/booking-details/${id}`);
      setBooking(response.data.bookingDetails || null);
    } catch (error) {
      toast.error("Error fetching booking details");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const handleCancelBooking = async (id) => {
    try {
      await api.patch(`/bookings/${id}/cancel-booking`);
      toast.success("Booking cancelled successfully!");
      fetchBooking();
    } catch (error) {
      toast.error("Error cancelling booking");
    }
  };

  const handlePayNow = async (id) => {
    setPaying(true);
    try {
      const response = await api.post("/esewa/initiate", {
        booking_id: id,
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
        return "bg-[#064E3B]/10 text-[#064E3B] border-[#064E3B]/20 dark:bg-[#064E3B]/10 dark:text-[#064E3B] dark:border-[#064E3B]/20";
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
          <div className="flex min-h-[400px] items-center justify-center">
            <p className="text-sm text-slate-500 dark:text-slate-600">
              Loading booking details...
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (!booking) {
    return (
      <section className="min-h-screen bg-[#EEF4EF] dark:bg-[#FFFFFF] py-12 transition-colors">
        <div className="container mx-auto max-w-4xl px-5">
          <div className="border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#FFFFFF] dark:bg-[#FFFFFF] p-10 text-center">
            <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-900">
              Booking not found
            </h2>

            <p className="mt-2 text-sm text-slate-500 dark:text-slate-600">
              We couldn't find the booking you're looking for.
            </p>

            <button
              onClick={() => navigate("/my-bookings")}
              className="mt-6 bg-[#064E3B] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#04382A]"
            >
              Back to My Bookings
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#EEF4EF] dark:bg-[#FFFFFF] py-12 transition-colors">
      <div className="container mx-auto max-w-5xl px-5">
        {/* Back Button */}
        <button
          onClick={() => navigate("/my-bookings")}
          className="mb-6 text-sm font-semibold text-[#064E3B] transition-colors hover:text-[#064E3B]"
        >
          ← Back to My Bookings
        </button>

        {/* Header */}
        <div className="mb-6 border-b border-[#DDE7DF] dark:border-[#DDE7DF] pb-6">
          <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
            Booking #{booking.id}
          </p>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-900">
              {booking.package?.title}
            </h1>

            <span
              className={`inline-flex w-fit items-center border px-4 py-2 text-sm font-semibold capitalize ${getBookingStatus(
                booking.status,
              )}`}
            >
              {booking.status}
            </span>
          </div>
        </div>

        {/* Package */}
        <div className="border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#FFFFFF] dark:bg-[#FFFFFF]">
          <div className="flex flex-col md:flex-row">
            {/* Package Image */}
            <div className="h-64 w-full md:h-auto md:w-80 shrink-0">
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
              <p className="text-xs font-medium uppercase tracking-widest text-slate-400">
                Travel Package
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-900 dark:text-slate-900">
                {booking.package?.title}
              </h2>

              {booking.package?.location && (
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-600">
                  📍 {booking.package.location}
                </p>
              )}

              <div className="mt-6">
                <button
                  onClick={() => navigate(`/package/${booking.package?.id}`)}
                  className="border border-[#064E3B] px-5 py-2.5 text-sm font-semibold text-[#064E3B] transition-colors hover:bg-[#04382A] hover:text-white"
                >
                  View Package
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Trip Details */}
        <SectionCard title="Trip Details">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Travel Date
              </p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-slate-900">
                {booking.travel_date}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Travelers
              </p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-slate-900">
                {booking.travelers}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Total Price
              </p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-slate-900">
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
        </SectionCard>

        {/* Customer Information */}
        <SectionCard title="Customer Information">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Full Name
              </p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-slate-900">
                {booking.user.name}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Email
              </p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-slate-900">
                {booking.user.email}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                Phone
              </p>
              <p className="mt-1 font-semibold text-slate-800 dark:text-slate-900">
                {booking.phone_number}
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Special Request */}
        {booking.special_request && (
          <SectionCard title="Special Request">
            <p className="text-sm leading-6 text-slate-600 dark:text-slate-700">
              {booking.special_request}
            </p>
          </SectionCard>
        )}

        {/* Actions */}
        <div className="mt-6 flex flex-wrap justify-end gap-3">
          {booking.status === "confirmed" &&
            booking.payment_status === "pending" && (
              <button
                onClick={() => handlePayNow(booking.id)}
                disabled={paying}
                className="bg-[#064E3B] px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#04382A] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {paying ? "Processing Payment..." : "Pay Now"}
              </button>
            )}

          {booking.status === "pending" && (
            <button
              onClick={() => handleCancelBooking(booking.id)}
              className="border border-red-300 dark:border-red-300 px-7 py-3 text-sm font-semibold text-red-600 dark:text-red-700 transition-colors hover:bg-red-50 dark:hover:bg-red-50"
            >
              Cancel Booking
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

/* ---------- Subcomponents ---------- */

function SectionCard({ title, children }) {
  return (
    <div className="mt-6 border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#FFFFFF] dark:bg-[#FFFFFF]">
      <div className="border-b border-[#E4EDE6] dark:border-[#DDE7DF] px-6 py-5">
        <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-900">
          {title}
        </h2>
      </div>
      <div className="px-6 py-6">{children}</div>
    </div>
  );
}

export default BookingDetails;