import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Mock data for event listings
const mockEvents = [
  {
    id: 1,
    title: "Island Cultural Festival",
    description: "Experience the rich traditions and heritage of the Northern Mariana Islands with performances, food, and art. This annual festival brings together local communities and visitors to celebrate the unique cultural tapestry of the islands. Enjoy traditional dance performances, taste authentic cuisine, and browse handcrafted items by local artisans. The festival also features workshops where you can learn about traditional practices and crafts.",
    image: "https://www.moas.org/z/-vf.0.0.0.4067.D9441D2F68CB9D0D2C64A6016060206979A351A7C4273F969B38C1EA9B05A6C7",
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
  },
  {
    id: 2,
    title: "Beach Cleanup & Conservation Talk",
    description: "Join local environmentalists for a community beach cleanup followed by an educational talk about marine conservation. Learn about the importance of protecting our marine ecosystems and how you can contribute to keeping our beaches clean. All necessary equipment will be provided. Bring sunscreen, water, and a hat.",
    image: "https://images.unsplash.com/photo-1618477461853-cf6ed80faba5",
    date: "2023-06-10",
    time: "8:00 AM - 11:00 AM",
    location: "Micro Beach, Saipan",
    category: "Community",
    organizer: "Pacific Environmental Group",
    contact: "volunteer@pacificenviron.org",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
      "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2",
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
    ],
    tags: ["environment", "community", "education", "outdoors"]
  },
  {
    id: 3,
    title: "Sunset Yoga Retreat",
    description: "Relax and rejuvenate with a beachfront yoga session as the sun sets over the beautiful Saipan lagoon. Perfect for all skill levels, this session combines gentle yoga poses with meditation and breathing exercises. Bring your own mat or rent one on site. Stay after for a refreshing coconut water and light snacks.",
    image: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b",
    date: "2023-06-12",
    time: "5:30 PM - 7:00 PM",
    location: "Pau Pau Beach, Saipan",
    category: "Wellness",
    organizer: "Island Wellness Center",
    contact: "yoga@islandwellness.com",
    featured: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b",
      "https://images.unsplash.com/photo-1599902890901-1597ca164c6c",
      "https://images.unsplash.com/photo-1545205597-3d9d02c29597"
    ],
    tags: ["yoga", "wellness", "sunset", "meditation"]
  },
  {
    id: 4,
    title: "Island Business Expo",
    description: "Connect with local entrepreneurs and businesses showcasing their products and services from across the islands. Network with industry leaders, attend informative workshops, and discover new business opportunities. The expo features keynote speakers, panel discussions, and plenty of networking opportunities.",
    image: "https://images.unsplash.com/photo-1538935732373-f7a495fea3f6",
    date: "2023-06-20",
    time: "9:00 AM - 4:00 PM",
    location: "World Resort Center, Saipan",
    category: "Business",
    organizer: "CNMI Chamber of Commerce",
    contact: "expo@cnmichamber.com",
    featured: false,
    additionalImages: [
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87",
      "https://images.unsplash.com/photo-1556761175-b413da4baf72",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786"
    ],
    tags: ["business", "networking", "expo", "professional"]
  },
  {
    id: 5,
    title: "Summer Night Market",
    description: "Enjoy local food, crafts, and entertainment at this vibrant night market featuring vendors from across the islands. Sample delicious street food, shop for unique souvenirs, and enjoy live music performances. The market also features cultural demonstrations and activities for all ages.",
    image: "https://images.unsplash.com/photo-1502920514313-52581002a659",
    date: "2023-06-17",
    time: "6:00 PM - 11:00 PM",
    location: "American Memorial Park, Saipan",
    category: "Night Life",
    organizer: "Island Vendors Association",
    contact: "market@islandvendors.org",
    featured: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf",
      "https://images.unsplash.com/photo-1519671482749-fd09be7ccebf"
    ],
    tags: ["food", "shopping", "entertainment", "nightlife"]
  },
  {
    id: 6,
    title: "Acoustic Sessions Under the Stars",
    description: "Enjoy soothing acoustic performances by local musicians under the beautiful island night sky. Bring a blanket or beach chair and relax with friends while listening to live music. Food and drinks will be available for purchase. Perfect for a romantic date night or a casual evening with friends.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
    date: "2023-06-18",
    time: "7:00 PM - 10:00 PM",
    location: "Fiesta Resort Beachfront, Saipan",
    category: "Music",
    organizer: "Island Music Collective",
    contact: "music@islandcollective.org",
    featured: true,
    additionalImages: [
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819",
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
    ],
    tags: ["music", "acoustic", "outdoors", "entertainment"]
  }
];

const EventDetails = () => {
  const { id } = useParams();
  const event = mockEvents.find(e => e.id === Number(id));
  const [activeImage, setActiveImage] = useState(event?.image || '');

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-grow container mx-auto px-4 pt-20 md:pt-12 pb-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
            <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist or has been removed.</p>
            <Button asChild>
              <Link to="/events">Back to Events</Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 pt-20 md:pt-[0.2rem] pb-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/events" className="hover:text-primary">Events</Link>
          <span>/</span>
          <span className="font-medium text-foreground">{event.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Main image */}
            <div className="aspect-video overflow-hidden rounded-xl mb-4">
              <img 
                src={activeImage} 
                alt={event.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Thumbnails */}
            <div className="flex space-x-2 mb-6 overflow-x-auto pb-2">
              <div 
                className={`w-20 h-20 rounded-md overflow-hidden cursor-pointer border-2 ${activeImage === event.image ? 'border-primary' : 'border-transparent'}`}
                onClick={() => setActiveImage(event.image)}
              >
                <img src={event.image} alt="Thumbnail" className="w-full h-full object-cover" />
              </div>
              
              {event.additionalImages.map((img, index) => (
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
              <h1 className="text-3xl font-bold mb-2">{event.title}</h1>
              
              <div className="flex items-center text-muted-foreground mb-6">
                <div className="inline-block px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  {event.category}
                </div>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">About This Event</h2>
                  <p className="text-muted-foreground whitespace-pre-line">{event.description}</p>
                </div>
                
                <div>
                  <h2 className="text-xl font-semibold mb-3">Tags</h2>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.map((tag, index) => (
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
                      <p className="text-muted-foreground">{event.date}</p>
                      <p className="text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Location</h3>
                      <p className="text-muted-foreground">{event.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h3 className="font-semibold">Organizer</h3>
                      <p className="text-muted-foreground">{event.organizer}</p>
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
      
      <Footer />
    </div>
  );
};

export default EventDetails;
