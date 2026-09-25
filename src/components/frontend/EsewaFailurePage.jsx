import React from "react";
import { Link, useParams } from "react-router-dom";
import { FaTimesCircle, FaArrowLeft, FaCreditCard } from "react-icons/fa";

const EsewaFailurePage = () => {
  const { bookingId } = useParams();

  return (
    <section className="min-h-screen bg-slate-50 dark:bg-slate-950 px-5 py-16 flex items-center justify-center transition-colors duration-300">
      <div className="w-full max-w-2xl">
        {/* Back Link */}
        <Link
          to="/my-bookings"
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-slate-500 dark:text-slate-400 transition-colors hover:text-sky-500"
        >
          <FaArrowLeft className="text-xs" />
          Back to My Bookings
        </Link>

        <div className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          {/* ============ HEADER ============ */}
          <div className="border-b border-slate-100 dark:border-slate-800 px-8 py-8">
            <div className="flex items-start gap-5">
              {/* Failure Icon */}
              <div className="flex h-14 w-14 shrink-0 items-center justify-center border border-red-500/30 text-red-500">
                <FaTimesCircle className="text-2xl" />
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-red-500">
                  Payment failed
                </p>

                <h1 className="mt-2 text-2xl md:text-3xl font-bold text-slate-900 dark:text-white leading-tight">
                  Your payment wasn't completed
                </h1>

                <p className="mt-3 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                  The transaction was cancelled or could not be processed. Your
                  booking is still available and you can try again.
                </p>
              </div>
            </div>
          </div>

          {/* ============ DETAILS ============ */}
          <div className="px-8 py-7">
            {bookingId && (
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-5">
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  Booking ID
                </span>

                <span className="font-semibold text-slate-900 dark:text-white">
                  #{bookingId}
                </span>
              </div>
            )}

            <div
              className={`flex items-center justify-between ${
                bookingId ? "pt-5" : ""
              }`}
            >
              <span className="text-sm text-slate-500 dark:text-slate-400">
                Payment status
              </span>

              <span className="border border-red-500/30 bg-red-50 dark:bg-red-500/10 px-3 py-1 text-xs font-semibold tracking-wide text-red-600 dark:text-red-400">
                FAILED
              </span>
            </div>
          </div>

          {/* ============ ACTIONS ============ */}
          <div className="flex flex-col-reverse gap-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-8 py-6 sm:flex-row sm:justify-end">
            <Link
              to="/package"
              className="px-5 py-3 text-center text-sm font-semibold text-slate-600 dark:text-slate-400 transition-colors hover:text-sky-500"
            >
              Explore Packages
            </Link>

            <Link
              to="/my-bookings"
              className="inline-flex items-center justify-center gap-2 bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
            >
              <FaCreditCard className="text-sm" />
              Try Again
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EsewaFailurePage;