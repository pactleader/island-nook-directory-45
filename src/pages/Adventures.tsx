import { useState } from 'react';
import { Search, Filter, Map, MapPin, Mountain, Waves, Compass, Anchor, Plane, Bike, History } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

// Mock adventure data for display
const mockAdventures = [
  {
    id: "1",
    title: "Forbidden Island Trek",
    description: "Experience the thrill of exploring this hidden gem with breathtaking cliff views.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/7a/03/15/forbidden-island.jpg?w=2000&h=-1&s=1",
    rating: 4.9,
    price: "$75",
    duration: "4 hours",
    difficulty: "Moderate",
    location: "North Coast"
  },
  {
    id: "2",
    title: "Blue Hole Diving Adventure",
    description: "Dive into the crystal clear waters of one of the world's most beautiful diving spots.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/8a/74/87/caption.jpg?w=1400&h=-1&s=1",
    rating: 4.8,
    price: "$120",
    duration: "6 hours",
    difficulty: "Advanced",
    location: "East Bay"
  },
  {
    id: "3",
    title: "Sunset Kayak Tour",
    description: "Paddle through serene lagoons and witness an unforgettable sunset over the ocean.",
    image: "https://images.unsplash.com/photo-1727380460045-8a319df4c934?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7,
    price: "$65",
    duration: "2.5 hours",
    difficulty: "Beginner",
    location: "South Bay"
  },
  {
    id: "4",
    title: "Jungle Zipline Experience",
    description: "Soar through the tropical jungle canopy on this exhilarating zipline adventure.",
    image: "https://images.unsplash.com/photo-1606632512844-b91c1c328235?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.6,
    price: "$90",
    duration: "3 hours",
    difficulty: "Beginner",
    location: "Rainforest Reserve"
  },
  {
    id: "5",
    title: "Mountain Summit Hike",
    description: "Reach the highest peak on the island with panoramic views of the entire archipelago.",
    image: "https://images.unsplash.com/photo-1640244676144-63c901998a83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
    price: "$55",
    duration: "8 hours",
    difficulty: "Challenging",
    location: "Central Highlands"
  },
  {
    id: "6",
    title: "Coral Reef Snorkeling",
    description: "Discover vibrant coral reefs and tropical fish in this guided snorkeling experience.",
    image: "https://images.unsplash.com/photo-1687707939240-2a1ff390459a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7,
    price: "$45",
    duration: "3 hours",
    difficulty: "Beginner",
    location: "Marine Sanctuary"
  }
];

