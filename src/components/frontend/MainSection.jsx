import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  FaChevronLeft,
  FaChevronRight,
  FaArrowRight,
  FaCompass,
  FaSuitcase,
  FaRoute,
  FaStar,
  FaUser,
} from "react-icons/fa";
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
  const { packages, fetchPackages, loading } = useFetchPackages();

  const banners = [
    {
      id: 1,
      image: "/images/banners/nature1.jpg",
      title: "TravelMate — Your Ultimate Travel Companion",
      description:
        "Discover the world with our curated travel packages and accessories",
    },
    {
      id: 2,
      image: "/images/banners/nature2.jpg",
      title: "Nature heals the soul",
      description:
        "Explore breathtaking landscapes and immerse yourself in nature's beauty with our travel packages",
    },
    {
      id: 3,
      image: "/images/banners/nature3.jpg",
      title: "Explore the world with TravelMate",
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
      setReviews(response.data.reviews);
    } catch (e) {
      console.log(
        "Error fetching reviews:",
        e.response?.data?.message || e.message,
      );
    }
  };

  return (
    <>
      {/* ==================== HERO ==================== */}
      <FramerMotion>
        <section className="relative w-full h-screen overflow-hidden bg-slate-900">
          {banners.map((banner, index) => (
            <img
              key={banner.id}
              src={banner.image}
              alt={banner.title}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute inset-0 bg-slate-950/55" />

          <div className="relative h-full flex items-center">
            <div className="container mx-auto px-6 lg:px-8">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-widest text-sky-400 mb-4">
                  Explore Nepal
                </p>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                  {banners[currentIndex].title}
                </h1>

                <p className="mt-6 text-base md:text-lg text-slate-200 leading-relaxed max-w-xl">
                  {banners[currentIndex].description}
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    to="/package"
                    className="inline-flex items-center gap-2 bg-sky-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-sky-600"
                  >
                    Book Now
                    <FaArrowRight className="text-xs" />
                  </Link>

                  <Link
                    to="/destination"
                    className="inline-flex items-center gap-2 border border-white/40 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                  >
                    Browse Destinations
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Slide indicators */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((b, i) => (
              <button
                key={b.id}
                aria-label={`Go to slide ${i + 1}`}
                onClick={() => setCurrentIndex(i)}
                className={`h-1 transition-all ${
                  i === currentIndex
                    ? "w-8 bg-sky-500"
                    : "w-4 bg-white/50 hover:bg-white/80"
                }`}
              />
            ))}
          </div>
        </section>
      </FramerMotion>

      {/* ==================== FEATURES ==================== */}
      <FramerMotion>
        <section className="bg-white dark:bg-slate-950 transition-colors duration-300">
          <div className="container mx-auto px-6 lg:px-8 py-14 lg:py-20">
            <div className="max-w-2xl mx-auto text-center mb-12">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-500 mb-3">
                Features
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                Everything you need for the perfect trip
              </h2>
              <p className="mt-4 text-base lg:text-lg leading-relaxed text-slate-500 dark:text-slate-400">
                From expert guides to custom packages — TravelMate gives you the
                tools to plan smarter journeys.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              <FeatureCard
                icon={FaCompass}
                title="Trekking Guides"
                description="Our expert trekking guides lead you through breathtaking trails, ensuring a safe and unforgettable adventure. Explore the great outdoors with confidence."
                link="/travel-guides"
              />
              <FeatureCard
                icon={FaSuitcase}
                title="Travel Accessories"
                description="Discover a curated range of travel accessories designed to enhance your journey — from durable luggage to essential travel gadgets."
                link="/accessories"
              />
              <FeatureCard
                icon={FaRoute}
                title="Custom Travel Packages"
                description="Create your own adventure. Choose destinations, activities, and accommodations to design a trip that fits your preferences."
                link="/tour-packages"
              />
            </div>
          </div>
        </section>
      </FramerMotion>

      {/* ==================== POPULAR PACKAGES ==================== */}
      <FramerMotion>
        <section className="bg-slate-50 dark:bg-slate-900 py-14 lg:py-20 transition-colors duration-300">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-sky-500 mb-3">
                  Featured
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                  Popular packages
                </h2>
              </div>

              <Link
                to="/package"
                className="inline-flex items-center gap-2 text-sm font-semibold text-sky-500 hover:text-sky-600 transition-colors"
              >
                See all
                <FaArrowRight className="text-xs" />
              </Link>
            </div>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden animate-pulse"
                  >
                    <div className="w-full h-56 bg-slate-200 dark:bg-slate-800" />
                    <div className="p-4">
                      <div className="h-5 bg-slate-200 dark:bg-slate-800 w-3/4" />
                      <div className="mt-2 h-4 bg-slate-200 dark:bg-slate-800 w-1/2" />
                      <div className="mt-6 flex items-center justify-between">
                        <div>
                          <div className="h-3 bg-slate-200 dark:bg-slate-800 w-10" />
                          <div className="h-6 bg-slate-200 dark:bg-slate-800 w-20 mt-2" />
                        </div>
                        <div className="h-4 bg-slate-200 dark:bg-slate-800 w-12" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : packages.length > 0 ? (
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
                    320: { slidesPerView: 1 },
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                  }}
                >
                  {packages.map((pkg) => (
                    <SwiperSlide key={pkg.id}>
                      <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 overflow-hidden">
                        <img
                          src={`http://localhost:8000/storage/${pkg.featured_image}`}
                          alt={pkg.title}
                          className="w-full h-56 object-cover"
                        />

                        <div className="p-4">
                          <h2 className="font-semibold text-base text-slate-900 dark:text-white line-clamp-2 leading-snug min-h-[2.75rem]">
                            {pkg.title}
                          </h2>

                          <div className="mt-4 flex items-end justify-between">
                            <div>
                              <p className="text-xs uppercase tracking-wide text-slate-400">
                                From
                              </p>
                              <p className="text-xl font-bold text-sky-500">
                                Rs. {pkg.price}
                              </p>
                            </div>

                            <Link
                              to={`/package/${pkg.id}`}
                              className="text-sm font-semibold text-sky-500 hover:text-sky-600 transition-colors"
                            >
                              View →
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Navigation */}
                <div className="flex justify-center mt-8 gap-3">
                  <button
                    aria-label="Previous"
                    className="prev-btn grid place-items-center w-10 h-10 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors hover:border-sky-500 hover:text-sky-500"
                  >
                    <FaChevronLeft className="text-sm" />
                  </button>

                  <button
                    aria-label="Next"
                    className="next-btn grid place-items-center w-10 h-10 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 transition-colors hover:border-sky-500 hover:text-sky-500"
                  >
                    <FaChevronRight className="text-sm" />
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-slate-500 dark:text-slate-400">
                  No travel packages available.
                </p>
              </div>
            )}
          </div>
        </section>
      </FramerMotion>

      {/* ==================== DESTINATIONS ==================== */}
      <FramerMotion>
        <section className="bg-white dark:bg-slate-950 py-14 lg:py-20 transition-colors duration-300">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-500 mb-3">
                Destinations
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                Where will you go next?
              </h2>
              <p className="mt-4 text-base lg:text-lg leading-relaxed text-slate-500 dark:text-slate-400">
                From Himalayan peaks to jungle safaris — pick a region and start
                planning.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Featured */}
              <Link
                to="/destinations/everest"
                className="sm:col-span-2 lg:col-span-2 lg:row-span-2 block relative overflow-hidden"
              >
                <img
                  src="/images/destinations/gallery5.jpg"
                  alt="Everest Base Camp"
                  loading="lazy"
                  className="w-full h-72 lg:h-full object-cover"
                />
                <div className="absolute inset-0 bg-slate-950/45" />

                <div className="absolute inset-x-0 bottom-0 p-6 lg:p-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2">
                    14 days · Trekking
                  </p>
                  <h3 className="text-2xl lg:text-3xl font-bold text-white">
                    Everest Base Camp
                  </h3>
                  <p className="mt-2 text-sm text-slate-200 max-w-md">
                    Walk the legendary trail to the roof of the world.
                  </p>

                  <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-400">
                    Explore
                    <FaArrowRight className="text-xs" />
                  </span>
                </div>
              </Link>

              <DestinationCard
                image="/images/destinations/gallery1.jpg"
                alt="Annapurna Circuit"
                duration="12 days · Trekking"
                name="Annapurna Circuit"
                tagline="Circle the majestic Annapurna massif."
                to="/destinations/annapurna"
              />

              <DestinationCard
                image="/images/destinations/gallery2.jpg"
                alt="Pokhara"
                duration="5 days · Lakeside"
                name="Pokhara"
                tagline="Lakes, paragliding, and mountain views."
                to="/destinations/pokhara"
              />

              <DestinationCard
                image="/images/wildlifesafari/chitwan1.jpg"
                alt="Chitwan National Park"
                duration="3 days · Wildlife"
                name="Chitwan Safari"
                tagline="Jungle safaris and rare wildlife encounters."
                to="/destinations/chitwan"
              />

              <DestinationCard
                image="/images/tour/lumbini1.jpg"
                alt="Lumbini"
                duration="2 days · Heritage"
                name="Lumbini"
                tagline="Birthplace of Buddha and a UNESCO site."
                to="destination"
              />
            </div>
          </div>
        </section>
      </FramerMotion>

      {/* ==================== TESTIMONIALS ==================== */}
      <FramerMotion>
        <section className="bg-white dark:bg-slate-950 py-14 lg:py-20 transition-colors duration-300">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center mb-10">
              <p className="text-sm font-semibold uppercase tracking-widest text-sky-500 mb-3">
                Testimonials
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white leading-tight">
                What travelers say
              </h2>
              <p className="mt-4 text-base lg:text-lg text-slate-500 dark:text-slate-400 leading-relaxed">
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
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
              }}
            >
              {reviews.map((review) => (
                <SwiperSlide key={review.id} className="!h-auto">
                  <TestimonialCard review={review} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>
      </FramerMotion>
    </>
  );
}

/* ---------- Subcomponents ---------- */

function FeatureCard({ icon: Icon, title, description, link }) {
  return (
    <div className="flex flex-col h-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-8">
      <div className="w-12 h-12 grid place-items-center border border-sky-500/30 text-sky-500 mb-6">
        <Icon className="h-5 w-5" />
      </div>

      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
        {title}
      </h3>

      <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 grow">
        {description}
      </p>

      <Link
        to={link}
        className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-sky-500 hover:text-sky-600 transition-colors"
      >
        Learn more
        <FaArrowRight className="text-xs" />
      </Link>
    </div>
  );
}

function DestinationCard({ image, alt, duration, name, tagline, to }) {
  return (
    <Link to={to} className="block relative overflow-hidden">
      <img
        src={image}
        alt={alt}
        loading="lazy"
        className="w-full h-72 object-cover"
      />
      <div className="absolute inset-0 bg-slate-950/45" />

      <div className="absolute inset-x-0 bottom-0 p-6">
        <p className="text-xs font-semibold uppercase tracking-widest text-sky-400 mb-2">
          {duration}
        </p>
        <h3 className="text-xl font-bold text-white">{name}</h3>
        <p className="mt-1 text-sm text-slate-200 line-clamp-1">{tagline}</p>
      </div>
    </Link>
  );
}

function TestimonialCard({ review }) {
  return (
    <div className="h-full border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6">
      {/* User */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 grid place-items-center border border-sky-500/30 text-sky-500 shrink-0">
          <FaUser className="text-sm" />
        </div>
        <div className="min-w-0">
          <h3 className="font-semibold text-slate-900 dark:text-white truncate">
            {review.user?.name}
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
            {review.user?.location}
          </p>
        </div>
      </div>

      {/* Rating */}
      <div className="flex gap-0.5 text-amber-400 mb-3">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className="text-sm">
            {star <= review.rating ? "★" : "☆"}
          </span>
        ))}
      </div>

      {/* Review */}
      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
        {review.comment}
      </p>
    </div>
  );
}

export default MainSection;
