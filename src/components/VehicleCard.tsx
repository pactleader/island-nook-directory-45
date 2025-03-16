
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { VehicleListing } from '../utils/mockData';
import { Car } from 'lucide-react';
import FavoriteButton from './FavoriteButton';

interface VehicleCardProps {
  vehicle: VehicleListing;
}

const VehicleCard = ({ vehicle }: VehicleCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  return (
    <div className="glass-card rounded-xl overflow-hidden hover-lift">
      <Link to={`/vehicles/${vehicle.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-56 overflow-hidden">
          {/* Blurred Image Placeholder */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-md scale-105"
            style={{ backgroundImage: `url(${vehicle.images[0]})` }}
          ></div>
          
          {/* Actual Image */}
          <img
            src={vehicle.images[0]}
            alt={vehicle.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Condition Label */}
          <div className="absolute top-4 left-4 z-10">
            <span className={`chip ${
              vehicle.condition === 'new' 
                ? 'bg-green-500/90 text-white' 
                : 'bg-gray-800/80 text-white'
            } backdrop-blur-sm`}>
              {vehicle.condition === 'new' ? 'New' : 'Used'}
            </span>
          </div>
          
          {/* Favorite Button */}
          <div className="absolute top-4 right-4 z-10">
            <FavoriteButton 
              id={vehicle.id} 
              type="vehicle"
              className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md" 
            />
          </div>
          
          {/* Price Tag */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
              <span className="font-bold text-gray-900">
                ${formatPrice(vehicle.price)}
              </span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {vehicle.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <Car size={16} />
            <span className="ml-1 text-sm">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {vehicle.description}
          </p>
          
          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-2">
            <span className="chip bg-gray-100 text-gray-700">{vehicle.bodyStyle}</span>
            <span className="chip bg-gray-100 text-gray-700">{vehicle.transmission}</span>
            {vehicle.mileage && (
              <span className="chip bg-gray-100 text-gray-700">{vehicle.mileage.toLocaleString()} mi</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default VehicleCard;
