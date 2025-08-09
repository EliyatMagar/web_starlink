import Head from "next/head";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { blogApi, getImageUrl } from "../../utils/api";
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";
import { FaSearch, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await blogApi.getAllBlogs();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

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
          <p className="text-center text-gray-500">Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p className="text-center text-gray-500">No blogs found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((post) => (
              <div
                key={post._id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
              >
                <img
                  src={getImageUrl(post.image)}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    <Link href={`/blog/${post._id}`} className="hover:text-green-600 transition-colors">
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {post.content?.slice(0, 100)}...
                  </p>
                  <div className="flex items-center justify-between text-gray-500 text-xs">
                    <span>
                      <FiCalendar className="inline mr-1" />{" "}
                      {new Date(post.createdAt).toLocaleDateString()}
                    </span>
                    <span>
                      <FiClock className="inline mr-1" />{" "}
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
