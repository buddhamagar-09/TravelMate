import React from "react";
import { Link, useSearchParams } from "react-router-dom";
import api from "../../api/axios";
import { useState, useEffect } from "react";
import useFetchPackages from "../Hook/FetchPackages";

// import FramerMotion from "../Hook/FramerMotion";
function Package() {
  const { packages, fetchPackages, loading, setPackages } = useFetchPackages();

  const [searchParams , setSearchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const searchPackages = async () => {
    try {
      const response = await api.get(
        `/search-packages?query=${encodeURIComponent(searchQuery)}`,
      );
      setPackages(response.data);
    } catch (error) {
      console.error("Error searching packages:", error);
    }
  };

  useEffect(() => {
    if (searchQuery) {
      searchPackages();
    } else {
      fetchPackages();
    }
    window.scrollTo(0, 0); // Scroll to top when the component mounts
  }, [searchQuery]);

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
          <select className="border px-4 py-2">
            <option>Duration</option>
          </select>

          <select className="border px-4 py-2">
            <option>Difficulty</option>
          </select>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="bg-white border border-gray-200 overflow-hidden animate-pulse"
              >
                {/* Image skeleton */}
                <div className="w-full h-56 bg-gray-200"></div>

                {/* Content skeleton */}
                <div className="p-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>

                  <div className="h-4 bg-gray-200 rounded w-1/2 mt-2"></div>

                  <div className="mt-6 flex items-center justify-between">
                    <div>
                      <div className="h-3 bg-gray-200 rounded w-10"></div>
                      <div className="h-7 bg-gray-200 rounded w-20 mt-2"></div>
                    </div>

                    <div className="h-5 bg-gray-200 rounded w-12"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className="bg-white border border-gray-200 overflow-hidden"
              >
                <img
                  src={`http://localhost:8000/storage/${pkg.featured_image}`}
                  alt={pkg.title}
                  className="w-full h-56 object-cover"
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
        )}
      </div>
    </>
  );
}

export default Package;
