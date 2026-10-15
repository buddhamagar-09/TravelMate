import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaChevronDown } from "react-icons/fa";
import FramerMotion from "../Hook/FramerMotion";

const faqCategories = [
  {
    category: "Booking & Payments",
    items: [
      {
        q: "How do I book a tour package?",
        a: "Browse our packages, open the one you like, and select \u201cBook Now\u201d. Fill in your traveller details in the booking form, agree to the Terms & Conditions, and complete the payment to confirm your reservation.",
      },
      {
        q: "What payment methods do you accept?",
        a: "We currently accept payments through supported online providers such as eSewa. Available options are shown at checkout, and the final amount is displayed before you confirm.",
      },
      {
        q: "Do I need to pay the full amount upfront?",
        a: "For most packages a deposit is enough to hold your reservation, with the remaining balance due by the deadline stated in your booking confirmation. If a package requires full payment upfront, this is clearly shown before checkout.",
      },
      {
        q: "Can I book for a group or a custom itinerary?",
        a: "Yes. Group trips and tailor-made itineraries are available on request. Contact our team with your dates, group size, and interests and we will put together a custom plan.",
      },
    ],
  },
  {
    category: "Packages & Itineraries",
    items: [
      {
        q: "What is included in a package price?",
        a: "Each package page lists its inclusions and exclusions in detail. Typically this covers accommodation, listed activities, and specified transport or meals. Flights, visas, insurance, and personal expenses are usually excluded unless stated otherwise.",
      },
      {
        q: "Can the itinerary change after I book?",
        a: "Itineraries are offered in good faith but may be adjusted because of weather, trail or road conditions, or other events beyond our control. Where changes are needed, we will try to offer a comparable alternative.",
      },
      {
        q: "How difficult are the treks?",
        a: "Difficulty varies by route and is described on each package page. If you are unsure about your fitness level or experience, reach out and we can recommend a suitable option.",
      },
      {
        q: "When is the best time to travel?",
        a: "Nepal is generally best visited in spring (March\u2013May) and autumn (September\u2013November) for clear skies and stable weather. Some regions are enjoyable year-round, so check the specific package for guidance.",
      },
    ],
  },
  {
    category: "Cancellations & Refunds",
    items: [
      {
        q: "What is your cancellation policy?",
        a: "Cancellation and refund terms depend on the specific package and our suppliers, and are shared at the time of booking. To cancel, submit a request through your account or contact support as early as possible.",
      },
      {
        q: "How long do refunds take?",
        a: "Approved refunds are returned to your original payment method. Processing time depends on your bank or payment provider and is typically outside our control.",
      },
      {
        q: "Can I reschedule instead of cancelling?",
        a: "In many cases yes, subject to availability and any supplier change fees. Contact us as soon as possible and we will do our best to move your booking to new dates.",
      },
    ],
  },
  {
    category: "Account & Support",
    items: [
      {
        q: "How do I track my bookings and plans?",
        a: "Once signed in, open My Bookings to view upcoming and past trips, and My Plans to see any itineraries you have saved or generated.",
      },
      {
        q: "I forgot my password. What should I do?",
        a: "Use the password reset option on the login page. If you still cannot access your account, contact support and we will help you regain access securely.",
      },
      {
        q: "How do I leave a review?",
        a: "After your trip you can submit a rating and review from the relevant package page or your booking details. Reviews help other travellers plan with confidence.",
      },
      {
        q: "How can I contact TravelMate?",
        a: "Visit our contact page to send us a message, or email travelmate2026@gmail.com. We aim to respond within one to two business days.",
      },
    ],
  },
];

export default function Faqs() {
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState("0-0");

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return faqCategories;

    return faqCategories
      .map((group) => ({
        ...group,
        items: group.items.filter(
          (item) =>
            item.q.toLowerCase().includes(term) ||
            item.a.toLowerCase().includes(term)
        ),
      }))
      .filter((group) => group.items.length > 0);
  }, [query]);

  const toggle = (id) => setOpenId((current) => (current === id ? null : id));

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#FFFFFF] transition-colors duration-300">
      {/* ============ HERO ============ */}
      <FramerMotion>
        <section className="relative w-full h-[45vh] min-h-80 flex items-center justify-center text-center px-6">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/banners/nature3.jpg')" }}
          />
          <div className="absolute inset-0 bg-slate-950/65" />

          <div className="relative max-w-3xl">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Help Center
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed">
              Quick answers about bookings, payments, itineraries, and support.
            </p>
          </div>
        </section>
      </FramerMotion>

      {/* ============ CONTENT ============ */}
      <section className="py-14 lg:py-20 bg-[#FFFFFF] dark:bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Search */}
          <div className="max-w-2xl mx-auto mb-14">
            <label htmlFor="faq-search" className="sr-only">
              Search FAQs
            </label>
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                id="faq-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search questions..."
                className="w-full bg-[#EEF4EF] dark:bg-[#EEF4EF] text-slate-900 dark:text-slate-900 border border-[#DDE7DF] dark:border-[#DDE7DF] focus:border-[#047857] outline-none pl-11 pr-4 py-3 transition-colors"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center border border-[#DDE7DF] dark:border-[#DDE7DF] p-10">
              <p className="text-slate-700 dark:text-slate-700">
                No questions matched &ldquo;{query}&rdquo;.
              </p>
              <p className="mt-2 text-sm text-slate-500 dark:text-slate-600">
                Try a different keyword, or contact our team for help.
              </p>
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-14">
              {filtered.map((group) => (
                <div key={group.category}>
                  <h2 className="text-xs font-semibold uppercase tracking-widest text-[#047857] mb-6">
                    {group.category}
                  </h2>

                  <div className="border border-[#DDE7DF] dark:border-[#DDE7DF] divide-y divide-[#DDE7DF] dark:divide-[#DDE7DF]">
                    {group.items.map((item) => {
                      const id = `${group.category}-${item.q}`;
                      const isOpen = openId === id;

                      return (
                        <div key={id}>
                          <button
                            type="button"
                            onClick={() => toggle(id)}
                            aria-expanded={isOpen}
                            className="w-full flex items-center justify-between gap-4 text-left px-5 sm:px-6 py-5 hover:bg-[#EEF4EF] dark:hover:bg-[#EEF4EF] transition-colors"
                          >
                            <span className="font-medium text-slate-900 dark:text-slate-900">
                              {item.q}
                            </span>
                            <FaChevronDown
                              className={`shrink-0 text-[#047857] transition-transform duration-300 ${
                                isOpen ? "rotate-180" : ""
                              }`}
                            />
                          </button>

                          {isOpen && (
                            <div className="px-5 sm:px-6 pb-6 -mt-1">
                              <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-700">
                                {item.a}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* CTA */}
          <div className="max-w-3xl mx-auto mt-16 border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#EEF4EF] dark:bg-[#EEF4EF] p-6 sm:p-8 text-center">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-900">
              Didn&apos;t find your answer?
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-700">
              Our team is ready to help. Review our Terms & Conditions or reach
              out directly.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-6">
              <Link
                to="/about"
                className="px-6 py-3 bg-[#047857] hover:bg-[#065F46] text-white font-semibold transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="/terms-and-conditions"
                className="px-6 py-3 border border-[#CDD9CF] dark:border-[#CDD9CF] text-slate-700 dark:text-slate-800 hover:border-[#047857] hover:text-[#047857] font-semibold transition-colors"
              >
                Read Terms
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
