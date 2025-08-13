import Head from "next/head";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ContactPage() {
  const form = useRef();
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSending(true);

    emailjs
      .sendForm(
        "service_xkeqcap", // EmailJS Service ID
        "template_bz2qtlq", // EmailJS Template ID
        form.current,
        "H5IjVjxj_09G1yhVo" // EmailJS Public Key
      )
      .then(
        () => {
          setIsSending(false);
          form.current.reset();
          toast.success("Message sent successfully! ✅", {
            position: "top-right",
            autoClose: 3000,
            theme: "dark",
          });
        },
        (error) => {
          setIsSending(false);
          console.error("Error sending message:", error);
          toast.error("Failed to send message. Please try again.", {
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
        <title>Contact Us | Starlink Education and Visa Services</title>
        <meta
          name="description"
          content="Contact Starlink Education and Visa Services for visa guidance, SOP help, and career counselling."
        />
      </Head>

      <ToastContainer />

      {/* Green Background Header Section */}
      <div className="pt-24 pb-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
            We're here to help you every step of the way with your education and
            visa journey.
          </p>
        </div>
      </div>

      <div className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 pt-24 pb-12">
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col-reverse lg:flex-row gap-8 lg:gap-12">
            {/* Contact Information */}
            <div className="bg-white rounded-xl shadow-lg p-6 lg:p-8 w-full lg:w-1/2">
              <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 sm:mb-6">
                Get in Touch
              </h2>
              <p className="mb-4 sm:mb-6 text-gray-700 text-sm sm:text-base">
                Whether you have questions about visas, admissions, or our
                services, our team is ready to assist you.
              </p>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900">
                      Tasmania Office
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Rosetta, Tasmania – 7010, Australia
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900">
                      Sydney Office
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      Sydney, New South Wales – Australia
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900">
                      Email
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      info@starlinkeducation.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5 sm:mt-1">
                    <svg
                      className="h-4 w-4 sm:h-5 sm:w-5 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                      />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-xs sm:text-sm font-medium text-gray-900">
                      Phone
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500">
                      +61 123 456 789
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form with EmailJS */}
            <div className="w-full lg:w-1/2">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="p-6 sm:p-8">
                  <h2 className="text-xl sm:text-2xl font-bold text-green-700 mb-4 sm:mb-6">
                    Send Us a Message
                  </h2>
                  <form
                    ref={form}
                    onSubmit={sendEmail}
                    className="space-y-4 sm:space-y-6"
                  >
                    <div>
                      <label
                        htmlFor="user_name"
                        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="user_name"
                        name="user_name"
                        required
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="user_email"
                        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="user_email"
                        name="user_email"
                        required
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="subject"
                        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                      >
                        Subject
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        required
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-xs sm:text-sm font-medium text-gray-700 mb-1"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows="4"
                        required
                        className="w-full px-3 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 sm:py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
                    >
                      {isSending ? "Sending..." : "Send Message"}
                    </button>
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
