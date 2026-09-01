import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";

const EsewaSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  return (
    <section className="min-h-screen bg-slate-50 flex items-center justify-center px-5">
      <div className="w-full max-w-lg bg-white border border-slate-200 p-8 text-center shadow-sm">

        <FaCheckCircle className="mx-auto text-6xl text-green-500 mb-5" />

        <h1 className="text-3xl font-bold text-slate-900">
          Payment Successful!
        </h1>

        <p className="mt-3 text-slate-500">
          Your payment has been successfully completed.
        </p>

        {bookingId && (
          <p className="mt-4 text-sm text-slate-600">
            Booking ID:{" "}
            <span className="font-semibold text-slate-900">
              #{bookingId}
            </span>
          </p>
        )}

        <div className="mt-8 flex justify-center gap-3">
          <Link
            to="/my-bookings"
            className="bg-blue-600 px-6 py-3 text-sm font-semibold text-white hover:bg-blue-700 transition"
          >
            View My Bookings
          </Link>

          <Link
            to="/package"
            className="border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition"
          >
            Explore Packages
          </Link>
        </div>

      </div>
    </section>
  );
};

export default EsewaSuccessPage;

