import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, Search, Filter, ChevronDown, X, Car } from 'lucide-react';
import { mockVehicles } from '../utils/mockData';
import Navigation from '../components/Navigation';
import VehicleCard from '../components/VehicleCard';
import Footer from '../components/Footer';
import SearchFilters from '../components/SearchFilters';

const Vehicles = () => {
  const [vehicles, setVehicles] = useState(mockVehicles);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('newest');
  const [activeFilters, setActiveFilters] = useState<Record<string, any>>({});
  const [searchQuery, setSearchQuery] = useState('');
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Create a ref for detecting clicks outside of dropdowns
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  
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
      name: 'Mileage',
      options: [
        { label: 'Under 10,000', value: 'under-10k-miles' },
        { label: '10,000 - 30,000', value: '10k-30k-miles' },
        { label: '30,000 - 60,000', value: '30k-60k-miles' },
        { label: '60,000 - 100,000', value: '60k-100k-miles' },
        { label: 'Over 100,000', value: 'over-100k-miles' }
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
  const handleSearch = (query: string, filters: Record<string, string | string[]>) => {
    setSearchQuery(query);
    setActiveFilters(filters);
    
    let filteredVehicles = [...mockVehicles];
    
    // Filter by search query
    if (query) {
      const searchLower = query.toLowerCase();
      filteredVehicles = filteredVehicles.filter(vehicle => 
        vehicle.title.toLowerCase().includes(searchLower) ||
        vehicle.description.toLowerCase().includes(searchLower) ||
        vehicle.make.toLowerCase().includes(searchLower) ||
        vehicle.model.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply filters
    Object.entries(filters).forEach(([groupName, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        // Handle multi-select filters
        if (groupName === 'Make') {
          filteredVehicles = filteredVehicles.filter(vehicle => 
            value.includes(vehicle.make.toLowerCase())
          );
        } else if (groupName === 'Body Style') {
          filteredVehicles = filteredVehicles.filter(vehicle => 
            value.includes(vehicle.bodyStyle.toLowerCase())
          );
        } else if (groupName === 'Features') {
          filteredVehicles = filteredVehicles.filter(vehicle => 
            value.some(feature => vehicle.features.includes(feature))
          );
        }
      } else if (typeof value === 'string') {
        // Handle single-select filters
        if (groupName === 'Price Range') {
          filteredVehicles = applyPriceRangeFilter(filteredVehicles, value as string);
        } else if (groupName === 'Year') {
          filteredVehicles = applyYearFilter(filteredVehicles, value as string);
        } else if (groupName === 'Condition') {
          filteredVehicles = filteredVehicles.filter(vehicle => 
            vehicle.condition === value
          );
        } else if (groupName === 'Seller Type') {
          filteredVehicles = filteredVehicles.filter(vehicle => 
            vehicle.sellerType === value
          );
        } else if (groupName === 'Mileage') {
          filteredVehicles = applyMileageFilter(filteredVehicles, value as string);
        }
      }
    });
    
    // Apply sorting
    sortVehicles(filteredVehicles, sortOption);
  };
  
  // Helper function to apply price range filter
  const applyPriceRangeFilter = (vehicles: typeof mockVehicles, value: string) => {
    switch (value) {
      case 'under-10k':
        return vehicles.filter(v => v.price < 10000);
      case '10k-20k':
        return vehicles.filter(v => v.price >= 10000 && v.price < 20000);
      case '20k-30k':
        return vehicles.filter(v => v.price >= 20000 && v.price < 30000);
      case '30k-40k':
        return vehicles.filter(v => v.price >= 30000 && v.price < 40000);
      case '40k-50k':
        return vehicles.filter(v => v.price >= 40000 && v.price < 50000);
      case 'over-50k':
        return vehicles.filter(v => v.price >= 50000);
      default:
        return vehicles;
    }
  };
  
  // Helper function to apply year filter
  const applyYearFilter = (vehicles: typeof mockVehicles, value: string) => {
    switch (value) {
      case '2023-plus':
        return vehicles.filter(v => v.year >= 2023);
      case '2020-2022':
        return vehicles.filter(v => v.year >= 2020 && v.year <= 2022);
      case '2015-2019':
        return vehicles.filter(v => v.year >= 2015 && v.year <= 2019);
      case '2010-2014':
        return vehicles.filter(v => v.year >= 2010 && v.year <= 2014);
      case 'before-2010':
        return vehicles.filter(v => v.year < 2010);
      default:
        return vehicles;
    }
  };
  
  // Helper function to apply mileage filter
  const applyMileageFilter = (vehicles: typeof mockVehicles, value: string) => {
    switch (value) {
      case 'under-10k-miles':
        return vehicles.filter(v => v.mileage < 10000);
      case '10k-30k-miles':
        return vehicles.filter(v => v.mileage >= 10000 && v.mileage < 30000);
      case '30k-60k-miles':
        return vehicles.filter(v => v.mileage >= 30000 && v.mileage < 60000);
      case '60k-100k-miles':
        return vehicles.filter(v => v.mileage >= 60000 && v.mileage < 100000);
      case 'over-100k-miles':
        return vehicles.filter(v => v.mileage >= 100000);
      default:
        return vehicles;
    }
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
  
  // Clear all filters
  const clearFilters = () => {
    setActiveFilters({});
    setSearchQuery('');
    setVehicles(mockVehicles);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20 md:pt-[0.2rem]">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Cars & Rentals</h1>
            <p className="text-gray-600">Find your perfect vehicle in the Northern Mariana Islands</p>
          </div>
          
          {/* Search Filters Component */}
          <SearchFilters
            title="Find Vehicles"
            placeholder="Search by make, model, or features"
            filterGroups={filterGroups}
            onSearch={handleSearch}
          />
          
          {/* Results Controls */}
          <div className="flex justify-between items-center my-6">
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
              <div className="relative inline-block" ref={dropdownRef}>
                <button 
                  className="flex items-center space-x-1 px-3 py-2 border border-gray-200 rounded-md hover:bg-gray-50"
                  onClick={() => setOpenDropdown(openDropdown === 'sort-dropdown' ? null : 'sort-dropdown')}
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
                
                {openDropdown === 'sort-dropdown' && (
                  <div 
                    className="absolute right-0 mt-2 w-64 bg-white border border-gray-200 rounded-md shadow-lg z-[9999]"
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
                            setOpenDropdown(null);
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
                )}
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
      
    </div>
  );
};

export default Vehicles;
