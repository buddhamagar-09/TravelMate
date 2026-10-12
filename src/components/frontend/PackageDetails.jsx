import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../api/axios";
import { FaUser } from "react-icons/fa6";

import { useState, useEffect } from "react";
import useFetchPackages from "../Hook/FetchPackages";
import ReviewForm from "../Hook/ReviewForm";

// Lightbox zoom plugin for image gallery
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";

import "yet-another-react-lightbox/styles.css";

// swiper animation
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

import "swiper/css";

/* ---------- Category config ---------- */

const CATEGORY_CONFIG = {
  trekking: {
    label: "Trek",
    factsTitle: "Trek Facts",
    highlightsTitle: "Trek Highlights",
    bookLabel: "Book This Trek",
    sectionsSubtitle: (title) =>
      `Key details and day-by-day schedule for your ${title} trek.`,
  },
  tour: {
    label: "Tour",
    factsTitle: "Tour Facts",
    highlightsTitle: "Tour Highlights",
    bookLabel: "Book This Tour",
    sectionsSubtitle: (title) =>
      `Key details and day-by-day schedule for your ${title} tour.`,
  },
  wildlife: {
    label: "Safari",
    factsTitle: "Safari Facts",
    highlightsTitle: "Safari Highlights",
    bookLabel: "Book This Safari",
    sectionsSubtitle: (title) =>
      `Key details and day-by-day schedule for your ${title} safari.`,
  },
};

const getConfig = (category) =>
  CATEGORY_CONFIG[category] ?? CATEGORY_CONFIG.trekking;

/* ---------- Main component ---------- */

