import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, Search, ChevronDown, ChevronUp, X, Building } from 'lucide-react';
import { mockBusinesses, businessCategories } from '../utils/mockData';
import Navigation from '../components/Navigation';
import BusinessCard from '../components/BusinessCard';
import Footer from '../components/Footer';

const Businesses = () => {
  const [businesses, setBusinesses] = useState(mockBusinesses);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('newest');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategories, setActiveSubcategories] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(true);
  
  // Handle search
  const handleSearch = () => {
    // Start with all businesses
    let filteredBusinesses = [...mockBusinesses];
    
    // Filter by search query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredBusinesses = filteredBusinesses.filter(business => 
        business.name.toLowerCase().includes(query) || 
        business.description.toLowerCase().includes(query) ||
        business.subcategory.toLowerCase().includes(query)
      );
    }
    
    // Filter by category if selected
    if (activeCategory) {
      filteredBusinesses = filteredBusinesses.filter(business => 
        business.category === activeCategory
      );
      
      // Further filter by subcategories if any are selected
      if (activeSubcategories.length > 0) {
        filteredBusinesses = filteredBusinesses.filter(business => 
          activeSubcategories.includes(business.subcategory)
        );
      }
    }
    
    // Apply sorting
    sortBusinesses(filteredBusinesses, sortOption);
  };
  
  // Handle sort change
  const handleSortChange = (option: string) => {
    setSortOption(option);
    sortBusinesses(businesses, option);
  };
  
  // Sort businesses based on the selected option
  const sortBusinesses = (businessesToSort: typeof mockBusinesses, option: string) => {
    let sortedBusinesses = [...businessesToSort];
    
    switch (option) {
      case 'name-asc':
        sortedBusinesses.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedBusinesses.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-desc':
        sortedBusinesses.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        sortedBusinesses.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        sortedBusinesses.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      default:
        break;
    }
    
    setBusinesses(sortedBusinesses);
  };
  
  // Handle category selection
  const handleCategorySelect = (categoryKey: string) => {
    if (activeCategory === categoryKey) {
      // Deselect if already selected
      setActiveCategory(null);
      setActiveSubcategories([]);
    } else {
      // Select new category
      setActiveCategory(categoryKey);
      setActiveSubcategories([]);
    }
  };
  
  // Handle subcategory selection
  const handleSubcategorySelect = (subcategoryValue: string) => {
    setActiveSubcategories(prev => {
      if (prev.includes(subcategoryValue)) {
        // Remove if already selected
        return prev.filter(sc => sc !== subcategoryValue);
      } else {
        // Add if not selected
        return [...prev, subcategoryValue];
      }
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setActiveCategory(null);
    setActiveSubcategories([]);
    setSearchQuery('');
    setBusinesses(mockBusinesses);
  };
  
  // Apply filters when they change
  useEffect(() => {
    handleSearch();
  }, [activeCategory, activeSubcategories, sortOption]);
  
  // Format category or subcategory name for display
  const formatCategoryName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Define featured categories (Healthcare, Religious, Tour Guides)
  const featuredCategories = ['healthcare', 'religious', 'tour-guides'];
  
  // Other categories excluding featured categories
  const otherCategories = Object.keys(businessCategories).filter(
    key => !featuredCategories.includes(key)
  );
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Business Directory</h1>
            <p className="text-gray-600">Find local businesses and services throughout the Northern Mariana Islands</p>
          </div>
          
          {/* Search Area */}
          <div className="glass-card rounded-lg p-4 mb-6">
            <div className="mb-4">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search for businesses, services, or keywords"
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
                
                {(activeCategory || activeSubcategories.length > 0 || searchQuery) && (
                  <button 
                    onClick={clearFilters}
                    className="px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded-md transition-all-300"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
            
            {/* Toggle for Category Selection */}
            <div className="border-t border-gray-200 pt-3">
              <button 
                onClick={() => setShowCategories(!showCategories)}
                className="flex items-center text-gray-700 hover:text-gray-900"
              >
                <span className="font-medium">Categories</span>
                {showCategories ? 
                  <ChevronUp size={18} className="ml-1" /> : 
                  <ChevronDown size={18} className="ml-1" />
                }
              </button>
            </div>
            
            {/* Category and Subcategory Filters - Always Visible */}
            {showCategories && (
              <div className="mt-3">
                <h3 className="text-lg font-semibold mb-3">Browse by Category</h3>
                
                {/* Featured Categories Section */}
                <div className="mb-4">
                  <h4 className="text-sm text-gray-500 mb-2">Featured Categories</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {featuredCategories.map((key) => (
                      <button
                        key={key}
                        onClick={() => handleCategorySelect(key)}
                        className={`filter-chip ${activeCategory === key ? 'active' : ''}`}
                      >
                        {businessCategories[key as keyof typeof businessCategories].label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Other Categories Section */}
                <div>
                  <h4 className="text-sm text-gray-500 mb-2">Other Categories</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {otherCategories.map((key) => (
                      <button
                        key={key}
                        onClick={() => handleCategorySelect(key)}
                        className={`filter-chip ${activeCategory === key ? 'active' : ''}`}
                      >
                        {key === 'shopping-and-stores' ? 'Shopping & Stores' : businessCategories[key as keyof typeof businessCategories].label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Subcategories (only shown when a category is selected) */}
                {activeCategory && (
                  <div className="mt-4">
                    <h3 className="text-md font-medium mb-2">
                      {activeCategory === 'shopping-and-stores' ? 'Shopping & Stores' : 
                       businessCategories[activeCategory as keyof typeof businessCategories].label} Subcategories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {businessCategories[activeCategory as keyof typeof businessCategories].subcategories.map((subcategory, index) => (
                        <button
                          key={index}
                          onClick={() => handleSubcategorySelect(subcategory.value)}
                          className={`filter-chip ${activeSubcategories.includes(subcategory.value) ? 'active' : ''}`}
                        >
                          {subcategory.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Results Controls */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{businesses.length}</span> businesses
                {activeCategory && (
                  <span> in <span className="font-medium">
                    {activeCategory === 'shopping-and-stores' ? 'Shopping & Stores' : 
                     businessCategories[activeCategory as keyof typeof businessCategories].label}
                  </span></span>
                )}
                {activeSubcategories.length > 0 && (
                  <span className="text-sm text-gray-500"> with {activeSubcategories.length} selected subcategories</span>
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
                     sortOption === 'name-asc' ? 'Name (A-Z)' : 
                     sortOption === 'name-desc' ? 'Name (Z-A)' :
                     sortOption === 'rating-desc' ? 'Highest Rated' : 'Newest'}
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
                      { value: 'name-asc', label: 'Name (A-Z)' },
                      { value: 'name-desc', label: 'Name (Z-A)' },
                      { value: 'rating-desc', label: 'Highest Rated' }
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
          
          {/* Business Listings */}
          {businesses.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Building size={32} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No businesses found</h3>
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
              {businesses.map(business => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {businesses.length > 0 && (
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

export default Businesses;
