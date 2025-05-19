import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useNavigationClick = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const shouldShowLoadingScreen = () => {
    const savedSettings = localStorage.getItem('lightboxSettings');
    if (!savedSettings) return true;

    const settings = JSON.parse(savedSettings);
    
    // Check if lightbox is globally disabled
    if (settings.disableLightbox) return false;

    // Check if URL contains disable parameter
    if (settings.disableParameter) {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has(settings.disableParameter)) return false;
    }

    return true;
  };

  const handleNavigationClick = (path: string) => {
    // Set navigation source to 'click' in sessionStorage
    sessionStorage.setItem('navigationSource', 'click');
    if (shouldShowLoadingScreen()) {
      setIsLoading(true);
      setTimeout(() => {
        navigate(path);
        setIsLoading(false);
      }, 3000);
    } else {
      navigate(path);
    }
  };

  return {
    isLoading,
    handleNavigationClick
  };
}; 