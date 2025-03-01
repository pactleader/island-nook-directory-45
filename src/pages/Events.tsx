
import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import SearchFilters from '../components/SearchFilters';
import { Calendar, Music, Users, PartyPopper, Briefcase, Heart, MoreHorizontal, MapPin } from 'lucide-react';

// Mock data for event listings
const mockEvents = [
  {
    id: 1,
    title: "Island Cultural Festival",
    description: "Experience the rich traditions and heritage of the Northern Mariana Islands with performances, food, and art.",
    image: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6a3",
    date: "2023-06-15",
    time: "4:00 PM - 10:00 PM",
    location: "Garapan, Saipan",
    category: "Community",
    organizer: "CNMI Cultural Center",
    contact: "events@cnmiculture.org",
    featured: true
  },
  {
    id: 2,
    title: "Beach Cleanup & Conservation Talk",
    description: "Join local environmentalists for a community beach cleanup followed by an educational talk about marine conservation.",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5",
    date: "2023-06-10",
    time: "8:00 AM - 11:00 AM",
    location: "Micro Beach, Saipan",
    category: "Community",
    organizer: "Pacific Environmental Group",
    contact: "volunteer@pacificenviron.org",
    featured: false
  },
  {
    id: 3,
    title: "Sunset Yoga Retreat",
    description: "Relax and rejuvenate with a beachfront yoga session as the sun sets over the beautiful Saipan lagoon.",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b",
    date: "2023-06-12",
    time: "5:30 PM - 7:00 PM",
    location: "Pau Pau Beach, Saipan",
    category: "Wellness",
    organizer: "Island Wellness Center",
    contact: "yoga@islandwellness.com",
    featured: true
  },
  {
    id: 4,
    title: "Island Business Expo",
    description: "Connect with local entrepreneurs and businesses showcasing their products and services from across the islands.",
    image: "https://images.unsplash.com/photo-1538935732373-f7a495fea3f6",
    date: "2023-06-20",
    time: "9:00 AM - 4:00 PM",
    location: "World Resort Center, Saipan",
    category: "Business",
    organizer: "CNMI Chamber of Commerce",
    contact: "expo@cnmichamber.com",
    featured: false
  },
  {
    id: 5,
    title: "Summer Night Market",
    description: "Enjoy local food, crafts, and entertainment at this vibrant night market featuring vendors from across the islands.",
    image: "https://images.unsplash.com/photo-1502920514313-52581002a659",
    date: "2023-06-17",
    time: "6:00 PM - 11:00 PM",
    location: "American Memorial Park, Saipan",
    category: "Night Life",
    organizer: "Island Vendors Association",
    contact: "market@islandvendors.org",
    featured: true
  },
  {
    id: 6,
    title: "Family Fun Day at the Park",
    description: "A day filled with games, activities, face painting, and food for the whole family to enjoy.",
    image: "https://images.unsplash.com/photo-1471967183320-ee018f6e114a",
    date: "2023-06-24",
    time: "10:00 AM - 3:00 PM",
    location: "Civic Center Park, Saipan",
    category: "Family Friendly",
    organizer: "Island Parks Department",
    contact: "parks@cnmigov.org",
    featured: false
  },
  {
    id: 7,
    title: "Acoustic Sessions Under the Stars",
    description: "Enjoy soothing acoustic performances by local musicians under the beautiful island night sky.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    date: "2023-06-18",
    time: "7:00 PM - 10:00 PM",
    location: "Fiesta Resort Beachfront, Saipan",
    category: "Music",
    organizer: "Island Music Collective",
    contact: "music@islandcollective.org",
    featured: true
  },
  {
    id: 8,
    title: "Mangrove Kayaking Tour",
    description: "Explore the diverse ecosystem of island mangroves with expert guides in this educational kayaking adventure.",
    image: "https://images.unsplash.com/photo-1544551763-92ab472cad5d",
    date: "2023-06-22",
    time: "9:00 AM - 12:00 PM",
    location: "American Memorial Park, Saipan",
    category: "Family Friendly",
    organizer: "Island Eco Tours",
    contact: "tours@islandeco.org",
    featured: false
  },
  {
    id: 9,
    title: "Monthly Stargazing Event",
    description: "Join local astronomers to observe stars, planets, and celestial events with powerful telescopes.",
    image: "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1",
    date: "2023-06-14",
    time: "8:00 PM - 10:00 PM",
    location: "Banzai Cliff Lookout, Saipan",
    category: "Family Friendly",
    organizer: "Island Astronomy Club",
    contact: "stars@islandastronomy.org",
    featured: false
  },
  {
    id: 10,
    title: "Island Reggae Concert",
    description: "Dance to the rhythms of local and visiting reggae artists in this beachfront concert event.",
    image: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a",
    date: "2023-06-30",
    time: "6:00 PM - 12:00 AM",
    location: "Hopwood Beach, Saipan",
    category: "Music",
    organizer: "Island Vibes Productions",
    contact: "concerts@islandvibes.com",
    featured: true
  },
];

