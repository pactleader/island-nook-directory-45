
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, Car, Building, List, Calendar, Landmark, User, LogIn, Store, Utensils, ShoppingCart, ToggleLeft, ToggleRight, ChevronDown, Package } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/components/ui/toggle-group";

// Define the types of navigation modes
type NavMode = 'visitor' | 'local' | 'all';

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [navMode, setNavMode] = useState<NavMode>('visitor');
  const [selectedIsland, setSelectedIsland] = useState('All Islands');
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

  // Main navigation links configuration based on selected mode
  const getMainLinks = () => {
    if (navMode === 'visitor') {
      return [
        { to: "/hotels", icon: <Building size={16} />, label: "Hotels" },
        { to: "/food", icon: <Utensils size={16} />, label: "Food" },
        { to: "/adventures", icon: <Map size={16} />, label: "Adventures" },
        { to: "/vehicles", icon: <Car size={16} />, label: "Rides" },
        { to: "/shopping", icon: <ShoppingCart size={16} />, label: "Shopping" },
        { to: "/events", icon: <Calendar size={16} />, label: "Events" },
        { to: "/local-products", icon: <Store size={16} />, label: "Local Products" },
        { to: "/ask-local", icon: <List size={16} />, label: "Ask a Local" },
        { to: "/buy-and-sell", icon: <Package size={16} />, label: "Buy & Sell" },
      ];
    } else if (navMode === 'local') {
      return [
        { to: "/properties", icon: <Map size={16} />, label: "Homes" },
        { to: "/vehicles", icon: <Car size={16} />, label: "Cars" },
        { to: "/businesses", icon: <Building size={16} />, label: "Services" },
        { to: "/government-services", icon: <Landmark size={16} />, label: "Government" },
        { to: "/buy-and-sell", icon: <Package size={16} />, label: "Buy & Sell" },
        { to: "/events", icon: <Calendar size={16} />, label: "Events" },
        { to: "/food", icon: <Utensils size={16} />, label: "Food" },
        { to: "/ask-local", icon: <List size={16} />, label: "Ask a Local" },
      ];
    } else { // 'all' mode
      return [
        { to: "/properties", icon: <Map size={16} />, label: "Homes" },
        { to: "/vehicles", icon: <Car size={16} />, label: "Cars" },
        { to: "/hotels", icon: <Building size={16} />, label: "Hotels" },
        { to: "/food", icon: <Utensils size={16} />, label: "Food" },
        { to: "/businesses", icon: <Building size={16} />, label: "Services" },
        { to: "/adventures", icon: <Map size={16} />, label: "Adventures" },
        { to: "/shopping", icon: <ShoppingCart size={16} />, label: "Shopping" },
        { to: "/government-services", icon: <Landmark size={16} />, label: "Government" },
        { to: "/events", icon: <Calendar size={16} />, label: "Events" },
        { to: "/local-products", icon: <Store size={16} />, label: "Local Products" },
        { to: "/ask-local", icon: <List size={16} />, label: "Ask a Local" },
        { to: "/buy-and-sell", icon: <Package size={16} />, label: "Buy & Sell" },
      ];
    }
  };

  // List of islands for the dropdown
  const islands = ["All Islands", "Saipan", "Tinian", "Rota", "Northern Islands"];

  const mainLinks = getMainLinks();

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass-nav py-2' : 'bg-transparent py-3'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col">
          {/* Top Row: Logo, Toggles, Auth */}
          <div className="flex items-center justify-between py-2">
            {/* Logo */}
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
            
            {/* Mode Toggle and Island Dropdown - Center */}
            <div className="hidden md:flex items-center space-x-4">
              {/* New Toggle Group for three options */}
              <ToggleGroup type="single" value={navMode} onValueChange={(value) => value && setNavMode(value as NavMode)}>
                <ToggleGroupItem value="visitor" className="text-xs px-3 py-1 data-[state=on]:bg-gray-900 data-[state=on]:text-white border-gray-200">
                  Visitor
                </ToggleGroupItem>
                <ToggleGroupItem value="local" className="text-xs px-3 py-1 data-[state=on]:bg-gray-900 data-[state=on]:text-white border-gray-200">
                  Local
                </ToggleGroupItem>
                <ToggleGroupItem value="all" className="text-xs px-3 py-1 data-[state=on]:bg-gray-900 data-[state=on]:text-white border-gray-200">
                  All
                </ToggleGroupItem>
              </ToggleGroup>
              
              {/* Island Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100">
                  {selectedIsland}
                  <ChevronDown size={16} className="ml-2" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200 mt-1 min-w-[150px]">
                  {islands.map((island) => (
                    <DropdownMenuItem
                      key={island}
                      className="text-gray-700 hover:bg-gray-100 cursor-pointer"
                      onClick={() => setSelectedIsland(island)}
                    >
                      {island}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {/* Auth links - Right */}
            <div className="hidden md:flex items-center space-x-2">
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
              <MobileMenu navMode={navMode} setNavMode={setNavMode} islands={islands} selectedIsland={selectedIsland} setSelectedIsland={setSelectedIsland} />
            </div>
          </div>
          
          {/* Bottom Row: Main Navigation */}
          <div className="hidden md:flex justify-center border-t border-gray-100 pt-2 pb-1 overflow-x-auto">
            <nav className="flex items-center space-x-1 flex-wrap">
              {/* Main Navigation Links */}
              {mainLinks.map((link) => (
                <NavLink 
                  key={link.to}
                  to={link.to} 
                  icon={link.icon} 
                  label={link.label} 
                  isActive={isActive(link.to)} 
                />
              ))}
            </nav>
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
const MobileMenu = ({ navMode, setNavMode, islands, selectedIsland, setSelectedIsland }: 
  { navMode: NavMode, setNavMode: (mode: NavMode) => void, islands: string[], selectedIsland: string, setSelectedIsland: (island: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Define mobile navigation links based on mode
  const getMobileLinks = () => {
    if (navMode === 'visitor') {
      return [
        { to: "/hotels", icon: <Building size={18} />, label: "Hotels" },
        { to: "/food", icon: <Utensils size={18} />, label: "Food" },
        { to: "/adventures", icon: <Map size={18} />, label: "Adventures" },
        { to: "/vehicles", icon: <Car size={18} />, label: "Rides" },
        { to: "/shopping", icon: <ShoppingCart size={18} />, label: "Shopping" },
        { to: "/local-products", icon: <Store size={18} />, label: "Local Products" },
        { to: "/ask-local", icon: <List size={18} />, label: "Ask a Local" },
        { to: "/buy-and-sell", icon: <Package size={18} />, label: "Buy & Sell" },
        { to: "/events", icon: <Calendar size={18} />, label: "Events" },
      ];
    } else if (navMode === 'local') {
      return [
        { to: "/properties", icon: <Map size={18} />, label: "Homes" },
        { to: "/vehicles", icon: <Car size={18} />, label: "Cars" },
        { to: "/businesses", icon: <Building size={18} />, label: "Services" },
        { to: "/government-services", icon: <Landmark size={18} />, label: "Government" },
        { to: "/events", icon: <Calendar size={18} />, label: "Events" },
        { to: "/food", icon: <Utensils size={18} />, label: "Food" },
        { to: "/ask-local", icon: <List size={18} />, label: "Ask a Local" },
        { to: "/buy-and-sell", icon: <Package size={18} />, label: "Buy & Sell" },
      ];
    } else { // 'all' mode
      return [
        { to: "/properties", icon: <Map size={18} />, label: "Homes" },
        { to: "/vehicles", icon: <Car size={18} />, label: "Cars" },
        { to: "/hotels", icon: <Building size={18} />, label: "Hotels" },
        { to: "/food", icon: <Utensils size={18} />, label: "Food" },
        { to: "/adventures", icon: <Map size={18} />, label: "Adventures" },
        { to: "/shopping", icon: <ShoppingCart size={18} />, label: "Shopping" },
        { to: "/businesses", icon: <Building size={18} />, label: "Services" },
        { to: "/government-services", icon: <Landmark size={18} />, label: "Government" },
        { to: "/events", icon: <Calendar size={18} />, label: "Events" },
        { to: "/local-products", icon: <Store size={18} />, label: "Local Products" },
        { to: "/ask-local", icon: <List size={18} />, label: "Ask a Local" },
        { to: "/buy-and-sell", icon: <Package size={18} />, label: "Buy & Sell" },
      ];
    }
  };

  const mobileLinks = getMobileLinks();

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
              <span className="text-gray-900">CNMI</span>
              <span className="text-gray-600">Central</span>
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
          
          {/* Mode Toggle and Island Selector in Mobile Menu */}
          <div className="p-4 border-b space-y-4">
            {/* Three option toggle */}
            <div className="p-3 rounded-lg">
              <div className="font-medium mb-2">View Mode</div>
              <div className="flex border border-gray-200 rounded-md overflow-hidden">
                <button
                  onClick={() => setNavMode('visitor')}
                  className={`flex-1 py-2 text-center text-sm ${
                    navMode === 'visitor' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  Visitor
                </button>
                <button
                  onClick={() => setNavMode('local')}
                  className={`flex-1 py-2 text-center text-sm border-x border-gray-200 ${
                    navMode === 'local' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  Local
                </button>
                <button
                  onClick={() => setNavMode('all')}
                  className={`flex-1 py-2 text-center text-sm ${
                    navMode === 'all' ? 'bg-gray-900 text-white' : 'bg-white text-gray-700'
                  }`}
                >
                  All
                </button>
              </div>
            </div>
            
            {/* Island Selection in Mobile Menu */}
            <div className="p-3 rounded-lg">
              <div className="font-medium mb-2">Select Island</div>
              <div className="space-y-2">
                {islands.map((island) => (
                  <button
                    key={island}
                    onClick={() => {
                      setSelectedIsland(island);
                    }}
                    className={`w-full text-left p-2 rounded-md ${
                      selectedIsland === island ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'
                    }`}
                  >
                    {island}
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            <ul className="space-y-4">
              {mobileLinks.map((link) => (
                <MobileNavLink 
                  key={link.to}
                  to={link.to} 
                  icon={link.icon} 
                  label={link.label} 
                  onClick={() => setIsOpen(false)} 
                />
              ))}
              <li className="border-t border-gray-200 my-4 pt-4">
                <div className="flex flex-col space-y-2">
                  <Link to="/login" className="flex items-center p-3 rounded-lg hover:bg-gray-100" onClick={() => setIsOpen(false)}>
                    <LogIn size={18} className="text-gray-500 mr-3" />
                    <span className="font-medium">Login</span>
                  </Link>
                  <Link to="/signup" className="flex items-center p-3 rounded-lg bg-gray-900 text-white" onClick={() => setIsOpen(false)}>
                    <User size={18} className="mr-3" />
                    <span className="font-medium">Sign Up</span>
                  </Link>
                </div>
              </li>
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
