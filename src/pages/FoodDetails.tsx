import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Globe, 
  Mail, 
  Clock, 
  Star, 
  Share2, 
  Calendar,
  Tag,
  Utensils, 
  Coffee,
  Pizza
} from 'lucide-react';
import { mockFoodListings, FoodListing } from '../utils/mockData';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import FavoriteButton from '../components/FavoriteButton';

const FoodDetails = () => {
  const { id } = useParams<{ id: string }>();
  const food = mockFoodListings.find(f => f.id === id);
  
  if (!food) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow pt-24 pb-16">
          <div className="container mx-auto px-4">
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Listing Not Found</h2>
              <p className="text-gray-600 mb-6">The food listing you're looking for doesn't exist or has been removed.</p>
              <Link to="/food" className="btn-primary">
                Back to Food Directory
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const getCategoryIcon = () => {
    switch (food.category) {
      case 'grocery':
        return <Tag className="w-5 h-5" />;
      case 'cafe':
        return <Coffee className="w-5 h-5" />;
      case 'restaurant':
        return <Utensils className="w-5 h-5" />;
      default:
        return <Pizza className="w-5 h-5" />;
    }
  };
  
  const formatCategory = () => {
    switch (food.category) {
      case 'grocery':
        return 'Grocery & Market';
      case 'cafe':
        return 'Drinks & Café';
      case 'restaurant':
        return 'Restaurant';
      default:
        return food.category;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20 pb-16">
        {/* Hero Image */}
        <div className="relative h-64 md:h-80 lg:h-96 overflow-hidden">
          <img
            src={food.imageUrl || "/placeholder.svg"}
            alt={food.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-6">
            <div className="container mx-auto">
              <div className="flex justify-between items-end">
                <div>
                  <div className="flex items-center space-x-2 text-white mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900/70 text-white">
                      {getCategoryIcon()}
                      <span className="ml-1">{formatCategory()}</span>
                    </span>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-900/70 text-white">
                      {food.subcategory}
                    </span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white">{food.name}</h1>
                </div>
                
                <div className="flex space-x-2">
                  <FavoriteButton 
                    id={food.id} 
                    type="food" 
                    size={24}
                    className="bg-white rounded-full p-2 shadow-md" 
                  />
                  <button className="bg-white rounded-full p-2 shadow-md">
                    <Share2 size={24} className="text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Main Info */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="p-6">
                  <div className="flex items-center mb-6">
                    <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full mr-4">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="font-semibold">{food?.rating.toFixed(1)}</span>
                    </div>
                    
                    <div className="text-gray-600">
                      <span className="font-medium">{food?.priceRange}</span>
                      <span className="mx-2">•</span>
                      {food?.diningStyle && (
                        <>
                          <span>{food.diningStyle}</span>
                          <span className="mx-2">•</span>
                        </>
                      )}
                      <span>{food?.subcategory}</span>
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-3">About</h2>
                    <p className="text-gray-700">{food?.description}</p>
                  </div>
                  
                  {food?.cuisineTypes && food.cuisineTypes.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Cuisine Types</h3>
                      <div className="flex flex-wrap gap-2">
                        {food.cuisineTypes.map((cuisine, idx) => (
                          <span 
                            key={idx} 
                            className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700"
                          >
                            {cuisine}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {food?.dietaryPreferences && food.dietaryPreferences.length > 0 && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Dietary Options</h3>
                      <div className="flex flex-wrap gap-2">
                        {food.dietaryPreferences.map((pref, idx) => (
                          <span 
                            key={idx} 
                            className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-medium text-gray-700"
                          >
                            {pref}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  {food?.featuredDish && (
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Featured Dish</h3>
                      <p className="text-gray-700">{food.featuredDish}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div>
              {/* Contact Info */}
              <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <MapPin className="text-gray-500 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Location</h3>
                        <p className="text-gray-600">{food.location.address}</p>
                        <p className="text-gray-600">{food.location.village}</p>
                      </div>
                    </div>
                    
                    {food.contact.phone && (
                      <div className="flex items-start">
                        <Phone className="text-gray-500 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-gray-900">Phone</h3>
                          <p className="text-gray-600">{food.contact.phone}</p>
                        </div>
                      </div>
                    )}
                    
                    {food.contact.email && (
                      <div className="flex items-start">
                        <Mail className="text-gray-500 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-gray-900">Email</h3>
                          <p className="text-gray-600">{food.contact.email}</p>
                        </div>
                      </div>
                    )}
                    
                    {food.contact.website && (
                      <div className="flex items-start">
                        <Globe className="text-gray-500 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                        <div>
                          <h3 className="font-medium text-gray-900">Website</h3>
                          <a 
                            href={food.contact.website} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline"
                          >
                            {food.contact.website.replace(/^https?:\/\//, '')}
                          </a>
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-start">
                      <Clock className="text-gray-500 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Hours</h3>
                        <p className="text-gray-600">
                          {food.openingHours.days}: {food.openingHours.open} - {food.openingHours.close}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Calendar className="text-gray-500 w-5 h-5 mt-0.5 mr-3 flex-shrink-0" />
                      <div>
                        <h3 className="font-medium text-gray-900">Listed Since</h3>
                        <p className="text-gray-600">
                          {new Date(food.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                    </div>
                  </div>
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
