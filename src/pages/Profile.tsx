
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Plus, MessageSquare, User, Settings, CreditCard, Shield, LogOut, ChevronRight } from 'lucide-react';
import { toast } from "sonner";
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Profile = () => {
  const [profileData, setProfileData] = useState<any>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [credit, setCredit] = useState('0');
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    
    // Get profile data
    const storedProfileData = localStorage.getItem('profileData');
    if (storedProfileData) {
      setProfileData(JSON.parse(storedProfileData));
    }
    
    // Check if user is verified
    const verified = localStorage.getItem('identityVerified');
    setIsVerified(verified === 'true');
    
    // Get advertising credit
    const adCredit = localStorage.getItem('advertisingCredit') || '0';
    setCredit(adCredit);
  }, [navigate]);
  
  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    toast.success("You have been logged out");
    navigate('/login');
  };
  
  if (!profileData) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-grow flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
              <p className="text-gray-600">Manage your account and listings</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="glass-card p-6 rounded-xl sticky top-24">
                  <div className="text-center mb-6">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl font-semibold mx-auto">
                        {profileData.fullName ? profileData.fullName.charAt(0).toUpperCase() : "U"}
                      </div>
                      {isVerified && (
                        <Badge className="absolute bottom-0 right-0 bg-blue-100 text-blue-800 border-blue-200">
                          <Shield className="h-3 w-3 mr-1" /> Verified
                        </Badge>
                      )}
                    </div>
                    <h2 className="text-xl font-semibold mt-4">{profileData.fullName}</h2>
                    <p className="text-gray-500">{localStorage.getItem('userEmail')}</p>
                    <div className="mt-2">
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                        ${credit} Credit
                      </Badge>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <nav className="space-y-1">
                    <a href="#" className="flex items-center px-3 py-2 text-gray-900 bg-gray-100 rounded-md font-medium">
                      <User className="h-5 w-5 mr-3 text-gray-500" />
                      <span>Profile</span>
                    </a>
                    <a href="#listings" className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
                      <MessageSquare className="h-5 w-5 mr-3 text-gray-500" />
                      <span>My Listings & Messages</span>
                    </a>
                    <a href="#" className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
                      <Settings className="h-5 w-5 mr-3 text-gray-500" />
                      <span>Account Settings</span>
                    </a>
                    <a href="#" className="flex items-center px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md">
                      <CreditCard className="h-5 w-5 mr-3 text-gray-500" />
                      <span>Billing</span>
                    </a>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md"
                    >
                      <LogOut className="h-5 w-5 mr-3 text-gray-500" />
                      <span>Log Out</span>
                    </button>
                  </nav>
                </div>
              </div>
              
              {/* Main content */}
              <div className="lg:col-span-3 space-y-8">
                {/* Quick actions */}
                <div className="glass-card p-6 rounded-xl">
                  <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Link to="/profile/create-listing" className="w-full">
                      <Button className="w-full h-auto py-6 flex items-center justify-center flex-col">
                        <Plus className="h-8 w-8 mb-2" />
                        <span className="text-lg font-medium">Create a Listing</span>
                      </Button>
                    </Link>
                    <Link to="/profile/listings" className="w-full">
                      <Button variant="outline" className="w-full h-auto py-6 flex items-center justify-center flex-col">
                        <MessageSquare className="h-8 w-8 mb-2 text-gray-500" />
                        <span className="text-lg font-medium text-gray-700">View Listings & Messages</span>
                      </Button>
                    </Link>
                  </div>
                </div>
                
                {/* Account Info */}
                <div className="glass-card p-6 rounded-xl">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Account Information</h2>
                    <Button variant="outline" size="sm">
                      Edit
                    </Button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                      <p className="mt-1">{profileData.fullName}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Email</h3>
                      <p className="mt-1">{localStorage.getItem('userEmail')}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Mailing Address</h3>
                      <p className="mt-1">{profileData.mailingAddress}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Phone Number</h3>
                      <p className="mt-1">{profileData.phoneNumber}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Village</h3>
                      <p className="mt-1">{profileData.village}</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Island</h3>
                      <p className="mt-1">{profileData.island}</p>
                    </div>
                  </div>
                </div>
                
                {/* Verification Status */}
                {isVerified ? (
                  <div className="glass-card p-6 rounded-xl bg-blue-50 border border-blue-100">
                    <div className="flex items-start">
                      <Shield className="h-8 w-8 text-blue-500 mr-4" />
                      <div>
                        <h2 className="text-xl font-semibold text-blue-800">Verified Account</h2>
                        <p className="text-blue-700 mt-1">
                          Your identity has been verified. Your profile now displays a verification badge.
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="glass-card p-6 rounded-xl bg-yellow-50 border border-yellow-100">
                    <div className="flex items-start">
                      <Shield className="h-8 w-8 text-yellow-500 mr-4" />
                      <div>
                        <h2 className="text-xl font-semibold text-yellow-800">Complete Verification</h2>
                        <p className="text-yellow-700 mt-1">
                          Verify your identity to receive an additional $5 in advertising credit and get the verified badge on your profile.
                        </p>
                        <Button className="mt-3" variant="outline">
                          Verify Now
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Profile;
