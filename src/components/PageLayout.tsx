
import { ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import Navigation from './Navigation';
import Footer from './Footer';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="flex-grow pt-28">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default PageLayout;
