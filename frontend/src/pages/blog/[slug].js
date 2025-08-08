import { useRouter } from 'next/router';
import { getBlogPosts, getBlogBySlug } from '../../lib/api';
import Layout from '../../components/Layout';
import ReactMarkdown from 'react-markdown';
import formatDate from '../../utils/formatDate';

export async function getStaticPaths() {
  const posts = await getBlogPosts();
  
  const paths = posts.map(post => ({
    params: { slug: post.attributes.slug }
  }));
  
  return { paths, fallback: 'blocking' };
}

export async function getStaticProps({ params }) {
  const post = await getBlogBySlug(params.slug);
  
  if (!post) {
    return {
      notFound: true,
    };
  }
  
  return {
    props: { post },
    revalidate: 60,
  };
}

export default function BlogPost({ post }) {
  const router = useRouter();
  
  if (router.isFallback) {
    return <div>Loading...</div>;
  }
  
  return (
    <Layout title={post.attributes.title}>
      <article className="max-w-3xl mx-auto">
        <img 
          src={post.attributes.coverImage?.data?.attributes?.url} 
          alt={post.attributes.title}
          className="w-full h-64 object-cover rounded-lg mb-6"
        />
        
        <h1 className="text-4xl font-bold mb-4">{post.attributes.title}</h1>
        
        <div className="flex items-center mb-8 text-gray-600">
          <span>By {post.attributes.author?.data?.attributes?.name || 'Admin'}</span>
          <span className="mx-2">•</span>
          <span>{formatDate(post.attributes.publishedAt)}</span>
        </div>
        
        <div className="prose max-w-none">
          <ReactMarkdown>{post.attributes.content}</ReactMarkdown>
        </div>
      </article>
    </Layout>
  );
}