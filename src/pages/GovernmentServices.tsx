
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import SearchFilters from '../components/SearchFilters';
import { FavoriteButton } from '../components/FavoriteButton';
import { AlertTriangle, Car, Building, FileText, School, Heart, Landmark, Scale, Briefcase, Crown, Home, MoreHorizontal, MapPin, Clock, Phone } from 'lucide-react';

// Mock data for government services
const mockServices = [
  {
    id: 1,
    title: "Emergency Medical Services",
    description: "24/7 emergency medical response services for the Northern Mariana Islands.",
    image: "https://images.unsplash.com/photo-1516574187841-cb9cc2ca948b",
    address: "123 Healthcare Drive, Saipan",
    hours: "24/7",
    phone: "(670) 234-8950",
    website: "https://example.gov/ems",
    category: "Emergency Response",
    featured: true
  },
  {
    id: 2,
    title: "Driver's License Office",
    description: "Obtain, renew, or replace your driver's license and state identification cards.",
    image: "https://images.unsplash.com/photo-1517026575980-3e1e2dedeab4",
    address: "456 Government Center, Saipan",
    hours: "Monday-Friday: 8:00 AM - 4:00 PM",
    phone: "(670) 664-9066",
    website: "https://example.gov/dloffice",
    category: "Motor Vehicle",
    featured: true
  },
  {
    id: 3,
    title: "Business Licensing Division",
    description: "Process and issue business licenses and permits for all commercial activities in the islands.",
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85",
    address: "789 Commerce Plaza, Saipan",
    hours: "Monday-Friday: 8:00 AM - 4:00 PM",
    phone: "(670) 664-3000",
    website: "https://example.gov/business",
    category: "Business and Licenses",
    featured: false
  },
  {
    id: 4,
    title: "Building Permit Office",
    description: "Apply for and obtain building permits and inspections for construction projects.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
    address: "321 Construction Ave, Saipan",
    hours: "Monday-Friday: 7:30 AM - 4:30 PM",
    phone: "(670) 664-2200",
    website: "https://example.gov/permits",
    category: "Permitting and Climate",
    featured: false
  },
  {
    id: 5,
    title: "Public School District Office",
    description: "Administrative office for the public school system in the Northern Mariana Islands.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    address: "555 Education Lane, Saipan",
    hours: "Monday-Friday: 7:30 AM - 4:30 PM",
    phone: "(670) 237-3000",
    website: "https://example.gov/education",
    category: "Education and Child Care",
    featured: true
  },
  {
    id: 6,
    title: "Cultural Heritage Museum",
    description: "Preserve and celebrate the cultural heritage of the Northern Mariana Islands.",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04",
    address: "777 History Road, Saipan",
    hours: "Tuesday-Sunday: 10:00 AM - 5:00 PM",
    phone: "(670) 664-2160",
    website: "https://example.gov/museum",
    category: "Cultural Affairs",
    featured: false
  },
  {
    id: 7,
    title: "Revenue and Taxation Division",
    description: "Manage tax collection and financial services for the government and residents.",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f",
    address: "888 Finance Street, Saipan",
    hours: "Monday-Friday: 8:00 AM - 4:00 PM",
    phone: "(670) 664-1000",
    website: "https://example.gov/tax",
    category: "Financial Services",
    featured: false
  },
  {
    id: 8,
    title: "Superior Court",
    description: "The trial court of general jurisdiction for the Northern Mariana Islands.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
    address: "999 Justice Boulevard, Saipan",
    hours: "Monday-Friday: 7:30 AM - 4:30 PM",
    phone: "(670) 235-4210",
    website: "https://example.gov/court",
    category: "Justice and Courts",
    featured: true
  },
  {
    id: 9,
    title: "Department of Labor",
    description: "Protect workers' rights and regulate employment practices throughout the islands.",
    image: "https://images.unsplash.com/photo-1521791136064-7986c2920216",
    address: "111 Worker's Plaza, Saipan",
    hours: "Monday-Friday: 7:30 AM - 4:30 PM",
    phone: "(670) 664-3196",
    website: "https://example.gov/labor",
    category: "Labor and Jobs",
    featured: false
  },
  {
    id: 10,
    title: "Office of the Governor",
    description: "Executive office for the leadership of the Commonwealth of the Northern Mariana Islands.",
    image: "https://images.unsplash.com/photo-1536093058399-3e9f9fad20c8",
    address: "Capitol Hill, Saipan",
    hours: "Monday-Friday: 7:30 AM - 4:30 PM",
    phone: "(670) 664-2200",
    website: "https://example.gov/governor",
    category: "Governors Office",
    featured: true
  },
  {
    id: 11,
    title: "Saipan Mayor's Office",
    description: "Local government services and support for the municipality of Saipan.",
    image: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4",
    address: "222 Municipal Drive, Saipan",
    hours: "Monday-Friday: 7:30 AM - 4:30 PM",
    phone: "(670) 234-6208",
    website: "https://example.gov/saipan",
    category: "Mayors Offices",
    featured: false
  },
  {
    id: 12,
    title: "Veterans Affairs Office",
    description: "Support and resources for military veterans living in the Northern Mariana Islands.",
    image: "https://images.unsplash.com/photo-1533073526757-2c8ca1df9f1c",
    address: "333 Veterans Memorial Road, Saipan",
    hours: "Monday-Friday: 8:00 AM - 4:00 PM",
    phone: "(670) 664-2650",
    website: "https://example.gov/veterans",
    category: "Other Programs",
    featured: false
  }
];

