
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Calendar, Car, Home, Hotel } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Progress } from '@/components/ui/progress';

type ListingType = 'property' | 'vehicle' | 'hotel' | 'business' | 'event';

const CreateListing = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<ListingType | null>(null);
  
  // Check if user is logged in - should be implemented in a useEffect in a real app
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    navigate('/login');
  }
  
  const handleTypeSelect = (type: ListingType) => {
    setSelectedType(type);
    setStep(2);
  };
  
  const handleContinue = () => {
    if (step === 2) {
      // In a real app, we'd save the partial form data
      if (selectedType) {
        toast.success(`Starting ${selectedType} listing creation`);
        navigate(`/create-listing/${selectedType}`);
      }
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="/profile">Profile</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink>Create Listing</BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Create a New Listing</h1>
          <p className="text-gray-600">Select a category to get started</p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-500">Step {step} of 2</span>
          </div>
          <Progress value={step * 50} className="h-2" />
        </div>
        
        {step === 1 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            <Button
              variant="ghost"
              className="p-0 h-auto hover:bg-transparent"
              onClick={() => handleTypeSelect('property')}
            >
              <Card className={`cursor-pointer transition-all hover:border-blue-500 ${selectedType === 'property' ? 'border-blue-500 bg-blue-50' : ''}`}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Home className="w-12 h-12 text-blue-600 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Property</h3>
                  <p className="text-gray-600 text-sm">
                    Houses, apartments, land for sale or rent
                  </p>
                </CardContent>
              </Card>
            </Button>
            
            <Button
              variant="ghost"
              className="p-0 h-auto hover:bg-transparent"
              onClick={() => handleTypeSelect('vehicle')}
            >
              <Card className={`cursor-pointer transition-all hover:border-blue-500 ${selectedType === 'vehicle' ? 'border-blue-500 bg-blue-50' : ''}`}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Car className="w-12 h-12 text-green-600 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Vehicle</h3>
                  <p className="text-gray-600 text-sm">
                    Cars, trucks, motorcycles for sale or rent
                  </p>
                </CardContent>
              </Card>
            </Button>
            
            <Button
              variant="ghost"
              className="p-0 h-auto hover:bg-transparent"
              onClick={() => handleTypeSelect('hotel')}
            >
              <Card className={`cursor-pointer transition-all hover:border-blue-500 ${selectedType === 'hotel' ? 'border-blue-500 bg-blue-50' : ''}`}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Hotel className="w-12 h-12 text-purple-600 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Hotel</h3>
                  <p className="text-gray-600 text-sm">
                    Hotels, resorts, vacation rentals
                  </p>
                </CardContent>
              </Card>
            </Button>
            
            <Button
              variant="ghost"
              className="p-0 h-auto hover:bg-transparent"
              onClick={() => handleTypeSelect('business')}
            >
              <Card className={`cursor-pointer transition-all hover:border-blue-500 ${selectedType === 'business' ? 'border-blue-500 bg-blue-50' : ''}`}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Building className="w-12 h-12 text-orange-600 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Business</h3>
                  <p className="text-gray-600 text-sm">
                    Local businesses, services, stores
                  </p>
                </CardContent>
              </Card>
            </Button>
            
            <Button
              variant="ghost"
              className="p-0 h-auto hover:bg-transparent"
              onClick={() => handleTypeSelect('event')}
            >
              <Card className={`cursor-pointer transition-all hover:border-blue-500 ${selectedType === 'event' ? 'border-blue-500 bg-blue-50' : ''}`}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Calendar className="w-12 h-12 text-pink-600 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Event</h3>
                  <p className="text-gray-600 text-sm">
                    Festivals, concerts, workshops, community events
                  </p>
                </CardContent>
              </Card>
            </Button>
          </div>
        )}
        
        {step === 2 && selectedType && (
          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 capitalize">Create {selectedType} Listing</h2>
                <p className="text-gray-600 mb-6">
                  You've selected to create a {selectedType} listing. Click continue to proceed with the listing details.
                </p>
                
                <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                  <Button variant="outline" onClick={() => setStep(1)}>
                    Back
                  </Button>
                  <Button onClick={handleContinue}>
                    Continue
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateListing;
