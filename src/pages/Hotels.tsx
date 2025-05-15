import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import SearchFilters from '../components/SearchFilters';
import { FavoriteButton } from '../components/FavoriteButton';

// Mock data for hotels
const mockHotels = [
  {
    id: "hotel-1",
    name: "Oceanview Hotel & Resort",
    description: "Luxury resort with stunning ocean views, private beach access, and world-class dining.",
    imageUrl: "https://images.unsplash.com/photo-1566073771259-6a690aa3dc54?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    pricePerNight: 250,
    rating: 4.5,
    reviews: 120,
    location: { village: "Garapan", island: "Saipan" },
    specialOffer: "15% off for stays longer than 5 nights"
  },
  {
    id: "hotel-2",
    name: "Pacific Island Inn",
    description: "Cozy inn located in the heart of the city, offering comfortable rooms and a convenient location.",
    imageUrl: "https://images.unsplash.com/photo-1598228723793-52b585b4a67e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    pricePerNight: 120,
    rating: 4.2,
    reviews: 85,
    location: { village: "Susupe", island: "Saipan" }
  },
  {
    id: "hotel-3",
    name: "Tinian Diamond Hotel",
    description: "Elegant hotel on Tinian offering luxurious accommodations and breathtaking views.",
    imageUrl: "https://images.unsplash.com/photo-1568495286054-8905fa401902?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1548&q=80",
    pricePerNight: 180,
    rating: 4.0,
    reviews: 60,
    location: { village: "San Jose", island: "Tinian" },
    specialOffer: "Free breakfast included"
  },
  {
    id: "hotel-4",
    name: "Rota Resort & Country Club",
    description: "Secluded resort on Rota with a golf course, spa, and private beach.",
    imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    pricePerNight: 220,
    rating: 4.3,
    reviews: 95,
    location: { village: "Songsong", island: "Rota" }
  },
  {
    id: "hotel-5",
    name: "Serenity Sands Inn",
    description: "Budget-friendly inn offering comfortable rooms and a relaxing atmosphere.",
    imageUrl: "https://images.unsplash.com/photo-1560414262-5140819a8c4d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    pricePerNight: 90,
    rating: 3.8,
    reviews: 50,
    location: { village: "Garapan", island: "Saipan" }
  },
  {
    id: "hotel-6",
    name: "CNMI Grand Hotel",
    description: "Modern hotel with spacious rooms, a rooftop pool, and stunning city views.",
    imageUrl: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80",
    pricePerNight: 150,
    rating: 4.1,
    reviews: 70,
    location: { village: "Susupe", island: "Saipan" },
    specialOffer: "Complimentary airport shuttle"
  }
];

// Filter options
const filterGroups = [
  {
    name: "Price Range",
    options: [
      { label: "Under $100", value: "under100" },
      { label: "$100 - $200", value: "100-200" },
      { label: "Over $200", value: "over200" },
    ],
  },
  {
    name: "Rating",
    options: [
      { label: "4 Stars & Up", value: "4stars" },
      { label: "3 Stars & Up", value: "3stars" },
    ],
  },
  {
    name: "Location",
    options: [
      { label: "Saipan", value: "saipan" },
      { label: "Tinian", value: "tinian" },
      { label: "Rota", value: "rota" },
    ],
  },
];

// Hotel card component
const HotelCard = ({ hotel }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative">
      <Link to={`/hotels/${hotel.id}`} className="block">
        <div className="relative">
          <img 
            src={hotel.imageUrl} 
            alt={hotel.name} 
            className="w-full h-48 object-cover"
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-4">
            <div className="flex items-center text-white">
              <span className="font-bold text-lg">${hotel.pricePerNight}</span>
              <span className="text-sm ml-1">/ night</span>
            </div>
          </div>
          {hotel.specialOffer && (
            <div className="absolute top-3 left-3 bg-red-600 text-white text-xs font-semibold px-2 py-1 rounded">
              {hotel.specialOffer}
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400 mr-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg 
                  key={i} 
                  className={`w-4 h-4 ${i < Math.floor(hotel.rating) ? 'text-yellow-400' : 'text-gray-300'}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="text-gray-600 text-sm">({hotel.reviews} reviews)</span>
          </div>
          <h3 className="font-bold text-lg mb-1">{hotel.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-2">{hotel.description}</p>
          <div className="flex items-center text-gray-500 text-sm">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>{hotel.location.village}, {hotel.location.island}</span>
          </div>
        </div>
      </Link>
      <div className="absolute top-3 right-3">
        <FavoriteButton 
          id={hotel.id}
          type="hotel"
          className="bg-white rounded-full p-1.5 shadow"
        />
      </div>
    </div>
  );
};

const Hotels = () => {
  const handleSearch = (search: string, filters: Record<string, string | string[]>) => {
    console.log("Search term:", search);
    console.log("Filters:", filters);
    // Here you would implement the actual filtering logic
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />

      <Hero
        title="Find the Perfect Hotel"
        subtitle="Discover the best hotels and resorts in the Northern Mariana Islands"
        buttonText="Explore Now"
        buttonLink="/properties"
        backgroundImage="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
        size="medium"
      />

      <main className="flex-1 py-10">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Hotels</h1>
            <SearchFilters
              title="Filter Hotels"
              placeholder="Search for hotels..."
              filterGroups={filterGroups}
              onSearch={handleSearch}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {mockHotels.map(hotel => (
              <HotelCard key={hotel.id} hotel={hotel} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Hotels;
