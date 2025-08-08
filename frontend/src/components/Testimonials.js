// components/Testimonials.js
export default function Testimonials() {
  const testimonials = [
    {
      quote: "Starlink helped me get into my dream university with scholarship!",
      name: "Rahul Sharma",
      course: "Masters in IT, University of Sydney"
    },
    {
      quote: "My visa was approved in just 3 weeks thanks to their expertise.",
      name: "Priya Patel",
      course: "Bachelor of Nursing, UTS"
    },
    {
      quote: "The SOP they wrote got me admission in top 3 universities I applied.",
      name: "Arjun Kapoor",
      course: "MBA, Melbourne Business School"
    }
  ];

  return (
    <section className="bg-green-800 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold">Success Stories</h2>
          <p className="mt-4 text-green-200 max-w-3xl mx-auto">
            Hear from students who achieved their Australian dreams with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-green-700 rounded-xl p-6 hover:bg-green-600 transition-colors"
            >
              <svg 
                className="h-8 w-8 text-green-300 mb-4" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
              <p className="italic mb-4">"{testimonial.quote}"</p>
              <p className="font-semibold">{testimonial.name}</p>
              <p className="text-green-300 text-sm">{testimonial.course}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}