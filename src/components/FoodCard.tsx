
import { Link } from 'react-router-dom';
import { Coffee, Pizza, Utensils, MapPin, Star, Clock, Tag } from 'lucide-react';
import { cn } from '@/lib/utils';
import FavoriteButton from './FavoriteButton';

// Types for food listings
export interface FoodListing {
  id: string;
  name: string;
  description: string;
  category: 'grocery' | 'cafe' | 'restaurant';
  subcategory: string;
  diningStyle?: string;
  cuisineTypes?: string[];
  dietaryPreferences?: string[];
  priceRange: '$' | '$$' | '$$$' | '$$$$';
  rating: number;
  imageUrl: string;
  location: {
    address: string;
    village: string;
  };
  openingHours: {
    open: string;
    close: string;
    days: string;
  };
  contact: {
    phone?: string;
    email?: string;
    website?: string;
  };
  createdAt: string;
  featuredDish?: string;
}

interface FoodCardProps {
  food: FoodListing;
  className?: string;
  horizontal?: boolean;
}

const FoodCard = ({ food, className, horizontal = false }: FoodCardProps) => {
  // Helper to get the right icon for the category
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'grocery':
        return <Tag className="w-4 h-4" />;
      case 'cafe':
        return <Coffee className="w-4 h-4" />;
      case 'restaurant':
        return <Utensils className="w-4 h-4" />;
      default:
        return <Pizza className="w-4 h-4" />;
    }
  };

  // Format category for display
  const formatCategory = (category: string) => {
    switch (category) {
      case 'grocery':
        return 'Grocery & Market';
      case 'cafe':
        return 'Café & Drinks';
      case 'restaurant':
        return 'Restaurant';
      default:
        return category;
    }
  };

  // Get label for cuisine types (if applicable)
  const getCuisineLabel = () => {
    if (!food.cuisineTypes || food.cuisineTypes.length === 0) return '';
    return food.cuisineTypes.join(', ');
  };

  return (
    <div className={cn(
      "rounded-lg border border-gray-200/50 overflow-hidden bg-white shadow-sm hover:shadow-md transition-all duration-300",
      horizontal ? "flex flex-col md:flex-row" : "flex flex-col",
      className
    )}>
      <Link
        to={`/food/${food.id}`}
        className={cn(
          "overflow-hidden",
          horizontal ? "md:w-1/3 relative" : "relative"
        )}
      >
        <img
          src={food.imageUrl || "/placeholder.svg"}
          alt={food.name}
          className={cn(
            "object-cover w-full transition-transform duration-500 hover:scale-105",
            horizontal ? "h-48 md:h-full" : "h-48"
          )}
        />
        <div className="absolute top-2 right-2">
          <FavoriteButton 
            id={food.id} 
            type="food" 
            className="bg-white/80 rounded-full p-1 shadow-sm" 
          />
        </div>
      </Link>

      <div className={cn(
        "flex flex-col p-4 flex-grow",
        horizontal && "md:w-2/3"
      )}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <Link to={`/food/${food.id}`} className="hover:underline">
              <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{food.name}</h3>
            </Link>

            <div className="flex items-center text-sm text-gray-500 mt-1">
              <div className="flex items-center">
                {getCategoryIcon(food.category)}
                <span className="ml-1">{formatCategory(food.category)}</span>
              </div>
              <span className="mx-2">•</span>
              <div className="flex items-center">
                <span>{food.subcategory}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center bg-gray-100 rounded-md px-2 py-1">
            <Star className="h-3.5 w-3.5 text-yellow-500 mr-1" />
            <span className="text-sm font-medium">{food.rating.toFixed(1)}</span>
          </div>
        </div>

        <p className="text-gray-600 text-sm line-clamp-2 mb-3">{food.description}</p>

        <div className="mt-auto space-y-2">
          {food.cuisineTypes && food.cuisineTypes.length > 0 && (
            <div className="flex items-start">
              <Pizza className="w-4 h-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
              <span className="text-sm text-gray-600 line-clamp-1">{getCuisineLabel()}</span>
            </div>
          )}

          <div className="flex items-start">
            <MapPin className="w-4 h-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-600 line-clamp-1">{food.location.address}, {food.location.village}</span>
          </div>

          <div className="flex items-start">
            <Clock className="w-4 h-4 text-gray-500 mt-0.5 mr-2 flex-shrink-0" />
            <span className="text-sm text-gray-600">{food.openingHours.open} - {food.openingHours.close}, {food.openingHours.days}</span>
          </div>

          <div className="flex flex-wrap gap-1 mt-3">
            <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{food.priceRange}</span>
            {food.diningStyle && (
              <span className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{food.diningStyle}</span>
            )}
            {food.dietaryPreferences && food.dietaryPreferences.map((pref, idx) => (
              <span key={idx} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded">{pref}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
