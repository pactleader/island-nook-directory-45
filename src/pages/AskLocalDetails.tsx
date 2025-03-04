
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, ThumbsUp, MessageSquare, Share2 } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Mock data for the first question
const mockQuestion = {
  id: 'ask-1',
  title: "Best way to visit Managaha Island?",
  content: "I'm planning to visit Managaha Island during my trip to Saipan next month. What's the best way to get there and what should I expect? Are there any tips for making the most of my visit?",
  image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
  date: "2023-05-20",
  location: "Saipan",
  category: "Activities",
  askedBy: {
    name: "Jessica Chen",
    avatar: "https://i.pravatar.cc/150?img=1",
    location: "New York, USA"
  },
  answers: [
    {
      id: 1,
      content: "Managaha Island is definitely a must-visit! You can take a boat from Smiling Cove Marina in Garapan. There are several operators offering trips, but I recommend Ocean Star because they're reliable and have a good schedule. The boat ride takes about 15-20 minutes.\n\nWhen you get there, you'll find beautiful beaches with crystal clear water, perfect for snorkeling. The island has some historical sites from WWII too. Bring sunscreen, water, and maybe a snack, although there is a small shop on the island.\n\nTry to go early in the morning to avoid crowds and have more time to enjoy the island. The last boat usually leaves around 4 PM.",
      date: "2023-05-21",
      answeredBy: {
        name: "Frank Sablan",
        avatar: "https://i.pravatar.cc/150?img=2",
        location: "Saipan, CNMI",
        isLocal: true,
        yearsOnIsland: 32
      },
      upvotes: 24
    },
    {
      id: 2,
      content: "I visited Managaha last year and can confirm what Frank said. The snorkeling is incredible - so many colorful fish! I'd add that you might want to rent snorkeling gear before you go to the island as it's cheaper in Garapan. Also, if you're into history, check out the Japanese memorial on the island.",
      date: "2023-05-22",
      answeredBy: {
        name: "Maria Torres",
        avatar: "https://i.pravatar.cc/150?img=3",
        location: "San Diego, USA"
      },
      upvotes: 15
    }
  ],
  tags: ["beaches", "activities", "day-trip", "snorkeling"]
};

const AskLocalDetails = () => {
  const { id } = useParams();
  const [newAnswer, setNewAnswer] = useState('');
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/ask-local" className="hover:text-primary">Ask a Local</Link>
          <span>/</span>
          <span className="font-medium text-foreground">{mockQuestion.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Main question */}
            <div className="glass-card p-6 rounded-xl mb-8">
              <div className="flex items-center mb-4">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={mockQuestion.askedBy.avatar} alt={mockQuestion.askedBy.name} />
                  <AvatarFallback>{mockQuestion.askedBy.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">{mockQuestion.askedBy.name}</h3>
                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={14} className="mr-1" />
                    <span>{mockQuestion.askedBy.location}</span>
                  </div>
                </div>
              </div>
              
              <h1 className="text-2xl font-bold mb-3">{mockQuestion.title}</h1>
              
              <p className="text-gray-600 mb-4">{mockQuestion.content}</p>
              
              {/* Question image */}
              <div className="rounded-lg overflow-hidden mb-4">
                <img 
                  src={mockQuestion.image} 
                  alt={mockQuestion.title} 
                  className="w-full h-64 object-cover"
                />
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {mockQuestion.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              
              <div className="flex items-center text-sm text-gray-500 justify-between">
                <div className="flex items-center">
                  <Calendar size={14} className="mr-1" />
                  <span>Asked on {mockQuestion.date}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <button className="flex items-center hover:text-gray-700">
                    <Share2 size={16} className="mr-1" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
            </div>
            
            {/* Answers section */}
            <div>
              <h2 className="text-xl font-semibold mb-4">{mockQuestion.answers.length} Answers</h2>
              
              {mockQuestion.answers.map((answer) => (
                <div key={answer.id} className="glass-card p-6 rounded-xl mb-6">
                  <div className="flex items-start">
                    <div className="mr-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={answer.answeredBy.avatar} alt={answer.answeredBy.name} />
                        <AvatarFallback>{answer.answeredBy.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between mb-1">
                        <div>
                          <h3 className="font-semibold text-gray-900">{answer.answeredBy.name}</h3>
                          <div className="flex items-center text-sm">
                            <MapPin size={14} className="mr-1 text-gray-500" />
                            <span className="text-gray-500">{answer.answeredBy.location}</span>
                            {answer.answeredBy.isLocal && (
                              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                                Local ({answer.answeredBy.yearsOnIsland} years)
                              </span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{answer.date}</span>
                      </div>
                      
                      <p className="text-gray-600 my-3 whitespace-pre-line">{answer.content}</p>
                      
                      <div className="flex items-center space-x-4 mt-4">
                        <button className="flex items-center text-gray-500 hover:text-gray-700">
                          <ThumbsUp size={16} className="mr-1" />
                          <span>{answer.upvotes}</span>
                        </button>
                        <button className="flex items-center text-gray-500 hover:text-gray-700">
                          <MessageSquare size={16} className="mr-1" />
                          <span>Reply</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {/* Add answer form */}
              <div className="glass-card p-6 rounded-xl">
                <h3 className="text-lg font-semibold mb-4">Add Your Answer</h3>
                <textarea
                  value={newAnswer}
                  onChange={(e) => setNewAnswer(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 min-h-32 mb-4 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Share your knowledge or experience..."
                ></textarea>
                <Button>Post Answer</Button>
              </div>
            </div>
          </div>
          
          {/* Sidebar */}
          <div>
            <div className="glass-card p-6 rounded-xl sticky top-24">
              <h3 className="text-lg font-semibold mb-4">About Managaha Island</h3>
              <img 
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e" 
                alt="Managaha Island" 
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <p className="text-gray-600 mb-4">
                Managaha Island is a small islet located in the Saipan Lagoon. It's a popular tourist destination known for its pristine beaches, crystal clear waters, and excellent snorkeling and diving conditions. The island is rich in history, featuring remnants from the Japanese and German colonial periods.
              </p>
              <div className="space-y-3">
                <div className="flex items-center text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>15-minute boat ride from Saipan</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Great for swimming and snorkeling</span>
                </div>
                <div className="flex items-center text-sm">
                  <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                  </div>
                  <span>Historical site with WWII relics</span>
                </div>
              </div>
              <Separator className="my-4" />
              <Link to="/ask-local/new" className="w-full">
                <Button className="w-full">Ask Your Own Question</Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AskLocalDetails;
