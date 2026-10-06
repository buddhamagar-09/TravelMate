import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaCheck, FaSuitcase, FaCompass } from "react-icons/fa";

const EsewaSuccessPage = () => {
  const { bookingId } = useParams();

  return (
    <section className="bg-white dark:bg-slate-950 min-h-screen py-16 lg:py-24 transition-colors duration-300">
      <div className="max-w-xl mx-auto px-6 lg:px-8">
        {/* Back link */}
        <Link
          to="/my-bookings"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 hover:text-sky-500 transition-colors mb-12"
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

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white leading-tight">
            You're all set
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-500 dark:text-slate-400">
            Your booking is confirmed. A confirmation email is on its way.
          </p>
        </div>

        {/* Details list */}
        <div className="space-y-0 mb-12">
          {bookingId && (
            <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Booking reference
              </span>
              <span className="font-mono text-sm font-semibold text-slate-900 dark:text-white">
                #{bookingId}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-sm text-slate-500 dark:text-slate-400">
              Payment method
            </span>
            <span className="text-sm font-medium text-slate-900 dark:text-white">
              eSewa
            </span>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800">
            <span className="text-sm text-slate-500 dark:text-slate-400">
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
            className="flex-1 inline-flex items-center justify-center gap-2 bg-sky-500 py-4 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
          >
            <FaSuitcase className="text-sm" />
            View my bookings
          </Link>

          <Link
            to="/package"
            className="flex-1 inline-flex items-center justify-center gap-2 border border-slate-300 dark:border-slate-700 py-4 text-sm font-semibold text-slate-700 dark:text-slate-300 transition-colors hover:border-sky-500 hover:text-sky-500"
          >
            <FaCompass className="text-sm" />
            Explore packages
          </Link>
        </div>

        {/* Help */}
        <p className="mt-12 text-center text-xs text-slate-400 dark:text-slate-500">
          Questions?{" "}
          <a
            href="mailto:support@travelmate.com"
            className="text-sky-500 hover:underline"
          >
            support@travelmate.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default EsewaSuccessPage;