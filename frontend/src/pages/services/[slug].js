import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { servicesData } from "../../data/servicesData";
import { FiArrowLeft, FiPhone, FiMail, FiCheckCircle } from "react-icons/fi";

export default function ServiceDetailPage() {
  const router = useRouter();
  const { slug } = router.query;

  const service = servicesData.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg text-gray-600">Loading service details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{service.title} | Starlink Education and Visa Services</title>
        <meta name="description" content={service.description} />
        <meta property="og:image" content={service.image} />
      </Head>

      {/* Hero Section with Gradient Overlay */}
      <section className="relative w-full h-80 md:h-96 lg:h-[28rem]">
        <Image
          src={service.image}
          alt={service.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />
        <div className="absolute inset-0 flex flex-col justify-end items-center text-center text-white pb-12 px-4">
          <div className="max-w-4xl">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
              {service.title}
            </h1>
            <p className="text-lg md:text-xl mt-4 text-gray-200">
              {service.description}
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumb Navigation */}
      <div className="bg-gray-50 py-3 border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-3">
              <li className="inline-flex items-center">
                <Link
                  href="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-green-600"
                >
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <Link
                    href="/services"
                    className="ml-1 text-sm font-medium text-gray-700 hover:text-green-600 md:ml-2"
                  >
                    Services
                  </Link>
                </div>
              </li>
              <li aria-current="page">
                <div className="flex items-center">
                  <svg
                    className="w-4 h-4 text-gray-400"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                  <span className="ml-1 text-sm font-medium text-gray-500 md:ml-2">
                    {service.title}
                  </span>
                </div>
              </li>
            </ol>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Service Details */}
          <div className="lg:col-span-2">
            <div className="prose prose-green max-w-none">
              <h2 className="text-3xl font-bold text-gray-800 mb-6">
                About Our {service.title} Service
              </h2>

              {/* Intro */}
              <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                {service.intro ||
                  "We provide dedicated, personalised support to help you achieve your academic and migration goals."}
              </p>

              {/* Full Details */}
              {service.details.split("\n\n").map((paragraph, i) => (
                <p key={i} className="mb-4 text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}

              {/* Benefits Section */}
              {service.benefits && (
                <div className="mt-10">
                  <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                    Key Benefits
                  </h3>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start">
                        <FiCheckCircle className="flex-shrink-0 h-5 w-5 text-green-500 mt-0.5 mr-2" />
                        <span className="text-gray-700">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* Contact Sidebar */}
          <aside className="space-y-6">
            <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
              <div className="bg-green-600 px-6 py-4">
                <h2 className="text-xl font-semibold text-white">
                  Get Expert Help
                </h2>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-6">
                  Our team of specialists is ready to guide you through the{" "}
                  {service.title.toLowerCase()} process.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                      <FiPhone className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">
                        Call us
                      </p>
                      <p className="text-base font-semibold text-gray-900">
                        +61490887535
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-full">
                      <FiMail className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-500">
                        Email us
                      </p>
                      <p className="text-base font-semibold text-gray-900">
                        Info@starlinkeducation.com
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  href="/contact"
                  className="mt-6 block w-full bg-green-600 hover:bg-green-700 text-white text-center font-semibold px-4 py-3 rounded-lg transition-colors duration-200"
                >
                  Request Consultation
                </Link>
              </div>
            </div>
          </aside>
        </div>

        {/* Back to Services */}
        <div className="mt-16 text-center">
          <Link
            href="/services"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 transition-colors duration-200"
          >
            <FiArrowLeft className="mr-2" />
            Back to Services
          </Link>
        </div>
      </main>
    </>
  );
}
