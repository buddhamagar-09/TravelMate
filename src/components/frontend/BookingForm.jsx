import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetchPackages from "../Hook/FetchPackages";
import { useEffect, useState } from "react";
import api from "../../api/axios";
import { toast } from "react-hot-toast";

export default function BookingForm() {
  const { packages, fetchPackages } = useFetchPackages();
  const { id } = useParams();
  const navigate = useNavigate();

  const packageData = packages.find((pkg) => pkg.id === parseInt(id));
  const user = JSON.parse(localStorage.getItem("user"));

  const [phoneNumber, setPhoneNumber] = useState("");
  const [travelDate, setTravelDate] = useState("");
  const [travelers, setTravelers] = useState(1);
  const [specialRequest, setSpecialRequest] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  useEffect(() => {
    fetchPackages();
  }, []);

  const handleBooking = async (e) => {
    e.preventDefault();
    const bookingData = new FormData();
    bookingData.append("package_id", packageData?.id);
    bookingData.append("phone_number", phoneNumber);
    bookingData.append("travel_date", travelDate);
    bookingData.append("travelers", travelers);
    bookingData.append("special_request", specialRequest);

    if (!agreedToTerms) {
      alert("You must agree to the Terms & Conditions and Privacy Policy.");
      return;
    }
    const loadingToast = toast.loading("Processing your booking...");
    try {
      const response = await api.post("/bookings", bookingData);
      console.log(response.data);
      toast.dismiss(loadingToast);
      toast.success("Booking successful!");
      setPhoneNumber("");
      setTravelDate("");
      setTravelers(1);
      setSpecialRequest("");
      setAgreedToTerms(false);
      navigate("/");
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error("Failed to create booking.");
      console.error(error);
    }
  };

  const inputClass =
    "w-full border border-[#CDD9CF] dark:border-[#CDD9CF] bg-[#FFFFFF] dark:bg-[#FFFFFF] px-4 py-3 text-sm text-slate-900 dark:text-slate-900 placeholder:text-slate-400 focus:border-[#064E3B] outline-none transition-colors";

  return (
    <>
      {/* ============ PAGE HEADER ============ */}
      <section className="bg-[#FFFFFF] dark:bg-[#FFFFFF] transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5 py-14 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#064E3B] mb-3">
            TravelMate
          </p>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-slate-900 leading-tight">
            Complete your booking
          </h1>

          <p className="mt-4 text-slate-600 dark:text-slate-600">
            You're just one step away from your next adventure.
          </p>
        </div>
      </section>

      {/* ============ FORM SECTION ============ */}
      <section className="bg-[#EEF4EF] dark:bg-[#FFFFFF] py-14 lg:py-20 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-5">
          <div className="grid lg:grid-cols-2 border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#FFFFFF] dark:bg-[#FFFFFF]">
            {/* ============ LEFT SIDE ============ */}
            <div className="flex flex-col p-8 lg:p-10 lg:border-r border-[#DDE7DF] dark:border-[#DDE7DF]">
              <img
                src={`http://localhost:8000/storage/${packageData?.featured_image}`}
                alt="Package Image"
                className="h-72 object-cover w-full"
              />

              <div className="mt-6">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-900">
                  {packageData?.title}
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-600 line-clamp-3">
                  {packageData?.short_description}
                </p>

                <div className="grid grid-cols-2 gap-3 mt-8">
                  <InfoBox label="Duration" value={packageData?.duration} />
                  <InfoBox label="Group Size" value={packageData?.group_size} />
                  <InfoBox label="Season" value={packageData?.best_season} />

                  {/* Trek-only */}
                  {packageData?.category === "trekking" && (
                    <InfoBox
                      label="Difficulty"
                      value={packageData?.difficulty}
                    />
                  )}

                  {/* Tour-only */}
                  {packageData?.category === "tour" &&
                    packageData?.tour_type && (
                      <InfoBox
                        label="Tour Type"
                        value={packageData?.tour_type}
                      />
                    )}

                  {/* Wildlife-only */}
                  {packageData?.category === "wildlife" &&
                    packageData?.park_name && (
                      <InfoBox label="Park" value={packageData?.park_name} />
                    )}

                  {/* Vehicle — for tour + wildlife */}
                  {(packageData?.category === "tour" ||
                    packageData?.category === "wildlife") &&
                    packageData?.vehicle_type && (
                      <InfoBox
                        label="Vehicle"
                        value={packageData?.vehicle_type}
                      />
                    )}
                </div>

                <div className="mt-8">
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Starting from
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-[#064E3B]">
                      Rs. {packageData?.price}
                    </h3>
                    <p className="text-sm text-slate-500 dark:text-slate-600">
                      per person
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* ============ RIGHT SIDE ============ */}
            <div className="p-8 lg:p-10 border-t lg:border-t-0 border-[#DDE7DF] dark:border-[#DDE7DF]">
              <h2 className="text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-900">
                Your details
              </h2>
              <p className="mt-2 text-slate-500 dark:text-slate-600">
                Fill in your information to reserve your trip.
              </p>

              <form onSubmit={handleBooking} className="mt-8 space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-700">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={user?.name}
                    readOnly
                    className={`${inputClass} bg-[#EEF4EF] dark:bg-[#FFFFFF] cursor-not-allowed`}
                  />
                </div>

                {/* Email & Phone */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-700">
                      Email
                    </label>
                    <input
                      type="email"
                      value={user?.email}
                      readOnly
                      className={`${inputClass} bg-[#EEF4EF] dark:bg-[#FFFFFF] cursor-not-allowed`}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-700">
                      Phone Number
                    </label>
                    <input
                      type="text"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="+977 98XXXXXXXX"
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Travel Date & Travelers */}
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-700">
                      Travel Date
                    </label>
                    <input
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setTravelDate(e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-700">
                      Number of Travelers
                    </label>
                    <input
                      type="number"
                      min="1"
                      
                      onChange={(e) => setTravelers(e.target.value)}
                      defaultValue={1}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Special Request */}
                <div>
                  <label className="block mb-2 text-sm font-medium text-slate-700 dark:text-slate-700">
                    Special Request{" "}
                    <span className="text-slate-400">(Optional)</span>
                  </label>
                  <textarea
                    rows={4}
                    onChange={(e) => setSpecialRequest(e.target.value)}
                    placeholder="Tell us anything you'd like us to know..."
                    className={`${inputClass} resize-none`}
                  />
                </div>

                {/* Booking Summary */}
                <div className="border border-[#DDE7DF] dark:border-[#DDE7DF] bg-[#EEF4EF] dark:bg-[#FFFFFF] p-5">
                  <h3 className="mb-4 text-base font-semibold text-slate-900 dark:text-slate-900">
                    Booking Summary
                  </h3>

                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-slate-600 dark:text-slate-600">
                      Price per person
                    </span>
                    <span className="font-medium text-slate-900 dark:text-slate-900">
                      Rs. {packageData?.price}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-600">
                      Travelers
                    </span>
                    <span className="font-medium text-slate-900 dark:text-slate-900">
                      {travelers}
                    </span>
                  </div>

                  <div className="my-4 border-t border-[#DDE7DF] dark:border-[#DDE7DF]" />

                  <div className="flex justify-between text-base font-bold">
                    <span className="text-slate-900 dark:text-slate-900">
                      Total
                    </span>
                    <span className="text-[#064E3B]">
                      Rs. {packageData?.price * travelers}
                    </span>
                  </div>
                </div>

                {/* Terms */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agreedToTerms}
                    onChange={(e) => setAgreedToTerms(e.target.checked)}
                    className="mt-1 h-4 w-4 accent-[#064E3B]"
                  />

                  <p className="text-sm text-slate-600 dark:text-slate-600 leading-6">
                    I agree to the Terms & Conditions and Privacy Policy.
                  </p>
                </div>

                {/* Button */}
                <button
                  type="submit"
                  className="w-full bg-[#064E3B] py-4 text-white font-semibold transition-colors hover:bg-[#04382A]"
                >
                  Confirm Booking
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

/* ---------- Subcomponents ---------- */

function InfoBox({ label, value }) {
  return (
    <div className="border border-[#DDE7DF] dark:border-[#DDE7DF] p-4">
      <p className="text-xs uppercase tracking-wide text-slate-400">{label}</p>
      <h4 className="mt-1 font-semibold text-slate-900 dark:text-slate-900">
        {value}
      </h4>
    </div>
  );
}
