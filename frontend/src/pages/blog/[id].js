import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { blogApi, getImageUrl } from "../../utils/api";
import { FiCalendar, FiClock } from "react-icons/fi";
import Image from "next/image";

export default function BlogDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return; // Wait for id from router

    async function fetchBlog() {
      try {
        const data = await blogApi.getBlog(id);
        // Process blog data with proper date and image URL
        const processedBlog = {
          ...data,
          createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
          imageUrl: data.image ? getImageUrl(data.image) : '/default-blog.jpg'
        };
        setBlog(processedBlog);
        setError(null);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlog();
  }, [id]);

  function formatDate(date) {
    try {
      if (!date) return "Date not available";
      
      const parsedDate = date instanceof Date ? date : new Date(date);
      
      if (isNaN(parsedDate.getTime())) {
        return "Date not available";
      }

      return parsedDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return "Date not available";
    }
  }

  if (loading) {
    return (
      <>
        <Head>
          <title>Loading Blog | Starlink Education</title>
        </Head>
        <Navbar />
        <div className="flex justify-center items-center min-h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600"></div>
        </div>
      </>
    );
  }

  if (error || !blog) {
    return (
      <>
        <Head>
          <title>Blog Not Found | Starlink Education</title>
        </Head>
        <Navbar />
        <div className="max-w-5xl mx-auto px-4 py-10 text-center">
          <h1 className="text-2xl font-bold mb-4 text-red-600">
            {error || "Blog not found"}
          </h1>
          <button
            onClick={() => router.push('/blog')}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
          >
            Back to Blog List
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{blog.title} | Starlink Education</title>
        <meta name="description" content={blog.excerpt || blog.content?.replace(/<[^>]*>?/gm, '').slice(0, 160)} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt || blog.content?.replace(/<[^>]*>?/gm, '').slice(0, 160)} />
        {blog.imageUrl && <meta property="og:image" content={blog.imageUrl} />}
      </Head>
      <Navbar />
      <main className="max-w-5xl mx-auto px-4 py-10">
        <article className="prose prose-lg max-w-none">
          <h1 className="text-4xl font-bold mb-6">{blog.title}</h1>
          
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover"
              onError={(e) => {
                e.currentTarget.src = "/default-blog.jpg";
                e.currentTarget.onerror = null;
              }}
            />
          </div>
          
          <div className="flex text-gray-500 mb-8 space-x-4 text-sm">
            <span className="flex items-center">
              <FiCalendar className="mr-1" /> 
              {formatDate(blog.createdAt)}
            </span>
            <span className="flex items-center">
              <FiClock className="mr-1" /> 
              {blog.readTime || "5 min read"}
            </span>
          </div>
          
          <div dangerouslySetInnerHTML={{ __html: blog.content }} />
        </article>
      </main>
    </>
  );
}