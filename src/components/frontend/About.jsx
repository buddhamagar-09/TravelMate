import React, { useState } from "react";
import { FaPlane, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";
import { Link } from "react-router-dom";
import FramerMotion from "../Hook/FramerMotion";

export default function About() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: wire up to your backend / email service
    console.log("Submitted:", form);
  };

  return (
    <div className="bg-[#FFFFFF] dark:bg-[#FFFFFF] transition-colors duration-300">
      {/* ============ HERO ============ */}
      <FramerMotion>
        <section className="relative w-full h-[60vh] min-h-105 flex items-center justify-center text-center px-6">
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: "url('/images/banners/nature1.jpg')" }}
          />
          <div className="absolute inset-0 bg-slate-950/65" />

          <div className="relative max-w-3xl">
            <p className="text-emerald-400 text-sm font-semibold uppercase tracking-widest mb-4">
              About TravelMate
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6">
              Journeys made simple
            </h1>
            <p className="text-slate-200 text-base md:text-lg leading-relaxed">
              TravelMate helps you discover Nepal's hidden treasures —
              breathtaking trekking routes, cultural heritage, and unforgettable
              adventures — with reliable information you can trust.
            </p>
          </div>
        </section>
      </FramerMotion>

      {/* ============ ABOUT ============ */}
      <section className="py-14 lg:py-20 bg-[#FFFFFF] dark:bg-[#FFFFFF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Text */}
            <div>
              <p className="text-[#065F46] text-sm font-semibold uppercase tracking-widest mb-4">
                Who we are
              </p>

              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-900 leading-tight">
                Discover Nepal <br />
                like never before
              </h2>

              <p className="mt-8 text-base lg:text-lg leading-relaxed text-slate-600 dark:text-slate-700">
                TravelMate helps travelers discover Nepal's hidden treasures,
                breathtaking trekking routes, cultural heritage, and
                unforgettable adventures. We carefully select destinations and
                provide reliable travel information so every journey becomes
                simple, enjoyable, and memorable.
              </p>

              <p className="mt-5 text-base lg:text-lg leading-relaxed text-slate-600 dark:text-slate-700">
                Whether you're searching for mountains, wildlife, lakes,
                temples, or local experiences — TravelMate is your trusted
                companion for planning the perfect trip.
              </p>

              <div className="flex flex-wrap gap-4 mt-10">
                <Link
                  to="/package"
                  className="px-6 py-3 bg-[#065F46] hover:bg-[#064E3B] text-white font-semibold transition-colors"
                >
                  Explore Packages
                </Link>
                <Link
                  to="/destination"
                  className="px-6 py-3 border border-[#CDD9CF] dark:border-[#CDD9CF] text-slate-700 dark:text-slate-800 hover:border-[#065F46] hover:text-[#065F46] font-semibold transition-colors"
                >
                  Browse Destinations
                </Link>
              </div>
            </div>

            {/* Image + stat */}
            <div className="relative">
              <img
                src="/images/trekking/dhorpatan.jpg"
                alt="Trekkers in the Dhorpatan valley"
                className="w-full h-125 object-cover"
              />

              <div className="absolute -bottom-6 left-6 bg-[#FFFFFF] dark:bg-[#FFFFFF] border border-[#DDE7DF] dark:border-[#DDE7DF] px-6 py-4">
                <p className="text-3xl font-bold text-[#065F46]">500+</p>
                <p className="text-sm text-slate-600 dark:text-slate-600">
                  Happy travelers
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ CONTACT ============ */}
      <FramerMotion>
        <section className="py-14 lg:py-20 bg-[#EEF4EF] dark:bg-[#FFFFFF] transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            {/* Section heading */}
            <div className="max-w-2xl mb-14">
              <p className="text-[#065F46] text-sm font-semibold uppercase tracking-widest mb-4">
                Get in touch
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-900 leading-tight">
                Contact us
              </h2>
              <p className="mt-5 text-base lg:text-lg text-slate-600 dark:text-slate-700 leading-relaxed">
                Have a question, suggestion, or just want to say hello? We'd
                love to hear from you.
              </p>
            </div>

            <div className="grid lg:grid-cols-5 gap-10">
              {/* Contact info + map */}
              <div className="lg:col-span-3 space-y-6">
                {/* Info cards */}
                <div className="grid sm:grid-cols-3 gap-4">
                  <InfoCard
                    icon={FaMapMarkerAlt}
                    label="Address"
                    value="123 Main Street, Kathmandu"
                  />
                  <InfoCard
                    icon={FaEnvelope}
                    label="Email"
                    value="travelmate2026@gmail.com"
                    href="mailto:travelmate2026@gmail.com"
                  />
                  <InfoCard
                    icon={FaPhone}
                    label="Phone"
                    value="123-456-7890"
                    href="tel:1234567890"
                  />
                </div>

                {/* Map */}
                <div className="overflow-hidden border border-[#DDE7DF] dark:border-[#DDE7DF] h-85">
                  <iframe
                    title="TravelMate office location"
                    src="https://www.google.com/maps?q=27.7098244,84.4142118&z=15&output=embed"
                    className="w-full h-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-2">
                <form
                  onSubmit={handleSubmit}
                  className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border border-[#DDE7DF] dark:border-[#DDE7DF] p-8"
                >
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-900 mb-6">
                    Send a message
                  </h3>

                  <div className="space-y-5">
                    <Field
                      id="name"
                      label="Name"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                    <Field
                      id="email"
                      label="Email"
                      type="email"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                    <Field
                      id="message"
                      label="Message"
                      textarea
                      value={form.message}
                      onChange={handleChange}
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-6 w-full py-3 bg-[#065F46] hover:bg-[#064E3B] text-white font-semibold transition-colors"
                  >
                    Send message
                  </button>

                  <p className="text-xs text-slate-500 dark:text-slate-600 mt-4 text-center">
                    We respect your privacy and never share your information.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>
      </FramerMotion>
    </div>
  );
}

/* ---------- Subcomponents ---------- */

function InfoCard({ icon: Icon, label, value, href }) {
  const content = (
    <div className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border border-[#DDE7DF] dark:border-[#DDE7DF] p-5 h-full">
      <div className="w-9 h-9 grid place-items-center border border-[#065F46]/30 text-[#065F46] mb-3">
        <Icon className="text-sm" />
      </div>
      <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-600">
        {label}
      </p>
      <p className="mt-1 text-sm text-slate-800 dark:text-slate-800 wrap-break-word">
        {value}
      </p>
    </div>
  );

  return href ? (
    <a href={href} className="block">
      {content}
    </a>
  ) : (
    content
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
  textarea = false,
  autoComplete,
}) {
  const base =
    "w-full bg-[#EEF4EF] dark:bg-[#FFFFFF] text-slate-900 dark:text-slate-900 border border-[#DDE7DF] dark:border-[#DDE7DF] focus:border-[#065F46] outline-none px-4 py-2.5 transition-colors";

  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-slate-700 dark:text-slate-700 mb-1.5"
      >
        {label}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={id}
          rows={4}
          required
          value={value}
          onChange={onChange}
          className={`${base} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          required
          autoComplete={autoComplete}
          value={value}
          onChange={onChange}
          className={base}
        />
      )}
    </div>
  );
}