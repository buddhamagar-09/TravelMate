import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight, FaUser } from "react-icons/fa";
import useFetchPackages from "../Hook/FetchPackages";
import api from "../../api/axios";

// for swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// for animations
import FramerMotion from "../Hook/FramerMotion";

import "swiper/css";
import "swiper/css/navigation";

function MainSection() {
  const { packages, fetchPackages, loading, setPackages } = useFetchPackages();
  const banners = [
    {
      id: 1,
      image: "images/banners/nature1.jpg",
      title: "TravelMate - Your Ultimate travel Companion",
      description:
        "Discover the world with our curated travel packages and accessories",
    },
    {
      id: 2,
      image: "images/banners/nature2.jpg",
      title:
        "Nature heals the soul, and we have the perfect packages for your next adventure",
      description:
        "Explore breathtaking landscapes and immerse yourself in nature's beauty with our travel packages",
    },
    {
      id: 3,
      image: "images/banners/nature3.jpg",
      title: "Explore the world with TravelMate - Your trusted travel partner",
      description:
        "Embark on unforgettable journeys and create lifelong memories with our travel packages",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [reviews, setReviews] = useState([]);


  useEffect(() => {
    fetchPackages();
    fetchReviews();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await api.get("/show-reviews");
      console.log("Fetched reviews:", response.data.reviews);
      setReviews(response.data.reviews);
    } catch (e) {
      console.log(
        "Error fetching reviews:",
        e.response?.data?.message || e.message,
      );
    }
  };

  // Testimonials data
  // const reviews = [
  //   {
  //     id: 1,
  //     name: "Sarah Johnson",
  //     country: "Australia",
  //     rating: 5,
  //     comment:
  //       "Amazing Everest Base Camp experience. The guides were professional and supportive throughout the trek.",
  //     image: "/images/trekking/everest.jpg",
  //   },
  //   {
  //     id: 2,
  //     name: "David Miller",
  //     country: "Canada",
  //     rating: 5,
  //     comment:
  //       "Well-organized itinerary and breathtaking Himalayan views from Kala Patthar.",
  //     image: "/images/trekking/annapurna.jpg",
  //   },
  //   {
  //     id: 3,
  //     name: "Maya Shrestha",
  //     country: "Nepal",
  //     rating: 5,
  //     comment:
  //       "Excellent local knowledge, comfortable tea houses, and great support from the TravelMate team.",
  //     image: "/images/trekking/dhorpatan.jpg",
  //   },
  //   {
  //     id: 4,
  //     name: "Preyeana Tamang",
  //     country: "Nepal",
  //     rating: 5,
  //     comment:
  //       "Excellent local knowledge, comfortable tea houses, and great support from the TravelMate team.",
  //     image: "/images/trekking/annapurna.jpg",
  //   },
  // ];

  return (
    <>
      {/* Main banner starts here */}

      <FramerMotion>
        <section className="relative w-full h-screen overflow-hidden">
          {/* Banner Images */}
          {banners.map((banner, index) => (
            <img
              key={banner.id}
              src={banner.image}
              alt={banner.title}
              lazy="loading"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40"></div>

          {/* Banner Content */}
          <div className="absolute inset-0 flex flex-col justify-center items-start px-6 md:px-16 lg:px-24">
            <div className="max-w-2xl">
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white">
                {banners[currentIndex].title}
              </h2>

              <p className="text-gray-200 text-lg mt-4 max-w-xl">
                {banners[currentIndex].description}
              </p>

              <Link
                to="/package"
                className="inline-block mt-6 bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition"
              >
                Book Now
              </Link>
            </div>
          </div>
        </section>
      </FramerMotion>

      {/* <!-- main banner ends here --> */}
      {/* features section starts here */}
      <FramerMotion>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-14 mx-auto">
            <div className="flex flex-col text-center w-full mb-20">
              <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
                FEATURES
              </h2>
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
                TravelMate - Your Ultimate Travel Companion
              </h1>
            </div>
            <div className="flex flex-wrap -m-4">
              <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <h2 className="text-gray-900 text-lg title-font font-medium">
                      Trekking Guides
                    </h2>
                  </div>
                  <div className="grow">
                    <p className="leading-relaxed text-base">
                      Our expert trekking guides will lead you through
                      breathtaking trails, ensuring a safe and unforgettable
                      adventure. Explore the great outdoors with confidence and
                      make memories that will last a lifetime.
                    </p>
                    <a className="mt-3 text-indigo-500 inline-flex items-center">
                      Learn More
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <h2 className="text-gray-900 text-lg title-font font-medium">
                      Travel Accessories
                    </h2>
                  </div>
                  <div className="grow">
                    <p className="leading-relaxed text-base">
                      Discover our range of travel accessories designed to
                      enhance your journey. From durable luggage to essential
                      travel gadgets, we have everything you need for a
                      comfortable and convenient trip.
                    </p>
                    <a className="mt-3 text-indigo-500 inline-flex items-center">
                      Learn More
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-4 md:w-1/3">
                <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                  <div className="flex items-center mb-3">
                    <h2 className="text-gray-900 text-lg title-font font-medium">
                      Custom Travel Packages
                    </h2>
                  </div>
                  <div className="grow">
                    <p className="leading-relaxed text-base">
                      Create your own travel adventure with our custom travel
                      packages. Choose your destinations, activities, and
                      accommodations to design a trip that perfectly suits your
                      preferences and interests.
                    </p>
                    <a className="mt-3 text-indigo-500 inline-flex items-center">
                      Learn More
                      <svg
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        className="w-4 h-4 ml-2"
                        viewBox="0 0 24 24"
                      >
                        <path d="M5 12h14M12 5l7 7-7 7"></path>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </FramerMotion>
      {/* features section ends here */}

      {/* packages section starts here */}
      {/* Popular Packages */}
      <section className="text-gray-600 body-font">
        {/* Heading */}
        <div className="container mx-auto px-5">
          <div className="flex items-center justify-between">
            <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
              Our Popular Travel Packages
            </h1>

            <Link
              to="/package"
              className="text-sm sm:text-base text-indigo-500 hover:text-indigo-600 font-semibold whitespace-nowrap"
            >
              See All →
            </Link>
          </div>
        </div>

        <FramerMotion>
          <div className="container max-w-7xl mx-auto px-5 py-10">
            {loading ? (
              /* Loading Skeleton */
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[1, 2, 3, 4].map((item) => (
                    <div
                      key={item}
                      className="bg-white border border-gray-200 overflow-hidden rounded-lg shadow-sm animate-pulse"
                    >
                      {/* Image skeleton */}
                      <div className="w-full h-56 bg-gray-200"></div>

                      {/* Content skeleton */}
                      <div className="p-4">
                        <div className="h-6 bg-gray-200 rounded w-3/4"></div>

                        <div className="mt-2 h-5 bg-gray-200 rounded w-1/2"></div>

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

                {/* Skeleton navigation buttons */}
                <div className="flex justify-center mt-10 gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                  <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                </div>
              </>
            ) : packages.length > 0 ? (
              /* Actual Swiper */
              <>
                <Swiper
                  modules={[Navigation, Autoplay]}
                  navigation={{
                    prevEl: ".prev-btn",
                    nextEl: ".next-btn",
                  }}
                  autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                  }}
                  loop={packages.length > 4}
                  spaceBetween={20}
                  breakpoints={{
                    320: {
                      slidesPerView: 1,
                    },
                    768: {
                      slidesPerView: 2,
                    },
                    1024: {
                      slidesPerView: 4,
                    },
                  }}
                >
                  {packages.map((pkg) => (
                    <SwiperSlide key={pkg.id}>
                      <div className="bg-white border border-gray-200 overflow-hidden rounded-lg shadow-sm">
                        <img
                          src={`http://localhost:8000/storage/${pkg.featured_image}`}
                          alt={pkg.title}
                          className="w-full h-56 object-cover"
                        />

                        <div className="p-4">
                          <h2 className="font-semibold text-lg text-black line-clamp-2 h-14">
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
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Navigation Buttons */}
                <div className="flex justify-center mt-10 gap-4">
                  <button className="prev-btn bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                    <FaChevronLeft />
                  </button>

                  <button className="next-btn bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
                    <FaChevronRight />
                  </button>
                </div>
              </>
            ) : (
              /* No Packages */
              <div className="text-center py-10">
                <p className="text-gray-500">No travel packages available.</p>
              </div>
            )}
          </div>
        </FramerMotion>
      </section>

      {/* Gallery */}

      <FramerMotion>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-10 mx-auto flex flex-wrap">
            <div className="flex w-full mb-15 flex-wrap">
              <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
                Our Travel Gallery
              </h1>
              <p className="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
                Gallery of our travel experiences and destinations. Explore the
                beauty of the world through our curated collection of images.
              </p>
            </div>
            <div className="flex flex-wrap md:-m-2 -m-1">
              <div className="flex flex-wrap w-1/2">
                <div className="md:p-2 p-1 w-1/2">
                  <img
                    alt="gallery"
                    className="w-full object-cover h-full object-center block"
                    src="images/Gallery/gallery1.jpg"
                  />
                </div>
                <div className="md:p-2 p-1 w-1/2">
                  <img
                    alt="gallery"
                    className="w-full object-cover h-full object-center block"
                    src="images/Gallery/gallery2.jpg"
                  />
                </div>
                <div className="md:p-2 p-1 w-full">
                  <img
                    alt="gallery"
                    className="w-full h-full object-cover object-center block"
                    src="images/Gallery/gallery3.jpg"
                  />
                </div>
              </div>
              <div className="flex flex-wrap w-1/2">
                <div className="md:p-2 p-1 w-full">
                  <img
                    alt="gallery"
                    className="w-full h-full object-cover object-center block"
                    src="images/Gallery/gallery4.jpg"
                  />
                </div>
                <div className="md:p-2 p-1 w-1/2">
                  <img
                    alt="gallery"
                    className="w-full object-cover h-full object-center block"
                    src="images/Gallery/gallery5.jpg"
                  />
                </div>
                <div className="md:p-2 p-1 w-1/2">
                  <img
                    alt="gallery"
                    className="w-full object-cover h-full object-center block"
                    src="images/Gallery/gallery6.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </FramerMotion>
      {/* Gallery section ends here */}

      <FramerMotion>
        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-5">
            {/* Heading */}
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-3">
                What Travelers Say
              </h2>

              <p className="text-gray-600 max-w-2xl mx-auto">
                Reviews from travelers who experienced unforgettable journeys
                with TravelMate.
              </p>
            </div>

            <Swiper
              modules={[Autoplay]}
              spaceBetween={24}
              slidesPerView={1}
              loop={reviews.length > 3}
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
                      <FaUser size={40} className="text-gray-500" />
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {review.user?.name}
                        </h3>

                        <p className="text-sm text-gray-500">
                          {review.user?.location}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex text-yellow-400 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <span key={star}>
                          {star <= review.rating ? "★" : "☆"}
                        </span>
                      ))}
                    </div>

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
      </FramerMotion>
    </>
  );
}

export default MainSection;
