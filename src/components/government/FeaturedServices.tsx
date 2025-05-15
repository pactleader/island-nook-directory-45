
import { Link } from 'react-router-dom';
import { MapPin, Clock, Phone } from 'lucide-react';
import { FavoriteButton } from '../FavoriteButton';

interface FeaturedService {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  address: string;
  hours: string;
  phone: string;
  website: string;
  featured: boolean;
}

interface FeaturedServicesProps {
  services: FeaturedService[];
}

const FeaturedServices = ({ services }: FeaturedServicesProps) => {
  const featuredServices = services.filter(service => service.featured).slice(0, 2);

  if (featuredServices.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Featured Services</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {featuredServices.map(service => (
          <div key={service.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative">
            <Link to={`/government-services/${service.id}`} className="block">
              <div className="aspect-w-16 aspect-h-9 relative">
                <img src={service.image} alt={service.title} className="object-cover w-full h-48" />
                <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                  {service.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <div className="space-y-3">
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
                
                <div className="mt-5 flex justify-between">
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
                    className="inline-block px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                  >
                    Details
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
        ))}
      </div>
    </div>
  );
};

export default FeaturedServices;
