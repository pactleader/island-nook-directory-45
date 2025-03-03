
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MapPin, MessageCircle, ThumbsUp, Share2, Flag, Calendar } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Mock data for the first AskLocal question
const mockQuestion = {
  id: "ask-1",
  title: "Best local food spots in Garapan?",
  content: "I'll be visiting Saipan next month and staying in Garapan. I'm looking for authentic local food spots that aren't just tourist traps. Where do locals actually eat? I'm particularly interested in trying Chamorro and Carolinian dishes. Any recommendations for specific dishes I should try while I'm there?",
  author: {
    name: "TravelingFoodie",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e",
    joinDate: "Member since Jun 2022"
  },
  posted: "3 days ago",
  views: 245,
  upvotes: 18,
  answers: [
    {
      id: 1,
      author: {
        name: "IslandLocal",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80",
        joinDate: "Member since Jan 2019"
      },
      content: "For authentic local food in Garapan, you should definitely check out Shirley's Coffee Shop - it's where many locals go for breakfast and lunch. Try their Chamorro breakfast with red rice, eggs, and spam. \n\nAlso, don't miss J's Restaurant for some amazing kadun pika (spicy chicken stew). For street food, head to the Garapan Street Market on Thursday nights where local vendors sell various dishes.\n\nFor Carolinian dishes specifically, those are a bit harder to find in restaurants, but some places will have apigigi (young coconut wrapped in banana leaves) or atolei (sweet taro soup).",
      posted: "2 days ago",
      upvotes: 12,
      isAccepted: true
    },
    {
      id: 2,
      author: {
        name: "SaipanTour",
        image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2",
        joinDate: "Member since Mar 2021"
      },
      content: "I would add that you should also try Cafe 670 - it's a bit of a hidden gem but serves great local dishes. Their chicken kelaguen is excellent!\n\nAlso consider heading out of Garapan to Susupe where you'll find the Saturday Morning Market with lots of local food vendors. It's worth the short trip.",
      posted: "1 day ago",
      upvotes: 8,
      isAccepted: false
    }
  ],
  tags: ["food", "restaurants", "local-cuisine", "garapan", "saipan"],
  relatedQuestions: [
    "Best beaches for swimming in Saipan?",
    "Local transportation options in CNMI?",
    "Where to find authentic souvenirs?",
    "Cultural events in July?"
  ]
};

const AskLocalDetails = () => {
  const { id } = useParams();

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to="/ask-local" className="hover:text-primary">Ask Local</Link>
          <span>/</span>
          <span className="font-medium text-foreground">{mockQuestion.title}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content */}
          <div className="lg:col-span-2">
            {/* Question */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h1 className="text-2xl font-bold mb-4">{mockQuestion.title}</h1>
                
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarImage src={mockQuestion.author.image} alt={mockQuestion.author.name} />
                    <AvatarFallback>{mockQuestion.author.name.substring(0, 2)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{mockQuestion.author.name}</p>
                    <p className="text-sm text-muted-foreground">{mockQuestion.author.joinDate}</p>
                  </div>
                </div>
                
                <div className="text-muted-foreground mb-4 whitespace-pre-line">
                  {mockQuestion.content}
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {mockQuestion.tags.map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-muted rounded-md text-xs">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {mockQuestion.posted}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {mockQuestion.answers.length} answers
                  </span>
                  <span className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    {mockQuestion.upvotes} upvotes
                  </span>
                </div>
              </CardContent>
            </Card>
            
            {/* Answers */}
            <h2 className="text-xl font-semibold mb-4">{mockQuestion.answers.length} Answers</h2>
            
            {mockQuestion.answers.map((answer) => (
              <Card key={answer.id} className={`mb-4 ${answer.isAccepted ? 'border-green-500' : ''}`}>
                <CardContent className="p-6">
                  {answer.isAccepted && (
                    <div className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded mb-4 inline-block">
                      Accepted Answer
                    </div>
                  )}
                  
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarImage src={answer.author.image} alt={answer.author.name} />
                      <AvatarFallback>{answer.author.name.substring(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{answer.author.name}</p>
                      <p className="text-sm text-muted-foreground">{answer.author.joinDate}</p>
                    </div>
                  </div>
                  
                  <div className="text-muted-foreground mb-4 whitespace-pre-line">
                    {answer.content}
                  </div>
                  
                  <div className="flex justify-between items-center text-sm text-muted-foreground">
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {answer.posted}
                      </span>
                      <span className="flex items-center gap-1">
                        <ThumbsUp className="h-4 w-4" />
                        {answer.upvotes} upvotes
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <ThumbsUp className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
            
            {/* Answer form */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Add Your Answer</h3>
                <textarea 
                  className="w-full p-3 border rounded-md min-h-32 mb-4" 
                  placeholder="Share your local knowledge or experience..."
                />
                <Button>Post Answer</Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Sidebar */}
          <div>
            <Card className="sticky top-24 mb-6">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Related Questions</h3>
                <ul className="space-y-2">
                  {mockQuestion.relatedQuestions.map((q, index) => (
                    <li key={index}>
                      <Link to="#" className="text-primary hover:underline">{q}</Link>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Ask Your Own Question</h3>
                <p className="text-muted-foreground mb-4">
                  Have a question about the Northern Mariana Islands? Our community of locals is here to help.
                </p>
                <Button className="w-full">Ask a Question</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AskLocalDetails;
