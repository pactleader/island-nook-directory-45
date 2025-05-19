import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface HeroProps {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonLink?: string;
  backgroundImage?: string;
  overlayOpacity?: number;
  size?: 'small' | 'medium' | 'large';
}

const Hero = ({
  title,
  subtitle,
  buttonText,
  buttonLink = '/',
  backgroundImage = 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
  overlayOpacity = 0.5,
  size = 'large'
}: HeroProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // Categories and subcategories for autofill
  const suggestions = [
    "Hotels & Accommodations",
    "Food & Dining",
    "Local Products",
    "Transportation",
    "Adventure Activities",
    "Shopping",
    "Government Services",
    "Events & Festivals",
    "Properties for Sale",
    "Properties for Rent",
    "Vehicle Sales",
    "Business Services"
  ];
  
  const filteredSuggestions = suggestions.filter(
    suggestion => suggestion.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Preload image
  useEffect(() => {
    const img = new Image();
    img.src = backgroundImage;
    img.onload = () => setImageLoaded(true);
  }, [backgroundImage]);
  
  // Determine hero height based on size
  const getHeight = () => {
    switch(size) {
      case 'small': return 'h-[30vh] min-h-[300px]';
      case 'medium': return 'h-[50vh] min-h-[400px]';
      case 'large': return 'h-[80vh] min-h-[600px]';
      default: return 'h-[80vh] min-h-[600px]';
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      // If the search term matches a category/subcategory, navigate to that page
      const matchedSuggestion = suggestions.find(
        s => s.toLowerCase() === searchTerm.toLowerCase()
      );
      
      if (matchedSuggestion) {
        // Handle navigation to the appropriate page
        console.log(`Navigating to: ${matchedSuggestion}`);
      } else {
        // Show "Ask a local" or "Talk to AI assistant" options
        console.log('Showing assistance options');
      }
    }
    setShowSuggestions(false);
  };
  
  return (
    <div 
      className={`relative w-full overflow-hidden ${getHeight()} flex items-center justify-center`}
    >
      {/* Background Image with Lazy Loading */}
      <div 
        className={`absolute inset-0 bg-cover bg-center transform scale-105 transition-all duration-1000 ${
          imageLoaded ? 'blur-0 scale-100' : 'blur-xl'
        }`}
        style={{ 
          backgroundImage: `url(${backgroundImage})`,
          opacity: imageLoaded ? 1 : 0,
          transition: 'opacity 1.5s ease-in-out, transform 2s ease-out, filter 1.5s ease-in'
        }}
      ></div>
      
      {/* Gradient Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/60"
        style={{ opacity: overlayOpacity }}
      ></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        
        {/* Search Bar */}
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSearchSubmit} className="relative">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                onFocus={() => setShowSuggestions(true)}
                placeholder="Search categories, services, or ask a question..."
                className="w-full px-6 py-4 rounded-full text-lg bg-white/95 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors"
              >
                <Search size={20} />
              </button>
            </div>
            
            {/* Search Suggestions */}
            {showSuggestions && searchTerm && (
              <div className="absolute w-full mt-2 bg-white rounded-lg shadow-lg overflow-hidden z-20">
                {filteredSuggestions.length > 0 ? (
                  <ul>
                    {filteredSuggestions.map((suggestion, index) => (
                      <li
                        key={index}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                        onClick={() => {
                          setSearchTerm(suggestion);
                          setShowSuggestions(false);
                        }}
                      >
                        {suggestion}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-3 text-gray-500">
                    <p className="mb-2">Need help finding what you're looking for?</p>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
                        onClick={() => console.log('Ask a local')}
                      >
                        Ask a Local
                      </button>
                      <button
                        type="button"
                        className="px-4 py-2 bg-green-100 text-green-700 rounded-md hover:bg-green-200"
                        onClick={() => console.log('Talk to AI')}
                      >
                        Talk to AI Assistant
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </form>
        </div>
        
        {buttonText && (
          <div className="mt-8">
            <Link
              to={buttonLink}
              className="inline-block bg-white text-gray-900 px-8 py-3 rounded-full font-medium hover:bg-gray-100 transition-colors"
            >
              {buttonText}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
