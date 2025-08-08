import Head from "next/head";
import Navbar from "../../components/Navbar.js";
import Link from "next/link";
import { FiCalendar, FiClock, FiArrowRight } from "react-icons/fi";
import { FaSearch, FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from "react-icons/fa";

export default function BlogPage() {
  const featuredPost = {
    title: "Top 5 Australian Universities for International Students in 2024",
    excerpt: "Discover the best Australian universities ranked by international student satisfaction, employability rates, and academic excellence.",
    date: "June 15, 2024",
    readTime: "5 min read",
    category: "University Guide",
    image: "/images/blog-featured.jpg",
    slug: "top-5-australian-universities-2024"
  };

  const blogPosts = [
    {
      title: "Understanding the Australian Student Visa Process",
      excerpt: "A step-by-step guide to navigating the complex student visa application process for Australia.",
      date: "June 10, 2024",
      readTime: "4 min read",
      category: "Visa Tips",
      image: "/images/about/founder.jpeg",
      slug: "australian-student-visa-process"
    },
    {
      title: "Scholarships for International Students in Australia",
      excerpt: "Complete list of available scholarships and how to increase your chances of securing one.",
      date: "June 5, 2024",
      readTime: "6 min read",
      category: "Scholarships",
      image: "/images/blog-2.jpg",
      slug: "scholarships-international-students-australia"
    },
    {
      title: "Cost of Living in Major Australian Cities",
      excerpt: "Compare living expenses across Sydney, Melbourne, Brisbane and other popular student destinations.",
      date: "May 28, 2024",
      readTime: "7 min read",
      category: "Living in Australia",
      image: "/images/blog-3.jpg",
      slug: "cost-of-living-australian-cities"
    },
    {
      title: "Post-Study Work Rights in Australia",
      excerpt: "Everything you need to know about working in Australia after completing your studies.",
      date: "May 20, 2024",
      readTime: "5 min read",
      category: "Work Rights",
      image: "/images/blog-4.jpg",
      slug: "post-study-work-rights-australia"
    },
    {
      title: "How to Choose the Right Course in Australia",
      excerpt: "Key factors to consider when selecting your study program in Australia.",
      date: "May 15, 2024",
      readTime: "4 min read",
      category: "Study Advice",
      image: "/images/blog-5.jpg",
      slug: "choosing-right-course-australia"
    },
    {
      title: "Health Insurance Requirements for Students",
      excerpt: "Understanding OSHC and other health insurance requirements for international students.",
      date: "May 10, 2024",
      readTime: "3 min read",
      category: "Health Insurance",
      image: "/images/blog-6.jpg",
      slug: "health-insurance-international-students"
    }
  ];

  const categories = [
    "All Articles",
    "University Guide",
    "Visa Tips",
    "Scholarships",
    "Living in Australia",
    "Work Rights",
    "Study Advice"
  ];

  const popularPosts = [
    {
      title: "IELTS vs PTE: Which English Test Should You Take?",
      slug: "ielts-vs-pte-english-test"
    },
    {
      title: "10 Part-Time Jobs for International Students",
      slug: "part-time-jobs-international-students"
    },
    {
      title: "How to Write a Winning SOP for Australian Universities",
      slug: "winning-sop-australian-universities"
    }
  ];

  return (
    <>
      <Head>
        <title>Blog | Starlink Education and Visa Services</title>
        <meta name="description" content="Expert insights and advice on studying in Australia. Get the latest updates on visas, universities, scholarships, and student life." />
      </Head>
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Blog Header */}
        <section className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Education <span className="text-green-600">Insights</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Expert advice, latest updates, and helpful guides for your Australian education journey
          </p>
        </section>

        {/* Featured Post */}
        <section className="mb-16">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="md:flex">
              <div className="md:w-1/2">
                <img 
                  src={featuredPost.image} 
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 md:w-1/2">
                <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium mb-4">
                  {featuredPost.category}
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6">{featuredPost.excerpt}</p>
                <div className="flex items-center text-gray-500 text-sm mb-6">
                  <FiCalendar className="mr-2" />
                  <span className="mr-4">{featuredPost.date}</span>
                  <FiClock className="mr-2" />
                  <span>{featuredPost.readTime}</span>
                </div>
                <Link 
                  href={`/blog/${featuredPost.slug}`}
                  className="inline-flex items-center text-green-600 font-medium hover:text-green-700 transition-colors"
                >
                  Read full article
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Blog Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="lg:w-2/3">
            {/* Category Filter */}
            <div className="mb-8 overflow-x-auto">
              <div className="flex space-x-2 pb-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap ${index === 0 ? 'bg-green-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              {blogPosts.map((post, index) => (
                <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium mb-3">
                      {post.category}
                    </span>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      <Link href={`/blog/${post.slug}`} className="hover:text-green-600 transition-colors">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 text-sm mb-4">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-gray-500 text-xs">
                      <span>{post.date}</span>
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-3 py-1 rounded-md bg-green-600 text-white font-medium">1</button>
                <button className="px-3 py-1 rounded-md hover:bg-gray-100">2</button>
                <button className="px-3 py-1 rounded-md hover:bg-gray-100">3</button>
                <button className="px-3 py-1 rounded-md hover:bg-gray-100">Next</button>
              </nav>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3">
            {/* Search */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Search Articles</h3>
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Search blog..." 
                  className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                <FaSearch className="absolute right-3 top-3 text-gray-400" />
              </div>
            </div>

            {/* Popular Posts */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Popular Articles</h3>
              <ul className="space-y-3">
                {popularPosts.map((post, index) => (
                  <li key={index}>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-gray-700 hover:text-green-600 transition-colors flex items-start"
                    >
                      <span className="inline-block w-5 h-5 bg-green-100 text-green-800 rounded-full text-xs flex items-center justify-center mr-3 mt-1 flex-shrink-0">
                        {index + 1}
                      </span>
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
              <ul className="space-y-2">
                {categories.slice(1).map((category, index) => (
                  <li key={index}>
                    <Link 
                      href="#" 
                      className="text-gray-700 hover:text-green-600 transition-colors flex justify-between items-center"
                    >
                      <span>{category}</span>
                      <span className="bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">12</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="bg-green-50 p-6 rounded-lg border border-green-100">
              <h3 className="text-lg font-bold text-gray-800 mb-3">Subscribe to Newsletter</h3>
              <p className="text-gray-600 text-sm mb-4">Get the latest study tips and visa updates directly to your inbox</p>
              <form className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                <button 
                  type="submit" 
                  className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition-colors"
                >
                  Subscribe
                </button>
              </form>
              <div className="flex justify-center space-x-4 mt-4">
                <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                  <FaFacebookF />
                </a>
                <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                  <FaTwitter />
                </a>
                <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                  <FaLinkedinIn />
                </a>
                <a href="#" className="text-gray-500 hover:text-green-600 transition-colors">
                  <FaInstagram />
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}