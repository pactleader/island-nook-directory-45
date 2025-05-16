
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

  // Show loading screen on route changes
  useEffect(() => {
    setShowLoading(true);
  }, [location.pathname]);
  
  const handleContinue = () => {
    setShowLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {showLoading && <AdLoadingScreen onComplete={handleContinue} />}
      <Navigation />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
