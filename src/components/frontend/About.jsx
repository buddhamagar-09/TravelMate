import React from "react";
import { FaPlane } from "react-icons/fa";
import { Link } from "react-router-dom";

import FramerMotion from "../Hook/FramerMotion";

function About() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Banner */}
      <FramerMotion>
        <section className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div
            style={{
              backgroundImage:
                "linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)), url('images/banners/nature1.jpg')",
            }}
            className="w-full h-[45vh] bg-cover bg-center flex flex-col justify-center items-center text-center px-6"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              #Know Us
            </h1>

            <p className="max-w-3xl text-gray-200 text-sm md:text-lg leading-relaxed">
              MotoMods Nepal is an online platform that provides high-quality
              motorcycle parts and accessories for riders. We make it simple to
              find reliable products that enhance performance, safety, and
              style. A one-stop online destination built for every motorcycle
              enthusiast.
            </p>
          </div>

          {/* About */}
          <section className="w-full py-20 bg-gray-100 dark:bg-slate-900 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
              <div className="grid lg:grid-cols-2 gap-14 items-center">
                {/* Left Content */}
                <div>
                  <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 text-sm font-semibold mb-5">
                    About TravelMate
                  </span>

                  <h2 className="text-5xl font-bold text-gray-900 dark:text-white leading-tight">
                    Discover Nepal <br />
                    <span className="text-blue-600">Like Never Before</span>
                  </h2>

                  <p className="mt-8 text-lg leading-8 text-gray-600 dark:text-gray-300">
                    TravelMate helps travelers discover Nepal's hidden
                    treasures, breathtaking trekking routes, cultural heritage,
                    and unforgettable adventures. We carefully select
                    destinations and provide reliable travel information so
                    every journey becomes simple, enjoyable, and memorable.
                  </p>

                  <p className="mt-5 text-lg leading-8 text-gray-600 dark:text-gray-300">
                    Whether you're searching for mountains, wildlife, lakes,
                    temples, or local experiences, TravelMate is your trusted
                    companion for planning the perfect trip.
                  </p>

                  <div className="flex gap-4 mt-10">
                    <button className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition">
                      Explore Packages
                    </button>

                    <button className="px-7 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-xl hover:bg-blue-600 hover:text-white transition">
                      Learn More
                    </button>
                  </div>
                </div>

                {/* Right Image */}
                <div className="relative">
                  <img
                    src="images/trekking/dhorpatan.jpg"
                    alt="TravelMate"
                    className="rounded-3xl shadow-2xl w-full h-137.5 object-cover"
                  />

                  {/* Floating Card */}
                  <div className="absolute bottom-6 left-6 bg-white dark:bg-slate-800 rounded-2xl shadow-xl px-6 py-4">
                    <h3 className="text-3xl font-bold text-blue-600">500+</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Happy Travelers
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </FramerMotion>
      {/* Contact Section */}
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-white transition-colors duration-300 py-5 gap-5 flex flex-col items-center justify-center ">
        <span className="text-4xl sm:text-2xl font-bold text-gray-900 dark:text-white whitespace-nowrap transition-colors">
          <FaPlane className="inline-block text-3xl sm:text-4xl text-blue-600 mr-2" />
          Travel <span className="text-blue-600"> Mate</span>
        </span>
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 text-center">
          Contact Us
        </h1>
      </div>
        <section className="text-gray-600 dark:text-gray-300 body-font relative bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
          <div className="container px-5 py-10 mx-auto flex sm:flex-nowrap flex-wrap">
            {/* Map */}
            <div className="lg:w-2/3 md:w-1/2 bg-gray-200 dark:bg-gray-800 rounded-lg overflow-hidden sm:mr-10 p-10 flex items-end justify-start relative">
              <iframe
                width="100%"
                height="100%"
                className="absolute inset-0"
                frameBorder="0"
                title="map"
                marginHeight="0"
                marginWidth="0"
                scrolling="no"
                src="https://www.google.com/maps?q=27.7098244,84.4142118&z=15&output=embed"
                style={{ filter: "grayscale(0.4) contrast(1.2) opacity(0.8)" }}
              ></iframe>

              <div className="bg-white dark:bg-gray-900 relative flex flex-wrap py-6 rounded shadow-md z-10">
                <div className="lg:w-1/2 px-6">
                  <h2 className="title-font font-semibold text-gray-900 dark:text-white tracking-widest text-xs">
                    ADDRESS
                  </h2>
                  <p className="mt-1 text-gray-600 dark:text-gray-300">
                    123 Main Street, Kathmandu, Nepal
                  </p>
                </div>

                <div className="lg:w-1/2 px-6 mt-4 lg:mt-0">
                  <h2 className="title-font font-semibold text-gray-900 dark:text-white tracking-widest text-xs">
                    EMAIL
                  </h2>
                  <a
                    href="mailto:travelmate2026@gmail.com"
                    className="text-blue-500 hover:text-blue-400 leading-relaxed"
                  >
                    travelmate2026@gmail.com
                  </a>
                  <h2 className="title-font font-semibold text-gray-900 dark:text-white tracking-widest text-xs mt-4">
                    PHONE
                  </h2>
                  <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                    123-456-7890
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:w-1/3 md:w-1/2 bg-gray-100 dark:bg-gray-900 flex flex-col md:ml-auto w-full md:py-8 mt-8 md:mt-0">
              <h2 className="text-gray-900 dark:text-white text-lg mb-1 font-medium title-font">
                Feedback
              </h2>

              <p className="leading-relaxed mb-5 text-gray-600 dark:text-gray-300">
                We value your feedback and suggestions. Please fill out the form
                below to share your thoughts with us. Your input helps us
                improve our services and provide a better experience for our
                users.
              </p>

              {/* Name */}
              <div className="relative mb-4">
                <label
                  htmlFor="name"
                  className="leading-7 text-sm text-gray-600 dark:text-gray-300"
                >
                  Name
                </label>

                <input
                  type="text"
                  id="name"
                  name="name"
                  className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              {/* Email */}
              <div className="relative mb-4">
                <label
                  htmlFor="email"
                  className="leading-7 text-sm text-gray-600 dark:text-gray-300"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="email"
                  name="email"
                  className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 outline-none py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
              </div>

              {/* Message */}
              <div className="relative mb-4">
                <label
                  htmlFor="message"
                  className="leading-7 text-sm text-gray-600 dark:text-gray-300"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  name="message"
                  className="w-full bg-white dark:bg-gray-800 text-gray-900 dark:text-white rounded border border-gray-300 dark:border-gray-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-800 h-32 outline-none py-2 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                ></textarea>
              </div>

              <button className="text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded text-lg transition duration-300">
                Send Message
              </button>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
                We respect your privacy and will not share your information with
                third parties.
              </p>
            </div>
          </div>
        </section>
    
    </div>
  );
}

export default About;
