
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Map, Car, Building, List } from 'lucide-react';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  
  // Handle scroll effect for navigation
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="font-bold text-xl tracking-tight hover:opacity-80 transition-all-300 flex items-center"
          >
            <span className="sr-only">Island Nook Directory</span>
            <span className="inline-block">
              <span className="text-gray-900">Island</span>
              <span className="text-gray-600">Nook</span>
            </span>
          </Link>
          
          {/* Main Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <NavLink to="/" icon={<Home size={16} />} label="Home" isActive={isActive('/')} />
            <NavLink to="/properties" icon={<Map size={16} />} label="Properties" isActive={isActive('/properties')} />
            <NavLink to="/vehicles" icon={<Car size={16} />} label="Vehicles" isActive={isActive('/vehicles')} />
            <NavLink to="/businesses" icon={<Building size={16} />} label="Businesses" isActive={isActive('/businesses')} />
            <NavLink to="/blog" icon={<List size={16} />} label="Blog" isActive={isActive('/blog')} />
          </nav>
          
          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileMenu />
          </div>
        </div>
      </div>
    </header>
  );
};

// NavLink Component
const NavLink = ({ to, icon, label, isActive }: { to: string, icon: React.ReactNode, label: string, isActive: boolean }) => {
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded-full text-sm font-medium transition-all-300 flex items-center space-x-1 ${
        isActive 
          ? 'bg-gray-900 text-white' 
          : 'text-gray-700 hover:bg-gray-100'
      }`}
    >
      {icon}
      <span>{label}</span>
    </Link>
  );
};

// Mobile Menu Component
const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-all-300"
        aria-expanded={isOpen}
      >
        <span className="sr-only">Open menu</span>
        <div className="w-5 flex flex-col gap-1">
          <span className={`block h-0.5 bg-current transform transition-all duration-300 ${isOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block h-0.5 bg-current transition-all duration-300 ${isOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block h-0.5 bg-current transform transition-all duration-300 ${isOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </div>
      </button>
      
      {/* Mobile Menu Panel */}
      <div 
        className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 flex justify-between items-center border-b">
            <span className="font-bold text-xl">
              <span className="text-gray-900">Island</span>
              <span className="text-gray-600">Nook</span>
            </span>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              <span className="sr-only">Close menu</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-4">
              <MobileNavLink to="/" icon={<Home size={18} />} label="Home" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/properties" icon={<Map size={18} />} label="Properties" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/vehicles" icon={<Car size={18} />} label="Vehicles" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/businesses" icon={<Building size={18} />} label="Businesses" onClick={() => setIsOpen(false)} />
              <MobileNavLink to="/blog" icon={<List size={18} />} label="Blog" onClick={() => setIsOpen(false)} />
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

// Mobile NavLink Component
const MobileNavLink = ({ to, icon, label, onClick }: { to: string, icon: React.ReactNode, label: string, onClick: () => void }) => {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all-300"
      >
        <span className="text-gray-500">{icon}</span>
        <span className="font-medium">{label}</span>
      </Link>
    </li>
  );
};

export default Navigation;
