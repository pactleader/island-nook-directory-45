import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Clock, Phone, Mail, FileText, ExternalLink } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Mock data for the first government service
const mockService = {
  id: "gov-1",
  title: "Department of Public Safety",
  description: "The Department of Public Safety is the main law enforcement agency in the CNMI. It handles police services, fire protection, emergency management, and more across the islands.",
  location: "Susupe, Saipan",
  hours: "Monday - Friday: 8:00 AM - 5:00 PM",
  phone: "(670) 664-9000",
  email: "info@dps.gov.mp",
  website: "https://dps.gov.mp",
  image: "https://images.unsplash.com/photo-1529485726363-95c8d62f656f",
  services: [
    "Police services",
    "Fire protection",
    "Emergency medical services",
    "Motor vehicle registration",
    "Driver's licensing",
    "Emergency management",
    "Criminal investigations"
  ],
  requirements: [
    "Valid identification",
    "Proof of residency for certain services",
    "Application forms (available on-site or online)"
  ],
  processingTime: "Varies by service; typically 1-14 business days"
};

const GovernmentServiceDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 pt-20 md:pt-[0.2rem] pb-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/government-services" className="hover:text-primary">Government Services</Link>
          <span>/</span>
          <span className="font-medium text-foreground">{mockService.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Main image */}
            <div className="aspect-video overflow-hidden rounded-xl mb-6">
              <img 
                src={mockService.image} 
                alt={mockService.title} 
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Service details */}
            <div>
              <h1 className="text-3xl font-bold mb-2">{mockService.title}</h1>
              
              <Separator className="my-6" />
              
              <Tabs defaultValue="overview">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="services">Services</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="pt-6">
                  <p className="text-muted-foreground mb-6">{mockService.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Location</h3>
                        <p className="text-muted-foreground">{mockService.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Clock className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Hours</h3>
                        <p className="text-muted-foreground">{mockService.hours}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Phone className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Phone</h3>
                        <p className="text-muted-foreground">{mockService.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <Mail className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <h3 className="font-semibold">Email</h3>
                        <p className="text-muted-foreground">{mockService.email}</p>
                      </div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="services" className="pt-6">
                  <h2 className="text-xl font-semibold mb-3">Available Services</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {mockService.services.map((service, index) => (
                      <li key={index}>{service}</li>
                    ))}
                  </ul>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Processing Time</h3>
                    <p className="text-muted-foreground">{mockService.processingTime}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="requirements" className="pt-6">
                  <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {mockService.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                  
                  <div className="mt-6">
                    <h3 className="font-semibold mb-2">Additional Information</h3>
                    <p className="text-muted-foreground">
                      Requirements may vary depending on the specific service. It's recommended to call ahead or check the website for the most current information.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <Button className="w-full flex items-center gap-2" asChild>
                    <a href={mockService.website} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Visit Website
                    </a>
                  </Button>
                  
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Call
                  </Button>
                  
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </Button>
                  
                  <Button variant="outline" className="w-full flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Download Forms
                  </Button>
                  
                  <Separator />
                  
                  <div className="bg-muted rounded-lg p-4">
                    <h3 className="font-semibold mb-2">Emergency Contact</h3>
                    <p className="text-muted-foreground text-sm">For emergencies, please call:</p>
                    <p className="font-semibold">911</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
    </div>
  );
};

export default GovernmentServiceDetails;
