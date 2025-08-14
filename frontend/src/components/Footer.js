import Link from "next/link";
import { servicesData } from "@/data/servicesData";
import { FaFacebookF, FaWhatsapp } from "react-icons/fa"; // added icons

export default function Footer() {
  return (
    <footer className="bg-green-800 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* About */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Starlink Education</h3>
            <p className="text-green-100">
              Expert in education and visa services helping students achieve their Australian study dreams since 2024.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-green-200 hover:text-white">Home</Link></li>
              <li><Link href="/about" className="text-green-200 hover:text-white">About Us</Link></li>
              <li><Link href="/services" className="text-green-200 hover:text-white">Our Services</Link></li>
              <li><Link href="/testimonials" className="text-green-200 hover:text-white">Success Stories</Link></li>
              <li><Link href="/blog" className="text-green-200 hover:text-white">Latest Blogs</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Our Services</h3>
            <ul className="space-y-2">
              {servicesData
                .filter((s) =>
                  [
                    "education-counselling",
                    "career-counselling",
                    "student-visa-assistance",
                    "oshc-ovhc-insurance",
                    "recognition-of-prior-learning",
                  ].includes(s.slug)
                )
                .map((service) => (
                  <li key={service.slug}>
                    <Link
                      href={`/services/${service.slug}`}
                      className="text-green-200 hover:text-white transition"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <p className="text-green-200">Sydney & Tasmania Offices, Australia</p>
            <p className="text-green-200">+61490887535</p>
            <p className="text-green-200">info@starlinkeducation.com</p>

            {/* Social Icons */}
            <div className="flex space-x-4 mt-4">
              <a
                href="https://www.facebook.com/starlinkeducationandvisaservices"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-200 hover:text-white text-xl"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://wa.me/61490887535"
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-200 hover:text-white text-xl"
              >
                <FaWhatsapp />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-green-900 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-sm flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-green-300">&copy; {new Date().getFullYear()} Starlink Education & Visa Services</p>
          <div className="flex space-x-4">
            <Link href="/privacy" className="text-green-300 hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="text-green-300 hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
