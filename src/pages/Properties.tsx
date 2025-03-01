import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, Search, ChevronDown, ChevronUp, X, Building, Home, DollarSign, PiggyBank } from 'lucide-react';
import { mockProperties } from '../utils/mockData';
import Navigation from '../components/Navigation';
import PropertyCard from '../components/PropertyCard';
import Footer from '../components/Footer';

// Add this function after existing imports
const FilterPresetButton = ({ label, active, onClick, icon: Icon }) => (
  <button
    onClick={onClick}
    className={`px-4 py-2 rounded-md flex items-center ${
      active ? 'bg-gray-800 text-white' : 'bg-white text-gray-800 border border-gray-200'
    } hover:shadow-md transition-all duration-200`}
  >
    {Icon && <Icon size={16} className="mr-2" />}
    <span>{label}</span>
  </button>
);

const Properties = () => {
  const [properties, setProperties] = useState(mockProperties);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('newest');
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  
  // Add this new state for preset filters
  const [activePreset, setActivePreset] = useState(null);
  
  // Add this function to handle preset filter clicks
  const handlePresetClick = (preset) => {
    setActivePreset(preset === activePreset ? null : preset);
    
    // Apply preset filters
    let newFilters = {};
    
    if (preset === 'hotels') {
      newFilters = {
        propertyType: 'hotel',
        listingType: 'rent',
      };
    } else if (preset === 'rentals') {
      newFilters = {
        propertyType: 'residential',
        listingType: 'rent',
      };
    } else if (preset === 'buy') {
      newFilters = {
        listingType: 'sale',
      };
    } else if (preset === 'sell') {
      newFilters = {
        listingType: 'sale',
      };
      // Add additional logic for sell perspective if needed
    }
    
    // Apply these filters
    setActiveFilters(newFilters);
    applyFilters(searchQuery, newFilters);
  };
  
  // Handle search
  const handleSearch = () => {
    applyFilters(searchQuery, activeFilters);
  };
  
  // Apply filters to properties
  const applyFilters = (query: string, filters: Record<string, string>) => {
    // Start with all properties
    let filteredProperties = [...mockProperties];
    
    // Filter by search query if provided
    if (query) {
      const searchLower = query.toLowerCase();
      filteredProperties = filteredProperties.filter(property => 
        property.title.toLowerCase().includes(searchLower) || 
        property.description.toLowerCase().includes(searchLower) ||
        property.village.toLowerCase().includes(searchLower) ||
        property.island.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply active filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        filteredProperties = filteredProperties.filter(property => 
          property[key] === value
        );
      }
    });
    
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
        sortedProperties.sort((a, b) => new Date(b.listedDate).getTime() - new Date(a.listedDate).getTime());
        break;
      case 'oldest':
        sortedProperties.sort((a, b) => new Date(a.listedDate).getTime() - new Date(b.listedDate).getTime());
        break;
      default:
        break;
    }
    
    setProperties(sortedProperties);
  };
  
  // Handle filter selection
  const handleFilterSelect = (filterType: string, value: string) => {
    setActiveFilters(prev => {
      // If the same value is clicked, remove the filter
      if (prev[filterType] === value) {
        const { [filterType]: _, ...rest } = prev;
        return rest;
      } 
      // Otherwise, set or update the filter
      else {
        return { ...prev, [filterType]: value };
      }
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
    setActivePreset(null);
    setProperties(mockProperties);
  };
  
  // Apply filters when they change
  useEffect(() => {
    handleSearch();
  }, [activeFilters, sortOption]);
  
  // Property types for filtering
  const propertyTypes = [
    { label: 'Residential', value: 'residential' },
    { label: 'Commercial', value: 'commercial' },
    { label: 'Land', value: 'land' },
    { label: 'Hotel', value: 'hotel' },
    { label: 'Economic Incentive', value: 'economic-incentive' }
  ];
  
  // Listing types for filtering
  const listingTypes = [
    { label: 'For Sale', value: 'sale' },
    { label: 'For Rent', value: 'rent' }
  ];
  
  // Islands for filtering
  const islands = [
    { label: 'Saipan', value: 'saipan' },
    { label: 'Tinian', value: 'tinian' },
    { label: 'Rota', value: 'rota' }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Properties in the Marianas</h1>
            <p className="text-gray-600">Find your perfect property across Saipan, Tinian, and Rota</p>
          </div>
          
          {/* Filter Preset Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            <FilterPresetButton 
              label="Hotels & Vacation" 
              active={activePreset === 'hotels'} 
              onClick={() => handlePresetClick('hotels')}
              icon={Building}
            />
            <FilterPresetButton 
              label="Rentals" 
              active={activePreset === 'rentals'} 
              onClick={() => handlePresetClick('rentals')}
              icon={Home}
            />
            <FilterPresetButton 
              label="Buy or Lease" 
              active={activePreset === 'buy'} 
              onClick={() => handlePresetClick('buy')}
              icon={DollarSign}
            />
            <FilterPresetButton 
              label="Sell or Rent" 
              active={activePreset === 'sell'} 
              onClick={() => handlePresetClick('sell')}
              icon={PiggyBank}
            />
          </div>
          
          {/* Search Area */}
          <div className="glass-card rounded-lg p-4 mb-6">
            <div className="mb-4">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search properties by title, location, or description"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        handleSearch();
                      }
                    }}
                    className="input-field pr-10 h-10 w-full"
                  />
                  <button
                    onClick={handleSearch}
                    className="absolute right-1 top-1 p-2 text-gray-600 hover:text-gray-900 rounded-md transition-all-300"
                    aria-label="Search"
                  >
                    <Search size={18} />
                  </button>
                </div>
                
                {(Object.keys(activeFilters).length > 0 || searchQuery) && (
                  <button 
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded-md transition-all-300"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            
            {/* Toggle for Filter Selection */}
            <div className="border-t border-gray-200 pt-3">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <span className="font-medium">Filters</span>
                {showFilters ? 
                  <ChevronUp size={18} className="ml-1" /> : 
                  <ChevronDown size={18} className="ml-1" />
                }
              </button>
            </div>
            
            {/* Filters */}
            {showFilters && (
              <div className="mt-3 space-y-4">
                {/* Property Type Filter */}
                <div>
                  <h3 className="text-sm text-gray-500 mb-2">Property Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {propertyTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => handleFilterSelect('propertyType', type.value)}
                        className={`filter-chip ${activeFilters.propertyType === type.value ? 'active' : ''}`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Listing Type Filter */}
                <div>
                  <h3 className="text-sm text-gray-500 mb-2">Listing Type</h3>
                  <div className="flex flex-wrap gap-2">
                    {listingTypes.map((type) => (
                      <button
                        key={type.value}
                        onClick={() => handleFilterSelect('listingType', type.value)}
                        className={`filter-chip ${activeFilters.listingType === type.value ? 'active' : ''}`}
                      >
                        {type.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Island Filter */}
                <div>
                  <h3 className="text-sm text-gray-500 mb-2">Island</h3>
                  <div className="flex flex-wrap gap-2">
                    {islands.map((island) => (
                      <button
                        key={island.value}
                        onClick={() => handleFilterSelect('island', island.value)}
                        className={`filter-chip ${activeFilters.island === island.value ? 'active' : ''}`}
                      >
                        {island.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Results Controls */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{properties.length}</span> properties
                {activeFilters.propertyType && (
                  <span> • <span className="font-medium">
                    {propertyTypes.find(t => t.value === activeFilters.propertyType)?.label}
                  </span></span>
                )}
                {activeFilters.listingType && (
                  <span> • <span className="font-medium">
                    {listingTypes.find(t => t.value === activeFilters.listingType)?.label}
                  </span></span>
                )}
                {activeFilters.island && (
                  <span> • <span className="font-medium">
                    {islands.find(i => i.value === activeFilters.island)?.label}
                  </span></span>
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
              <Building size={32} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No properties found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search filters or search term
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
          {properties.length > 0 && (
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
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Properties;
