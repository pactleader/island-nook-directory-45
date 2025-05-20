import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { FavoriteButton } from '@/components/FavoriteButton';
import { Link } from 'react-router-dom';

// Mock data for shopping listings
const mockShoppingListings = [
  {
    id: "shopping1",
    name: "Paseo de Marianas",
    description: "A vibrant shopping district offering a mix of local shops, boutiques, and international brands.",
    category: "Shopping District",
    subcategory: "Open Market",
    priceRange: "$$",
    rating: 4.5,
    imageUrl: "https://images.unsplash.com/photo-1555529771-7888783a18d3?q=80&w=1000",
    location: {
      address: "Coral Tree Avenue",
      village: "Garapan"
    },
    openingHours: {
      open: "10:00 AM",
      close: "9:00 PM",
      days: "Monday - Sunday"
    },
    contact: {
      phone: "(670) 234-6789"
    }
  },
  {
    id: "shopping2",
    name: "Island Treasures Mall",
    description: "A modern shopping mall featuring a variety of retail stores, restaurants, and entertainment options.",
    category: "Mall",
    subcategory: "Department Store",
    priceRange: "$$$",
    rating: 4.3,
    imageUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000",
    location: {
      address: "123 Beach Road",
      village: "Garapan"
    },
    openingHours: {
      open: "9:00 AM",
      close: "10:00 PM",
      days: "Monday - Sunday"
    },
    contact: {
      phone: "(670) 235-7890"
    }
  },
  {
    id: "shopping3",
    name: "Craft Haven",
    description: "A unique shop specializing in locally-made crafts, souvenirs, and artisanal products.",
    category: "Specialty Shop",
    subcategory: "Crafts & Gifts",
    priceRange: "$$",
    rating: 4.7,
    imageUrl: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000",
    location: {
      address: "456 Coral Lane",
      village: "Chalan Kanoa"
    },
    openingHours: {
      open: "9:00 AM",
      close: "6:00 PM",
      days: "Monday - Saturday"
    },
    contact: {
      phone: "(670) 233-4567"
    }
  },
  {
    id: "shopping4",
    name: "Tech Island",
    description: "Your one-stop shop for electronics, gadgets, and tech accessories.",
    category: "Electronics",
    subcategory: "Technology",
    priceRange: "$$$",
    rating: 4.2,
    imageUrl: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=1000",
    location: {
      address: "789 Main Street",
      village: "Susupe"
    },
    openingHours: {
      open: "10:00 AM",
      close: "8:00 PM",
      days: "Monday - Sunday"
    },
    contact: {
      phone: "(670) 234-9012"
    }
  },
  {
    id: "shopping5",
    name: "Island Fashion Boutique",
    description: "A trendy boutique offering the latest in island-inspired fashion and accessories.",
    category: "Fashion",
    subcategory: "Clothing",
    priceRange: "$$",
    rating: 4.6,
    imageUrl: "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?q=80&w=1000",
    location: {
      address: "321 Fashion Avenue",
      village: "Garapan"
    },
    openingHours: {
      open: "10:00 AM",
      close: "7:00 PM",
      days: "Monday - Saturday"
    },
    contact: {
      phone: "(670) 235-3456"
    }
  },
  {
    id: "shopping6",
    name: "Island Home Decor",
    description: "Unique home decor items with island flair to bring the tropical vibe into your home.",
    category: "Home Goods",
    subcategory: "Home Decor",
    priceRange: "$$$",
    rating: 4.4,
    imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?q=80&w=1000",
    location: {
      address: "654 Interior Lane",
      village: "San Jose"
    },
    openingHours: {
      open: "9:00 AM",
      close: "6:00 PM",
      days: "Tuesday - Sunday"
    },
    contact: {
      phone: "(670) 287-8901"
    }
  }
];

// Filter groups for search functionality
const filterGroups = [
  {
    name: "Category",
    options: [
      { label: "Mall", value: "mall" },
      { label: "Specialty Shop", value: "specialty" },
      { label: "Fashion", value: "fashion" },
      { label: "Electronics", value: "electronics" },
      { label: "Home Goods", value: "home-goods" }
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

const ShoppingCard = ({ listing }: { listing: any }) => (
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
          type="shopping"
          className="bg-white rounded-full p-1.5 shadow"
        />
      </div>
    </div>
    <Link to={`/shopping/${listing.id}`} className="block p-4">
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

const Shopping = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Handlers for search and filtering (to be expanded)
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    console.log("Search term:", value);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <main className="flex-1 pt-20 md:pt-12 pb-10">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Shopping Directory</h1>
            <div className="mb-6">
              <input
                type="text"
                placeholder="Search for shopping places..."
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
            {mockShoppingListings.map(listing => (
              <ShoppingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </main>

    </div>
  );
};

export default Shopping;
