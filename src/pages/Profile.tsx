import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { BadgeCheck, Settings, CreditCard, PlusCircle, Inbox } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [advertisingCredit, setAdvertisingCredit] = useState('0');
  const [activeTab, setActiveTab] = useState("profile");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/login');
      return;
    }

    const storedProfile = localStorage.getItem('userProfile');
    const storedVerification = localStorage.getItem('isVerified');
    const storedCredit = localStorage.getItem('advertisingCredit');
    
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      navigate('/profile/setup');
      return;
    }
    
    if (storedVerification === 'true') {
      setIsVerified(true);
    }
    
    if (storedCredit) {
      setAdvertisingCredit(storedCredit);
    }
    
    setIsLoading(false);
  }, [navigate]);

  const handleCreateListingClick = () => {
    navigate('/create-listing');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex items-center justify-center flex-grow">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your profile...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="md:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Profile</span>
                  {isVerified && (
                    <span className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                      <BadgeCheck className="w-4 h-4" />
                      <span className="text-xs font-medium">Verified</span>
                    </span>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full">
                  <TabsList className="flex flex-col items-stretch h-auto bg-transparent">
                    <TabsTrigger value="profile" className="justify-start px-4 py-2">
                      <Settings className="w-4 h-4 mr-2" />
                      Profile Settings
                    </TabsTrigger>
                    <TabsTrigger value="credits" className="justify-start px-4 py-2">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Advertising Credits
                    </TabsTrigger>
                  </TabsList>
                
                  <TabsContent value="profile" className="m-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Profile Information</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium">Full Name</h3>
                            <p>{profile?.fullName || 'Not provided'}</p>
                          </div>
                          <div>
                            <h3 className="font-medium">Mailing Address</h3>
                            <p>{profile?.mailingAddress || 'Not provided'}</p>
                          </div>
                          <div>
                            <h3 className="font-medium">Village</h3>
                            <p>{profile?.village || 'Not provided'}</p>
                          </div>
                          <div>
                            <h3 className="font-medium">Island</h3>
                            <p>{profile?.island || 'Not provided'}</p>
                          </div>
                          <div>
                            <h3 className="font-medium">Phone Number</h3>
                            <p>{profile?.phoneNumber || 'Not provided'}</p>
                          </div>
                          {profile?.whatsappNumber && (
                            <div>
                              <h3 className="font-medium">WhatsApp Number</h3>
                              <p>{profile.whatsappNumber}</p>
                            </div>
                          )}
                          
                          <Button variant="outline" onClick={() => navigate('/profile/setup')}>
                            Edit Profile
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="credits" className="m-0">
                    <Card>
                      <CardHeader>
                        <CardTitle>Advertising Credits</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center py-6">
                          <h2 className="text-3xl font-bold text-green-600">${advertisingCredit}</h2>
                          <p className="text-gray-600 mb-4">Available Credits</p>
                          
                          {!isVerified && (
                            <div className="bg-blue-50 p-4 rounded-lg mb-4">
                              <h3 className="font-medium text-blue-700 mb-2">Get Verified for $5 More</h3>
                              <p className="text-sm text-blue-600 mb-2">
                                Upload your ID and a selfie to earn additional advertising credits.
                              </p>
                              <Button onClick={() => navigate('/profile/setup')} size="sm">
                                Verify Now
                              </Button>
                            </div>
                          )}
                          
                          <Button variant="outline" onClick={() => toast.info("Purchase feature coming soon!")}>
                            Purchase More Credits
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
          
          <div className="md:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <Button 
                onClick={handleCreateListingClick}
                variant="ghost"
                className="p-0 h-auto hover:bg-transparent"
              >
                <div className="w-full">
                  <Card className="hover:bg-gray-50 transition cursor-pointer h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <PlusCircle className="w-10 h-10 text-blue-600 mb-4" />
                      <h3 className="font-medium text-xl mb-2">Create a Listing</h3>
                      <p className="text-gray-600 text-sm">
                        List your property, business, event or vehicle
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </Button>
              
              <Button 
                onClick={() => navigate('/user-listings')}
                variant="ghost"
                className="p-0 h-auto hover:bg-transparent"
              >
                <div className="w-full">
                  <Card className="hover:bg-gray-50 transition cursor-pointer h-full">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                      <Inbox className="w-10 h-10 text-blue-600 mb-4" />
                      <h3 className="font-medium text-xl mb-2">Your Listings & Messages</h3>
                      <p className="text-gray-600 text-sm">
                        Manage your listings and respond to inquiries
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
