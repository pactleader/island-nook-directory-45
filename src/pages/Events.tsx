
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, Music, User, Building, Heart, Filter, Grid, List, ChevronDown, ChevronUp } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SearchFilters from '../components/SearchFilters';
import Hero from '../components/Hero';

// Mock events data
const mockEvents = [
  {
    id: 1,
    title: "Flame Tree Arts Festival",
    description: "Annual celebration of local arts, crafts, music, and cultural performances.",
    date: "2024-05-15",
    time: "10:00 AM - 10:00 PM",
    location: "Garapan, Saipan",
    category: "family-friendly",
    subcategory: "festival",
    image: "https://images.unsplash.com/photo-1603228254119-e6a4d095dc59",
    organizer: "CNMI Council for Arts & Culture"
  },
  {
    id: 2,
    title: "Saipan Music Festival",
    description: "Featuring local and international musicians across multiple genres.",
    date: "2024-06-20",
    time: "5:00 PM - 11:00 PM",
    location: "American Memorial Park, Saipan",
    category: "music",
    subcategory: "concert",
    image: "https://images.unsplash.com/photo-1540039155733-5bb30b53aa14",
    organizer: "Marianas Visitors Authority"
  },
  {
    id: 3,
    title: "Tinian Hot Pepper Festival",
    description: "Celebration of the famous Tinian Donni Sali (hot pepper) with food, competitions, and entertainment.",
    date: "2024-07-10",
    time: "11:00 AM - 8:00 PM",
    location: "Tinian",
    category: "family-friendly",
    subcategory: "food",
    image: "https://images.unsplash.com/photo-1544510807-78268e067c70",
    organizer: "Tinian Mayor's Office"
  },
  {
    id: 4,
    title: "Business Networking Mixer",
    description: "Connect with local business owners and entrepreneurs at this casual networking event.",
    date: "2024-05-25",
    time: "6:00 PM - 8:00 PM",
    location: "Hyatt Regency, Garapan",
    category: "business",
    subcategory: "networking",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
    organizer: "CNMI Small Business Development Center"
  },
  {
    id: 5,
    title: "Yoga on the Beach",
    description: "Morning yoga session on Micro Beach with certified instructors.",
    date: "2024-06-05",
    time: "7:00 AM - 8:30 AM",
    location: "Micro Beach, Garapan",
    category: "wellness",
    subcategory: "fitness",
    image: "https://images.unsplash.com/photo-1545205597-3d9d02c29597",
    organizer: "Wellness Marianas"
  }
];

// Event categories
const eventCategories = {
  "family-friendly": {
    label: "Family Friendly",
    subcategories: [
      { label: "Festival", value: "festival" },
      { label: "Educational", value: "educational" },
      { label: "Outdoor", value: "outdoor" },
      { label: "Cultural", value: "cultural" }
    ]
  },
  "music": {
    label: "Music",
    subcategories: [
      { label: "Concert", value: "concert" },
      { label: "Live Band", value: "live-band" },
      { label: "DJ", value: "dj" },
      { label: "Traditional", value: "traditional" }
    ]
  },
  "night-life": {
    label: "Night Life",
    subcategories: [
      { label: "Bar Event", value: "bar-event" },
      { label: "Club Night", value: "club-night" },
      { label: "Pub Crawl", value: "pub-crawl" }
    ]
  },
  "community": {
    label: "Community",
    subcategories: [
      { label: "Volunteer", value: "volunteer" },
      { label: "Cleanup", value: "cleanup" },
      { label: "Meeting", value: "meeting" },
      { label: "Fundraiser", value: "fundraiser" }
    ]
  },
  "business": {
    label: "Business",
    subcategories: [
      { label: "Networking", value: "networking" },
      { label: "Workshop", value: "workshop" },
      { label: "Seminar", value: "seminar" },
      { label: "Conference", value: "conference" }
    ]
  },
  "wellness": {
    label: "Wellness",
    subcategories: [
      { label: "Yoga", value: "yoga" },
      { label: "Meditation", value: "meditation" },
      { label: "Fitness", value: "fitness" },
      { label: "Health Talk", value: "health-talk" }
    ]
  },
  "other": {
    label: "Other",
    subcategories: [
      { label: "Miscellaneous", value: "miscellaneous" }
    ]
  }
};

