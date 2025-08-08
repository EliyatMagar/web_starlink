import Head from "next/head";
import Navbar from "../components/Navbar";
import { useState } from "react";

export default function StarlinkTravels() {
  const [formData, setFormData] = useState({
    name: "",
    countryOfDeparture: "",
    departureDate: "",
    arrivalDate: "",
    departureAirport: "",
    arrivalAirport: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Thank you! We will contact you regarding your travel plan.");
    setFormData({
      name: "",
      countryOfDeparture: "",
      departureDate: "",
      arrivalDate: "",
      departureAirport: "",
      arrivalAirport: "",
    });
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

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pt-24 pb-12">
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <header className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-green-800 mb-3">
              Starlink Travels Inquiry
            </h1>
            <p className="text-base sm:text-lg text-green-600">
              Fill in your travel details and we'll get back to you soon with the best options.
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Travel Information - Hidden on mobile, shown on lg+ */}
            <div className="hidden lg:block bg-white rounded-xl shadow-lg p-6 h-fit">
              <h2 className="text-xl font-bold text-green-700 mb-4">
                Why Choose Starlink Travels?
              </h2>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">Competitive flight prices</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">24/7 customer support</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">Flexible booking options</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="flex-shrink-0 mt-1">
                    <svg className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-gray-700">Expert travel advice</p>
                  </div>
                </li>
              </ul>

              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Need immediate assistance?</h3>
                <p className="text-sm text-gray-600">Call us at: +61 123 456 789</p>
                <p className="text-sm text-gray-600">Email: travel@starlinkeducation.com</p>
              </div>
            </div>

            {/* Travel Form - Takes full width on mobile, 2/3 on desktop */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-6">
                    Travel Inquiry Form
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label htmlFor="countryOfDeparture" className="block text-sm font-medium text-gray-700 mb-1">
                        Country of Departure <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="countryOfDeparture"
                        name="countryOfDeparture"
                        value={formData.countryOfDeparture}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="departureDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Departure Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          id="departureDate"
                          name="departureDate"
                          value={formData.departureDate}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="arrivalDate" className="block text-sm font-medium text-gray-700 mb-1">
                          Arrival Date <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="date"
                          id="arrivalDate"
                          name="arrivalDate"
                          value={formData.arrivalDate}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="departureAirport" className="block text-sm font-medium text-gray-700 mb-1">
                          Departure Airport <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="departureAirport"
                          name="departureAirport"
                          value={formData.departureAirport}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                      <div>
                        <label htmlFor="arrivalAirport" className="block text-sm font-medium text-gray-700 mb-1">
                          Arrival Airport <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="arrivalAirport"
                          name="arrivalAirport"
                          value={formData.arrivalAirport}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition duration-200"
                      >
                        Submit Travel Inquiry
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