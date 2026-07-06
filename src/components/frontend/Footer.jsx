import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { FaPlane } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-gray-600 dark:text-gray-300 body-font bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* upper footer */}
      <div className="container mx-auto px-5 py-14 flex flex-col lg:flex-row justify-between gap-16">
        {/* Logo Section */}
        <div className="lg:w-1/3 w-full">
          <Link
            to="/"
            className="flex items-center justify-center lg:justify-start"
          >
            <FaPlane className="text-4xl text-blue-600  " />

            <span className="ml-3 text-2xl font-bold text-gray-900 dark:text-white">
              Travel <span className="text-blue-600">Mate</span>
            </span>
          </Link>

          <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-justify leading-7">
            Travel Mate is a travel website that provides information and
            resources for travelers. We offer travel guides, tips, and
            recommendations to help you plan your next adventure.
          </p>
        </div>

        {/* Footer Links */}
        <div className="lg:w-2/3 w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {/* Explore */}
          <div className="text-center sm:text-left">
            <h2 className="font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Explore
            </h2>

            <ul className="space-y-3">
              <li>
                <Link to="/" className="hover:text-indigo-500">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/destinations" className="hover:text-indigo-500">
                  Destinations
                </Link>
              </li>
              <li>
                <Link to="/tour-packages" className="hover:text-indigo-500">
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-indigo-500">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/travel-guides" className="hover:text-indigo-500">
                  Travel Guides
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="text-center sm:text-left">
            <h2 className="font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h2>

            <ul className="space-y-3 ">
              <li>
                <Link to="/travel-blog" className="hover:text-indigo-500">
                  Travel Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-indigo-500">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-500">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/testimonials" className="hover:text-indigo-500">
                  Testimonials
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="text-center sm:text-left">
            <h2 className="font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Support
            </h2>

            <ul className="space-y-3">
              <li>
                <Link to="/privacy-policy" className="hover:text-indigo-500">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-and-conditions"
                  className="hover:text-indigo-500"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/customer-support" className="hover:text-indigo-500">
                  Customer Support
                </Link>
              </li>
              <li>
                <Link to="/faqs" className="hover:text-indigo-500">
                  FAQs
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-100 dark:bg-gray-800 transition-colors duration-300">
        <div className="container mx-auto py-4 px-5 flex flex-wrap flex-col sm:flex-row">
          <p className="text-gray-500 dark:text-gray-400 text-sm text-center sm:text-left">
            © 2026 TravelMate —
            <a
              href="https://twitter.com/knyttneve"
              target="_blank"
              rel="noopener noreferrer"
              className="text-indigo-500 ml-1 hover:text-indigo-400"
            >
              @renxbm07
            </a>
          </p>

          <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
            <a className="text-gray-500 dark:text-gray-400 hover:text-indigo-500 cursor-pointer">
              <FaFacebookF />
            </a>

            <a className="ml-3 text-gray-500 dark:text-gray-400 hover:text-indigo-500 cursor-pointer">
              <FaTwitter />
            </a>

            <a className="ml-3 text-gray-500 dark:text-gray-400 hover:text-indigo-500 cursor-pointer">
              <FaInstagram />
            </a>

            <a className="ml-3 text-gray-500 dark:text-gray-400 hover:text-indigo-500 cursor-pointer">
              <FaLinkedinIn />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}
