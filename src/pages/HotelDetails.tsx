
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  MapPin,
  Calendar,
  Bed,
  Bath,
  Home,
  SquareFeet,
  Users,
  Wifi,
  Utensils,
  Car,
  Sun,
  Star,
} from 'lucide-react';
import { PropertyListing, mockProperties } from '../utils/mockData';

const HotelDetails = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Find the hotel using property listings with propertyType "hotel"
  const hotel = mockProperties.find(property => property.id === id && property.propertyType === "hotel");

  if (!hotel) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-6">Hotel Not Found</h1>
        <p className="mb-6">The hotel you're looking for doesn't exist or may have been removed.</p>
        <Button asChild>
          <Link to="/hotels">Back to Hotels</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
        <Link to="/" className="hover:text-primary">Home</Link>
        <span>/</span>
        <Link to="/hotels" className="hover:text-primary">Hotels</Link>
        <span>/</span>
        <span className="font-medium text-foreground">{hotel.title}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left column - Images and details */}
        <div className="md:col-span-2">
          {/* Main image carousel */}
          <Carousel className="w-full mb-4">
            <CarouselContent>
              {hotel.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video overflow-hidden rounded-lg">
                    <img 
                      src={image} 
                      alt={`${hotel.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-2" />
            <CarouselNext className="right-2" />
          </Carousel>

          {/* Thumbnail images */}
          <div className="flex flex-wrap gap-2 mb-8">
            {hotel.images.map((image, index) => (
              <div 
                key={index}
                className={`relative w-20 h-20 overflow-hidden rounded-md cursor-pointer border-2 ${activeImageIndex === index ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setActiveImageIndex(index)}
              >
                <img 
                  src={image} 
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Hotel details */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">{hotel.title}</h1>
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <MapPin className="h-4 w-4" />
              <span>{hotel.street}, {hotel.village}, {hotel.island}</span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              <div className="flex items-center gap-2">
                <Bed className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{hotel.bedrooms} Rooms</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Bath className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{hotel.bathrooms} Baths</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <SquareFeet className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">{hotel.sqft.toLocaleString()} sqft</div>
                  <div className="text-sm text-muted-foreground">Area</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                <div>
                  <div className="font-medium">~{hotel.bedrooms * 2} Guests</div>
                  <div className="text-sm text-muted-foreground">Capacity</div>
                </div>
              </div>
            </div>

            <Separator className="my-6" />

            {/* Description */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">About This Hotel</h2>
              <p className="text-muted-foreground">{hotel.description}</p>
            </div>

            {/* Amenities */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-3">Amenities</h2>
              <div className="grid grid-cols-2 gap-2">
                {hotel.features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tabs for more information */}
            <Tabs defaultValue="rooms" className="mt-8">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="rooms">Rooms & Suites</TabsTrigger>
                <TabsTrigger value="dining">Dining</TabsTrigger>
                <TabsTrigger value="activities">Activities</TabsTrigger>
              </TabsList>
              <TabsContent value="rooms" className="p-4 bg-muted/30 rounded-md mt-2">
                <h3 className="font-semibold mb-2">Available Room Types</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Standard Room - From $150/night</li>
                  <li>Deluxe Room - From $220/night</li>
                  <li>Ocean View Suite - From $350/night</li>
                  <li>Presidential Suite - From $750/night</li>
                </ul>
              </TabsContent>
              <TabsContent value="dining" className="p-4 bg-muted/30 rounded-md mt-2">
                <h3 className="font-semibold mb-2">On-site Dining Options</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Main Restaurant - International cuisine</li>
                  <li>Beachside Grill - Fresh seafood and barbecue</li>
                  <li>Lobby Bar - Cocktails and light bites</li>
                  <li>In-room dining available 24/7</li>
                </ul>
              </TabsContent>
              <TabsContent value="activities" className="p-4 bg-muted/30 rounded-md mt-2">
                <h3 className="font-semibold mb-2">Hotel Activities</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Swimming pool and spa</li>
                  <li>Water sports rental</li>
                  <li>Fitness center</li>
                  <li>Island excursions (booking required)</li>
                </ul>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Right column - Booking and contact */}
        <div>
          {/* Pricing card */}
          <Card className="mb-6 sticky top-4">
            <CardContent className="p-6">
              <div className="text-3xl font-bold mb-2">${(hotel.price / 30).toFixed(0)}<span className="text-lg font-normal text-muted-foreground">/night</span></div>
              <div className="text-sm text-muted-foreground mb-6">Starting price, varies by room type and season</div>
              
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Check-in</label>
                    <div className="flex items-center gap-2 p-2 border rounded-md mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Select date</span>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Check-out</label>
                    <div className="flex items-center gap-2 p-2 border rounded-md mt-1">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>Select date</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium">Guests</label>
                  <div className="flex items-center gap-2 p-2 border rounded-md mt-1">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span>2 adults, 0 children</span>
                  </div>
                </div>
              </div>
              
              <Button className="w-full mb-4">Check Availability</Button>
              <Button variant="outline" className="w-full">Contact Hotel</Button>
              
              <div className="mt-6 text-sm text-muted-foreground">
                <p>Free cancellation up to 48 hours before check-in.</p>
                <p className="mt-2">You won't be charged until your stay.</p>
              </div>
            </CardContent>
          </Card>
          
          {/* Hotel facilities highlights */}
          <div className="bg-muted/30 rounded-lg p-4 mb-6">
            <h3 className="font-semibold mb-3">Hotel Highlights</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4 text-primary" />
                <span>Free high-speed WiFi</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="h-4 w-4 text-primary" />
                <span>Breakfast included</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="h-4 w-4 text-primary" />
                <span>Free parking</span>
              </div>
              <div className="flex items-center gap-2">
                <Sun className="h-4 w-4 text-primary" />
                <span>Swimming pool</span>
              </div>
            </div>
          </div>
          
          {/* Location map placeholder */}
          <div className="bg-muted rounded-lg p-4 aspect-square flex items-center justify-center mb-6">
            <div className="text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
              <p className="text-muted-foreground">Interactive map would appear here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HotelDetails;
