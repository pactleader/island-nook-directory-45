import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BusinessListing } from '../utils/mockData';
import { Building, Phone, Star } from 'lucide-react';
import { FavoriteButton } from './FavoriteButton';

interface BusinessCardProps {
  business: BusinessListing;
}

const BusinessCard = ({ business }: BusinessCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Format category name for display
  const formatCategory = (category: string) => {
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  return (
    <div className="glass-card rounded-xl overflow-hidden hover-lift">
      <Link to={`/businesses/${business.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {/* Blurred Image Placeholder */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-md scale-105"
            style={{ backgroundImage: `url(${business.images[0]})` }}
          ></div>
          
          {/* Actual Image */}
          <img
            src={business.images[0]}
            alt={business.name}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Category Label */}
          <div className="absolute top-4 left-4 z-10">
            <span className="chip bg-gray-900/80 text-white backdrop-blur-sm">
              {formatCategory(business.category)}
            </span>
          </div>
          
          {/* Favorite Button */}
          <div className="absolute top-4 right-4 z-10">
            <FavoriteButton 
              id={business.id} 
              type="business"
              className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md" 
            />
          </div>
          
          {/* Rating */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md flex items-center">
              <Star size={14} className="text-yellow-500 mr-1" />
              <span className="font-bold text-gray-900">
                {business.rating}
              </span>
              <span className="text-gray-600 text-xs ml-1">
                ({business.reviews})
              </span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {business.name}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-1">
            <Building size={16} />
            <span className="ml-1 text-sm">
              {business.address.village}, {business.address.island}
            </span>
          </div>
          
          <div className="flex items-center text-gray-600 mb-3">
            <Phone size={16} />
            <span className="ml-1 text-sm">
              {business.contact.phone}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {business.description}
          </p>
          
          {/* Subcategory */}
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="chip bg-gray-100 text-gray-700">{business.subcategory}</span>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default BusinessCard;
