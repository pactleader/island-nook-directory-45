
import { useState } from 'react';
import { Search, Filter, Map } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

// Mock adventure data for display
const mockAdventures = [
  {
    id: 1,
    title: "Forbidden Island Trek",
    description: "Experience the thrill of exploring this hidden gem with breathtaking cliff views.",
    image: "/placeholder.svg",
    rating: 4.9,
    price: "$75",
    duration: "4 hours",
    difficulty: "Moderate",
    location: "North Coast"
  },
  {
    id: 2,
    title: "Blue Hole Diving Adventure",
    description: "Dive into the crystal clear waters of one of the world's most beautiful diving spots.",
    image: "/placeholder.svg",
    rating: 4.8,
    price: "$120",
    duration: "6 hours",
    difficulty: "Advanced",
    location: "East Bay"
  },
  {
    id: 3,
    title: "Sunset Kayak Tour",
    description: "Paddle through serene lagoons and witness an unforgettable sunset over the ocean.",
    image: "/placeholder.svg",
    rating: 4.7,
    price: "$65",
    duration: "2.5 hours",
    difficulty: "Beginner",
    location: "South Bay"
  },
  {
    id: 4,
    title: "Jungle Zipline Experience",
    description: "Soar through the tropical jungle canopy on this exhilarating zipline adventure.",
    image: "/placeholder.svg",
    rating: 4.6,
    price: "$90",
    duration: "3 hours",
    difficulty: "Beginner",
    location: "Rainforest Reserve"
  },
  {
    id: 5,
    title: "Mountain Summit Hike",
    description: "Reach the highest peak on the island with panoramic views of the entire archipelago.",
    image: "/placeholder.svg",
    rating: 4.8,
    price: "$55",
    duration: "8 hours",
    difficulty: "Challenging",
    location: "Central Highlands"
  },
  {
    id: 6,
    title: "Coral Reef Snorkeling",
    description: "Discover vibrant coral reefs and tropical fish in this guided snorkeling experience.",
    image: "/placeholder.svg",
    rating: 4.7,
    price: "$45",
    duration: "3 hours",
    difficulty: "Beginner",
    location: "Marine Sanctuary"
  }
];

const Adventures = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAdventures, setFilteredAdventures] = useState(mockAdventures);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term === '') {
      setFilteredAdventures(mockAdventures);
    } else {
      const filtered = mockAdventures.filter(
        adventure => 
          adventure.title.toLowerCase().includes(term) || 
          adventure.description.toLowerCase().includes(term) ||
          adventure.location.toLowerCase().includes(term) ||
          adventure.difficulty.toLowerCase().includes(term)
      );
      setFilteredAdventures(filtered);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <div className="relative h-80 md:h-96 w-full bg-cover bg-center" style={{ backgroundImage: 'url(/placeholder.svg)' }}>
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex items-center">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">Island Adventures</h1>
            <p className="text-lg md:text-xl text-white/90 max-w-xl">
              Discover exciting activities and adventures across the Marianas Islands
            </p>
          </div>
        </div>
      </div>
      
      {/* Search & Filter Bar */}
      <div className="sticky top-16 z-30 bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex flex-col md:flex-row gap-4 justify-between">
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <Input
                type="text"
                placeholder="Search adventures, activities, locations..."
                className="pl-10 h-10"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Filter size={16} />
                <span>Filters</span>
              </Button>
              <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Map size={16} />
                <span>Map View</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="flex-grow bg-slate-50">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Popular Adventures</h2>
            <span className="text-sm text-gray-600">{filteredAdventures.length} adventures found</span>
          </div>
          
          {/* Adventure Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAdventures.map((adventure) => (
              <div 
                key={adventure.id}
                className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
              >
                <div className="h-48 overflow-hidden">
                  <img 
                    src={adventure.image} 
                    alt={adventure.title} 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-bold">{adventure.title}</h3>
                    <div className="flex items-center gap-1 bg-yellow-100 px-2 py-0.5 rounded text-sm">
                      <span>★</span>
                      <span>{adventure.rating}</span>
                    </div>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{adventure.description}</p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {adventure.duration}
                    </span>
                    <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                      {adventure.difficulty}
                    </span>
                    <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                      {adventure.location}
                    </span>
                  </div>
                  <Separator className="my-3" />
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">{adventure.price}</span>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Adventures;
