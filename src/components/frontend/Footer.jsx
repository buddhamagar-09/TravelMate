import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaPlane,
  FaArrowRight,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

const exploreLinks = [
  { label: "Home", to: "/" },
  { label: "Destinations", to: "/destination" },
  { label: "Tour Packages", to: "/package" },
  { label: "Gallery", to: "/gallery" },
  { label: "Travel Guides", to: "/travel-guides" },
];

const companyLinks = [
  { label: "Travel Blog", to: "/travel-blog" },
  { label: "About Us", to: "/about" },
  { label: "Contact Us", to: "/contact" },
  { label: "Testimonials", to: "/testimonials" },
];

const supportLinks = [
  { label: "Privacy Policy", to: "/privacy-policy" },
  { label: "Terms & Conditions", to: "/terms-and-conditions" },
  { label: "Customer Support", to: "/customer-support" },
  { label: "FAQs", to: "/faqs" },
];

const socials = [
  { icon: FaFacebookF, href: "https://facebook.com", label: "Facebook" },
  { icon: FaTwitter, href: "https://twitter.com", label: "Twitter" },
  { icon: FaInstagram, href: "https://instagram.com", label: "Instagram" },
  { icon: FaLinkedinIn, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: SiTiktok, href: "https://tiktok.com", label: "TikTok" },
];

export default function Footer() {
  return (
    <footer className="bg-[#F1E3C4] dark:bg-[#F8E7C9] text-slate-600 dark:text-slate-600 border-t border-[#E4D2A8] dark:border-[#E4D2A8] transition-colors duration-300">
      {/* Upper footer */}
      <div className="container mx-auto px-6 lg:px-10 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Brand + Newsletter */}
        <div className="lg:col-span-4">
          <Link to="/" className="flex items-center gap-3">
            <span className="grid place-items-center w-11 h-11 bg-[#064E3B] text-white">
              <FaPlane className="text-lg" />
            </span>
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-900 tracking-tight">
              Travel<span className="text-[#064E3B]">Mate</span>
            </span>
          </Link>

          <p className="mt-5 text-sm leading-7 max-w-sm">
            Your companion for smarter journeys. Discover guides, tips, and
            handpicked destinations to plan your next adventure with ease.
          </p>

          {/* Newsletter */}
          <form
            onSubmit={(e) => e.preventDefault()}
            className="mt-6 flex items-stretch gap-0 max-w-sm"
          >
            <input
              type="email"
              required
              placeholder="Your email"
              className="flex-1 border border-[#D8C494] dark:border-[#D8C494] border-r-0 bg-[#F8E7C9] dark:bg-[#F8E7C9] px-4 py-2.5 text-sm text-slate-800 dark:text-slate-800 placeholder-slate-400 focus:outline-none focus:border-[#064E3B] transition-colors"
            />
            <button
              type="submit"
              aria-label="Subscribe"
              className="grid place-items-center w-12 bg-[#064E3B] text-white hover:bg-[#04382A] transition-colors"
            >
              <FaArrowRight className="text-sm" />
            </button>
          </form>
        </div>

        {/* Links */}
        <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-10">
          <FooterColumn title="Explore" links={exploreLinks} />
          <FooterColumn title="Company" links={companyLinks} />
          <FooterColumn title="Support" links={supportLinks} />
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#E4D2A8] dark:border-[#E4D2A8]">
        <div className="container mx-auto px-6 lg:px-10 py-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-0">
          <p className="text-xs sm:text-sm text-center sm:text-left">
            © {new Date().getFullYear()} TravelMate —{" "}
            <a
              href="https://twitter.com/knyttneve"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#064E3B] hover:text-[#064E3B] font-medium"
            >
              @renxbm07
            </a>
          </p>

          <div className="sm:ml-auto flex items-center gap-1">
            {socials.map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid place-items-center w-9 h-9 text-slate-500 dark:text-slate-600 hover:text-[#064E3B] transition-colors duration-200"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-900 dark:text-slate-900 mb-5">
        {title}
      </h3>
      <ul className="space-y-3">
        {links.map(({ label, to }) => (
          <li key={to}>
            <Link
              to={to}
              className="text-sm hover:text-[#064E3B] transition-colors"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}