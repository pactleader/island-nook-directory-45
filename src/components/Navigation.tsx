import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, Car, Building, List, Calendar, Landmark, User, LogIn, Store, Utensils, ShoppingCart, ChevronDown, Package, Search, Languages } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useNavigationClick } from '@/hooks/useNavigationClick';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

// Define the link type with optional row property
interface NavLink {
  to: string;
  icon: React.ReactNode;
  label: string;
}

// Define language interface with translated name
interface Language {
  name: string;
  translation: string;
  code: string;
}

const Navigation = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIsland, setSelectedIsland] = useState('All Islands');
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showMobileIslandSelector, setShowMobileIslandSelector] = useState(true);
  const [showMobileLanguageSelector, setShowMobileLanguageSelector] = useState(true);
  const [activeTab, setActiveTab] = useState('visitor');
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

  // Determine if a link is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Visitor menu links (row 2)
  const visitorLinks: NavLink[] = [
    { to: "/hotels", icon: <Building size={16} />, label: "Hotels" },
    { to: "/food", icon: <Utensils size={16} />, label: "Food" },
    { to: "/adventures", icon: <Map size={16} />, label: "Adventures" },
    { to: "/vehicles", icon: <Car size={16} />, label: "Rides" },
    { to: "/shopping", icon: <ShoppingCart size={16} />, label: "Shopping" },
    { to: "/local-products", icon: <Store size={16} />, label: "Local Products" }
  ];

  // Local menu links (row 3)
  const localLinks: NavLink[] = [
    { to: "/properties", icon: <Map size={16} />, label: "Homes" },
    { to: "/vehicles", icon: <Car size={16} />, label: "Cars" },
    { to: "/businesses", icon: <Building size={16} />, label: "Services" },
    { to: "/buy-and-sell", icon: <Package size={16} />, label: "Buy & Sell" },
    { to: "/events", icon: <Calendar size={16} />, label: "Events" },
    { to: "/government-services", icon: <Landmark size={16} />, label: "Government" }
  ];

  // List of islands for the dropdown
  const islands = ["All Islands", "Saipan", "Tinian", "Rota", "Northern Islands"];
  
  // List of languages for the dropdown with translations
  const languages: Language[] = [
    { name: "English", translation: "", code: "en" },
    { name: "Chamorro", translation: "Chamoru", code: "ch" },
    { name: "Carolinian", translation: "Refaluwasch", code: "cr" },
    { name: "Korean", translation: "한국어", code: "ko" },
    { name: "Filipino", translation: "Tagalog", code: "fil" },
    { name: "Japanese", translation: "日本語", code: "ja" },
    { name: "Chinese", translation: "中文", code: "zh" },
  ];

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white shadow-sm ${
          scrolled ? 'glass-nav py-2' : 'py-3'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col">
            {/* Top Row: Logo, Island & Language Dropdowns, Auth */}
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
              
              {/* Island and Language Dropdowns - Center */}
              <div className="hidden md:flex items-center space-x-4">
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

                {/* Language Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100">
                    <Languages size={16} className="mr-2" />
                    {selectedLanguage}
                    <ChevronDown size={16} className="ml-2" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200 mt-1 min-w-[180px]">
                    {languages.map((language) => (
                      <DropdownMenuItem
                        key={language.name}
                        className="text-gray-700 hover:bg-gray-100 cursor-pointer"
                        onClick={() => setSelectedLanguage(language.name)}
                      >
                        {language.name}{language.translation ? ` (${language.translation})` : ''}
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
                <MobileMenu 
                  islands={islands} 
                  languages={languages}
                  selectedIsland={selectedIsland} 
                  setSelectedIsland={setSelectedIsland} 
                  selectedLanguage={selectedLanguage}
                  setSelectedLanguage={setSelectedLanguage} 
                  showIslandSelector={showMobileIslandSelector}
                  setShowIslandSelector={setShowMobileIslandSelector}
                  showLanguageSelector={showMobileLanguageSelector}
                  setShowLanguageSelector={setShowMobileLanguageSelector}
                />
              </div>
            </div>
            
            {/* Bottom Row: Main Navigation */}
            <div className="hidden md:block pt-2 pb-1">
              <div className="flex flex-col">
                {/* Toggle Tabs */}
                <div className="flex justify-center mb-4">
                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-2xl">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="visitor">Visitor's Favorites</TabsTrigger>
                      <TabsTrigger value="local">Local's Favorites</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                {/* Navigation Links */}
                <div className="flex items-center justify-center border-t border-gray-100 pt-2 pb-1">
                  <nav className="flex flex-wrap items-center justify-center gap-2 max-w-4xl mx-auto">
                    {activeTab === 'visitor' ? (
                      visitorLinks.map((link) => (
                        <button
                          key={link.to}
                          onClick={() => handleNavigationClick(link.to)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-all-300 flex items-center space-x-1 ${
                            isActive(link.to) 
                              ? 'bg-gray-900 text-white' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {link.icon}
                          <span>{link.label}</span>
                        </button>
                      ))
                    ) : (
                      localLinks.map((link) => (
                        <button
                          key={link.to}
                          onClick={() => handleNavigationClick(link.to)}
                          className={`px-3 py-2 rounded-full text-sm font-medium transition-all-300 flex items-center space-x-1 ${
                            isActive(link.to) 
                              ? 'bg-gray-900 text-white' 
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {link.icon}
                          <span>{link.label}</span>
                        </button>
                      ))
                    )}
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* Add a spacer div to prevent content from being hidden under the fixed header */}
      <div className="h-[100px]"></div>
    </>
  );
};

// Mobile Menu Component
const MobileMenu = ({ 
  islands, 
  languages, 
  selectedIsland, 
  setSelectedIsland,
  selectedLanguage,
  setSelectedLanguage,
  showIslandSelector,
  setShowIslandSelector,
  showLanguageSelector,
  setShowLanguageSelector
}: { 
  islands: string[], 
  languages: Language[],
  selectedIsland: string, 
  setSelectedIsland: (island: string) => void,
  selectedLanguage: string,
  setSelectedLanguage: (language: string) => void,
  showIslandSelector: boolean,
  setShowIslandSelector: (show: boolean) => void,
  showLanguageSelector: boolean,
  setShowLanguageSelector: (show: boolean) => void
}) => {
  const [isOpen, setIsOpen] = useState(false);
  
  // Visitor menu links
  const visitorLinks: NavLink[] = [
    { to: "/hotels", icon: <Building size={18} />, label: "Hotels" },
    { to: "/food", icon: <Utensils size={18} />, label: "Food" },
    { to: "/adventures", icon: <Map size={18} />, label: "Adventures" },
    { to: "/vehicles", icon: <Car size={18} />, label: "Rides" },
    { to: "/shopping", icon: <ShoppingCart size={18} />, label: "Shopping" },
    { to: "/local-products", icon: <Store size={18} />, label: "Local Products" }
  ];

  // Local menu links
  const localLinks: NavLink[] = [
    { to: "/properties", icon: <Map size={18} />, label: "Homes" },
    { to: "/vehicles", icon: <Car size={18} />, label: "Cars" },
    { to: "/businesses", icon: <Building size={18} />, label: "Services" },
    { to: "/government-services", icon: <Landmark size={18} />, label: "Government" },
    { to: "/buy-and-sell", icon: <Package size={18} />, label: "Buy & Sell" },
    { to: "/events", icon: <Calendar size={18} />, label: "Events" }
  ];

  // Handle island selection
  const handleIslandSelect = (island: string) => {
    setSelectedIsland(island);
    setShowIslandSelector(false);
  };

  // Handle language selection
  const handleLanguageSelect = (language: string) => {
    setSelectedLanguage(language);
    setShowLanguageSelector(false);
  };

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
          
          {/* Island and Language Selection in Mobile Menu */}
          <div className="p-4 border-b space-y-4">
            {/* Island Selection in Mobile Menu */}
            <div className="p-3 rounded-lg">
              <div 
                className="font-medium mb-2 flex justify-between items-center cursor-pointer"
                onClick={() => setShowIslandSelector(!showIslandSelector)}
              >
                <span>Selected Island: {selectedIsland}</span>
                <ChevronDown 
                  size={16}
                  className={`transition-transform ${showIslandSelector ? 'rotate-180' : ''}`} 
                />
              </div>
              
              {showIslandSelector && (
                <div className="space-y-2 mt-2 pt-2 border-t border-gray-100">
                  {islands.map((island) => (
                    <button
                      key={island}
                      onClick={() => handleIslandSelect(island)}
                      className={`w-full text-left p-2 rounded-md ${
                        selectedIsland === island ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'
                      }`}
                    >
                      {island}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Language Selection in Mobile Menu */}
            <div className="p-3 rounded-lg">
              <div 
                className="font-medium mb-2 flex justify-between items-center cursor-pointer"
                onClick={() => setShowLanguageSelector(!showLanguageSelector)}
              >
                <span>Selected Language: {selectedLanguage}</span>
                <ChevronDown 
                  size={16}
                  className={`transition-transform ${showLanguageSelector ? 'rotate-180' : ''}`} 
                />
              </div>
              
              {showLanguageSelector && (
                <div className="space-y-2 mt-2 pt-2 border-t border-gray-100">
                  {languages.map((language) => (
                    <button
                      key={language.name}
                      onClick={() => handleLanguageSelect(language.name)}
                      className={`w-full text-left p-2 rounded-md ${
                        selectedLanguage === language.name ? 'bg-gray-200 font-medium' : 'hover:bg-gray-100'
                      }`}
                    >
                      {language.name}{language.translation ? ` (${language.translation})` : ''}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Mobile Navigation Links */}
          <nav className="flex-1 px-4 py-6 overflow-y-auto">
            {/* Visitor Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Visitor's Favorites</h3>
              <ul className="space-y-2">
                {visitorLinks.map((link) => (
                  <MobileNavLink 
                    key={link.to}
                    to={link.to} 
                    icon={link.icon} 
                    label={link.label} 
                    onClick={() => setIsOpen(false)} 
                  />
                ))}
              </ul>
            </div>
            
            {/* Local Section */}
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">Local's Favorites</h3>
              <ul className="space-y-2">
                {localLinks.filter(link => 
                  // Filter out duplicate links that already exist in visitorLinks
                  !visitorLinks.some(vLink => vLink.to === link.to)
                ).map((link) => (
                  <MobileNavLink 
                    key={link.to}
                    to={link.to} 
                    icon={link.icon} 
                    label={link.label} 
                    onClick={() => setIsOpen(false)} 
                  />
                ))}
              </ul>
            </div>
            
            {/* Auth Links */}
            <div className="border-t border-gray-200 my-4 pt-4">
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
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
};

// Mobile NavLink Component
const MobileNavLink = ({ to, icon, label, onClick }: { to: string, icon: React.ReactNode, label: string, onClick: () => void }) => {
  const { handleNavigationClick } = useNavigationClick();

  return (
    <li>
      <button
        onClick={() => {
          handleNavigationClick(to);
          onClick();
        }}
        className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-gray-100 transition-all-300 w-full text-left"
      >
        <span className="text-gray-500">{icon}</span>
        <span className="font-medium">{label}</span>
      </button>
    </li>
  );
};

export default Navigation;
