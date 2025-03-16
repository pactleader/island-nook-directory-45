import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, MapPin, Calendar, Star } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SearchFilters from '../components/SearchFilters';
import { PropertyListing, mockProperties } from '../utils/mockData';

// Mock hotel data (based on properties structure)
const mockHotels: PropertyListing[] = [
  {
    id: 'hotel-1',
    title: 'Fiesta Resort & Spa Saipan',
    description: 'Beachfront hotel with stunning views, swimming pools, and on-site restaurants.',
    price: 175,
    village: 'Garapan',
    island: 'Saipan',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 450,
    images: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    ],
    propertyType: 'hotel',
    features: ['Free WiFi', 'Swimming Pool', 'Restaurant', 'Beach Access'],
    street: '123 Beach Road',
    createdAt: '2023-10-01T00:00:00.000Z',
    updatedAt: '2023-11-01T00:00:00.000Z'
  },
  {
    id: 'hotel-2',
    title: 'Hyatt Regency Saipan',
    description: 'Luxury hotel with private beach, multiple restaurants, and spa facilities.',
    price: 225,
    village: 'Garapan',
    island: 'Saipan',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 500,
    images: [
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ],
    propertyType: 'hotel',
    features: ['Free WiFi', 'Swimming Pool', 'Spa', 'Private Beach'],
    street: '456 Beach Road',
    createdAt: '2023-09-21T00:00:00.000Z',
    updatedAt: '2023-10-15T00:00:00.000Z'
  },
  {
    id: 'hotel-3',
    title: 'Kensington Hotel Saipan',
    description: 'Elegant hotel on the cliff with infinity pool and spectacular ocean views.',
    price: 195,
    village: 'San Roque',
    island: 'Saipan',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 475,
    images: [
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ],
    propertyType: 'hotel',
    features: ['Free WiFi', 'Infinity Pool', 'Ocean View', 'Restaurant'],
    street: '789 Cliff Road',
    createdAt: '2023-08-15T00:00:00.000Z',
    updatedAt: '2023-09-20T00:00:00.000Z'
  },
  {
    id: 'hotel-4',
    title: 'Grandvrio Resort Saipan',
    description: 'Family-friendly resort with water park, activities and entertainment.',
    price: 165,
    village: 'Susupe',
    island: 'Saipan',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 425,
    images: [
      'https://images.unsplash.com/photo-1582719508461-905c673771fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1025&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ],
    propertyType: 'hotel',
    features: ['Free WiFi', 'Water Park', 'Family Activities', 'Entertainment'],
    street: '101 Resort Drive',
    createdAt: '2023-07-25T00:00:00.000Z',
    updatedAt: '2023-08-30T00:00:00.000Z'
  },
  {
    id: 'hotel-5',
    title: 'Century Hotel',
    description: 'Affordable hotel in the heart of Garapan with easy access to shopping and dining.',
    price: 95,
    village: 'Garapan',
    island: 'Saipan',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 350,
    images: [
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
    ],
    propertyType: 'hotel',
    features: ['Free WiFi', 'City Center', 'Budget-Friendly', 'Shopping Nearby'],
    street: '222 Downtown Street',
    createdAt: '2023-06-10T00:00:00.000Z',
    updatedAt: '2023-07-15T00:00:00.000Z'
  },
  {
    id: 'hotel-6',
    title: 'Pacific Islands Club Saipan',
    description: 'All-inclusive resort with extensive water sports and activities for all ages.',
    price: 210,
    village: 'San Antonio',
    island: 'Saipan',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 480,
    images: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
    ],
    propertyType: 'hotel',
    features: ['All-Inclusive', 'Water Sports', 'Multiple Restaurants', 'Activities'],
    street: '333 Club Drive',
    createdAt: '2023-09-05T00:00:00.000Z',
    updatedAt: '2023-10-10T00:00:00.000Z'
  }
];

