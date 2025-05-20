import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Clock, Star, Wifi, Coffee, Phone, GlobeIcon } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Mock data for food listings
const mockFoodListings = [
  {
    id: "food1",
    name: "Garapan Market",
    description: "A local grocery store offering fresh produce, meats, and imported goods from across Asia and the Pacific. Our market is known for its wide selection of local fruits and vegetables, fresh seafood, and international products. We take pride in supporting local farmers and providing quality products at competitive prices.",
    category: "grocery",
    subcategory: "Local Grocery Stores",
    priceRange: "$$",
    rating: 4.3,
    reviews: 85,
    imageUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000",
    location: {
      address: "456 Beach Road",
      village: "Garapan",
      island: "Saipan"
    },
    openingHours: {
      open: "7:00 AM",
      close: "9:00 PM",
      days: "Monday - Sunday"
    },
    contact: {
      phone: "(670) 234-5678",
      email: "info@garapanmarket.com",
      website: "https://garapanmarket.com"
    },
    features: ["Fresh Produce", "Local Products", "International Goods", "Seafood", "Bakery"],
    amenities: ["Parking", "Wheelchair Access", "Credit Cards Accepted", "Delivery Service", "Online Ordering"],
    images: [
      "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=1000",
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
    ]
  },
  {
    id: "food2",
    name: "Island Fresh Supermarket",
    description: "A large supermarket with a wide selection of local and imported groceries, fresh produce, and household items. We offer competitive prices and a convenient shopping experience with ample parking and friendly staff.",
    category: "grocery",
    subcategory: "Supermarket",
    priceRange: "$$",
    rating: 4.5,
    reviews: 120,
    imageUrl: "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=1000",
    location: {
      address: "123 Middle Road",
      village: "Chalan Kanoa",
      island: "Saipan"
    },
    openingHours: {
      open: "6:00 AM",
      close: "10:00 PM",
      days: "Monday - Sunday"
    },
    contact: {
      phone: "(670) 235-6789",
      email: "info@islandfresh.com",
      website: "https://islandfresh.com"
    },
    features: ["Wide Selection", "Fresh Produce", "Household Items", "International Products"],
    amenities: ["Parking", "Wheelchair Access", "Credit Cards Accepted", "ATM", "Pharmacy"],
    images: [
      "https://images.unsplash.com/photo-1588964895597-cfccd6e2dbf9?q=80&w=1000",
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
    ]
  },
  {
    id: "food3",
    name: "Ocean View Café",
    description: "A cozy café with ocean views, serving fresh coffee, pastries, and light meals. Enjoy our signature island-inspired dishes while taking in the beautiful scenery. Perfect for breakfast, lunch, or a relaxing afternoon coffee.",
    category: "cafe",
    subcategory: "Coffee Shop",
    priceRange: "$$",
    rating: 4.7,
    reviews: 95,
    imageUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1000",
    location: {
      address: "789 Beach Road",
      village: "Garapan",
      island: "Saipan"
    },
    openingHours: {
      open: "7:00 AM",
      close: "6:00 PM",
      days: "Monday - Saturday"
    },
    contact: {
      phone: "(670) 233-4567",
      email: "info@oceanviewcafe.com",
      website: "https://oceanviewcafe.com"
    },
    features: ["Ocean View", "Outdoor Seating", "Free WiFi", "Local Coffee", "Fresh Pastries"],
    amenities: ["Parking", "Wheelchair Access", "Credit Cards Accepted", "Takeout", "Catering"],
    images: [
      "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?q=80&w=1000",
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
    ]
  }
];

const FoodDetails = () => {
  const { id } = useParams();
  const food = mockFoodListings.find(f => f.id === id) || mockFoodListings[0];
  const [activeImage, setActiveImage] = useState(food.images[0]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 pt-20 md:pt-12 pb-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/food" className="hover:text-primary">Food</Link>
          <span>/</span>
          <span className="font-medium text-foreground">{food.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Main image */}
            <div className="aspect-video overflow-hidden rounded-xl mb-4">
              <img 
                src={activeImage} 
                alt={food.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
              {food.images.map((img, index) => (
                <div 
                  key={index}
                  className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${activeImage === img ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            
            {/* Food place details */}
            <div>
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <h1 className="text-3xl font-bold">{food.name}</h1>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(food.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">{food.rating}</span>
                  <span className="text-sm text-muted-foreground">({food.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex items-center text-muted-foreground mb-6">
                <MapPin size={18} className="mr-1" />
                <span>{food.location.village}, {food.location.island}</span>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">About This Place</h2>
                  <p className="text-muted-foreground">{food.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Features</h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {food.features.map((feature, index) => (
                      <li key={index} className="flex items-center">
                        <div className="h-2 w-2 rounded-full bg-primary mr-2"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Amenities</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {food.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        {amenity.includes('WiFi') && <Wifi size={18} className="mr-2 text-primary" />}
                        {amenity.includes('Coffee') && <Coffee size={18} className="mr-2 text-primary" />}
                        {!amenity.includes('WiFi') && !amenity.includes('Coffee') && 
                          <div className="h-4 w-4 rounded-full bg-primary/10 mr-2 flex items-center justify-center">
                            <div className="h-2 w-2 rounded-full bg-primary"></div>
                          </div>
                        }
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="mb-4">
                  <span className="text-2xl font-bold">{food.priceRange}</span>
                  <span className="text-muted-foreground"> Price Range</span>
                </div>
                
                <div className="space-y-4">
                  <div className="border rounded p-3">
                    <label className="text-sm text-muted-foreground">Category</label>
                    <div className="mt-1 font-medium">{food.category}</div>
                  </div>
                  
                  <div className="border rounded p-3">
                    <label className="text-sm text-muted-foreground">Subcategory</label>
                    <div className="mt-1 font-medium">{food.subcategory}</div>
                  </div>
                  
                  <Button className="w-full">Contact Now</Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    Get in touch for more information
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Opening Hours</h3>
                      <p className="text-muted-foreground text-sm">
                        {food.openingHours.days}: {food.openingHours.open} - {food.openingHours.close}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Contact</h3>
                      <p className="text-muted-foreground text-sm">
                        {food.contact.phone}
                      </p>
                    </div>
                  </div>
                  
                  {food.contact.website && (
                    <div className="flex items-start gap-3">
                      <GlobeIcon className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Website</h3>
                        <a 
                          href={food.contact.website} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-primary hover:underline text-sm"
                        >
                          Visit Website
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default FoodDetails; 