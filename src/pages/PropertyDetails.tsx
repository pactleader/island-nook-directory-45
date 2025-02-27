
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Bed, Bath, Home, Check, Calendar, Heart } from 'lucide-react';
import { mockProperties } from '../utils/mockData';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState(mockProperties[0]);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarProperties, setSimilarProperties] = useState(mockProperties.slice(0, 3));
  
  // Find the property based on the ID parameter
  useEffect(() => {
    const foundProperty = mockProperties.find(p => p.id === id);
    if (foundProperty) {
      setProperty(foundProperty);
      
      // Find similar properties (same island or property type)
      const similar = mockProperties
        .filter(p => p.id !== id && (p.island === foundProperty.island || p.propertyType === foundProperty.propertyType))
        .slice(0, 3);
      setSimilarProperties(similar);
    }
  }, [id]);

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
  
  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link to="/properties" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-all-300">
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Properties</span>
          </Link>
          
          {/* Property Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <span className="chip bg-black/80 text-white mr-2">
                  {getPropertyTypeLabel(property.propertyType)}
                </span>
                <span className="text-gray-500 text-sm">Listed on {formatDate(property.createdAt)}</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{property.title}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-1" />
                <span>{property.street}, {property.village}, {property.island}</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col items-end">
              <div className="text-3xl font-bold text-gray-900 mb-2">${formatPrice(property.price)}</div>
              <button 
                onClick={() => setIsFavorite(!isFavorite)}
                className={`flex items-center px-4 py-2 rounded-md transition-all-300 ${
                  isFavorite 
                    ? 'bg-red-50 text-red-500 border border-red-200' 
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Heart size={18} className={`mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                <span>{isFavorite ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
          
          {/* Property Image Gallery */}
          <div className="mb-8">
            <div className="w-full rounded-xl overflow-hidden h-96 mb-4">
              <img 
                src={property.images[selectedImageIndex]} 
                alt={property.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {property.images.length > 1 && (
              <div className="flex overflow-x-auto gap-4 pb-2">
                {property.images.map((image, index) => (
                  <button 
                    key={index} 
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border-2 transition-all-300 ${
                      selectedImageIndex === index ? 'border-gray-900' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`${property.title} - Image ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Property Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Description */}
            <div className="md:col-span-2">
              <div className="glass-card rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
                <p className="text-gray-700 mb-6">{property.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {property.bedrooms && (
                    <div className="flex items-center">
                      <Bed size={20} className="text-gray-700 mr-2" />
                      <div>
                        <div className="font-semibold">{property.bedrooms}</div>
                        <div className="text-gray-500 text-sm">Bedrooms</div>
                      </div>
                    </div>
                  )}
                  
                  {property.bathrooms && (
                    <div className="flex items-center">
                      <Bath size={20} className="text-gray-700 mr-2" />
                      <div>
                        <div className="font-semibold">{property.bathrooms}</div>
                        <div className="text-gray-500 text-sm">Bathrooms</div>
                      </div>
                    </div>
                  )}
                  
                  {property.sqft && (
                    <div className="flex items-center">
                      <Home size={20} className="text-gray-700 mr-2" />
                      <div>
                        <div className="font-semibold">{property.sqft.toLocaleString()}</div>
                        <div className="text-gray-500 text-sm">Square Feet</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Features */}
              <div className="glass-card rounded-xl p-6">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <Check size={16} className="text-green-500 mr-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Right Column - Contact and Map */}
            <div>
              {/* Contact Box */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Interested in this property?</h3>
                <div className="mb-4">
                  <button className="w-full btn-primary py-3">
                    Contact Seller
                  </button>
                </div>
                <div>
                  <button className="w-full btn-secondary py-3">
                    Schedule a Viewing
                  </button>
                </div>
              </div>
              
              {/* Map Preview */}
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-center px-4">
                    <MapPin size={28} className="mx-auto mb-2 text-gray-600" />
                    <p className="text-gray-600">Map view will be available in the full version</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">Property Location</h3>
                  <p className="text-gray-600 text-sm mb-2">{property.street}, {property.village}</p>
                  <p className="text-gray-600 text-sm">{property.island}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Similar Properties */}
          {similarProperties.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Similar Properties</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {similarProperties.map(similarProp => (
                  <PropertyCard key={similarProp.id} property={similarProp} />
                ))}
              </div>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default PropertyDetails;
