import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { useFavorites } from '../contexts/FavoritesContext';
import PropertyCard from '../components/PropertyCard';
import VehicleCard from '../components/VehicleCard';
import BusinessCard from '../components/BusinessCard';
import { mockProperties, mockVehicles, mockBusinesses, mockFoodListings } from '../utils/mockData';
import { Heart, Building, Car, Store, Calendar } from 'lucide-react';

const Favorites = () => {
  const { favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState('all');
  
  // Filter favorited items by type
  const favoriteProperties = mockProperties.filter(property => 
    favorites.some(fav => fav.id === property.id && fav.type === 'property')
  );
  
  const favoriteVehicles = mockVehicles.filter(vehicle => 
    favorites.some(fav => fav.id === vehicle.id && fav.type === 'vehicle')
  );
  
  const favoriteBusinesses = mockBusinesses.filter(business => 
    favorites.some(fav => fav.id === business.id && fav.type === 'business')
  );
  
  // Count total favorites by type
  const propertiesCount = favoriteProperties.length;
  const vehiclesCount = favoriteVehicles.length;
  const businessesCount = favoriteBusinesses.length;
  const totalCount = propertiesCount + vehiclesCount + businessesCount;

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center mb-8">
            <Heart size={28} className="text-red-500 mr-3 fill-red-500" />
            <h1 className="text-3xl font-bold text-gray-900">My Favorites</h1>
          </div>
          
          {totalCount === 0 ? (
            <div className="text-center py-16 bg-gray-50 rounded-lg">
              <Heart size={48} className="mx-auto text-gray-400 mb-4" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">No favorites yet</h2>
              <p className="text-gray-500 mb-6">Browse our directories and add items to your favorites</p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <a href="/properties" className="btn-secondary px-6 py-3">
                  Browse Properties
                </a>
                <a href="/vehicles" className="btn-secondary px-6 py-3">
                  Browse Vehicles
                </a>
                <a href="/businesses" className="btn-secondary px-6 py-3">
                  Browse Businesses
                </a>
              </div>
            </div>
          ) : (
            <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="all" className="flex items-center rounded-md">
                  <Heart size={16} className="mr-2" />
                  <span>All</span>
                  <span className="ml-2 bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-0.5">{totalCount}</span>
                </TabsTrigger>
                <TabsTrigger value="properties" className="flex items-center rounded-md">
                  <Building size={16} className="mr-2" />
                  <span>Properties</span>
                  <span className="ml-2 bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-0.5">{propertiesCount}</span>
                </TabsTrigger>
                <TabsTrigger value="vehicles" className="flex items-center rounded-md">
                  <Car size={16} className="mr-2" />
                  <span>Vehicles</span>
                  <span className="ml-2 bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-0.5">{vehiclesCount}</span>
                </TabsTrigger>
                <TabsTrigger value="businesses" className="flex items-center rounded-md">
                  <Store size={16} className="mr-2" />
                  <span>Businesses</span>
                  <span className="ml-2 bg-gray-200 text-gray-700 text-xs rounded-full px-2 py-0.5">{businessesCount}</span>
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="all">
                {/* Properties */}
                {propertiesCount > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center mb-4">
                      <Building size={20} className="mr-2 text-gray-700" />
                      <h2 className="text-xl font-semibold text-gray-900">Properties</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favoriteProperties.map(property => (
                        <PropertyCard key={property.id} property={property} />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Vehicles */}
                {vehiclesCount > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center mb-4">
                      <Car size={20} className="mr-2 text-gray-700" />
                      <h2 className="text-xl font-semibold text-gray-900">Vehicles</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favoriteVehicles.map(vehicle => (
                        <VehicleCard key={vehicle.id} vehicle={vehicle} />
                      ))}
                    </div>
                  </div>
                )}
                
                {/* Businesses */}
                {businessesCount > 0 && (
                  <div className="mb-10">
                    <div className="flex items-center mb-4">
                      <Store size={20} className="mr-2 text-gray-700" />
                      <h2 className="text-xl font-semibold text-gray-900">Businesses</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {favoriteBusinesses.map(business => (
                        <BusinessCard key={business.id} business={business} />
                      ))}
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="properties">
                {propertiesCount > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteProperties.map(property => (
                      <PropertyCard key={property.id} property={property} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Building size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No favorited properties</h3>
                    <p className="text-gray-500 mb-6">Browse our properties and add some to your favorites</p>
                    <a href="/properties" className="btn-secondary px-6 py-2">
                      Browse Properties
                    </a>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="vehicles">
                {vehiclesCount > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteVehicles.map(vehicle => (
                      <VehicleCard key={vehicle.id} vehicle={vehicle} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Car size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No favorited vehicles</h3>
                    <p className="text-gray-500 mb-6">Browse our vehicles and add some to your favorites</p>
                    <a href="/vehicles" className="btn-secondary px-6 py-2">
                      Browse Vehicles
                    </a>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="businesses">
                {businessesCount > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favoriteBusinesses.map(business => (
                      <BusinessCard key={business.id} business={business} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg">
                    <Store size={48} className="mx-auto text-gray-400 mb-4" />
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No favorited businesses</h3>
                    <p className="text-gray-500 mb-6">Browse our businesses and add some to your favorites</p>
                    <a href="/businesses" className="btn-secondary px-6 py-2">
                      Browse Businesses
                    </a>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Favorites;