// Hotel Card Component
const HotelCard = ({ hotel }: { hotel: PropertyListing }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  return (
    <div className="glass-card rounded-xl overflow-hidden hover-lift">
      <Link to={`/hotels/${hotel.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-64 overflow-hidden">
          {/* Blurred Image Placeholder */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-md scale-105"
            style={{ backgroundImage: `url(${hotel.images[0]})` }}
          ></div>
          
          {/* Actual Image */}
          <img
            src={hotel.images[0]}
            alt={hotel.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Price Tag */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md">
              <span className="font-bold text-gray-900">
                ${hotel.price}
              </span>
              <span className="text-gray-600 text-sm">/night</span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {hotel.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin size={16} />
            <span className="ml-1 text-sm">
              {hotel.village}, {hotel.island}
            </span>
          </div>
          
          <div className="flex items-center mb-3">
            {Array(5).fill(0).map((_, i) => (
              <Star key={i} size={16} className={i < 4 ? "text-yellow-400" : "text-gray-300"} />
            ))}
            <span className="text-sm text-gray-600 ml-1">4.0 (86 reviews)</span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {hotel.description}
          </p>
        </div>
      </Link>
    </div>
  );
};

const Hotels = () => {
  const [hotels, setHotels] = useState(mockHotels);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<Record<string, string | string[]>>({});
  
  // Filter groups
  const filterGroups = [
    {
      name: 'Price Range',
      options: [
        { label: 'Under $100', value: 'under-100' },
        { label: '$100 - $150', value: '100-150' },
        { label: '$150 - $200', value: '150-200' },
        { label: '$200 - $250', value: '200-250' },
        { label: 'Over $250', value: 'over-250' }
      ]
    },
    {
      name: 'Location',
      options: [
        { label: 'Garapan', value: 'garapan' },
        { label: 'Susupe', value: 'susupe' },
        { label: 'San Antonio', value: 'san-antonio' },
        { label: 'San Roque', value: 'san-roque' },
        { label: 'Chalan Kanoa', value: 'chalan-kanoa' }
      ],
      multiSelect: true
    },
    {
      name: 'Amenities',
      options: [
        { label: 'Swimming Pool', value: 'pool' },
        { label: 'Beach Access', value: 'beach' },
        { label: 'Free Wifi', value: 'wifi' },
        { label: 'Restaurant', value: 'restaurant' },
        { label: 'Spa', value: 'spa' },
        { label: 'Gym', value: 'gym' },
        { label: 'Room Service', value: 'room-service' }
      ],
      multiSelect: true
    },
    {
      name: 'Rating',
      options: [
        { label: '5 Stars', value: '5-stars' },
        { label: '4+ Stars', value: '4-stars' },
        { label: '3+ Stars', value: '3-stars' },
        { label: 'Any Rating', value: 'any' }
      ]
    }
  ];
  
  // Handle search
  const handleSearch = (query: string, filters: Record<string, string | string[]>) => {
    setSearchQuery(query);
    setActiveFilters(filters);
    
    let filteredHotels = [...mockHotels];
    
    // Filter by search query
    if (query) {
      const searchLower = query.toLowerCase();
      filteredHotels = filteredHotels.filter(hotel => 
        hotel.title.toLowerCase().includes(searchLower) ||
        hotel.description.toLowerCase().includes(searchLower) ||
        hotel.village.toLowerCase().includes(searchLower) ||
        hotel.island.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply price range filter
    if (filters['Price Range']) {
      const priceRange = filters['Price Range'] as string;
      filteredHotels = filteredHotels.filter(hotel => {
        switch(priceRange) {
          case 'under-100':
            return hotel.price < 100;
          case '100-150':
            return hotel.price >= 100 && hotel.price < 150;
          case '150-200':
            return hotel.price >= 150 && hotel.price < 200;
          case '200-250':
            return hotel.price >= 200 && hotel.price < 250;
          case 'over-250':
            return hotel.price >= 250;
          default:
            return true;
        }
      });
    }
    
    // Apply location filter
    if (filters['Location'] && Array.isArray(filters['Location']) && filters['Location'].length > 0) {
      const locations = filters['Location'] as string[];
      filteredHotels = filteredHotels.filter(hotel => 
        locations.some(location => 
          hotel.village.toLowerCase() === location.replace('-', ' ')
        )
      );
    }
    
    setHotels(filteredHotels);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Hotels & Stays</h1>
            <p className="text-gray-600">Find accommodation in the Northern Mariana Islands</p>
          </div>
          
          {/* Search Filters Component */}
          <SearchFilters
            title="Find Hotels"
            placeholder="Search by name, location, or amenities"
            filterGroups={filterGroups}
            onSearch={handleSearch}
          />
          
          {/* Results Controls */}
          <div className="flex justify-between items-center my-6">
            <div>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{hotels.length}</span> properties
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
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
          </div>
          
          {/* Hotel Listings */}
          <div className={view === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            : "space-y-6"
          }>
            {hotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
          
          {/* Pagination */}
          {hotels.length > 0 && (
            <div className="mt-12 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <button className="px-3 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  1
                </button>
                <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Hotels;
