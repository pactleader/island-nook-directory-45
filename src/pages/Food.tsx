
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { FavoriteButton } from '@/components/FavoriteButton';
import { Link } from 'react-router-dom';

// Mock data for food listings
const mockFoodListings = [
  {
    id: "food1",
    name: "Garapan Market",
    description: "A local grocery store offering fresh produce, meats, and imported goods from across Asia and the Pacific.",
    category: "grocery",
    subcategory: "Local Grocery Stores",
    priceRange: "$$",
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000",
    location: {
      address: "456 Beach Road",
      village: "Garapan"
    },
    openingHours: {
      open: "7:00 AM",
      close: "9:00 PM",
      days: "Monday - Sunday"
    },
    contact: {
      phone: "(670) 234-5678"
    }
  },
  {
    id: "food2",
    name: "Island Fresh Supermarket",
    description: "A large supermarket with a wide selection of local and imported groceries, fresh produce, and household items.",
    category: "grocery",
    subcategory: "Supermarket",
    priceRange: "$$",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=1000",
    location: {
      address: "123 Middle Road",
      village: "Chalan Kanoa"
    },
    openingHours: {
      open: "6:00 AM",
      close: "10:00 PM",
      days: "Monday - Sunday"
    },
    contact: {
      phone: "(670) 235-6789"
    }
  },
  {
    id: "food3",
    name: "Ocean View Café",
    description: "A cozy café with ocean views, serving fresh coffee, pastries, and light meals.",
    category: "cafe",
    subcategory: "Coffee Shop",
    priceRange: "$$",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1000",
    location: {
      address: "789 Beach Road",
      village: "Garapan"
    },
    openingHours: {
      open: "7:00 AM",
      close: "6:00 PM",
      days: "Monday - Saturday"
    },
    contact: {
      phone: "(670) 233-4567"
    }
  },
  {
    id: "food4",
    name: "Pacific Seafood Restaurant",
    description: "A seafood restaurant specializing in fresh, locally-caught fish and traditional island dishes.",
    category: "restaurant",
    subcategory: "Seafood",
    priceRange: "$$$",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1579712267685-42da80f60aa4?q=80&w=1000",
    location: {
      address: "321 Marina Way",
      village: "Oleai"
    },
    openingHours: {
      open: "11:00 AM",
      close: "10:00 PM",
      days: "Tuesday - Sunday"
    },
    contact: {
      phone: "(670) 234-8901"
    }
  },
  {
    id: "food5",
    name: "Island Spice Restaurant",
    description: "A restaurant offering a fusion of local and international cuisines with a focus on spicy flavors.",
    category: "restaurant",
    subcategory: "Fusion",
    priceRange: "$$$",
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000",
    location: {
      address: "567 Coral Tree Avenue",
      village: "San Jose"
    },
    openingHours: {
      open: "11:30 AM",
      close: "9:30 PM",
      days: "Monday - Sunday"
    },
    contact: {
      phone: "(670) 235-2345"
    }
  },
  {
    id: "food6",
    name: "Fresh Fruit Market",
    description: "A specialty market focusing on locally-grown tropical fruits and vegetables.",
    category: "grocery",
    subcategory: "Specialty Market",
    priceRange: "$$",
    rating: 4.8,
    imageUrl: "https://images.unsplash.com/photo-1610832958506-aa56368176cf?q=80&w=1000",
    location: {
      address: "432 Farm Road",
      village: "Capitol Hill"
    },
    openingHours: {
      open: "8:00 AM",
      close: "5:00 PM",
      days: "Monday - Saturday"
    },
    contact: {
      phone: "(670) 287-6789"
    }
  }
];

// Filter groups for search functionality
const filterGroups = [
  {
    name: "Category",
    options: [
      { label: "Grocery", value: "grocery" },
      { label: "Restaurant", value: "restaurant" },
      { label: "Cafe", value: "cafe" },
      { label: "Bakery", value: "bakery" },
      { label: "Snacks", value: "snacks" },
      { label: "Bar & Grill", value: "bar-grill" }
    ]
  },
  {
    name: "Cuisine",
    options: [
      { label: "Korean", value: "korean" },
      { label: "Japanese", value: "japanese" },
      { label: "Filipino", value: "filipino" },
      { label: "American", value: "american" },
      { label: "Thai", value: "thai" },
      { label: "Vietnamese", value: "vietnamese" },
      { label: "Asian", value: "asian" },
      { label: "Middle Eastern", value: "middle-eastern" },
      { label: "BBQ", value: "bbq" }
    ]
  },
  {
    name: "Price Range",
    options: [
      { label: "$", value: "$" },
      { label: "$$", value: "$$" },
      { label: "$$$", value: "$$$" },
      { label: "$$$$", value: "$$$$" }
    ]
  },
  {
    name: "Rating",
    options: [
      { label: "4+ Stars", value: "4+" },
      { label: "3+ Stars", value: "3+" }
    ]
  }
];

const FoodCard = ({ listing }: { listing: any }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md relative">
    <div className="relative w-full">
      <AspectRatio ratio={16/9}>
        <img 
          src={listing.imageUrl} 
          alt={listing.name} 
          className="object-cover w-full h-full"
        />
      </AspectRatio>
      <div className="absolute top-3 right-3">
        <FavoriteButton 
          id={listing.id}
          type="food"
          className="bg-white rounded-full p-1.5 shadow"
        />
      </div>
    </div>
    <Link to={`/food/${listing.id}`} className="block p-4">
      <div className="flex justify-between items-start">
        <h3 className="text-lg font-bold text-gray-900">{listing.name}</h3>
        <div className="flex items-center bg-gray-100 px-2 py-1 rounded text-sm">
          <span className="text-yellow-500 mr-1">★</span>
          <span>{listing.rating}</span>
        </div>
      </div>
      <p className="text-gray-600 text-sm mt-1">{listing.category} • {listing.subcategory}</p>
      <p className="text-gray-600 text-sm mt-1">{listing.location.village} • {listing.priceRange}</p>
      <p className="text-gray-700 mt-2 text-sm line-clamp-2">{listing.description}</p>
      <div className="mt-3 text-gray-600 text-xs">
        <p>{listing.openingHours.days}: {listing.openingHours.open} - {listing.openingHours.close}</p>
      </div>
    </Link>
  </div>
);

const Food = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handlers for search and filtering (to be expanded)
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    console.log("Search term:", value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Food Directory</h1>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search for food places..."
                className="w-full p-3 border border-gray-300 rounded-lg"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
            
            <div className="flex flex-wrap gap-2 mb-6">
              {filterGroups.map((group) => (
                <div key={group.name} className="flex items-center">
                  <span className="text-sm font-medium mr-2">{group.name}:</span>
                  <div className="flex flex-wrap gap-1">
                    {group.options.map((option) => (
                      <button
                        key={option.value}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockFoodListings.map(listing => (
              <FoodCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </main>

    </div>
  );
};

export default Food;
