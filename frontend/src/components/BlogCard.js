import Link from 'next/link';
import formatDate from '../utils/formatDate';

export default function BlogCard({ post }) {
  if (!post || !post.attributes || !post.attributes.slug) {
    console.warn('Invalid post data:', post);
    return null; // Don't render anything if data is invalid
  }

  const { slug, coverImage, title, publishedAt, excerpt } = post.attributes;

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <Link href={`/blog/${slug}`} className="block">
        <img 
          src={coverImage?.data?.attributes?.url || '/placeholder.jpg'} 
          alt={title || 'Blog image'}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{title || 'Untitled'}</h3>
          <p className="text-gray-600 text-sm mb-3">
            {publishedAt ? formatDate(publishedAt) : 'No date'}
          </p>
          <p className="text-gray-700 line-clamp-2">
            {excerpt || 'No description available.'}
          </p>
        </div>
      </Link>
    </div>
  );
}
