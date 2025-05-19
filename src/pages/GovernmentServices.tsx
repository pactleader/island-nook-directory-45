import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import SearchFilters from '../components/SearchFilters';
import ServiceCategoryGrid from '../components/government/ServiceCategoryGrid';
import ServiceResultsSection from '../components/government/ServiceResultsSection';
import { AlertTriangle, Car, Building, FileText, School, Heart, Landmark, Scale, Briefcase, Crown, Home, MoreHorizontal } from 'lucide-react';
import { GovernmentService, ServiceCategory, FilterGroup } from '../types/governmentServices';

// Mock data for government services
const mockServices: GovernmentService[] = [
  {
    id: "1",
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
    id: "2",
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
    id: "3",
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
    id: "4",
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
    id: "5",
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
    id: "6",
    title: "Office of the Governor",
    description: "Executive office for the leadership of the Commonwealth of the Northern Mariana Islands.",
    image: "https://images.unsplash.com/photo-1536093058399-3e9f9fad20c8",
    address: "Capitol Hill, Saipan",
    hours: "Monday-Friday: 7:30 AM - 4:30 PM",
    phone: "(670) 664-2200",
    website: "https://example.gov/governor",
    category: "Governors Office",
    featured: true
  }
];

// Government service categories with their respective icons
const serviceCategories: ServiceCategory[] = [
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
const filterGroups: FilterGroup[] = [
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
  const [activeView, setActiveView] = useState<'grid' | 'list'>('grid');
  const [activeCategory, setActiveCategory] = useState('All');
  const [filteredServices, setFilteredServices] = useState<GovernmentService[]>(mockServices);

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

  // Reset filters
  const resetFilters = () => {
    setActiveCategory('All');
    setFilteredServices(mockServices);
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
        backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=2073&auto=format&fit=crop"
        size="medium"
      />
      
      {/* Main Content */}
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          {/* Category Tiles */}
          <ServiceCategoryGrid 
            categories={serviceCategories}
            activeCategory={activeCategory}
            onCategoryChange={handleCategoryChange}
          />
          
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
            <ServiceResultsSection 
              services={filteredServices}
              allServices={mockServices}
              activeCategory={activeCategory}
              activeView={activeView}
              setActiveView={setActiveView}
              resetFilters={resetFilters}
            />
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
