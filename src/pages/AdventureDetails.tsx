import { useParams } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import { FavoriteButton } from '@/components/FavoriteButton';
import { AspectRatio } from '@/components/ui/aspect-ratio';
import { MapPin, Clock, Star, Share2, Mountain, Waves, Compass, Anchor, Plane, Bike, History } from 'lucide-react';

// Mock data for adventures (same as in Adventures.tsx)
const mockAdventures = [
  {
    id: "1",
    title: "Forbidden Island Trek",
    description: "Experience the thrill of exploring this hidden gem with breathtaking cliff views. This guided trek takes you through lush jungle trails, past ancient Chamorro sites, and to stunning viewpoints overlooking the Pacific Ocean. Perfect for nature lovers and photography enthusiasts.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/0d/7a/03/15/forbidden-island.jpg?w=2000&h=-1&s=1",
    rating: 4.9,
    price: "$75",
    duration: "4 hours",
    difficulty: "Moderate",
    location: "North Coast",
    category: "Hiking",
    included: [
      "Professional guide",
      "Safety equipment",
      "Water and snacks",
      "Transportation to trailhead",
      "First aid kit"
    ],
    requirements: [
      "Good physical fitness",
      "Sturdy hiking shoes",
      "Sun protection",
      "Water bottle",
      "Camera (optional)"
    ],
    schedule: {
      start: "8:00 AM",
      end: "12:00 PM",
      days: "Monday - Sunday"
    },
    contact: {
      phone: "(670) 234-5678",
      email: "adventures@islandnook.com"
    }
  },
  {
    id: "2",
    title: "Blue Hole Diving Adventure",
    description: "Dive into the crystal clear waters of one of the world's most beautiful diving spots. This advanced diving experience takes you through underwater caves and tunnels, surrounded by vibrant coral reefs and diverse marine life. Perfect for certified divers seeking an unforgettable underwater adventure.",
    image: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2f/8a/74/87/caption.jpg?w=1400&h=-1&s=1",
    rating: 4.8,
    price: "$120",
    duration: "6 hours",
    difficulty: "Advanced",
    location: "East Bay",
    category: "Diving",
    included: [
      "Professional dive guide",
      "Full diving equipment",
      "Underwater camera",
      "Lunch and refreshments",
      "Transportation"
    ],
    requirements: [
      "Advanced diving certification",
      "Diving insurance",
      "Swimsuit and towel",
      "Personal medications",
      "Diving logbook"
    ],
    schedule: {
      start: "7:00 AM",
      end: "1:00 PM",
      days: "Monday - Saturday"
    },
    contact: {
      phone: "(670) 235-6789",
      email: "diving@islandnook.com"
    }
  },
  {
    id: "3",
    title: "Sunset Kayak Tour",
    description: "Paddle through serene lagoons and witness an unforgettable sunset over the ocean. This guided kayak tour takes you through calm waters, past hidden coves, and to the perfect spot to watch the sun dip below the horizon. Perfect for couples and nature enthusiasts.",
    image: "https://images.unsplash.com/photo-1727380460045-8a319df4c934?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7,
    price: "$65",
    duration: "2.5 hours",
    difficulty: "Beginner",
    location: "South Bay",
    category: "Water Sports",
    included: [
      "Professional guide",
      "Kayak and paddle",
      "Life jacket",
      "Waterproof bag",
      "Refreshments"
    ],
    requirements: [
      "Basic swimming ability",
      "Comfortable clothing",
      "Water shoes",
      "Sunscreen",
      "Change of clothes"
    ],
    schedule: {
      start: "4:00 PM",
      end: "6:30 PM",
      days: "Daily"
    },
    contact: {
      phone: "(670) 236-7890",
      email: "kayak@islandnook.com"
    }
  },
  {
    id: "4",
    title: "Jungle Zipline Experience",
    description: "Soar through the tropical jungle canopy on this exhilarating zipline adventure. Experience the thrill of flying through the air while taking in breathtaking views of the rainforest below. Perfect for adrenaline seekers and nature lovers.",
    image: "https://images.unsplash.com/photo-1606632512844-b91c1c328235?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.6,
    price: "$90",
    duration: "3 hours",
    difficulty: "Beginner",
    location: "Rainforest Reserve",
    category: "Adventure",
    included: [
      "Professional guides",
      "Safety equipment",
      "Training session",
      "Photos",
      "Refreshments"
    ],
    requirements: [
      "Minimum age: 8 years",
      "Maximum weight: 250 lbs",
      "Comfortable clothing",
      "Closed-toe shoes",
      "No loose items"
    ],
    schedule: {
      start: "9:00 AM",
      end: "12:00 PM",
      days: "Daily"
    },
    contact: {
      phone: "(670) 237-8901",
      email: "zipline@islandnook.com"
    }
  },
  {
    id: "5",
    title: "Mountain Summit Hike",
    description: "Reach the highest peak on the island with panoramic views of the entire archipelago. This challenging hike takes you through diverse ecosystems, past historical sites, and to the summit where you'll be rewarded with 360-degree views.",
    image: "https://images.unsplash.com/photo-1640244676144-63c901998a83?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.8,
    price: "$55",
    duration: "8 hours",
    difficulty: "Challenging",
    location: "Central Highlands",
    category: "Hiking",
    included: [
      "Professional guide",
      "Hiking poles",
      "Lunch and snacks",
      "Transportation",
      "First aid kit"
    ],
    requirements: [
      "Excellent physical fitness",
      "Hiking boots",
      "Weather-appropriate clothing",
      "2L water minimum",
      "Backpack"
    ],
    schedule: {
      start: "6:00 AM",
      end: "2:00 PM",
      days: "Monday - Saturday"
    },
    contact: {
      phone: "(670) 238-9012",
      email: "hiking@islandnook.com"
    }
  },
  {
    id: "6",
    title: "Coral Reef Snorkeling",
    description: "Discover vibrant coral reefs and tropical fish in this guided snorkeling experience. Explore the underwater world of the Marianas, home to some of the most diverse marine life in the Pacific. Perfect for families and beginners.",
    image: "https://images.unsplash.com/photo-1687707939240-2a1ff390459a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    rating: 4.7,
    price: "$45",
    duration: "3 hours",
    difficulty: "Beginner",
    location: "Marine Sanctuary",
    category: "Water Sports",
    included: [
      "Professional guide",
      "Snorkeling equipment",
      "Life jacket",
      "Underwater camera",
      "Refreshments"
    ],
    requirements: [
      "Basic swimming ability",
      "Swimsuit",
      "Sunscreen",
      "Towel",
      "Change of clothes"
    ],
    schedule: {
      start: "9:00 AM",
      end: "12:00 PM",
      days: "Daily"
    },
    contact: {
      phone: "(670) 239-0123",
      email: "snorkel@islandnook.com"
    }
  }
];

