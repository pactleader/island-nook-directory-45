
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, MapPin, SlidersHorizontal, ChevronDown, X, Search } from 'lucide-react';
import { mockProperties } from '../utils/mockData';
import Navigation from '../components/Navigation';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';
import SearchFilters from '../components/SearchFilters';

const Properties = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('newest');
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  
  // Filter groups for the search filters component
  const filterGroups = [
    {
      name: 'Property Type',
      options: [
        { label: 'Residential', value: 'residential' },
        { label: 'Commercial', value: 'commercial' },
        { label: 'Land', value: 'land' },
        { label: 'Hotel', value: 'hotel' },
        { label: 'Economic Incentive', value: 'economic-incentive' }
      ],
      multiSelect: true
    },
    {
      name: 'Island',
      options: [
        { label: 'Saipan', value: 'saipan' },
        { label: 'Tinian', value: 'tinian' },
        { label: 'Rota', value: 'rota' }
      ],
      multiSelect: true
    },
    {
      name: 'Price Range',
      options: [
        { label: 'Under $100k', value: 'under-100k' },
        { label: '$100k - $250k', value: '100k-250k' },
        { label: '$250k - $500k', value: '250k-500k' },
        { label: '$500k - $1M', value: '500k-1m' },
        { label: 'Over $1M', value: 'over-1m' }
      ]
    },
    {
      name: 'Bedrooms',
      options: [
        { label: 'Any', value: 'any' },
        { label: '1+', value: '1-plus' },
        { label: '2+', value: '2-plus' },
        { label: '3+', value: '3-plus' },
        { label: '4+', value: '4-plus' }
      ]
    },
    {
      name: 'Bathrooms',
      options: [
        { label: 'Any', value: 'any' },
        { label: '1+', value: '1-plus' },
        { label: '2+', value: '2-plus' },
        { label: '3+', value: '3-plus' }
      ]
    },
    {
      name: 'Features',
      options: [
        { label: 'Ocean View', value: 'ocean-view' },
        { label: 'Pool', value: 'pool' },
        { label: 'Garage', value: 'garage' },
        { label: 'Air Conditioning', value: 'ac' },
        { label: 'Garden', value: 'garden' }
      ],
      multiSelect: true
    }
  ];
  
  // Handle search
  const handleSearch = (searchQuery: string, filters: Record<string, any>) => {
    setActiveFilters({ ...filters, query: searchQuery });
    
    // Here you would normally fetch filtered data from an API
    // For now, we'll just simulate filtering on the client side
    let filteredProperties = [...mockProperties];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredProperties = filteredProperties.filter(property => 
        property.title.toLowerCase().includes(query) ||
        property.description.toLowerCase().includes(query) ||
        property.village.toLowerCase().includes(query) ||
        property.island.toLowerCase().includes(query)
      );
    }
    
    // Apply other filters (simplified version)
    if (filters.Island && Array.isArray(filters.Island)) {
      filteredProperties = filteredProperties.filter(property => 
        filters.Island.includes(property.island.toLowerCase())
      );
    }
    
    if (filters['Property Type'] && Array.isArray(filters['Property Type'])) {
      filteredProperties = filteredProperties.filter(property => 
        filters['Property Type'].includes(property.propertyType)
      );
    }
    
    // Apply sorting
    sortProperties(filteredProperties, sortOption);
  };
  
  // Handle sort change
  const handleSortChange = (option: string) => {
    setSortOption(option);
    sortProperties(properties, option);
  };
  
  // Sort properties based on the selected option
  const sortProperties = (propertiesToSort: typeof mockProperties, option: string) => {
    let sortedProperties = [...propertiesToSort];
    
    switch (option) {
      case 'price-asc':
        sortedProperties.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedProperties.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortedProperties.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        sortedProperties.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      default:
        break;
    }
    
    setProperties(sortedProperties);
  };
  
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({});
    setProperties(mockProperties);
  };
  
  // Count active filters
  const countActiveFilters = () => {
    let count = 0;
    Object.keys(activeFilters).forEach(key => {
      if (key === 'query' && activeFilters[key]) count++;
      else if (Array.isArray(activeFilters[key])) count += activeFilters[key].length;
      else if (activeFilters[key]) count++;
    });
    return count;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Properties</h1>
            <p className="text-gray-600">Discover properties throughout the Northern Mariana Islands</p>
          </div>
          
          {/* Search and Filters Row */}
          <div className="mb-8">
            <SearchFilters 
              title="Find Your Perfect Property"
              placeholder="Search by location, property name, or features"
              filterGroups={filterGroups}
              onSearch={handleSearch}
            />
          </div>
          
          {/* Results Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <div className="mb-4 md:mb-0">
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{properties.length}</span> properties found
                {countActiveFilters() > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="ml-2 text-blue-600 hover:text-blue-800 inline-flex items-center"
                  >
                    <X size={14} className="mr-1" />
                    <span>Clear filters</span>
                  </button>
                )}
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
              
              {/* Sort Dropdown */}
              <div className="relative inline-block">
                <button 
                  className="flex items-center space-x-1 px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50"
                  onClick={() => {
                    const element = document.getElementById('sort-dropdown');
                    if (element) {
                      element.classList.toggle('hidden');
                    }
                  }}
                >
                  <span className="text-sm">Sort: </span>
                  <span className="font-medium text-sm">
                    {sortOption === 'newest' ? 'Newest' : 
                     sortOption === 'oldest' ? 'Oldest' : 
                     sortOption === 'price-asc' ? 'Price (Low to High)' : 
                     sortOption === 'price-desc' ? 'Price (High to Low)' : 'Newest'}
                  </span>
                  <ChevronDown size={16} />
                </button>
                
                <div 
                  id="sort-dropdown"
                  className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                >
                  <div className="py-1">
                    {[
                      { value: 'newest', label: 'Newest' },
                      { value: 'oldest', label: 'Oldest' },
                      { value: 'price-asc', label: 'Price (Low to High)' },
                      { value: 'price-desc', label: 'Price (High to Low)' }
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          handleSortChange(option.value);
                          const element = document.getElementById('sort-dropdown');
                          if (element) {
                            element.classList.add('hidden');
                          }
                        }}
                        className={`w-full text-left px-4 py-2 text-sm ${
                          sortOption === option.value 
                            ? 'bg-gray-100 text-gray-900 font-medium' 
                            : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Property Listings */}
          {properties.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Search size={32} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search filters or search term to find properties
              </p>
              <button 
                onClick={clearFilters}
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
              {properties.map(property => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          {/* Pagination */}
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
              <button className="px-3 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                3
              </button>
              <button className="px-3 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
