import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Building, Shield, AlertTriangle, Car, Briefcase, School, Library, DollarSign, Scale, User, Crown, Filter, ChevronDown, ChevronUp, X, MapPin, Clock, Phone, Grid, List } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SearchFilters from '../components/SearchFilters';
import Hero from '../components/Hero';

// Mock government services data
const mockServices = [
  {
    id: 1,
    title: "Department of Public Safety",
    description: "Emergency services, police, fire, and disaster response for the CNMI.",
    category: "emergency-response",
    subcategory: "police",
    image: "https://images.unsplash.com/photo-1594142243146-93fec6d387e1",
    location: "Susupe, Saipan",
    contact: {
      phone: "(670) 664-9001",
      email: "info@dps.gov.mp",
      website: "https://dps.gov.mp"
    },
    hours: "Monday-Friday: 7:30 AM - 4:30 PM"
  },
  {
    id: 2,
    title: "Bureau of Motor Vehicles",
    description: "Vehicle registration, driver's licenses, and related services.",
    category: "motor-vehicle",
    subcategory: "licensing",
    image: "https://images.unsplash.com/photo-1629207010361-2e502f21a174",
    location: "Susupe, Saipan",
    contact: {
      phone: "(670) 664-9066",
      email: "info@bmv.gov.mp",
      website: "https://bmv.gov.mp"
    },
    hours: "Monday-Friday: 7:30 AM - 4:00 PM"
  },
  {
    id: 3,
    title: "Department of Commerce",
    description: "Business licensing, economic development, and statistical information.",
    category: "business-and-licenses",
    subcategory: "business-licensing",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    location: "Capital Hill, Saipan",
    contact: {
      phone: "(670) 664-3000",
      email: "info@commerce.gov.mp",
      website: "https://commerce.gov.mp"
    },
    hours: "Monday-Friday: 7:30 AM - 4:30 PM"
  },
  {
    id: 4,
    title: "Bureau of Environmental and Coastal Quality",
    description: "Environmental protection, coastal management, and permitting.",
    category: "permitting-and-climate",
    subcategory: "environmental",
    image: "https://images.unsplash.com/photo-1601043048939-ef19c9883218",
    location: "Gualo Rai, Saipan",
    contact: {
      phone: "(670) 664-8500",
      email: "contact@becq.gov.mp",
      website: "https://becq.gov.mp"
    },
    hours: "Monday-Friday: 7:30 AM - 4:30 PM"
  },
  {
    id: 5,
    title: "CNMI Public School System",
    description: "K-12 education, school enrollment, and educational resources.",
    category: "education-and-child-care",
    subcategory: "public-education",
    image: "https://images.unsplash.com/photo-1519452575417-564c1401ecc0",
    location: "Capitol Hill, Saipan",
    contact: {
      phone: "(670) 237-3000",
      email: "info@cnmipss.org",
      website: "https://www.cnmipss.org"
    },
    hours: "Monday-Friday: 7:30 AM - 4:30 PM"
  }
];

// Government service categories
const serviceCategories = {
  "emergency-response": {
    label: "Emergency Response",
    subcategories: [
      { label: "Police", value: "police" },
      { label: "Fire Department", value: "fire" },
      { label: "Emergency Medical", value: "medical" },
      { label: "Disaster Recovery", value: "disaster" }
    ]
  },
  "motor-vehicle": {
    label: "Motor Vehicle",
    subcategories: [
      { label: "Driver's Licensing", value: "licensing" },
      { label: "Vehicle Registration", value: "registration" },
      { label: "Traffic Tickets", value: "tickets" },
      { label: "Vehicle Inspection", value: "inspection" }
    ]
  },
  "business-and-licenses": {
    label: "Business and Licenses",
    subcategories: [
      { label: "Business Licensing", value: "business-licensing" },
      { label: "Professional Licensing", value: "professional-licensing" },
      { label: "Trade Permits", value: "trade" },
      { label: "Tax Registration", value: "tax" }
    ]
  },
  "permitting-and-climate": {
    label: "Permitting and Climate",
    subcategories: [
      { label: "Building Permits", value: "building" },
      { label: "Environmental Permits", value: "environmental" },
      { label: "Zoning", value: "zoning" },
      { label: "Coastal Management", value: "coastal" }
    ]
  },
  "education-and-child-care": {
    label: "Education and Child Care",
    subcategories: [
      { label: "Public Education", value: "public-education" },
      { label: "Higher Education", value: "higher-education" },
      { label: "Child Care Services", value: "child-care" },
      { label: "Special Education", value: "special-education" }
    ]
  },
  "cultural-affairs": {
    label: "Cultural Affairs",
    subcategories: [
      { label: "Arts and Culture", value: "arts" },
      { label: "Historic Preservation", value: "historic" },
      { label: "Museums", value: "museums" },
      { label: "Cultural Events", value: "events" }
    ]
  },
  "financial-services": {
    label: "Financial Services",
    subcategories: [
      { label: "Tax Filing", value: "taxes" },
      { label: "Public Assistance", value: "assistance" },
      { label: "Retirement", value: "retirement" },
      { label: "Treasury", value: "treasury" }
    ]
  },
  "justice-and-courts": {
    label: "Justice and Courts",
    subcategories: [
      { label: "Superior Court", value: "superior-court" },
      { label: "Supreme Court", value: "supreme-court" },
      { label: "Attorney General", value: "attorney-general" },
      { label: "Public Defender", value: "public-defender" }
    ]
  },
  "labor-and-jobs": {
    label: "Labor and Jobs",
    subcategories: [
      { label: "Employment Services", value: "employment" },
      { label: "Labor Regulations", value: "regulations" },
      { label: "Worker's Compensation", value: "compensation" },
      { label: "Job Training", value: "training" }
    ]
  },
  "governors-office": {
    label: "Governor's Office",
    subcategories: [
      { label: "Office of the Governor", value: "governor" },
      { label: "Lieutenant Governor", value: "lt-governor" },
      { label: "Cabinet Affairs", value: "cabinet" }
    ]
  },
  "mayors-offices": {
    label: "Mayors' Offices",
    subcategories: [
      { label: "Saipan Mayor's Office", value: "saipan" },
      { label: "Tinian Mayor's Office", value: "tinian" },
      { label: "Rota Mayor's Office", value: "rota" },
      { label: "Northern Islands Mayor's Office", value: "northern-islands" }
    ]
  },
  "other-programs": {
    label: "Other Programs",
    subcategories: [
      { label: "Health Services", value: "health" },
      { label: "Parks and Recreation", value: "parks" },
      { label: "Utilities", value: "utilities" },
      { label: "Public Works", value: "public-works" }
    ]
  }
};

