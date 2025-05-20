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
  GlobeIcon,
  Building,
  Facebook,
  Instagram,
  Calendar,
  Check,
  MessageCircle
} from 'lucide-react';
import { mockBusinesses } from '../utils/mockData';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const BusinessDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState('about');
  
  // Find the business data
  const business = mockBusinesses.find(b => b.id === id);
  
  // If business not found
  if (!business) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Business Not Found</h1>
            <p className="text-gray-600 mb-6">Sorry, the business you're looking for doesn't exist or has been removed.</p>
            <Link to="/businesses" className="btn-primary">
              <ArrowLeft size={18} className="mr-2" />
              Back to Shopping & Services
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  // Sample reviews
  const reviews = [
    {
      id: 1,
      author: 'Jane S.',
      date: '2023-10-15',
      rating: 5,
      comment: 'Excellent service and friendly staff. Would highly recommend to anyone visiting the area.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    },
    {
      id: 2,
      author: 'Michael T.',
      date: '2023-09-28',
      rating: 4,
      comment: 'Great experience overall. The only reason I didn\'t give 5 stars is because of the wait time, but the quality made up for it.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    },
    {
      id: 3,
      author: 'Sarah L.',
      date: '2023-08-17',
      rating: 5,
      comment: 'One of the best in the area! I\'ve been a regular customer for years and they never disappoint.',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
    }
  ];
  
  // Handle image navigation
  const nextImage = () => {
    setActiveImageIndex(prev => 
      prev === business.images.length - 1 ? 0 : prev + 1
    );
  };
  
  const prevImage = () => {
    setActiveImageIndex(prev => 
      prev === 0 ? business.images.length - 1 : prev - 1
    );
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  // Format category name
  const formatCategory = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Sample business hours
  const businessHours = [
    { day: 'Monday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Tuesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Wednesday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Thursday', hours: '9:00 AM - 6:00 PM' },
    { day: 'Friday', hours: '9:00 AM - 7:00 PM' },
    { day: 'Saturday', hours: '10:00 AM - 5:00 PM' },
    { day: 'Sunday', hours: 'Closed' }
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20 md:pt-12 pb-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-4">
            <Link to="/businesses" className="text-gray-600 hover:text-gray-900 inline-flex items-center">
              <ArrowLeft size={16} className="mr-1" />
              <span>Back to Shopping & Services</span>
            </Link>
          </div>
          
          {/* Business Title and Rating */}
          <div className="mb-6">
            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{business.name}</h1>
                <div className="flex items-center text-gray-600 mb-2">
                  <MapPin size={16} className="mr-1" />
                  <span>{business.address.street}, {business.address.village}, {business.address.island}</span>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      className={i < business.rating ? "text-yellow-400" : "text-gray-300"} 
                      fill={i < business.rating ? "currentColor" : "none"} 
                    />
                  ))}
                  <span className="ml-1 text-sm font-medium">{business.rating} ({business.reviews} reviews)</span>
                </div>
              </div>
              <div className="mt-4 lg:mt-0 flex space-x-2">
                <button className="btn-primary">
                  <Phone size={16} className="mr-2" />
                  <span>Call</span>
                </button>
                <button className="btn-outline">
                  <Heart size={16} className="mr-2" />
                  <span>Save</span>
                </button>
                <button className="btn-outline">
                  <Share2 size={16} className="mr-2" />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Category and Subcategory */}
          <div className="mb-6 flex flex-wrap gap-2">
            <span className="chip bg-gray-900 text-white">
              {formatCategory(business.category)}
            </span>
            <span className="chip bg-gray-100 text-gray-700">
              {business.subcategory}
            </span>
          </div>
          
          {/* Image Gallery */}
          <div className="mb-8">
            <div className="relative rounded-xl overflow-hidden h-[300px] md:h-[400px] lg:h-[500px]">
              {/* Main Image */}
              <img 
                src={business.images[activeImageIndex]} 
                alt={`${business.name} - Image ${activeImageIndex + 1}`}
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
                {activeImageIndex + 1} / {business.images.length}
              </div>
            </div>
            
            {/* Thumbnail Navigation */}
            <div className="flex overflow-x-auto space-x-2 mt-4 pb-2">
              {business.images.map((img, index) => (
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
          
          {/* Tabs Navigation */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="flex space-x-8">
              <button 
                className={`pb-4 px-1 ${
                  activeTab === 'about' 
                    ? 'border-b-2 border-gray-900 font-medium text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('about')}
              >
                About
              </button>
              <button 
                className={`pb-4 px-1 ${
                  activeTab === 'reviews' 
                    ? 'border-b-2 border-gray-900 font-medium text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('reviews')}
              >
                Reviews
              </button>
              <button 
                className={`pb-4 px-1 ${
                  activeTab === 'location' 
                    ? 'border-b-2 border-gray-900 font-medium text-gray-900' 
                    : 'text-gray-500 hover:text-gray-700'
                }`}
                onClick={() => setActiveTab('location')}
              >
                Location
              </button>
            </nav>
          </div>
          
          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* About Tab */}
              {activeTab === 'about' && (
                <div>
                  {/* Description */}
                  <div className="glass-card rounded-xl p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">About {business.name}</h2>
                    <p className="text-gray-700 whitespace-pre-line mb-6">
                      {business.description}
                    </p>
                    
                    {/* Services */}
                    <h3 className="text-lg font-medium mb-3">Services Offered</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                      {['Custom orders', 'Delivery', 'In-store pickup', 'Online ordering', 'Repairs', 'Consultations'].map((service, index) => (
                        <div key={index} className="flex items-center text-gray-700">
                          <Check size={16} className="text-green-500 mr-2" />
                          <span>{service}</span>
                        </div>
                      ))}
                    </div>
                    
                    {/* Payment Methods */}
                    <h3 className="text-lg font-medium mb-3">Payment Methods</h3>
                    <div className="flex flex-wrap gap-2">
                      <span className="chip bg-gray-100 text-gray-700">Credit Cards</span>
                      <span className="chip bg-gray-100 text-gray-700">Cash</span>
                      <span className="chip bg-gray-100 text-gray-700">Apple Pay</span>
                      <span className="chip bg-gray-100 text-gray-700">PayPal</span>
                    </div>
                  </div>
                  
                  {/* Gallery Highlights */}
                  <div className="glass-card rounded-xl p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Gallery</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {business.images.slice(0, 6).map((img, index) => (
                        <div key={index} className="rounded-lg overflow-hidden h-24 sm:h-32">
                          <img 
                            src={img} 
                            alt={`Gallery image ${index + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
              
              {/* Reviews Tab */}
              {activeTab === 'reviews' && (
                <div>
                  {/* Reviews Summary */}
                  <div className="glass-card rounded-xl p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
                    <div className="flex items-center mb-6">
                      <div className="mr-4">
                        <div className="text-5xl font-bold text-gray-900">{business.rating.toFixed(1)}</div>
                        <div className="flex mt-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={16} 
                              className={i < business.rating ? "text-yellow-400" : "text-gray-300"} 
                              fill={i < business.rating ? "currentColor" : "none"} 
                            />
                          ))}
                        </div>
                        <div className="text-sm text-gray-600 mt-1">{business.reviews} reviews</div>
                      </div>
                      
                      <div className="flex-grow">
                        {[5, 4, 3, 2, 1].map(rating => {
                          const percentage = rating === 5 ? 65 : rating === 4 ? 25 : rating === 3 ? 7 : rating === 2 ? 2 : 1;
                          return (
                            <div key={rating} className="flex items-center mb-1">
                              <div className="text-sm text-gray-600 w-8">{rating} ★</div>
                              <div className="flex-grow mx-2 bg-gray-200 rounded-full h-2">
                                <div 
                                  className="bg-yellow-400 h-2 rounded-full" 
                                  style={{ width: `${percentage}%` }}
                                ></div>
                              </div>
                              <div className="text-sm text-gray-600 w-8">{percentage}%</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                    
                    {/* Write Review Button */}
                    <button className="btn-primary">
                      <MessageCircle size={16} className="mr-2" />
                      <span>Write a Review</span>
                    </button>
                  </div>
                  
                  {/* Review List */}
                  <div className="space-y-6">
                    {reviews.map(review => (
                      <div key={review.id} className="glass-card rounded-xl p-6">
                        <div className="flex items-start">
                          <img 
                            src={review.avatar} 
                            alt={review.author} 
                            className="w-12 h-12 rounded-full mr-4 object-cover"
                          />
                          <div className="flex-grow">
                            <div className="flex justify-between items-center mb-1">
                              <h3 className="font-medium text-gray-900">{review.author}</h3>
                              <span className="text-sm text-gray-600">{formatDate(review.date)}</span>
                            </div>
                            <div className="flex mb-3">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  className={i < review.rating ? "text-yellow-400" : "text-gray-300"} 
                                  fill={i < review.rating ? "currentColor" : "none"} 
                                />
                              ))}
                            </div>
                            <p className="text-gray-700">{review.comment}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {/* See More Reviews Button */}
                    <div className="text-center">
                      <button className="btn-outline">
                        See More Reviews
                      </button>
                    </div>
                  </div>
                </div>
              )}
              
              {/* Location Tab */}
              {activeTab === 'location' && (
                <div>
                  {/* Map */}
                  <div className="glass-card rounded-xl p-6 mb-6">
                    <h2 className="text-xl font-semibold mb-4">Location</h2>
                    <div className="rounded-lg overflow-hidden h-[400px] mb-4">
                      {/* Placeholder for a map */}
                      <div className="bg-gray-200 w-full h-full flex items-center justify-center">
                        <span className="text-gray-500">Map View</span>
                      </div>
                    </div>
                    <div className="text-gray-700">
                      <p className="mb-2">
                        <strong>Address:</strong> {business.address.street}, {business.address.village}, {business.address.island}
                      </p>
                      <p className="mb-2">
                        <strong>Phone:</strong> {business.contact.phone}
                      </p>
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <button className="btn-primary">
                          Get Directions
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Nearby Businesses */}
                  <div className="glass-card rounded-xl p-6">
                    <h2 className="text-xl font-semibold mb-4">Nearby Businesses</h2>
                    <div className="space-y-4">
                      {mockBusinesses
                        .filter(b => b.id !== id && b.address.village === business.address.village)
                        .slice(0, 3)
                        .map(nearbyBusiness => (
                          <Link 
                            key={nearbyBusiness.id} 
                            to={`/businesses/${nearbyBusiness.id}`}
                            className="flex items-start hover:bg-gray-50 p-2 rounded-lg"
                          >
                            <img 
                              src={nearbyBusiness.images[0]} 
                              alt={nearbyBusiness.name} 
                              className="w-16 h-16 rounded-lg object-cover mr-3"
                            />
                            <div>
                              <h3 className="font-medium text-gray-900">{nearbyBusiness.name}</h3>
                              <p className="text-sm text-gray-600">{nearbyBusiness.subcategory}</p>
                              <div className="flex items-center mt-1">
                                <Star size={12} className="text-yellow-400" fill="currentColor" />
                                <span className="text-xs ml-1">{nearbyBusiness.rating} ({nearbyBusiness.reviews})</span>
                              </div>
                            </div>
                          </Link>
                        ))
                      }
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            {/* Sidebar */}
            <div>
              {/* Business Info */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">Business Info</h2>
                
                {/* Contact */}
                <div className="space-y-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <Phone size={16} className="mr-2" />
                    <span>{business.contact.phone}</span>
                  </div>
                  {business.contact.email && (
                    <div className="flex items-center text-gray-700">
                      <Mail size={16} className="mr-2" />
                      <span>{business.contact.email}</span>
                    </div>
                  )}
                  {business.contact.website && (
                    <div className="flex items-center text-gray-700">
                      <GlobeIcon size={16} className="mr-2" />
                      <a href={business.contact.website} className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
                
                {/* Business Hours */}
                <h3 className="font-medium text-gray-900 mb-3">Business Hours</h3>
                <div className="space-y-2 mb-6">
                  {businessHours.map((day, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-gray-600">{day.day}</span>
                      <span className={day.hours === 'Closed' ? 'text-red-500' : 'text-gray-900'}>
                        {day.hours}
                      </span>
                    </div>
                  ))}
                </div>
                
                {/* Social Links */}
                <h3 className="font-medium text-gray-900 mb-3">Follow On</h3>
                <div className="flex space-x-2">
                  <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-700">
                    <Facebook size={18} />
                  </a>
                  <a href="#" className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors text-gray-700">
                    <Instagram size={18} />
                  </a>
                </div>
              </div>
              
              {/* Calendar - Special Events */}
              <div className="glass-card rounded-xl p-6">
                <div className="flex items-center mb-4">
                  <Calendar size={18} className="text-gray-700 mr-2" />
                  <h2 className="text-xl font-semibold">Upcoming Events</h2>
                </div>
                
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="text-sm text-blue-600 font-medium mb-1">Jun 15, 2023</div>
                    <h3 className="font-medium mb-1">Summer Sales Event</h3>
                    <p className="text-sm text-gray-600">Join us for special discounts and giveaways!</p>
                  </div>
                  
                  <div className="border border-gray-200 rounded-lg p-3">
                    <div className="text-sm text-blue-600 font-medium mb-1">Jul 4, 2023</div>
                    <h3 className="font-medium mb-1">Independence Day Celebration</h3>
                    <p className="text-sm text-gray-600">Special holiday hours and promotions.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Similar Businesses */}
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Similar Businesses</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBusinesses.filter(b => b.id !== id && b.category === business.category).slice(0, 3).map(similarBusiness => (
                <div key={similarBusiness.id} className="glass-card rounded-xl overflow-hidden hover-lift">
                  <Link to={`/businesses/${similarBusiness.id}`} className="block">
                    <div className="relative h-48">
                      <img src={similarBusiness.images[0]} alt={similarBusiness.name} className="w-full h-full object-cover" />
                      <div className="absolute top-3 left-3 bg-gray-900/80 text-white px-2 py-1 rounded-lg text-xs font-medium">
                        {formatCategory(similarBusiness.category)}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 mb-1">{similarBusiness.name}</h3>
                      <div className="flex items-center text-gray-600 text-sm mb-2">
                        <Building size={14} className="mr-1" />
                        <span>{similarBusiness.address.village}, {similarBusiness.address.island}</span>
                      </div>
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={i < similarBusiness.rating ? "text-yellow-400" : "text-gray-300"} 
                            fill={i < similarBusiness.rating ? "currentColor" : "none"} 
                          />
                        ))}
                        <span className="ml-1 text-xs">({similarBusiness.reviews})</span>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default BusinessDetails;
