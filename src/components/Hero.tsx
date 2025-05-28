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
      case 'small': return 'h-[25vh] min-h-[250px]';
      case 'medium': return 'h-[40vh] min-h-[350px]';
      case 'large': return 'h-[60vh] min-h-[450px]';
      default: return 'h-[60vh] min-h-[450px]';
    }
  };
  
  return (
    <div 
      className={`relative w-full overflow-hidden ${getHeight()} flex items-center justify-center z-0`}
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
      <div className="relative z-10 container mx-auto px-4 text-center mt-20 md:mt-0">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4">{title}</h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto">
            {subtitle}
          </p>
        )}
        
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
