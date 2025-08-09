import { useEffect, useState } from 'react';
import { blogApi, getImageUrl } from '../utils/api';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';

export default function BlogSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentBlogs() {
      try {
        const data = await blogApi.getAllBlogs();
        
        // Process blogs with dates and image URLs
        const processedBlogs = data.map(blog => ({
          ...blog,
          createdAt: blog.createdAt ? new Date(blog.createdAt) : new Date(),
          imageUrl: blog.image ? getImageUrl(blog.image) : '/default-blog.jpg'
        }));
        
        // Sort by date (newest first) and take first 3
        const recentBlogs = processedBlogs
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, 3);
          
        setArticles(recentBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentBlogs();
  }, []);

  function formatDate(date) {
    try {
      if (!date) return "Date not available";
      
      const parsedDate = date instanceof Date ? date : new Date(date);
      
      if (isNaN(parsedDate.getTime())) {
        return "Date not available";
      }

      return parsedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date not available";
    }
  }

  if (loading) {
    return (
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
            Latest <span className="text-green-600">Education</span> Updates
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Stay informed with our expert insights and visa guidance
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {articles.map((article) => (
            <article 
              key={article.id}
              className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = "/default-blog.jpg";
                    e.currentTarget.onerror = null;
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <span className="flex items-center mr-4">
                    <FiCalendar className="mr-1.5" />
                    {formatDate(article.createdAt)}
                  </span>
                  <span className="flex items-center">
                    <FiClock className="mr-1.5" />
                    {article.readTime || "5 min read"}
                  </span>
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                  <Link 
                    href={`/blog/${article.id}`} 
                    className="hover:text-green-600 transition-colors"
                  >
                    {article.title}
                  </Link>
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {article.content?.replace(/<[^>]*>?/gm, '').slice(0, 150)}...
                </p>
                <Link 
                  href={`/blog/${article.id}`} 
                  className="inline-flex items-center text-green-600 font-medium text-sm hover:text-green-700 transition-colors"
                >
                  Read more <FiArrowRight className="ml-1.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="inline-flex items-center border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}