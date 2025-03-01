
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import SearchFilters from '../components/SearchFilters';
import { 
  Siren, Car, Briefcase, Cloud, Sparkles, School, 
  Building, DollarSign, Scale, Briefcase as Job, 
  GraduationCap, Home, MoreHorizontal, 
  MapPin, Clock, Phone, 
  List as ListIcon, 
  Grid as GridIcon
} from 'lucide-react';

// Mock data for government services
const mockGovServices = [
  {
    id: 1,
    name: "Emergency Management Office",
    description: "Disaster preparedness, response, and recovery services for the CNMI.",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc",
    address: "Caller Box 10007, Saipan, MP 96950",
    phone: "(670) 237-8000",
    email: "cnmiemo@gov.mp",
    website: "https://cnmiemo.gov.mp",
    hours: "Monday - Friday: 7:30 AM - 4:30 PM",
    category: "Emergency Response",
    featured: true
  },
  {
    id: 2,
    name: "Bureau of Motor Vehicles",
    description: "Driver's licensing, vehicle registration, and related services.",
    image: "https://images.unsplash.com/photo-1556155092-490a1ba16284",
    address: "Chalan Kanoa, Saipan, MP 96950",
    phone: "(670) 664-9066",
    email: "bmv@gov.mp",
    website: "https://bmv.gov.mp",
    hours: "Monday - Friday: 7:30 AM - 4:30 PM",
    category: "Motor Vehicle",
    featured: true
  },
  {
    id: 3,
    name: "Business License Office",
    description: "Issue and renewal of business licenses for all commercial activities in the CNMI.",
    image: "https://images.unsplash.com/photo-1556761175-b413da4baf72",
    address: "Capitol Hill, Saipan, MP 96950",
    phone: "(670) 664-3000",
    email: "business@gov.mp",
    website: "https://business.gov.mp",
    hours: "Monday - Friday: 7:30 AM - 4:30 PM",
    category: "Business and Licenses",
    featured: false
  },
  {
    id: 4,
    name: "Building Safety Office",
    description: "Building permits, inspections, and code enforcement services.",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5",
    address: "Oleai, Saipan, MP 96950",
    phone: "(670) 234-2268",
    email: "buildingsafety@gov.mp",
    website: "https://buildingsafety.gov.mp",
    hours: "Monday - Friday: 7:30 AM - 4:30 PM",
    category: "Permitting and Climate",
    featured: false
  },
  {
    id: 5,
    name: "Public School System",
    description: "K-12 education services for the Commonwealth.",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    address: "Capitol Hill, Saipan, MP 96950",
    phone: "(670) 237-3001",
    email: "info@cnmipss.org",
    website: "https://www.cnmipss.org",
    hours: "Monday - Friday: 7:30 AM - 4:30 PM",
    category: "Education and Child Care",
    featured: true
  },
  {
    id: 6,
    name: "Department of Finance",
    description: "Treasury, taxation, and financial management for the CNMI government.",
    image: "https://images.unsplash.com/photo-1567427017947-545c5f8d16ad",
    address: "Capitol Hill, Saipan, MP 96950",
    phone: "(670) 664-1100",
    email: "finance@gov.mp",
    website: "https://finance.gov.mp",
    hours: "Monday - Friday: 7:30 AM - 4:30 PM",
    category: "Financial Services",
    featured: false
  },
  {
    id: 7,
    name: "Superior Court of the CNMI",
    description: "Trial court for civil and criminal cases in the Commonwealth.",
    image: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f",
    address: "Susupe, Saipan, MP 96950",
    phone: "(670) 235-4128",
    email: "info@justice.gov.mp",
    website: "https://www.justice.gov.mp",
    hours: "Monday - Friday: 7:30 AM - 4:30 PM",
    category: "Justice and Courts",
    featured: false
  },
  {
    id: 8,
    name: "Department of Labor",
    description: "Employment services, labor standards enforcement, and workforce development.",
    image: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0",
    address: "Capitol Hill, Saipan, MP 96950",
    phone: "(670) 664-3196",
    email: "labor@gov.mp",
    website: "https://labor.gov.mp",
    hours: "Monday - Friday: 7:30 AM - 4:30 PM",
    category: "Labor and Jobs",
    featured: false
  },
  {
    id: 9,
    name: "Office of the Governor",
    description: "Executive branch leadership and administration of government operations.",
    image: "https://images.unsplash.com/photo-1520607162513-77705c0f0d4a",
    address: "Capitol Hill, Saipan, MP 96950",
    phone: "(670) 664-2200",
    email: "governor@gov.mp",
    website: "https://governor.gov.mp",
    hours: "Monday - Friday: 7:30 AM - 4:30 PM",
    category: "Governors Office",
    featured: true
  },
  {
    id: 10,
    name: "Mayor's Office of Saipan",
    description: "Local government services for the island of Saipan.",
    image: "https://images.unsplash.com/photo-1577495508326-19a1b3cf65b1",
    address: "Chalan Kanoa, Saipan, MP 96950",
    phone: "(670) 234-6208",
    email: "mayor@saipan.gov.mp",
    website: "https://saipan.gov.mp",
    hours: "Monday - Friday: 7:30 AM - 4:30 PM",
    category: "Mayors Offices",
    featured: false
  },
  {
    id: 11,
    name: "Commonwealth Healthcare Corporation",
    description: "Public health services and hospital operations for the CNMI.",
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d",
    address: "Navy Hill, Saipan, MP 96950",
    phone: "(670) 234-8950",
    email: "info@chcc.gov.mp",
    website: "https://www.chcc.gov.mp",
    hours: "24/7 Emergency Services",
    category: "Other Programs",
    featured: true
  },
  {
    id: 12,
    name: "Department of Lands and Natural Resources",
    description: "Environmental protection, agriculture, and natural resource management.",
    image: "https://images.unsplash.com/photo-1511497584788-876760111969",
    address: "Lower Base, Saipan, MP 96950",
    phone: "(670) 322-9834",
    email: "dlnr@gov.mp",
    website: "https://dlnr.gov.mp",
    hours: "Monday - Friday: 7:30 AM - 4:30 PM",
    category: "Permitting and Climate",
    featured: false
  },
  {
    id: 13,
    name: "Department of Community and Cultural Affairs",
    description: "Cultural preservation, library services, and community programs.",
    image: "https://images.unsplash.com/photo-1511225317751-5c2d61819d58",
    address: "Capitol Hill, Saipan, MP 96950",
    phone: "(670) 664-2587",
    email: "dcca@gov.mp",
    website: "https://dcca.gov.mp",
    hours: "Monday - Friday: 7:30 AM - 4:30 PM",
    category: "Cultural Affairs",
    featured: false
  },
  {
    id: 14,
    name: "Commonwealth Election Commission",
    description: "Voter registration and election administration for the CNMI.",
    image: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c",
    address: "Susupe, Saipan, MP 96950",
    phone: "(670) 235-8683",
    email: "cec@gov.mp",
    website: "https://cec.gov.mp",
    hours: "Monday - Friday: 7:30 AM - 4:30 PM",
    category: "Other Programs",
    featured: false
  },
];

