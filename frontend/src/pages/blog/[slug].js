import { useRouter } from "next/router";
import Head from "next/head";
import Navbar from "../../components/Navbar";
import { useEffect, useState } from "react";
import { blogApi, getImageUrl } from "../../utils/api";

export default function SingleBlogPage() {
  const router = useRouter();
  const { slug } = router.query; // slug = blog ID
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    async function fetchBlog() {
      try {
        const data = await blogApi.getBlog(slug);
        setBlog(data);
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [slug]);

  if (loading) {
    return <p className="text-center py-10 text-gray-500">Loading...</p>;
  }

  if (!blog) {
    return <p className="text-center py-10 text-gray-500">Blog not found.</p>;
  }

  return (
    <>
      <Head>
        <title>{blog.title} | Starlink Education</title>
        <meta name="description" content={blog.excerpt || blog.content?.slice(0, 150)} />
      </Head>
      <Navbar />

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <img
          src={getImageUrl(blog.image)}
          alt={blog.title}
          className="w-full h-80 object-cover rounded-lg shadow-md mb-6"
        />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{blog.title}</h1>
        <div className="text-gray-500 text-sm mb-6">
          {new Date(blog.createdAt).toLocaleDateString()}
        </div>
        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
      </main>
    </>
  );
}
