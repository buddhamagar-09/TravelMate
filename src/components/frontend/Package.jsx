import React from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useState, useEffect } from "react";
import useFetchPackages from "../Theme/FetchPackages";

import FramerMotion from "../Theme/FramerMotion";
function Package() {
 const { packages, fetchPackages, loading, setPackages } = useFetchPackages();
  const navigate = useNavigate();
 

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, []);

  return (
    <>
      <section className="bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <h1 className="text-4xl font-bold">Explore Nepal</h1>

          <p className="mt-3 text-blue-100 max-w-xl">
            Discover trekking, hiking, cultural tours and unforgettable
            adventures across Nepal.
          </p>
        </div>
      </section>

      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-wrap gap-4 items-center">
          <input
            type="text"
            placeholder="Search package..."
            className="border px-4 py-2 w-72 outline-none focus:border-blue-600"
          />

          <select className="border px-4 py-2">
            <option>Duration</option>
          </select>

          <select className="border px-4 py-2">
            <option>Difficulty</option>
          </select>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {packages.map((pkg) => (
            <div
              key={pkg.id}
              className="bg-white border border-gray-200 overflow-hidden"
            >
              <img
                src={`http://localhost:8000/storage/${pkg.featured_image}`}
                alt={pkg.title}
                className="w-full h-56 object-cover text-black"
              />

              <div className="p-4">
                <h2 className="font-semibold text-lg text-black leading-6 h-12">
                  {pkg.title}
                </h2>

                <div className="mt-4 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500">From</p>

                    <p className="text-2xl font-bold text-blue-700">
                      ${pkg.price}
                    </p>
                  </div>

                  <Link
                    to={`/package/${pkg.id}`}
                    className="text-blue-700 font-semibold hover:underline"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Package;
