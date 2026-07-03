import React from "react";
import { Link } from "react-router-dom";

function Footer()
{
    return(
      <footer class="w-full bg-gray-900 text-white z-50">
    <div class="w-full px-4 sm:px-6 lg:px-8 py-12">
      {/* <!-- Upper Footer: responsive grid --> */}
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* <!-- Social Media --> */}
        <div class="space-y-4">
          <h2 class="text-2xl font-bold">Social Media</h2>
          <p class="text-gray-300 text-sm">Follow us for latest deals and updates.</p>
          <ul class="flex space-x-3 mt-2">
            <li>
              <Link to="#"
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition">
                <ion-icon name="logo-facebook" class="text-xl"></ion-icon>
              </Link>
            </li>
            <li>
              <Link to="#"
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition">
                <ion-icon name="logo-instagram" class="text-xl"></ion-icon>
              </Link>
            </li>
            <li>
              <Link to="#"
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition">
                <ion-icon name="logo-tiktok" class="text-xl"></ion-icon>
              </Link>
            </li>
            <li>
              <Link to="#"
                class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-gray-800 hover:bg-gray-700 transition">
                <ion-icon name="logo-whatsapp" class="text-xl"></ion-icon>
              </Link>
            </li>
          </ul>
        </div>

        {/* <!-- Resources --> */}
        <div>
          <h2 class="text-2xl font-bold mb-2">Quick Links</h2>
          <nav class="flex flex-col space-y-2 text-gray-300 text-sm" aria-label="Resources">
            <Link to="/about" class="hover:underline">About Us</Link>
            <Link to="/shop" class="hover:underline">Shop</Link>
            <Link to="/cart" class="hover:underline">Cart</Link>
            <Link to="/top-sold" class="hover:underline">Top Sold Items</Link>
          </nav>
        </div>

        {/* <!-- Company --> */}

        {/* <!-- Support --> */}
        <div>
          <h2 class="text-2xl font-bold mb-2">Support</h2>
          <nav class="flex flex-col space-y-2 text-gray-300 text-sm" aria-label="Support">
            <Link to="/faq" class="hover:underline">FAQ's</Link>
            <Link to="/support" class="hover:underline">Online Support</Link>
            <Link to="/privacy" class="hover:underline"> Privacy Policy</Link>
            <Link to="/terms" class="hover:underline">Terms and Conditions</Link>
          </nav>
        </div>

       <div>
          <h2 class="text-2xl font-bold mb-2">Opening Hours</h2>
          <div class="flex flex-col space-y-2 text-gray-300 text-sm" aria-label="Opening Hours">
            <p class="text-gray-400">In‑Store</p>
            <p>Mon – Fri: 9:00 AM – 7:00 PM</p>
            <p>Saturday: 10:00 AM – 6:00 PM</p>
            <p class="mb-2">Sunday: Closed</p>
            <p class="text-gray-400">Online Store</p>
            <p>Open 24/7</p>
          </div>
        </div>

      </div>
      

      <hr class="border-gray-700 my-8" />

      {/* <!-- Lower Footer --> */}
      <div class="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <p class="font-semibold text-white text-center sm:text-left">
          &copy; 2025 <span class="text-white">Moto <span class="text-red-600">Mods</span></span>, Inc. All Rights
          Reserved.
        </p>
        <div class="flex items-center space-x-4">
          <Link to="/privacy" class="hover:underline">Privacy</Link>
          <Link to="/terms" class="hover:underline">Terms</Link>
          <Link to="/contact" class="hover:underline">Contact</Link>
        </div>
      </div>
    </div>
  </footer>


    )
}

export default Footer;