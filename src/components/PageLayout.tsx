
import { useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';
import AdLoadingScreen from './AdLoadingScreen';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  const [showLoading, setShowLoading] = useState(false);
  const location = useLocation();

  // Check if ad should be shown based on URL and settings
  useEffect(() => {
    // Get settings from localStorage
    const isEnabled = localStorage.getItem("lightbox_enabled") !== "false";
    const directoryOnly = localStorage.getItem("lightbox_directory_only") === "true";
    const disableParams = localStorage.getItem("lightbox_disable_params") || "";
    
    // Check if URL contains any of the disable parameters
    const currentUrl = window.location.href.toLowerCase();
    const disableTerms = disableParams.split(",").map(param => param.trim().toLowerCase());
    const shouldDisableByParam = disableTerms.some(term => term && currentUrl.includes(term));
    
    // Check if this is a directory detail page (typically contains ID parameter)
    const isDetailPage = /\/(properties|vehicles|businesses|hotels|events)\/\d+/.test(location.pathname);
    
    // Determine if we should show the ad
    const shouldShowAd = isEnabled && 
                        !shouldDisableByParam && 
                        (!directoryOnly || isDetailPage);
    
    setShowLoading(shouldShowAd);
  }, [location.pathname]);
  
  const handleContinue = () => {
    setShowLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {showLoading && <AdLoadingScreen onComplete={handleContinue} />}
      <Navigation />
      <div className="flex-grow pt-28">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
