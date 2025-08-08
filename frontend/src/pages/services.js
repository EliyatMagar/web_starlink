import Head from "next/head";
import Navbar from "../components/Navbar.js";
import Link from "next/link";

export default function ServicesPage() {
  const services = [
    { slug: "education-counselling", title: "Education Counselling" },
    { slug: "career-counselling", title: "Career Counselling" },
    { slug: "oshc-ovhc", title: "OSHC/OVHC Insurance" },
    { slug: "rpl", title: "Recognition of Prior Learning" },
    { slug: "visa-485", title: "485 Visa Application" },
    { slug: "student-visa", title: "Student Visa Assistance" },
    { slug: "sop-writing", title: "SOP Writing Assistance" },
    { slug: "flight-assistance", title: "Flight Ticket Assistance" },
  ];

  return (
    <>
      <Head>
        <title>Our Services | Starlink Education and Visa Services</title>
      </Head>
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 py-12">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-green-700">Our Services</h1>
          <p className="mt-2 text-gray-600">
            Guiding you every step of the way in your Australian journey.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="block bg-white border border-green-100 p-6 rounded-lg shadow-md hover:shadow-lg hover:border-green-300 transition"
            >
              <h2 className="text-lg font-semibold text-green-700">
                {service.title}
              </h2>
              <p className="text-sm text-gray-600 mt-2">
                Learn more →
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
