
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost as BlogPostType } from '../utils/mockData';

interface BlogPostProps {
  post: BlogPostType;
  compact?: boolean;
}

const BlogPost = ({ post, compact = false }: BlogPostProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };
  
  if (compact) {
    return (
      <div className="glass-card rounded-xl overflow-hidden hover-lift">
        <Link to={`/blog/${post.slug}`} className="block">
          {/* Image Container */}
          <div className="relative h-48 overflow-hidden">
            {/* Blurred Image Placeholder */}
            <div
              className="absolute inset-0 bg-cover bg-center blur-md scale-105"
              style={{ backgroundImage: `url(${post.image})` }}
            ></div>
            
            {/* Actual Image */}
            <img
              src={post.image}
              alt={post.title}
              className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />
            
            {/* Category Label */}
            <div className="absolute top-4 left-4 z-10">
              <span className="chip bg-gray-900/80 text-white backdrop-blur-sm">
                {post.category}
              </span>
            </div>
          </div>
          
          {/* Content */}
          <div className="p-5">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {post.title}
            </h3>
            
            <div className="flex items-center text-gray-600 mb-3 text-sm">
              <span>{formatDate(post.publishedAt)}</span>
              <span className="mx-2">•</span>
              <span>{post.author.name}</span>
            </div>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-2">
              {post.excerpt}
            </p>
          </div>
        </Link>
      </div>
    );
  }
  
  // Full blog post layout
  return (
    <div className="glass-card rounded-xl overflow-hidden hover-lift">
      <Link to={`/blog/${post.slug}`} className="block">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          {/* Blurred Image Placeholder */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-md scale-105"
            style={{ backgroundImage: `url(${post.image})` }}
          ></div>
          
          {/* Actual Image */}
          <img
            src={post.image}
            alt={post.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Category Label */}
          <div className="absolute top-4 left-4 z-10">
            <span className="chip bg-gray-900/80 text-white backdrop-blur-sm">
              {post.category}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {/* Author */}
          <div className="flex items-center mb-4">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover mr-3"
            />
            <div>
              <p className="font-medium text-gray-900">{post.author.name}</p>
              <p className="text-sm text-gray-600">{formatDate(post.publishedAt)}</p>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">
            {post.title}
          </h2>
          
          <p className="text-gray-600 mb-4">
            {post.excerpt}
          </p>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map((tag, index) => (
              <span key={index} className="chip bg-gray-100 text-gray-700">
                {tag}
              </span>
            ))}
          </div>
          
          <div className="flex justify-end">
            <span className="text-gray-900 font-medium hover:underline">
              Read more
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BlogPost;
