import Head from "next/head";
import Navbar from "../components/Navbar"; // Make sure you have this
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Thank you! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <>
      <Head>
        <title>Contact Us | Starlink Education and Visa Services</title>
        <meta
          name="description"
          content="Contact Starlink Education and Visa Services for visa guidance, SOP help, and career counselling."
        />
      </Head>

      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12 text-gray-800">
        {/* Page Header */}
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-700">Contact Us</h1>
          <p className="mt-2 text-gray-600">
            We’re here to help you every step of the way.
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Get in Touch
            </h2>
            <p className="mb-4">
              Whether you have questions about visas, admissions, or our
              services, our team is ready to assist you.
            </p>

            <div className="space-y-3">
              <p>
                📍 <strong>Tasmania Office:</strong> Rosetta, Tasmania – 7010,
                Australia
              </p>
              <p>
                📍 <strong>Sydney Office:</strong> Sydney, New South Wales –
                Australia
              </p>
              <p>📧 Email: info@starlinkeducation.com</p>
              <p>📞 Phone: +61 123 456 789</p>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl font-semibold text-green-600 mb-4">
              Send Us a Message
            </h2>
            <form
              onSubmit={handleSubmit}
              className="bg-white shadow-md rounded-lg p-6 border border-green-100"
            >
              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  required
                  className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>

              <button
                type="submit"
                className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-green-800 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
