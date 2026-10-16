import React from "react";
import { Link } from "react-router-dom";
import FramerMotion from "../Hook/FramerMotion";

const LAST_UPDATED = "October 15, 2026";

const sections = [
  {
    id: "introduction",
    heading: "1. Introduction",
    paragraphs: [
      "Welcome to TravelMate. This Privacy Policy explains how we collect, use, share, and protect your personal information when you visit our website, create an account, or use our travel planning, tour package, and booking services (collectively, the \u201cServices\u201d).",
      "By using the Services, you agree to the collection and use of information in accordance with this policy. If you do not agree, please do not use the Services.",
    ],
  },
  {
    id: "information-we-collect",
    heading: "2. Information We Collect",
    paragraphs: [
      "We collect information that you provide directly to us, information collected automatically as you use the Services, and information from trusted third parties.",
    ],
    bullets: [
      "Account details such as your name, email address, phone number, and password.",
      "Booking information such as traveller names, dates, destinations, and special requests.",
      "Payment information handled securely by our third-party payment providers (for example, eSewa).",
      "Usage data such as your IP address, browser type, device information, and pages visited.",
    ],
  },
  {
    id: "how-we-use",
    heading: "3. How We Use Your Information",
    paragraphs: [
      "We use the information we collect to operate, provide, and improve the Services, and to keep your experience safe, personalised, and reliable.",
    ],
    bullets: [
      "To process bookings, confirm reservations, and communicate about your trip.",
      "To create and manage your account and respond to your enquiries.",
      "To personalise recommendations and improve our website and services.",
      "To send service updates, and marketing communications where you have opted in.",
      "To detect, prevent, and address fraud, security, or technical issues.",
    ],
  },
  {
    id: "cookies",
    heading: "4. Cookies & Tracking",
    paragraphs: [
      "We use cookies and similar technologies to keep you signed in, remember your preferences, understand how the Services are used, and improve performance. You can control cookies through your browser settings, though some features may not work properly if they are disabled.",
    ],
  },
  {
    id: "sharing",
    heading: "5. How We Share Your Information",
    paragraphs: [
      "We do not sell your personal information. We share it only with partners and providers who help us deliver the Services, and only as described below.",
    ],
    bullets: [
      "Travel suppliers such as hotels, transport operators, guides, and activity providers, as needed to fulfil your booking.",
      "Payment processors to complete and verify transactions.",
      "Service providers who support hosting, analytics, and communications on our behalf.",
      "Authorities where required by law, or to protect the rights, safety, and property of TravelMate and others.",
    ],
  },
  {
    id: "data-retention",
    heading: "6. Data Retention",
    paragraphs: [
      "We retain personal information for as long as necessary to provide the Services, comply with legal, tax, and accounting obligations, resolve disputes, and enforce our agreements. When information is no longer needed, we securely delete or anonymise it.",
    ],
  },
  {
    id: "data-security",
    heading: "7. How We Protect Your Information",
    paragraphs: [
      "We use appropriate technical and organisational measures, including encryption in transit and access controls, to protect your personal information against unauthorised access, loss, or misuse.",
      "While we work hard to safeguard your data, no method of transmission or storage over the internet is completely secure, and we cannot guarantee absolute security.",
    ],
  },
  {
    id: "your-rights",
    heading: "8. Your Rights & Choices",
    paragraphs: [
      "Depending on your location, you may have certain rights over your personal information. You can exercise these by contacting us through the details below.",
    ],
    bullets: [
      "Access the personal information we hold about you.",
      "Request correction of inaccurate or incomplete information.",
      "Request deletion of your information, subject to legal obligations.",
      "Opt out of marketing communications at any time.",
      "Object to or restrict certain processing of your information.",
    ],
  },
  {
    id: "childrens-privacy",
    heading: "9. Children\u2019s Privacy",
    paragraphs: [
      "The Services are not directed to children under 18, and we do not knowingly collect personal information from them. Bookings for minors must be made by a parent or legal guardian. If we learn that we have collected information from a child, we will take steps to delete it.",
    ],
  },
  {
    id: "third-party-links",
    heading: "10. Third-Party Links",
    paragraphs: [
      "The Services may contain links to third-party websites and services that we do not control. This Privacy Policy does not apply to them, and we are not responsible for their content or privacy practices. We encourage you to review their policies.",
    ],
  },
  {
    id: "changes-to-policy",
    heading: "11. Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy from time to time. Material changes will be reflected by a new \u201cLast updated\u201d date, and continued use of the Services after changes take effect constitutes acceptance of the revised policy.",
      "For the rules that govern your use of the Services, please also review our ",
    ],
  },
  {
    id: "contact-us",
    heading: "12. Contact Us",
    paragraphs: [
      "If you have questions about this Privacy Policy or how we handle your personal information, please reach out through our contact page or email us at travelmate2026@gmail.com.",
    ],
  },
];

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#FFFFFF] dark:bg-[#FFFFFF] transition-colors duration-300">
      {/* ============ HERO ============ */}
      <FramerMotion>
        <section className="relative w-full h-[45vh] min-h-80 flex items-center justify-center text-center px-6">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/banners/nature2.jpg')" }}
          />
          <div className="absolute inset-0 bg-slate-950/65" />

          <div className="relative max-w-3xl">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
              Legal
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed">
              Your privacy matters to us. Learn how TravelMate collects, uses,
              and protects your personal information.
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
                      {section.id === "changes-to-policy" && (
                        <>
                          <Link
                            to="/terms-and-conditions"
                            className="text-[#047857] font-medium hover:text-[#065F46] transition-colors"
                          >
                            Terms &amp; Conditions
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
