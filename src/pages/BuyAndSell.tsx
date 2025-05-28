import { useState } from "react";
import { Package, Tag, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";

// Categories for the Buy & Sell directory
const categories = [
  { name: "Furniture", icon: <Package size={20} /> },
  { name: "Electronics", icon: <ShoppingCart size={20} /> },
  { name: "Appliances", icon: <Package size={20} /> },
  { name: "Tools", icon: <ShoppingCart size={20} /> },
  { name: "Pets", icon: <ShoppingCart size={20} /> },
  { name: "Clothing", icon: <ShoppingCart size={20} /> },
  { name: "Toys", icon: <ShoppingCart size={20} /> },
  { name: "Vehicles", icon: <ShoppingCart size={20} /> },
];

// Sample listing data
const listings = [
  {
    id: 1,
    title: "Leather Sofa - Excellent Condition",
    price: 350,
    location: "Saipan",
    image: "https://media.furniturevillage.co.uk/i/fv/PRODZFRSP000000000054541_shackleton_4-seater-leather-sofa__lifestyle?$medium$&fmt=auto&fmt=auto&w=579",
    category: "Furniture",
    date: "2 days ago",
  },
  {
    id: 2,
    title: "iPhone 13 Pro - Like New",
    price: 700,
    location: "Tinian",
    image: "https://photos5.appleinsider.com/gallery/47523-92824-New-Alpine-Green-iPhone-13-Pro-xl.jpg",
    category: "Electronics",
    date: "1 day ago",
  },
  {
    id: 3,
    title: "Tabby Kitten - 8 weeks old",
    price: 120,
    location: "Rota",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    category: "Pets",
    date: "3 days ago",
  },
  {
    id: 4,
    title: "Samsung Refrigerator - 2 years old",
    price: 450,
    location: "Saipan",
    image: "https://applianceliquidatorsil.com/wp-content/uploads/2019/09/assets2F05535546-9f21-40e0-a043-871a8768146a.jpg",
    category: "Appliances",
    date: "4 days ago",
  },
];

export default function BuyAndSell() {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("all-listings");

  // Filter listings based on search term
  const filteredListings = listings.filter((listing) => 
    listing.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="pt-20 md:pt-[0.2rem] pb-20 flex-grow">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between mb-10">
            <div>
              <h1 className="text-3xl font-bold mb-2">Buy & Sell Marketplace</h1>
              <p className="text-gray-600 max-w-2xl">
                Browse local classified ads for furniture, electronics, vehicles, pets and more. 
                Connect with sellers in your community.
              </p>
            </div>
            <div className="mt-6 md:mt-0">
              <Button className="bg-gray-900 hover:bg-gray-800 text-white">
                <ShoppingCart className="mr-2 h-4 w-4" />
                Post a Listing
              </Button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <div className="lg:w-1/4">
              <div className="bg-white rounded-lg shadow p-6 mb-6">
                <h2 className="font-semibold text-lg mb-4">Search Listings</h2>
                <div className="space-y-4">
                  <Input
                    type="search"
                    placeholder="Search listings..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button className="w-full">Search</Button>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="font-semibold text-lg mb-4">Categories</h2>
                <ul className="space-y-2">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <Button
                        variant="ghost"
                        className="w-full justify-start text-gray-700 hover:text-gray-900 hover:bg-gray-100"
                      >
                        <span className="mr-2">{category.icon}</span>
                        {category.name}
                      </Button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <Tabs defaultValue="all-listings" className="mb-6">
                <TabsList className="mb-4">
                  <TabsTrigger value="all-listings">All Listings</TabsTrigger>
                  <TabsTrigger value="my-favorites">My Favorites</TabsTrigger>
                  <TabsTrigger value="my-listings">My Listings</TabsTrigger>
                </TabsList>
                <TabsContent value="all-listings">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredListings.map((listing) => (
                      <div key={listing.id} className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300">
                        <div className="relative">
                          <img 
                            src={listing.image} 
                            alt={listing.title} 
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-gray-900 text-white text-xs px-2 py-1 rounded">
                            {listing.category}
                          </div>
                        </div>
                        <div className="p-4">
                          <div className="flex justify-between items-start">
                            <h3 className="font-semibold text-gray-900 mb-1 text-sm">{listing.title}</h3>
                            <span className="font-bold text-gray-900">${listing.price}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                            <span className="flex items-center">
                              <Tag size={14} className="mr-1" />
                              {listing.location}
                            </span>
                            <span>{listing.date}</span>
                          </div>
                          <Link to={`/buy-and-sell/${listing.id}`}>
                            <Button variant="outline" className="w-full mt-4">
                              View Details
                            </Button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="my-favorites">
                  <div className="text-center py-10">
                    <h3 className="text-lg font-medium">Login to view your favorites</h3>
                  </div>
                </TabsContent>
                <TabsContent value="my-listings">
                  <div className="text-center py-10">
                    <h3 className="text-lg font-medium">Login to view your listings</h3>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
