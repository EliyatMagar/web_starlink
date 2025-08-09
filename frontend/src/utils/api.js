// utils/api.js
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

async function handleResponse(response) {
  // First check if response exists
  if (!response) {
    throw new Error('No response from server - check your network connection');
  }

  // Handle non-JSON responses
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) {
    const text = await response.text();
    throw new Error(`Invalid response format: ${text}`);
  }

  const data = await response.json();

  if (!response.ok) {
    console.error('API Error Response:', {
      status: response.status,
      data: data
    });
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data;
}

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/default-blog.jpg';
  
  // Remove any leading slashes or duplicate uploads paths
  const cleanPath = imagePath
    .replace(/^\/+/, '')
    .replace(/^uploads\//, '')
    .replace(/^\/?api\/uploads\//, '');
  
  return `${API_BASE_URL}/uploads/${cleanPath}`;
};


// Auth API
export const authApi = {
  login: async (credentials) => {
    try {
      console.log('[API] Login request to:', `${API_BASE_URL}/admin/login`);
      
      const response = await fetch(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      console.log('[API] Login response status:', response.status);
      return handleResponse(response);
    } catch (error) {
      console.error('[API] Network error:', error);
      throw new Error('Failed to connect to server. Please try again.');
    }
  },

  verifyAuth: async (token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      console.error('[API] Auth verification error:', error);
      throw new Error('Failed to verify authentication');
    }
  }
};

// Blog API
export const blogApi = {
  getAllBlogs: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs`);
      return handleResponse(response);
    } catch (error) {
      console.error('[API] Get all blogs error:', error);
      throw new Error('Failed to fetch blogs');
    }
  },

  getBlog: async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/blogs/${id}`);
      return handleResponse(response);
    } catch (error) {
      console.error('[API] Get blog error:', error);
      throw new Error(`Failed to fetch blog with ID ${id}`);
    }
  },

  createBlog: async (blogData, token) => {
    try {
      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('content', blogData.content);
      if (blogData.image) {
        formData.append('image', blogData.image);
      }

      const response = await fetch(`${API_BASE_URL}/admin/blogs`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      console.error('[API] Create blog error:', error);
      throw new Error('Failed to create blog');
    }
  },

  updateBlog: async (id, blogData, token) => {
    try {
      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('content', blogData.content);
      if (blogData.image) {
        formData.append('image', blogData.image);
      }

      const response = await fetch(`${API_BASE_URL}/admin/blogs/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      return handleResponse(response);
    } catch (error) {
      console.error('[API] Update blog error:', error);
      throw new Error(`Failed to update blog with ID ${id}`);
    }
  },

  deleteBlog: async (id, token) => {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      return handleResponse(response);
    } catch (error) {
      console.error('[API] Delete blog error:', error);
      throw new Error(`Failed to delete blog with ID ${id}`);
    }
  }
};

// Helper functions
export const storeAuthToken = (token) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('authToken', token);
  }
};

export const getAuthToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('authToken');
  }
  return null;
};

export const removeAuthToken = () => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('authToken');
  }
};

