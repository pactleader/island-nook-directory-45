
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useFavorites } from '../context/FavoritesContext';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import PropertyCard from '../components/PropertyCard';
import VehicleCard from '../components/VehicleCard';
import BusinessCard from '../components/BusinessCard';
import { Home, Car, Building, Calendar, Hotel, UtensilsCrossed } from 'lucide-react';

// Import mock data to convert IDs to full objects
import { mockProperties, mockVehicles, mockBusinesses, PropertyListing, VehicleListing, BusinessListing } from '../utils/mockData';

const Favorites = () => {
  const { favorites } = useFavorites();
  const [activeTab, setActiveTab] = useState("all");

  // Group favorites by type
  const propertyFavorites = favorites.filter(fav => fav.type === 'property');
  const vehicleFavorites = favorites.filter(fav => fav.type === 'vehicle');
  const businessFavorites = favorites.filter(fav => fav.type === 'business');
  const eventFavorites = favorites.filter(fav => fav.type === 'event');
  const hotelFavorites = favorites.filter(fav => fav.type === 'hotel');
  const foodFavorites = favorites.filter(fav => fav.type === 'food');

  // Look up full objects from mock data
  const propertyObjects = propertyFavorites
    .map(fav => mockProperties.find(p => p.id === fav.id))
    .filter(p => p !== undefined) as PropertyListing[];

  const vehicleObjects = vehicleFavorites
    .map(fav => mockVehicles.find(v => v.id === fav.id))
    .filter(v => v !== undefined) as VehicleListing[];

  const businessObjects = businessFavorites
    .map(fav => mockBusinesses.find(b => b.id === fav.id))
    .filter(b => b !== undefined) as BusinessListing[];

  // Filter favorites based on active tab
  const getFilteredFavorites = () => {
    switch (activeTab) {
      case 'properties':
        return propertyFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyObjects.map(property => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
        ) : <EmptyState type="properties" />;
      
      case 'vehicles':
        return vehicleFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {vehicleObjects.map(vehicle => (
              <VehicleCard key={vehicle.id} vehicle={vehicle} />
            ))}
          </div>
        ) : <EmptyState type="vehicles" />;
      
      case 'businesses':
        return businessFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {businessObjects.map(business => (
              <BusinessCard key={business.id} business={business} />
            ))}
          </div>
        ) : <EmptyState type="businesses" />;
      
      case 'events':
        return eventFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventFavorites.map(event => (
              <div key={event.id} className="glass-card rounded-xl overflow-hidden hover-lift">
                <Link to={`/events/${event.id}`}>
                  <div className="relative h-48">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : <EmptyState type="events" />;
      
      case 'hotels':
        return hotelFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotelFavorites.map(hotel => (
              <div key={hotel.id} className="glass-card rounded-xl overflow-hidden hover-lift">
                <Link to={`/hotels/${hotel.id}`}>
                  <div className="relative h-48">
                    <img src={hotel.image} alt={hotel.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{hotel.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : <EmptyState type="hotels" />;
      
      case 'food':
        return foodFavorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {foodFavorites.map(food => (
              <div key={food.id} className="glass-card rounded-xl overflow-hidden hover-lift">
                <Link to={`/food/${food.id}`}>
                  <div className="relative h-48">
                    <img src={food.image} alt={food.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{food.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : <EmptyState type="food" />;
      
      default:
        // "all" tab
        return favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {propertyObjects.map(property => (
              <PropertyCard key={`property-${property.id}`} property={property} />
            ))}
            {vehicleObjects.map(vehicle => (
              <VehicleCard key={`vehicle-${vehicle.id}`} vehicle={vehicle} />
            ))}
            {businessObjects.map(business => (
              <BusinessCard key={`business-${business.id}`} business={business} />
            ))}
            {eventFavorites.map(event => (
              <div key={`event-${event.id}`} className="glass-card rounded-xl overflow-hidden hover-lift">
                <Link to={`/events/${event.id}`}>
                  <div className="relative h-48">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{event.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
            {hotelFavorites.map(hotel => (
              <div key={`hotel-${hotel.id}`} className="glass-card rounded-xl overflow-hidden hover-lift">
                <Link to={`/hotels/${hotel.id}`}>
                  <div className="relative h-48">
                    <img src={hotel.image} alt={hotel.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{hotel.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
            {foodFavorites.map(food => (
              <div key={`food-${food.id}`} className="glass-card rounded-xl overflow-hidden hover-lift">
                <Link to={`/food/${food.id}`}>
                  <div className="relative h-48">
                    <img src={food.image} alt={food.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{food.title}</h3>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        ) : <EmptyState type="all" />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">My Favorites</h1>
          
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="grid grid-cols-3 md:grid-cols-7 mb-8">
              <TabsTrigger value="all" className="flex items-center gap-2">
                <span className="hidden md:inline">All</span>
              </TabsTrigger>
              <TabsTrigger value="properties" className="flex items-center gap-2">
                <Home size={16} />
                <span className="hidden md:inline">Properties</span>
              </TabsTrigger>
              <TabsTrigger value="vehicles" className="flex items-center gap-2">
                <Car size={16} />
                <span className="hidden md:inline">Vehicles</span>
              </TabsTrigger>
              <TabsTrigger value="businesses" className="flex items-center gap-2">
                <Building size={16} />
                <span className="hidden md:inline">Businesses</span>
              </TabsTrigger>
              <TabsTrigger value="events" className="flex items-center gap-2">
                <Calendar size={16} />
                <span className="hidden md:inline">Events</span>
              </TabsTrigger>
              <TabsTrigger value="hotels" className="flex items-center gap-2">
                <Hotel size={16} />
                <span className="hidden md:inline">Hotels</span>
              </TabsTrigger>
              <TabsTrigger value="food" className="flex items-center gap-2">
                <UtensilsCrossed size={16} />
                <span className="hidden md:inline">Food</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="mt-6">
              {getFilteredFavorites()}
            </div>
          </Tabs>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

// Empty state component
const EmptyState = ({ type }: { type: string }) => {
  let message = "You haven't added any favorites yet.";
  let icon = <Heart size={48} className="text-gray-300 mb-4" />;
  let linkTo = "/";
  let linkText = "Browse listings";
  
  switch (type) {
    case 'properties':
      linkTo = "/properties";
      linkText = "Browse properties";
      message = "You haven't added any properties to your favorites yet.";
      icon = <Home size={48} className="text-gray-300 mb-4" />;
      break;
    case 'vehicles':
      linkTo = "/vehicles";
      linkText = "Browse vehicles";
      message = "You haven't added any vehicles to your favorites yet.";
      icon = <Car size={48} className="text-gray-300 mb-4" />;
      break;
    case 'businesses':
      linkTo = "/businesses";
      linkText = "Browse businesses";
      message = "You haven't added any businesses to your favorites yet.";
      icon = <Building size={48} className="text-gray-300 mb-4" />;
      break;
    case 'events':
      linkTo = "/events";
      linkText = "Browse events";
      message = "You haven't added any events to your favorites yet.";
      icon = <Calendar size={48} className="text-gray-300 mb-4" />;
      break;
    case 'hotels':
      linkTo = "/hotels";
      linkText = "Browse hotels";
      message = "You haven't added any hotels to your favorites yet.";
      icon = <Hotel size={48} className="text-gray-300 mb-4" />;
      break;
    case 'food':
      linkTo = "/food";
      linkText = "Browse food";
      message = "You haven't added any food places to your favorites yet.";
      icon = <UtensilsCrossed size={48} className="text-gray-300 mb-4" />;
      break;
  }
  
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-lg">
      {icon}
      <h3 className="text-xl font-semibold text-gray-700 mb-2">{message}</h3>
      <p className="text-gray-500 mb-6 max-w-md">
        Browse our directories and click the heart icon to add items to your favorites.
      </p>
      <Link to={linkTo} className="btn-primary">
        {linkText}
      </Link>
    </div>
  );
};

export default Favorites;
