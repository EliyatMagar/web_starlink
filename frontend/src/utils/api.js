const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8080/api';

const fetchWithTimeout = async (url, options = {}, timeout = 8000) => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  
  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
      credentials: 'include'
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    const errorMessage = error.name === 'AbortError' ? 'Request timeout' : 
                       error.message || 'Network request failed';
    throw new Error(errorMessage);
  }
};

async function handleResponse(response) {
  if (!response) {
    throw new Error('No response from server');
  }

  // Clone the response for fallback
  const responseClone = response.clone();
  
  try {
    const contentType = response.headers.get('content-type');
    const isJson = contentType?.includes('application/json');
    
    if (isJson) {
      const data = await response.json();
      
      if (!response.ok) {
        // Enhanced error handling for 400 responses
        if (response.status === 400) {
          // Extract validation errors if available
          const validationErrors = data.errors 
            ? Object.entries(data.errors).map(([field, messages]) => (
                `${field}: ${Array.isArray(messages) ? messages.join(', ') : messages}`
              )).join('\n')
            : data.message || 'Invalid request data';
          
          const error = new Error(validationErrors);
          error.status = response.status;
          error.data = data;
          throw error;
        }
        
        // Handle other error statuses
        const error = new Error(data.message || `Request failed with status ${response.status}`);
        error.status = response.status;
        error.data = data;
        throw error;
      }
      
      return data;
    }
    
    // Handle non-JSON responses
    const textData = await response.text();
    if (!response.ok) {
      throw new Error(textData || `Request failed with status ${response.status}`);
    }
    return textData;
    
  } catch (error) {
    // Handle JSON parsing errors
    if (error instanceof SyntaxError) {
      const textData = await responseClone.text();
      if (!response.ok) {
        throw new Error(textData || `Request failed with status ${response.status}`);
      }
      return textData;
    }
    throw error;
  }
}

export const adminApi = {
  login: async ({ email, password }) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      return handleResponse(response);
    } catch (error) {
      if (error.message.includes('Failed to fetch')) {
        throw new Error('Cannot connect to server. Please check your network connection.');
      }
      throw error;
    }
  },

  verifySession: async (token) => {
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/admin/verify-session`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });
      
      if (response.status === 404) {
        const testResponse = await fetchWithTimeout(`${API_BASE_URL}/admin/blogs`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        return { valid: testResponse.ok, adminID: 'default-admin' };
      }
      
      return handleResponse(response);
    } catch (error) {
      console.error('Session verification error:', error);
      return { valid: false };
    }
  }
};

export const adminToken = {
  store: (token) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('adminToken', token);
    }
  },
  get: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('adminToken');
    }
    return null;
  },
  remove: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('adminToken');
    }
  }
};

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '/default-blog.jpg';
  if (imagePath.startsWith('http')) return imagePath;
  
  const cleanPath = imagePath
    .replace(/^\/+/, '')
    .replace(/\\/g, '/')
    .replace(/\/+/g, '/');

  const finalPath = cleanPath.includes('uploads/') 
    ? cleanPath 
    : `uploads/${cleanPath}`;

  return `${API_BASE_URL.replace('/api', '')}/${finalPath}`;
};

export const blogApi = {
  getAllBlogs: async (requireAuth = false) => {
    const headers = {};
    const token = adminToken.get();
    
    if (requireAuth) {
      if (!token) {
        throw new Error('Authentication required');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }
    headers['Content-Type'] = 'application/json';
    
    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/admin/blogs`, { headers });
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  getBlog: async (id, requireAuth = false) => {
    if (!id) {
      throw new Error('Blog post ID is required');
    }

    const headers = {};
    const token = adminToken.get();
    
    if (requireAuth) {
      if (!token) {
        throw new Error('Authentication required');
      }
      headers['Authorization'] = `Bearer ${token}`;
    }
    headers['Content-Type'] = 'application/json';

    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/admin/blogs/${id}`, { headers });
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  createBlog: async (blogData) => {
    const token = adminToken.get();
    if (!token) {
      throw new Error('Authentication required. Please login again.');
    }

    try {
      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('content', blogData.content);
      
      if (blogData.image) {
        formData.append('image', blogData.image);
      }

      const response = await fetchWithTimeout(`${API_BASE_URL}/admin/blogs`, {
        method: 'POST',
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      return handleResponse(response);
    } catch (error) {
      if (error.message.includes('Invalid request data') && error.data) {
        error.message = `Validation failed: ${JSON.stringify(error.data)}`;
      }
      throw error;
    }
  },

  updateBlog: async (id, blogData) => {
    if (!id) {
      throw new Error('Blog post ID is required');
    }

    const token = adminToken.get();
    if (!token) {
      throw new Error('Authentication required. Please login again.');
    }

    try {
      const formData = new FormData();
      formData.append('title', blogData.title);
      formData.append('content', blogData.content);
      
      if (blogData.image) {
        formData.append('image', blogData.image);
      }

      const response = await fetchWithTimeout(`${API_BASE_URL}/admin/blogs/${id}`, {
        method: 'PUT',
        headers: { 
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
      
      return handleResponse(response);
    } catch (error) {
      throw error;
    }
  },

  deleteBlog: async (id) => {
    if (!id) {
      throw new Error('Blog post ID is required');
    }

    const token = adminToken.get();
    if (!token) {
      throw new Error('Authentication required. Please login again.');
    }

    try {
      const response = await fetchWithTimeout(`${API_BASE_URL}/admin/blogs/${id}`, {
        method: 'DELETE',
        headers: { 
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (response.status === 403) {
        const errorData = await response.json().catch(() => ({}));
        if (errorData.message?.includes('CSRF')) {
          throw new Error('CSRF token validation failed. Please refresh and try again.');
        }
        throw new Error(errorData.message || 'You do not have permission to delete this blog');
      }

      const result = await handleResponse(response);
      return { 
        success: true,
        deletedId: id,
        ...result 
      };
    } catch (error) {
      console.error('Delete blog error:', error);
      throw new Error(error.message || 'Failed to delete blog. Please try again.');
    }
  }
};