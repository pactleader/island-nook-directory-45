import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, Search, ChevronDown, ChevronUp, X, Utensils, Coffee, Tag, Filter } from 'lucide-react';
import { mockFoodListings } from '../utils/mockData';
import Navigation from '../components/Navigation';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';

const Food = () => {
  const [foodListings, setFoodListings] = useState(mockFoodListings || []);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('newest');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategories, setActiveSubcategories] = useState<string[]>([]);
  const [activeDiningStyles, setActiveDiningStyles] = useState<string[]>([]);
  const [activeCuisineTypes, setActiveCuisineTypes] = useState<string[]>([]);
  const [activeDietaryPreferences, setActiveDietaryPreferences] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(true);
  
  // Handle search
  const handleSearch = () => {
    // Start with all food listings
    let filteredListings = [...mockFoodListings];
    
    // Filter by search query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredListings = filteredListings.filter(listing => 
        listing.name.toLowerCase().includes(query) || 
        listing.description.toLowerCase().includes(query) ||
        listing.subcategory.toLowerCase().includes(query) ||
        (listing.cuisineTypes && listing.cuisineTypes.some(cuisine => cuisine.toLowerCase().includes(query)))
      );
    }
    
    // Filter by category if selected
    if (activeCategory) {
      filteredListings = filteredListings.filter(listing => 
        listing.category === activeCategory
      );
    }
    
    // Filter by subcategories if any are selected
    if (activeSubcategories.length > 0) {
      filteredListings = filteredListings.filter(listing => 
        activeSubcategories.includes(listing.subcategory)
      );
    }
    
    // Filter by dining styles if any are selected (only for restaurants)
    if (activeDiningStyles.length > 0) {
      filteredListings = filteredListings.filter(listing => 
        !listing.diningStyle || activeDiningStyles.includes(listing.diningStyle)
      );
    }
    
    // Filter by cuisine types if any are selected (only for restaurants)
    if (activeCuisineTypes.length > 0) {
      filteredListings = filteredListings.filter(listing => 
        !listing.cuisineTypes || 
        listing.cuisineTypes.some(cuisine => activeCuisineTypes.includes(cuisine))
      );
    }
    
    // Filter by dietary preferences if any are selected
    if (activeDietaryPreferences.length > 0) {
      filteredListings = filteredListings.filter(listing => 
        listing.dietaryPreferences && 
        listing.dietaryPreferences.some(pref => activeDietaryPreferences.includes(pref))
      );
    }
    
    // Apply sorting
    sortListings(filteredListings, sortOption);
  };
  
  // Handle sort change
  const handleSortChange = (option: string) => {
    setSortOption(option);
    sortListings(foodListings, option);
  };
  
  // Sort listings based on selected option
  const sortListings = (listingsToSort: typeof mockFoodListings, option: string) => {
    let sortedListings = [...listingsToSort];
    
    switch (option) {
      case 'name-asc':
        sortedListings.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        sortedListings.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating-desc':
        sortedListings.sort((a, b) => b.rating - a.rating);
        break;
      case 'price-asc':
        sortedListings.sort((a, b) => a.priceRange.length - b.priceRange.length);
        break;
      case 'price-desc':
        sortedListings.sort((a, b) => b.priceRange.length - a.priceRange.length);
        break;
      case 'newest':
        sortedListings.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'oldest':
        sortedListings.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
        break;
      default:
        break;
    }
    
    setFoodListings(sortedListings);
  };
  
  // Handle category selection
  const handleCategorySelect = (category: string) => {
    if (activeCategory === category) {
      // Deselect if already selected
      setActiveCategory(null);
    } else {
      // Select new category
      setActiveCategory(category);
      // Reset subcategories when category changes
      setActiveSubcategories([]);
      
      // Reset dining styles and cuisine types if not selecting restaurants
      if (category !== 'restaurant') {
        setActiveDiningStyles([]);
        setActiveCuisineTypes([]);
      }
    }
  };
  
  // Handle subcategory selection
  const handleSubcategorySelect = (subcategory: string) => {
    setActiveSubcategories(prev => {
      if (prev.includes(subcategory)) {
        // Remove if already selected
        return prev.filter(sc => sc !== subcategory);
      } else {
        // Add if not selected
        return [...prev, subcategory];
      }
    });
  };
  
  // Handle dining style selection
  const handleDiningStyleSelect = (style: string) => {
    setActiveDiningStyles(prev => {
      if (prev.includes(style)) {
        // Remove if already selected
        return prev.filter(s => s !== style);
      } else {
        // Add if not selected
        return [...prev, style];
      }
    });
  };
  
  // Handle cuisine type selection
  const handleCuisineTypeSelect = (cuisine: string) => {
    setActiveCuisineTypes(prev => {
      if (prev.includes(cuisine)) {
        // Remove if already selected
        return prev.filter(c => c !== cuisine);
      } else {
        // Add if not selected
        return [...prev, cuisine];
      }
    });
  };
  
  // Handle dietary preference selection
  const handleDietaryPrefSelect = (pref: string) => {
    setActiveDietaryPreferences(prev => {
      if (prev.includes(pref)) {
        // Remove if already selected
        return prev.filter(p => p !== pref);
      } else {
        // Add if not selected
        return [...prev, pref];
      }
    });
  };
  
  // Clear all filters
  const clearFilters = () => {
    setActiveCategory(null);
    setActiveSubcategories([]);
    setActiveDiningStyles([]);
    setActiveCuisineTypes([]);
    setActiveDietaryPreferences([]);
    setSearchQuery('');
    setFoodListings(mockFoodListings);
  };
  
  // Apply filters when they change
  useEffect(() => {
    handleSearch();
  }, [activeCategory, activeSubcategories, activeDiningStyles, activeCuisineTypes, activeDietaryPreferences, sortOption]);
  
  // Count active filters
  const countActiveFilters = () => {
    return (activeCategory ? 1 : 0) + 
           activeSubcategories.length + 
           activeDiningStyles.length + 
           activeCuisineTypes.length + 
           activeDietaryPreferences.length;
  };
  
  // Food categories data
  const foodCategories = {
    grocery: {
      label: 'Grocery Stores & Markets',
      icon: <Tag size={18} />,
      subcategories: [
        'Supermarket',
        'Local Grocery Stores',
        'Butchers & Meat Shops',
        'Wholesale Stores',
        'Farmers and Local Producers',
        'Farmers\' Markets & Co-ops',
        'Convenience Stores & Corner Shops'
      ]
    },
    cafe: {
      label: 'Drinks & Cafés',
      icon: <Coffee size={18} />,
      subcategories: [
        'Bakeries & Pastry Shops',
        'Traditional Cafés',
        'Specialty Coffee Shops',
        'Internet Cafés',
        'Tea Houses',
        'Bubble Tea & Boba Shops',
        'Juice Bars & Smoothie Shops',
        'Bars'
      ]
    },
    restaurant: {
      label: 'Restaurants',
      icon: <Utensils size={18} />,
      subcategories: ['Restaurant']
    }
  };
  
  // Dining styles
  const diningStyles = [
    'Family Friendly',
    'Fine Dining',
    'Casual Dining',
    'Fast Casual',
    'Fast Food',
    'Buffet & All-You-Can-Eat',
    'Food Trucks & Street Vendors'
  ];
  
  // Cuisine types
  const cuisineTypes = [
    'American',
    'Italian',
    'Mexican & Latin American',
    'Chinese',
    'Japanese',
    'Thai',
    'Vietnamese',
    'Korean',
    'Indian',
    'Filipino',
    'Mediterranean & Middle Eastern',
    'French',
    'African Cuisine'
  ];
  
  // Dietary preferences
  const dietaryPreferences = [
    'Vegetarian & Vegan',
    'Gluten-Free',
    'Farm-to-Table',
    'Organic & Health-Conscious'
  ];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Food & Dining</h1>
            <p className="text-gray-600">Discover local eateries, markets, and cafés throughout the Northern Mariana Islands</p>
          </div>
          
          {/* Search Area */}
          <div className="glass-card rounded-lg p-4 mb-6">
            <div className="mb-4">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search for restaurants, cafés, markets, or food type"
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
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center justify-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md transition-all-300 sm:w-auto w-full"
                >
                  <Filter size={18} className="mr-2" />
                  <span className="font-medium">Filters</span>
                  {countActiveFilters() > 0 && (
                    <span className="ml-2 bg-gray-800 text-white text-xs rounded-full px-2 py-1">
                      {countActiveFilters()}
                    </span>
                  )}
                </button>
                
                {countActiveFilters() > 0 && (
                  <button 
                    onClick={clearFilters}
                    className="flex items-center justify-center px-4 py-2 bg-gray-800 text-white hover:bg-gray-700 rounded-md transition-all-300 sm:w-auto w-full"
                  >
                    <X size={18} className="mr-2" />
                    <span>Clear</span>
                  </button>
                )}
              </div>
            </div>
            
            {/* Filters Section */}
            {showFilters && (
              <div className="border-t border-gray-200/50 pt-4 mt-2">
                {/* Category Filters */}
                <div className="mb-4">
                  <h3 className="font-medium text-gray-900 mb-2">Categories</h3>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(foodCategories).map(([key, category]) => (
                      <button
                        key={key}
                        onClick={() => handleCategorySelect(key)}
                        className={`filter-chip ${activeCategory === key ? 'active' : ''}`}
                      >
                        <span className="flex items-center">
                          {category.icon}
                          <span className="ml-1">{category.label}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Subcategory Filters - Only show for selected category */}
                {activeCategory && (
                  <div className="mb-4 border-t border-gray-200/50 pt-4">
                    <h3 className="font-medium text-gray-900 mb-2">
                      {foodCategories[activeCategory as keyof typeof foodCategories].label} Types
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {foodCategories[activeCategory as keyof typeof foodCategories].subcategories.map((subcategory, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSubcategorySelect(subcategory)}
                          className={`filter-chip ${activeSubcategories.includes(subcategory) ? 'active' : ''}`}
                        >
                          {subcategory}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Restaurant-specific filters */}
                {activeCategory === 'restaurant' && (
                  <>
                    {/* Dining Style */}
                    <div className="mb-4 border-t border-gray-200/50 pt-4">
                      <h3 className="font-medium text-gray-900 mb-2">Dining Style</h3>
                      <div className="flex flex-wrap gap-2">
                        {diningStyles.map((style, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleDiningStyleSelect(style)}
                            className={`filter-chip ${activeDiningStyles.includes(style) ? 'active' : ''}`}
                          >
                            {style}
                          </button>
                        ))}
                      </div>
                    </div>
                    
                    {/* Cuisine Types */}
                    <div className="mb-4 border-t border-gray-200/50 pt-4">
                      <h3 className="font-medium text-gray-900 mb-2">Cuisine Types</h3>
                      <div className="flex flex-wrap gap-2">
                        {cuisineTypes.map((cuisine, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleCuisineTypeSelect(cuisine)}
                            className={`filter-chip ${activeCuisineTypes.includes(cuisine) ? 'active' : ''}`}
                          >
                            {cuisine}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                
                {/* Dietary Preferences - Show for all categories */}
                <div className="mb-4 border-t border-gray-200/50 pt-4">
                  <h3 className="font-medium text-gray-900 mb-2">Dietary Preferences</h3>
                  <div className="flex flex-wrap gap-2">
                    {dietaryPreferences.map((pref, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleDietaryPrefSelect(pref)}
                        className={`filter-chip ${activeDietaryPreferences.includes(pref) ? 'active' : ''}`}
                      >
                        {pref}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Results Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <p className="text-gray-600">
                <span className="font-semibold text-gray-900">{foodListings.length}</span> listings
                {activeCategory && (
                  <span> in <span className="font-medium">
                    {foodCategories[activeCategory as keyof typeof foodCategories].label}
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
                     sortOption === 'name-asc' ? 'Name (A-Z)' : 
                     sortOption === 'name-desc' ? 'Name (Z-A)' :
                     sortOption === 'rating-desc' ? 'Highest Rated' :
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
                      { value: 'name-asc', label: 'Name (A-Z)' },
                      { value: 'name-desc', label: 'Name (Z-A)' },
                      { value: 'rating-desc', label: 'Highest Rated' },
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
          
          {/* Food Listings */}
          {foodListings.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <Utensils size={32} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No listings found</h3>
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
              {foodListings.map(food => {
                const typedFood: FoodListing = {
                  ...food,
                  category: (food.category as "grocery" | "cafe" | "restaurant"),
                  cuisineTypes: food.cuisineTypes || [],
                  diningStyle: food.diningStyle || undefined,
                  featuredDish: food.featuredDish || undefined
                };
                
                return (
                  <FoodCard key={food.id} food={typedFood} />
                );
              })}
            </div>
          )}
          
          {/* Pagination */}
          {foodListings.length > 0 && (
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

export default Food;
