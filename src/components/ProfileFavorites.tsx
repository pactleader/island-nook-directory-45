
import { Heart } from 'lucide-react';
import { useFavorites } from '../contexts/FavoritesContext';
import { Link } from 'react-router-dom';

const ProfileFavorites = () => {
  const { favorites } = useFavorites();
  
  // Count favorites by type
  const propertyCount = favorites.filter(fav => fav.type === 'property').length;
  const vehicleCount = favorites.filter(fav => fav.type === 'vehicle').length;
  const businessCount = favorites.filter(fav => fav.type === 'business').length;
  const eventCount = favorites.filter(fav => fav.type === 'event').length;
  
  const totalFavorites = favorites.length;

  return (
    <div className="glass-card rounded-xl p-6">
      <div className="flex items-center mb-4">
        <Heart size={20} className="text-red-500 mr-2 fill-red-500" />
        <h3 className="text-xl font-semibold text-gray-900">My Favorites</h3>
      </div>
      
      {totalFavorites === 0 ? (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-500 mb-4">You haven't added any favorites yet</p>
          <Link 
            to="/properties" 
            className="text-gray-900 font-medium hover:underline"
          >
            Browse directories
          </Link>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-4">
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl font-bold text-gray-900">{propertyCount}</span>
              <span className="text-sm text-gray-500">Properties</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl font-bold text-gray-900">{vehicleCount}</span>
              <span className="text-sm text-gray-500">Vehicles</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl font-bold text-gray-900">{businessCount}</span>
              <span className="text-sm text-gray-500">Businesses</span>
            </div>
            <div className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-2xl font-bold text-gray-900">{eventCount}</span>
              <span className="text-sm text-gray-500">Events</span>
            </div>
          </div>
          
          <Link 
            to="/favorites" 
            className="block w-full py-2 text-center bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium rounded-lg transition-colors"
          >
            View all favorites
          </Link>
        </>
      )}
    </div>
  );
};

export default ProfileFavorites;
