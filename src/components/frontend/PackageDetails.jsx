import { Link, useLoaderData, useNavigate } from "react-router-dom";

import { useState } from "react";
import useFetchPackages from "../Hook/FetchPackages";

// Lightbox zoom plugin for image gallery
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";
import { useParams } from "react-router-dom";

// swiper animation
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

function PackageDetails() {
  const { packages, fetchPackages, loading, setPackages } = useFetchPackages();
  const { id } = useParams();
  const navigate = useNavigate();

  console.log(id);
  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const reviews = [
    {
      id: 1,
      name: "Sarah Johnson",
      country: "Australia",
      rating: 5,
      comment:
        "Amazing Everest Base Camp experience. The guides were professional and supportive throughout the trek.",
      image: "/images/trekking/everest.jpg",
    },
    {
      id: 2,
      name: "David Miller",
      country: "Canada",
      rating: 5,
      comment:
        "Well-organized itinerary and breathtaking Himalayan views from Kala Patthar.",
      image: "/images/trekking/annapurna.jpg",
    },
    {
      id: 3,
      name: "Maya Shrestha",
      country: "Nepal",
      rating: 5,
      comment:
        "Excellent local knowledge, comfortable tea houses, and great support from the TravelMate team.",
      image: "/images/trekking/dhorpatan.jpg",
    },
    {
      id: 4,
      name: "Preyeana Tamang",
      country: "Nepal",
      rating: 5,
      comment:
        "Excellent local knowledge, comfortable tea houses, and great support from the TravelMate team.",
      image: "/images/trekking/annapurna.jpg",
    },
  ];

  const handleBooking = () => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login", {
        state: {
          redirectTo: `/bookingform/${id}`,
        },
      });
      return;
    } else {
      navigate(`/bookingform/${id}`);
    }
  };
  return (
    <>
      <section className="text-gray-600 body-font">
        {packages
          .filter((pkg) => pkg.id == id)
          .map((pkg,index) => (
            <div
              key={index}
              className="container px-5 py-10 mx-auto flex flex-col"
            >
              <div className="lg:w-4/6 mx-auto">
                <div className="rounded-lg h-64 overflow-hidden">
                  <img
                    alt="content"
                    className="object-cover object-center h-full w-full"
                    src={`http://localhost:8000/storage/${pkg.featured_image}`}
                  />
                </div>
                <div className="flex flex-col sm:flex-row mt-10">
                  <div className="sm:w-1/3 text-center sm:pr-8 sm:py-8">
                    <div className="flex flex-col justify-center">
                      {/* <!-- Package Title --> */}
                      <h2 className="text-3xl font-bold text-gray-900 mb-3">
                        {pkg.title}
                      </h2>

                      {/* <!-- Short Description --> */}
                      <p className="text-gray-600 leading-relaxed mb-4 text-justify">
                        {pkg.short_description}
                      </p>

                      {/* <!-- Trek Details --> */}
                      <div className="mb-8">
                        <h3 className="text-lg font-semibold  mb-4 bg-blue-600 text-white px-3 py-1 rounded-md inline-block">
                          Trek Highlights
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-8">
                          <div className="flex items-center gap-3">
                            <span className="text-indigo-600 font-bold">✓</span>
                            <span className="text-gray-700">
                              Visit Everest Base Camp
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-indigo-600 font-bold">✓</span>
                            <span className="text-gray-700">
                              Sunrise at Kala Patthar
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-indigo-600 font-bold">✓</span>
                            <span className="text-gray-700">
                              Experience Sherpa culture
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-indigo-600 font-bold">✓</span>
                            <span className="text-gray-700">
                              Explore Sagarmatha National Park
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-indigo-600 font-bold">✓</span>
                            <span className="text-gray-700">
                              Visit Namche Bazaar
                            </span>
                          </div>

                          <div className="flex items-center gap-3">
                            <span className="text-indigo-600 font-bold">✓</span>
                            <span className="text-gray-700">
                              Tengboche Monastery
                            </span>
                          </div>
                        </div>
                      </div>
                      {/* <!-- Price --> */}
                      <div className="mb-6 flex flex-col items-start">
                        <p className="text-gray-500 text-sm">Starting From</p>
                        <div className="ml-2 flex items-baseline gap-2">
                          <h3 className="text-3xl font-bold text-blue-600">
                            ${pkg.price}
                          </h3>
                          <p className="text-gray-500 text-sm mt-1">
                            Per Person
                          </p>
                        </div>
                      </div>

                      {/* <!-- Book Button -->
                      <div className="flex gap-4 mb-8">
                        <Link
                          to=""
                          className="px-8 py-3 border bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                        >
                          View Itinerary
                        </Link>
                      </div> */}
                    </div>
                  </div>

                  {/* Right side section */}

                  <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-gray-200 sm:border-t-0 border-t mt-4 pt-4 sm:mt-0 text-center sm:text-left">
                    <p className="leading-relaxed text-lg mb-4 text-justify">
                      {pkg.long_description}
                    </p>

                    <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
                      <div className="mb-6 ">
                        <p className="text-sm text-gray-500">Starting From</p>
                        <h2 className="text-3xl font-bold text-blue-600">
                          ${pkg.price}
                          <span className="text-base font-normal text-gray-500">
                            {" "}
                            per person
                          </span>
                        </h2>
                      </div>

                      {/* <form className="space-y-5">
                        <div>
                          <label
                            htmlFor="travel-date"
                            className="mb-2 block text-sm font-medium text-gray-700"
                          >
                            Travel Date
                          </label>

                          <input
                            type="date"
                            id="travel-date"
                            className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                          />
                        </div>

                        <div>
                          <label
                            htmlFor="travelers"
                            className="mb-2 block text-sm font-medium text-gray-700"
                          >
                            Number of Travelers
                          </label>

                          <input
                            type="number"
                            id="travelers"
                            min="1"
                            placeholder="Enter number of travelers"
                            className="w-full rounded-md border border-gray-300 px-4 py-3 text-gray-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                          />
                        </div>

                        <button
                          type="button"
                          onClick={handleBooking}
                          className="w-full rounded-md bg-blue-600 cursor-pointer px-4 py-3 text-white font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        >
                          Book Now
                        </button>
                      </form> */}

                      <div className="mt-6 border-t border-gray-200 pt-5 space-y-3 text-sm text-gray-600">
                        <div className="flex items-center gap-3">
                          <span className="text-green-500 text-lg">✔</span>
                          <p>
                            Free cancellation up to 24 hours before departure.
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-blue-500 text-lg">🕒</span>
                          <p>24/7 customer support throughout your journey.</p>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-pink-500 text-lg">📷</span>
                          <p>
                            Follow us on Instagram:
                            <a
                              href="#"
                              className="ml-1 font-medium text-blue-600 hover:underline"
                            >
                              @travelmate
                            </a>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </section>

      {/* Quick Information Section */}
      <section className="bg-white py-10">
        {packages
          .filter((pkg) => pkg.id == id)
          .map((pkg,index) => (
            <div key={index} className="max-w-7xl mx-auto px-5">
              {/* Heading */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  Quick Information
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Everything you need to know before booking your {pkg.title}
                  Trek.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-10">
                {/* Left */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    Quick Information
                  </h2>

                  <p className="text-gray-600 mb-8">
                    Important details about the {pkg.title} Trek.
                  </p>

                  <div className="grid grid-cols-2 gap-x-10 gap-y-5 text-sm">
                    <div className="border-b pb-3">
                      <p className="font-bold text-blue-600">Duration</p>
                      <p className="text-gray-600">{pkg.duration}</p>
                    </div>

                    <div className="border-b pb-3">
                      <p className="font-bold text-blue-600">Location</p>
                      <p className="text-gray-600">{pkg.location}</p>
                    </div>

                    <div className="border-b pb-3">
                      <p className="font-bold text-blue-600">Difficulty</p>
                      <p className="text-gray-600">{pkg.difficulty}</p>
                    </div>

                    <div className="border-b pb-3">
                      <p className="font-bold text-blue-600">Best Season</p>
                      <p className="text-gray-600">{pkg.best_season}</p>
                    </div>

                    <div className="border-b pb-3">
                      <p className="font-bold text-blue-600">
                        Maximum Altitude
                      </p>
                      <p className="text-gray-600">{pkg.max_altitude} m</p>
                    </div>

                    {/* <div className="border-b pb-3">
                  <p className="font-bold text-blue-600">Accommodation</p>
                  <p className="text-gray-600">{pkg.accommodation}</p>
                </div> */}

                    <div className="border-b pb-3">
                      <p className="font-bold text-blue-600">Meals</p>
                      <p className="text-gray-600">Breakfast, Lunch & Dinner</p>
                    </div>

                    <div className="border-b pb-3">
                      <p className="font-bold text-blue-600">Group Size</p>
                      <p className="text-gray-600">{pkg.group_size}</p>
                    </div>
                  </div>
                </div>
                {/* Right Itinerary */}
                <div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">
                    {pkg.title} Itinerary
                  </h2>

                  <p className="text-gray-600 mb-8">
                    Day-by-day trek schedule.
                  </p>

                  {pkg.itineraries.map((itinerary, index) => (
                    <div key={index} className="space-y-6">
                      <div className="flex gap-4 border-b pb-5">
                        <div className="font-bold text-blue-600">
                          {itinerary.day}
                        </div>
                        <div>
                          <h3 className="font-bold text-blue-600">
                            {itinerary.title}
                          </h3>
                          <p className="text-gray-600">
                            {itinerary.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
      </section>

      {/* whats included and whats not included */}
      <section className="text-gray-600 body-font py-10 bg-white">
        {packages
          .filter((pkg) => pkg.id == id)
          .map((pkg,index) => (
            <div key={index} className="max-w-7xl mx-auto px-5">
              {/* Heading */}
              <div className="text-center mb-14">
                <h2 className="text-3xl font-bold text-gray-900 mb-3">
                  What's Included & Excluded
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  A clear overview of what is covered in your package and what
                  is not.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-12">
                {/* Included */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-blue-600 ">
                      What's Included
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {pkg.includes.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3"
                      >
                        <svg
                          className="w-5 h-5 text-green-600 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="font-medium text-gray-800">
                          {item.item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Not Included */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                      <svg
                        className="w-5 h-5 text-red-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-semibold text-blue-600 ">
                      What's Not Included
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {pkg.excludes.map((item, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3"
                      >
                        <svg
                          className="w-5 h-5 text-red-500 shrink-0"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                        <span className="font-medium text-gray-800">
                          {item.item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </section>

      {/* Gallery Section */}
      <section className="py-10 bg-white">
        {packages
          .filter((pkg) => pkg.id == id)
          .map((pkg,index) => (
            <div key={index} className="max-w-7xl mx-auto px-5">
              {/* Section Heading */}
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold text-gray-900">
                  Travel Gallery
                </h2>

                <p className="mt-3 text-gray-600 max-w-2xl mx-auto">
                  Explore breathtaking moments from the Everest Base Camp Trek.
                </p>
              </div>

              {/* Gallery */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {pkg.galleries.map((image, i) => (
                  <div
                    key={i}
                    className="overflow-hidden rounded-xl cursor-pointer group"
                    onClick={() => {
                      setIndex(i);
                      setOpen(true);
                    }}
                  >
                    <img
                      src={`http://localhost:8000/storage/${image.image_path}`}
                      alt={`Gallery ${i + 1}`}
                      className="h-72 w-full object-cover transition duration-300 "
                    />
                  </div>
                ))}
              </div>

              {/* Lightbox */}
              <Lightbox
                open={open}
                close={() => setOpen(false)}
                index={index}
                slides={pkg.galleries.map((img) => ({
                  src: `http://localhost:8000/storage/${img.image_path}`,
                }))}
                plugins={[Zoom]}
              />
            </div>
          ))}
      </section>

      {/* testimonials */}
      <section className="py-10 bg-white">
        <div className="max-w-7xl mx-auto px-5">
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              What Travelers Say
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Reviews from trekkers who completed the Everest Base Camp journey
              with TravelMate.
            </p>
          </div>

          <Swiper
            modules={[Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            breakpoints={{
              768: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="pb-8"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review.id} className="h-auto">
                <div className="h-full pb-6 border-b md:border-b-0 md:border-r border-gray-200 pr-0 md:pr-6">
                  {/* User */}
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover"
                    />

                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {review.name}
                      </h3>

                      <p className="text-sm text-gray-500">{review.location}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex text-yellow-400 mb-3">★★★★★</div>

                  {/* Review */}
                  <p className="text-gray-600 leading-relaxed">
                    {review.comment}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* CTA section */}
      <section className="text-gray-600 body-font py-10 bg-white">
        <div className="max-w-7xl mx-auto px-5 flex flex-wrap items-center">
          {/* Left Content */}
          <div className="lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-20 pr-0">
            <p className="text-blue-600 font-semibold tracking-wide uppercase mb-3">
              Ready to Trek?
            </p>

            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
              Start Your Everest Base Camp Adventure
            </h2>

            <p className="text-lg leading-relaxed text-gray-600 mb-8">
              Join experienced local guides, trek through the Khumbu region, and
              experience the beauty of the Himalayas on a carefully planned
              Everest Base Camp journey.
            </p>

            <div className="flex flex-wrap gap-6 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Flexible departure dates</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>Local expert guides</span>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-green-600">✓</span>
                <span>24/7 travel support</span>
              </div>
            </div>
          </div>

          {/* Right CTA Card */}
          {packages
            .filter((pkg) => pkg.id == id)
            .map((pkg,index) => (
              <div key={index} className="lg:w-2/5 md:w-1/2 w-full mt-10 md:mt-0">
                <div className=" border border-gray-200 p-8 shadow-sm">
                  {/* <div className="mb-6">
                <p className="text-sm uppercase tracking-wider text-blue-600 font-semibold">
                  Starting From
                </p>

                <h3 className="text-4xl font-bold text-gray-900 mt-2">
                  Rs. {pkg.price}
                </h3>

                <p className="text-sm text-gray-500">Per Person</p>
              </div> */}

                  {/* <div className="space-y-4 border-t border-b border-gray-200 py-6">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{pkg.duration}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Difficulty</span>
                  <span className="font-semibold">{pkg.difficulty}</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Group Size</span>
                  <span className="font-semibold">{pkg.group_size} People</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Best Season</span>
                  <span className="font-semibold">{pkg.best_season}</span>
                </div>
              </div> */}

                  <div className="mt-6 space-y-3 text-sm text-gray-600">
                    <div className="flex items-center gap-3">
                      <span className="text-green-600">✔</span>
                      <span>Free cancellation up to 24 hours.</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-green-600">✔</span>
                      <span>Professional licensed trekking guides.</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-green-600">✔</span>
                      <span>No hidden costs or extra charges.</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-green-600">✔</span>
                      <span>
                        24/7 customer support before and during your trip.
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleBooking}
                    className="mt-8 w-full bg-blue-600 py-4 text-white font-semibold hover:bg-blue-700 transition"
                  >
                    Book This Trek
                  </button>

                  <p className="mt-4 text-center text-xs text-gray-500">
                    Secure booking • Instant confirmation • Trusted by hundreds
                    of travelers
                  </p>
                </div>
              </div>
            ))}
        </div>
      </section>
    </>
  );
}

export default PackageDetails;
