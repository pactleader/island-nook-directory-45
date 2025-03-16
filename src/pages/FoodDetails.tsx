
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, Globe, Heart } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useFavorites } from '../context/FavoritesContext';

const FoodDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [food, setFood] = useState<any>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  const isFav = food ? isFavorite(food.id) : false;
  
  // For a real app, this would fetch data from an API
  useEffect(() => {
    // Simulating data fetching with mock data
    const mockFoodData = {
      id: id,
      title: "Pacific Grill Restaurant",
      description: "Casual dining restaurant serving local and international cuisine with ocean views. Our chefs prepare everything with local ingredients when possible, offering a fusion of traditional Chamorro flavors with international influences.",
      category: "restaurants",
      diningStyle: "casual-dining",
      cuisineTypes: ["american", "filipino", "japanese"],
      dietaryPreferences: ["gluten-free"],
      images: [
        "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
        "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
      ],
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
      menu: [
        {
          category: "Appetizers",
          items: [
            { name: "Coconut Shrimp", price: 14, description: "Crispy shrimp with sweet coconut breading" },
            { name: "Tuna Poke", price: 16, description: "Fresh local tuna with seaweed, soy and sesame" }
          ]
        },
        {
          category: "Main Courses",
          items: [
            { name: "Grilled Mahi Mahi", price: 28, description: "Served with mango salsa and local vegetables" },
            { name: "Island BBQ Platter", price: 32, description: "Selection of meats with traditional Chamorro BBQ sauce" }
          ]
        }
      ],
      createdAt: "2023-03-05T08:00:00Z"
    };
    
    setFood(mockFoodData);
  }, [id]);
  
  if (!food) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow flex items-center justify-center">
          <div className="animate-pulse">
            <p className="text-gray-500">Loading...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const handleFavoriteClick = () => {
    if (isFav) {
      removeFavorite(food.id, 'food');
    } else {
      addFavorite({
        id: food.id,
        type: 'food',
        title: food.title,
        image: food.images[0]
      });
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Link to="/food" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-all-300">
            <ArrowLeft size={16} className="mr-2" />
            <span>Back to Food Directory</span>
          </Link>
          
          {/* Food Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
            <div>
              <div className="flex items-center mb-2">
                <span className="chip bg-black/80 text-white mr-2">
                  {food.category === 'restaurants' ? 'Restaurant' : 
                   food.category === 'grocery-stores' ? 'Grocery & Market' : 
                   'Drinks & Café'}
                </span>
                {food.subcategory && (
                  <span className="chip bg-gray-200 text-gray-700">
                    {food.subcategory}
                  </span>
                )}
                {food.diningStyle && (
                  <span className="chip bg-gray-200 text-gray-700">
                    {food.diningStyle.replace(/-/g, ' ')}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{food.title}</h1>
              <div className="flex items-center text-gray-600">
                <MapPin size={18} className="mr-1" />
                <span>{food.address.street}, {food.address.village}, {food.address.island}</span>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex flex-col items-end">
              <div className="flex items-center mb-2">
                <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-md flex items-center mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-500 mr-1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
                  <span className="font-bold text-gray-900">
                    {food.rating}
                  </span>
                  <span className="text-gray-600 text-sm ml-1">
                    ({food.reviews} reviews)
                  </span>
                </div>
              </div>
              <button 
                onClick={handleFavoriteClick}
                className={`flex items-center px-4 py-2 rounded-md transition-all-300 ${
                  isFav 
                    ? 'bg-red-50 text-red-500 border border-red-200' 
                    : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <Heart size={18} className={`mr-2 ${isFav ? 'fill-current' : ''}`} />
                <span>{isFav ? 'Saved' : 'Save'}</span>
              </button>
            </div>
          </div>
          
          {/* Food Image Gallery */}
          <div className="mb-8">
            <div className="w-full rounded-xl overflow-hidden h-96 mb-4">
              <img 
                src={food.images[selectedImageIndex]} 
                alt={food.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {food.images.length > 1 && (
              <div className="flex overflow-x-auto gap-4 pb-2">
                {food.images.map((image: string, index: number) => (
                  <button 
                    key={index} 
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border-2 transition-all-300 ${
                      selectedImageIndex === index ? 'border-gray-900' : 'border-transparent'
                    }`}
                  >
                    <img src={image} alt={`${food.title} - Image ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Food Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Description */}
            <div className="md:col-span-2">
              <div className="glass-card rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-semibold text-gray-900 mb-4">Overview</h2>
                <p className="text-gray-700 mb-6">{food.description}</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Clock size={20} className="text-gray-700 mr-2" />
                    <div>
                      <div className="font-semibold">Hours</div>
                      <div className="text-gray-500 text-sm">{food.hours}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center">
                    <Phone size={20} className="text-gray-700 mr-2" />
                    <div>
                      <div className="font-semibold">Phone</div>
                      <div className="text-gray-500 text-sm">{food.contact.phone}</div>
                    </div>
                  </div>
                  
                  {food.contact.website && (
                    <div className="flex items-center">
                      <Globe size={20} className="text-gray-700 mr-2" />
                      <div>
                        <div className="font-semibold">Website</div>
                        <div className="text-gray-500 text-sm truncate">{food.contact.website}</div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Restaurant Specific Features */}
              {food.category === 'restaurants' && (
                <div className="glass-card rounded-xl p-6 mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cuisine & Specialties</h2>
                  
                  {/* Cuisine Types */}
                  {food.cuisineTypes && food.cuisineTypes.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-medium mb-3">Cuisine Types</h3>
                      <div className="flex flex-wrap gap-2">
                        {food.cuisineTypes.map((cuisine: string) => (
                          <span key={cuisine} className="chip bg-gray-100 text-gray-700">
                            {cuisine.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {/* Dietary Preferences */}
                  {food.dietaryPreferences && food.dietaryPreferences.length > 0 && (
                    <div>
                      <h3 className="text-lg font-medium mb-3">Dietary Options</h3>
                      <div className="flex flex-wrap gap-2">
                        {food.dietaryPreferences.map((pref: string) => (
                          <span key={pref} className="chip bg-gray-100 text-gray-700">
                            {pref.replace(/-/g, ' ')}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Sample Menu */}
              {food.menu && (
                <div className="glass-card rounded-xl p-6">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-4">Sample Menu</h2>
                  
                  {food.menu.map((section: any, index: number) => (
                    <div key={index} className="mb-6 last:mb-0">
                      <h3 className="text-lg font-medium border-b pb-2 mb-4">{section.category}</h3>
                      
                      <div className="space-y-4">
                        {section.items.map((item: any, itemIndex: number) => (
                          <div key={itemIndex} className="flex justify-between">
                            <div>
                              <h4 className="font-medium">{item.name}</h4>
                              <p className="text-gray-600 text-sm">{item.description}</p>
                            </div>
                            <div className="font-semibold ml-4">${item.price}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  
                  <p className="text-sm text-gray-500 mt-4">
                    * This is a sample menu. Actual menu and prices may vary.
                  </p>
                </div>
              )}
            </div>
            
            {/* Right Column - Contact and Map */}
            <div>
              {/* Contact Box */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Contact Information</h3>
                
                <div className="space-y-4 mb-6">
                  <div className="flex">
                    <MapPin size={20} className="text-gray-700 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Address</div>
                      <div className="text-gray-600">
                        {food.address.street}<br />
                        {food.address.village}, {food.address.island}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <Phone size={20} className="text-gray-700 mr-3 flex-shrink-0" />
                    <div>
                      <div className="font-medium">Phone</div>
                      <div className="text-gray-600">{food.contact.phone}</div>
                    </div>
                  </div>
                  
                  {food.contact.email && (
                    <div className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-700 mr-3 flex-shrink-0"><rect width="20" height="16" x="2" y="4" rx="2"></rect><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"></path></svg>
                      <div>
                        <div className="font-medium">Email</div>
                        <div className="text-gray-600">{food.contact.email}</div>
                      </div>
                    </div>
                  )}
                  
                  {food.contact.website && (
                    <div className="flex">
                      <Globe size={20} className="text-gray-700 mr-3 flex-shrink-0" />
                      <div>
                        <div className="font-medium">Website</div>
                        <div className="text-gray-600">{food.contact.website}</div>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mb-4">
                  <button className="w-full btn-primary py-3">
                    Get Directions
                  </button>
                </div>
                
                {food.category === 'restaurants' && (
                  <div>
                    <button className="w-full btn-secondary py-3">
                      Make a Reservation
                    </button>
                  </div>
                )}
              </div>
              
              {/* Hours Box */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Hours of Operation</h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday</span>
                    <span className="text-gray-600">{food.hours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday</span>
                    <span className="text-gray-600">{food.hours}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday</span>
                    <span className="text-gray-600">{food.hours}</span>
                  </div>
                </div>
              </div>
              
              {/* Map Preview */}
              <div className="glass-card rounded-xl overflow-hidden">
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="text-center px-4">
                    <MapPin size={28} className="mx-auto mb-2 text-gray-600" />
                    <p className="text-gray-600">Map view will be available in the full version</p>
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-1">Location</h3>
                  <p className="text-gray-600 text-sm mb-2">{food.address.street}, {food.address.village}</p>
                  <p className="text-gray-600 text-sm">{food.address.island}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FoodDetails;
