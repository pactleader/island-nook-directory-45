
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building, Calendar, Car, Home, Hotel, MessageCircle, Upload, FileText } from 'lucide-react';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

type ListingType = 'property' | 'vehicle' | 'hotel' | 'business' | 'event' | 'askLocal';

interface CategoryOption {
  value: string;
  label: string;
}

const CreateListing = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState<ListingType | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [images, setImages] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  
  // Check if user is logged in - should be implemented in a useEffect in a real app
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  if (!isLoggedIn) {
    navigate('/login');
  }
  
  const handleTypeSelect = (type: ListingType) => {
    setSelectedType(type);
    setStep(2);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setStep(3);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const fileArray = Array.from(e.target.files);
      setImages(prev => [...prev, ...fileArray]);
      
      // Create preview URLs for the uploaded images
      const newPreviewUrls = fileArray.map(file => URL.createObjectURL(file));
      setPreviewUrls(prev => [...prev, ...newPreviewUrls]);
    }
  };

  const handleContinue = () => {
    if (step === 3) {
      setStep(4);
    } else if (step === 4) {
      // In a real app, we'd save the form data
      if (selectedType && selectedCategory) {
        toast.success(`${selectedType} listing created successfully!`);
        navigate('/user-listings');
      }
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  // Define categories for each listing type
  const getCategoriesForType = (): CategoryOption[] => {
    switch (selectedType) {
      case 'property':
        return [
          { value: 'house', label: 'House' },
          { value: 'apartment', label: 'Apartment' },
          { value: 'land', label: 'Land' },
          { value: 'commercial', label: 'Commercial' }
        ];
      case 'vehicle':
        return [
          { value: 'car', label: 'Car' },
          { value: 'truck', label: 'Truck' },
          { value: 'motorcycle', label: 'Motorcycle' },
          { value: 'boat', label: 'Boat' }
        ];
      case 'hotel':
        return [
          { value: 'hotel', label: 'Hotel' },
          { value: 'resort', label: 'Resort' },
          { value: 'vacationRental', label: 'Vacation Rental' },
          { value: 'hostel', label: 'Hostel' }
        ];
      case 'business':
        return [
          { value: 'restaurant', label: 'Restaurant' },
          { value: 'retail', label: 'Retail' },
          { value: 'service', label: 'Service' },
          { value: 'professional', label: 'Professional' }
        ];
      case 'event':
        return [
          { value: 'concert', label: 'Concert' },
          { value: 'festival', label: 'Festival' },
          { value: 'conference', label: 'Conference' },
          { value: 'community', label: 'Community' }
        ];
      case 'askLocal':
        return [
          { value: 'recommendation', label: 'Recommendation' },
          { value: 'question', label: 'Question' },
          { value: 'advice', label: 'Local Advice' },
          { value: 'meetup', label: 'Meetup' }
        ];
      default:
        return [];
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
          <p className="text-gray-600">Follow the steps to create your listing</p>
        </div>
        
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Progress</span>
            <span className="text-sm text-gray-500">Step {step} of 4</span>
          </div>
          <Progress value={step * 25} className="h-2" />
        </div>
        
        {step === 1 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Button
              variant="ghost"
              className="p-0 h-auto hover:bg-transparent"
              onClick={() => handleTypeSelect('property')}
            >
              <Card className={`w-full cursor-pointer transition-all hover:border-blue-500 ${selectedType === 'property' ? 'border-blue-500 bg-blue-50' : ''}`}>
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
              <Card className={`w-full cursor-pointer transition-all hover:border-blue-500 ${selectedType === 'vehicle' ? 'border-blue-500 bg-blue-50' : ''}`}>
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
              <Card className={`w-full cursor-pointer transition-all hover:border-blue-500 ${selectedType === 'hotel' ? 'border-blue-500 bg-blue-50' : ''}`}>
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
              <Card className={`w-full cursor-pointer transition-all hover:border-blue-500 ${selectedType === 'business' ? 'border-blue-500 bg-blue-50' : ''}`}>
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
              <Card className={`w-full cursor-pointer transition-all hover:border-blue-500 ${selectedType === 'event' ? 'border-blue-500 bg-blue-50' : ''}`}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <Calendar className="w-12 h-12 text-pink-600 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Event</h3>
                  <p className="text-gray-600 text-sm">
                    Festivals, concerts, workshops, community events
                  </p>
                </CardContent>
              </Card>
            </Button>
            
            <Button
              variant="ghost"
              className="p-0 h-auto hover:bg-transparent"
              onClick={() => handleTypeSelect('askLocal')}
            >
              <Card className={`w-full cursor-pointer transition-all hover:border-blue-500 ${selectedType === 'askLocal' ? 'border-blue-500 bg-blue-50' : ''}`}>
                <CardContent className="p-6 flex flex-col items-center text-center">
                  <MessageCircle className="w-12 h-12 text-cyan-600 mb-4" />
                  <h3 className="font-medium text-lg mb-2">Ask a Local</h3>
                  <p className="text-gray-600 text-sm">
                    Get advice, recommendations, or connect with locals
                  </p>
                </CardContent>
              </Card>
            </Button>
          </div>
        )}
        
        {step === 2 && selectedType && (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4 capitalize">{selectedType === 'askLocal' ? 'Ask a Local' : selectedType} Category</h2>
              <p className="text-gray-600 mb-6">
                Select a category for your {selectedType === 'askLocal' ? 'Ask a Local' : selectedType} listing
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {getCategoriesForType().map((category) => (
                  <Button
                    key={category.value}
                    variant="outline"
                    className={`justify-start h-auto py-4 ${selectedCategory === category.value ? 'border-blue-500 bg-blue-50' : ''}`}
                    onClick={() => handleCategorySelect(category.value)}
                  >
                    {category.label}
                  </Button>
                ))}
              </div>
              
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 3 && selectedType && (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Upload Images</h2>
              <p className="text-gray-600 mb-6">
                Add photos to showcase your listing (up to 10 images)
              </p>
              
              <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center mb-6">
                <Upload className="h-10 w-10 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-500 mb-2">Drag and drop images here, or click to select files</p>
                <p className="text-xs text-gray-400 mb-4">PNG, JPG, GIF up to 10MB each</p>
                <Label htmlFor="image-upload" className="cursor-pointer">
                  <Input 
                    id="image-upload" 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    className="hidden"
                    onChange={handleImageUpload} 
                  />
                  <Button type="button" variant="outline" size="sm">
                    Select Files
                  </Button>
                </Label>
              </div>
              
              {previewUrls.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Selected Images ({previewUrls.length})</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2">
                    {previewUrls.map((url, index) => (
                      <div key={index} className="relative aspect-square rounded-md overflow-hidden">
                        <img 
                          src={url} 
                          alt={`Preview ${index + 1}`} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleContinue}>
                  Continue
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {step === 4 && selectedType && (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">Listing Details</h2>
              <p className="text-gray-600 mb-6">
                Fill in the details for your {selectedType === 'askLocal' ? 'Ask a Local' : selectedType} listing
              </p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" placeholder="Enter a descriptive title for your listing" />
                </div>
                
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" placeholder="Describe your listing in detail" />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedType !== 'askLocal' && (
                    <div>
                      <Label htmlFor="price">Price</Label>
                      <Input id="price" type="number" placeholder="Enter price" />
                    </div>
                  )}
                  
                  <div>
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" placeholder="Enter location" />
                  </div>
                </div>
                
                {selectedType === 'property' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bedrooms">Bedrooms</Label>
                      <Select>
                        <SelectTrigger id="bedrooms">
                          <SelectValue placeholder="Select bedrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4+">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="bathrooms">Bathrooms</Label>
                      <Select>
                        <SelectTrigger id="bathrooms">
                          <SelectValue placeholder="Select bathrooms" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1</SelectItem>
                          <SelectItem value="2">2</SelectItem>
                          <SelectItem value="3">3</SelectItem>
                          <SelectItem value="4+">4+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                )}
                
                {selectedType === 'vehicle' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="year">Year</Label>
                      <Input id="year" type="number" placeholder="Enter year" />
                    </div>
                    
                    <div>
                      <Label htmlFor="mileage">Mileage</Label>
                      <Input id="mileage" type="number" placeholder="Enter mileage" />
                    </div>
                  </div>
                )}
                
                {selectedType === 'event' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="date">Date</Label>
                      <Input id="date" type="date" />
                    </div>
                    
                    <div>
                      <Label htmlFor="time">Time</Label>
                      <Input id="time" type="time" />
                    </div>
                  </div>
                )}
              </div>
              
              <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4 justify-between">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleContinue}>
                  Create Listing
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default CreateListing;
