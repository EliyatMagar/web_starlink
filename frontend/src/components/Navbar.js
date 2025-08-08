import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => setOpen(false);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
    { href: "/starlinktravel", label: "StarLink Travel" },
  ];

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white shadow-lg" : "bg-white shadow-sm"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Replace with your logo image later */}
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-green-600 flex items-center">
              {/* Placeholder for logo - you can replace this with an Image component later */}
              <div className="w-8 h-8 bg-green-100 rounded-full mr-2 flex items-center justify-center">
                <span className="text-green-600 font-bold">SL</span>
              </div>
              StarLink
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-6 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-1 py-2 text-sm font-medium transition-colors ${
                  router.pathname === link.href
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-green-600 hover:text-green-800 focus:outline-none transition-colors"
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              <div className={`w-6 transform transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`}>
                <div className={`h-0.5 bg-green-600 mb-1.5 transition-all ${open ? "w-6" : "w-6"}`}></div>
                <div className={`h-0.5 bg-green-600 transition-all ${open ? "opacity-0" : "opacity-100 w-6"}`}></div>
                <div className={`h-0.5 bg-green-600 mt-1.5 transition-all ${open ? "w-6 -rotate-45 -translate-y-1.5" : "w-6"}`}></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          open ? "max-h-96 py-2" : "max-h-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-3 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium transition-colors ${
                router.pathname === link.href
                  ? "bg-green-50 text-green-600"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}