// Event categories with their respective icons
const eventCategories = [
  { name: "Family Friendly", icon: <Users size={20} /> },
  { name: "Music", icon: <Music size={20} /> },
  { name: "Night Life", icon: <PartyPopper size={20} /> },
  { name: "Community", icon: <Users size={20} /> },
  { name: "Business", icon: <Briefcase size={20} /> },
  { name: "Wellness", icon: <Heart size={20} /> },
  { name: "Other", icon: <MoreHorizontal size={20} /> },
];

// Filter options for search component
const filterGroups = [
  {
    name: "Category",
    options: [
      { label: "Family Friendly", value: "Family Friendly" },
      { label: "Music", value: "Music" },
      { label: "Night Life", value: "Night Life" },
      { label: "Community", value: "Community" },
      { label: "Business", value: "Business" },
      { label: "Wellness", value: "Wellness" },
      { label: "Other", value: "Other" },
    ],
    multiSelect: true
  },
  {
    name: "Time Period",
    options: [
      { label: "This Week", value: "thisWeek" },
      { label: "This Month", value: "thisMonth" },
      { label: "Next Month", value: "nextMonth" },
    ]
  }
];

const Events = () => {
  const [activeView, setActiveView] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  const location = useLocation();

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'All') {
      setFilteredEvents(mockEvents);
    } else {
      setFilteredEvents(mockEvents.filter(event => event.category === category));
    }
  };

  // Handle search and filter
  const handleSearch = (search: string, filters: Record<string, string | string[]>) => {
    let results = [...mockEvents];
    
    // Apply search text filter
    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply category filter if selected
    if (filters.Category && Array.isArray(filters.Category) && filters.Category.length > 0) {
      results = results.filter(event => filters.Category.includes(event.category));
    }
    
    // Apply time period filter if selected
    if (filters["Time Period"]) {
      const now = new Date();
      const oneWeekLater = new Date(now);
      oneWeekLater.setDate(now.getDate() + 7);
      
      const nextMonth = new Date(now);
      nextMonth.setMonth(now.getMonth() + 1);
      
      const thisMonthEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      
      switch(filters["Time Period"]) {
        case 'thisWeek':
          results = results.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate >= now && eventDate <= oneWeekLater;
          });
          break;
        case 'thisMonth':
          results = results.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === now.getMonth() && eventDate.getFullYear() === now.getFullYear();
          });
          break;
        case 'nextMonth':
          results = results.filter(event => {
            const eventDate = new Date(event.date);
            return eventDate.getMonth() === nextMonth.getMonth() && eventDate.getFullYear() === nextMonth.getFullYear();
          });
          break;
      }
    }
    
    setFilteredEvents(results);
  };

  // Check for URL parameters for initial filtering
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <Hero 
        title="Island Events & Happenings"
        subtitle="Discover exciting activities, festivals, and community gatherings"
        buttonText="Add Your Event"
        buttonLink="/contact"
        backgroundImage="https://images.unsplash.com/photo-1523580846011-d3a5bc25702b"
        size="medium"
      />
      
      {/* Main Content */}
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          {/* Category Tiles */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Browse Events by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div 
                onClick={() => handleCategoryChange('All')}
                className={`category-tile flex flex-col items-center justify-center p-4 rounded-lg transition-all cursor-pointer ${
                  activeCategory === 'All' 
                    ? 'bg-purple-600 text-white shadow-md transform scale-105' 
                    : 'bg-purple-100 text-gray-800 hover:bg-purple-200'
                }`}
              >
                <Calendar size={32} className="mb-2" />
                <span className="text-center font-medium">All Events</span>
              </div>
              
              {eventCategories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`category-tile flex flex-col items-center justify-center p-4 rounded-lg transition-all cursor-pointer ${
                    activeCategory === category.name 
                      ? 'bg-purple-600 text-white shadow-md transform scale-105' 
                      : 'bg-purple-100 text-gray-800 hover:bg-purple-200'
                  }`}
                >
                  <div className="mb-2">{category.icon}</div>
                  <span className="text-center font-medium">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with Search and Filters */}
            <div className="lg:col-span-1">
              <SearchFilters 
                title="Find Events"
                placeholder="Search events..."
                filterGroups={filterGroups}
                onSearch={handleSearch}
              />
            </div>
            
            {/* Events Listing */}
            <div className="lg:col-span-3">
              {/* View toggle and result count */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  <span className="font-semibold">{filteredEvents.length}</span> events found
                </p>
                
                <div className="flex space-x-2">
                  <button 
                    onClick={() => setActiveView('grid')}
                    className={`p-2 rounded ${activeView === 'grid' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    aria-label="Grid view"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                  </button>
                  <button 
                    onClick={() => setActiveView('list')}
                    className={`p-2 rounded ${activeView === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    aria-label="List view"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
                  </button>
                </div>
              </div>
              
              {/* Featured Events Section (only show when no filters are applied) */}
              {activeCategory === 'All' && filteredEvents.length === mockEvents.length && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Featured Events</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredEvents
                      .filter(event => event.featured)
                      .slice(0, 2)
                      .map(event => (
                        <div key={event.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                          <div className="aspect-w-16 aspect-h-9 relative">
                            <img src={event.image} alt={event.title} className="object-cover w-full h-48" />
                            <div className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                              {event.category}
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                            <p className="text-gray-600 mb-4">{event.description.substring(0, 100)}...</p>
                            <div className="flex items-center text-gray-500 mb-3">
                              <Calendar size={16} className="mr-2" />
                              <span>{formatDate(event.date)} • {event.time}</span>
                            </div>
                            <div className="flex items-center text-gray-500 mb-4">
                              <MapPin size={16} className="mr-2" />
                              <span>{event.location}</span>
                            </div>
                            <Link 
                              to={`/events/${event.id}`} 
                              className="inline-block mt-2 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              {/* Events Listing Grid/List View */}
              {filteredEvents.length > 0 ? (
                <div className={activeView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
                  {filteredEvents.map(event => (
                    activeView === 'grid' ? (
                      <div key={event.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all-300">
                        <div className="relative">
                          <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                          <div className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {event.category}
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{event.description}</p>
                          <div className="flex items-center text-gray-500 text-sm mb-2">
                            <Calendar size={16} className="mr-2" />
                            <span>{formatDate(event.date)}</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm mb-3">
                            <MapPin size={16} className="mr-2" />
                            <span>{event.location}</span>
                          </div>
                          <Link 
                            to={`/events/${event.id}`} 
                            className="inline-block mt-1 px-3 py-1.5 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-all-300"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div key={event.id} className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all-300">
                        <div className="md:w-1/3 relative">
                          <img src={event.image} alt={event.title} className="w-full h-48 md:h-full object-cover" />
                          <div className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {event.category}
                          </div>
                        </div>
                        <div className="md:w-2/3 p-5">
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          <p className="text-gray-600 mb-4">{event.description}</p>
                          <div className="flex flex-col md:flex-row md:items-center md:space-x-6">
                            <div className="flex items-center text-gray-500 mb-2 md:mb-0">
                              <Calendar size={16} className="mr-2" />
                              <span>{formatDate(event.date)} • {event.time}</span>
                            </div>
                            <div className="flex items-center text-gray-500">
                              <MapPin size={16} className="mr-2" />
                              <span>{event.location}</span>
                            </div>
                          </div>
                          <Link 
                            to={`/events/${event.id}`} 
                            className="inline-block mt-4 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-all-300"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No events found</h3>
                  <p className="text-gray-500 mb-6">We couldn't find any events matching your search criteria.</p>
                  <button 
                    onClick={() => {
                      setActiveCategory('All');
                      setFilteredEvents(mockEvents);
                    }}
                    className="px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* Add Events CTA Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Hosting an event in the islands?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Submit your event to be featured in our directory and reach thousands of locals and visitors.
          </p>
          <Link 
            to="/contact" 
            className="inline-block px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
          >
            Add Your Event
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />

      {/* Add styles for category tiles and pills */}
      <style jsx>{`
        .category-tile {
          min-height: 120px;
          transition: all 0.3s ease;
        }
        .category-pill {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background-color: #f3f4f6;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 500;
          white-space: nowrap;
          transition: all 0.3s ease;
        }
        .category-pill.active {
          background-color: #4f46e5;
          color: white;
        }
        .category-pill:hover:not(.active) {
          background-color: #e5e7eb;
        }
      `}</style>
    </div>
  );
};

export default Events;
