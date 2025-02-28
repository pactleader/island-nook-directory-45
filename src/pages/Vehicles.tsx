
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, Search, Filter, ChevronDown, X, Car, SlidersHorizontal } from 'lucide-react';
import { mockVehicles } from '../utils/mockData';
import Navigation from '../components/Navigation';
import VehicleCard from '../components/VehicleCard';
import Footer from '../components/Footer';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('newest');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [searchQuery, setSearchQuery] = useState('');
  
  // Filter groups
  const filterGroups = [
    {
      name: 'Make',
      options: [
        { label: 'Toyota', value: 'toyota' },
        { label: 'Honda', value: 'honda' },
        { label: 'Ford', value: 'ford' },
        { label: 'Kia', value: 'kia' },
        { label: 'Jeep', value: 'jeep' },
        { label: 'Subaru', value: 'subaru' },
        { label: 'Tesla', value: 'tesla' }
      ],
      multiSelect: true
    },
    {
      name: 'Body Style',
      options: [
        { label: 'Sedan', value: 'sedan' },
        { label: 'SUV', value: 'suv' },
        { label: 'Truck', value: 'truck' },
        { label: 'Coupe', value: 'coupe' },
        { label: 'Convertible', value: 'convertible' },
        { label: 'Van', value: 'van' }
      ],
      multiSelect: true
    },
    {
      name: 'Price Range',
      options: [
        { label: 'Under $10k', value: 'under-10k' },
        { label: '$10k - $20k', value: '10k-20k' },
        { label: '$20k - $30k', value: '20k-30k' },
        { label: '$30k - $40k', value: '30k-40k' },
        { label: '$40k - $50k', value: '40k-50k' },
        { label: 'Over $50k', value: 'over-50k' }
      ]
    },
    {
      name: 'Year',
      options: [
        { label: '2023+', value: '2023-plus' },
        { label: '2020-2022', value: '2020-2022' },
        { label: '2015-2019', value: '2015-2019' },
        { label: '2010-2014', value: '2010-2014' },
        { label: 'Before 2010', value: 'before-2010' }
      ]
    },
    {
      name: 'Condition',
      options: [
        { label: 'New', value: 'new' },
        { label: 'Used', value: 'used' }
      ]
    },
    {
      name: 'Seller Type',
      options: [
        { label: 'Dealer', value: 'dealer' },
        { label: 'Private', value: 'private' }
      ]
    },
    {
      name: 'Features',
      options: [
        { label: 'Bluetooth', value: 'bluetooth' },
        { label: 'Navigation', value: 'navigation' },
        { label: 'Backup Camera', value: 'backup-camera' },
        { label: 'Sunroof', value: 'sunroof' },
        { label: 'Leather Seats', value: 'leather-seats' },
        { label: 'Third Row Seats', value: 'third-row' },
        { label: 'AWD/4WD', value: 'awd-4wd' }
      ],
      multiSelect: true
    }
  ];
  
  // Handle search
  const handleSearch = () => {
    let filteredVehicles = [...mockVehicles];
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredVehicles = filteredVehicles.filter(vehicle => 
        vehicle.title.toLowerCase().includes(query) ||
        vehicle.description.toLowerCase().includes(query) ||
        vehicle.make.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query)
      );
    }
    
    // Apply other filters (simplified version)
    if (activeFilters.Make && Array.isArray(activeFilters.Make)) {
      filteredVehicles = filteredVehicles.filter(vehicle => 
        activeFilters.Make.includes(vehicle.make.toLowerCase())
      );
    }
    
    if (activeFilters['Body Style'] && Array.isArray(activeFilters['Body Style'])) {
      filteredVehicles = filteredVehicles.filter(vehicle => 
        activeFilters['Body Style'].includes(vehicle.bodyStyle.toLowerCase())
      );
    }
    
    if (activeFilters.Condition) {
      filteredVehicles = filteredVehicles.filter(vehicle => 
        vehicle.condition === activeFilters.Condition
      );
    }
    
    if (activeFilters['Seller Type']) {
      filteredVehicles = filteredVehicles.filter(vehicle => 
        vehicle.sellerType === activeFilters['Seller Type']
      );
    }
    
    // Apply sorting
    sortVehicles(filteredVehicles, sortOption);
  };
  
  // Handle sort change
  const handleSortChange = (option: string) => {
    setSortOption(option);
    sortVehicles(vehicles, option);
  };
  
  // Sort vehicles based on the selected option
  const sortVehicles = (vehiclesToSort: typeof mockVehicles, option: string) => {
    let sortedVehicles = [...vehiclesToSort];
    
    switch (option) {
      case 'price-asc':
        sortedVehicles.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        sortedVehicles.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sortedVehicles.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        sortedVehicles.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      case 'year-desc':
        sortedVehicles.sort((a, b) => b.year - a.year);
        break;
      case 'year-asc':
        sortedVehicles.sort((a, b) => a.year - b.year);
        break;
      default:
        break;
    }
    
    setVehicles(sortedVehicles);
  };
  
  // Handle filter selection
  const handleFilterSelect = (groupName: string, optionValue: string, multiSelect?: boolean) => {
    setActiveFilters(prev => {
      // For multiselect, we maintain an array of values
      if (multiSelect) {
        const currentValues = Array.isArray(prev[groupName]) ? [...prev[groupName] as string[]] : [];
        
        // Toggle selection: if already selected, remove it; otherwise, add it
        if (currentValues.includes(optionValue)) {
          const newValues = currentValues.filter(val => val !== optionValue);
          return {
            ...prev,
            [groupName]: newValues.length > 0 ? newValues : undefined
          };
        } else {
          return {
            ...prev,
            [groupName]: [...currentValues, optionValue]
          };
        }
      } 
      // For single select, we just store the value (or clear it if clicking the same one)
      else {
        if (prev[groupName] === optionValue) {
          const { [groupName]: _, ...rest } = prev;
          return rest;
        } else {
          return {
            ...prev,
            [groupName]: optionValue
          };
        }
      }
    });
  };
  
  // Check if a filter is selected
  const isFilterSelected = (groupName: string, optionValue: string) => {
    const selectedValue = activeFilters[groupName];
    
    if (Array.isArray(selectedValue)) {
      return selectedValue.includes(optionValue);
    } else {
      return selectedValue === optionValue;
    }
  };
  
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
    setVehicles(mockVehicles);
  };
  
  // Count active filters
  const countActiveFilters = () => {
    let count = 0;
    Object.keys(activeFilters).forEach(key => {
      if (Array.isArray(activeFilters[key])) count += activeFilters[key].length;
      else if (activeFilters[key]) count++;
    });
    return count;
  };
  
  // Apply filters when they change
  useEffect(() => {
    handleSearch();
  }, [activeFilters]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicles</h1>
            <p className="text-gray-600">Find your perfect vehicle in the Northern Mariana Islands</p>
          </div>
          
          {/* Search Area */}
          <div className="glass-card rounded-lg p-4 mb-6">
            <div className="mb-4">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search by make, model, or features"
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
                
                <button 
                  onClick={clearFilters}
                  className={`px-4 py-2 rounded-md transition-all-300 ${
                    countActiveFilters() > 0 || searchQuery
                      ? 'bg-gray-800 text-white hover:bg-gray-700'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                  disabled={countActiveFilters() === 0 && !searchQuery}
                >
                  Clear
                </button>
              </div>
            </div>
            
            {/* Filter Row */}
            <div className="flex flex-wrap gap-2">
              {filterGroups.map((group, index) => (
                <div key={index} className="relative inline-block">
                  <button
                    className="flex items-center space-x-1 px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50"
                    onClick={() => {
                      const element = document.getElementById(`filter-dropdown-${index}`);
                      if (element) {
                        // Close other dropdowns first
                        document.querySelectorAll('[id^="filter-dropdown-"]').forEach(el => {
                          if (el.id !== `filter-dropdown-${index}`) {
                            el.classList.add('hidden');
                          }
                        });
                        
                        // Toggle this dropdown
                        element.classList.toggle('hidden');
                      }
                    }}
                  >
                    <span className="text-sm font-medium">{group.name}</span>
                    <ChevronDown size={16} />
                    
                    {/* Badge for selected filter count */}
                    {activeFilters[group.name] && (
                      Array.isArray(activeFilters[group.name]) ? 
                        activeFilters[group.name].length > 0 && (
                          <span className="bg-gray-800 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                            {activeFilters[group.name].length}
                          </span>
                        ) : (
                          <span className="bg-gray-800 text-white text-xs rounded-full px-2 py-0.5 ml-1">
                            1
                          </span>
                        )
                    )}
                  </button>
                  
                  <div 
                    id={`filter-dropdown-${index}`}
                    className="hidden absolute left-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-20"
                  >
                    <div className="p-3">
                      <h3 className="font-medium text-gray-900 mb-2">{group.name}</h3>
                      <div className="flex flex-wrap gap-2">
                        {group.options.map((option, optIndex) => (
                          <button
                            key={optIndex}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleFilterSelect(group.name, option.value, group.multiSelect);
                            }}
                            className={`filter-chip ${isFilterSelected(group.name, option.value) ? 'active' : ''}`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Results Controls */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{vehicles.length}</span> vehicles
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
                     sortOption === 'price-desc' ? 'Price (High to Low)' :
                     sortOption === 'year-desc' ? 'Year (Newest)' :
                     sortOption === 'year-asc' ? 'Year (Oldest)' : 'Newest'}
                  </span>
                  <ChevronDown size={16} />
                </button>
                
                <div 
                  id="sort-dropdown"
                  className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                >
                  <div className="py-1">
                    {[
                      { value: 'newest', label: 'Newest Listing' },
                      { value: 'oldest', label: 'Oldest Listing' },
                      { value: 'price-asc', label: 'Price: Low to High' },
                      { value: 'price-desc', label: 'Price: High to Low' },
                      { value: 'year-desc', label: 'Year: Newest First' },
                      { value: 'year-asc', label: 'Year: Oldest First' }
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
          
          {/* Vehicle Listings */}
          {vehicles.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Car size={32} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No vehicles found</h3>
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
              {vehicles.map(vehicle => (
                <VehicleCard key={vehicle.id} vehicle={vehicle} />
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {vehicles.length > 0 && (
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

export default Vehicles;
