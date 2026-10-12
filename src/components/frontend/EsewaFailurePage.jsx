import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft, FaTimes, FaCreditCard, FaCompass } from "react-icons/fa";

const EsewaFailurePage = () => {
  const { bookingId } = useParams();

  return (
    <section className="bg-[#FFFFFF] dark:bg-[#FFFFFF] min-h-screen py-16 lg:py-24 transition-colors duration-300">
      <div className="max-w-xl mx-auto px-6 lg:px-8">
        {/* Back link */}
        <Link
          to="/my-bookings"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-600 hover:text-[#047857] transition-colors mb-12"
        >
          <FaArrowLeft className="text-xs" />
          Back to my bookings
        </Link>

        {/* Failure mark */}
        <div className="flex flex-col items-center text-center mb-12">
          <div className="w-20 h-20 grid place-items-center rounded-full bg-red-500 text-white mb-6 shadow-lg shadow-red-500/30">
            <FaTimes className="text-3xl" />
          </div>

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-red-600 dark:text-red-700 mb-4">
            Payment failed
          </p>

          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-900 leading-tight">
            Something went wrong
          </h1>

          <p className="mt-4 text-base leading-relaxed text-slate-500 dark:text-slate-600">
            The transaction was cancelled or could not be processed. Your
            booking is still reserved — you can try again any time.
          </p>
        </div>

        {/* Details list */}
        <div className="space-y-0 mb-12">
          {bookingId && (
            <div className="flex items-center justify-between py-4 border-b border-[#E4EDE6] dark:border-[#DDE7DF]">
              <span className="text-sm text-slate-500 dark:text-slate-600">
                Booking reference
              </span>
              <span className="font-mono text-sm font-semibold text-slate-900 dark:text-slate-900">
                #{bookingId}
              </span>
            </div>
          )}

          <div className="flex items-center justify-between py-4 border-b border-[#E4EDE6] dark:border-[#DDE7DF]">
            <span className="text-sm text-slate-500 dark:text-slate-600">
              Payment method
            </span>
            <span className="text-sm font-medium text-slate-900 dark:text-slate-900">
              eSewa
            </span>
          </div>

          <div className="flex items-center justify-between py-4 border-b border-[#E4EDE6] dark:border-[#DDE7DF]">
            <span className="text-sm text-slate-500 dark:text-slate-600">
              Status
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-semibold text-red-600 dark:text-red-700">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
              Failed
            </span>
          </div>
        </div>

        {/* Helpful note */}
        <div className="border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#EEF4EF] dark:bg-[#FFFFFF] px-5 py-4 mb-10">
          <p className="text-xs leading-relaxed text-slate-600 dark:text-slate-600">
            <span className="font-semibold text-slate-900 dark:text-slate-900">
              Common reasons:
            </span>{" "}
            insufficient balance, cancelled at the eSewa prompt, or a network
            timeout. No money was deducted for failed transactions.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/my-bookings"
            className="flex-1 inline-flex items-center justify-center gap-2 bg-[#047857] py-4 text-sm font-semibold text-white transition-colors hover:bg-[#065F46]"
          >
            <FaCreditCard className="text-sm" />
            Try again
          </Link>

          <Link
            to="/package"
            className="flex-1 inline-flex items-center justify-center gap-2 border border-[#CDD9CF] dark:border-[#CDD9CF] py-4 text-sm font-semibold text-slate-700 dark:text-slate-700 transition-colors hover:border-[#047857] hover:text-[#047857]"
          >
            <FaCompass className="text-sm" />
            Explore packages
          </Link>
        </div>

        {/* Help */}
        <p className="mt-12 text-center text-xs text-slate-400 dark:text-slate-600">
          Still stuck?{" "}
          <a
            href="mailto:support@travelmate.com"
            className="text-[#047857] hover:underline"
          >
            support@travelmate.com
          </a>
        </p>
      </div>
    </section>
  );
};

export default EsewaFailurePage;