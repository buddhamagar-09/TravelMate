import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import FramerMotion from "../Hook/FramerMotion";
import useFetchPackages from "../Hook/FetchPackages";

function Destination() {
  const { packages, fetchPackages, loading } = useFetchPackages();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    fetchPackages();
  }, []);

  return (
    <>
      {/* ==================== PAGE HEADER ==================== */}
      <section className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border-b border-[#DDE7DF] dark:border-[#DDE7DF]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-20">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#047857] mb-3">
            Destinations
          </p>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
            Popular destinations
          </h1>
          <p className="mt-4 text-base lg:text-lg text-slate-600 max-w-xl leading-relaxed">
            Explore the regions, trails, and towns that travelers love most
            across Nepal.
          </p>
        </div>
      </section>

      {/* ==================== GRID ==================== */}
      <section className="bg-[#EEF4EF] dark:bg-[#FFFFFF] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 lg:py-16">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <div
                  key={item}
                  className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border border-[#DDE7DF] dark:border-[#DDE7DF] overflow-hidden animate-pulse"
                >
                  <div className="w-full h-56 bg-[#DCE7DE] dark:bg-[#EEF4EF]" />

                  <div className="p-4">
                    <div className="h-5 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-3/4" />
                    <div className="h-4 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-1/2 mt-2" />

                    <div className="mt-6 flex items-center justify-between">
                      <div>
                        <div className="h-3 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-10" />
                        <div className="h-7 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-20 mt-2" />
                      </div>

                      <div className="h-4 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-12" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="bg-[#FFFFFF] dark:bg-[#FFFFFF] border border-[#DDE7DF] dark:border-[#DDE7DF] overflow-hidden"
                >
                  <img
                    src={`http://localhost:8000/storage/${pkg.featured_image}`}
                    alt={pkg.title}
                    className="w-full h-56 object-cover"
                  />

                  <div className="p-4">
                    <h2 className="font-semibold text-base text-slate-900 dark:text-slate-900 line-clamp-2 leading-snug min-h-11">
                      {pkg.title}
                    </h2>

                    <div className="mt-4 flex items-end justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-wide text-slate-400">
                          From
                        </p>

                        <p className="text-xl font-bold text-[#047857]">
                          Rs. {pkg.price}
                        </p>
                      </div>

                      <Link
                        to={`/package/${pkg.id}`}
                        className="text-sm font-semibold text-[#047857] hover:text-[#047857] transition-colors"
                      >
                        View →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-slate-500 dark:text-slate-600">
                No destinations found.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default Destination;