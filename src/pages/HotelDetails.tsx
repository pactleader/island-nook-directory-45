
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Phone, 
  Mail, 
  Share2, 
  ChevronLeft, 
  ChevronRight,
  Heart,
  Star,
  Clock,
  Calendar,
  Wifi,
  Coffee,
  Utensils,
  Tv,
  Bath,
  ParkingSquare,
  Wind,
  Pool,
  Check,
  Building
} from 'lucide-react';
import { mockHotels } from '../utils/mockData';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const HotelDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  // Find the hotel data
  const hotel = mockHotels.find(h => h.id === id);
  
  // If hotel not found
  if (!hotel) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Hotel Not Found</h1>
            <p className="text-gray-600 mb-6">Sorry, the hotel you're looking for doesn't exist or has been removed.</p>
            <Link to="/hotels" className="btn-primary">
              <ArrowLeft size={18} className="mr-2" />
              Back to Hotels
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
      prev === hotel.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setActiveImageIndex(prev => 
      prev === 0 ? hotel.images.length - 1 : prev - 1
    );
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Amenities with icons
  const amenities = [
    { name: 'Free Wifi', icon: <Wifi size={16} className="text-gray-600" /> },
    { name: 'Free Breakfast', icon: <Coffee size={16} className="text-gray-600" /> },
    { name: 'Restaurant', icon: <Utensils size={16} className="text-gray-600" /> },
    { name: 'TV', icon: <Tv size={16} className="text-gray-600" /> },
    { name: 'Private Bathroom', icon: <Bath size={16} className="text-gray-600" /> },
    { name: 'Free Parking', icon: <ParkingSquare size={16} className="text-gray-600" /> },
    { name: 'Air Conditioning', icon: <Wind size={16} className="text-gray-600" /> },
    { name: 'Swimming Pool', icon: <Pool size={16} className="text-gray-600" /> }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-4">
            <Link to="/hotels" className="text-gray-600 hover:text-gray-900 inline-flex items-center">
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to Hotels</span>
            </Link>
          </div>
          
          {/* Hotel Title and Price */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{hotel.title}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span>{hotel.village}, {hotel.island}</span>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < 4 ? "text-yellow-400" : "text-gray-300"} 
                      fill={i < 4 ? "currentColor" : "none"} 
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">4.0 (52 reviews)</span>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 glass-card px-6 py-4 rounded-lg">
                <div className="text-3xl font-bold text-gray-900">${formatPrice(hotel.price)}</div>
                <div className="text-sm text-gray-600">per night</div>
              </div>
            </div>
          </div>
          
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[400px] lg:h-[500px]">
              {/* Main Image */}
              <img 
                src={hotel.images[activeImageIndex]} 
                alt={`${hotel.title} - Image ${activeImageIndex + 1}`}
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
                {activeImageIndex + 1} / {hotel.images.length}
              </div>
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="flex overflow-x-auto space-x-2 mt-4 pb-2">
              {hotel.images.map((img, index) => (
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
              {/* Hotel Details */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Hotel Details</h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Type</span>
                    <span className="font-medium">{hotel.propertyType === 'hotel' ? 'Hotel' : 'Resort'}</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Rooms</span>
                    <span className="font-medium">{hotel.bedrooms} available</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Check-in</span>
                    <span className="font-medium">2:00 PM</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Check-out</span>
                    <span className="font-medium">11:00 AM</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Size</span>
                    <span className="font-medium">{hotel.sqft.toLocaleString()} sqft</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm text-gray-600">Last Updated</span>
                    <span className="font-medium">{formatDate(hotel.updatedAt || hotel.createdAt)}</span>
                  </div>
                </div>
              </div>
              
              {/* Description */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700 whitespace-pre-line">
                  {hotel.description}
                </p>
              </div>
              
              {/* Amenities */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                <div className="grid grid-cols-2 gap-4">
                  {amenities.map((amenity, index) => (
                    <div key={index} className="flex items-center">
                      {amenity.icon}
                      <span className="ml-2 text-gray-700">{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Location */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Location</h2>
                <div className="rounded-lg overflow-hidden h-[300px] mb-4">
                  {/* Placeholder for a map */}
                  <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                    <span className="text-gray-500">Map View</span>
                  </div>
                </div>
                <div className="text-gray-700">
                  <p className="mb-2"><strong>Address:</strong> {hotel.street}, {hotel.village}, {hotel.island}</p>
                  <p><strong>Nearby attractions:</strong> Beach (0.2 miles), Shopping Center (0.5 miles), Airport (5 miles)</p>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div>
              {/* Booking Widget */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Book this Hotel</h2>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        id="check-in"
                        className="input-field w-full"
                      />
                      <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        id="check-out"
                        className="input-field w-full"
                      />
                      <Calendar size={16} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                    <select id="guests" className="input-field w-full">
                      <option value="1">1 Guest</option>
                      <option value="2">2 Guests</option>
                      <option value="3">3 Guests</option>
                      <option value="4">4 Guests</option>
                      <option value="5">5+ Guests</option>
                    </select>
                  </div>
                  
                  <div className="pt-2">
                    <button className="btn-primary w-full">
                      Check Availability
                    </button>
                  </div>
                </div>
                
                <div className="mt-6 border-t border-gray-200 pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">${formatPrice(hotel.price)} x 3 nights</span>
                    <span className="text-gray-900">${formatPrice(hotel.price * 3)}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Cleaning fee</span>
                    <span className="text-gray-900">$75</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Service fee</span>
                    <span className="text-gray-900">$35</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t border-gray-200 pt-2 mt-2">
                    <span>Total</span>
                    <span>${formatPrice(hotel.price * 3 + 75 + 35)}</span>
                  </div>
                </div>
              </div>
              
              {/* Contact */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Contact Hotel</h2>
                
                <div className="space-y-4">
                  <div className="flex items-center text-gray-700">
                    <Phone size={16} className="mr-2" />
                    <span>+1 (670) 555-9876</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Mail size={16} className="mr-2" />
                    <span>bookings@{hotel.title.toLowerCase().replace(/\s+/g, '')}.com</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Clock size={16} className="mr-2" />
                    <span>24/7 Front Desk</span>
                  </div>
                </div>
                
                <div className="mt-6 space-y-3">
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
            </div>
          </div>
          
          {/* Similar Listings */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Hotels</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockHotels.filter(h => h.id !== id && h.village === hotel.village).slice(0, 3).map(similarHotel => (
                <div key={similarHotel.id} className="glass-card rounded-xl overflow-hidden hover-lift">
                  <Link to={`/hotels/${similarHotel.id}`} className="block">
                    <div className="relative h-48">
                      <img src={similarHotel.images[0]} alt={similarHotel.title} className="w-full h-full object-cover" />
                      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-md shadow-sm">
                        <span className="font-bold">${formatPrice(similarHotel.price)}</span>
                        <span className="text-xs text-gray-600">/night</span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1">{similarHotel.title}</h3>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <Building size={14} className="mr-1" />
                        <span>{similarHotel.village}, {similarHotel.island}</span>
                      </div>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={i < 4 ? "text-yellow-400" : "text-gray-300"} 
                            fill={i < 4 ? "currentColor" : "none"} 
                          />
                        ))}
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

export default HotelDetails;
