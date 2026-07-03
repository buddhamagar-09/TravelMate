import React from "react";

function About() {
 

  return (
    <>
      {/* Hero Banner */}
      <section className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300">

        <div
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,.55),rgba(0,0,0,.55)), url('images/banners/banner.jpg')",
          }}
          className="w-full h-[45vh] bg-cover bg-center flex flex-col justify-center items-center text-center px-6"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            #Know Us
          </h1>

          <p className="max-w-3xl text-gray-200 text-sm md:text-lg leading-relaxed">
            MotoMods Nepal is an online platform that provides high-quality
            motorcycle parts and accessories for riders. We make it simple to
            find reliable products that enhance performance, safety, and style.
            A one-stop online destination built for every motorcycle enthusiast.
          </p>
        </div>

        {/* About */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="grid lg:grid-cols-2 gap-14 items-center">

            <div>
              <img
                src="images/aboutus/aboutus1.jpg"
                alt="About MotoMods"
                className="rounded-2xl shadow-xl w-full"
              />
            </div>

            <div>
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Who We Are
              </h2>

              <p className="text-gray-700 dark:text-gray-300 leading-8 text-justify">
                MotoMods Nepal provides a reliable and user-friendly e-commerce
                platform for motorcycle parts and accessories. We solve common
                problems such as poor user experience, limited accessibility,
                and expensive products by offering a better online shopping
                experience.

                <br />
                <br />

                Our mission is to make premium motorcycle accessories available
                to riders throughout Nepal, including remote areas, while
                maintaining affordable pricing and excellent customer service.
              </p>
            </div>

          </div>
        </div>
      </section>
    {/* Contact Section */}
      <section
        id="contact"
        className="bg-gray-100 dark:bg-gray-900 transition-colors duration-300 pb-5"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12">

            {/* Contact Info */}
            <div className="flex flex-col justify-start pt-5">
              <span className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Travel<span className="text-blue-600">Mate</span>
              </span>

              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Contact Us
              </h2>


              <p className="text-gray-600 dark:text-gray-300 leading-7 mb-8">
                Have questions about our products or your order? We'd love to
                hear from you. Fill out the form or contact us using the
                information below.
              </p>

              <div className="space-y-5">

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center">
                    <i className="bx bxs-phone text-2xl"></i>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Phone
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      9800000000
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center">
                    <i className="bx bxs-envelope text-2xl"></i>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Email
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      motomods12@gmail.com
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-green-500 text-white flex items-center justify-center">
                    <i className="bx bxs-location-plus text-2xl"></i>
                  </div>

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Address
                    </p>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      Gaindakot-1, Nawalpur
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 transition-colors duration-300">

              <form className="space-y-5">

                <div>
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 focus:ring-2 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 focus:ring-2  outline-none transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                    Phone (Optional)
                  </label>

                  <input
                    type="tel"
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 focus:ring-2 outline-none transition"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700 dark:text-gray-300">
                    Message
                  </label>

                  <textarea
                    rows="6"
                    placeholder="Type your message..."
                    className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-white px-4 py-3 focus:ring-2  outline-none transition resize-none"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  Send Message
                </button>

              </form>

            </div>

          </div>
        </div>
      </section>
    </>
  );
}

export default About;

