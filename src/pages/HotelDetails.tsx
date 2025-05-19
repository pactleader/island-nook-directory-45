import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Users, Square, Star, Wifi, Coffee } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Mock data for hotels
const mockHotels = [
  {
    id: "hotel-1",
    name: "Oceanview Hotel & Resort",
    description: "Luxury resort with stunning ocean views, private beach access, and world-class dining. Enjoy spacious rooms with ocean views, multiple dining options featuring local and international cuisine, and a range of activities for all ages.",
    imageUrl: "https://www.hotelscombined.com/rimg/himg/b5/5a/43/expedia_group-76951-242325539-853630.jpg?width=968&height=607&crop=true",
    pricePerNight: 250,
    rating: 4.5,
    reviews: 120,
    location: { village: "Garapan", island: "Saipan" },
    specialOffer: "15% off for stays longer than 5 nights",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    amenities: ["Free WiFi", "Swimming Pool", "Restaurant", "Beach Access", "Spa", "Fitness Center", "Room Service"],
    features: ["Ocean View", "2 Queen Beds", "Balcony", "Mini Bar", "Flat-screen TV"],
    images: [
      "https://www.hotelscombined.com/rimg/himg/b5/5a/43/expedia_group-76951-242325539-853630.jpg?width=968&height=607&crop=true",
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80",
      "https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80"
    ]
  },
  {
    id: "hotel-2",
    name: "Pacific Island Inn",
    description: "Cozy inn located in the heart of the city, offering comfortable rooms and a convenient location. Perfect for both business and leisure travelers.",
    imageUrl: "https://photos.hotelbeds.com/giata/original/71/713256/713256a_hb_w_001.jpg",
    pricePerNight: 120,
    rating: 4.2,
    reviews: 85,
    location: { village: "Susupe", island: "Saipan" },
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    amenities: ["Free WiFi", "Restaurant", "Business Center", "Laundry Service", "24/7 Front Desk"],
    features: ["City View", "1 King Bed", "Work Desk", "Coffee Maker", "TV"],
    images: [
      "https://photos.hotelbeds.com/giata/original/71/713256/713256a_hb_w_001.jpg",
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
    ]
  },
  {
    id: "hotel-3",
    name: "Tinian Diamond Hotel",
    description: "Elegant hotel on Tinian offering luxurious accommodations and breathtaking views. Experience the perfect blend of comfort and island charm.",
    imageUrl: "https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53590000/53580200/53580188/b49f5553_z.jpg?_src=imagekit&tr=dpr-2,c-at_max,f-jpg,h-360,pr-true,q-80,w-640",
    pricePerNight: 180,
    rating: 4.0,
    reviews: 60,
    location: { village: "San Jose", island: "Tinian" },
    specialOffer: "Free breakfast included",
    checkIn: "3:00 PM",
    checkOut: "12:00 PM",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Conference Room", "Gift Shop"],
    features: ["Island View", "1 King Bed", "Balcony", "Mini Bar", "TV"],
    images: [
      "https://ik.imagekit.io/tvlk/apr-asset/TzEv3ZUmG4-4Dz22hvmO9NUDzw1DGCIdWl4oPtKumOg=/lodging/54000000/53590000/53580200/53580188/b49f5553_z.jpg?_src=imagekit&tr=dpr-2,c-at_max,f-jpg,h-360,pr-true,q-80,w-640",
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
    ]
  },
  {
    id: "hotel-5",
    name: "Serenity Sands Inn",
    description: "Budget-friendly inn offering comfortable rooms and a relaxing atmosphere. Perfect for travelers looking for a peaceful stay.",
    imageUrl: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/56/c5/3a/rota-resort-country-club.jpg?w=2000&h=-1&s=1",
    pricePerNight: 90,
    rating: 3.8,
    reviews: 50,
    location: { village: "Garapan", island: "Saipan" },
    checkIn: "2:00 PM",
    checkOut: "11:00 AM",
    amenities: ["Free WiFi", "Restaurant", "Laundry Service", "24/7 Front Desk"],
    features: ["Garden View", "2 Twin Beds", "Work Desk", "TV"],
    images: [
      "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/09/56/c5/3a/rota-resort-country-club.jpg?w=2000&h=-1&s=1",
      "https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80"
    ]
  }
];

const HotelDetails = () => {
  const { id } = useParams();
  const hotel = mockHotels.find(h => h.id === id) || mockHotels[0];
  const [activeImage, setActiveImage] = useState(hotel.images[0]);
  const [selectedDates, setSelectedDates] = useState({ checkIn: '', checkOut: '' });

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/hotels" className="hover:text-primary">Hotels</Link>
          <span>/</span>
          <span className="font-medium text-foreground">{hotel.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Main image */}
            <div className="aspect-video overflow-hidden rounded-xl mb-4">
              <img 
                src={activeImage} 
                alt={hotel.name} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
              {hotel.images.map((img, index) => (
                <div 
                  key={index}
                  className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${activeImage === img ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            
            {/* Hotel details */}
            <div>
              <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                <h1 className="text-3xl font-bold">{hotel.name}</h1>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(hotel.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">{hotel.rating}</span>
                  <span className="text-sm text-muted-foreground">({hotel.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex items-center text-muted-foreground mb-6">
                <MapPin size={18} className="mr-1" />
                <span>{hotel.location.village}, {hotel.location.island}</span>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">About This Hotel</h2>
                  <p className="text-muted-foreground">{hotel.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Room Features</h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {hotel.features.map((feature, index) => (
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
                    {hotel.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center">
                        {amenity.includes('WiFi') && <Wifi size={18} className="mr-2 text-primary" />}
                        {amenity.includes('Restaurant') && <Coffee size={18} className="mr-2 text-primary" />}
                        {!amenity.includes('WiFi') && !amenity.includes('Restaurant') && 
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
                  <span className="text-2xl font-bold">${hotel.pricePerNight}</span>
                  <span className="text-muted-foreground">/night</span>
                </div>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="border rounded p-3">
                      <label className="text-sm text-muted-foreground">Check-in</label>
                      <input 
                        type="date" 
                        className="w-full mt-1 focus:outline-none"
                        onChange={(e) => setSelectedDates({...selectedDates, checkIn: e.target.value})}
                      />
                    </div>
                    <div className="border rounded p-3">
                      <label className="text-sm text-muted-foreground">Check-out</label>
                      <input 
                        type="date" 
                        className="w-full mt-1 focus:outline-none"
                        onChange={(e) => setSelectedDates({...selectedDates, checkOut: e.target.value})}
                      />
                    </div>
                  </div>
                  
                  <div className="border rounded p-3">
                    <label className="text-sm text-muted-foreground">Guests</label>
                    <select className="w-full mt-1 focus:outline-none bg-transparent">
                      <option>1 Adult</option>
                      <option>2 Adults</option>
                      <option>2 Adults, 1 Child</option>
                      <option>2 Adults, 2 Children</option>
                    </select>
                  </div>
                  
                  <div className="flex justify-between py-2">
                    <span>Room (Standard)</span>
                    <span>${hotel.pricePerNight}/night</span>
                  </div>
                  
                  <Button className="w-full">Book Now</Button>
                  
                  <div className="text-center text-sm text-muted-foreground">
                    You won't be charged yet
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Check-in/Check-out</h3>
                      <p className="text-muted-foreground text-sm">
                        Check-in: {hotel.checkIn} • Check-out: {hotel.checkOut}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default HotelDetails;