// Government service categories with their respective icons
const serviceCategories = [
  { name: "Emergency Response", icon: <AlertTriangle size={20} /> },
  { name: "Motor Vehicle", icon: <Car size={20} /> },
  { name: "Business and Licenses", icon: <Building size={20} /> },
  { name: "Permitting and Climate", icon: <FileText size={20} /> },
  { name: "Education and Child Care", icon: <School size={20} /> },
  { name: "Cultural Affairs", icon: <Heart size={20} /> },
  { name: "Financial Services", icon: <Landmark size={20} /> },
  { name: "Justice and Courts", icon: <Scale size={20} /> },
  { name: "Labor and Jobs", icon: <Briefcase size={20} /> },
  { name: "Governors Office", icon: <Crown size={20} /> },
  { name: "Mayors Offices", icon: <Home size={20} /> },
  { name: "Other Programs", icon: <MoreHorizontal size={20} /> },
];

// Filter options for search component
const filterGroups = [
  {
    name: "Category",
    options: serviceCategories.map(cat => ({ label: cat.name, value: cat.name })),
    multiSelect: true
  },
  {
    name: "Availability",
    options: [
      { label: "Open Now", value: "openNow" },
      { label: "Open Weekends", value: "weekends" },
      { label: "24/7 Services", value: "allHours" },
    ]
  }
];

