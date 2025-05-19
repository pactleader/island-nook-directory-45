import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { FavoriteButton } from '@/components/FavoriteButton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { MapPin, Phone, Clock, Star, Share2 } from 'lucide-react';

// Mock data for shopping listings (same as in Shopping.tsx)
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

const ShoppingDetails = () => {
  const { id } = useParams();
  const listing = mockShoppingListings.find(l => l.id === id);

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Shopping Place Not Found</h1>
            <p className="text-gray-600">The shopping place you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><a href="/shopping" className="hover:text-gray-900">Shopping</a></li>
              <li>/</li>
              <li className="text-gray-900">{listing.name}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Listing Image */}
            <div className="relative">
              <AspectRatio ratio={4/3}>
                <img 
                  src={listing.imageUrl} 
                  alt={listing.name} 
                  className="object-cover w-full h-full rounded-lg"
                />
              </AspectRatio>
              <div className="absolute top-4 right-4">
                <FavoriteButton 
                  id={listing.id}
                  type="shopping"
                  className="bg-white rounded-full p-2 shadow-lg"
                />
              </div>
            </div>

            {/* Listing Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{listing.name}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>{listing.rating}</span>
                  </div>
                  <span className="text-gray-600">{listing.category} • {listing.subcategory}</span>
                  <span className="text-gray-600">{listing.priceRange}</span>
                </div>
              </div>

              <p className="text-gray-700 text-lg">{listing.description}</p>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Location & Hours</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Address</p>
                      <p className="text-gray-600">{listing.location.address}</p>
                      <p className="text-gray-600">{listing.location.village}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Opening Hours</p>
                      <p className="text-gray-600">{listing.openingHours.days}</p>
                      <p className="text-gray-600">{listing.openingHours.open} - {listing.openingHours.close}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Phone className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Contact</p>
                      <p className="text-gray-600">{listing.contact.phone}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6">
                <button className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  Get Directions
                </button>
                <button className="flex-1 border border-gray-900 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Nearby Shopping Places Section */}
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Nearby Shopping Places</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {mockShoppingListings
                .filter(l => l.location.village === listing.location.village && l.id !== listing.id)
                .slice(0, 4)
                .map(nearbyListing => (
                  <div key={nearbyListing.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                    <AspectRatio ratio={16/9}>
                      <img 
                        src={nearbyListing.imageUrl} 
                        alt={nearbyListing.name} 
                        className="object-cover w-full h-full"
                      />
                    </AspectRatio>
                    <div className="p-4">
                      <h3 className="font-semibold text-gray-900">{nearbyListing.name}</h3>
                      <p className="text-gray-600 text-sm mt-1">{nearbyListing.category}</p>
                      <div className="flex items-center mt-2">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span className="text-sm text-gray-600">{nearbyListing.rating}</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { ShoppingDetails as default }; 