import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Car, ShoppingCart, DollarSign, Calendar } from 'lucide-react';
import { mockVehicles } from '../utils/mockData';
import Navigation from '../components/Navigation';
import VehicleCard from '../components/VehicleCard';
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

const Vehicles = () => {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('newest');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState({});
  
  // Add this new state for preset filters
  const [activePreset, setActivePreset] = useState(null);
  
  // Handle search
  const applyFilters = (search: string, filters: Record<string, string>) => {
    let filteredVehicles = [...mockVehicles];
    
    if (search) {
      const query = search.toLowerCase();
      filteredVehicles = filteredVehicles.filter(vehicle =>
        vehicle.title.toLowerCase().includes(query) ||
        vehicle.description.toLowerCase().includes(query) ||
        vehicle.make.toLowerCase().includes(query) ||
        vehicle.model.toLowerCase().includes(query)
      );
    }
    
    // Apply additional filters
    Object.keys(filters).forEach(key => {
      const filterValue = filters[key];
      filteredVehicles = filteredVehicles.filter(vehicle =>
        vehicle[key] === filterValue
      );
    });
    
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
      case 'year-asc':
        sortedVehicles.sort((a, b) => a.year - b.year);
        break;
      case 'year-desc':
        sortedVehicles.sort((a, b) => b.year - a.year);
        break;
      default:
        break;
    }
    
    setVehicles(sortedVehicles);
  };
  
  // Add this function to handle preset filter clicks
  const handlePresetClick = (preset) => {
    setActivePreset(preset === activePreset ? null : preset);
    
    // Apply preset filters
    let newFilters = {};
    
    if (preset === 'buy') {
      newFilters = {
        listingType: 'sale',
      };
    } else if (preset === 'sell') {
      newFilters = {
        listingType: 'sale',
      };
      // Add additional logic for sell perspective if needed
    } else if (preset === 'rent') {
      newFilters = {
        listingType: 'rent',
      };
    }
    
    // Apply these filters
    setActiveFilters(newFilters);
    applyFilters(searchQuery, newFilters);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Vehicles in the Marianas</h1>
            <p className="text-gray-600">Find cars, trucks, and other vehicles across the islands</p>
          </div>
          
          {/* Filter Preset Buttons */}
          <div className="flex flex-wrap gap-2 mb-4">
            <FilterPresetButton 
              label="Buy" 
              active={activePreset === 'buy'} 
              onClick={() => handlePresetClick('buy')}
              icon={ShoppingCart}
            />
            <FilterPresetButton 
              label="Sell" 
              active={activePreset === 'sell'} 
              onClick={() => handlePresetClick('sell')}
              icon={DollarSign}
            />
            <FilterPresetButton 
              label="Rent" 
              active={activePreset === 'rent'} 
              onClick={() => handlePresetClick('rent')}
              icon={Calendar}
            />
          </div>
          
          {/* Search Area */}
          <div className="glass-card rounded-lg p-4 mb-6">
            <div className="mb-4">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search for vehicles, make, model, or keywords"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        applyFilters(searchQuery, activeFilters);
                      }
                    }}
                    className="input-field pr-10 h-10 w-full"
                  />
                  <button
                    onClick={() => applyFilters(searchQuery, activeFilters)}
                    className="absolute right-1 top-1 p-2 text-gray-600 hover:text-gray-900 rounded-md transition-all-300"
                    aria-label="Search"
                  >
                    <Car size={18} />
                  </button>
                </div>
                
                {searchQuery && (
                  <button 
                    onClick={() => {
                      setSearchQuery('');
                      applyFilters('', activeFilters);
                    }}
                    className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded-md transition-all-300"
                  >
                    Clear
                  </button>
                )}
              </div>
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
                    {sortOption === 'price-asc' ? 'Price (Low to High)' : 
                     sortOption === 'price-desc' ? 'Price (High to Low)' : 
                     sortOption === 'year-asc' ? 'Year (Oldest to Newest)' : 
                     sortOption === 'year-desc' ? 'Year (Newest to Oldest)' : 'Relevance'}
                  </span>
                  <ChevronDown size={16} />
                </button>
                
                <div 
                  id="sort-dropdown"
                  className="hidden absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10"
                >
                  <div className="py-1">
                    {[
                      { value: 'price-asc', label: 'Price (Low to High)' },
                      { value: 'price-desc', label: 'Price (High to Low)' },
                      { value: 'year-asc', label: 'Year (Oldest to Newest)' },
                      { value: 'year-desc', label: 'Year (Newest to Oldest)' }
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
                onClick={() => {
                  setSearchQuery('');
                  applyFilters('', activeFilters);
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

import { Grid, List, Search, ChevronDown, X } from 'lucide-react';
export default Vehicles;
