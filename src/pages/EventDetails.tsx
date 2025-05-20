
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Mock data for the first event
const mockEvent = {
  id: 1,
  title: "Island Cultural Festival",
  description: "Experience the rich traditions and heritage of the Northern Mariana Islands with performances, food, and art. This annual festival brings together local communities and visitors to celebrate the unique cultural tapestry of the islands. Enjoy traditional dance performances, taste authentic cuisine, and browse handcrafted items by local artisans. The festival also features workshops where you can learn about traditional practices and crafts.",
  image: "https://images.unsplash.com/photo-1482938289607-e9573fc25ebb",
  date: "2023-06-15",
  time: "4:00 PM - 10:00 PM",
  location: "Garapan, Saipan",
  category: "Community",
  organizer: "CNMI Cultural Center",
  contact: "events@cnmiculture.org",
  featured: true,
  additionalImages: [
    "https://images.unsplash.com/photo-1519683109079-d5f539e1542f",
    "https://images.unsplash.com/photo-1604503468506-a8da13d82791",
    "https://images.unsplash.com/photo-1560141343-966cb5212777"
  ],
  tags: ["cultural", "festival", "family-friendly", "food", "art"]
};

const EventDetails = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(mockEvent.image);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/events" className="hover:text-primary">Events</Link>
          <span>/</span>
          <span className="font-medium text-foreground">{mockEvent.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Main image */}
            <div className="aspect-video overflow-hidden rounded-xl mb-4">
              <img 
                src={activeImage} 
                alt={mockEvent.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
              <div 
                className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${activeImage === mockEvent.image ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setActiveImage(mockEvent.image)}
              >
                <img src={mockEvent.image} alt="Thumbnail" className="w-full h-full object-cover" />
              </div>
              
              {mockEvent.additionalImages.map((img, index) => (
                <div 
                  key={index}
                  className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${activeImage === img ? 'border-primary' : 'border-transparent'}`}
                  onClick={() => setActiveImage(img)}
                >
                  <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
            
            {/* Event details */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{mockEvent.title}</h1>
              
              <div className="flex items-center text-muted-foreground mb-6">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {mockEvent.category}
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">About This Event</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{mockEvent.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {mockEvent.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="px-3 py-1 bg-muted rounded-full text-sm"
                      >
                        {tag}
                      </span>
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
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Calendar className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Date & Time</h3>
                      <p className="text-muted-foreground">{mockEvent.date}</p>
                      <p className="text-muted-foreground">{mockEvent.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="text-muted-foreground">{mockEvent.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Organizer</h3>
                      <p className="text-muted-foreground">{mockEvent.organizer}</p>
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <Button className="w-full">Register for Event</Button>
                  <Button variant="outline" className="w-full">Contact Organizer</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default EventDetails;
