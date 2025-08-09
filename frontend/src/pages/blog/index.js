import Head from "next/head";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { blogApi, getImageUrl } from "../../utils/api";
import { FiCalendar, FiClock } from "react-icons/fi";
import Image from "next/image";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await blogApi.getAllBlogs();
        // Process blogs with proper dates and image URLs
        const processedBlogs = data.map(blog => ({
          ...blog,
          createdAt: blog.createdAt ? new Date(blog.createdAt) : new Date(), // Fallback to current date if not available
          imageUrl: blog.image ? getImageUrl(blog.image) : '/default-blog.jpg'
        }));
        setBlogs(processedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  // Improved date formatting function with better error handling
  function formatDate(date) {
    try {
      if (!date) return "Date not available";
      
      // Handle both string and Date object inputs
      const parsedDate = date instanceof Date ? date : new Date(date);
      
      if (isNaN(parsedDate.getTime())) {
        return "Date not available";
      }

      return parsedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date not available";
    }
  }

  return (
    <>
      <Head>
        <title>Blog | Starlink Education and Visa Services</title>
        <meta
          name="description"
          content="Expert insights and advice on studying in Australia. Get the latest updates on visas, universities, scholarships, and student life."
        />
      </Head>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Education <span className="text-green-600">Insights</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Expert advice, latest updates, and helpful guides for your Australian education journey
          </p>
        </section>

        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <div
                key={post.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    className="object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/default-blog.jpg";
                      e.currentTarget.onerror = null;
                    }}
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                    <Link 
                      href={`/blog/${post.id}`} 
                      className="hover:text-green-600 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {post.content?.replace(/<[^>]*>?/gm, '').slice(0, 150)}...
                  </p>
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span className="flex items-center">
                      <FiCalendar className="mr-1" />
                      {formatDate(post.createdAt)}
                    </span>
                    <span className="flex items-center">
                      <FiClock className="mr-1" />
                      {post.readTime || "5 min read"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </>
  );
}