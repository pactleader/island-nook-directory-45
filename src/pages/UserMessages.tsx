
import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Send, 
  MessageSquare, 
  Calendar, 
  MapPin,
  MoreHorizontal,
  Phone,
  Mail,
  Clock,
  User
} from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Avatar, 
  AvatarImage, 
  AvatarFallback 
} from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

// Mock listing data (matching IDs from UserListings)
const mockListings = {
  'property-p001': {
    id: 'p001',
    type: 'property',
    title: 'Beachfront Villa with Ocean View',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914',
    price: '$450,000',
    location: 'Saipan, Northern Mariana Islands',
    path: '/properties/p001'
  },
  'vehicle-v-001': {
    id: 'v-001',
    type: 'vehicle',
    title: '2020 Toyota Tacoma 4x4',
    image: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c',
    price: '$28,500',
    location: 'Garapan, Saipan',
    path: '/vehicles/v-001'
  },
  'hotel-hotel-1': {
    id: 'hotel-1',
    type: 'hotel',
    title: 'Pacific Resort & Spa',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945',
    price: '$180/night',
    location: 'Chalan Kanoa, Saipan',
    path: '/hotels/hotel-1'
  },
  'business-b008': {
    id: 'b008',
    type: 'business',
    title: 'Island Coffee Shop',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb',
    price: '',
    location: 'Susupe, Saipan',
    path: '/businesses/b008'
  },
  'event-1': {
    id: '1',
    type: 'event',
    title: 'Summer Cultural Festival',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30',
    price: 'Free Entry',
    location: 'American Memorial Park, Saipan',
    path: '/events/1'
  }
};

// Mock users who have sent messages
const mockUsers = [
  {
    id: 'user1',
    name: 'David Kim',
    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12',
    lastActive: '1 hour ago'
  },
  {
    id: 'user2',
    name: 'Sarah Johnson',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956',
    lastActive: '5 min ago'
  },
  {
    id: 'user3',
    name: 'Michael Torres',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36',
    lastActive: '2 hours ago'
  },
  {
    id: 'user4',
    name: 'Jessica Patel',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04',
    lastActive: '1 day ago'
  }
];

// Mock conversations
const mockConversations = {
  'user1': [
    { id: 1, sender: 'user1', message: 'Hi, is this property still available?', timestamp: '2023-07-15T14:30:00' },
    { id: 2, sender: 'owner', message: 'Yes, it\'s still available. Would you like to schedule a viewing?', timestamp: '2023-07-15T14:35:00' },
    { id: 3, sender: 'user1', message: 'That would be great. I\'m available this weekend.', timestamp: '2023-07-15T14:40:00' },
    { id: 4, sender: 'owner', message: 'Perfect. How about Saturday at 2pm?', timestamp: '2023-07-15T14:45:00' },
    { id: 5, sender: 'user1', message: 'Saturday works for me. Could you share the exact address?', timestamp: '2023-07-15T14:50:00' }
  ],
  'user2': [
    { id: 1, sender: 'user2', message: 'Hello, does this vehicle have 4WD?', timestamp: '2023-08-22T10:20:00' },
    { id: 2, sender: 'owner', message: 'Yes, it\'s a 4WD vehicle with low mileage.', timestamp: '2023-08-22T10:25:00' },
    { id: 3, sender: 'user2', message: 'What\'s the current mileage?', timestamp: '2023-08-22T10:30:00' },
    { id: 4, sender: 'owner', message: 'It has approximately 35,000 miles.', timestamp: '2023-08-22T10:35:00' },
    { id: 5, sender: 'user2', message: 'That\'s not bad. Any mechanical issues I should know about?', timestamp: '2023-08-22T10:40:00' }
  ],
  'user3': [
    { id: 1, sender: 'user3', message: 'Hi there, do you have any availability for next weekend?', timestamp: '2023-06-10T16:15:00' },
    { id: 2, sender: 'owner', message: 'We do have some rooms available. What dates were you looking at?', timestamp: '2023-06-10T16:20:00' },
    { id: 3, sender: 'user3', message: 'Checking in on Friday the 15th and checking out Sunday the 17th.', timestamp: '2023-06-10T16:25:00' },
    { id: 4, sender: 'owner', message: 'We have an ocean view room available for those dates at $180 per night.', timestamp: '2023-06-10T16:30:00' },
    { id: 5, sender: 'user3', message: 'Is breakfast included?', timestamp: '2023-06-10T16:35:00' }
  ],
  'user4': [
    { id: 1, sender: 'user4', message: 'Hello, what are your business hours?', timestamp: '2023-09-05T12:10:00' },
    { id: 2, sender: 'owner', message: 'We\'re open 7am to 7pm Monday through Saturday, and 8am to 5pm on Sundays.', timestamp: '2023-09-05T12:15:00' },
    { id: 3, sender: 'user4', message: 'Do you offer any vegan options?', timestamp: '2023-09-05T12:20:00' },
    { id: 4, sender: 'owner', message: 'Yes, we have several vegan options including pastries and specialty drinks.', timestamp: '2023-09-05T12:25:00' },
    { id: 5, sender: 'user4', message: 'Great! Do you take reservations for larger groups?', timestamp: '2023-09-05T12:30:00' }
  ]
};

