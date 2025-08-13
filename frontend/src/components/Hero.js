import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative h-[500px] md:h-[700px] flex items-center justify-center text-center overflow-hidden pt-20 sm:pt-24">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-blue-900/40">
        <img 
          src="/images/hero/hero-section.jpg"
          alt="Happy international students"
          className="w-full h-full object-cover opacity-80"
        />
      </div>
      
      {/* Content Container */}
      <div className="relative z-10 px-4 sm:px-6 max-w-4xl mx-auto text-white">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
          Your Pathway to <span className="text-orange-400">Education Success</span> in Australia
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl mb-6 sm:mb-8 max-w-2xl mx-auto font-light">
          Expert guidance for international students at every step — from course selection to visa approval
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/services" 
            className="px-6 sm:px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-orange-500/30"
          >
            Explore Our Services
          </Link>
          <Link 
            href="/contact" 
            className="px-6 sm:px-8 py-3 bg-transparent hover:bg-white/10 text-white font-semibold rounded-lg border-2 border-white transition-all duration-300 transform hover:scale-105"
          >
            Free Consultation
          </Link>
        </div>
      </div>
    </section>
  );
}
