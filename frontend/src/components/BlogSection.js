// components/BlogSection.js
export default function BlogSection() {
  const articles = [
    {
      title: "Australia Student Visa Changes 2024",
      excerpt: "Everything you need to know about the new visa rules effective July 2024",
      date: "June 15, 2024"
    },
    {
      title: "Top 5 Scholarships for Indian Students",
      excerpt: "Complete guide to funding your Australian education",
      date: "May 28, 2024"
    },
    {
      title: "SOP Mistakes That Get Rejected",
      excerpt: "Avoid these 7 common errors in your Statement of Purpose",
      date: "April 10, 2024"
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-green-800">Latest Updates</h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Stay informed with our expert insights
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((article, index) => (
            <div 
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="bg-green-100 h-40"></div>
              <div className="p-6">
                <p className="text-sm text-gray-500 mb-2">{article.date}</p>
                <h3 className="text-xl font-semibold text-green-800 mb-2">{article.title}</h3>
                <p className="text-gray-600 mb-4">{article.excerpt}</p>
                <button className="text-green-600 hover:text-green-800 font-medium">
                  Read Article →
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
}