// Event Card Component
const EventCard = ({ event }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'family-friendly': return <User size={18} />;
      case 'music': return <Music size={18} />;
      case 'night-life': return <Moon size={18} />;
      case 'community': return <Users size={18} />;
      case 'business': return <Building size={18} />;
      case 'wellness': return <Heart size={18} />;
      default: return <Calendar size={18} />;
    }
  };
  
  return (
    <div className="glass-card rounded-xl overflow-hidden hover-lift">
      <Link to={`/events/${event.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {/* Blurred Image Placeholder */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-md scale-105"
            style={{ backgroundImage: `url(${event.image})` }}
          ></div>
          
          {/* Actual Image */}
          <img
            src={event.image}
            alt={event.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Date Label */}
          <div className="absolute top-4 left-4 z-10">
            <span className="chip bg-gray-900/80 text-white backdrop-blur-sm">
              {formatDate(event.date)}
            </span>
          </div>
          
          {/* Category */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md flex items-center">
              {getCategoryIcon(event.category)}
              <span className="font-medium text-gray-900 ml-1">
                {eventCategories[event.category]?.label || 'Event'}
              </span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {event.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-1">
            <Calendar size={16} />
            <span className="ml-1 text-sm">
              {event.time}
            </span>
          </div>
          
          <div className="flex items-center text-gray-600 mb-3">
            <MapPin size={16} />
            <span className="ml-1 text-sm">
              {event.location}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {event.description}
          </p>
          
          {/* Organizer */}
          <div className="flex items-center text-gray-600">
            <Building size={16} />
            <span className="ml-1 text-sm font-medium">
              {event.organizer}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const Events = () => {
  const [events, setEvents] = useState(mockEvents);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('upcoming');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(true);
  
  // Filter groups for search filters
  const filterGroups = [
    {
      name: "Categories",
      options: Object.keys(eventCategories).map(key => ({
        label: eventCategories[key].label,
        value: key
      })),
      multiSelect: false
    },
    {
      name: "Date Range",
      options: [
        { label: "Today", value: "today" },
        { label: "This Week", value: "this-week" },
        { label: "This Month", value: "this-month" },
        { label: "Next Month", value: "next-month" }
      ],
      multiSelect: false
    }
  ];
  
  // Handle search
  const handleSearch = (query, filters) => {
    console.log("Search query:", query);
    console.log("Filters:", filters);
    
    // Filter events based on search and filters (mock implementation)
    let filteredEvents = [...mockEvents];
    
    // Filter by search query
    if (query) {
      const searchLower = query.toLowerCase();
      filteredEvents = filteredEvents.filter(event => 
        event.title.toLowerCase().includes(searchLower) ||
        event.description.toLowerCase().includes(searchLower) ||
        event.location.toLowerCase().includes(searchLower) ||
        event.organizer.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by category
    if (filters.Categories) {
      filteredEvents = filteredEvents.filter(event => 
        event.category === filters.Categories
      );
    }
    
    // Sort events (always by date for events)
    filteredEvents.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    setEvents(filteredEvents);
  };
  
  // Handle category selection
  const handleCategorySelect = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
    
    // Filter events by category
    if (activeCategory === category) {
      setEvents(mockEvents); // Reset to all events
    } else {
      setEvents(mockEvents.filter(event => event.category === category));
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <Hero 
        title="Events in the Marianas"
        subtitle="Discover what's happening across our beautiful islands"
        backgroundImage="https://images.unsplash.com/photo-1492684223066-81342ee5ff30"
        size="medium"
        overlayOpacity={0.6}
      />
      
      <main className="flex-grow pt-8 pb-12">
        <div className="container mx-auto px-4">
          {/* Search Filters */}
          <div className="mb-8">
            <SearchFilters 
              title="Find Events"
              placeholder="Search for events, venues, or organizers"
              filterGroups={filterGroups}
              onSearch={handleSearch}
            />
          </div>
          
          {/* Category Pills */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Browse by Category</h2>
            <div className="flex flex-wrap gap-2">
              {Object.keys(eventCategories).map(category => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
                >
                  {eventCategories[category].label}
                </button>
              ))}
            </div>
          </div>
          
          {/* View Toggle and Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{events.length}</span> events found
              {activeCategory && (
                <span> in <span className="font-medium">{eventCategories[activeCategory]?.label}</span></span>
              )}
            </p>
            
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
          
          {/* Events Listings */}
          {events.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Calendar size={32} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search filters or search term
              </p>
              <button 
                onClick={() => {
                  setActiveCategory(null);
                  setEvents(mockEvents);
                }}
                className="btn-primary inline-flex items-center"
              >
                <X size={16} className="mr-2" />
                <span>Clear all filters</span>
              </button>
            </div>
          ) : (
            <div className={view === 'grid' 
              ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              : "space-y-6"
            }>
              {events.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Events;
