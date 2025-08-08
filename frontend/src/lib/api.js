import axios from 'axios';

const strapi = axios.create({
  baseURL: process.env.NEXT_PUBLIC_STRAPI_URL,
  headers: {
    'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`
  }
});

// Fetch all blog posts
export const getBlogPosts = async () => {
  try {
    const res = await strapi.get('/blogs?populate=*&sort=publishedAt:desc');
    return res.data.data;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

// Fetch single blog post by slug
export const getBlogBySlug = async (slug) => {
  try {
    const res = await strapi.get(`/blogs?filters[slug][$eq]=${slug}&populate=*`);
    return res.data.data[0];
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};