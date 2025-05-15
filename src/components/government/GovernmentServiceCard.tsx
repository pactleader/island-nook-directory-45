
import { Link } from 'react-router-dom';
import { MapPin, Phone } from 'lucide-react';
import { FavoriteButton } from '../FavoriteButton';

interface ServiceCardProps {
  service: {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    address: string;
    phone: string;
  };
}

const GovernmentServiceCard = ({ service }: ServiceCardProps) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all relative">
      <Link to={`/government-services/${service.id}`} className="block">
        <div className="relative">
          <img src={service.image} alt={service.title} className="w-full h-40 object-cover" />
          <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {service.category}
          </div>
        </div>
        <div className="p-5">
          <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
          <div className="flex items-center text-gray-500 text-sm mb-2">
            <MapPin size={16} className="mr-2 flex-shrink-0" />
            <span className="truncate">{service.address}</span>
          </div>
          <div className="flex items-center text-gray-500 text-sm mb-4">
            <Phone size={16} className="mr-2 flex-shrink-0" />
            <span>{service.phone}</span>
          </div>
          <span 
            className="inline-block mt-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
          >
            View Details
          </span>
        </div>
      </Link>
      <div className="absolute top-4 right-4">
        <FavoriteButton 
          id={service.id} 
          type="government" 
          className="bg-white rounded-full p-1.5 shadow"
        />
      </div>
    </div>
  );
};

export default GovernmentServiceCard;
