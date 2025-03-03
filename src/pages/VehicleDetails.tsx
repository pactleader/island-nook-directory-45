
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Car, 
  MapPin, 
  Phone, 
  Mail, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  Shield,
  Check
} from 'lucide-react';
import { mockVehicles } from '../utils/mockData';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const VehicleDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Find the vehicle data
  const vehicle = mockVehicles.find(v => v.id === id);
  
  // If vehicle not found
  if (!vehicle) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Vehicle Not Found</h1>
            <p className="text-gray-600 mb-6">Sorry, the vehicle you're looking for doesn't exist or has been removed.</p>
            <Link to="/vehicles" className="btn-primary">
              <ArrowLeft size={18} className="mr-2" />
              Back to Cars
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Format price with commas
  const formatPrice = (price: number) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Handle image navigation
  const nextImage = () => {
    setActiveImageIndex(prev => 
      prev === vehicle.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setActiveImageIndex(prev => 
      prev === 0 ? vehicle.images.length - 1 : prev - 1
    );
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-4">
            <Link to="/vehicles" className="text-gray-600 hover:text-gray-900 inline-flex items-center">
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to Cars</span>
            </Link>
          </div>
          
          {/* Vehicle Title and Price */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{vehicle.title}</h1>
                <div className="flex items-center text-gray-600">
                  <MapPin size={16} className="mr-1" />
                  <span>{vehicle.location}, {vehicle.island}</span>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 glass-card px-6 py-4 rounded-lg">
                <div className="text-3xl font-bold text-gray-900">${formatPrice(vehicle.price)}</div>
                <div className="text-sm text-gray-600">Listed on {formatDate(vehicle.createdAt)}</div>
              </div>
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[400px] lg:h-[500px]">
              {/* Main Image */}
              <img 
                src={vehicle.images[activeImageIndex]} 
                alt={`${vehicle.make} ${vehicle.model} - Image ${activeImageIndex + 1}`}
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              <button 
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} />
              </button>
              <button 
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full"
                aria-label="Next image"
              >
                <ChevronRight size={20} />
              </button>
              
              {/* Image Counter */}
              <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm">
                {activeImageIndex + 1} / {vehicle.images.length}
              </div>
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="flex overflow-x-auto space-x-2 mt-4 pb-2">
              {vehicle.images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-md overflow-hidden ${
                    activeImageIndex === index ? 'ring-2 ring-blue-500' : ''
                  }`}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Vehicle Details */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Vehicle Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Make</span>
                    <span className="font-medium">{vehicle.make}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Model</span>
                    <span className="font-medium">{vehicle.model}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Year</span>
                    <span className="font-medium">{vehicle.year}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Body Style</span>
                    <span className="font-medium">{vehicle.bodyStyle}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Transmission</span>
                    <span className="font-medium">{vehicle.transmission}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Mileage</span>
                    <span className="font-medium">{vehicle.mileage?.toLocaleString() || 'N/A'} miles</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Fuel Type</span>
                    <span className="font-medium">{vehicle.fuelType}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Condition</span>
                    <span className="font-medium">{vehicle.condition === 'new' ? 'New' : 'Used'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Color</span>
                    <span className="font-medium">{vehicle.color}</span>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {vehicle.description}
                </p>
              </div>
              
              {/* Features */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-y-2">
                  {vehicle.features?.map((feature, index) => (
                    <div key={index} className="flex items-center text-gray-700">
                      <Check size={16} className="text-green-500 mr-2" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              {/* Contact */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Contact Seller</h2>
                
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 rounded-full bg-gray-300 mr-3 flex items-center justify-center overflow-hidden">
                    {vehicle.seller?.avatar ? (
                      <img src={vehicle.seller.avatar} alt={vehicle.seller.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-gray-600 text-xl font-bold">
                        {vehicle.seller?.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{vehicle.seller?.name || 'John Doe'}</div>
                    <div className="text-sm text-gray-600">Seller</div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <Phone size={16} className="mr-2" />
                    <span>{vehicle.seller?.phone || '(670) 555-1234'}</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail size={16} className="mr-2" />
                    <span>{vehicle.seller?.email || 'seller@example.com'}</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
                  <button className="btn-primary w-full">
                    Contact Seller
                  </button>
                  <button className="btn-outline w-full flex items-center justify-center">
                    <Heart size={16} className="mr-2" />
                    <span>Save</span>
                  </button>
                  <button className="btn-outline w-full flex items-center justify-center">
                    <Share2 size={16} className="mr-2" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
              
              {/* Safety Tips */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center mb-3">
                  <Shield size={18} className="text-blue-500 mr-2" />
                  <h3 className="text-lg font-semibold">Safety Tips</h3>
                </div>
                <ul className="text-sm text-gray-700 space-y-2">
                  <li>• Meet in a public place</li>
                  <li>• Inspect the vehicle thoroughly</li>
                  <li>• Test drive before purchasing</li>
                  <li>• Verify documents and history</li>
                  <li>• Don't wire money to strangers</li>
                </ul>
              </div>
            </div>
          </div>
          
          {/* Similar Listings */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Vehicles</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockVehicles.filter(v => v.id !== id && v.make === vehicle.make).slice(0, 3).map(similarVehicle => (
                <div key={similarVehicle.id} className="glass-card rounded-xl overflow-hidden hover-lift">
                  <Link to={`/vehicles/${similarVehicle.id}`} className="block">
                    <div className="relative h-48">
                      <img src={similarVehicle.images[0]} alt={similarVehicle.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md shadow-sm">
                        <span className="font-bold">${formatPrice(similarVehicle.price)}</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1">{similarVehicle.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <Car size={14} className="mr-1" />
                        <span>{similarVehicle.year} {similarVehicle.make} {similarVehicle.model}</span>
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                        <span className="chip bg-gray-100 text-xs">{similarVehicle.bodyStyle}</span>
                        <span className="chip bg-gray-100 text-xs">{similarVehicle.transmission}</span>
                        <span className="chip bg-gray-100 text-xs">{similarVehicle.mileage?.toLocaleString() || 'N/A'} mi</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default VehicleDetails;
