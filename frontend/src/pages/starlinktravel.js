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
      </Head>
      <Navbar />

      <main className="max-w-3xl mx-auto px-6 py-12">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-green-700">
            Starlink Travels Inquiry
          </h1>
          <p className="text-gray-600 mt-2">
            Fill in your travel details and we’ll get back to you soon.
          </p>
        </header>

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded-lg p-6 border border-green-100"
        >
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Country of Departure
            </label>
            <input
              type="text"
              name="countryOfDeparture"
              value={formData.countryOfDeparture}
              onChange={handleChange}
              required
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Preferred Departure Date
              </label>
              <input
                type="date"
                name="departureDate"
                value={formData.departureDate}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Preferred Arrival Date
              </label>
              <input
                type="date"
                name="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                Departure Airport Name
              </label>
              <input
                type="text"
                name="departureAirport"
                value={formData.departureAirport}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">
                Arrival Airport Name
              </label>
              <input
                type="text"
                name="arrivalAirport"
                value={formData.arrivalAirport}
                onChange={handleChange}
                required
                className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-600"
              />
            </div>
          </div>

          <button
            type="submit"
            className="bg-green-700 text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
          >
            Submit Inquiry
          </button>
        </form>
      </main>
    </>
  );
}