function PackageDetails() {
  const { packages, fetchPackages, loading } = useFetchPackages();
  const { id } = useParams();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
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

    fetchReviews();
  }, []);

  useEffect(() => {
    fetchPackages();
  }, []);

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
      {/* ============ PACKAGE DETAILS ============ */}
      <section className="bg-[#FFFFFF] dark:bg-[#FFFFFF] transition-colors duration-300">
        {loading ? (
          <div className="container mx-auto px-5 py-10">
            <div className="lg:w-4/6 mx-auto animate-pulse">
              <div className="h-64 bg-[#DCE7DE] dark:bg-[#EEF4EF]" />

              <div className="flex flex-col sm:flex-row mt-10">
                <div className="sm:w-1/3 sm:pr-8 sm:py-8">
                  <div className="h-8 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-3/4 mb-4" />
                  <div className="space-y-2 mb-8">
                    <div className="h-4 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-full" />
                    <div className="h-4 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-5/6" />
                    <div className="h-4 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-4/5" />
                  </div>
                  <div className="h-8 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-40 mb-5" />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((item) => (
                      <div key={item} className="flex items-center gap-3">
                        <div className="w-4 h-4 bg-[#DCE7DE] dark:bg-[#EEF4EF]" />
                        <div className="h-4 bg-[#DCE7DE] dark:bg-[#EEF4EF] flex-1" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-[#DDE7DF] dark:border-[#DDE7DF] mt-4 pt-4 sm:mt-0 sm:pt-0">
                  <div className="space-y-3">
                    <div className="h-5 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-full" />
                    <div className="h-5 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-full" />
                    <div className="h-5 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-5/6" />
                    <div className="h-5 bg-[#DCE7DE] dark:bg-[#EEF4EF] w-4/6" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          packages
            .filter((pkg) => pkg.id == id)
            .map((pkg) => {
              const config = getConfig(pkg.category);

              return (
                <div
                  key={pkg.id}
                  className="container px-5 py-10 mx-auto flex flex-col"
                >
                  <div className="lg:w-4/6 mx-auto">
                    {/* Featured Image */}
                    <div className="h-64 overflow-hidden">
                      <img
                        alt={pkg.title}
                        className="object-cover object-center h-full w-full"
                        src={`http://localhost:8000/storage/${pkg.featured_image}`}
                      />
                    </div>

                    {/* Content */}
                    <div className="flex flex-col sm:flex-row mt-10">
                      {/* Left Side */}
                      <div className="sm:w-1/3 sm:pr-8 sm:py-8">
                        <div className="flex flex-col">
                          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-900 mb-3">
                            {pkg.title}
                          </h2>

                          <p className="text-slate-600 dark:text-slate-600 leading-relaxed mb-4 text-justify">
                            {pkg.short_description}
                          </p>

                          {/* Highlights */}
                          <div className="mb-8">
                            <h3 className="text-xs font-semibold uppercase tracking-widest text-[#065F46] mb-4">
                              {config.highlightsTitle}
                            </h3>

                            <ul className="space-y-2">
                              {pkg.trek_highlights?.map((highlight, index) => (
                                <li
                                  key={index}
                                  className="flex items-start gap-3"
                                >
                                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#065F46] shrink-0" />
                                  <span className="text-sm text-slate-700 dark:text-slate-700 leading-relaxed">
                                    {highlight.highlight}
                                  </span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Price */}
                          <div className="mb-6">
                            <p className="text-xs uppercase tracking-wide text-slate-400">
                              Starting from
                            </p>
                            <div className="mt-1 flex items-baseline gap-2">
                              <h3 className="text-3xl font-bold text-[#065F46]">
                                Rs. {pkg.price}
                              </h3>
                              <p className="text-sm text-slate-500 dark:text-slate-600">
                                per person
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right Side */}
                      <div className="sm:w-2/3 sm:pl-8 sm:py-8 sm:border-l border-[#DDE7DF] dark:border-[#DDE7DF] mt-4 pt-4 sm:mt-0 sm:pt-0">
                        <p className="leading-relaxed text-base text-slate-600 dark:text-slate-700 mb-4 text-justify">
                          {pkg.long_description}
                        </p>

                        {/* Price Card */}
                        <div className="mt-8 border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#FFFFFF] dark:bg-[#FFFFFF] p-6">
                          <div className="mb-6">
                            <p className="text-xs uppercase tracking-wide text-slate-400">
                              Starting from
                            </p>
                            <h2 className="text-2xl font-bold text-[#065F46] mt-1">
                              Rs. {pkg.price}{" "}
                              <span className="text-sm font-normal text-slate-500 dark:text-slate-600">
                                per person
                              </span>
                            </h2>
                          </div>

                          {/* Benefits */}
                          <div className="mt-6 border-t border-[#DDE7DF] dark:border-[#DDE7DF] pt-5 space-y-3 text-sm text-slate-600 dark:text-slate-700">
                            <BenefitItem text="Free cancellation up to 24 hours before departure." />
                            <BenefitItem text="24/7 customer support throughout your journey." />
                            <div className="flex items-start gap-3">
                              <span className="text-[#065F46]">→</span>
                              <p>
                                Follow us on Instagram:{" "}
                                <a
                                  href="#"
                                  className="font-medium text-[#065F46] hover:text-[#065F46] hover:underline"
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
              );
            })
        )}
      </section>

      {/* ============ QUICK INFORMATION ============ */}
      <section className="bg-[#EEF4EF] dark:bg-[#FFFFFF] py-14 lg:py-20 transition-colors duration-300">
        {packages
          .filter((pkg) => pkg.id == id)
          .map((pkg) => {
            const config = getConfig(pkg.category);

            return (
              <div key={pkg.id} className="max-w-7xl mx-auto px-5">
                {/* Heading */}
                <div className="mb-12">
                  <p className="text-sm font-semibold uppercase tracking-widest text-[#065F46] mb-3">
                    Quick Information
                  </p>
                  <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-900 mb-3">
                    Everything you need to know
                  </h2>
                  <p className="text-slate-600 dark:text-slate-600 max-w-2xl">
                    {config.sectionsSubtitle(pkg.title)}
                  </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                  {/* LEFT — Facts (sticky on desktop) */}
                  <div className="lg:sticky lg:top-24 lg:self-start">
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
                      {config.factsTitle}
                    </h3>

                    <div className="grid grid-cols-2 gap-x-8 gap-y-5 text-sm">
                      <FactItem label="Duration" value={pkg.duration} />
                      <FactItem label="Location" value={pkg.location} />
                      <FactItem label="Best Season" value={pkg.best_season} />
                      <FactItem label="Group Size" value={pkg.group_size} />

                      {pkg.category === "trekking" && (
                        <>
                          {pkg.difficulty && (
                            <FactItem
                              label="Difficulty"
                              value={pkg.difficulty}
                            />
                          )}
                          {pkg.max_altitude && (
                            <FactItem
                              label="Maximum Altitude"
                              value={`${pkg.max_altitude} m`}
                            />
                          )}
                        </>
                      )}

                      {pkg.category === "tour" && (
                        <>
                          {pkg.tour_type && (
                            <FactItem label="Tour Type" value={pkg.tour_type} />
                          )}
                          {pkg.vehicle_type && (
                            <FactItem
                              label="Vehicle"
                              value={pkg.vehicle_type}
                            />
                          )}
                        </>
                      )}

                      {pkg.category === "wildlife" && (
                        <>
                          {pkg.park_name && (
                            <FactItem label="Park" value={pkg.park_name} />
                          )}
                          {pkg.vehicle_type && (
                            <FactItem
                              label="Vehicle"
                              value={pkg.vehicle_type}
                            />
                          )}
                        </>
                      )}

                      <FactItem
                        label="Meals"
                        value="Breakfast, Lunch & Dinner"
                      />
                    </div>
                  </div>

                  {/* RIGHT — Itinerary Timeline */}
                  <div>
                    <h3 className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
                      Itinerary
                    </h3>

                    <div className="relative">
                      {/* Vertical line */}
                      <div className="absolute left-1.75 top-2 bottom-2 w-px bg-[#DCE7DE] dark:bg-[#EEF4EF]" />

                      <div className="space-y-6">
                        {pkg.itineraries.map((itinerary, index) => (
                          <div key={index} className="relative flex gap-5">
                            {/* Dot */}
                            <div className="relative z-10 mt-1.5 shrink-0">
                              <div className="w-3.5 h-3.5 rounded-full border-2 border-[#065F46] bg-[#EEF4EF] dark:bg-[#FFFFFF]" />
                            </div>

                            {/* Content */}
                            <div className="pb-1">
                              <div className="flex items-baseline gap-3 mb-1">
                                <span className="text-xs font-bold uppercase tracking-wider text-[#065F46]">
                                  {itinerary.day}
                                </span>
                                <h4 className="font-semibold text-slate-900 dark:text-slate-900 leading-snug">
                                  {itinerary.title}
                                </h4>
                              </div>
                              <p className="text-sm text-slate-600 dark:text-slate-600 leading-relaxed">
                                {itinerary.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </section>

      {/* ============ INCLUDED / EXCLUDED ============ */}
      <section className="bg-[#FFFFFF] dark:bg-[#FFFFFF] py-14 lg:py-20 transition-colors duration-300">
        {packages
          .filter((pkg) => pkg.id == id)
          .map((pkg) => (
            <div key={pkg.id} className="max-w-7xl mx-auto px-5">
              {/* Heading */}
              <div className="mb-12">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#065F46] mb-3">
                  Inclusions
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-900 mb-3">
                  What's included & excluded
                </h2>
                <p className="text-slate-600 dark:text-slate-600 max-w-2xl">
                  A clear overview of what is covered in your package and what
                  is not.
                </p>
              </div>

              <div className="grid lg:grid-cols-2 gap-10">
                {/* Included */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 grid place-items-center border border-emerald-500/30 text-emerald-500">
                      <CheckIcon />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-900">
                      What's included
                    </h3>
                  </div>

                  <ul>
                    {pkg.includes.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 py-3 border-b border-[#E4EDE6] dark:border-[#DDE7DF] last:border-0"
                      >
                        <span className="text-emerald-500 shrink-0 mt-0.5">
                          <CheckIcon />
                        </span>
                        <span className="text-sm text-slate-700 dark:text-slate-800 leading-relaxed">
                          {item.item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Not Included */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 grid place-items-center border border-red-500/30 text-red-500">
                      <CrossIcon />
                    </div>
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-900">
                      What's not included
                    </h3>
                  </div>

                  <ul>
                    {pkg.excludes.map((item, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 py-3 border-b border-[#E4EDE6] dark:border-[#DDE7DF] last:border-0"
                      >
                        <span className="text-red-500 shrink-0 mt-0.5">
                          <CrossIcon />
                        </span>
                        <span className="text-sm text-slate-700 dark:text-slate-800 leading-relaxed">
                          {item.item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
      </section>

      {/* ============ GALLERY ============ */}
      <section className="bg-[#EEF4EF] dark:bg-[#FFFFFF] py-14 lg:py-20 transition-colors duration-300">
        {packages
          .filter((pkg) => pkg.id == id)
          .map((pkg) => (
            <div key={pkg.id} className="max-w-7xl mx-auto px-5">
              <div className="mb-12">
                <p className="text-sm font-semibold uppercase tracking-widest text-[#065F46] mb-3">
                  Gallery
                </p>
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-900 mb-3">
                  Moments from the trail
                </h2>
                <p className="text-slate-600 dark:text-slate-600 max-w-2xl">
                  Explore breathtaking moments from the {pkg.title}.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {pkg.galleries.map((image, i) => (
                  <div
                    key={i}
                    className="overflow-hidden cursor-pointer"
                    onClick={() => {
                      setIndex(i);
                      setOpen(true);
                    }}
                  >
                    <img
                      src={`http://localhost:8000/storage/${image.image_path}`}
                      alt={`Gallery ${i + 1}`}
                      className="h-72 w-full object-cover"
                    />
                  </div>
                ))}
              </div>

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

      {/* ============ TESTIMONIALS ============ */}
      <section className="bg-[#FFFFFF] dark:bg-[#FFFFFF] py-14 lg:py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5">
          <div className="mb-12">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#065F46] mb-3">
              Testimonials
            </p>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-slate-900 mb-3">
              What travelers say
            </h2>
            <p className="text-slate-600 dark:text-slate-600 max-w-2xl">
              Reviews from travelers who experienced unforgettable journeys with
              TravelMate.
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
              <SwiperSlide key={review.id} className="h-auto!">
                <div className="h-full border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#FFFFFF] dark:bg-[#FFFFFF] p-6">
                  {/* User */}
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 grid place-items-center border border-[#065F46]/30 text-[#065F46] shrink-0">
                      <FaUser className="text-sm" />
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 dark:text-slate-900 truncate">
                        {review.user?.name}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-600 truncate">
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
                  <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-700">
                    {review.comment}
                  </p>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* ============ CTA ============ */}
      <section className="bg-[#EEF4EF] dark:bg-[#FFFFFF] border-t border-[#DDE7DF] dark:border-[#DDE7DF] py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-5 gap-10 items-start">
            {/* Left Content */}
            <div className="lg:col-span-3">
              {packages
                .filter((pkg) => pkg.id == id)
                .map((pkg) => {
                  const config = getConfig(pkg.category);
                  return (
                    <div key={pkg.id}>
                      <p className="text-[#065F46] font-semibold uppercase tracking-widest mb-3">
                        Ready to {config.label}?
                      </p>

                      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6">
                        Start your next adventure
                      </h2>

                      <p className="text-base lg:text-lg leading-relaxed text-slate-600 mb-8">
                        Join experienced local guides, trek through Nepal's most
                        iconic trails, and experience the beauty of the
                        Himalayas on a carefully planned journey.
                      </p>

                      <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm">
                        <CtaBullet text="Flexible departure dates" />
                        <CtaBullet text="Local expert guides" />
                        <CtaBullet text="24/7 travel support" />
                      </div>
                    </div>
                  );
                })}
            </div>

            {/* Right CTA Card */}
            {packages
              .filter((pkg) => pkg.id == id)
              .map((pkg) => {
                const config = getConfig(pkg.category);

                return (
                  <div key={pkg.id} className="lg:col-span-2">
                    <div className="border border-[#DDE7DF] bg-[#FFFFFF] p-8">
                      <div className="space-y-3 text-sm text-slate-600">
                        <div className="flex items-start gap-3">
                          <span className="text-[#065F46] shrink-0">✓</span>
                          <span>Free cancellation up to 24 hours.</span>
                        </div>

                        <div className="flex items-start gap-3">
                          <span className="text-[#065F46] shrink-0">✓</span>
                          <span>Professional licensed trekking guides.</span>
                        </div>

                        <div className="flex items-start gap-3">
                          <span className="text-[#065F46] shrink-0">✓</span>
                          <span>No hidden costs or extra charges.</span>
                        </div>

                        <div className="flex items-start gap-3">
                          <span className="text-[#065F46] shrink-0">✓</span>
                          <span>
                            24/7 customer support before and during your trip.
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={handleBooking}
                        className="mt-8 w-full bg-[#065F46] py-4 text-white font-semibold transition-colors hover:bg-[#064E3B]"
                      >
                        {config.bookLabel}
                      </button>

                      <p className="mt-4 text-center text-xs text-slate-400">
                        Secure booking · Instant confirmation · Trusted by
                        hundreds of travelers
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </section>

      {/* ============ REVIEW FORM ============ */}
      <section className="bg-[#FFFFFF] dark:bg-[#FFFFFF] py-14 lg:py-20 transition-colors duration-300">
        <div className="max-w-3xl mx-auto px-5">
          <ReviewForm packageId={id} />
        </div>
      </section>
    </>
  );
}

/* ---------- Subcomponents ---------- */

function HighlightItem({ text }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-[#065F46] font-semibold shrink-0">✓</span>
      <span className="text-sm text-slate-700 dark:text-slate-700">{text}</span>
    </div>
  );
}

function BenefitItem({ text }) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-emerald-500 shrink-0">✓</span>
      <p>{text}</p>
    </div>
  );
}

function FactItem({ label, value }) {
  return (
    <div className="border-b border-[#DDE7DF] dark:border-[#DDE7DF] pb-3">
      <p className="text-xs font-semibold uppercase tracking-wide text-[#065F46]">
        {label}
      </p>
      <p className="mt-1 text-slate-700 dark:text-slate-700">{value}</p>
    </div>
  );
}

function CtaBullet({ text }) {
  return (
    <div className="flex items-center gap-2 text-slate-600">
      <span className="text-[#065F46]">✓</span>
      <span>{text}</span>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg
      className="w-4 h-4"
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
  );
}

function CrossIcon() {
  return (
    <svg
      className="w-4 h-4"
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
  );
}

export default PackageDetails;
