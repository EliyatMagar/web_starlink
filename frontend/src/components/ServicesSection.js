import Link from 'next/link';
import { FaGraduationCap, FaBriefcase, FaFileAlt } from 'react-icons/fa';

export default function ServicesSection() {
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
      slug: "visa-485-application",
      title: "485 Visa Application",
      description: "Professional assistance for your post-study work visa application process.",
      icon: <FaFileAlt className="text-green-600 text-2xl" />
    },
    {
      slug: "sop-writing-assistance",
      title: "SOP Writing Assistance",
      description: "Expert help crafting compelling Statements of Purpose for your applications.",
      icon: <FaFileAlt className="text-green-600 text-2xl" />
    }
  ];

  return (
    <section className="bg-green-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800">Our Services</h2>
          <p className="mt-4 text-lg text-green-600 max-w-3xl mx-auto">
            Comprehensive solutions for your Australian education journey
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
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
                  <h3 className="text-xl font-semibold text-gray-800 group-hover:text-green-600 transition-colors">
                    {service.title}
                  </h3>
                </div>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <div className="flex items-center text-green-600 font-medium">
                  <span>Learn more</span>
                  <svg
                    className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Services Button */}
        <div className="text-center">
          <Link 
            href="/services" 
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
          >
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
