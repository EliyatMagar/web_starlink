import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Close mobile menu when route changes
  useEffect(() => {
    const handleRouteChange = () => setOpen(false);
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => router.events.off("routeChangeComplete", handleRouteChange);
  }, [router.events]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/services", label: "Services" },
    { href: "/about", label: "About" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className="fixed w-full top-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <img
                src="/images/star-logo.png"
                alt="Starlink Education Logo"
                className="w-25 h-25 md:w-50 md:h-50 object-contain"
              />
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex space-x-4 items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 text-sm font-medium ${
                  router.pathname === link.href
                    ? "text-green-600 border-b-2 border-green-600"
                    : "text-gray-700 hover:text-green-600"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/starlinktravel"
              className="ml-4 px-4 py-2 bg-[#52bf51] text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors border  shadow-sm"
            >
              StarLink Travel
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-green-600 hover:text-green-800 focus:outline-none"
              aria-expanded={open}
              aria-label="Toggle menu"
            >
              <span className="sr-only">Open main menu</span>
              <div className={`w-6 transform transition-all duration-300 ${open ? "rotate-45 translate-y-1.5" : ""}`}>
                <div className={`h-0.5 bg-green-600 mb-1.5 ${open ? "w-6" : "w-6"}`}></div>
                <div className={`h-0.5 bg-green-600 ${open ? "opacity-0" : "opacity-100 w-6"}`}></div>
                <div className={`h-0.5 bg-green-600 mt-1.5 ${open ? "w-6 -rotate-45 -translate-y-1.5" : "w-6"}`}></div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${open ? "block" : "hidden"}`}>
        <div className="px-4 pb-4 space-y-3 bg-white">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                router.pathname === link.href
                  ? "bg-green-50 text-green-600"
                  : "text-gray-700 hover:bg-green-50 hover:text-green-600"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/starlinktravel"
            className="block px-3 py-2 rounded-md text-base font-medium bg-[#52bf51] text-white hover:bg-green-700 text-center"
          >
            StarLink Travel
          </Link>
        </div>
      </div>
    </nav>
  );
}