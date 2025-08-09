import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "../../data/servicesData";

export default function ServiceDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading service details...</p>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{service.title} | Starlink Education and Visa Services</title>
        <meta name="description" content={service.description} />
      </Head>
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-72 md:h-96">
        <Image
          src={service.image}
          alt={service.title}
          fill
          priority
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center text-white px-4">
          <div className="bg-green-600 p-4 rounded-full shadow-lg mb-4">
            {service.icon}
          </div>
          <h1 className="text-3xl md:text-5xl font-bold">{service.title}</h1>
          <p className="text-lg md:text-xl mt-3 max-w-2xl text-green-100">
            {service.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Service Details */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl md:text-3xl font-bold text-green-700 mb-6">
              About {service.title}
            </h2>

            {/* Intro */}
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {service.intro || "We provide dedicated, personalised support to help you achieve your academic and migration goals."}
            </p>

            {/* Full Details */}
            <div className="prose prose-green max-w-none">
              {service.details.split("\n").map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </div>

          {/* Contact Sidebar */}
          <aside className="bg-white rounded-xl shadow-lg p-6 border border-gray-200">
            <h2 className="text-xl font-semibold text-green-700 mb-4">
              Need Help?
            </h2>
            <p className="text-gray-600 mb-4">
              Our team is here to assist you with {service.title.toLowerCase()} and other services.
            </p>
            <div className="space-y-3">
              <p className="text-sm text-gray-700">
                <strong>📞 Call us:</strong> +61 123 456 789
              </p>
              <p className="text-sm text-gray-700">
                <strong>📧 Email:</strong> travel@starlinkeducation.com
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-6 block bg-green-600 hover:bg-green-700 text-white text-center font-semibold px-4 py-3 rounded-lg transition-colors"
            >
              Contact Us
            </Link>
          </aside>
        </div>

        {/* Back to Services */}
        <div className="mt-12 text-center">
          <Link
            href="/services"
            className="inline-flex items-center text-green-600 font-medium hover:underline"
          >
            ← Back to Services
          </Link>
        </div>
      </main>

      <Footer />
    </>
  );
}
