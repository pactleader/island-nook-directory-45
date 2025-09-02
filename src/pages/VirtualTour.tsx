import { useState } from 'react';
import { MapPin, Camera, Play, Star, Grid, List, ChevronDown, X, Search } from 'lucide-react';

const VirtualTour = () => {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [showMap, setShowMap] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const tourDestinations = [
    {
      id: 1,
      name: "Saipan Beach Paradise",
      location: "Saipan, CNMI",
      description: "Experience the crystal-clear waters and pristine beaches of Saipan. Walk along the white sandy shores and take in the breathtaking Pacific Ocean views.",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=600&fit=crop",
      duration: "2-3 hours",
      rating: 4.8,
      visitors: "10K+",
      highlights: ["Crystal clear waters", "White sandy beaches", "Sunset views", "Water activities"]
    },
    {
      id: 2,
      name: "Tinian Historical Sites",
      location: "Tinian, CNMI",
      description: "Explore the rich history of Tinian, from ancient Chamorro villages to World War II historical sites. Discover the island's cultural heritage and wartime significance.",
      image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop",
      duration: "4-5 hours",
      rating: 4.6,
      visitors: "5K+",
      highlights: ["Historical sites", "Cultural heritage", "WWII landmarks", "Ancient villages"]
    },
    {
      id: 3,
      name: "Rota Natural Wonders",
      location: "Rota, CNMI",
      description: "Immerse yourself in Rota's natural beauty. From lush jungles to hidden waterfalls, experience the untouched paradise of the southernmost island.",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
      duration: "3-4 hours",
      rating: 4.9,
      visitors: "3K+",
      highlights: ["Lush jungles", "Hidden waterfalls", "Wildlife", "Scenic trails"]
    },
    {
      id: 4,
      name: "Garapan Shopping District",
      location: "Saipan, CNMI",
      description: "Discover the vibrant shopping and entertainment district of Garapan. Experience local culture, cuisine, and shopping in the heart of Saipan.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop",
      duration: "2-3 hours",
      rating: 4.4,
      visitors: "15K+",
      highlights: ["Local shopping", "Cultural experiences", "Dining options", "Entertainment"]
    },
    {
      id: 5,
      name: "Micro Beach",
      location: "Saipan, CNMI",
      description: "Visit one of Saipan's most beautiful beaches with crystal clear waters perfect for swimming, snorkeling, and enjoying the tropical paradise.",
      image: "https://images.unsplash.com/photo-1471922694854-ff1b63b20054?q=80&w=672&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      duration: "2-4 hours",
      rating: 4.7,
      visitors: "12K+",
      highlights: ["Snorkeling", "Swimming", "Beach activities", "Scenic views"]
    },
    {
      id: 6,
      name: "Banzai Cliff",
      location: "Saipan, CNMI",
      description: "Experience the dramatic cliffs and stunning ocean views at Banzai Cliff, a significant historical site with breathtaking natural beauty.",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&h=600&fit=crop",
      duration: "1-2 hours",
      rating: 4.5,
      visitors: "8K+",
      highlights: ["Cliff views", "Historical significance", "Ocean vistas", "Photography"]
    }
  ];

  const filteredDestinations = tourDestinations.filter(destination =>
    destination.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    destination.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    destination.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleMap = () => {
    setShowMap(!showMap);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Virtual Tour of CNMI</h1>
              <p className="text-gray-600">
                Explore the beautiful islands of the Northern Mariana Islands through our immersive virtual tours
              </p>
            </div>
            
            {/* Search and Controls */}
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Search input */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field h-10 w-full sm:w-64 pr-10"
                />
                <Search size={18} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              </div>
              
              {/* Toggle map button (mobile only) */}
              <button 
                onClick={toggleMap}
                className="sm:hidden px-4 py-2 bg-gray-800 text-white rounded-md transition-all-300"
              >
                {showMap ? 'Hide Map' : 'Show Map'}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Split Screen Layout */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Map Section - Left side on desktop, toggleable on mobile */}
          {(showMap || window.innerWidth >= 768) && (
            <div className="md:w-1/2 h-[500px] md:h-[calc(100vh-16rem)] rounded-lg overflow-hidden bg-gray-100 md:sticky md:top-24 relative z-0">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d146147.18178589462!2d145.7409003!3d15.2022077!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x66d8b12c0d41abdd%3A0x662f5e089974f80f!2sSaipan!5e1!3m2!1sen!2sph!4v1748433297739!5m2!1sen!2sph"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="CNMI Map"
              ></iframe>
            </div>
          )}
          
          {/* Virtual Tour Destinations Section - Right side on desktop, full width when map hidden */}
          <div className={`${showMap ? 'md:w-1/2' : 'w-full'} flex flex-col`}>
            {/* Results Controls */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold text-gray-900">{filteredDestinations.length}</span> virtual tour locations
                </p>
              </div>
              
              {/* View Toggle */}
              <div className="flex items-center space-x-2 border border-gray-200 rounded-md overflow-hidden">
                <button 
                  onClick={() => setView('grid')}
                  className={`p-2 ${view === 'grid' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  aria-label="Grid View"
                >
                  <Grid size={18} />
                </button>
                <button 
                  onClick={() => setView('list')}
                  className={`p-2 ${view === 'list' ? 'bg-gray-100 text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                  aria-label="List View"
                >
                  <List size={18} />
                </button>
              </div>
            </div>
            
            {/* Virtual Tour Destinations */}
            <div className="overflow-y-auto pb-8" style={{maxHeight: 'calc(100vh - 20rem)'}}>
              {filteredDestinations.length === 0 ? (
                <div className="bg-gray-50 rounded-lg p-8 text-center">
                  <Search size={32} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">No locations found</h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search term to find virtual tour locations
                  </p>
                  <button 
                    onClick={() => setSearchQuery('')}
                    className="btn-primary inline-flex items-center"
                  >
                    <X size={16} className="mr-2" />
                    <span>Clear search</span>
                  </button>
                </div>
              ) : (
                <div className={view === 'grid' 
                  ? "grid grid-cols-1 sm:grid-cols-2 gap-4"
                  : "space-y-4"
                }>
                                     {filteredDestinations.map((destination) => (
                     <div key={destination.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                       <div className="h-48 bg-gray-200 overflow-hidden">
                         <img 
                           src={destination.image} 
                           alt={destination.name}
                           className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                       onError={(e) => {
                              // Fallback to a beautiful Unsplash image if the main image fails to load
                              e.currentTarget.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop";
                            }}
                         />
                       </div>
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          <MapPin size={14} className="text-gray-500 mr-2" />
                          <span className="text-sm text-gray-500">{destination.location}</span>
                        </div>
                        <h3 className="text-lg font-semibold mb-2 text-gray-800">{destination.name}</h3>
                        <p className="text-gray-600 mb-3 text-sm line-clamp-2">{destination.description}</p>
                        
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3 text-xs text-gray-500">
                            <div className="flex items-center">
                              <span className="mr-1">⏱</span>
                              {destination.duration}
                            </div>
                            <div className="flex items-center">
                              <span className="mr-1">👥</span>
                              {destination.visitors}
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Star size={14} className="text-yellow-400 mr-1" />
                            <span className="text-sm font-medium">{destination.rating}</span>
                          </div>
                        </div>

                        <div className="mb-3">
                          <div className="flex flex-wrap gap-1">
                            {destination.highlights.slice(0, 3).map((highlight, index) => (
                              <span 
                                key={index}
                                className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded-full"
                              >
                                {highlight}
                              </span>
                            ))}
                            {destination.highlights.length > 3 && (
                              <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{destination.highlights.length - 3} more
                              </span>
                            )}
                          </div>
                        </div>

                        <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors font-medium text-sm">
                          Start Virtual Tour
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VirtualTour;
