import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoadingScreen from './LoadingScreen';

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const location = useLocation();

  const shouldShowLoadingScreen = () => {
    // Get settings from localStorage
    const savedSettings = localStorage.getItem('lightboxSettings');
    if (!savedSettings) return false; // Default to not showing

    const settings = JSON.parse(savedSettings);
    
    // Check if lightbox is globally disabled
    if (settings.disableLightbox) return false;

    // Check if URL contains disable parameter
    if (settings.disableParameter) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has(settings.disableParameter)) return false;
    }

    // Only show loading screen if it was triggered by a navigation click
    const navigationSource = sessionStorage.getItem('navigationSource');
    if (navigationSource === 'click') {
      sessionStorage.removeItem('navigationSource');
      return true;
    }

    return false;
  };

  useEffect(() => {
    if (shouldShowLoadingScreen()) {
      setIsLoading(true);
      
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <>
      {isLoading && <LoadingScreen onContinue={() => setIsLoading(false)} />}
      {children}
    </>
  );
};

export default PageTransition; 