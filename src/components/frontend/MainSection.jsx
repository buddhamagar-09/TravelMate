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
      title: "Nature heals the soul, and we have the perfect packages for your next adventure",
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

      <section class="mt-scroll-[150px] w-full mt-12">
        <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-1 md:gap-3 lg:gap-4 px-4 md:px-8 lg:px-12 pb-12">
          {/* <!-- View All Card --> */}
          <div class="bg-[url(../Accessories/viewall.jpg)] bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col items-center justify-center py-8 bg-center bg-cover">
            <p class="font-bold text-lg text-white mb-4 text-center px-4">
              Premium Accessories & Riding Gears
            </p>
            <a
              href="products/products.php?category=Helmet"
              class="px-5 py-2 text-white font-bold bg-red-500 hover:bg-red-600 rounded-full transition"
            >
              View All
            </a>
          </div>

          {/* <!-- Product Card --> */}
          <div class="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col">
            <a href="productdetails.php?id=1" class="block">
              <div class="h-40 md:h-44 w-full flex items-center justify-center">
                <img
                  src="../admin/upload_products/product.jpg"
                  alt="Product Name"
                  class="max-h-full max-w-full object-contain"
                />
              </div>

              <div class="p-3 flex-1">
                <p class="text-sm md:text-base font-medium text-gray-800">
                  Product Name
                </p>
              </div>
            </a>

            <div class="p-3 flex flex-col gap-2 items-start sm:flex-row sm:items-center sm:justify-between mt-auto">
              <div class="flex-1">
                <div class="flex flex-wrap items-baseline gap-2 mb-1">
                  <span class="text-base md:text-lg font-semibold text-red-500">
                    $99.99
                  </span>

                  <span class="text-xs md:text-sm line-through text-gray-400">
                    $129.99
                  </span>
                </div>

                <div class="flex items-center text-green-500 text-xs md:text-sm">
                  <ion-icon name="cube-outline" class="mr-1"></ion-icon>
                  <span>In Stock</span>
                </div>

                {/* <!-- Out of Stock Example -->
                    <!-- */}
                <div class="flex items-center text-red-500 text-xs md:text-sm">
                  <ion-icon name="close-circle-outline" class="mr-1"></ion-icon>
                  <span>Out of Stock</span>
                </div>
                {/* --> */}
              </div>

              <a
                href="../admin/add_to_cart.php?product_id=1&quantity=1"
                class="cursor-pointer self-end sm:self-auto"
              >
                <ion-icon
                  name="cart-outline"
                  class="text-xl md:text-2xl text-gray-700"
                ></ion-icon>
              </a>

              {/* <!-- Disabled Cart Example --> */}

              <span class="cursor-not-allowed self-end sm:self-auto opacity-50">
                <ion-icon
                  name="cart-outline"
                  class="text-xl md:text-2xl text-gray-400"
                ></ion-icon>
              </span>
              {/* --> */}
            </div>
          </div>
          {/* <!-- Product Card --> */}
          <div class="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col">
            <a href="productdetails.php?id=1" class="block">
              <div class="h-40 md:h-44 w-full flex items-center justify-center">
                <img
                  src="../admin/upload_products/product.jpg"
                  alt="Product Name"
                  class="max-h-full max-w-full object-contain"
                />
              </div>

              <div class="p-3 flex-1">
                <p class="text-sm md:text-base font-medium text-gray-800">
                  Product Name
                </p>
              </div>
            </a>

            <div class="p-3 flex flex-col gap-2 items-start sm:flex-row sm:items-center sm:justify-between mt-auto">
              <div class="flex-1">
                <div class="flex flex-wrap items-baseline gap-2 mb-1">
                  <span class="text-base md:text-lg font-semibold text-red-500">
                    $99.99
                  </span>

                  <span class="text-xs md:text-sm line-through text-gray-400">
                    $129.99
                  </span>
                </div>

                <div class="flex items-center text-green-500 text-xs md:text-sm">
                  <ion-icon name="cube-outline" class="mr-1"></ion-icon>
                  <span>In Stock</span>
                </div>

                {/* <!-- Out of Stock Example -->
                    <!-- */}
                <div class="flex items-center text-red-500 text-xs md:text-sm">
                  <ion-icon name="close-circle-outline" class="mr-1"></ion-icon>
                  <span>Out of Stock</span>
                </div>
                {/* --> */}
              </div>

              <a
                href="../admin/add_to_cart.php?product_id=1&quantity=1"
                class="cursor-pointer self-end sm:self-auto"
              >
                <ion-icon
                  name="cart-outline"
                  class="text-xl md:text-2xl text-gray-700"
                ></ion-icon>
              </a>

              {/* <!-- Disabled Cart Example --> */}

              <span class="cursor-not-allowed self-end sm:self-auto opacity-50">
                <ion-icon
                  name="cart-outline"
                  class="text-xl md:text-2xl text-gray-400"
                ></ion-icon>
              </span>
              {/* --> */}
            </div>
          </div>
          {/* <!-- Product Card --> */}
          <div class="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col">
            <a href="productdetails.php?id=1" class="block">
              <div class="h-40 md:h-44 w-full flex items-center justify-center">
                <img
                  src="../admin/upload_products/product.jpg"
                  alt="Product Name"
                  class="max-h-full max-w-full object-contain"
                />
              </div>

              <div class="p-3 flex-1">
                <p class="text-sm md:text-base font-medium text-gray-800">
                  Product Name
                </p>
              </div>
            </a>

            <div class="p-3 flex flex-col gap-2 items-start sm:flex-row sm:items-center sm:justify-between mt-auto">
              <div class="flex-1">
                <div class="flex flex-wrap items-baseline gap-2 mb-1">
                  <span class="text-base md:text-lg font-semibold text-red-500">
                    $99.99
                  </span>

                  <span class="text-xs md:text-sm line-through text-gray-400">
                    $129.99
                  </span>
                </div>

                <div class="flex items-center text-green-500 text-xs md:text-sm">
                  <ion-icon name="cube-outline" class="mr-1"></ion-icon>
                  <span>In Stock</span>
                </div>

                {/* <!-- Out of Stock Example -->
                    <!-- */}
                <div class="flex items-center text-red-500 text-xs md:text-sm">
                  <ion-icon name="close-circle-outline" class="mr-1"></ion-icon>
                  <span>Out of Stock</span>
                </div>
                {/* --> */}
              </div>

              <a
                href="../admin/add_to_cart.php?product_id=1&quantity=1"
                class="cursor-pointer self-end sm:self-auto"
              >
                <ion-icon
                  name="cart-outline"
                  class="text-xl md:text-2xl text-gray-700"
                ></ion-icon>
              </a>

              {/* <!-- Disabled Cart Example --> */}

              <span class="cursor-not-allowed self-end sm:self-auto opacity-50">
                <ion-icon
                  name="cart-outline"
                  class="text-xl md:text-2xl text-gray-400"
                ></ion-icon>
              </span>
              {/* --> */}
            </div>
          </div>
          {/* <!-- Product Card --> */}
          <div class="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col">
            <a href="productdetails.php?id=1" class="block">
              <div class="h-40 md:h-44 w-full flex items-center justify-center">
                <img
                  src="../admin/upload_products/product.jpg"
                  alt="Product Name"
                  class="max-h-full max-w-full object-contain"
                />
              </div>

              <div class="p-3 flex-1">
                <p class="text-sm md:text-base font-medium text-gray-800">
                  Product Name
                </p>
              </div>
            </a>

            <div class="p-3 flex flex-col gap-2 items-start sm:flex-row sm:items-center sm:justify-between mt-auto">
              <div class="flex-1">
                <div class="flex flex-wrap items-baseline gap-2 mb-1">
                  <span class="text-base md:text-lg font-semibold text-red-500">
                    $99.99
                  </span>

                  <span class="text-xs md:text-sm line-through text-gray-400">
                    $129.99
                  </span>
                </div>

                <div class="flex items-center text-green-500 text-xs md:text-sm">
                  <ion-icon name="cube-outline" class="mr-1"></ion-icon>
                  <span>In Stock</span>
                </div>

                {/* <!-- Out of Stock Example -->
                    <!-- */}
                <div class="flex items-center text-red-500 text-xs md:text-sm">
                  <ion-icon name="close-circle-outline" class="mr-1"></ion-icon>
                  <span>Out of Stock</span>
                </div>
                {/* --> */}
              </div>

              <a
                href="../admin/add_to_cart.php?product_id=1&quantity=1"
                class="cursor-pointer self-end sm:self-auto"
              >
                <ion-icon
                  name="cart-outline"
                  class="text-xl md:text-2xl text-gray-700"
                ></ion-icon>
              </a>

              {/* <!-- Disabled Cart Example --> */}

              <span class="cursor-not-allowed self-end sm:self-auto opacity-50">
                <ion-icon
                  name="cart-outline"
                  class="text-xl md:text-2xl text-gray-400"
                ></ion-icon>
              </span>
              {/* --> */}
            </div>
          </div>
          {/* <!-- Product Card --> */}
          <div class="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 flex flex-col">
            <a href="productdetails.php?id=1" class="block">
              <div class="h-40 md:h-44 w-full flex items-center justify-center">
                <img
                  src="../admin/upload_products/product.jpg"
                  alt="Product Name"
                  class="max-h-full max-w-full object-contain"
                />
              </div>

              <div class="p-3 flex-1">
                <p class="text-sm md:text-base font-medium text-gray-800">
                  Product Name
                </p>
              </div>
            </a>

            <div class="p-3 flex flex-col gap-2 items-start sm:flex-row sm:items-center sm:justify-between mt-auto">
              <div class="flex-1">
                <div class="flex flex-wrap items-baseline gap-2 mb-1">
                  <span class="text-base md:text-lg font-semibold text-red-500">
                    $99.99
                  </span>

                  <span class="text-xs md:text-sm line-through text-gray-400">
                    $129.99
                  </span>
                </div>

                <div class="flex items-center text-green-500 text-xs md:text-sm">
                  <ion-icon name="cube-outline" class="mr-1"></ion-icon>
                  <span>In Stock</span>
                </div>

                {/* <!-- Out of Stock Example -->
                    <!-- */}
                <div class="flex items-center text-red-500 text-xs md:text-sm">
                  <ion-icon name="close-circle-outline" class="mr-1"></ion-icon>
                  <span>Out of Stock</span>
                </div>
                {/* --> */}
              </div>

              <a
                href="../admin/add_to_cart.php?product_id=1&quantity=1"
                class="cursor-pointer self-end sm:self-auto"
              >
                <ion-icon
                  name="cart-outline"
                  class="text-xl md:text-2xl text-gray-700"
                ></ion-icon>
              </a>

              {/* <!-- Disabled Cart Example --> */}

              <span class="cursor-not-allowed self-end sm:self-auto opacity-50">
                <ion-icon
                  name="cart-outline"
                  class="text-xl md:text-2xl text-gray-400"
                ></ion-icon>
              </span>
              {/* --> */}
            </div>
          </div>
        </div>
      </section>

      <section className="w-full py-16 bg-linear-to-r from-gray-50 to-gray-100 shadow-lg">
        <div className="max-w-6xl mx-auto px-6">
          {/* Section Title */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose Us
            </h2>
            <p className="text-lg text-gray-600">
              Trusted by thousands of biking enthusiasts worldwide
            </p>
          </div>

          {/* <!-- Features Grid --> */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* <!-- Feature 1: Quality Products --> */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                <ion-icon
                  name="star"
                  className="text-4xl text-red-600"
                ></ion-icon>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Premium Quality
              </h3>
              <p className="text-gray-600">
                We source only the finest bike accessories and parts from
                trusted manufacturers
              </p>
            </div>

            {/* <!-- Feature 2: Fast Delivery --> */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                <ion-icon
                  name="flash"
                  className="text-4xl text-blue-600"
                ></ion-icon>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Fast Shipping
              </h3>
              <p className="text-gray-600">
                Quick and reliable delivery right to your doorstep within 3-5
                business days
              </p>
            </div>

            {/* <!-- Feature 3: Best Prices --> */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <ion-icon
                  name="pricetag"
                  className="text-4xl text-green-600"
                ></ion-icon>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Unbeatable Prices
              </h3>
              <p className="text-gray-600">
                Competitive pricing with regular discounts and exclusive deals
                for our loyal customers
              </p>
            </div>

            {/* <!-- Feature 4: Expert Support --> */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
                <ion-icon
                  name="headset"
                  className="text-4xl text-purple-600"
                ></ion-icon>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                24/7 Support
              </h3>
              <p className="text-gray-600">
                Dedicated customer service team ready to help with any questions
                or concerns
              </p>
            </div>

            {/* <!-- Feature 5: Secure Payments --> */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                <ion-icon
                  name="shield-checkmark"
                  className="text-4xl text-yellow-600"
                ></ion-icon>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Secure Payments
              </h3>
              <p className="text-gray-600">
                Multiple payment options with bank-level encryption and fraud
                protection
              </p>
            </div>

            {/* <!-- Feature 6: Easy Returns --> */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                <ion-icon
                  name="refresh-circle"
                  className="text-4xl text-teal-600"
                ></ion-icon>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Easy Returns
              </h3>
              <p className="text-gray-600">
                Hassle-free 7-day return policy for a worry-free shopping
                experience
              </p>
            </div>

            {/* <!-- Feature 7: Expert Advice --> */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-full mb-4">
                <ion-icon
                  name="bulb"
                  className="text-4xl text-indigo-600"
                ></ion-icon>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Expert Guidance
              </h3>
              <p className="text-gray-600">
                Get personalized recommendations from our team of biking
                enthusiasts
              </p>
            </div>

            {/* <!-- Feature 8: Community --> */}
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-pink-100 rounded-full mb-4">
                <ion-icon
                  name="people"
                  className="text-4xl text-pink-600"
                ></ion-icon>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                Active Community
              </h3>
              <p className="text-gray-600">
                Join thousands of riders sharing tips, reviews, and experiences
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default MainSection;