const GovernmentServices = () => {
  const [activeView, setActiveView] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredServices, setFilteredServices] = useState(mockServices);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'All') {
      setFilteredServices(mockServices);
    } else {
      setFilteredServices(mockServices.filter(service => service.category === category));
    }
  };

  // Handle search and filter
  const handleSearch = (search: string, filters: Record<string, string | string[]>) => {
    let results = [...mockServices];
    
    // Apply search text filter
    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(service => 
        service.title.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower) ||
        service.address.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply category filter if selected
    if (filters.Category && Array.isArray(filters.Category) && filters.Category.length > 0) {
      results = results.filter(service => filters.Category.includes(service.category));
    }
    
    // Apply availability filter if selected
    if (filters.Availability) {
      const availabilityFilter = filters.Availability;
      if (availabilityFilter === 'openNow') {
        // This would require real-time hours information - simplified for demo
        results = results.filter(service => service.hours !== "Closed");
      } else if (availabilityFilter === 'weekends') {
        // Simplified for demo purposes
        results = results.filter(service => service.hours.includes("Saturday") || service.hours.includes("Sunday"));
      } else if (availabilityFilter === 'allHours') {
        results = results.filter(service => service.hours.includes("24/7"));
      }
    }
    
    setFilteredServices(results);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <Hero 
        title="Government Services Directory"
        subtitle="Find official government services, departments, and resources"
        buttonText="Submit a Service"
        buttonLink="/contact"
        backgroundImage="https://images.unsplash.com/photo-1533165858607-313b98855560?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
        size="medium"
      />
      
      {/* Main Content */}
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          {/* Category Tiles */}
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Browse Services by Category</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4">
              <div 
                onClick={() => handleCategoryChange('All')}
                className={`category-tile flex flex-col items-center justify-center p-4 rounded-lg transition-all cursor-pointer h-28 ${
                  activeCategory === 'All' 
                    ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                    : 'bg-blue-100 text-gray-800 hover:bg-blue-200'
                }`}
              >
                <Building size={32} className="mb-2" />
                <span className="text-center font-medium">All Services</span>
              </div>
              
              {serviceCategories.map((category, index) => (
                <div
                  key={index}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`category-tile flex flex-col items-center justify-center p-4 rounded-lg transition-all cursor-pointer h-28 ${
                    activeCategory === category.name 
                      ? 'bg-blue-600 text-white shadow-md transform scale-105' 
                      : 'bg-blue-100 text-gray-800 hover:bg-blue-200'
                  }`}
                >
                  <div className="mb-2 text-2xl">{category.icon}</div>
                  <span className="text-center font-medium text-sm">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with Search and Filters */}
            <div className="lg:col-span-1">
              <SearchFilters 
                title="Find Services"
                placeholder="Search government services..."
                filterGroups={filterGroups}
                onSearch={handleSearch}
              />
            </div>
            
            {/* Services Listing */}
            <div className="lg:col-span-3">
              {/* View toggle and result count */}
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  <span className="font-semibold">{filteredServices.length}</span> services found
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
              
              {/* Featured Services Section (only show when no filters are applied) */}
              {activeCategory === 'All' && filteredServices.length === mockServices.length && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Featured Services</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredServices
                      .filter(service => service.featured)
                      .slice(0, 2)
                      .map(service => (
                        <div key={service.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300 relative">
                          <Link to={`/government-services/${service.id}`} className="block">
                            <div className="aspect-w-16 aspect-h-9 relative">
                              <img src={service.image} alt={service.title} className="object-cover w-full h-48" />
                              <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                                {service.category}
                              </div>
                            </div>
                            <div className="p-6">
                              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                              <p className="text-gray-600 mb-4">{service.description}</p>
                              
                              <div className="space-y-3">
                                <div className="flex items-center text-gray-500">
                                  <MapPin size={16} className="mr-2 flex-shrink-0" />
                                  <span>{service.address}</span>
                                </div>
                                
                                <div className="flex items-center text-gray-500">
                                  <Clock size={16} className="mr-2 flex-shrink-0" />
                                  <span>{service.hours}</span>
                                </div>
                                
                                <div className="flex items-center text-gray-500">
                                  <Phone size={16} className="mr-2 flex-shrink-0" />
                                  <span>{service.phone}</span>
                                </div>
                              </div>
                              
                              <div className="mt-5 flex justify-between">
                                <a 
                                  href={service.website} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 font-medium"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  Visit Website
                                </a>
                                <span 
                                  className="inline-block px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                                >
                                  Details
                                </span>
                              </div>
                            </div>
                          </Link>
                          <div className="absolute top-4 right-4">
                            <FavoriteButton 
                              id={service.id} 
                              type="government" 
                              className="bg-white rounded-full p-1.5 shadow"
                            />
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              )}
              
              {/* Services Listing Grid/List View */}
              {filteredServices.length > 0 ? (
                <div className={activeView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
                  {filteredServices.map(service => (
                    activeView === 'grid' ? (
                      <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all relative">
                        <Link to={`/government-services/${service.id}`} className="block">
                          <div className="relative">
                            <img src={service.image} alt={service.title} className="w-full h-40 object-cover" />
                            <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                              {service.category}
                            </div>
                          </div>
                          <div className="p-5">
                            <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                            <div className="flex items-center text-gray-500 text-sm mb-2">
                              <MapPin size={16} className="mr-2 flex-shrink-0" />
                              <span className="truncate">{service.address}</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm mb-4">
                              <Phone size={16} className="mr-2 flex-shrink-0" />
                              <span>{service.phone}</span>
                            </div>
                            <span 
                              className="inline-block mt-1 px-3 py-1.5 text-sm bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                            >
                              View Details
                            </span>
                          </div>
                        </Link>
                        <div className="absolute top-4 right-4">
                          <FavoriteButton 
                            id={service.id} 
                            type="government" 
                            className="bg-white rounded-full p-1.5 shadow"
                          />
                        </div>
                      </div>
                    ) : (
                      <div key={service.id} className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all relative">
                        <Link to={`/government-services/${service.id}`} className="flex flex-col md:flex-row w-full">
                          <div className="md:w-1/3 relative">
                            <img src={service.image} alt={service.title} className="w-full h-48 md:h-full object-cover" />
                            <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                              {service.category}
                            </div>
                          </div>
                          <div className="md:w-2/3 p-5">
                            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                              <div className="flex items-center text-gray-500">
                                <MapPin size={16} className="mr-2 flex-shrink-0" />
                                <span>{service.address}</span>
                              </div>
                              <div className="flex items-center text-gray-500">
                                <Clock size={16} className="mr-2 flex-shrink-0" />
                                <span>{service.hours}</span>
                              </div>
                              <div className="flex items-center text-gray-500">
                                <Phone size={16} className="mr-2 flex-shrink-0" />
                                <span>{service.phone}</span>
                              </div>
                            </div>
                            <div className="flex justify-between">
                              <a 
                                href={service.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 font-medium"
                                onClick={(e) => e.stopPropagation()}
                              >
                                Visit Website
                              </a>
                              <span 
                                className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
                              >
                                View Details
                              </span>
                            </div>
                          </div>
                        </Link>
                        <div className="absolute top-4 right-4">
                          <FavoriteButton 
                            id={service.id} 
                            type="government" 
                            className="bg-white rounded-full p-1.5 shadow"
                          />
                        </div>
                      </div>
                    )
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-gray-50 rounded-lg">
                  <Building size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No services found</h3>
                  <p className="text-gray-500 mb-6">We couldn't find any government services matching your search criteria.</p>
                  <button 
                    onClick={() => {
                      setActiveCategory('All');
                      setFilteredServices(mockServices);
                    }}
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      {/* CTA Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Need assistance with government services?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Our team can help guide you through available resources and connect you with the right department.
          </p>
          <Link 
            to="/contact" 
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition-colors"
          >
            Contact Us
          </Link>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />

      {/* Add styles for category tiles */}
      <style>{`
        .category-tile {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
};

export default GovernmentServices;
