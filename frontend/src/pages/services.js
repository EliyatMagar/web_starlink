import Head from "next/head";
import Navbar from "../components/Navbar.js";
import Footer from "../components/Footer.js";
import Link from "next/link";
import { FaGraduationCap, FaBriefcase, FaShieldAlt, FaCertificate, FaFileAlt, FaPlane } from "react-icons/fa";

export default function ServicesPage() {
  const services = [
    { 
      slug: "education-counselling", 
      title: "Education Counselling", 
      description: "Personalized guidance for selecting courses and institutions that match your academic goals.",
      icon: <FaGraduationCap className="text-green-600 text-2xl" />
    },
    { 
      slug: "career-counselling", 
      title: "Career Counselling", 
      description: "Expert advice to align your education with future career opportunities in Australia.",
      icon: <FaBriefcase className="text-green-600 text-2xl" />
    },
    { 
      slug: "oshc-ovhc-insurance", 
      title: "OSHC/OVHC Insurance", 
      description: "Comprehensive health cover solutions for students and visa holders in Australia.",
      icon: <FaShieldAlt className="text-green-600 text-2xl" />
    },
    { 
      slug: "recognition-of-prior-learning", 
      title: "Recognition of Prior Learning", 
      description: "Get your work experience and skills formally recognized towards Australian qualifications.",
      icon: <FaCertificate className="text-green-600 text-2xl" />
    },
    { 
      slug: "visa-485-application", 
      title: "485 Visa Application", 
      description: "Professional assistance for your post-study work visa application process.",
      icon: <FaFileAlt className="text-green-600 text-2xl" />
    },
    { 
      slug: "student-visa-assistance", 
      title: "Student Visa Assistance", 
      description: "End-to-end support for your student visa application to ensure success.",
      icon: <FaFileAlt className="text-green-600 text-2xl" />
    },
    { 
      slug: "sop-writing-assistance", 
      title: "SOP Writing Assistance", 
      description: "Expert help crafting compelling Statements of Purpose for your applications.",
      icon: <FaFileAlt className="text-green-600 text-2xl" />
    },
    { 
      slug: "flight-ticket-assistance", 
      title: "Flight Ticket Assistance", 
      description: "Support with booking the best flight options for your journey to Australia.",
      icon: <FaPlane className="text-green-600 text-2xl" />
    },
  ];

  return (
    <>
      <Head>
        <title>Our Services | Starlink Education and Visa Services</title>
        <meta name="description" content="Comprehensive education and visa services for students aspiring to study in Australia. From course selection to visa processing, we guide you at every step." />
      </Head>
      <Navbar />

      {/* Green Background Header Section */}
      <div className="pt-24 pb-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
            Comprehensive solutions tailored to your Australian education and migration journey
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16 -mt-8">
        {/* Services Grid */}
        <section className="mb-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group block bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-green-500"
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="mr-4 p-3 bg-green-50 rounded-lg">
                      {service.icon}
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                      {service.title}
                    </h2>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex items-center text-green-600 font-medium">
                    <span>Learn more</span>
                    <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-8 md:p-10 text-center text-white">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to start your journey?</h2>
          <p className="text-lg mb-6 max-w-2xl mx-auto">
            Contact our experts today for personalized advice on your education and visa options.
          </p>
          <Link href="/contact" className="inline-block bg-white text-green-700 font-semibold px-6 py-3 rounded-lg hover:bg-gray-100 transition-colors">
            Get in Touch
          </Link>
        </section>

      </main>
        <Footer/>
    </>
  );
}