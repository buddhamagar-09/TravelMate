import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

// for swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

// for animations
import FramerMotion from "../Theme/FramerMotion";

import "swiper/css";
import "swiper/css/navigation";

function MainSection() {
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const packages = [
    {
      title: "Dhorpatan Hunting Reserve",
      category: "Package Tour",
      price: "$16.00",
      image: "images/trekking/dhorpatan.jpg",
    },
    {
      title: "Everest Base Camp Trek",
      category: "Trekking",
      price: "$16.00",
      image: "images/trekking/everest.jpg",
    },
    {
      title: "Badimalika Trek",
      category: "Trekking",
      price: "$12.00",
      image: "images/trekking/badimalika.jpg",
    },
    {
      title: "Annapurna Base Camp",
      category: "Trekking",
      price: "$18.40",
      image: "images/trekking/annapurna.jpg",
    },
    {
      title: "Rara Lake",
      category: "Trekking",
      price: "$20.00",
      image: "images/trekking/rara.jpg",
    },
  ];

  return (
    <>
      {/* <!-- main banner starts here --> */}
      <FramerMotion>

        <section className="mt-5 w-full flex justify-center items-center px-6"
      >
        <div className="relative h-[75vh] w-full overflow-hidden rounded-2xl">
          {banners.map((banner, index) => (
            <img
              key={banner.id}
              src={banner.image}
              alt={banner.title}
              className={`absolute inset-0 w-full h-full object-cover rounded-2xl transition-opacity duration-1000 ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            />
          ))}

          <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-start p-6">
            <h2 className="text-3xl font-bold text-white">
              {banners[currentIndex].title}
            </h2>

            <p className="text-gray-200 mt-2">
              {banners[currentIndex].description}
            </p>

            <Link
              to="/products"
              className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
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
       <section
        className="text-gray-600 body-font"
      >
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
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
                    Discover our range of travel accessories designed to enhance
                    your journey. From durable luggage to essential travel
                    gadgets, we have everything you need for a comfortable and
                    convenient trip.
                  </p>
                  <a className="mt-3 text-indigo-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
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
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
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
        <section
       
        className="text-gray-600 body-font"
      >
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
           <div className="container px-5 py-10 mx-auto">
          <div className="">
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
              loop={true}
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
                <SwiperSlide key={pkg.title}>
                  <div className="">
                    <a className="block relative h-48 rounded overflow-hidden">
                      <img
                        alt="ecommerce"
                        className="object-cover object-center w-full h-full block"
                        src={pkg.image}
                      />
                    </a>
                    <div className="mt-4">
                      <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">
                        {pkg.category}
                      </h3>
                      <h2 className="text-gray-900 title-font text-lg font-medium">
                        {pkg.title}
                      </h2>
                      <div className="mt-1 flex items-center justify-between">
                        <p className="">{pkg.price}</p>
                        <Link
                          to="/booking"
                          className="text-blue-500 hover:text-blue-700 font-bold pr-5"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div className="flex justify-center mt-10 gap-4">
            <button className="prev-btn bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
              <FaChevronLeft />
            </button>
            <button className="next-btn bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600">
              <FaChevronRight />
            </button>
          </div>
        </div>
          </FramerMotion>
       
      </section>
      

      {/* Gallery */}

     <FramerMotion>
       <section
        className="text-gray-600 body-font"
      >
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

      {/* testimonials */}
     <FramerMotion>
       <section
        className="text-gray-600 body-font"
      >
        <div className="container px-5 py-10 mx-auto">
          <h1 className="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
            Testimonials
          </h1>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-gray-100 p-8 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="block w-5 h-5 text-gray-400 mb-4"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed mb-6">
                  I had an amazing experience with TravelMate! The travel
                  packages were well-organized, and the destinations were
                  breathtaking. I highly recommend their services to anyone
                  looking for a memorable travel experience.
                </p>
                <a className="inline-flex items-center">
                  <img
                    alt="testimonial"
                    src="https://dummyimage.com/106x106"
                    className="w-12 h-12 rounded-full shrink-0 object-cover object-center"
                  />
                  <span className="grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">
                      Preyeana Lama
                    </span>
                    <span className="text-gray-500 text-sm">UI DEVELOPER</span>
                  </span>
                </a>
              </div>
            </div>
            <div className="p-4 md:w-1/2 w-full">
              <div className="h-full bg-gray-100 p-8 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  className="block w-5 h-5 text-gray-400 mb-4"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p className="leading-relaxed mb-6">
                  TravelMate made my trip unforgettable! The travel packages
                  were well-planned, and the customer service was exceptional. I
                  felt supported throughout my journey, and I can't wait to book
                  my next adventure with them.
                </p>
                <a className="inline-flex items-center">
                  <img
                    alt="testimonial"
                    src="https://dummyimage.com/107x107"
                    className="w-12 h-12 rounded-full shrink-0 object-cover object-center"
                  />
                  <span className="grow flex flex-col pl-4">
                    <span className="title-font font-medium text-gray-900">
                      Cristiano Ronaldo
                    </span>
                    <span className="text-gray-500 text-sm">DESIGNER</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      </FramerMotion>
      {/* testimonials section ends here */}
    </>
  );
}

export default MainSection;