// Government service categories with their respective icons
const serviceCategories = [
  { name: "Emergency Response", icon: <Siren size={20} /> },
  { name: "Motor Vehicle", icon: <Car size={20} /> },
  { name: "Business and Licenses", icon: <Briefcase size={20} /> },
  { name: "Permitting and Climate", icon: <Cloud size={20} /> },
  { name: "Education and Child Care", icon: <School size={20} /> },
  { name: "Cultural Affairs", icon: <Sparkles size={20} /> },
  { name: "Financial Services", icon: <DollarSign size={20} /> },
  { name: "Justice and Courts", icon: <Scale size={20} /> },
  { name: "Labor and Jobs", icon: <Job size={20} /> },
  { name: "Governors Office", icon: <GraduationCap size={20} /> },
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
    name: "Island",
    options: [
      { label: "Saipan", value: "saipan" },
      { label: "Tinian", value: "tinian" },
      { label: "Rota", value: "rota" },
    ]
  }
];

const GovernmentServices = () => {
  const [activeView, setActiveView] = useState('grid');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredServices, setFilteredServices] = useState(mockGovServices);

  // Handle category selection
  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    
    if (category === 'All') {
      setFilteredServices(mockGovServices);
    } else {
      setFilteredServices(mockGovServices.filter(service => service.category === category));
    }
  };

  // Handle search and filter
  const handleSearch = (search: string, filters: Record<string, string | string[]>) => {
    let results = [...mockGovServices];
    
    // Apply search text filter
    if (search) {
      const searchLower = search.toLowerCase();
      results = results.filter(service => 
        service.name.toLowerCase().includes(searchLower) ||
        service.description.toLowerCase().includes(searchLower) ||
        service.category.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply category filter if selected
    if (filters.Category && Array.isArray(filters.Category) && filters.Category.length > 0) {
      results = results.filter(service => filters.Category.includes(service.category));
    }
    
    // Apply island filter if selected
    if (filters.Island) {
      // This is a mock implementation - we'd need real island data for each service
      // to implement this properly
      console.log("Would filter by island:", filters.Island);
    }
    
    setFilteredServices(results);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <Navigation />
      
      {/* Hero Section */}
      <Hero 
        title="Government Services"
        subtitle="Access information about government services in the Northern Mariana Islands"
        buttonText="Contact Government"
        buttonLink="/contact"
        backgroundImage="https://images.unsplash.com/photo-1541872703-74c5e44368f9"
        size="medium"
      />
      
      {/* Main Content */}
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          {/* Category Filters */}
          <div className="mb-8 overflow-x-auto">
            <div className="flex space-x-2 pb-2">
              <button
                onClick={() => handleCategoryChange('All')}
                className={`category-pill ${activeCategory === 'All' ? 'active' : ''}`}
              >
                <Building size={18} />
                <span>All Services</span>
              </button>
              
              {serviceCategories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => handleCategoryChange(category.name)}
                  className={`category-pill ${activeCategory === category.name ? 'active' : ''}`}
                >
                  {category.icon}
                  <span>{category.name}</span>
                </button>
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
                    <GridIcon size={20} />
                  </button>
                  <button 
                    onClick={() => setActiveView('list')}
                    className={`p-2 rounded ${activeView === 'list' ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
                    aria-label="List view"
                  >
                    <ListIcon size={20} />
                  </button>
                </div>
              </div>
              
              {/* Featured Services Section (only show when no filters are applied) */}
              {activeCategory === 'All' && filteredServices.length === mockGovServices.length && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Featured Services</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredServices
                      .filter(service => service.featured)
                      .slice(0, 4)
                      .map(service => (
                        <div key={service.id} className="bg-white rounded-xl overflow-hidden shadow-md border border-gray-100 hover:shadow-lg transition-shadow duration-300">
                          <div className="aspect-w-16 aspect-h-9 relative">
                            <img src={service.image} alt={service.name} className="object-cover w-full h-48" />
                            <div className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                              {service.category}
                            </div>
                          </div>
                          <div className="p-6">
                            <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                            <p className="text-gray-600 mb-4">{service.description}</p>
                            <div className="flex items-center text-gray-500 mb-2">
                              <MapPin size={16} className="mr-2 flex-shrink-0" />
                              <span className="truncate">{service.address}</span>
                            </div>
                            <div className="flex items-center text-gray-500 mb-2">
                              <Clock size={16} className="mr-2 flex-shrink-0" />
                              <span>{service.hours}</span>
                            </div>
                            <div className="flex items-center text-gray-500 mb-4">
                              <Phone size={16} className="mr-2 flex-shrink-0" />
                              <span>{service.phone}</span>
                            </div>
                            <Link 
                              to={`/government-services/${service.id}`} 
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
              
              {/* Services Listing Grid/List View */}
              {filteredServices.length > 0 ? (
                <div className={activeView === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 gap-6' : 'space-y-6'}>
                  {filteredServices.map(service => (
                    activeView === 'grid' ? (
                      <div key={service.id} className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all-300">
                        <div className="relative">
                          <img src={service.image} alt={service.name} className="w-full h-48 object-cover" />
                          <div className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {service.category}
                          </div>
                        </div>
                        <div className="p-5">
                          <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">{service.description}</p>
                          <div className="flex items-center text-gray-500 text-sm mb-2">
                            <MapPin size={16} className="mr-2 flex-shrink-0" />
                            <span className="truncate">{service.address}</span>
                          </div>
                          <div className="flex items-center text-gray-500 text-sm mb-3">
                            <Phone size={16} className="mr-2 flex-shrink-0" />
                            <span>{service.phone}</span>
                          </div>
                          <Link 
                            to={`/government-services/${service.id}`} 
                            className="inline-block mt-1 px-3 py-1.5 text-sm bg-gray-900 text-white rounded hover:bg-gray-800 transition-all-300"
                          >
                            View Details
                          </Link>
                        </div>
                      </div>
                    ) : (
                      <div key={service.id} className="flex flex-col md:flex-row bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200 hover:shadow-md transition-all-300">
                        <div className="md:w-1/3 relative">
                          <img src={service.image} alt={service.name} className="w-full h-48 md:h-full object-cover" />
                          <div className="absolute top-4 left-4 bg-gray-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                            {service.category}
                          </div>
                        </div>
                        <div className="md:w-2/3 p-5">
                          <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
                          <p className="text-gray-600 mb-4">{service.description}</p>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                            <div className="flex items-center text-gray-500 text-sm">
                              <MapPin size={16} className="mr-2 flex-shrink-0" />
                              <span className="truncate">{service.address}</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm">
                              <Phone size={16} className="mr-2 flex-shrink-0" />
                              <span>{service.phone}</span>
                            </div>
                            <div className="flex items-center text-gray-500 text-sm md:col-span-2">
                              <Clock size={16} className="mr-2 flex-shrink-0" />
                              <span>{service.hours}</span>
                            </div>
                          </div>
                          <Link 
                            to={`/government-services/${service.id}`} 
                            className="inline-block mt-2 px-4 py-2 bg-gray-900 text-white rounded hover:bg-gray-800 transition-all-300"
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
                  <Building size={48} className="mx-auto text-gray-400 mb-4" />
                  <h3 className="text-xl font-semibold text-gray-700 mb-2">No services found</h3>
                  <p className="text-gray-500 mb-6">We couldn't find any government services matching your search criteria.</p>
                  <button 
                    onClick={() => {
                      setActiveCategory('All');
                      setFilteredServices(mockGovServices);
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
      
      {/* Government Information CTA Section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-4">Need more government information?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Contact the CNMI Governor's Office for additional assistance with government services.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <a 
              href="tel:+16706642200" 
              className="inline-flex items-center justify-center px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transition-colors"
            >
              <Phone size={16} className="mr-2" />
              Call (670) 664-2200
            </a>
            <Link 
              to="/contact" 
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-gray-900 border border-gray-300 font-medium rounded-md hover:bg-gray-50 transition-colors"
            >
              Contact Online
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default GovernmentServices;
