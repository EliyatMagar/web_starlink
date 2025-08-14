import { useEffect, useState } from 'react';
import { blogApi } from '../utils/api';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';
import Link from 'next/link';
import Image from 'next/image';

export default function BlogSection() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchRecentBlogs() {
      try {
        const data = await blogApi.getAllBlogs();
        
        // Process blogs with proper dates and image URLs
        const processedBlogs = data.map(blog => ({
          ...blog,
          id: blog.id || blog._id, // Handle different ID formats
          createdAt: blog.createdAt ? new Date(blog.createdAt) : new Date(),
          imageUrl: getImageUrl(blog.image),
          excerpt: blog.excerpt || blog.content?.substring(0, 150) + '...' || ''
        }));
        
        // Sort by date (newest first) and take first 3
        const recentBlogs = processedBlogs
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, 3);
          
        setArticles(recentBlogs);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    }

    fetchRecentBlogs();
  }, []);

  function getImageUrl(imagePath) {
    if (!imagePath) return '/default-blog.jpg';
    const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';
    return `${API_BASE_URL.replace('/api', '')}${imagePath}`;
  }

  function formatDate(date) {
    try {
      const parsedDate = date instanceof Date ? date : new Date(date);
      if (isNaN(parsedDate.getTime())) return "Date not available";
      
      return parsedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    } catch {
      return "Date not available";
    }
  }

  if (loading) {
    return (
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-gray-100 rounded-xl h-96 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
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

        {articles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {articles.map((article) => (
              <article 
                key={article.id}
                className="group bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    placeholder="blur"
                    blurDataURL="/default-blog-blur.jpg"
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
                      aria-label={`Read more about ${article.title}`}
                    >
                      {article.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {article.excerpt}
                  </p>
                  <Link 
                    href={`/blog/${article.id}`} 
                    className="inline-flex items-center text-green-600 font-medium text-sm hover:text-green-700 transition-colors"
                    aria-label={`Read more about ${article.title}`}
                  >
                    Read more <FiArrowRight className="ml-1.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog articles found.</p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link 
            href="/blog"
            className="inline-flex items-center border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-6 py-3 rounded-lg font-medium transition-colors"
            aria-label="View all blog articles"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}