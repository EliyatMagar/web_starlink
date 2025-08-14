import { useState } from 'react';
import { useRouter } from 'next/router';
import { blogApi, adminToken } from '@/utils/api';

export default function CreateBlogPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    image: null
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const token = adminToken.get();
      if (!token) {
        throw new Error('Authentication required. Please login again.');
      }

      // Client-side validation
      if (!formData.title.trim()) {
        throw new Error('Title is required');
      }
      if (formData.title.length > 100) {
        throw new Error('Title must be less than 100 characters');
      }
      if (!formData.content.trim()) {
        throw new Error('Content is required');
      }
      if (formData.content.length < 50) {
        throw new Error('Content must be at least 50 characters');
      }

      const data = new FormData();
      data.append('title', formData.title);
      data.append('content', formData.content);
      if (formData.image) {
        data.append('image', formData.image);
      }

      const response = await blogApi.createBlog({
        title:formData.title,
        content:formData.content,
        image:formData.image
      });
      
      if (response.blog) {
        router.push('/admin/dashboard');
      } else {
        throw new Error(response.message || 'Blog creation failed');
      }
    } catch (err) {
      console.error('Create error:', err);
      
      // Handle API validation errors
      if (err.status === 400) {
        if (err.data?.errors) {
          // Format validation errors from server
          const errorMessages = Object.entries(err.data.errors)
            .map(([field, messages]) => (
              `${field.charAt(0).toUpperCase() + field.slice(1)}: ${
                Array.isArray(messages) ? messages.join(', ') : messages
              }`
            ))
            .join('\n');
          setError(errorMessages);
        } else {
          setError(err.data?.message || 'Invalid data. Please check your inputs.');
        }
      } else {
        setError(err.message || 'An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Only image files are allowed (JPEG, PNG)');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      setFormData(prev => ({ ...prev, image: file }));
      setError('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Create New Blog Post</h1>
          
          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 whitespace-pre-line">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title *
              </label>
              <input
                id="title"
                name="title"
                type="text"
                required
                minLength={3}
                maxLength={100}
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Enter blog title (3-100 characters)"
              />
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700">
                Content *
              </label>
              <textarea
                id="content"
                name="content"
                rows={10}
                required
                minLength={50}
                value={formData.content}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Write your blog content here (minimum 50 characters)"
              />
            </div>

            <div>
              <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                Featured Image
              </label>
              <input
                id="image"
                name="image"
                type="file"
                accept="image/jpeg, image/png"
                onChange={handleImageChange}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
              <p className="mt-1 text-sm text-gray-500">JPEG or PNG only, max 5MB</p>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => router.push('/admin/dashboard')}
                className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : 'Create Post'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}