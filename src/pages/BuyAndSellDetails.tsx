import { useParams, Link } from "react-router-dom";
import { MapPin, Calendar, Phone, Mail, Share2, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { FavoriteButton } from "@/components/FavoriteButton";
import Navigation from "@/components/Navigation";

// Mock data for listings
const listings = [
  {
    id: 1,
    title: "Leather Sofa - Excellent Condition",
    price: 350,
    location: "Saipan",
    image: "https://media.furniturevillage.co.uk/i/fv/PRODZFRSP000000000054541_shackleton_4-seater-leather-sofa__lifestyle?$medium$&fmt=auto&fmt=auto&w=579",
    category: "Furniture",
    date: "2 days ago",
    description: "Beautiful leather sofa in excellent condition. Only used for 1 year. No stains or damage. Moving sale.",
    condition: "Like New",
    seller: {
      name: "John Smith",
      rating: 4.8,
      memberSince: "2023"
    },
    specifications: [
      "Dimensions: 84\" W x 35\" D x 31\" H",
      "Color: Brown",
      "Material: Genuine leather",
      "Style: Modern"
    ],
    contact: {
      phone: "+1 (670) 555-0123",
      email: "john.smith@email.com"
    }
  },
  {
    id: 2,
    title: "iPhone 13 Pro - Like New",
    price: 700,
    location: "Tinian",
    image: "https://photos5.appleinsider.com/gallery/47523-92824-New-Alpine-Green-iPhone-13-Pro-xl.jpg",
    category: "Electronics",
    date: "1 day ago",
    description: "iPhone 13 Pro in Alpine Green. 256GB storage. Includes original box, charger, and accessories. No scratches or damage.",
    condition: "Like New",
    seller: {
      name: "Sarah Johnson",
      rating: 4.9,
      memberSince: "2022"
    },
    specifications: [
      "Storage: 256GB",
      "Color: Alpine Green",
      "Battery Health: 95%",
      "Includes: Original box and accessories"
    ],
    contact: {
      phone: "+1 (670) 555-0124",
      email: "sarah.j@email.com"
    }
  },
  {
    id: 3,
    title: "Tabby Kitten - 8 weeks old",
    price: 120,
    location: "Rota",
    image: "https://images.unsplash.com/photo-1535268647677-300dbf3d78d1",
    category: "Pets",
    date: "3 days ago",
    description: "Adorable tabby kitten, 8 weeks old. Fully vaccinated and litter trained. Looking for a loving home.",
    condition: "New",
    seller: {
      name: "Maria Garcia",
      rating: 4.7,
      memberSince: "2023"
    },
    specifications: [
      "Age: 8 weeks",
      "Gender: Female",
      "Vaccinated: Yes",
      "Litter trained: Yes"
    ],
    contact: {
      phone: "+1 (670) 555-0125",
      email: "maria.g@email.com"
    }
  },
  {
    id: 4,
    title: "Samsung Refrigerator - 2 years old",
    price: 450,
    location: "Saipan",
    image: "https://applianceliquidatorsil.com/wp-content/uploads/2019/09/assets2F05535546-9f21-40e0-a043-871a8768146a.jpg",
    category: "Appliances",
    date: "4 days ago",
    description: "Samsung French Door refrigerator. 2 years old, excellent condition. Moving sale. Must pick up.",
    condition: "Good",
    seller: {
      name: "David Lee",
      rating: 4.6,
      memberSince: "2022"
    },
    specifications: [
      "Model: RF28R7351SR",
      "Capacity: 28 cu. ft.",
      "Features: Ice maker, water dispenser",
      "Color: Stainless steel"
    ],
    contact: {
      phone: "+1 (670) 555-0126",
      email: "david.l@email.com"
    }
  }
];

const BuyAndSellDetails = () => {
  const { id } = useParams();
  const listing = listings.find(l => l.id === Number(id));

  if (!listing) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold">Listing Not Found</h1>
        <p className="mt-4">The listing you're looking for doesn't exist or has been removed.</p>
        <Link to="/buy-and-sell">
          <Button className="mt-4">Back to Listings</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20 md:pt-12 pb-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <Link to="/" className="hover:text-gray-700">Home</Link>
            <span>/</span>
            <Link to="/buy-and-sell" className="hover:text-gray-700">Buy & Sell</Link>
            <span>/</span>
            <span className="text-gray-900">{listing.title}</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Image and Actions */}
            <div className="lg:col-span-2">
              <div className="relative">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="rounded-lg object-cover w-full h-full"
                  />
                </AspectRatio>
                <div className="absolute top-4 right-4">
                  <FavoriteButton
                    id={listing.id.toString()}
                    type="buy-and-sell"
                  />
                </div>
              </div>

              {/* Listing Details */}
              <div className="mt-6 bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">{listing.title}</h1>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className="text-2xl font-bold text-gray-900">${listing.price}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-sm">
                        {listing.condition}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-5 w-5 mr-2" />
                    <span>{listing.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-5 w-5 mr-2" />
                    <span>Listed {listing.date}</span>
                  </div>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2">Description</h2>
                  <p className="text-gray-600">{listing.description}</p>
                </div>

                <div className="mt-6">
                  <h2 className="text-lg font-semibold mb-2">Specifications</h2>
                  <ul className="list-disc list-inside text-gray-600 space-y-1">
                    {listing.specifications.map((spec, index) => (
                      <li key={index}>{spec}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Right Column - Seller Info and Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-lg font-semibold mb-4">Seller Information</h2>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium">{listing.seller.name}</p>
                    <div className="flex items-center text-sm text-gray-600">
                      <span>Member since {listing.seller.memberSince}</span>
                      <span className="mx-2">•</span>
                      <span>{listing.seller.rating} ★</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center text-gray-600">
                      <Phone className="h-4 w-4 mr-2" />
                      <span>{listing.contact.phone}</span>
                    </div>
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-4 w-4 mr-2" />
                      <span>{listing.contact.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="space-y-4">
                  <Button className="w-full">
                    Contact Seller
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Listing
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BuyAndSellDetails; 