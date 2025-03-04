
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Users, Square, Star, Wifi, Coffee } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Mock data for the hotel
const mockHotel = {
  id: 'hotel-1',
  title: 'Fiesta Resort & Spa Saipan',
  description: 'Beachfront hotel with stunning views, swimming pools, and on-site restaurants. This luxurious resort offers everything you need for a perfect island getaway. Enjoy spacious rooms with ocean views, multiple dining options featuring local and international cuisine, and a range of activities for all ages. The resort is conveniently located near local attractions and shopping areas.',
  price: 175,
  priceUnit: 'night',
  location: 'Garapan, Saipan',
  roomType: 'Deluxe Ocean View',
  checkIn: '3:00 PM',
  checkOut: '12:00 PM',
  amenities: ['Free WiFi', 'Swimming Pool', 'Restaurant', 'Beach Access', 'Spa', 'Fitness Center', 'Room Service'],
  images: [
    'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    'https://images.unsplash.com/photo-1551918120-9739cb430c6d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80',
    'https://images.unsplash.com/photo-1564501049412-61c2a3083791?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1332&q=80',
    'https://images.unsplash.com/photo-1590490360182-c33d57733427?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
  ],
  rating: 4.5,
  reviews: 128,
  features: ['Ocean View', '2 Queen Beds', 'Balcony', 'Mini Bar', 'Flat-screen TV']
};

const HotelDetails = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(mockHotel.images[0]);
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
          <span className="font-medium text-foreground">{mockHotel.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Main image */}
            <div className="aspect-video overflow-hidden rounded-xl mb-4">
              <img 
                src={activeImage} 
                alt={mockHotel.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
              {mockHotel.images.map((img, index) => (
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
                <h1 className="text-3xl font-bold">{mockHotel.title}</h1>
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className={`h-5 w-5 ${i < Math.floor(mockHotel.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                  <span className="text-sm font-medium ml-1">{mockHotel.rating}</span>
                  <span className="text-sm text-muted-foreground">({mockHotel.reviews} reviews)</span>
                </div>
              </div>
              
              <div className="flex items-center text-muted-foreground mb-6">
                <MapPin size={18} className="mr-1" />
                <span>{mockHotel.location}</span>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">About This Hotel</h2>
                  <p className="text-muted-foreground">{mockHotel.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Room Features</h2>
                  <ul className="grid grid-cols-2 gap-2">
                    {mockHotel.features.map((feature, index) => (
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
                    {mockHotel.amenities.map((amenity, index) => (
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
                  <span className="text-2xl font-bold">${mockHotel.price}</span>
                  <span className="text-muted-foreground">/{mockHotel.priceUnit}</span>
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
                    <span>Room ({mockHotel.roomType})</span>
                    <span>${mockHotel.price}/night</span>
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
                        Check-in: {mockHotel.checkIn} • Check-out: {mockHotel.checkOut}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Square className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Room Type</h3>
                      <p className="text-muted-foreground text-sm">{mockHotel.roomType}</p>
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
