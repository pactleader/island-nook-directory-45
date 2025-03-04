import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
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

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertyDetails />} />
          <Route path="/vehicles" element={<Vehicles />} />
          <Route path="/vehicles/:id" element={<VehicleDetails />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/hotels/:id" element={<HotelDetails />} />
          <Route path="/businesses" element={<Businesses />} />
          <Route path="/businesses/:id" element={<BusinessDetails />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/:id" element={<EventDetails />} />
          <Route path="/government-services" element={<GovernmentServices />} />
          <Route path="/government-services/:id" element={<GovernmentServiceDetails />} />
          <Route path="/ask-local" element={<AskLocal />} />
          <Route path="/ask-local/:id" element={<AskLocalDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile/setup" element={<ProfileSetup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
