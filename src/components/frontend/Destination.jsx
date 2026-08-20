import React,{useEffect} from "react";
import { Link } from "react-router-dom";

import FramerMotion from "../Hook/FramerMotion";
import useFetchPackages from "../Hook/FetchPackages";

function Destination() {
  const { packages, fetchPackages, loading, setPackages } = useFetchPackages();
  useEffect(() => {
   window.scrollTo(0, 0); 
  }, []);
  return (
    <>
      <section className="text-gray-600 body-font">
        <h1 className="text-3xl font-bold text-center mt-9">
          Popular Destinations
        </h1>

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
      </section>
    </>
  );
}

export default Destination;
