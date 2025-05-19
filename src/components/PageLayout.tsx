
import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import SupportChat from './SupportChat';
import AdBanner from './AdBanner';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
      <SupportChat />
      <AdBanner />
    </div>
  );
};

export default PageLayout;
