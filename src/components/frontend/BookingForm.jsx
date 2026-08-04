import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchPackages from "../Theme/FetchPackages";
import { useEffect,useState } from "react";
import api from "../../api/axios";

export default function BookingForm() {
  const { packages, fetchPackages, loading, setPackages } = useFetchPackages();
  const { id } = useParams();
  const navigate = useNavigate();
  const packageData = packages.find((pkg) => pkg.id === parseInt(id));
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className=" mt-10  mb-10 text-center">
        <p className="text-blue-600 font-semibold uppercase tracking-wider">
          TravelMate
        </p>

        <h1 className="mt-2 text-4xl font-bold text-gray-900">
          Complete Your Booking
        </h1>

        <p className="mt-3 text-gray-600 mb-3">
          You're just one step away from your next adventure.
        </p>
      </div>
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-5">
          <div className="bg-white  overflow-hidden"></div>

          <div className="grid lg:grid-cols-2">
            {/* LEFT SIDE */}
            <div className="flex flex-col border-r border-gray-200 p-10">
              <img
                src={`http://localhost:8000/storage/${packageData?.featured_image}`}
                alt="Package Image"
                className=" h-72 object-cover"
              />

              <div className="mt-6">
                <h2 className="text-3xl font-bold text-gray-900">
                  {packageData?.title}
                </h2>

                <p className="mt-3 text-gray-600 leading-relaxed line-clamp-3 text-justify">
                  {packageData?.short_description}
                </p>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="border border-gray-200 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Duration</p>
                    <h4 className="font-semibold mt-1">
                      {packageData?.duration}
                    </h4>
                  </div>

                  <div className="border border-gray-200 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Difficulty</p>
                    <h4 className="font-semibold mt-1">
                      {packageData?.difficulty}
                    </h4>
                  </div>

                  <div className="border border-gray-200 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Group Size</p>
                    <h4 className="font-semibold mt-1">
                      {packageData?.group_size}
                    </h4>
                  </div>

                  <div className="border border-gray-200 p-4 rounded-md">
                    <p className="text-sm text-gray-500">Season</p>
                    <h4 className="font-semibold mt-1">
                      {packageData?.best_season}
                    </h4>
                  </div>
                </div>

                <div className="mb-6 flex flex-col items-start mt-5">
                  <p className="text-gray-500 text-sm">Starting From</p>
                  <div className="ml-2 flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-blue-600">
                      ${packageData?.price}
                    </h3>
                    <p className="text-gray-500 text-sm mt-1">Per Person</p>
                  </div>
                </div>
              </div>
            </div>
            {/* RIGHT SIDE */}
            <div className="p-10 lg:p-12 border-r border-gray-200">
              <h2 className="text-3xl font-bold text-gray-900">
                Complete Your Booking
              </h2>
              <p className="mt-2 text-gray-500">
                Fill in your information to reserve your trip.
              </p>
              <form className="mt-8 space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    // placeholder="John Doe"
                    value={user?.name}
                    readOnly
                    className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <input
                      type="email"
                    //   placeholder="john@gmail.com"
                      value={user?.email}
                      readOnly
                      className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      placeholder="+977 98XXXXXXXX"
                      className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                  </div>
                </div>

                {/* Travel Date & Travelers */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-700">
                      Number of Travelers
                    </label>
                    <input
                      type="number"
                      min="1"
                      defaultValue={1}
                      className="w-full rounded-md border border-gray-300 px-4 py-3 focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none"
                    />
                  </div>
                </div>

                {/* Special Request */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-700">
                    Special Request{" "}
                    <span className="text-gray-400">(Optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us anything you'd like us to know..."
                    className="w-full rounded-md border border-gray-300 px-4 py-3 resize-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 outline-none"
                  />
                </div>

                {/* Booking Summary */}
                <div className="border border-gray-200 bg-gray-50 p-5">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">
                    Booking Summary
                  </h3>

                  <div className="flex justify-between mb-3">
                    <span className="text-gray-600">Price Per Person</span>
                    <span className="font-medium">${packageData?.price}</span>
                  </div>

                  <div className="flex justify-between mb-3">
                    <span className="text-gray-600">Travelers</span>
                    <span>1</span>
                  </div>

                  <hr className="my-4" />

                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span className="text-blue-600">${packageData?.price}</span>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 h-4 w-4 accent-blue-600"
                  />

                  <p className="text-sm text-gray-600 leading-6">
                    I agree to the Terms & Conditions and Privacy Policy.
                  </p>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full bg-blue-600 py-4 text-white font-semibold transition hover:bg-blue-700"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
