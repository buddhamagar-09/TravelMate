import React from "react";
import { Link } from "react-router-dom";
import FramerMotion from "../Hook/FramerMotion";

const LAST_UPDATED = "October 15, 2026";

const sections = [
  {
    id: "acceptance-of-terms",
    heading: "1. Acceptance of Terms",
    paragraphs: [
      "Welcome to TravelMate. These Terms & Conditions govern your access to and use of the TravelMate website, mobile experience, and any travel planning, tour package, or booking service we provide (collectively, the \u201cServices\u201d).",
      "By browsing the Services, creating an account, or making a booking, you confirm that you have read, understood, and agree to be bound by these Terms. If you do not agree, please do not use the Services.",
    ],
  },
  {
    id: "eligibility-accounts",
    heading: "2. Eligibility & Accounts",
    paragraphs: [
      "You must be at least 18 years old, and legally capable of entering into a binding contract, to make a booking through TravelMate. Minors may travel only when accompanied by a parent or legal guardian.",
    ],
    bullets: [
      "You are responsible for keeping your account credentials confidential.",
      "All information you provide must be accurate, current, and complete.",
      "You are responsible for all activity that occurs under your account.",
    ],
  },
  {
    id: "bookings-reservations",
    heading: "3. Bookings & Reservations",
    paragraphs: [
      "A booking is confirmed only after we receive your completed booking details and the applicable payment, and we send you a confirmation. Until then, availability is not guaranteed.",
      "Package prices, inclusions, and availability are shown at the time of booking and may change without notice. Please review your itinerary, inclusions, and exclusions carefully before confirming.",
    ],
  },
  {
    id: "pricing-payments",
    heading: "4. Pricing & Payments",
    paragraphs: [
      "All prices are displayed in the currency shown at checkout and may be subject to applicable taxes, service charges, and government levies, which are added where required.",
      "Payments are processed through supported third-party payment providers (for example, eSewa). We do not store your full payment credentials. You agree to comply with the terms of the relevant payment provider.",
    ],
    bullets: [
      "A deposit may be required to hold your reservation.",
      "The remaining balance is due by the deadline stated in your booking confirmation.",
      "We are not responsible for delays, failures, or fees caused by your bank or payment provider.",
    ],
  },
  {
    id: "cancellations-refunds",
    heading: "5. Cancellations, Changes & Refunds",
    paragraphs: [
      "Cancellation, change, and refund eligibility depends on the specific package and the policies of our third-party suppliers, which are shared with you at the time of booking. Requests must be submitted through your account or by contacting support.",
    ],
    bullets: [
      "Refunds are issued to the original payment method, subject to processing times outside our control.",
      "Non-refundable deposits, permits, and supplier fees may be retained.",
      "No-shows and unused services are generally non-refundable.",
    ],
  },
  {
    id: "travel-documents",
    heading: "6. Travel Documents & Requirements",
    paragraphs: [
      "You are solely responsible for ensuring you hold valid passports, visas, permits, and any health or vaccination documentation required for your trip. TravelMate may provide guidance, but this does not replace your responsibility to verify requirements.",
      "We are not liable for losses, additional costs, or denied entry resulting from missing or invalid documents.",
    ],
  },
  {
    id: "travel-insurance",
    heading: "7. Travel Insurance",
    paragraphs: [
      "We strongly recommend that all travellers purchase comprehensive travel insurance covering medical expenses, evacuation, trip cancellation, interruption, delays, and loss of baggage. Some packages may require proof of insurance.",
    ],
  },
  {
    id: "health-safety-conduct",
    heading: "8. Health, Safety & Conduct",
    paragraphs: [
      "Travel may involve physical activity, remote locations, and inherent risks. By booking, you confirm that you are physically fit for the activities involved and that you will follow all safety instructions given by guides and suppliers.",
      "You agree to behave respectfully toward fellow travellers, guides, communities, and the environment. We may remove any traveller whose conduct endangers others or violates local law, without refund.",
    ],
  },
  {
    id: "itinerary-changes",
    heading: "9. Itinerary Changes & Force Majeure",
    paragraphs: [
      "Itineraries are offered in good faith but may be adjusted due to weather, road or trail conditions, natural events, strikes, political unrest, or other circumstances beyond our reasonable control.",
      "Where changes are necessary, we will make reasonable efforts to offer a comparable alternative. We are not liable for losses arising from events of force majeure.",
    ],
  },
  {
    id: "third-party-providers",
    heading: "10. Third-Party Providers",
    paragraphs: [
      "TravelMate works with independent partners such as hotels, transport operators, guides, and activity providers. These partners are separate entities with their own terms and conditions.",
      "While we select partners carefully, we are not responsible for the independent acts or omissions of third parties.",
    ],
  },
  {
    id: "limitation-of-liability",
    heading: "11. Limitation of Liability",
    paragraphs: [
      "To the maximum extent permitted by law, TravelMate shall not be liable for indirect, incidental, special, or consequential damages, including lost profits, loss of enjoyment, or data loss, arising from your use of the Services.",
      "Where liability cannot be excluded, our total liability is limited to the amount you paid for the affected booking.",
    ],
  },
  {
    id: "intellectual-property",
    heading: "12. Intellectual Property",
    paragraphs: [
      "All content on the Services, including text, graphics, logos, images, and software, is owned by or licensed to TravelMate and is protected by applicable intellectual property laws.",
      "You may not copy, reproduce, distribute, or create derivative works from our content without prior written permission.",
    ],
  },
  {
    id: "user-content",
    heading: "13. User Content & Reviews",
    paragraphs: [
      "You may be able to submit reviews, ratings, photos, and other content. By submitting content, you grant TravelMate a non-exclusive, worldwide, royalty-free licence to use, display, and distribute it in connection with the Services.",
      "You confirm that you own or have the rights to the content you submit, and that it is accurate, lawful, and free of offensive or misleading material. We may remove content at our discretion.",
    ],
  },
  {
    id: "privacy-data",
    heading: "14. Privacy & Data",
    paragraphs: [
      "We collect and use personal information to provide the Services, process bookings, and improve your experience. For full details on what we collect and how we protect it, please see our ",
    ],
  },
  {
    id: "termination",
    heading: "15. Suspension & Termination",
    paragraphs: [
      "We may suspend or terminate your access to the Services if you breach these Terms, misuse the platform, or engage in unlawful activity. Provisions that by their nature should survive termination will continue to apply.",
    ],
  },
  {
    id: "governing-law",
    heading: "16. Governing Law & Disputes",
    paragraphs: [
      "These Terms are governed by the laws of Nepal. Any dispute arising from or relating to the Services shall be subject to the exclusive jurisdiction of the competent courts of Nepal.",
    ],
  },
  {
    id: "changes-to-terms",
    heading: "17. Changes to These Terms",
    paragraphs: [
      "We may update these Terms from time to time. Material changes will be reflected by a new \u201cLast updated\u201d date, and continued use of the Services after changes take effect constitutes acceptance of the revised Terms.",
    ],
  },
  {
    id: "contact-us",
    heading: "18. Contact Us",
    paragraphs: [
      "If you have questions about these Terms, please reach out through our contact page or email us at travelmate2026@gmail.com.",
    ],
  },
];

