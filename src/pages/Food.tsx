
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Grid, List, Search, ChevronDown, ChevronUp, X, UtensilsCrossed } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FavoriteButton from '../components/FavoriteButton';

// Mock food categories data based on the requirements
const foodCategories = {
  'grocery-stores': {
    label: 'Grocery Stores & Markets',
    subcategories: [
      { value: 'supermarket', label: 'Supermarket' },
      { value: 'local-grocery', label: 'Local Grocery Stores' },
      { value: 'butchers', label: 'Butchers & Meat Shops' },
      { value: 'wholesale', label: 'Wholesale Stores' },
      { value: 'local-producers', label: 'Farmers and Local Producers' },
      { value: 'farmers-markets', label: 'Farmers\' Markets & Co-ops' },
      { value: 'convenience-stores', label: 'Convenience Stores & Corner Shops' },
    ]
  },
  'drinks-cafes': {
    label: 'Drinks & Cafés',
    subcategories: [
      { value: 'bakeries', label: 'Bakeries & Pastry Shops' },
      { value: 'traditional-cafes', label: 'Traditional Cafés' },
      { value: 'specialty-coffee', label: 'Specialty Coffee Shops' },
      { value: 'internet-cafes', label: 'Internet Cafés' },
      { value: 'tea-houses', label: 'Tea Houses' },
      { value: 'bubble-tea', label: 'Bubble Tea & Boba Shops' },
      { value: 'juice-bars', label: 'Juice Bars & Smoothie Shops' },
      { value: 'bars', label: 'Bars' },
    ]
  },
  'restaurants': {
    label: 'Restaurants',
    subcategories: []
  }
};

// Dining styles
const diningStyles = [
  { value: 'family-friendly', label: 'Family Friendly' },
  { value: 'fine-dining', label: 'Fine Dining (Upscale, Chef-Driven, Michelin-Starred)' },
  { value: 'casual-dining', label: 'Casual Dining (Table Service, Mid-Range)' },
  { value: 'fast-casual', label: 'Fast Casual (Counter Service, Higher Quality than Fast Food)' },
  { value: 'fast-food', label: 'Fast Food (McDonald\'s, Burger King, Taco Bell, etc.)' },
  { value: 'buffet', label: 'Buffet & All-You-Can-Eat' },
  { value: 'food-trucks', label: 'Food Trucks & Street Vendors' },
];

// Cuisine types
const cuisineTypes = [
  { value: 'american', label: 'American (BBQ, Burgers, Diners)' },
  { value: 'italian', label: 'Italian (Pasta, Pizza, Trattorias)' },
  { value: 'mexican-latin', label: 'Mexican & Latin American (Tacos, Tex-Mex, Peruvian, Brazilian)' },
  { value: 'chinese', label: 'Chinese' },
  { value: 'japanese', label: 'Japanese (Sushi, Ramen, Izakayas)' },
  { value: 'thai', label: 'Thai' },
  { value: 'vietnamese', label: 'Vietnamese (Pho, Banh Mi)' },
  { value: 'korean', label: 'Korean (BBQ, Street Food)' },
  { value: 'indian', label: 'Indian' },
  { value: 'filipino', label: 'Filipino' },
  { value: 'mediterranean', label: 'Mediterranean & Middle Eastern (Greek, Turkish, Lebanese)' },
  { value: 'french', label: 'French (Bistros, Patisseries)' },
  { value: 'african', label: 'African Cuisine (Ethiopian, Moroccan, West African)' },
];

// Dietary preferences
const dietaryPreferences = [
  { value: 'vegetarian-vegan', label: 'Vegetarian & Vegan' },
  { value: 'gluten-free', label: 'Gluten-Free' },
  { value: 'farm-to-table', label: 'Farm-to-Table' },
  { value: 'organic', label: 'Organic & Health-Conscious' },
];

