import React from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaCheckCircle,
  FaArrowLeft,
  FaSuitcase,
} from "react-icons/fa";

const EsewaSuccessPage = () => {
  const { bookingId } = useParams();

  return (
    <section className="min-h-screen bg-[#f5f7fa] px-5 py-12 flex items-center justify-center">

      <div className="w-full max-w-2xl">

        {/* Back Link */}
        <Link
          to="/my-bookings"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-blue-600"
        >
          <FaArrowLeft />
          Back to My Bookings
        </Link>

        <div className="overflow-hidden bg-white shadow-sm border border-slate-200">

          {/* Header */}
          <div className="border-b border-slate-100 px-8 py-7">

            <div className="flex items-start gap-5">

              {/* Success Icon */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-green-50">
                <FaCheckCircle className="text-3xl text-green-500" />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-green-600">
                  Payment Successful
                </p>

                <h1 className="mt-1 text-3xl font-bold text-slate-900">
                  Your payment was completed
                </h1>

                <p className="mt-2 text-sm leading-relaxed text-slate-500">
                  Your payment has been successfully verified. Your booking
                  is now confirmed and ready for your upcoming journey.
                </p>
              </div>

            </div>

          </div>

          {/* Details */}
          <div className="px-8 py-7">

            {bookingId && (
              <div className="flex items-center justify-between border-b border-slate-100 pb-5">

                <span className="text-sm text-slate-500">
                  Booking ID
                </span>

                <span className="font-semibold text-slate-900">
                  #{bookingId}
                </span>

              </div>
            )}

            <div className="flex items-center justify-between pt-5">

              <span className="text-sm text-slate-500">
                Payment Status
              </span>

              <span className="bg-green-50 px-3 py-1 text-xs font-semibold text-green-600">
                PAID
              </span>

            </div>

          </div>

          {/* Actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50 px-8 py-6 sm:flex-row sm:justify-end">

            <Link
              to="/package"
              className="px-5 py-3 text-center text-sm font-semibold text-slate-600 transition hover:text-slate-900"
            >
              Explore Packages
            </Link>

            <Link
              to="/my-bookings"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              <FaSuitcase />
              View My Bookings
            </Link>

          </div>

        </div>

      </div>

    </section>
  );
};

export default EsewaSuccessPage;