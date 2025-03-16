
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { User, Mail, Phone, MapPin, Heart, Star, Bell, Settings, LogOut } from 'lucide-react';
import ProfileFavorites from '../components/ProfileFavorites';

const Profile = () => {
  // Demo user data
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    phone: "+1 (555) 123-4567",
    location: "Saipan, Northern Mariana Islands",
    profilePicture: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    listingsCount: 3,
    favoriteCount: 12,
    memberSince: "June 2022"
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-24">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - User Profile */}
            <div className="lg:col-span-1">
              {/* User Card */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-white shadow-md">
                    <img src={user.profilePicture} alt={user.name} className="w-full h-full object-cover" />
                  </div>
                  
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h1>
                  <p className="text-gray-500 text-sm mb-4">Member since {user.memberSince}</p>
                  
                  <div className="w-full border-t border-gray-200 pt-4 mt-2">
                    <div className="flex items-center py-2">
                      <Mail size={18} className="text-gray-500 mr-3" />
                      <span className="text-gray-700">{user.email}</span>
                    </div>
                    <div className="flex items-center py-2">
                      <Phone size={18} className="text-gray-500 mr-3" />
                      <span className="text-gray-700">{user.phone}</span>
                    </div>
                    <div className="flex items-center py-2">
                      <MapPin size={18} className="text-gray-500 mr-3" />
                      <span className="text-gray-700">{user.location}</span>
                    </div>
                  </div>
                  
                  <button className="w-full mt-6 btn-secondary">
                    Edit Profile
                  </button>
                </div>
              </div>
              
              {/* Menu Card */}
              <div className="glass-card rounded-xl overflow-hidden">
                <nav className="flex flex-col">
                  <a href="/profile" className="flex items-center px-6 py-4 text-gray-900 bg-gray-100 border-l-4 border-gray-900">
                    <User size={20} className="mr-3" />
                    <span>Profile Overview</span>
                  </a>
                  <a href="/user-listings" className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors">
                    <Star size={20} className="mr-3" />
                    <span>My Listings</span>
                  </a>
                  <a href="/favorites" className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors">
                    <Heart size={20} className="mr-3" />
                    <span>Favorites</span>
                  </a>
                  <a href="#" className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors">
                    <Bell size={20} className="mr-3" />
                    <span>Notifications</span>
                  </a>
                  <a href="#" className="flex items-center px-6 py-4 text-gray-700 hover:bg-gray-50 transition-colors">
                    <Settings size={20} className="mr-3" />
                    <span>Account Settings</span>
                  </a>
                  <a href="/login" className="flex items-center px-6 py-4 text-red-600 hover:bg-red-50 transition-colors">
                    <LogOut size={20} className="mr-3" />
                    <span>Log Out</span>
                  </a>
                </nav>
              </div>
            </div>
            
            {/* Right Column - Content */}
            <div className="lg:col-span-2">
              {/* Activity Summary */}
              <div className="glass-card rounded-xl p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Activity Summary</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{user.listingsCount}</div>
                    <div className="text-gray-500">Active Listings</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-gray-900 mb-1">{user.favoriteCount}</div>
                    <div className="text-gray-500">Favorite Items</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-gray-900 mb-1">8</div>
                    <div className="text-gray-500">Messages</div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg">
                    <div className="text-3xl font-bold text-gray-900 mb-1">2</div>
                    <div className="text-gray-500">Reviews</div>
                  </div>
                </div>
              </div>
              
              {/* Favorites Section */}
              <ProfileFavorites />
              
              {/* Recent Activity */}
              <div className="glass-card rounded-xl p-6 mt-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 rounded-lg flex items-start">
                    <div className="bg-blue-100 p-2 rounded-md mr-3">
                      <Star size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">You added a new listing</p>
                      <p className="text-gray-500 text-sm">Ocean View Apartment - Saipan</p>
                      <p className="text-gray-400 text-xs mt-1">2 days ago</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg flex items-start">
                    <div className="bg-pink-100 p-2 rounded-md mr-3">
                      <Heart size={18} className="text-pink-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">You favorited a property</p>
                      <p className="text-gray-500 text-sm">Beachfront Villa - Tinian</p>
                      <p className="text-gray-400 text-xs mt-1">5 days ago</p>
                    </div>
                  </div>
                  <div className="p-4 bg-gray-50 rounded-lg flex items-start">
                    <div className="bg-green-100 p-2 rounded-md mr-3">
                      <Mail size={18} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-900 font-medium">You received a new message</p>
                      <p className="text-gray-500 text-sm">From: Sarah Smith regarding "Toyota Camry"</p>
                      <p className="text-gray-400 text-xs mt-1">1 week ago</p>
                    </div>
                  </div>
                </div>
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