const AdventureDetails = () => {
  const { id } = useParams();
  const adventure = mockAdventures.find(a => a.id === id);

  if (!adventure) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Adventure Not Found</h1>
            <p className="text-gray-600">The adventure you're looking for doesn't exist.</p>
          </div>
        </main>
      </div>
    );
  }

  // Get icon for adventure category
  const getCategoryIcon = (category: string) => {
    switch(category.toLowerCase()) {
      case 'hiking':
        return <Mountain size={18} />;
      case 'diving':
        return <Anchor size={18} />;
      case 'beach':
        return <Waves size={18} />;
      case 'adventure':
        return <Compass size={18} />;
      case 'tour':
        return <Plane size={18} />;
      case 'historical':
        return <History size={18} />;
      default:
        return <Bike size={18} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20 md:pt-[0.2rem] pb-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li><a href="/adventures" className="hover:text-gray-900">Adventures</a></li>
              <li>/</li>
              <li className="text-gray-900">{adventure.title}</li>
            </ol>
          </nav>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Adventure Image */}
            <div className="relative">
              <AspectRatio ratio={4/3}>
                <img 
                  src={adventure.image} 
                  alt={adventure.title} 
                  className="object-cover w-full h-full rounded-lg"
                />
              </AspectRatio>
              <div className="absolute top-4 right-4">
                <FavoriteButton 
                  id={adventure.id}
                  type="adventure"
                  className="bg-white rounded-full p-2 shadow-lg"
                />
              </div>
            </div>

            {/* Adventure Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{adventure.title}</h1>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center bg-gray-100 px-3 py-1 rounded-full">
                    <Star className="w-4 h-4 text-yellow-500 mr-1" />
                    <span>{adventure.rating}</span>
                  </div>
                  <span className="text-gray-600">{adventure.category}</span>
                  <span className="text-gray-600">{adventure.price}</span>
                </div>
              </div>

              <p className="text-gray-700 text-lg">{adventure.description}</p>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Adventure Details</h2>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Location</p>
                      <p className="text-gray-600">{adventure.location}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Clock className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium text-gray-900">Duration & Schedule</p>
                      <p className="text-gray-600">{adventure.duration}</p>
                      <p className="text-gray-600">{adventure.schedule.days}</p>
                      <p className="text-gray-600">{adventure.schedule.start} - {adventure.schedule.end}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">What's Included</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {adventure.included.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Requirements</h2>
                <ul className="list-disc list-inside space-y-2 text-gray-600">
                  {adventure.requirements.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-4 pt-6">
                <button className="flex-1 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors">
                  Book Now
                </button>
                <button className="flex-1 border border-gray-900 text-gray-900 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export { AdventureDetails as default }; 