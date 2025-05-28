import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  MapPin,
  Calendar,
  Car,
  Fuel,
  Gauge,
  BarChart,
  Star,
  Phone,
  Mail,
  User,
  DollarSign,
  Tag,
  Info,
  Calendar as CalendarIcon,
} from 'lucide-react';
import { VehicleListing, mockVehicles } from '../utils/mockData';
import Navigation from '@/components/Navigation';

const VehicleDetails = () => {
  const { id } = useParams();
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  const vehicle = mockVehicles.find(v => v.id === id);

  if (!vehicle) {
    return (
      <div className="container mx-auto px-4 py-20 text-center">
        <h1 className="text-3xl font-bold mb-6">Vehicle Not Found</h1>
        <p className="mb-6">The vehicle you're looking for doesn't exist or may have been removed.</p>
        <Button asChild>
          <Link to="/vehicles">Back to Vehicles</Link>
        </Button>
      </div>
    );
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 pt-20 md:pt-[0.2rem] pb-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link to="/" className="hover:text-primary">Home</Link>
            <span>/</span>
            <Link to="/vehicles" className="hover:text-primary">Vehicles</Link>
            <span>/</span>
            <span className="font-medium text-foreground">{vehicle.title}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Left column - Images and details */}
            <div className="md:col-span-2">
              {/* Main image carousel */}
              <Carousel className="w-full mb-4">
                <CarouselContent>
                  {vehicle.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video overflow-hidden rounded-lg">
                        <img 
                          src={image} 
                          alt={`${vehicle.title} - Image ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2" />
                <CarouselNext className="right-2" />
              </Carousel>

              {/* Thumbnail images */}
              <div className="flex flex-wrap gap-2 mb-8">
                {vehicle.images.map((image, index) => (
                  <div 
                    key={index}
                    className={`relative w-20 h-20 overflow-hidden rounded-md cursor-pointer border-2 ${activeImageIndex === index ? 'border-primary' : 'border-transparent'}`}
                    onClick={() => setActiveImageIndex(index)}
                  >
                    <img 
                      src={image} 
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>

              {/* Vehicle details */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-2">{vehicle.title}</h1>
                <div className="flex items-center gap-2 text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4" />
                  <span>{vehicle.sellerLocation}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <BarChart className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{vehicle.year}</div>
                      <div className="text-sm text-muted-foreground">Year</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Fuel className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{vehicle.fuelType}</div>
                      <div className="text-sm text-muted-foreground">Fuel</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{vehicle.transmission}</div>
                      <div className="text-sm text-muted-foreground">Transmission</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Gauge className="h-5 w-5 text-primary" />
                    <div>
                      <div className="font-medium">{vehicle.mileage?.toLocaleString() || 'New'}</div>
                      <div className="text-sm text-muted-foreground">Mileage</div>
                    </div>
                  </div>
                </div>

                <Separator className="my-6" />

                {/* Description */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">About This Vehicle</h2>
                  <p className="text-muted-foreground">{vehicle.description}</p>
                </div>

                {/* Features */}
                <div className="mb-6">
                  <h2 className="text-xl font-semibold mb-3">Features</h2>
                  <div className="grid grid-cols-2 gap-2">
                    {vehicle.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-primary" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tabs for more information */}
                <Tabs defaultValue="specs" className="mt-8">
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="specs">Specifications</TabsTrigger>
                    <TabsTrigger value="condition">Condition</TabsTrigger>
                    <TabsTrigger value="history">History</TabsTrigger>
                  </TabsList>
                  <TabsContent value="specs" className="p-4 bg-muted/30 rounded-md mt-2">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="font-semibold mb-2">Basic Specs</h3>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Make:</span>
                            <span className="font-medium">{vehicle.make}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Model:</span>
                            <span className="font-medium">{vehicle.model}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Year:</span>
                            <span className="font-medium">{vehicle.year}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Body Style:</span>
                            <span className="font-medium">{vehicle.bodyStyle}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Exterior Color:</span>
                            <span className="font-medium">{vehicle.exteriorColor}</span>
                          </li>
                        </ul>
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2">Performance</h3>
                        <ul className="space-y-2">
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Engine:</span>
                            <span className="font-medium">{vehicle.engine}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Transmission:</span>
                            <span className="font-medium">{vehicle.transmission}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Fuel Type:</span>
                            <span className="font-medium">{vehicle.fuelType}</span>
                          </li>
                          <li className="flex justify-between">
                            <span className="text-muted-foreground">Interior Color:</span>
                            <span className="font-medium">{vehicle.interiorColor}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </TabsContent>
                  <TabsContent value="condition" className="p-4 bg-muted/30 rounded-md mt-2">
                    <h3 className="font-semibold mb-2">Vehicle Condition</h3>
                    <div className="mb-3">
                      <div className="font-medium">Condition: {vehicle.condition === 'new' ? 'New' : 'Used'}</div>
                      {vehicle.condition === 'used' && vehicle.mileage && (
                        <div className="text-muted-foreground mt-1">
                          This vehicle has {vehicle.mileage.toLocaleString()} miles on the odometer.
                        </div>
                      )}
                    </div>
                    <p className="text-muted-foreground mb-3">
                      This {vehicle.year} {vehicle.make} {vehicle.model} is in excellent condition. 
                      All maintenance is up to date, and the vehicle has passed all necessary inspections.
                    </p>
                    {vehicle.condition === 'used' && (
                      <div className="text-muted-foreground">
                        <p>Vehicle has been well-maintained with regular service intervals.</p>
                        <p>No accident history reported by the seller.</p>
                        <p>All original documentation and service records available upon request.</p>
                      </div>
                    )}
                  </TabsContent>
                  <TabsContent value="history" className="p-4 bg-muted/30 rounded-md mt-2">
                    <h3 className="font-semibold mb-2">Vehicle History</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      <li>One owner vehicle</li>
                      <li>No reported accidents or damage</li>
                      <li>Regular maintenance performed</li>
                      <li>Originally purchased on: {formatDate(vehicle.createdAt)}</li>
                      <li>Title: Clean</li>
                    </ul>
                  </TabsContent>
                </Tabs>
              </div>
            </div>

            {/* Right column - Pricing and seller info */}
            <div>
              {/* Pricing card */}
              <Card className="mb-6 sticky top-4">
                <CardContent className="p-6">
                  <div className="text-3xl font-bold mb-2">${vehicle.price.toLocaleString()}</div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Tag className="h-4 w-4" />
                    <span>{vehicle.condition === 'new' ? 'New Vehicle' : 'Used Vehicle'}</span>
                  </div>
                  
                  <Button className="w-full mb-4">Contact Seller</Button>
                  <Button variant="outline" className="w-full">Schedule Test Drive</Button>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Seller Information</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2">
                        <User className="h-4 w-4 text-muted-foreground" />
                        <span>{vehicle.sellerName}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        <span>{vehicle.sellerLocation}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span>{vehicle.sellerContact}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Info className="h-4 w-4 text-muted-foreground" />
                        <span>Seller Type: {vehicle.sellerType === 'dealer' ? 'Dealership' : 'Private Seller'}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4 text-muted-foreground" />
                        <span>Listed on: {formatDate(vehicle.createdAt)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Financing calculator */}
              <Card className="mb-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Financing Calculator</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Vehicle Price</span>
                        <span>${vehicle.price.toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-2 bg-primary rounded-full w-full"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Down Payment (20%)</span>
                        <span>${(vehicle.price * 0.2).toLocaleString()}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full">
                        <div className="h-2 bg-primary rounded-full w-[20%]"></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Loan Amount</span>
                        <span>${(vehicle.price * 0.8).toLocaleString()}</span>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Est. Monthly Payment (60 mo, 5%)</span>
                        <span>${((vehicle.price * 0.8) * (0.05/12) / (1 - Math.pow(1 + (0.05/12), -60))).toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mt-4">
                      This is an estimate. Your actual payment may vary based on your credit score, down payment, and loan term.
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Similar vehicles */}
              <div className="bg-muted/30 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Similar Vehicles</h3>
                <div className="space-y-3">
                  {mockVehicles
                    .filter(v => v.id !== vehicle.id && v.make === vehicle.make)
                    .slice(0, 3)
                    .map(v => (
                      <Link 
                        key={v.id} 
                        to={`/vehicles/${v.id}`}
                        className="flex items-center gap-3 hover:bg-muted/50 p-2 rounded-md transition-colors"
                      >
                        <div className="w-16 h-12 overflow-hidden rounded-md flex-shrink-0">
                          <img src={v.images[0]} alt={v.title} className="w-full h-full object-cover" />
                        </div>
                        <div>
                          <div className="font-medium text-sm line-clamp-1">{v.title}</div>
                          <div className="text-sm text-muted-foreground">${v.price.toLocaleString()}</div>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default VehicleDetails;
