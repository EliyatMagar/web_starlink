// components/ServicesSection.js
export default function ServicesSection() {
  const services = [
    {
      title: "Student Visa Assistance",
      description: "End-to-end guidance for Australian student visa applications with 98% success rate.",
      icon: "🎓"
    },
    {
      title: "University Admissions",
      description: "Personalized university shortlisting and application processing.",
      icon: "🏫"
    },
    {
      title: "SOP & LOR Help",
      description: "Expert-written Statements of Purpose and Letters of Recommendation.",
      icon: "✍️"
    },
    {
      title: "Post-Study Work Visa",
      description: "Guidance for transitioning from student to work visa.",
      icon: "🛂"
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6 text-center">
                <span className="text-4xl mb-4 inline-block">{service.icon}</span>
                <h3 className="text-xl font-semibold text-green-700 mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
                <button className="mt-4 text-green-600 hover:text-green-800 font-medium">
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}