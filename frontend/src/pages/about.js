import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Us | Starlink Education and Visa Services</title>
        <meta
          name="description"
          content="Starlink Education and Visa Services — Your trusted Australian education consultancy for student visas, SOPs, and career guidance."
        />
        <meta property="og:title" content="About Us | Starlink Education and Visa Services" />
        <meta
          property="og:description"
          content="Helping students achieve their dreams in Australia with expert visa, education, and career services."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/starlink-preview.jpg" />
      </Head>

      <Navbar/>

      <main className="max-w-5xl mx-auto px-6 py-12 text-gray-800 leading-relaxed">
        {/* Heading */}
        <header className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-bold text-green-700">
            About Us
          </h1>
          <p className="text-lg text-gray-600 mt-3">
            Your link to success in Australian education & migration.
          </p>
        </header>

        {/* Intro */}
        <section className="mb-10">
          <p className="text-lg">
            <strong>Starlink Education and Visa Services</strong> is a trusted
            Australian education consultancy founded in{" "}
            <strong>2024</strong> in <strong>Sydney</strong>, now proudly
            operating in both <strong>Tasmania</strong> and{" "}
            <strong>Sydney</strong>.
          </p>

          <p className="mt-4">
            Led by <strong>Anup Raj Paudel</strong>, Education Counsellor and
            Managing Director, our mission is to guide international students
            towards a successful academic and professional future in Australia.
            We are officially registered under{" "}
            <strong>ABN: 679958322</strong> and partnered with reputed colleges
            and universities nationwide.
          </p>
        </section>

        {/* Offices */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-green-600 mb-3">
            Our Offices
          </h2>
          <ul className="list-disc list-inside space-y-1 text-gray-700">
            <li>Rosetta, Tasmania – 7010, Australia</li>
            <li>Sydney, New South Wales – Australia</li>
          </ul>
        </section>

        {/* Services */}
        <section className="mb-10">
          <h2 className="text-2xl font-semibold text-green-600 mb-3">
            Our Services
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 list-disc list-inside text-gray-700">
            <li>Education Counselling</li>
            <li>Career Counselling</li>
            <li>OSHC/OVHC Insurance Guidance</li>
            <li>Recognition of Prior Learning (RPL)</li>
            <li>485 Visa Application Assistance</li>
            <li>Student Visa Assistance</li>
            <li>SOP Writing Support</li>
            <li>Flight Ticket Booking Assistance</li>
          </ul>
        </section>

        {/* Why Choose Us */}
        <section className="mb-10 bg-green-50 p-6 rounded-xl border border-green-100">
          <h2 className="text-2xl font-semibold text-green-700 mb-3">
            Why Choose Us?
          </h2>
          <p>
            We believe every student deserves honest, accurate, and timely
            support when pursuing their dreams abroad. From your first student
            visa to your SOP and travel arrangements, our experienced team will
            guide you step-by-step.
          </p>
          <p className="mt-4 font-semibold text-green-700">
            Let us be your link to success — Starlink Education and Visa
            Services.
          </p>
        </section>
      </main>
    </>
  );
};

export default AboutPage;
