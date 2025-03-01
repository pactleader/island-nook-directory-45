
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

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
          
          {/* Display the dual buttons for visitor and local if buttonText is not explicitly provided */}
          {!buttonText ? (
            <div className="flex flex-col sm:flex-row justify-center gap-4 animate-slide-up opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
              <Link
                to="/properties"
                className="inline-block px-6 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                Search as a Visitor
              </Link>
              <Link
                to="/properties"
                className="inline-block px-6 py-3 bg-gray-900 text-white font-medium rounded-md hover:bg-gray-800 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
              >
                Search as a Local
              </Link>
            </div>
          ) : (
            buttonText && (
              <div className="animate-slide-up opacity-0" style={{ animationDelay: '0.9s', animationFillMode: 'forwards' }}>
                <Link
                  to={buttonLink}
                  className="inline-block px-6 py-3 bg-white text-gray-900 font-medium rounded-md hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-lg"
                >
                  {buttonText}
                </Link>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Hero;
