import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PageLayout from "./components/PageLayout";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import PropertyDetails from "./pages/PropertyDetails";
import Properties from "./pages/Properties";
import Vehicles from "./pages/Vehicles";
import VehicleDetails from "./pages/VehicleDetails";
import Businesses from "./pages/Businesses";
import BusinessDetails from "./pages/BusinessDetails";
import Events from "./pages/Events";
import EventDetails from "./pages/EventDetails";
import GovernmentServices from "./pages/GovernmentServices";
import GovernmentServiceDetails from "./pages/GovernmentServiceDetails";
import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";
import AskLocal from "./pages/AskLocal";
import AskLocalDetails from "./pages/AskLocalDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProfileSetup from "./pages/ProfileSetup";
import Profile from "./pages/Profile";
import UserListings from "./pages/UserListings";
import UserMessages from "./pages/UserMessages";
import CreateListing from "./pages/CreateListing";
import CreatePropertyListing from "./pages/CreatePropertyListing";
import Favorites from "./pages/Favorites";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import Advertise from "./pages/Advertise";
import Admin from "./pages/Admin";
import Jobs from "./pages/Jobs";
import JobDetails from "./pages/JobDetails";

// Import pages
import Food from "./pages/Food";
import Shopping from "./pages/Shopping";
import ShoppingDetails from "./pages/ShoppingDetails";
import LocalProducts from "./pages/LocalProducts";
import LocalProductDetails from "./pages/LocalProductDetails";
import Adventures from "./pages/Adventures";
import AdventureDetails from "./pages/AdventureDetails";
import BuyAndSell from "./pages/BuyAndSell";
import BuyAndSellDetails from "./pages/BuyAndSellDetails";
import PageTransition from './components/PageTransition';
import FoodDetails from "./pages/FoodDetails";
import BlogDetails from './pages/BlogDetails';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <FavoritesProvider>
        <Toaster />
        <Sonner />
        <Router>
          <PageTransition>
            <Routes>
              <Route path="/" element={<PageLayout><Index /></PageLayout>} />
              <Route path="/properties" element={<PageLayout><Properties /></PageLayout>} />
              <Route path="/properties/:id" element={<PageLayout><PropertyDetails /></PageLayout>} />
              <Route path="/vehicles" element={<PageLayout><Vehicles /></PageLayout>} />
              <Route path="/vehicles/:id" element={<PageLayout><VehicleDetails /></PageLayout>} />
              <Route path="/hotels" element={<PageLayout><Hotels /></PageLayout>} />
              <Route path="/hotels/:id" element={<PageLayout><HotelDetails /></PageLayout>} />
              <Route path="/businesses" element={<PageLayout><Businesses /></PageLayout>} />
              <Route path="/businesses/:id" element={<PageLayout><BusinessDetails /></PageLayout>} />
              <Route path="/events" element={<PageLayout><Events /></PageLayout>} />
              <Route path="/events/:id" element={<PageLayout><EventDetails /></PageLayout>} />
              <Route path="/government-services" element={<PageLayout><GovernmentServices /></PageLayout>} />
              <Route path="/government-services/:id" element={<PageLayout><GovernmentServiceDetails /></PageLayout>} />
              <Route path="/jobs" element={<PageLayout><Jobs /></PageLayout>} />
              <Route path="/jobs/:id" element={<PageLayout><JobDetails /></PageLayout>} />
              <Route path="/ask-local" element={<PageLayout><AskLocal /></PageLayout>} />
              <Route path="/ask-local/:id" element={<PageLayout><AskLocalDetails /></PageLayout>} />
              
              {/* Routes */}
              <Route path="/food" element={<PageLayout><Food /></PageLayout>} />
              <Route path="/food/:id" element={<PageLayout><FoodDetails /></PageLayout>} />
              <Route path="/shopping" element={<PageLayout><Shopping /></PageLayout>} />
              <Route path="/shopping/:id" element={<PageLayout><ShoppingDetails /></PageLayout>} />
              <Route path="/local-products" element={<PageLayout><LocalProducts /></PageLayout>} />
              <Route path="/local-products/:id" element={<PageLayout><LocalProductDetails /></PageLayout>} />
              <Route path="/adventures" element={<PageLayout><Adventures /></PageLayout>} />
              <Route path="/adventures/:id" element={<PageLayout><AdventureDetails /></PageLayout>} />
              <Route path="/buy-and-sell" element={<PageLayout><BuyAndSell /></PageLayout>} />
              <Route path="/buy-and-sell/:id" element={<PageLayout><BuyAndSellDetails /></PageLayout>} />
              <Route path="/advertise" element={<PageLayout><Advertise /></PageLayout>} />
              <Route path="/admin" element={<PageLayout><Admin /></PageLayout>} />
              
              <Route path="/login" element={<PageLayout><Login /></PageLayout>} />
              <Route path="/signup" element={<PageLayout><Signup /></PageLayout>} />
              <Route path="/profile/setup" element={<PageLayout><ProfileSetup /></PageLayout>} />
              <Route path="/profile" element={<PageLayout><Profile /></PageLayout>} />
              <Route path="/favorites" element={<PageLayout><Favorites /></PageLayout>} />
              <Route path="/user-listings" element={<PageLayout><UserListings /></PageLayout>} />
              <Route path="/messages/:type/:id" element={<PageLayout><UserMessages /></PageLayout>} />
              <Route path="/create-listing" element={<PageLayout><CreateListing /></PageLayout>} />
              <Route path="/create-listing/property" element={<PageLayout><CreatePropertyListing /></PageLayout>} />
              <Route path="/blog/:slug" element={<BlogDetails />} />
              <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
            </Routes>
          </PageTransition>
        </Router>
      </FavoritesProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
