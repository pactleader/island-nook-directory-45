
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PropertyListing } from '../utils/mockData';
import { MapPin } from 'lucide-react';

interface PropertyCardProps {
  property: PropertyListing;
}

const PropertyCard = ({ property }: PropertyCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Generate property type label
  const getPropertyTypeLabel = (type: string) => {
    switch(type) {
      case 'residential': return 'Residential';
      case 'commercial': return 'Commercial';
      case 'hotel': return 'Hotel';
      case 'land': return 'Land';
      case 'economic-incentive': return 'Economic Incentive';
      default: return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  return (
    <div className="glass-card rounded-xl overflow-hidden hover-lift">
      <Link to={`/properties/${property.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          {/* Blurred Image Placeholder */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-md scale-105"
            style={{ backgroundImage: `url(${property.images[0]})` }}
          ></div>
          
          {/* Actual Image */}
          <img
            src={property.images[0]}
            alt={property.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Property Type Label */}
          <div className="absolute top-4 left-4 z-10">
            <span className="chip bg-black/70 text-white backdrop-blur-sm">
              {getPropertyTypeLabel(property.propertyType)}
            </span>
          </div>
          
          {/* Price Tag */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
              <span className="font-bold text-gray-900">
                ${formatPrice(property.price)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {property.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin size={16} />
            <span className="ml-1 text-sm">
              {property.village}, {property.island}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {property.description}
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-2">
            {property.bedrooms && (
              <span className="chip bg-gray-100 text-gray-700">{property.bedrooms} Beds</span>
            )}
            {property.bathrooms && (
              <span className="chip bg-gray-100 text-gray-700">{property.bathrooms} Baths</span>
            )}
            {property.sqft && (
              <span className="chip bg-gray-100 text-gray-700">{property.sqft.toLocaleString()} sqft</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default PropertyCard;
