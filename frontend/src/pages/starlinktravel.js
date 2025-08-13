import Head from "next/head";
import Navbar from "../components/Navbar";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Footer from "@/components/Footer";

export default function StarlinkTravels() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_xkeqcap", // replace with your EmailJS service ID
        "template_n51jiok", // replace with your EmailJS template ID
        form.current,
        "H5IjVjxj_09G1yhVo" // replace with your EmailJS public key
      )
      .then(
        () => {
          setIsSending(false);
          toast.success(
            "Thank you! We will contact you regarding your travel plan.",
            {
              position: "top-right",
              autoClose: 3000,
              theme: "dark",
            }
          );
          form.current.reset();
        },
        (error) => {
          setIsSending(false);
          console.error("EmailJS error:", error);
          toast.error("Failed to send your inquiry. Please try again.", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        }
      );
  };

  return (
    <>
      <Head>
        <title>Starlink Travels | Starlink Education and Visa Services</title>
        <meta
          name="description"
          content="Plan your travel with Starlink Travels. Get assistance with flight bookings and travel arrangements."
        />
      </Head>

      <Navbar />
      <ToastContainer />

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pt-24 pb-12">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-3">
              Starlink Travels Inquiry
            </h1>
            <p className="text-base sm:text-lg text-green-600">
              Fill in your travel details and we'll get back to you soon with
              the best options.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Why Choose Starlink Travels? */}
            <div
              className="order-1 lg:order-none bg-white rounded-xl shadow-lg p-6 h-fit"
            >
              <h2 className="text-2xl sm:text-3xl font-bold text-green-700 mb-4">
                Why Choose Starlink Travels?
              </h2>
              <ul className="space-y-4">
                {[
                  "Competitive flight prices",
                  "24/7 customer support",
                  "Flexible booking options",
                  "Expert travel advice",
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg
                        className="h-5 w-5 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-gray-700">{item}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Need immediate assistance?
                </h3>
                <p className="text-sm text-gray-600">Call us at: +610490887535, ‪+61490887535</p>
                <p className="text-sm text-gray-600">
                  Email: Sydney.starlinktravels@gmail.com
                </p>
              </div>
            </div>

            {/* Travel Form */}
            <div className="order-2 lg:col-span-2 lg:order-none">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-6">
                    Travel Inquiry Form
                  </h2>
                  <form
                    ref={form}
                    onSubmit={handleSubmit}
                    className="space-y-4 sm:space-y-6"
                  >
                    {/* Full Name */}
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label
                        htmlFor="contactNumber"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Contact Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="contactNumber"
                        name="contactNumber"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    {/* Country of Departure */}
                    <div>
                      <label
                        htmlFor="countryOfDeparture"
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Country of Departure{" "}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        list="countries"
                        id="countryOfDeparture"
                        name="countryOfDeparture"
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        placeholder="Select or type a country"
                      />
                      <datalist id="countries">
                        <option value="Australia" />
                        <option value="United States" />
                        <option value="India" />
                        <option value="Nepal" />
                        <option value="United Kingdom" />
                        <option value="Canada" />
                        {/* Add more countries here */}
                      </datalist>
                    </div>

                    {/* Departure Date & Arrival Date */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="departureDate"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Departure Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          id="departureDate"
                          name="departureDate"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="arrivalDate"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Arrival Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          id="arrivalDate"
                          name="arrivalDate"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>

                    {/* Departure Airport & Arrival Airport */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="departureAirport"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Departure Airport{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="departureAirport"
                          name="departureAirport"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="arrivalAirport"
                          className="block text-sm font-medium text-gray-700 mb-1"
                        >
                          Arrival Airport{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="arrivalAirport"
                          name="arrivalAirport"
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isSending}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200 disabled:opacity-50"
                      >
                        {isSending ? "Sending..." : "Submit Travel Inquiry"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>

    </>
  );
}
