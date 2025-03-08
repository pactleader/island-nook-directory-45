
import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Building, 
  Calendar, 
  Car, 
  Clock, 
  Home, 
  Hotel, 
  MessageSquare, 
  ArrowUpDown, 
  Search,
  FilterX 
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';

// Mock data for user listings
const mockListings = [
  {
    id: 'p001',
    type: 'property',
    title: 'Beachfront Villa with Ocean View',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
    datePosted: '2023-07-15',
    unreadMessages: 3,
    path: '/properties/p001'
  },
  {
    id: 'v-001',
    type: 'vehicle',
    title: '2020 Toyota Tacoma 4x4',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c',
    datePosted: '2023-08-22',
    unreadMessages: 0,
    path: '/vehicles/v-001'
  },
  {
    id: 'hotel-1',
    type: 'hotel',
    title: 'Pacific Resort & Spa',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    datePosted: '2023-06-10',
    unreadMessages: 5,
    path: '/hotels/hotel-1'
  },
  {
    id: 'b008',
    type: 'business',
    title: 'Island Coffee Shop',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
    datePosted: '2023-09-05',
    unreadMessages: 1,
    path: '/businesses/b008'
  },
  {
    id: '1',
    type: 'event',
    title: 'Summer Cultural Festival',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
    datePosted: '2023-05-30',
    unreadMessages: 2,
    path: '/events/1'
  }
];

// Type definitions
type Listing = {
  id: string;
  type: string;
  title: string;
  image: string;
  datePosted: string;
  unreadMessages: number;
  path: string;
};

type SortField = 'title' | 'type' | 'datePosted' | 'unreadMessages';
type SortDirection = 'asc' | 'desc';

const UserListings = () => {
  const navigate = useNavigate();
  const [listings, setListings] = useState<Listing[]>([...mockListings]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortField, setSortField] = useState<SortField>('datePosted');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  // Verify user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/login');
    }
  }, [navigate]);

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Filter and sort listings
  const filteredAndSortedListings = listings
    .filter(listing => {
      // Apply search filter
      if (searchTerm && !listing.title.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      // Apply type filter
      if (filterType !== 'all' && listing.type !== filterType) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      // Apply sorting
      if (sortField === 'title') {
        return sortDirection === 'asc'
          ? a.title.localeCompare(b.title)
          : b.title.localeCompare(a.title);
      } else if (sortField === 'type') {
        return sortDirection === 'asc'
          ? a.type.localeCompare(b.type)
          : b.type.localeCompare(a.type);
      } else if (sortField === 'datePosted') {
        return sortDirection === 'asc'
          ? new Date(a.datePosted).getTime() - new Date(b.datePosted).getTime()
          : new Date(b.datePosted).getTime() - new Date(a.datePosted).getTime();
      } else if (sortField === 'unreadMessages') {
        return sortDirection === 'asc'
          ? a.unreadMessages - b.unreadMessages
          : b.unreadMessages - a.unreadMessages;
      }
      return 0;
    });

  // Reset filters
  const resetFilters = () => {
    setSearchTerm('');
    setFilterType('all');
    setSortField('datePosted');
    setSortDirection('desc');
  };

  // Get directory icon
  const getDirectoryIcon = (type: string) => {
    switch (type) {
      case 'property':
        return <Home className="w-5 h-5 text-blue-500" />;
      case 'vehicle':
        return <Car className="w-5 h-5 text-green-500" />;
      case 'hotel':
        return <Hotel className="w-5 h-5 text-purple-500" />;
      case 'business':
        return <Building className="w-5 h-5 text-orange-500" />;
      case 'event':
        return <Calendar className="w-5 h-5 text-pink-500" />;
      default:
        return null;
    }
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Your Listings</h1>
          <p className="text-gray-600">Manage your listings and messages</p>
        </div>
        
        {/* Filters and Search */}
        <div className="bg-white p-4 rounded-lg shadow mb-6">
          <div className="flex flex-col md:flex-row gap-4 mb-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder="Search listings..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="w-full md:w-48">
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger>
                  <SelectValue placeholder="Filter by type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="property">Properties</SelectItem>
                  <SelectItem value="vehicle">Vehicles</SelectItem>
                  <SelectItem value="hotel">Hotels</SelectItem>
                  <SelectItem value="business">Businesses</SelectItem>
                  <SelectItem value="event">Events</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <Button variant="outline" onClick={resetFilters} className="flex items-center gap-2">
              <FilterX className="w-4 h-4" />
              Reset Filters
            </Button>
          </div>
        </div>
        
        {/* Listings Table */}
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Listing
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('type')}
                    >
                      <div className="flex items-center gap-1">
                        Directory
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('datePosted')}
                    >
                      <div className="flex items-center gap-1">
                        Date Posted
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                    <th 
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                      onClick={() => handleSort('unreadMessages')}
                    >
                      <div className="flex items-center gap-1">
                        Messages
                        <ArrowUpDown className="w-4 h-4" />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredAndSortedListings.length > 0 ? (
                    filteredAndSortedListings.map((listing) => (
                      <tr 
                        key={`${listing.type}-${listing.id}`}
                        className="hover:bg-gray-50 cursor-pointer"
                        onClick={() => navigate(`/messages/${listing.type}/${listing.id}`)}
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-16 w-16 flex-shrink-0 mr-4">
                              <img className="h-16 w-16 rounded-md object-cover" src={listing.image} alt={listing.title} />
                            </div>
                            <div>
                              <div className="text-sm font-medium text-gray-900">{listing.title}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            {getDirectoryIcon(listing.type)}
                            <span className="text-sm text-gray-900 capitalize">{listing.type}s</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-gray-500" />
                            <span className="text-sm text-gray-500">{formatDate(listing.datePosted)}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="inline-flex items-center justify-center">
                              <MessageSquare className="w-4 h-4 text-gray-500" />
                              {listing.unreadMessages > 0 && (
                                <span className="absolute bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center -mt-3 -mr-3">
                                  {listing.unreadMessages}
                                </span>
                              )}
                            </div>
                            <span className="text-sm text-gray-500 ml-1">
                              {listing.unreadMessages > 0 ? `${listing.unreadMessages} new` : 'No new messages'}
                            </span>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                        No listings found matching your search criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserListings;
