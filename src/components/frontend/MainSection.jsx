import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";

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

  return (
    <>
      {/* <!-- main banner starts here --> */}
      <section className="mt-5 w-full flex justify-center items-center px-6">
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
      {/* <!-- main banner ends here --> */}
      {/* features section starts here */}
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-14 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h2 class="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
              FEATURES
            </h2>
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              TravelMate - Your Ultimate Travel Companion
            </h1>
          </div>
          <div class="flex flex-wrap -m-4">
            <div class="p-4 md:w-1/3">
              <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                 
                  <h2 class="text-gray-900 text-lg title-font font-medium">
                    Trekking Guides                  
                  </h2>
                </div>
                <div class="grow">
                  <p class="leading-relaxed text-base">
                     Our expert trekking guides will lead you through breathtaking trails, ensuring a safe and unforgettable adventure. Explore the great outdoors with confidence and make memories that will last a lifetime.              
                  </p>
                  <a class="mt-3 text-indigo-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="p-4 md:w-1/3">
              <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                 
                  <h2 class="text-gray-900 text-lg title-font font-medium">
                    Travel Accessories
                  </h2>
                </div>
                <div class="grow">
                  <p class="leading-relaxed text-base">
                    Discover our range of travel accessories designed to enhance your journey. From durable luggage to essential travel gadgets, we have everything you need for a comfortable and convenient trip.
                  </p>
                  <a class="mt-3 text-indigo-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-2"
                      viewBox="0 0 24 24"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7"></path>
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            <div class="p-4 md:w-1/3">
              <div class="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div class="flex items-center mb-3">
                  
                  <h2 class="text-gray-900 text-lg title-font font-medium">
                    Custom Travel Packages
                  </h2>
                </div>
                <div class="grow">
                  <p class="leading-relaxed text-base">
                    Create your own travel adventure with our custom travel packages. Choose your destinations, activities, and accommodations to design a trip that perfectly suits your preferences and interests.
                  </p>
                  <a class="mt-3 text-indigo-500 inline-flex items-center">
                    Learn More
                    <svg
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      class="w-4 h-4 ml-2"
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
      {/* features section ends here */}

      {/* Gallery */}

      <section class="text-gray-600 body-font">
        <div class="container px-5 py-14 mx-auto flex flex-wrap">
          <div class="flex w-full mb-20 flex-wrap">
            <h1 class="sm:text-3xl text-2xl font-medium title-font text-gray-900 lg:w-1/3 lg:mb-0 mb-4">
              Our Travel Gallery
            </h1>
            <p class="lg:pl-6 lg:w-2/3 mx-auto leading-relaxed text-base">
              Gallery of our travel experiences and destinations. Explore the beauty of the world through our curated collection of images.
            </p>
          </div>
          <div class="flex flex-wrap md:-m-2 -m-1">
            <div class="flex flex-wrap w-1/2">
              <div class="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  class="w-full object-cover h-full object-center block"
                  src="images/Gallery/gallery1.jpg"
                />
              </div>
              <div class="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  class="w-full object-cover h-full object-center block"
                  src="images/Gallery/gallery2.jpg"
                />
              </div>
              <div class="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  class="w-full h-full object-cover object-center block"
                  src="images/Gallery/gallery3.jpg"
                />
              </div>
            </div>
            <div class="flex flex-wrap w-1/2">
              <div class="md:p-2 p-1 w-full">
                <img
                  alt="gallery"
                  class="w-full h-full object-cover object-center block"
                  src="images/Gallery/gallery4.jpg"
                />
              </div>
              <div class="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  class="w-full object-cover h-full object-center block"
                  src="images/Gallery/gallery5.jpg"
                />
              </div>
              <div class="md:p-2 p-1 w-1/2">
                <img
                  alt="gallery"
                  class="w-full object-cover h-full object-center block"
                  src="images/Gallery/gallery6.jpg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Gallery section ends here */}

      {/* testimonials */}
      <section class="text-gray-600 body-font">
        <div class="container px-5 py-14 mx-auto">
          <h1 class="text-3xl font-medium title-font text-gray-900 mb-12 text-center">
            Testimonials
          </h1>
          <div class="flex flex-wrap -m-4">
            <div class="p-4 md:w-1/2 w-full">
              <div class="h-full bg-gray-100 p-8 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="block w-5 h-5 text-gray-400 mb-4"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p class="leading-relaxed mb-6">
                  I had an amazing experience with TravelMate! The travel packages were well-organized, and the destinations were breathtaking. I highly recommend their services to anyone looking for a memorable travel experience.
                 
                </p>
                <a class="inline-flex items-center">
                  <img
                    alt="testimonial"
                    src="https://dummyimage.com/106x106"
                    class="w-12 h-12 rounded-full shrink-0 object-cover object-center"
                  />
                  <span class="grow flex flex-col pl-4">
                    <span class="title-font font-medium text-gray-900">
                      Preyeana Lama
                    </span>
                    <span class="text-gray-500 text-sm">UI DEVELOPER</span>
                  </span>
                </a>
              </div>
            </div>
            <div class="p-4 md:w-1/2 w-full">
              <div class="h-full bg-gray-100 p-8 rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  class="block w-5 h-5 text-gray-400 mb-4"
                  viewBox="0 0 975.036 975.036"
                >
                  <path d="M925.036 57.197h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.399 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l36 76c11.6 24.399 40.3 35.1 65.1 24.399 66.2-28.6 122.101-64.8 167.7-108.8 55.601-53.7 93.7-114.3 114.3-181.9 20.601-67.6 30.9-159.8 30.9-276.8v-239c0-27.599-22.401-50-50-50zM106.036 913.497c65.4-28.5 121-64.699 166.9-108.6 56.1-53.7 94.4-114.1 115-181.2 20.6-67.1 30.899-159.6 30.899-277.5v-239c0-27.6-22.399-50-50-50h-304c-27.6 0-50 22.4-50 50v304c0 27.601 22.4 50 50 50h145.5c-1.9 79.601-20.4 143.3-55.4 191.2-27.6 37.8-69.4 69.1-125.3 93.8-25.7 11.3-36.8 41.7-24.8 67.101l35.9 75.8c11.601 24.399 40.501 35.2 65.301 24.399z"></path>
                </svg>
                <p class="leading-relaxed mb-6">
                  TravelMate made my trip unforgettable! The travel packages were well-planned, and the customer service was exceptional. I felt supported throughout my journey, and I can't wait to book my next adventure with them. 
                </p>
                <a class="inline-flex items-center">
                  <img
                    alt="testimonial"
                    src="https://dummyimage.com/107x107"
                    class="w-12 h-12 rounded-full shrink-0 object-cover object-center"
                  />
                  <span class="grow flex flex-col pl-4">
                    <span class="title-font font-medium text-gray-900">
                     Cristiano Ronaldo
                    </span>
                    <span class="text-gray-500 text-sm">DESIGNER</span>
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* testimonials section ends here */}
    </>
  );
}

export default MainSection;