// Mock food data
const mockFoodListings = [
  {
    id: "food1",
    title: "Island Fresh Market",
    description: "A full-service supermarket with fresh produce, bakery, and deli.",
    category: "grocery-stores",
    subcategory: "supermarket",
    images: ["https://images.unsplash.com/photo-1578916171728-46686eac8d58?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"],
    address: {
      street: "123 Main St",
      village: "Garapan",
      island: "Saipan"
    },
    contact: {
      phone: "670-555-1234",
      email: "info@islandfresh.com",
      website: "www.islandfresh.com"
    },
    hours: "8:00 AM - 9:00 PM",
    rating: 4.5,
    reviews: 120,
    createdAt: "2023-01-15T08:00:00Z"
  },
  {
    id: "food2",
    title: "Marianas Coffee House",
    description: "A cozy café serving specialty coffee, pastries, and light meals.",
    category: "drinks-cafes",
    subcategory: "specialty-coffee",
    images: ["https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"],
    address: {
      street: "45 Beach Rd",
      village: "Susupe",
      island: "Saipan"
    },
    contact: {
      phone: "670-555-2345",
      email: "info@marianascoffee.com",
      website: "www.marianascoffee.com"
    },
    hours: "6:00 AM - 7:00 PM",
    rating: 4.8,
    reviews: 85,
    createdAt: "2023-02-10T08:00:00Z"
  },
  {
    id: "food3",
    title: "Pacific Grill Restaurant",
    description: "Casual dining restaurant serving local and international cuisine with ocean views.",
    category: "restaurants",
    diningStyle: "casual-dining",
    cuisineTypes: ["american", "filipino", "japanese"],
    dietaryPreferences: ["gluten-free"],
    images: ["https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"],
    address: {
      street: "78 Beach Road",
      village: "Garapan",
      island: "Saipan"
    },
    contact: {
      phone: "670-555-3456",
      email: "reservations@pacificgrill.com",
      website: "www.pacificgrill.com"
    },
    hours: "11:00 AM - 10:00 PM",
    rating: 4.3,
    reviews: 230,
    createdAt: "2023-03-05T08:00:00Z"
  },
  {
    id: "food4",
    title: "Chamorro Village Butchery",
    description: "Traditional butcher shop offering fresh local and imported meats.",
    category: "grocery-stores",
    subcategory: "butchers",
    images: ["https://images.unsplash.com/photo-1545155685-8debf39631ca?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"],
    address: {
      street: "12 Village Lane",
      village: "San Vicente",
      island: "Saipan"
    },
    contact: {
      phone: "670-555-4567",
      email: "info@chamorrobutchery.com",
      website: "www.chamorrobutchery.com"
    },
    hours: "8:00 AM - 6:00 PM",
    rating: 4.6,
    reviews: 48,
    createdAt: "2023-01-25T08:00:00Z"
  },
  {
    id: "food5",
    title: "Island Bubble Tea",
    description: "Specialty shop offering a variety of bubble tea, smoothies, and snacks.",
    category: "drinks-cafes",
    subcategory: "bubble-tea",
    images: ["https://images.unsplash.com/photo-1558857563-c0c6ec258496?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"],
    address: {
      street: "34 Palm St",
      village: "Chalan Kanoa",
      island: "Saipan"
    },
    contact: {
      phone: "670-555-5678",
      email: "info@islandbubbletea.com",
      website: "www.islandbubbletea.com"
    },
    hours: "10:00 AM - 8:00 PM",
    rating: 4.7,
    reviews: 110,
    createdAt: "2023-02-20T08:00:00Z"
  },
  {
    id: "food6",
    title: "Tasi Farm-to-Table Restaurant",
    description: "Upscale restaurant focusing on locally sourced ingredients and seasonal menus.",
    category: "restaurants",
    diningStyle: "fine-dining",
    cuisineTypes: ["american", "farm-to-table"],
    dietaryPreferences: ["vegetarian-vegan", "farm-to-table", "organic"],
    images: ["https://images.unsplash.com/photo-1515669097368-22e68427d265?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"],
    address: {
      street: "56 Sunset Drive",
      village: "Marpi",
      island: "Saipan"
    },
    contact: {
      phone: "670-555-6789",
      email: "dining@tasirestaurant.com",
      website: "www.tasirestaurant.com"
    },
    hours: "5:00 PM - 10:00 PM",
    rating: 4.9,
    reviews: 95,
    createdAt: "2023-03-15T08:00:00Z"
  },
  {
    id: "food7",
    title: "Island Farmers' Market",
    description: "Weekly market featuring local farmers, producers, and artisanal foods.",
    category: "grocery-stores",
    subcategory: "farmers-markets",
    images: ["https://images.unsplash.com/photo-1488459716781-31db52582fe9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"],
    address: {
      street: "Community Center Park",
      village: "Kagman",
      island: "Saipan"
    },
    contact: {
      phone: "670-555-7890",
      email: "info@islandfarmersmarket.org",
      website: "www.islandfarmersmarket.org"
    },
    hours: "Saturday 7:00 AM - 12:00 PM",
    rating: 4.8,
    reviews: 65,
    createdAt: "2023-01-30T08:00:00Z"
  },
  {
    id: "food8",
    title: "Marianas Food Truck Park",
    description: "Collection of food trucks offering diverse cuisine options in one convenient location.",
    category: "restaurants",
    diningStyle: "food-trucks",
    cuisineTypes: ["mexican-latin", "filipino", "american"],
    dietaryPreferences: [],
    images: ["https://images.unsplash.com/photo-1565123409695-7b5ef63a2efb?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"],
    address: {
      street: "Beach Road Parking Lot",
      village: "Garapan",
      island: "Saipan"
    },
    contact: {
      phone: "670-555-8901",
      email: "info@marianasfoodtrucks.com",
      website: "www.marianasfoodtrucks.com"
    },
    hours: "11:00 AM - 9:00 PM",
    rating: 4.5,
    reviews: 180,
    createdAt: "2023-02-05T08:00:00Z"
  },
];

