import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Map, Car, Building, List, Calendar, Landmark, User, LogIn, Store, Utensils, ShoppingCart, ChevronDown, Package, Search, Languages, X, Heart, MapPin, Globe, MessageCircle } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useNavigationClick } from '@/hooks/useNavigationClick';
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { createPortal } from 'react-dom';

const NAVIGATION_TAB_KEY = 'island-nook-navigation-tab';

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
  const [activeTab, setActiveTab] = useState(() => {
    try {
      return localStorage.getItem(NAVIGATION_TAB_KEY) || 'visitor';
    } catch (error) {
      console.error('Error loading navigation tab from localStorage:', error);
      return 'visitor';
    }
  });
  const location = useLocation();
  const { handleNavigationClick } = useNavigationClick();
  
  // Save tab selection to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(NAVIGATION_TAB_KEY, activeTab);
    } catch (error) {
      console.error('Error saving navigation tab to localStorage:', error);
    }
  }, [activeTab]);

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
    // For parent routes (like /hotels), check if current path starts with it
    // This will keep the parent route highlighted when viewing its children
    if (path !== '/') {
      return location.pathname.startsWith(path);
    }
    // For home route, only highlight when exactly on home
    return location.pathname === path;
  };

  // Visitor menu links (row 2)
  const visitorLinks: NavLink[] = [
    { to: "/hotels", icon: <Building size={16} />, label: "Hotels" },
    { to: "/food", icon: <Utensils size={16} />, label: "Food" },
    { to: "/adventures", icon: <Map size={16} />, label: "Adventures" },
    { to: "/vehicles", icon: <Car size={16} />, label: "Rides" },
    { to: "/shopping", icon: <ShoppingCart size={16} />, label: "Shopping" },
    { to: "/local-products", icon: <Store size={16} />, label: "Local Products" },
    { to: "/ask-local", icon: <MessageCircle size={16} />, label: "Ask a Local" }
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
        className={`fixed top-0 left-0 right-0 z-[40] transition-all duration-300 bg-white shadow-sm ${
          scrolled ? 'glass-nav py-2' : 'py-3'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col">
            {/* Top Row: Logo, Island & Language Dropdowns, Auth */}
            <div className="flex items-center justify-between py-2">
              {/* Logo */}
              <div className="flex items-center space-x-4">
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

                {/* Small Toggle for Visitor/Local */}
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-auto">
                  <TabsList className="h-8">
                    <TabsTrigger value="visitor" className="text-xs px-2">Visitor</TabsTrigger>
                    <TabsTrigger value="local" className="text-xs px-2">Local</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              {/* Island and Language Dropdowns - Center */}
              <div className="hidden md:flex items-center space-x-4">
                {/* Island Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-900 px-3 py-2 rounded-md hover:bg-gray-100">
                    {selectedIsland}
                    <ChevronDown size={16} className="ml-2" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200 mt-1 min-w-[150px] z-[50]">
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
                  <DropdownMenuContent className="bg-white shadow-lg rounded-md border border-gray-200 mt-1 min-w-[180px] z-[50]">
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
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              </div>
            </div>
            
            {/* Bottom Row: Main Navigation */}
            <div className="hidden md:block pt-2 pb-1">
              <div className="flex flex-col">
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
      <div className="h-[80px] hidden md:block"></div>
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
  setShowLanguageSelector,
  activeTab,
  setActiveTab
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
  setShowLanguageSelector: (show: boolean) => void,
  activeTab: string,
  setActiveTab: (tab: string) => void
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
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

  // Visitor menu links
  const visitorLinks: NavLink[] = [
    { to: "/hotels", icon: <Building size={18} />, label: "Hotels" },
    { to: "/food", icon: <Utensils size={18} />, label: "Food" },
    { to: "/adventures", icon: <Map size={18} />, label: "Adventures" },
    { to: "/vehicles", icon: <Car size={18} />, label: "Rides" },
    { to: "/shopping", icon: <ShoppingCart size={18} />, label: "Shopping" },
    { to: "/local-products", icon: <Store size={18} />, label: "Local Products" },
    { to: "/ask-local", icon: <MessageCircle size={18} />, label: "Ask a Local" }
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

            {/* Island and Language Selectors */}
            <div className="bg-white border-b border-gray-200 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <select
                    value={selectedIsland}
                    onChange={(e) => setSelectedIsland(e.target.value)}
                    className="text-sm font-medium text-gray-900 bg-transparent border-none focus:ring-0"
                  >
                    {islands.map((island) => (
                      <option key={island} value={island}>
                        {island}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center space-x-2">
                  <Globe className="h-5 w-5 text-gray-600" />
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="text-sm font-medium text-gray-900 bg-transparent border-none focus:ring-0"
                  >
                    {languages.map((lang) => (
                      <option key={lang.name} value={lang.name}>
                        {lang.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Local and Visitor Favorites */}
            <div className="bg-white border-b border-gray-200 px-4 py-3">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setActiveTab('local')}
                  className={`text-sm font-medium ${activeTab === 'local' ? 'text-blue-600' : 'text-gray-900'}`}
                >
                  Local Favorites
                </button>
                <button
                  onClick={() => setActiveTab('visitor')}
                  className={`text-sm font-medium ${activeTab === 'visitor' ? 'text-blue-600' : 'text-gray-900'}`}
                >
                  Visitor Favorites
                </button>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto">
              <nav className="px-4 py-3">
                <ul className="space-y-4">
                  {(activeTab === 'visitor' ? visitorLinks : localLinks).map((link) => (
                    <li key={link.to}>
                      <Link
                        to={link.to}
                        className="flex items-center space-x-3 text-gray-900 hover:text-blue-600"
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <span>{link.icon}</span>
                        <span>{link.label}</span>
                      </Link>
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
