import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, Car, Building, Calendar, Landmark, User, LogIn, Store, Utensils, ShoppingCart, ChevronDown, Package, Search, X, Heart, Plane, Home, Briefcase, Wrench, ShoppingBag, Star, List, Settings } from 'lucide-react';
import { useNavigationClick } from '@/hooks/useNavigationClick';
import { Button } from "@/components/ui/button";
import { createPortal } from 'react-dom';
import SettingsModal from './SettingsModal';

// Cookie utility functions
const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

// Define the link type
interface NavLink {
  to: string;
  icon: React.ReactNode;
  label: string;
  subItems?: NavLink[];
}

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [dropdownTimeout, setDropdownTimeout] = useState<NodeJS.Timeout | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [hasCheckedFirstTime, setHasCheckedFirstTime] = useState(false);
  const location = useLocation();
  const { handleNavigationClick } = useNavigationClick();

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

  // Cleanup dropdown timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeout) {
        clearTimeout(dropdownTimeout);
      }
    };
  }, [dropdownTimeout]);

  // Check if this is the first time visiting the website
  useEffect(() => {
    if (!hasCheckedFirstTime) {
      const hasVisitedBefore = getCookie('hasVisitedBefore');
      if (hasVisitedBefore === null) {
        // First time visitor - show settings modal after a short delay
        const timer = setTimeout(() => {
          setIsSettingsOpen(true);
        }, 1000); // Show after 1 second
        
        return () => clearTimeout(timer);
      }
      setHasCheckedFirstTime(true);
    }
  }, [hasCheckedFirstTime]);

  // Determine if a link is active
  const isActive = (path: string) => {
    // For parent routes (like /hotels), check if current path starts with it
    // This will keep the parent route highlighted when viewing its children
    if (path !== '/') {
      return location.pathname.startsWith(path);
    }
    // For home route, only highlight when exactly on home
    return location.pathname === path;
  };

  // Handle dropdown mouse enter with delay
  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout) {
      clearTimeout(dropdownTimeout);
      setDropdownTimeout(null);
    }
    setActiveDropdown(label);
  };

  // Handle dropdown mouse leave with delay
  const handleDropdownLeave = () => {
    const timeout = setTimeout(() => {
      setActiveDropdown(null);
    }, 500); // 500ms delay - increased for better UX
    setDropdownTimeout(timeout);
  };

  // Main navigation menu based on the image structure
  const mainNavItems: NavLink[] = [
    { 
      to: "/virtual-tour", 
      icon: <Plane size={16} />, 
      label: "Virtual Tour" 
    },
    { 
      to: "/hotels", 
      icon: <Building size={16} />, 
      label: "Hotel",
      subItems: [
        { to: "/hotels/rent", icon: <Home size={16} />, label: "Rent" },
        { to: "/hotels/buy-sell", icon: <Store size={16} />, label: "Buy & Sell" },
        { to: "/hotels/taxi", icon: <Car size={16} />, label: "Taxi" }
      ]
    },
    { 
      to: "/vehicles", 
      icon: <Car size={16} />, 
      label: "Cars" 
    },
    { 
      to: "/food", 
      icon: <Utensils size={16} />, 
      label: "Food",
      subItems: [
        { to: "/food/restaurants", icon: <Utensils size={16} />, label: "Restaurant" },
        { to: "/food/bars", icon: <Store size={16} />, label: "Bar & Grill" },
        { to: "/food/groceries", icon: <ShoppingBag size={16} />, label: "Groceries" }
      ]
    },
    { 
      to: "/experiences", 
      icon: <Star size={16} />, 
      label: "Experiences",
      subItems: [
                 { to: "/events", icon: <Calendar size={16} />, label: "Events" },
        { to: "/experiences/cultural", icon: <Landmark size={16} />, label: "Cultural Activities" },
        { to: "/experiences/adventures", icon: <Map size={16} />, label: "Outdoor Adventures" },
                 { to: "/shopping", icon: <ShoppingCart size={16} />, label: "Shopping" }
      ]
    },
         { 
       to: "/buy-and-sell", 
       icon: <Package size={16} />, 
       label: "Buy & Sell",
      subItems: [
                 { to: "/local-products", icon: <Store size={16} />, label: "Local Products" },
                 { to: "/properties", icon: <Home size={16} />, label: "Homes & Real Estate" },
                 { to: "/vehicles", icon: <Car size={16} />, label: "Cars" },
        { to: "/buy-sell/everyday", icon: <ShoppingBag size={16} />, label: "Everyday Items" },
                 { to: "/shopping", icon: <ShoppingCart size={16} />, label: "Shopping" }
      ]
    },
    { 
      to: "/services", 
      icon: <Wrench size={16} />, 
      label: "Services",
      subItems: [
        { to: "/services/emergency", icon: <Briefcase size={16} />, label: "Emergency & Medical" },
        { to: "/government-services", icon: <Landmark size={16} />, label: "Government" },
        { to: "/businesses", icon: <Building size={16} />, label: "Local Businesses" }
      ]
    }
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[40] transition-all duration-300 shadow-sm bg-white ${
          scrolled ? 'glass-nav py-2' : 'py-3'
        }`}
      >
        <div className="container mx-auto px-4">
          {/* Single Row Navigation */}
          <div className="flex items-center justify-between py-3">
            {/* Logo */}
            <div className="flex items-center">
              <Link 
                to="/" 
                className="font-bold text-xl tracking-tight hover:opacity-80 transition-all-300 flex items-center"
              >
                <span className="sr-only">CNMI Central Directory</span>
                <span className="inline-block">
                  <span className="text-gray-900">CNMI</span>
                  <span className="text-gray-600">Central</span>
                </span>
              </Link>
            </div>
            
            {/* Main Navigation Links */}
            <div className="hidden md:flex items-center space-x-6">
              {mainNavItems.map((item) => (
                <div key={item.to} className="relative group">
                  <div
                    className="relative"
                    onMouseEnter={() => handleDropdownEnter(item.label)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    <button
                      onClick={() => handleNavigationClick(item.to)}
                      className="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md text-sm font-medium transition-all-300 flex items-center space-x-1"
                    >
                      {item.icon}
                      <span>{item.label}</span>
                      {item.subItems && <ChevronDown size={14} className="ml-1" />}
                    </button>
                    
                    {/* Dropdown for sub-items */}
                    {item.subItems && activeDropdown === item.label && (
                      <>
                        {/* Transparent bridge to prevent gap */}
                        <div className="absolute top-full left-0 w-full h-2 bg-transparent" />
                        <div className="absolute top-full left-0 mt-0 bg-white border border-gray-200 rounded-md shadow-lg py-2 min-w-[200px] z-50">
                          {item.subItems.map((subItem) => (
                            <Link
                              key={subItem.to}
                              to={subItem.to}
                              className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 text-sm"
                            >
                              {subItem.icon}
                              <span>{subItem.label}</span>
                            </Link>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
            
            {/* Settings and Auth links - Right */}
            <div className="hidden md:flex items-center space-x-2">
              {/* Settings Icon */}
              <button
                onClick={() => setIsSettingsOpen(true)}
                className="p-2 text-gray-600 hover:text-blue-600 hover:bg-gray-100 rounded-full transition-all-300"
                title="Settings"
              >
                <Settings size={18} />
              </button>
              
              <Link to="/login" className="px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-full text-sm flex items-center transition-all-300">
                <LogIn size={16} className="mr-1" />
                <span>Login</span>
              </Link>
              <Link to="/signup" className="px-3 py-2 bg-gray-900 text-white rounded-full text-sm flex items-center transition-all-300 hover:bg-gray-800">
                <User size={16} className="mr-1" />
                <span>Sign Up</span>
              </Link>
            </div>
            
            {/* Mobile Navigation */}
            <div className="md:hidden">
              <MobileMenu navItems={mainNavItems} />
            </div>
          </div>
        </div>
      </header>
      {/* Add a spacer div to prevent content from being hidden under the fixed header */}
      <div className="h-[80px] hidden md:block"></div>
      
             {/* Settings Modal */}
       <SettingsModal 
         isOpen={isSettingsOpen} 
         onClose={() => setIsSettingsOpen(false)} 
         isFirstTime={!hasCheckedFirstTime && getCookie('hasVisitedBefore') === null}
       />
    </>
  );
};

// Mobile Menu Component
const MobileMenu = ({ 
  navItems
}: { 
  navItems: NavLink[]
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  
  // Disable body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // Cleanup function to restore scroll when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Toggle expanded state for items with sub-items
  const toggleExpanded = (label: string) => {
    setExpandedItems(prev => 
      prev.includes(label) 
        ? prev.filter(item => item !== label)
        : [...prev, label]
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="p-2 rounded-md text-gray-700 hover:bg-gray-100 transition-all-300"
        aria-expanded={isMobileMenuOpen}
      >
        <span className="sr-only">Open menu</span>
        <div className="w-5 flex flex-col gap-1">
          <span className={`block h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block h-0.5 bg-current transition-all duration-300 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block h-0.5 bg-current transform transition-all duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </div>
      </button>
      {/* Mobile Menu Overlay rendered in a Portal */}
      {isMobileMenuOpen && createPortal(
        <div
          className={`fixed inset-0 bg-white z-[99999] transition-transform duration-300 ease-in-out ${
            isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <X className="h-6 w-6" />
                </button>
                <span className="text-lg font-semibold">Menu</span>
              </div>
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setIsSettingsOpen(true)}
                  className="text-gray-600 hover:text-gray-900"
                  title="Settings"
                >
                  <Settings className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="text-gray-600 hover:text-gray-900"
                >
                  <Search className="h-6 w-6" />
                </button>
                <Link
                  to="/favorites"
                  className="text-gray-600 hover:text-gray-900"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart className="h-6 w-6" />
                </Link>
              </div>
            </div>

            {/* Auth Links */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
              <div className="flex items-center justify-center space-x-3">
                <Link 
                  to="/login" 
                  className="flex-1 px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg text-sm font-medium text-center hover:bg-gray-50 transition-all-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <LogIn size={16} className="inline mr-2" />
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className="flex-1 px-4 py-2 bg-gray-900 text-white rounded-lg text-sm font-medium text-center hover:bg-gray-800 transition-all-300"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <User size={16} className="inline mr-2" />
                  Sign Up
                </Link>
              </div>
            </div>
            
            {/* Settings Link */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
              <button
                onClick={() => {
                  setIsSettingsOpen(true);
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg text-sm font-medium text-center hover:bg-gray-50 transition-all-300 flex items-center justify-center"
              >
                <Settings size={16} className="mr-2" />
                Settings
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto">
              <nav className="px-4 py-3">
                <ul className="space-y-2">
                  {navItems.map((item) => (
                    <li key={item.to}>
                      <div>
                        <Link
                          to={item.to}
                          className="flex items-center justify-between w-full px-3 py-2 text-gray-900 hover:text-blue-600 rounded-md hover:bg-gray-50"
                          onClick={() => {
                            if (!item.subItems) {
                              setIsMobileMenuOpen(false);
                            }
                          }}
                        >
                          <div className="flex items-center space-x-3">
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                          </div>
                          {item.subItems && (
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                toggleExpanded(item.label);
                              }}
                              className="p-1"
                            >
                              <ChevronDown 
                                size={16} 
                                className={`transition-transform ${
                                  expandedItems.includes(item.label) ? 'rotate-180' : ''
                                }`}
                              />
                            </button>
                          )}
                        </Link>
                        
                        {/* Sub-items */}
                        {item.subItems && expandedItems.includes(item.label) && (
                          <ul className="ml-6 mt-2 space-y-1">
                            {item.subItems.map((subItem) => (
                              <li key={subItem.to}>
                                <Link
                                  to={subItem.to}
                                  className="flex items-center space-x-3 px-3 py-2 text-gray-600 hover:text-blue-600 text-sm"
                                  onClick={() => setIsMobileMenuOpen(false)}
                                >
                                  <span>{subItem.icon}</span>
                                  <span>{subItem.label}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};

export default Navigation;
