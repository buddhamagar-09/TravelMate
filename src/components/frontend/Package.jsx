import React from "react";
import { Link } from "react-router-dom";

import FramerMotion from "../Theme/FramerMotion";
function Package() {
  return (
    <>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-14 mx-auto">
          <div className="flex flex-wrap -m-4">
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="images/trekking/dhorpatan.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Package Tour{" "}
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Dhorpatan Hunting Reserve
                </h2>
                <div className="mt-1 flex items-center justify-between">
                  <p className="">$16.00</p>
                  <Link
                    to={`/package/${1}`}
                    className="text-blue-500 hover:text-blue-700 font-bold pr-5"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="images/trekking/everest.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Trekking
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Everest Base Camp Trek
                </h2>
                <div className="mt-1 flex items-center justify-between">
                  <p className="">$16.00</p>
                  <Link
                    to={`/package/${2}`}
                    className="text-blue-500 hover:text-blue-700 font-bold pr-5"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="images/trekking/badimalika.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Trekking
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Badimalika Trek
                </h2>
                <div className="mt-1 flex items-center justify-between">
                  <p className="">$12.00</p>
                  <Link
                    to={`/package/${3}`}
                    className="text-blue-500 hover:text-blue-700 font-bold pr-5"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="images/trekking/annapurna.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Trekking
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Annapurna Base Camp
                </h2>
                <div className="mt-1 flex items-center justify-between">
                  <p className="">$18.40</p>
                  <Link
                    to={`/package/${4}`}
                    className="text-blue-500 hover:text-blue-700 font-bold pr-5"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="images/trekking/ghorepani.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Trekking
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Ghorepani Poon Hill Trek
                </h2>
                <div className="mt-1 flex items-center justify-between">
                  <p className="">$16.00</p>
                  <Link
                    to={`/package/${5}`}
                    className="text-blue-500 hover:text-blue-700 font-bold pr-5"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="images/trekking/kori.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Trekking
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Kori Trek
                </h2>
                <div className="mt-1 flex items-center justify-between">
                  <p className="">$16.00</p>
                  <Link
                    to={`/package/${6}`}
                    className="text-blue-500 hover:text-blue-700 font-bold pr-5"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="images/trekking/mardihimal.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Trekking
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Mardi Himal Trek
                </h2>
                <div className="mt-1 flex items-center justify-between">
                  <p className="">$16.00</p>
                  <Link
                    to={`/package/${7}`}
                    className="text-blue-500 hover:text-blue-700 font-bold pr-5"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
              <a className="block relative h-48 rounded overflow-hidden">
                <img
                  alt="ecommerce"
                  className="object-cover object-center w-full h-full block"
                  src="images/trekking/muktinath.jpg"
                />
              </a>
              <div className="mt-4">
                <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                  Tour
                </h3>
                <h2 className="text-gray-900 title-font text-lg font-medium">
                  Muktinath Temple
                </h2>
                <div className="mt-1 flex items-center justify-between">
                  <p className="">$16.00</p>
                  <Link
                    to={`/package/${8}`}
                    className="text-blue-500 hover:text-blue-700 font-bold pr-5"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Package;
