
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone } from 'lucide-react';
import { FavoriteButton } from '../FavoriteButton';

interface ServiceListItemProps {
  service: {
    id: string;
    title: string;
    description: string;
    image: string;
    category: string;
    address: string;
    hours: string;
    phone: string;
    website: string;
  };
}

const GovernmentServiceList = ({ service }: ServiceListItemProps) => {
  return (
    <div className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all relative">
      <Link to={`/government-services/${service.id}`} className="flex flex-col md:flex-row w-full">
        <div className="md:w-1/3 relative">
          <img src={service.image} alt={service.title} className="w-full h-48 md:h-full object-cover" />
          <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
            {service.category}
          </div>
        </div>
        <div className="md:w-2/3 p-5">
          <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
          <p className="text-gray-600 mb-4">{service.description}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center text-gray-500">
              <MapPin size={16} className="mr-2 flex-shrink-0" />
              <span>{service.address}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock size={16} className="mr-2 flex-shrink-0" />
              <span>{service.hours}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Phone size={16} className="mr-2 flex-shrink-0" />
              <span>{service.phone}</span>
            </div>
          </div>
          <div className="flex justify-between">
            <a 
              href={service.website} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 font-medium"
              onClick={(e) => e.stopPropagation()}
            >
              Visit Website
            </a>
            <span 
              className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
            >
              View Details
            </span>
          </div>
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

export default GovernmentServiceList;