// Food listing card component
const FoodCard = ({ food }: { food: any }) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  // Format category name for display
  const formatCategory = (category: string) => {
    if (foodCategories[category as keyof typeof foodCategories]) {
      return foodCategories[category as keyof typeof foodCategories].label;
    }
    return category
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };
  
  // Get subcategory label
  const getSubcategoryLabel = (category: string, subcategory: string) => {
    if (foodCategories[category as keyof typeof foodCategories]) {
      const subcat = foodCategories[category as keyof typeof foodCategories].subcategories.find(
        s => s.value === subcategory
      );
      return subcat ? subcat.label : subcategory;
    }
    return subcategory;
  };
  
  return (
    <div className="glass-card rounded-xl overflow-hidden hover-lift">
      <Link to={`/food/${food.id}`} className="block">
        {/* Image Container */}
        <div className="relative h-48 overflow-hidden">
          {/* Blurred Image Placeholder */}
          <div
            className="absolute inset-0 bg-cover bg-center blur-md scale-105"
            style={{ backgroundImage: `url(${food.images[0]})` }}
          ></div>
          
          {/* Actual Image */}
          <img
            src={food.images[0]}
            alt={food.title}
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-500 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
          />
          
          {/* Category Label */}
          <div className="absolute top-4 left-4 z-10">
            <span className="chip bg-gray-900/80 text-white backdrop-blur-sm">
              {formatCategory(food.category)}
            </span>
          </div>
          
          {/* Favorite Button */}
          <div className="absolute top-4 right-4 z-10">
            <FavoriteButton
              id={food.id}
              type="food"
              title={food.title}
              image={food.images[0]}
            />
          </div>
          
          {/* Rating */}
          <div className="absolute bottom-4 right-4 z-10">
            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500 mr-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
              <span className="font-bold text-gray-900">
                {food.rating}
              </span>
              <span className="text-gray-600 text-xs ml-1">
                ({food.reviews})
              </span>
            </div>
          </div>
        </div>
        
        {/* Content */}
        <div className="p-5">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-1">
            {food.title}
          </h3>
          
          <div className="flex items-center text-gray-600 mb-1">
            <UtensilsCrossed size={16} />
            <span className="ml-1 text-sm">
              {food.address.village}, {food.address.island}
            </span>
          </div>
          
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {food.description}
          </p>
          
          {/* Subcategory/Features */}
          <div className="flex flex-wrap gap-2 mb-2">
            {food.subcategory && (
              <span className="chip bg-gray-100 text-gray-700">
                {getSubcategoryLabel(food.category, food.subcategory)}
              </span>
            )}
            
            {food.diningStyle && (
              <span className="chip bg-gray-100 text-gray-700">
                {diningStyles.find(s => s.value === food.diningStyle)?.label || food.diningStyle}
              </span>
            )}
            
            {food.cuisineTypes && food.cuisineTypes.slice(0, 1).map((cuisine: string) => (
              <span key={cuisine} className="chip bg-gray-100 text-gray-700">
                {cuisineTypes.find(c => c.value === cuisine)?.label.split(' ')[0] || cuisine}
              </span>
            ))}
            
            {food.dietaryPreferences && food.dietaryPreferences.slice(0, 1).map((pref: string) => (
              <span key={pref} className="chip bg-gray-100 text-gray-700">
                {dietaryPreferences.find(p => p.value === pref)?.label || pref}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </div>
  );
};

const Food = () => {
  const [foodListings, setFoodListings] = useState(mockFoodListings);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sortOption, setSortOption] = useState('newest');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [activeSubcategories, setActiveSubcategories] = useState<string[]>([]);
  const [activeDiningStyles, setActiveDiningStyles] = useState<string[]>([]);
  const [activeCuisineTypes, setActiveCuisineTypes] = useState<string[]>([]);
  const [activeDietaryPreferences, setActiveDietaryPreferences] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategories, setShowCategories] = useState(true);
  const [showFilters, setShowFilters] = useState(true);
  
  // Handle search
  const handleSearch = () => {
    // Start with all food listings
    let filteredListings = [...mockFoodListings];
    
    // Filter by search query if provided
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filteredListings = filteredListings.filter(food => 
        food.title.toLowerCase().includes(query) || 
        food.description.toLowerCase().includes(query)
      );
    }
    
    // Filter by category if selected
    if (activeCategory) {
      filteredListings = filteredListings.filter(food => 
        food.category === activeCategory
      );
      
      // Further filter by subcategories if any are selected
      if (activeSubcategories.length > 0) {
        filteredListings = filteredListings.filter(food => 
          food.subcategory && activeSubcategories.includes(food.subcategory)
        );
      }
    }
    
    // Filter by dining styles if any are selected
    if (activeDiningStyles.length > 0) {
      filteredListings = filteredListings.filter(food => 
        food.diningStyle && activeDiningStyles.includes(food.diningStyle)
      );
    }
    
    // Filter by cuisine types if any are selected
    if (activeCuisineTypes.length > 0) {
      filteredListings = filteredListings.filter(food => 
        food.cuisineTypes && food.cuisineTypes.some((cuisine: string) => 
          activeCuisineTypes.includes(cuisine)
        )
      );
    }
    
    // Filter by dietary preferences if any are selected
    if (activeDietaryPreferences.length > 0) {
      filteredListings = filteredListings.filter(food => 
        food.dietaryPreferences && food.dietaryPreferences.some((pref: string) => 
          activeDietaryPreferences.includes(pref)
        )
      );
    }
    
    // Apply sorting
    sortFoodListings(filteredListings, sortOption);
  };
  
  // Handle sort change
  const handleSortChange = (option: string) => {
    setSortOption(option);
    sortFoodListings(foodListings, option);
  };
  
  // Sort food listings based on the selected option
  const sortFoodListings = (listingsToSort: typeof mockFoodListings, option: string) => {
    let sortedListings = [...listingsToSort];
    
    switch (option) {
      case 'name-asc':
        sortedListings.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        sortedListings.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case 'rating-desc':
        sortedListings.sort((a, b) => b.rating - a.rating);
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
  
  // Handle dining style selection
  const handleDiningStyleSelect = (styleValue: string) => {
    setActiveDiningStyles(prev => {
      if (prev.includes(styleValue)) {
        // Remove if already selected
        return prev.filter(s => s !== styleValue);
      } else {
        // Add if not selected
        return [...prev, styleValue];
      }
    });
  };
  
  // Handle cuisine type selection
  const handleCuisineTypeSelect = (cuisineValue: string) => {
    setActiveCuisineTypes(prev => {
      if (prev.includes(cuisineValue)) {
        // Remove if already selected
        return prev.filter(c => c !== cuisineValue);
      } else {
        // Add if not selected
        return [...prev, cuisineValue];
      }
    });
  };
  
  // Handle dietary preference selection
  const handleDietaryPreferenceSelect = (prefValue: string) => {
    setActiveDietaryPreferences(prev => {
      if (prev.includes(prefValue)) {
        // Remove if already selected
        return prev.filter(p => p !== prefValue);
      } else {
        // Add if not selected
        return [...prev, prefValue];
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
  }, [
    activeCategory, 
    activeSubcategories, 
    activeDiningStyles, 
    activeCuisineTypes, 
    activeDietaryPreferences, 
    sortOption
  ]);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-4">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Food & Dining Directory</h1>
            <p className="text-gray-600">Find the best food options throughout the Northern Mariana Islands</p>
          </div>
          
          {/* Search Area */}
          <div className="glass-card rounded-lg p-4 mb-6">
            <div className="mb-4">
              <div className="flex gap-2">
                <div className="relative flex-grow">
                  <input
                    type="text"
                    placeholder="Search for restaurants, cafés, markets..."
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
                
                {(activeCategory || activeSubcategories.length > 0 || activeDiningStyles.length > 0 || 
                  activeCuisineTypes.length > 0 || activeDietaryPreferences.length > 0 || searchQuery) && (
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
            
            {/* Category and Subcategory Filters */}
            {showCategories && (
              <div className="mt-3">
                <h3 className="text-lg font-semibold mb-3">Browse by Category</h3>
                
                <div className="mb-4">
                  <h4 className="text-sm text-gray-500 mb-2">Main Categories</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {Object.keys(foodCategories).map((key) => (
                      <button
                        key={key}
                        onClick={() => handleCategorySelect(key)}
                        className={`filter-chip ${activeCategory === key ? 'active' : ''}`}
                      >
                        {foodCategories[key as keyof typeof foodCategories].label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Subcategories (only shown when a category is selected) */}
                {activeCategory && foodCategories[activeCategory as keyof typeof foodCategories] && 
                 foodCategories[activeCategory as keyof typeof foodCategories].subcategories.length > 0 && (
                  <div className="mt-4">
                    <h3 className="text-md font-medium mb-2">
                      {foodCategories[activeCategory as keyof typeof foodCategories].label} Subcategories
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {foodCategories[activeCategory as keyof typeof foodCategories].subcategories.map((subcategory, index) => (
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
            
            {/* Toggle for Additional Filters */}
            {activeCategory === 'restaurants' && (
              <div className="border-t border-gray-200 pt-3 mt-3">
                <button 
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center text-gray-700 hover:text-gray-900"
                >
                  <span className="font-medium">Restaurant Filters</span>
                  {showFilters ? 
                    <ChevronUp size={18} className="ml-1" /> : 
                    <ChevronDown size={18} className="ml-1" />
                  }
                </button>
              </div>
            )}
            
            {/* Restaurant Specific Filters */}
            {activeCategory === 'restaurants' && showFilters && (
              <div className="mt-3">
                {/* Dining Styles */}
                <div className="mb-4">
                  <h4 className="text-md font-medium mb-2">Dining Style</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {diningStyles.map((style, index) => (
                      <button
                        key={index}
                        onClick={() => handleDiningStyleSelect(style.value)}
                        className={`filter-chip ${activeDiningStyles.includes(style.value) ? 'active' : ''}`}
                      >
                        {style.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Cuisine Types */}
                <div className="mb-4">
                  <h4 className="text-md font-medium mb-2">Cuisine Types</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {cuisineTypes.map((cuisine, index) => (
                      <button
                        key={index}
                        onClick={() => handleCuisineTypeSelect(cuisine.value)}
                        className={`filter-chip ${activeCuisineTypes.includes(cuisine.value) ? 'active' : ''}`}
                      >
                        {cuisine.label}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Dietary Preferences */}
                <div className="mb-4">
                  <h4 className="text-md font-medium mb-2">Dietary Preferences</h4>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dietaryPreferences.map((pref, index) => (
                      <button
                        key={index}
                        onClick={() => handleDietaryPreferenceSelect(pref.value)}
                        className={`filter-chip ${activeDietaryPreferences.includes(pref.value) ? 'active' : ''}`}
                      >
                        {pref.label}
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
                <span className="font-semibold text-gray-900">{foodListings.length}</span> listings
                {activeCategory && (
                  <span> in <span className="font-medium">
                    {foodCategories[activeCategory as keyof typeof foodCategories]?.label || activeCategory}
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
          
          {/* Food Listings */}
          {foodListings.length === 0 ? (
            <div className="bg-gray-50 rounded-lg p-8 text-center">
              <UtensilsCrossed size={32} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No food listings found</h3>
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
              {foodListings.map(food => (
                <FoodCard key={food.id} food={food} />
              ))}
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