// Service Card Component
const ServiceCard = ({ service }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Get category icon
  const getCategoryIcon = (category) => {
    switch(category) {
      case 'emergency-response': return <AlertTriangle size={18} />;
      case 'motor-vehicle': return <Car size={18} />;
      case 'business-and-licenses': return <Briefcase size={18} />;
      case 'permitting-and-climate': return <Building size={18} />;
      case 'education-and-child-care': return <School size={18} />;
      case 'cultural-affairs': return <Library size={18} />;
      case 'financial-services': return <DollarSign size={18} />;
      case 'justice-and-courts': return <Scale size={18} />;
      case 'labor-and-jobs': return <User size={18} />;
      case 'governors-office': return <Crown size={18} />;
      case 'mayors-offices': return <Building size={18} />;
      default: return <Building size={18} />;
    }
  };
  
  return (
    <div className="glass-card rounded-xl overflow-hidden hover-lift">
      <Link to={`/government-services/${service.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {/* Blurred Image Placeholder */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-md scale-105"
            style={{ backgroundImage: `url(${service.image})` }}
          ></div>
          
          {/* Actual Image */}
          <img
            src={service.image}
            alt={service.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Category Label */}
          <div className="absolute top-4 left-4 z-10">
            <span className="chip bg-gray-900/80 text-white backdrop-blur-sm">
              {serviceCategories[service.category]?.label || 'Government Service'}
            </span>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {service.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-1">
            <MapPin size={16} />
            <span className="ml-1 text-sm">
              {service.location}
            </span>
          </div>
          
          <div className="flex items-center text-gray-600 mb-3">
            <Clock size={16} />
            <span className="ml-1 text-sm">
              {service.hours}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {service.description}
          </p>
          
          {/* Contact */}
          <div className="flex items-center text-gray-600">
            <Phone size={16} />
            <span className="ml-1 text-sm font-medium">
              {service.contact.phone}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

const GovernmentServices = () => {
  const [services, setServices] = useState(mockServices);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(true);
  
  // Filter groups for search filters
  const filterGroups = [
    {
      name: "Categories",
      options: Object.keys(serviceCategories).map(key => ({
        label: serviceCategories[key].label,
        value: key
      })),
      multiSelect: false
    },
    {
      name: "Islands",
      options: [
        { label: "Saipan", value: "saipan" },
        { label: "Tinian", value: "tinian" },
        { label: "Rota", value: "rota" }
      ],
      multiSelect: false
    }
  ];
  
  // Handle search
  const handleSearch = (query, filters) => {
    console.log("Search query:", query);
    console.log("Filters:", filters);
    
    // Filter services based on search and filters (mock implementation)
    let filteredServices = [...mockServices];
    
    // Filter by search query
    if (query) {
      const searchLower = query.toLowerCase();
      filteredServices = filteredServices.filter(service => 
        service.title.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower) ||
        service.location.toLowerCase().includes(searchLower)
      );
    }
    
    // Filter by category
    if (filters.Categories) {
      filteredServices = filteredServices.filter(service => 
        service.category === filters.Categories
      );
    }
    
    setServices(filteredServices);
  };
  
  // Handle category selection
  const handleCategorySelect = (category) => {
    setActiveCategory(activeCategory === category ? null : category);
    
    // Filter services by category
    if (activeCategory === category) {
      setServices(mockServices); // Reset to all services
    } else {
      setServices(mockServices.filter(service => service.category === category));
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <Hero 
        title="Government Services"
        subtitle="Access official services and resources in the CNMI"
        backgroundImage="https://images.unsplash.com/photo-1566035106595-076d8fa1c97d"
        size="medium"
        overlayOpacity={0.7}
      />
      
      <main className="flex-grow pt-8 pb-12">
        <div className="container mx-auto px-4">
          {/* Search Filters */}
          <div className="mb-8">
            <SearchFilters 
              title="Find Government Services"
              placeholder="Search for services, departments, or offices"
              filterGroups={filterGroups}
              onSearch={handleSearch}
            />
          </div>
          
          {/* Category Selection */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Browse by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
              {Object.keys(serviceCategories).map(category => (
                <button
                  key={category}
                  onClick={() => handleCategorySelect(category)}
                  className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
                >
                  {serviceCategories[category].label}
                </button>
              ))}
            </div>
          </div>
          
          {/* View Toggle and Results Count */}
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              <span className="font-semibold text-gray-900">{services.length}</span> services found
              {activeCategory && (
                <span> in <span className="font-medium">{serviceCategories[activeCategory]?.label}</span></span>
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
          
          {/* Services Listings */}
          {services.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Building size={32} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No services found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search filters or search term
              </p>
              <button 
                onClick={() => {
                  setActiveCategory(null);
                  setServices(mockServices);
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
              {services.map(service => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GovernmentServices;
