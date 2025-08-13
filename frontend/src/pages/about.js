import React from "react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { FaGraduationCap, FaGlobeAmericas, FaFileAlt, FaPlane, FaCheck } from "react-icons/fa";

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
      <div className="bg-green-600  py-20 md:py-24 text-white pt-40">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">About Us </h1>
          <p className="text-lg md:text-xl opacity-90 max-w-3xl mx-auto">
           Trusted Guidance for Your Australian Education Journey
          </p>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        {/* Our Story Section - Responsive Stacking */}
        <section className="mb-16 md:mb-24">
          <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-center">
            {/* Image - Now appears first on mobile (order-1) */}
            <div className="w-full lg:w-1/2 order-1 lg:order-2">
              <div className="relative rounded-xl overflow-hidden shadow-lg aspect-[4/5]">
                <img 
                  src="/images/about/founder.jpeg" 
                  alt="Anup Raj Paudel, Managing Director"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4 md:p-6 text-white">
                  <p className="font-medium bg-green-600 border-2 p-2 inline-block ">Anup Raj Paudel</p>
                  <p className="text-sm opacity-90 mt-1">Managing Director</p>
                </div>
              </div>
            </div>
            
            {/* Content - Now appears second on mobile (order-2) */}
            <div className="w-full lg:w-1/2 order-2 lg:order-1">
              <div className="border-l-4 border-green-600 pl-6 mb-6 md:mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Our Story
                </h2>
                <div className="w-16 md:w-20 h-1 bg-green-600 mt-2"></div>
              </div>
              
              <div className="prose text-gray-600 max-w-2xl">
                <p className="text-base md:text-lg">
                  <strong>Starlink Education and Visa Services</strong> was established in <strong>2024</strong> with a vision to provide ethical, professional guidance for international students pursuing education in Australia.
                </p>
                <p className="mt-3 md:mt-4 text-base md:text-lg">
                  Founded by <strong>Anup Raj Paudel</strong> (QEAC-11357), our consultancy combines regulatory expertise with personalized service across our offices in <strong>Tasmania</strong> and <strong>Sydney</strong>.
                </p>
                
                <div className="mt-6 md:mt-8 p-4 md:p-6 bg-gray-50 border border-gray-200 rounded-lg">
                  <p className="italic text-gray-700 text-sm md:text-base">
                    "We believe every student deserves accurate information and compassionate guidance when pursuing their academic dreams abroad."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats - Responsive Grid */}
        <section className="mb-16 md:mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 text-center">
            <StatCircle value="100+" label="Students" />
            <StatCircle value="98%" label="Visa Success" />
            <StatCircle value="20+" label="Institutions" />
            <StatCircle value="2" label="Locations" />
          </div>
        </section>

        {/* Services - Responsive Cards */}
        <section className="mb-16 md:mb-24">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Our Professional Services
            </h2>
            <div className="w-16 md:w-24 h-1 bg-green-600 mx-auto"></div>
            <p className="mt-3 md:mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Comprehensive support for every step of your Australian education journey
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-4 md:gap-6">
            <ServiceCard 
              icon={<FaGraduationCap className="text-green-600" />}
              title="Education Counselling"
              description="Personalized course and institution selection based on your academic background and career goals."
            />
            <ServiceCard 
              icon={<FaGlobeAmericas className="text-green-600" />}
              title="Visa Assistance"
              description="Expert guidance for student visas, graduate visas, and other migration pathways."
            />
            <ServiceCard 
              icon={<FaFileAlt className="text-green-600" />}
              title="SOP & Documentation"
              description="Professional help crafting compelling Statements of Purpose and application documents."
            />
            <ServiceCard 
              icon={<FaPlane className="text-green-600" />}
              title="Pre-Departure Support"
              description="Assistance with flights, accommodation, and settling into Australian life."
            />
          </div>
        </section>

        {/* Why Choose Us - Responsive */}
        <section className="mb-16 md:mb-24 bg-gray-50 rounded-xl p-6 md:p-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
                Why Students Choose Starlink
              </h2>
              <div className="w-16 md:w-24 h-1 bg-green-600 mx-auto"></div>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
              <div className="flex items-start">
                <div className="bg-green-100 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                  <FaCheck className="text-green-600 text-sm md:text-base" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">Registered Expertise</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Officially registered with Australian authorities (ABN: 679958322) for reliable advice.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                  <FaCheck className="text-green-600 text-sm md:text-base" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">Proven Track Record</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    98% visa success rate with hundreds of satisfied students across Australia.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                  <FaCheck className="text-green-600 text-sm md:text-base" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">Ethical Practices</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    We prioritize your best interests, not institutional commissions.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-green-100 p-2 md:p-3 rounded-full mr-3 md:mr-4">
                  <FaCheck className="text-green-600 text-sm md:text-base" />
                </div>
                <div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-1 md:mb-2">Ongoing Support</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Continuous assistance from application through to your studies in Australia.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Offices - Responsive */}
        <section>
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">
              Our Australian Offices
            </h2>
            <div className="w-16 md:w-24 h-1 bg-green-600 mx-auto"></div>
            <p className="mt-3 md:mt-4 text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Visit us for personalized consultations in Tasmania or Sydney
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
            <OfficeCard 
              location="Tasmania Office"
              address="Rosetta, Tasmania – 7010, Australia"
              hours="Monday-Friday: 9am-5pm"
              phone="+61 XXX XXX XXX"
              image="/images/about/tasmania-office.jpg"
            />
            <OfficeCard 
              location="Sydney Office"
              address="Sydney, New South Wales, Australia"
              hours="Monday-Friday: 9am-5pm"
              phone="+61 XXX XXX XXX"
              image="/images/about/sydney-office.jpg"
            />
          </div>
        </section>
      </main>
      
    </>
  );
};

// Stat Circle Component - Responsive
const StatCircle = ({ value, label }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-20 h-20 md:w-32 md:h-32 rounded-full border-2 md:border-4 border-green-600 flex items-center justify-center mb-2 md:mb-3">
        <span className="text-xl md:text-3xl font-bold text-gray-800">{value}</span>
      </div>
      <span className="text-sm md:text-lg text-gray-600">{label}</span>
    </div>
  );
};

// Service Card Component - Responsive
const ServiceCard = ({ icon, title, description }) => {
  return (
    <div className="bg-white p-4 md:p-6 lg:p-8 rounded-xl shadow-sm hover:shadow-md transition-all border border-gray-100">
      <div className="text-2xl md:text-3xl mb-3 md:mb-4">{icon}</div>
      <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2 md:mb-3">{title}</h3>
      <p className="text-gray-600 text-sm md:text-base">{description}</p>
    </div>
  );
};

// Office Card Component - Responsive
const OfficeCard = ({ location, address, hours, phone, image }) => {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
      <div className="h-40 md:h-48 bg-gray-200 overflow-hidden">
        <img 
          src={image} 
          alt={location}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3 md:mb-4">{location}</h3>
        <div className="space-y-2 md:space-y-3 text-gray-600 text-sm md:text-base">
          <p className="flex items-start">
            <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {address}
          </p>
          <p className="flex items-start">
            <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {hours}
          </p>
          <p className="flex items-start">
            <svg className="w-4 h-4 md:w-5 md:h-5 mr-2 md:mr-3 text-green-600 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            {phone}
          </p>
        </div>
      </div>
    </div>
  );
  <Footer/>
};

export default AboutPage;