// Attractions data (moved from AskLocal)
const attractions = [
  {
    id: 'attr1',
    title: 'Managaha Island',
    description: 'A small, beautiful island off the coast of Saipan perfect for snorkeling, swimming, and water sports.',
    category: 'places',
    image: 'https://exploreguamevents.com/wp-content/uploads/2024/04/managahan-beach.png',
    location: 'Saipan'
  },
  {
    id: 'attr2',
    title: 'Mount Tapochau',
    description: 'The highest point on Saipan offering panoramic views of the entire island and surrounding ocean.',
    category: 'hikes',
    image: 'https://media-cdn.tripadvisor.com/media/photo-s/18/10/97/e4/mt-tapochau-saipan-photo.jpg',
    location: 'Saipan'
  },
  {
    id: 'attr3',
    title: 'Grotto',
    description: 'A natural limestone cavern and popular diving spot with stunning blue waters and marine life.',
    category: 'diving',
    image: 'https://res.klook.com/images/fl_lossy.progressive,q_65/c_fill,w_1295,h_971/w_80,x_15,y_15,g_south_west,l_Klook_water_br_trans_yhcmh3/activities/ub4nsl0hvicdcolwbauq/SaipanGrottoSnorkeling.jpg',
    location: 'Saipan'
  },
  {
    id: 'attr4',
    title: 'Micro Beach',
    description: 'A pristine white sand beach with calm waters, perfect for families and beginners learning water sports.',
    category: 'beaches',
    image: 'https://lh5.googleusercontent.com/proxy/gb4Al9t6IhaBq27SjIWPVespcH90sxuItpeFB-4j_6N8NRUM2_tH-sGeGADhoEuCL2jmd_KFaxri4jTJSvFR467xruLaghRXvImGvMl7-3KX5ONcPTEGxOej6JlPyQOSMLAmH-3pJA',
    location: 'Saipan'
  },
  {
    id: 'attr5',
    title: 'American Memorial Park',
    description: 'A national park commemorating the Marianas Campaign of World War II with museum exhibits and walking trails.',
    category: 'historical',
    image: 'https://www.nps.gov/amme/planyourvisit/images/DSC01771e-small_1.jpg?maxwidth=650&autorotate=false&quality=78&format=webp',
    location: 'Saipan'
  },
  {
    id: 'attr6',
    title: 'Bird Island',
    description: 'A small uninhabited island and wildlife sanctuary with a scenic lookout point accessible via a short hike.',
    category: 'places',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0f/2c/0a/ed/caption.jpg?w=2000&h=-1&s=1',
    location: 'Saipan'
  },
  {
    id: 'attr7',
    title: 'Forbidden Island',
    description: 'A remote, secluded beach accessible via a challenging hike, offering pristine beauty and natural pools.',
    category: 'hikes',
    image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/7a/03/15/forbidden-island.jpg?w=2000&h=-1&s=1',
    location: 'Saipan'
  },
  {
    id: 'attr8',
    title: 'Tinian Blowhole',
    description: 'A natural sea cave where ocean waves push through a small opening, creating spectacular water spouts.',
    category: 'places',
    image: 'https://wimg.mk.co.kr/news/cms/202406/22/news-p.v1.20240617.b3af79264fc74923aebbf27789c5290e_P1.png',
    location: 'Tinian'
  },
  {
    id: 'attr9',
    title: 'Atomic Bomb Pits',
    description: 'Historical site where the atomic bombs were loaded onto planes during World War II.',
    category: 'historical',
    image: 'https://img.atlasobscura.com/UAziZbFBbXeZN9IG1ATgsH1cK2yHOSh_cudkC47DtxY/rs:fill:780:520:1/g:ce/q:81/sm:1/scp:1/ar:1/aHR0cHM6Ly9hdGxh/cy1kZXYuczMuYW1h/em9uYXdzLmNvbS91/cGxvYWRzL3BsYWNl/X2ltYWdlcy9teTdo/Z3N0bDQ5azVjZDE1/ZDI5NGNhOWI3ZjA3/OF9HT1BSMzc2My5K/UEc.jpg',
    location: 'Tinian'
  },
  {
    id: 'attr10',
    title: 'Mariana Skydiving',
    description: 'Experience the thrill of skydiving over the beautiful blue waters and lush landscapes of Saipan.',
    category: 'adventure',
    image: 'https://image.kkday.com/v2/image/get/w_960%2Cc_fit%2Cq_55%2Ct_webp/s1.kkday.com/product_164237/20240307095002_7aF71/jpg',
    location: 'Saipan'
  },
  {
    id: 'attr11',
    title: 'Marianas Trench Tours',
    description: 'Guided boat tours to view the deepest part of the world\'s oceans from the surface.',
    category: 'tours',
    image: 'https://static.wixstatic.com/media/b40a18_5c7df5996a34455cbd1c1537fa2a16aa~mv2.png/v1/fill/w_568,h_336,al_c,q_85,usm_0.66_1.00_0.01,enc_avif,quality_auto/b40a18_5c7df5996a34455cbd1c1537fa2a16aa~mv2.png',
    location: 'Saipan'
  },
  {
    id: 'attr12',
    title: 'Marpi Point',
    description: 'Historical site and scenic lookout with important World War II significance.',
    category: 'historical',
    image: 'https://images.unsplash.com/photo-1664787730026-9ff1bc7f1210?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    location: 'Saipan'
  }
];

const Adventures = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAdventures, setFilteredAdventures] = useState(mockAdventures);
  const [activeAttractionCategory, setActiveAttractionCategory] = useState<string | null>(null);

  // Get unique attraction categories
  const attractionCategories = Array.from(new Set(attractions.map(attr => attr.category)));

  // Filter attractions based on category
  const filteredAttractions = attractions.filter(attr => {
    return !activeAttractionCategory || attr.category === activeAttractionCategory;
  });

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

  // Get icon for attraction category
  const getCategoryIcon = (category: string) => {
    switch(category) {
      case 'places':
        return <MapPin size={18} />;
      case 'hikes':
        return <Mountain size={18} />;
      case 'beaches':
        return <Waves size={18} />;
      case 'diving':
        return <Anchor size={18} />;
      case 'historical':
        return <History size={18} />;
      case 'adventure':
        return <Compass size={18} />;
      case 'tours':
        return <Plane size={18} />;
      default:
        return <Bike size={18} />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <div className="relative h-80 md:h-96 w-full bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1668813610741-a9b7edbceeed?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}>
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
                    <Link to={`/adventures/${adventure.id}`}>
                      <Button size="sm">View Details</Button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Local Attractions Section - Moved from AskLocal */}
          <div className="mt-16 mb-12">
            <h2 className="text-2xl font-bold mb-6">Discover Local Attractions</h2>
            
            {/* Attraction Categories */}
            <div className="mb-6">
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => setActiveAttractionCategory(null)}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full transition ${
                    !activeAttractionCategory 
                      ? 'bg-gray-900 text-white' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  All Attractions
                </button>
                {attractionCategories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveAttractionCategory(category)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full transition ${
                      activeAttractionCategory === category 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Attraction Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAttractions.map((attraction) => (
                <div 
                  key={attraction.id} 
                  className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={attraction.image}
                      alt={attraction.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-1 rounded-lg text-xs font-medium text-gray-700 flex items-center">
                      {getCategoryIcon(attraction.category)}
                      <span className="ml-1">{attraction.category.charAt(0).toUpperCase() + attraction.category.slice(1)}</span>
                    </div>
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{attraction.title}</h3>
                    <div className="flex items-center text-gray-600 text-sm mb-2">
                      <MapPin size={14} className="mr-1" />
                      <span>{attraction.location}</span>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">{attraction.description}</p>
                    <Link to="#" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                      Learn more
                    </Link>
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

export default Adventures;
