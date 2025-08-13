import Head from "next/head";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { blogApi, getImageUrl } from "../../utils/api";
import {
  FiCalendar,
  FiClock,
  FiArrowRight,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import Image from "next/image";

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState("newest");
  const postsPerPage = 6;

  // Sample categories - you would fetch these from your API in a real app
  const categories = [
    { id: 1, name: "Visa Information" },
    { id: 2, name: "University Guides" },
    { id: 3, name: "Scholarships" },
    { id: 4, name: "Student Life" },
    { id: 5, name: "Career Advice" },
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    async function fetchBlogs() {
      try {
        const data = await blogApi.getAllBlogs();
        const processedBlogs = data.map((blog) => ({
          ...blog,
          createdAt: blog.createdAt ? new Date(blog.createdAt) : new Date(),
          imageUrl: blog.image ? getImageUrl(blog.image) : "/default-blog.jpg",
          // Add a sample category for demo purposes
          category: categories[Math.floor(Math.random() * categories.length)],
        }));
        setBlogs(processedBlogs);
        setFilteredBlogs(processedBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlogs();
  }, []);

  useEffect(() => {
    let results = [...blogs];

    // Apply search filter
    if (searchQuery) {
      results = results.filter(
        (blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          blog.content.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory) {
      results = results.filter(
        (blog) => blog.category && blog.category.id === selectedCategory.id
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "newest":
        results.sort((a, b) => b.createdAt - a.createdAt);
        break;
      case "oldest":
        results.sort((a, b) => a.createdAt - b.createdAt);
        break;
      case "popular":
        // Assuming we have a views property
        results.sort((a, b) => (b.views || 0) - (a.views || 0));
        break;
      default:
        break;
    }

    setFilteredBlogs(results);
    setCurrentPage(1); // Reset to first page when filters change
  }, [blogs, searchQuery, selectedCategory, sortOption]);

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

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredBlogs.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredBlogs.length / postsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Head>
        <title>Blog | Starlink Education and Visa Services</title>
        <meta
          name="description"
          content="Expert insights and advice on studying in Australia. Get the latest updates on visas, universities, scholarships, and student life."
        />
      </Head>

      <div className="pt-24 pb-16 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Education insight
          </h1>
          <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto">
           Expert advice, latest updates, and helpful guides for your Australian education journey
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Hero Section */}

        {/* Search and Filter Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search articles..."
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <label
                  htmlFor="sort"
                  className="mr-2 text-sm font-medium text-gray-700"
                >
                  Sort by:
                </label>
                <select
                  id="sort"
                  className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 rounded-lg"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </div>

          {/* Category Filters */}
          <div className="mt-6 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                !selectedCategory
                  ? "bg-green-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              All Topics
            </button>
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  selectedCategory?.id === category.id
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Blog Posts */}
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
          </div>
        ) : filteredBlogs.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">
              No articles found matching your criteria.
            </p>
            <button
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory(null);
              }}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {currentPosts.map((post) => (
                <article
                  key={post.id}
                  className="group bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={post.imageUrl}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.currentTarget.src = "/default-blog.jpg";
                        e.currentTarget.onerror = null;
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                    {post.category && (
                      <span className="absolute top-4 right-4 bg-green-600 text-white text-xs font-medium px-2.5 py-0.5 rounded-full">
                        {post.category.name}
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <span className="flex items-center mr-4">
                        <FiCalendar className="mr-1.5" />
                        {formatDate(post.createdAt)}
                      </span>
                      <span className="flex items-center">
                        <FiClock className="mr-1.5" />
                        {post.readTime || "5 min read"}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 line-clamp-2">
                      <Link
                        href={`/blog/${post.id}`}
                        className="hover:text-green-600 transition-colors"
                      >
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-5 line-clamp-3">
                      {post.content?.replace(/<[^>]*>?/gm, "").slice(0, 150)}...
                    </p>
                    <Link
                      href={`/blog/${post.id}`}
                      className="inline-flex items-center text-green-600 font-medium text-sm hover:text-green-700 transition-colors"
                    >
                      Read more <FiArrowRight className="ml-1.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex items-center justify-center space-x-2">
                <button
                  onClick={() => paginate(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className={`p-2 rounded-full ${
                    currentPage === 1
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FiChevronLeft className="w-5 h-5" />
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        currentPage === number
                          ? "bg-green-600 text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    paginate(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className={`p-2 rounded-full ${
                    currentPage === totalPages
                      ? "text-gray-400 cursor-not-allowed"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <FiChevronRight className="w-5 h-5" />
                </button>
              </div>
            )}
          </>
        )}
      </main>
    </>
  );
}
