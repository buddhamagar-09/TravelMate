import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaSuitcase, FaCompass } from "react-icons/fa";

const EsewaSuccessPage = () => {
  const { bookingId } = useParams();

  return (
    <section className="bg-[#F8E7C9] dark:bg-[#F8E7C9] min-h-screen py-16 lg:py-24 transition-colors duration-300">
      <div className="max-w-xl mx-auto px-6 lg:px-8">
        {/* Back link */}
        <Link
          to="/my-bookings"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-600 hover:text-[#064E3B] transition-colors mb-12"
        >
          <FaArrowLeft className="text-xs" />
          Back to my bookings
        </Link>

        {/* Success mark */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 grid place-items-center rounded-full bg-emerald-500 text-white mb-6 shadow-lg shadow-emerald-500/30">
            <FaCheck className="text-3xl" />
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400 mb-4">
            Payment successful
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-900 leading-tight">
            You're all set
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-500 dark:text-slate-600">
            Your booking is confirmed. A confirmation email is on its way.
          </p>
        </div>

        {/* Details list */}
        <div className="space-y-0 mb-12">
          {bookingId && (
            <div className="flex items-center justify-between py-4 border-b border-[#EAD9B4] dark:border-[#E4D2A8]">
              <span className="text-sm text-slate-500 dark:text-slate-600">
                Booking reference
              </span>
              <span className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-900">
                #{bookingId}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between py-4 border-b border-[#EAD9B4] dark:border-[#E4D2A8]">
            <span className="text-sm text-slate-500 dark:text-slate-600">
              Payment method
            </span>
            <span className="text-sm font-medium text-slate-900 dark:text-slate-900">
              eSewa
            </span>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-[#EAD9B4] dark:border-[#E4D2A8]">
            <span className="text-sm text-slate-500 dark:text-slate-600">
              Status
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-600 dark:text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Paid
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/my-bookings"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#064E3B] py-4 text-sm font-semibold text-white transition-colors hover:bg-[#04382A]"
          >
            <FaSuitcase className="text-sm" />
            View my bookings
          </Link>

          <Link
            to="/package"
            className="flex-1 inline-flex items-center justify-center gap-2 border border-[#D8C494] dark:border-[#D8C494] py-4 text-sm font-semibold text-slate-700 dark:text-slate-700 transition-colors hover:border-[#064E3B] hover:text-[#064E3B]"
          >
            <FaCompass className="text-sm" />
            Explore packages
          </Link>
        </div>

        {/* Help */}
        <p className="mt-12 text-center text-xs text-slate-400 dark:text-slate-600">
          Questions?{" "}
          <a
            href="mailto:support@travelmate.com"
            className="text-[#064E3B] hover:underline"
          >
            support@travelmate.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default EsewaSuccessPage;