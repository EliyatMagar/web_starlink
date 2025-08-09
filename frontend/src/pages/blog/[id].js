import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Head from "next/head";
import { blogApi, getImageUrl } from "../../utils/api";
import { FiCalendar, FiClock, FiArrowLeft, FiShare2, FiBookmark, FiMessageSquare } from "react-icons/fi";
import Image from "next/image";
import Link from "next/link";

export default function BlogDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);

  useEffect(() => {
    if (!id) return;

    async function fetchBlogData() {
      try {
        setLoading(true);
        const data = await blogApi.getBlog(id);
        const processedBlog = {
          ...data,
          createdAt: data.createdAt ? new Date(data.createdAt) : new Date(),
          imageUrl: data.image ? getImageUrl(data.image) : '/default-blog.jpg'
        };
        setBlog(processedBlog);
        
        const allPosts = await blogApi.getAllBlogs();
        setRelatedPosts(
          allPosts
            .filter(post => post.id !== id)
            .slice(0, 3)
            .map(post => ({
              ...post,
              createdAt: post.createdAt ? new Date(post.createdAt) : new Date(),
              imageUrl: post.image ? getImageUrl(post.image) : '/default-blog.jpg'
            }))
        );
        
        setError(null);
      } catch (error) {
        console.error("Error fetching blog:", error);
        setError("Failed to load blog. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchBlogData();
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

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: blog.title,
        text: blog.excerpt || blog.content?.replace(/<[^>]*>?/gm, '').slice(0, 100),
        url: window.location.href,
      }).catch(console.error);
    } else {
      setShowShareOptions(!showShareOptions);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setShowShareOptions(false);
  };

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
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center mx-auto"
          >
            <FiArrowLeft className="mr-2" /> Back to Blog List
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
      
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Back button */}
        <div className="mb-6">
          <button
            onClick={() => router.push('/blog')}
            className="flex items-center text-green-600 hover:text-green-800 transition-colors"
          >
            <FiArrowLeft className="mr-2" /> Back to all articles
          </button>
        </div>
        
        <article className="mb-16">
          {/* Article Header */}
          <header className="mb-6">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>
            
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <Image
                    src="/default-avatar.jpg"
                    alt="Author"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">Starlink Team</p>
                  <div className="flex text-gray-500 text-xs space-x-3">
                    <span className="flex items-center">
                      <FiCalendar className="mr-1" /> 
                      {formatDate(blog.createdAt)}
                    </span>
                    <span className="flex items-center">
                      <FiClock className="mr-1" /> 
                      {blog.readTime || "5 min read"}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button 
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`p-2 rounded-full ${isBookmarked ? 'text-green-600 bg-green-50' : 'text-gray-500 hover:bg-gray-100'}`}
                  aria-label={isBookmarked ? "Remove bookmark" : "Bookmark article"}
                >
                  <FiBookmark className={`w-5 h-5 ${isBookmarked ? 'fill-current' : ''}`} />
                </button>
                
                <div className="relative">
                  <button 
                    onClick={handleShare}
                    className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
                    aria-label="Share article"
                  >
                    <FiShare2 className="w-5 h-5" />
                  </button>
                  
                  {showShareOptions && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <button
                        onClick={() => {
                          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(blog.title)}&url=${encodeURIComponent(window.location.href)}`, '_blank');
                          setShowShareOptions(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Share on Twitter
                      </button>
                      <button
                        onClick={() => {
                          window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank');
                          setShowShareOptions(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Share on Facebook
                      </button>
                      <button
                        onClick={copyToClipboard}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Copy link
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>
          
          {/* Responsive Featured Image */}
          <div className="relative w-full aspect-video mb-8 rounded-xl overflow-hidden">
            <Image
              src={blog.imageUrl}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 80vw, 800px"
              onError={(e) => {
                e.currentTarget.src = "/default-blog.jpg";
                e.currentTarget.onerror = null;
              }}
            />
          </div>
          
          {/* Article Content */}
          <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none">
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          </div>
          
          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-12">
              <h3 className="text-sm font-medium text-gray-500 mb-2">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {blog.tags.map(tag => (
                  <span 
                    key={tag} 
                    className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </article>
        
        {/* Comments Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Comments</h2>
            <button className="flex items-center text-green-600 hover:text-green-800">
              <FiMessageSquare className="mr-2" /> Leave a comment
            </button>
          </div>
          <div className="bg-gray-50 rounded-lg p-6 text-center">
            <p className="text-gray-500">Comments feature coming soon</p>
          </div>
        </section>
        
        {/* Related Articles */}
        {relatedPosts.length > 0 && (
          <section className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedPosts.map(post => (
                <article key={post.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <Link href={`/blog/${post.id}`} className="block">
                    <div className="relative w-full aspect-video">
                      <Image
                        src={post.imageUrl}
                        alt={post.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-base sm:text-lg mb-2 line-clamp-2">{post.title}</h3>
                      <div className="flex text-gray-500 text-xs space-x-3">
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
                  </Link>
                </article>
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}