type Message = {
  id: number;
  sender: string;
  message: string;
  timestamp: string;
};

const UserMessages = () => {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const listingKey = `${type}-${id}`;
  const listing = mockListings[listingKey as keyof typeof mockListings];

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (!isLoggedIn || isLoggedIn !== 'true') {
      navigate('/login');
      return;
    }
    
    setIsLoading(false);
  }, [navigate]);

  // Load conversation when user is selected
  useEffect(() => {
    if (selectedUser && mockConversations[selectedUser as keyof typeof mockConversations]) {
      setMessages(mockConversations[selectedUser as keyof typeof mockConversations]);
    }
  }, [selectedUser]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedUser) return;
    
    const newMsg = {
      id: messages.length + 1,
      sender: 'owner',
      message: newMessage.trim(),
      timestamp: new Date().toISOString()
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    toast.success('Message sent');
  };

  const formatMessageTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatMessageDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex items-center justify-center flex-grow">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading messages...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex items-center justify-center flex-grow">
          <div className="text-center">
            <p className="text-gray-600">Listing not found.</p>
            <Button onClick={() => navigate('/profile')} className="mt-4">
              Back to Profile
            </Button>
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
        <div className="mb-6">
          <Button variant="ghost" onClick={() => navigate('/user-listings')} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to listings
          </Button>
          
          <Card className="mb-6">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="w-20 h-20 rounded-md object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-xl font-bold">{listing.title}</h2>
                  <div className="flex items-center text-gray-500 mt-1">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span className="text-sm">{listing.location}</span>
                  </div>
                  {listing.price && (
                    <p className="text-blue-600 font-medium mt-1">{listing.price}</p>
                  )}
                </div>
                <div>
                  <Button variant="outline" onClick={() => window.open(listing.path, '_blank')}>
                    View Listing
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* User List */}
          <div className="md:col-span-2 lg:col-span-1">
            <Card className="h-[70vh]">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-medium flex items-center">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Conversations
                  </h3>
                </div>
                
                <div className="space-y-2">
                  {mockUsers.map(user => (
                    <div
                      key={user.id}
                      className={`p-2 rounded-lg cursor-pointer hover:bg-gray-100 ${
                        selectedUser === user.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                      }`}
                      onClick={() => setSelectedUser(user.id)}
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} alt={user.name} />
                          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-grow">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-xs text-gray-500 flex items-center">
                            <Clock className="w-3 h-3 mr-1" />
                            {user.lastActive}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Message Thread */}
          <div className="md:col-span-3 lg:col-span-4">
            <Card className="h-[70vh] flex flex-col">
              {selectedUser ? (
                <>
                  {/* Chat header */}
                  <div className="p-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage 
                          src={mockUsers.find(u => u.id === selectedUser)?.avatar} 
                          alt={mockUsers.find(u => u.id === selectedUser)?.name} 
                        />
                        <AvatarFallback>
                          {mockUsers.find(u => u.id === selectedUser)?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium">
                          {mockUsers.find(u => u.id === selectedUser)?.name}
                        </h3>
                        <div className="text-xs text-gray-500 flex items-center">
                          <User className="w-3 h-3 mr-1" />
                          Interested in {listing.title}
                        </div>
                      </div>
                    </div>
                    <div>
                      <Button variant="ghost" size="icon">
                        <Phone className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Mail className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <ScrollArea className="flex-1 p-4">
                    {messages.map((message, index) => {
                      // Check if we need to show the date
                      const showDate = index === 0 || 
                        new Date(message.timestamp).toDateString() !== 
                        new Date(messages[index - 1].timestamp).toDateString();
                      
                      return (
                        <div key={message.id}>
                          {showDate && (
                            <div className="text-center my-4">
                              <span className="bg-gray-100 text-gray-500 text-xs px-2 py-1 rounded-full">
                                {formatMessageDate(message.timestamp)}
                              </span>
                            </div>
                          )}
                          
                          <div className={`flex ${message.sender === 'owner' ? 'justify-end' : 'justify-start'} mb-4`}>
                            <div className="flex flex-col max-w-[75%]">
                              <div 
                                className={`px-4 py-2 rounded-lg ${
                                  message.sender === 'owner' 
                                    ? 'bg-blue-500 text-white rounded-br-none' 
                                    : 'bg-gray-100 text-gray-800 rounded-bl-none'
                                }`}
                              >
                                {message.message}
                                <div className={`text-xs mt-1 ${message.sender === 'owner' ? 'text-blue-100' : 'text-gray-500'}`}>
                                  {formatMessageTime(message.timestamp)}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                    <div ref={messagesEndRef} />
                  </ScrollArea>
                  
                  {/* Message input */}
                  <div className="p-4 border-t">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Type your message..."
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            handleSendMessage();
                          }
                        }}
                      />
                      <Button onClick={handleSendMessage} disabled={!newMessage.trim()}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center flex-grow">
                  <div className="text-center p-8">
                    <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">Your messages</h3>
                    <p className="text-gray-500 mb-4">
                      Select a conversation to view messages
                    </p>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserMessages;
