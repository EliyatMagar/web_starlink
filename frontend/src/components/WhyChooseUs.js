import Link from "next/link";

// components/WhyChooseUs.js
export default function WhyChooseUs() {
  const features = [
    {
      title: "MARA Certified",
      description: "Our agents are officially certified by Australian authorities",
      icon: "✅"
    },
    {
      title: "98% Success Rate",
      description: "Industry-leading visa approval statistics",
      icon: "📈"
    },
    {
      title: "End-to-End Support",
      description: "From application to arrival in Australia",
      icon: "🛡️"
    },
    {
      title: "5+ Years Experience",
      description: "Trusted by thousands of students",
      icon: "🏆"
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800">Why Choose Starlink?</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            We make your Australian dream education simple and stress-free
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="bg-green-50 rounded-lg p-6 border border-green-100 hover:border-green-300 transition-colors"
            >
              <span className="text-3xl mb-4 inline-block">{feature.icon}</span>
              <h3 className="text-xl font-semibold text-green-700 mb-2">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 bg-green-100 rounded-xl p-6 text-center">
          <h3 className="text-xl font-semibold text-green-800 mb-2">
            Ready to start your journey?
          </h3>
          <p>Contact our experts today for personalized advice on your education and visa options.</p>
          <Link
          href="/contact">
          <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium ">
            Book Free Consultation
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
}