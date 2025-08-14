import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { adminApi, blogApi, adminToken, getImageUrl } from '@/utils/api';

export default function AdminDashboard() {
  const router = useRouter();
  const [adminData, setAdminData] = useState(null);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState('');
  const [stats, setStats] = useState({
    totalBlogs: 0,
    publishedBlogs: 0,
    draftBlogs: 0
  });

  const handleError = useCallback((error) => {
    const errorMessages = {
      401: 'Unauthorized access - please login again',
      403: 'You do not have permission for this action',
      404: 'The requested resource was not found',
      500: 'Server error, please try again later',
      'Failed to fetch': 'Network error: Unable to connect to server',
      'No authentication token found': 'Session expired. Please login again.',
      'Session verification failed': 'Session verification failed. Please login again.',
      'CSRF token validation failed': 'Security token expired. Please refresh the page.',
      'default': 'An error occurred while loading the dashboard'
    };

    const status = error.status;
    const messageKey = error.message in errorMessages ? error.message : 
                     status in errorMessages ? status : 'default';
    
    setError(errorMessages[messageKey]);

    if (status === 401 || error.message.includes('token') || error.message.includes('session')) {
      adminToken.remove();
      router.push('/admin?sessionExpired=true');
    }
  }, [router]);

  const updateStats = useCallback((blogs) => {
    setStats({
      totalBlogs: blogs.length,
      publishedBlogs: blogs.filter(b => b.status === 'published').length,
      draftBlogs: blogs.filter(b => b.status === 'draft').length
    });
  }, []);

  const fetchData = useCallback(async () => {
    const token = adminToken.get();
    if (!token) {
      handleError(new Error('No authentication token found'));
      return;
    }

    try {
      setLoading(true);
      setError('');

      const sessionResponse = await adminApi.verifySession(token);
      
      if (sessionResponse === null || sessionResponse?.valid === false) {
        throw new Error('Session verification failed');
      }

      const blogsResponse = await blogApi.getAllBlogs(token);
      
      setAdminData({
        id: sessionResponse.adminID || 'default-admin',
        username: sessionResponse.username || `Admin ${sessionResponse.adminID || ''}`,
        lastLogin: sessionResponse.lastLogin ? new Date(sessionResponse.lastLogin) : null
      });

      const processedBlogs = Array.isArray(blogsResponse) ? blogsResponse.map(blog => ({
        ...blog,
        id: blog.id || blog._id || '',
        title: blog.title || 'Untitled Blog',
        excerpt: blog.excerpt || '',
        createdAt: blog.createdAt ? new Date(blog.createdAt) : new Date(),
        updatedAt: blog.updatedAt ? new Date(blog.updatedAt) : null,
        imageUrl: blog.image ? getImageUrl(blog.image) : '/default-blog.jpg',
        status: blog.status || 'draft',
        content: blog.content || '',
        slug: blog.slug || '',
        author: blog.author || 'Admin'
      })) : [];

      setBlogs(processedBlogs);
      updateStats(processedBlogs);

    } catch (err) {
      console.error('Dashboard error:', err);
      handleError(err);
    } finally {
      setLoading(false);
    }
  }, [handleError, updateStats]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = () => {
    adminToken.remove();
    window.location.href = '/admin';
  };

  const handleDeleteBlog = async (blogId) => {
    if (!window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return;
    }

    try {
      setDeletingId(blogId);
      await blogApi.deleteBlog(blogId, adminToken.get());
      
      setBlogs(prev => {
        const updatedBlogs = prev.filter(blog => blog.id !== blogId);
        updateStats(updatedBlogs);
        return updatedBlogs;
      });
      setError('');
    } catch (err) {
      console.error('Delete error:', err);
      handleError(err);
      
      if (err.message.includes('CSRF')) {
        if (window.confirm('Security token expired. Refresh the page?')) {
          window.location.reload();
        }
      }
    } finally {
      setDeletingId(null);
    }
  };

  if (loading && !adminData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-600 mx-auto mb-4"></div>
          <h3 className="text-lg font-medium text-gray-900">Loading Dashboard</h3>
          <p className="mt-1 text-sm text-gray-500">Please wait while we load your data</p>
        </div>
      </div>
    );
  }

  if (error && !adminData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h2 className="text-lg font-medium text-gray-900 mb-2">Dashboard Unavailable</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => router.push('/admin')}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Return to Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <p className="text-sm text-gray-700">Logged in as <span className="font-medium">{adminData?.username}</span></p>
              {adminData?.lastLogin && (
                <p className="text-xs text-gray-500">
                  Last login: {adminData.lastLogin.toLocaleDateString()} at {adminData.lastLogin.toLocaleTimeString()}
                </p>
              )}
            </div>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {error && (
          <div className="mb-6 bg-red-50 border-l-4 border-red-400 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3 mb-8">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-indigo-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">Total Blog Posts</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.totalBlogs}</div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-green-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">Published</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.publishedBlogs}</div>
                  </dd>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="flex items-center">
                <div className="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dt className="text-sm font-medium text-gray-500 truncate">Drafts</dt>
                  <dd className="flex items-baseline">
                    <div className="text-2xl font-semibold text-gray-900">{stats.draftBlogs}</div>
                  </dd>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg leading-6 font-medium text-gray-900">Blog Posts</h2>
          <button
            onClick={() => router.push('/admin/blogs/new')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            New Blog Post
          </button>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Created
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {blogs.length > 0 ? (
                  blogs.map((blog) => (
                    <tr key={blog.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <Image
                              src={blog.imageUrl}
                              alt="Blog cover"
                              width={40}
                              height={40}
                              className="rounded-md object-cover"
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = '/default-blog.jpg';
                              }}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{blog.title}</div>
                            <div className="text-sm text-gray-500 truncate max-w-xs">{blog.excerpt}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          blog.status === 'published' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {blog.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {blog.createdAt.toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-4">
                          <button
                            onClick={() => router.push(`/admin/blogs/${blog.id}`)}
                            className="text-indigo-600 hover:text-indigo-900"
                            disabled={deletingId === blog.id}
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(blog.id)}
                            className="text-red-600 hover:text-red-900"
                            disabled={deletingId === blog.id}
                          >
                            {deletingId === blog.id ? (
                              <>
                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-500 inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Deleting...
                              </>
                            ) : 'Delete'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 text-center text-sm text-gray-500">
                      No blog posts found. Create your first blog post!
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}