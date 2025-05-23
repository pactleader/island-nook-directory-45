import { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import SearchFilters from '../components/SearchFilters';
import { Calendar, Music, Users, PartyPopper, Briefcase, Heart, MoreHorizontal, MapPin } from 'lucide-react';
import { FavoriteButton } from '../components/FavoriteButton';

// Mock data for event listings
const mockEvents = [
  {
    id: 1,
    title: "Island Cultural Festival",
    description: "Experience the rich traditions and heritage of the Northern Mariana Islands with performances, food, and art.",
    image: "https://www.moas.org/z/-vf.0.0.0.4067.D9441D2F68CB9D0D2C64A6016060206979A351A7C4273F969B38C1EA9B05A6C7",
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
  }
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

  // Format date for display
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
        title="Island Events"
        subtitle="Discover and join the best events happening across the Northern Mariana Islands"
        buttonText="Submit an Event"
        buttonLink="/create-listing/event"
        backgroundImage="https://images.unsplash.com/photo-1523580494863-6f3031224c94"
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
                        <Link key={event.id} to={`/events/${event.id}`} className="block bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                          <div className="aspect-w-16 aspect-h-9 relative">
                            <img src={event.image} alt={event.title} className="object-cover w-full h-48" />
                            <div className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                              {event.category}
                            </div>
                            <div className="absolute top-4 right-4 z-10">
                              <FavoriteButton 
                                id={event.id.toString()} 
                                type="event"
                                className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md" 
                              />
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
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              )}
              
              {/* Events Listing Grid/List View */}
              {filteredEvents.length > 0 ? (
                <div className={activeView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
                  {filteredEvents
                    .filter(event => !(activeCategory === 'All' && filteredEvents.length === mockEvents.length && event.featured))
                    .map(event => (
                    activeView === 'grid' ? (
                      <Link key={event.id} to={`/events/${event.id}`} className="block bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all-300">
                        <div className="relative">
                          <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
                          <div className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {event.category}
                          </div>
                          <div className="absolute top-4 right-4 z-10">
                            <FavoriteButton 
                              id={event.id.toString()} 
                              type="event"
                              className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md" 
                            />
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
                        </div>
                      </Link>
                    ) : (
                      <Link key={event.id} to={`/events/${event.id}`} className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all-300">
                        <div className="md:w-1/3 relative">
                          <img src={event.image} alt={event.title} className="w-full h-48 md:h-full object-cover" />
                          <div className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {event.category}
                          </div>
                          <div className="absolute top-4 right-4 z-10">
                            <FavoriteButton 
                              id={event.id.toString()} 
                              type="event"
                              className="h-8 w-8 rounded-full bg-white/90 backdrop-blur-sm shadow-md" 
                            />
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
                        </div>
                      </Link>
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
      
    </div>
  );
};

export default Events;
