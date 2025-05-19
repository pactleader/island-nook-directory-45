import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const useLoadingScreen = () => {
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

    // Check if we should show on listing clicks
    if (!settings.showOnListingClick) return false;

    return true;
  };

  const handleListingClick = (path: string) => {
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
    handleListingClick
  };
}; 