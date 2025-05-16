
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
      case 'large': return 'h-[80vh] min-h-[500px]';
      default: return 'h-[80vh] min-h-[500px]';
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setShowSuggestions(true);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log(`Search submitted: ${searchTerm}`);
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
        <div className="max-w-3xl mx-auto">
          <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-slide-down opacity-0" style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}>
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-white text-xl md:text-2xl opacity-90 mb-8 max-w-xl mx-auto animate-slide-down opacity-0" style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              {subtitle}
            </p>
          )}
          
          {/* New Search Bar */}
          <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
            <form onSubmit={handleSearchSubmit} className="relative mx-auto max-w-2xl">
              <div className="flex">
                <div className="relative flex-grow">
                  <Input
                    type="search"
                    placeholder="Search for anything across the Northern Mariana Islands..."
                    className="py-6 pr-12 pl-5 w-full rounded-l-full text-base bg-white shadow-xl border-0"
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    onFocus={() => setShowSuggestions(true)}
                  />
                  {showSuggestions && searchTerm && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-xl z-10 text-left max-h-60 overflow-y-auto">
                      {filteredSuggestions.length > 0 ? (
                        filteredSuggestions.map((suggestion, index) => (
                          <div 
                            key={index} 
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-gray-800"
                            onClick={() => {
                              setSearchTerm(suggestion);
                              setShowSuggestions(false);
                            }}
                          >
                            {suggestion}
                          </div>
                        ))
                      ) : (
                        <div className="px-4 py-3 text-gray-600">
                          <div className="font-medium mb-1">No direct matches found.</div>
                          <div className="flex flex-col gap-2">
                            <button 
                              type="button" 
                              onClick={() => {
                                setSearchTerm('');
                                setShowSuggestions(false);
                                window.location.href = '/ask-local';
                              }}
                              className="text-left hover:bg-gray-100 p-2 rounded"
                            >
                              Ask a local about "{searchTerm}"
                            </button>
                            <button 
                              type="button" 
                              onClick={() => {
                                setSearchTerm('');
                                setShowSuggestions(false);
                                console.log('Talk to AI assistant');
                              }}
                              className="text-left hover:bg-gray-100 p-2 rounded"
                            >
                              Talk to our AI assistant
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
                <Button 
                  type="submit" 
                  className="py-6 px-6 rounded-r-full bg-gray-900 hover:bg-gray-800 text-white"
                >
                  <Search size={20} />
                  <span className="ml-2">Search</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
