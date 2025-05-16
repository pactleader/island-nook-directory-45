
import { useState } from 'react';
import { 
  Calendar, 
  Upload,
  Tag,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Available categories for advertising
const categories = [
  "Property & Real Estate",
  "Automotive & Vehicles",
  "Hotels & Accommodations",
  "Food & Dining",
  "Local Business Services",
  "Tourism & Adventures",
  "Shopping",
  "Government Services",
  "Events & Festivals",
  "Local Products",
  "All Categories"
];

// Available subcategories
const subcategories = {
  "Property & Real Estate": ["For Sale", "For Rent", "Commercial", "Land"],
  "Automotive & Vehicles": ["Cars", "SUVs", "Trucks", "Motorcycles", "Boats", "Parts"],
  "Hotels & Accommodations": ["Hotels", "Resorts", "Vacation Rentals", "B&Bs"],
  "Food & Dining": ["Restaurants", "Cafes", "Bars", "Food Trucks", "Catering"],
  "Local Business Services": ["Financial", "Legal", "Healthcare", "Construction", "Cleaning"],
  "Tourism & Adventures": ["Tours", "Water Activities", "Hiking", "Cultural Experiences"],
  "Shopping": ["Retail Stores", "Malls", "Markets", "Specialty Shops"],
  "Government Services": ["Permits", "Licenses", "Public Utilities", "Education"],
  "Events & Festivals": ["Cultural", "Music", "Food", "Sports", "Community"],
  "Local Products": ["Crafts", "Food Products", "Clothing", "Art"],
  "All Categories": ["Featured", "Standard", "Premium"]
};

export default function Advertise() {
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [selectedSubcategories, setSelectedSubcategories] = useState<string[]>([]);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [desktopImage, setDesktopImage] = useState<File | null>(null);
  const [tabletImage, setTabletImage] = useState<File | null>(null);
  const [mobileImage, setMobileImage] = useState<File | null>(null);
  const [adTitle, setAdTitle] = useState<string>("");
  const [adDescription, setAdDescription] = useState<string>("");
  const [adUrl, setAdUrl] = useState<string>("");
  
  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    setSelectedSubcategories([]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: (file: File | null) => void) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      adTitle,
      adDescription,
      adUrl,
      selectedCategory,
      selectedSubcategories,
      startDate,
      endDate,
      files: {
        desktop: desktopImage?.name,
        tablet: tabletImage?.name,
        mobile: mobileImage?.name,
      }
    });
    alert("Your advertisement request has been submitted! Our team will review it and contact you shortly.");
  };
  
  const getAdPrice = () => {
    // Basic pricing logic
    const daysCount = startDate && endDate 
      ? Math.ceil((new Date(endDate).getTime() - new Date(startDate).getTime()) / (1000 * 3600 * 24)) + 1
      : 0;
    
    const basePrice = 50; // Price per day
    return daysCount * basePrice;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-36 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold mb-3">Advertise on CNMI Central</h1>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Reach thousands of visitors and locals across the Northern Mariana Islands. 
                Create targeted advertising campaigns to boost your business visibility.
              </p>
            </div>
            
            <Tabs defaultValue="create-ad">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="create-ad">Create Advertisement</TabsTrigger>
                <TabsTrigger value="ad-guidelines">Guidelines & Pricing</TabsTrigger>
              </TabsList>
              
              <TabsContent value="create-ad">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <form onSubmit={handleSubmit}>
                    {/* Basic Ad Information */}
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold mb-4">Advertisement Information</h2>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="ad-title">Advertisement Title</Label>
                          <Input 
                            id="ad-title"
                            value={adTitle}
                            onChange={(e) => setAdTitle(e.target.value)}
                            placeholder="Enter a title for your advertisement"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="ad-description">Advertisement Description</Label>
                          <textarea
                            id="ad-description"
                            value={adDescription}
                            onChange={(e) => setAdDescription(e.target.value)}
                            placeholder="Describe your advertisement"
                            className="flex h-24 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            required
                          />
                        </div>
                        
                        <div>
                          <Label htmlFor="ad-url">Advertisement URL</Label>
                          <Input 
                            id="ad-url"
                            type="url"
                            value={adUrl}
                            onChange={(e) => setAdUrl(e.target.value)}
                            placeholder="https://your-website.com"
                            required
                          />
                        </div>
                      </div>
                    </div>
                    
                    {/* Category Selection */}
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold mb-4">Category & Targeting</h2>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="category">Select Category</Label>
                          <Select onValueChange={handleCategoryChange}>
                            <SelectTrigger id="category">
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        
                        {selectedCategory && (
                          <div>
                            <Label>Select Subcategories</Label>
                            <div className="mt-2 flex flex-wrap gap-2">
                              {subcategories[selectedCategory as keyof typeof subcategories]?.map((sub) => (
                                <Button
                                  key={sub}
                                  type="button"
                                  variant={selectedSubcategories.includes(sub) ? "default" : "outline"}
                                  className="flex items-center"
                                  onClick={() => {
                                    if (selectedSubcategories.includes(sub)) {
                                      setSelectedSubcategories(selectedSubcategories.filter(s => s !== sub));
                                    } else {
                                      setSelectedSubcategories([...selectedSubcategories, sub]);
                                    }
                                  }}
                                >
                                  <Tag className="mr-1 h-4 w-4" />
                                  {sub}
                                </Button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Ad Schedule */}
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold mb-4">Advertisement Schedule</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="start-date">Start Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                            <Input 
                              id="start-date"
                              type="date"
                              className="pl-10"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              required
                            />
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="end-date">End Date</Label>
                          <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={16} />
                            <Input 
                              id="end-date"
                              type="date"
                              className="pl-10"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              min={startDate}
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Ad Creative Uploads */}
                    <div className="mb-8">
                      <h2 className="text-xl font-semibold mb-4">Upload Ad Creatives</h2>
                      <p className="text-sm text-gray-500 mb-4">
                        Please provide your advertisement images for different devices. 
                        For best results, use: Desktop (1200x628px), Tablet (800x400px), Mobile (400x300px).
                      </p>
                      
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="desktop-image">Desktop Ad Image</Label>
                          <div className="flex items-center mt-1">
                            <Input 
                              id="desktop-image"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, setDesktopImage)}
                              className="hidden"
                              required
                            />
                            <Label 
                              htmlFor="desktop-image"
                              className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                            >
                              {desktopImage ? (
                                <div className="flex items-center">
                                  <img 
                                    src={URL.createObjectURL(desktopImage)} 
                                    alt="Desktop preview" 
                                    className="h-24 object-contain mr-3" 
                                  />
                                  <span className="text-sm text-gray-600">{desktopImage.name}</span>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <Upload className="w-6 h-6 text-gray-600" />
                                  <span className="text-sm text-gray-600">Click to upload desktop image</span>
                                </div>
                              )}
                            </Label>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="tablet-image">Tablet Ad Image</Label>
                          <div className="flex items-center mt-1">
                            <Input 
                              id="tablet-image"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, setTabletImage)}
                              className="hidden"
                              required
                            />
                            <Label 
                              htmlFor="tablet-image"
                              className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                            >
                              {tabletImage ? (
                                <div className="flex items-center">
                                  <img 
                                    src={URL.createObjectURL(tabletImage)} 
                                    alt="Tablet preview" 
                                    className="h-24 object-contain mr-3"
                                  />
                                  <span className="text-sm text-gray-600">{tabletImage.name}</span>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <Upload className="w-6 h-6 text-gray-600" />
                                  <span className="text-sm text-gray-600">Click to upload tablet image</span>
                                </div>
                              )}
                            </Label>
                          </div>
                        </div>
                        
                        <div>
                          <Label htmlFor="mobile-image">Mobile Ad Image</Label>
                          <div className="flex items-center mt-1">
                            <Input 
                              id="mobile-image"
                              type="file"
                              accept="image/*"
                              onChange={(e) => handleFileChange(e, setMobileImage)}
                              className="hidden"
                              required
                            />
                            <Label 
                              htmlFor="mobile-image"
                              className="flex items-center justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none"
                            >
                              {mobileImage ? (
                                <div className="flex items-center">
                                  <img 
                                    src={URL.createObjectURL(mobileImage)} 
                                    alt="Mobile preview" 
                                    className="h-24 object-contain mr-3"
                                  />
                                  <span className="text-sm text-gray-600">{mobileImage.name}</span>
                                </div>
                              ) : (
                                <div className="flex items-center space-x-2">
                                  <Upload className="w-6 h-6 text-gray-600" />
                                  <span className="text-sm text-gray-600">Click to upload mobile image</span>
                                </div>
                              )}
                            </Label>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Summary & Submit */}
                    {startDate && endDate && (
                      <div className="mb-8 p-5 border border-gray-200 rounded-lg bg-gray-50">
                        <h3 className="font-semibold mb-3">Advertisement Summary</h3>
                        <ul className="space-y-2 text-sm text-gray-600">
                          <li>
                            <span className="font-medium">Duration:</span> {startDate} to {endDate}
                          </li>
                          <li>
                            <span className="font-medium">Category:</span> {selectedCategory || "Not selected"}
                          </li>
                          <li>
                            <span className="font-medium">Subcategories:</span> {selectedSubcategories.join(", ") || "None selected"}
                          </li>
                          <li>
                            <span className="font-medium">Estimated Cost:</span> ${getAdPrice().toFixed(2)}
                          </li>
                        </ul>
                      </div>
                    )}
                    
                    <div className="flex justify-end">
                      <Button type="submit" className="bg-gray-900 hover:bg-gray-800">
                        Submit Advertisement Request
                      </Button>
                    </div>
                  </form>
                </div>
              </TabsContent>
              
              <TabsContent value="ad-guidelines">
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold mb-4">Advertising Guidelines & Pricing</h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-medium mb-2">Advertising Packages</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <h4 className="font-semibold mb-2">Basic Package</h4>
                          <p className="text-2xl font-bold mb-2">$50<span className="text-sm font-normal">/day</span></p>
                          <ul className="text-sm space-y-1 mb-4">
                            <li>• Standard ad placement</li>
                            <li>• Single category targeting</li>
                            <li>• Basic analytics reporting</li>
                          </ul>
                          <Button variant="outline" className="w-full">Select</Button>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50 hover:shadow-md transition-shadow relative">
                          <div className="absolute top-0 right-0 bg-gray-900 text-white text-xs px-2 py-1 rounded-bl">Popular</div>
                          <h4 className="font-semibold mb-2">Premium Package</h4>
                          <p className="text-2xl font-bold mb-2">$125<span className="text-sm font-normal">/day</span></p>
                          <ul className="text-sm space-y-1 mb-4">
                            <li>• Premium ad placement</li>
                            <li>• Multiple category targeting</li>
                            <li>• Detailed analytics dashboard</li>
                            <li>• Basic A/B testing</li>
                          </ul>
                          <Button className="w-full bg-gray-900 hover:bg-gray-800">Select</Button>
                        </div>
                        
                        <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                          <h4 className="font-semibold mb-2">Enterprise Package</h4>
                          <p className="text-2xl font-bold mb-2">$300<span className="text-sm font-normal">/day</span></p>
                          <ul className="text-sm space-y-1 mb-4">
                            <li>• Featured ad placement</li>
                            <li>• All category targeting</li>
                            <li>• Advanced analytics & reporting</li>
                            <li>• Full A/B testing capabilities</li>
                            <li>• Dedicated account manager</li>
                          </ul>
                          <Button variant="outline" className="w-full">Contact Sales</Button>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Ad Specifications</h3>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead>
                            <tr>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Device</th>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dimensions</th>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File Format</th>
                              <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Max File Size</th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">Desktop</td>
                              <td className="px-6 py-4 whitespace-nowrap">1200x628 pixels</td>
                              <td className="px-6 py-4 whitespace-nowrap">JPG, PNG, GIF</td>
                              <td className="px-6 py-4 whitespace-nowrap">2MB</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">Tablet</td>
                              <td className="px-6 py-4 whitespace-nowrap">800x400 pixels</td>
                              <td className="px-6 py-4 whitespace-nowrap">JPG, PNG, GIF</td>
                              <td className="px-6 py-4 whitespace-nowrap">1MB</td>
                            </tr>
                            <tr>
                              <td className="px-6 py-4 whitespace-nowrap">Mobile</td>
                              <td className="px-6 py-4 whitespace-nowrap">400x300 pixels</td>
                              <td className="px-6 py-4 whitespace-nowrap">JPG, PNG, GIF</td>
                              <td className="px-6 py-4 whitespace-nowrap">800KB</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-2">Advertising Guidelines</h3>
                      <ul className="list-disc pl-5 space-y-2 text-gray-700">
                        <li>All advertisements must adhere to our content guidelines and policies.</li>
                        <li>Advertisements must be relevant to the Northern Mariana Islands community.</li>
                        <li>We reserve the right to reject any advertisement that doesn't meet our standards.</li>
                        <li>Payment must be made in advance for all advertising campaigns.</li>
                        <li>Ad statistics and performance metrics will be provided at the end of your campaign.</li>
                        <li>For custom advertising solutions or longer-term contracts, please contact our sales team.</li>
                      </ul>
                    </div>
                    
                    <div className="text-center pt-4">
                      <Button className="bg-gray-900 hover:bg-gray-800">
                        Contact Our Advertising Team
                      </Button>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
