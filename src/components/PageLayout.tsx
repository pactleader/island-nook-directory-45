import { ReactNode } from 'react';
import Navigation from './Navigation';
import Footer from './Footer';
import SupportChat from './SupportChat';
import AdBanner from './AdBanner';
import ScrollToTop from './ScrollToTop';
import { useScrollToTop } from '@/hooks/useScrollToTop';

interface PageLayoutProps {
  children: ReactNode;
}

const PageLayout = ({ children }: PageLayoutProps) => {
  // Add auto-scroll to top on page change
  useScrollToTop();

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="flex-grow">
        {children}
      </div>
      <Footer />
      <SupportChat />
      <AdBanner />
      <ScrollToTop />
    </div>
  );
};

export default PageLayout;
