// pages/admin/dashboard.js
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { authApi, blogApi, getAuthToken, removeAuthToken, getImageUrl } from '@/utils/api';

export default function AdminDashboard() {
  const router = useRouter();
  const [adminData, setAdminData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const token = getAuthToken();
      if (!token) {
        router.push('/admin');
        return;
      }

      try {
        // Fetch admin dashboard data
        const dashboardResponse = await authApi.verifyAuth(token);
        setAdminData({
          id: dashboardResponse.adminID,
          username: dashboardResponse.username || `Admin ${dashboardResponse.adminID}`
        });

        // Fetch blogs and process image URLs
        const blogsResponse = await blogApi.getAllBlogs();
        const processedBlogs = blogsResponse.map(blog => ({
          ...blog,
          createdAt: blog.createdAt ? new Date(blog.createdAt) : new Date(),
          // Get the properly formatted image URL
          imageUrl: blog.image ? getImageUrl(blog.image) : '/default-blog.jpg'
        }));
        setBlogs(processedBlogs);

      } catch (err) {
        console.error('Dashboard error:', err);
        setError(err.message || 'Failed to load dashboard');
        removeAuthToken();
        router.push('/admin');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [router]);

  const handleLogout = () => {
    removeAuthToken();
    router.push('/admin');
  };

  const handleDeleteBlog = async (blogId) => {
    if (confirm('Are you sure you want to delete this blog?')) {
      try {
        await blogApi.deleteBlog(blogId, getAuthToken());
        setBlogs(blogs.filter(blog => blog.id !== blogId));
      } catch (err) {
        console.error('Delete error:', err);
        setError('Failed to delete blog');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {adminData?.username}</span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Total Blogs</h3>
            <p className="mt-2 text-3xl font-bold text-indigo-600">{blogs.length}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Admin ID</h3>
            <p className="mt-2 text-3xl font-bold text-indigo-600">{adminData?.id}</p>
          </div>
          <div className="bg-white shadow rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900">Actions</h3>
            <button
              onClick={() => router.push('/admin/blogs/new')}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            >
              Create New Blog
            </button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Blogs Table */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">Recent Blogs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Image
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created At
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.map((blog) => (
                  <tr key={blog.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="h-16 w-16 relative rounded-md overflow-hidden border border-gray-200">
                        <Image
                          src={blog.imageUrl}
                          alt={`Cover image for ${blog.title}`}
                          width={64}
                          height={64}
                          className="object-cover"
                          quality={80}
                          onError={(e) => {
                            e.currentTarget.src = '/default-blog.jpg';
                            e.currentTarget.onerror = null;
                          }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {blog.createdAt.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button
                        onClick={() => router.push(`/admin/blogs/${blog.id}`)}
                        className="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(blog.id)}
                        className="text-red-600 hover:text-red-900"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}