export default function TermsAndConditions() {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#FFFFFF] transition-colors duration-300">
      {/* ============ HERO ============ */}
      <FramerMotion>
        <section className="relative w-full h-[45vh] min-h-80 flex items-center justify-center text-center px-6">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/banners/nature1.jpg')" }}
          />
          <div className="absolute inset-0 bg-slate-950/65" />

          <div className="relative max-w-3xl">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Legal
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Terms &amp; Conditions
            </h1>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed">
              Please read these terms carefully before using TravelMate or
              making a booking.
            </p>
          </div>
        </section>
      </FramerMotion>

      {/* ============ CONTENT ============ */}
      <section className="py-14 lg:py-20 bg-[#FFFFFF] dark:bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <p className="text-sm text-slate-500 dark:text-slate-600 mb-10">
            Last updated: {LAST_UPDATED}
          </p>

          <div className="grid lg:grid-cols-4 gap-10 lg:gap-14">
            {/* Table of contents */}
            <aside className="lg:col-span-1">
              <div className="lg:sticky lg:top-28 border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#EEF4EF] dark:bg-[#EEF4EF] p-6">
                <h2 className="text-xs font-semibold uppercase tracking-widest text-slate-900 dark:text-slate-900 mb-4">
                  On this page
                </h2>
                <nav className="space-y-2.5">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block text-sm text-slate-600 dark:text-slate-700 hover:text-[#047857] transition-colors"
                    >
                      {section.heading}
                    </a>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Sections */}
            <div className="lg:col-span-3 space-y-12">
              {sections.map((section) => (
                <article key={section.id} id={section.id} className="scroll-mt-28">
                  <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-900 mb-4">
                    {section.heading}
                  </h2>

                  {section.paragraphs?.map((text, i) => (
                    <p
                      key={i}
                      className="text-base leading-relaxed text-slate-600 dark:text-slate-700 mb-4"
                    >
                      {text}
                      {section.id === "privacy-data" && (
                        <>
                          <Link
                            to="/privacy-policy"
                            className="text-[#047857] font-medium hover:text-[#065F46] transition-colors"
                          >
                            Privacy Policy
                          </Link>
                          .
                        </>
                      )}
                    </p>
                  ))}

                  {section.bullets && (
                    <ul className="mt-2 space-y-2.5">
                      {section.bullets.map((item, i) => (
                        <li
                          key={i}
                          className="flex gap-3 text-slate-600 dark:text-slate-700"
                        >
                          <span className="mt-2.5 w-1.5 h-1.5 shrink-0 bg-[#047857]" />
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </article>
              ))}

              {/* Bottom help note */}
              <div className="border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#EEF4EF] dark:bg-[#EEF4EF] p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-900">
                  Still have questions?
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-700">
                  Visit our FAQs for quick answers, or get in touch with our team
                  and we&apos;ll be happy to help.
                </p>
                <div className="flex flex-wrap gap-4 mt-6">
                  <Link
                    to="/faqs"
                    className="px-6 py-3 bg-[#047857] hover:bg-[#065F46] text-white font-semibold transition-colors"
                  >
                    Read FAQs
                  </Link>
                  <Link
                    to="/about"
                    className="px-6 py-3 border border-[#CDD9CF] dark:border-[#CDD9CF] text-slate-700 dark:text-slate-800 hover:border-[#047857] hover:text-[#047857] font-semibold transition-colors"
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
