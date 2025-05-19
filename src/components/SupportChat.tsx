import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/useMediaQuery";

interface Message {
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const SupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { text: 'Welcome to CNMI Central! How can I help you today?', isUser: false, timestamp: new Date() }
  ]);

  const isMobile = useMediaQuery("(max-width: 640px)");
  const isTablet = useMediaQuery("(min-width: 641px) and (max-width: 1024px)");
  const isMobileOrTablet = useMediaQuery("(max-width: 1024px)");

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;

    // Add user message
    setMessages(prev => [...prev, { 
      text: inputMessage, 
      isUser: true, 
      timestamp: new Date() 
    }]);
    
    // Clear input
    setInputMessage('');
    
    // Simulate response (would be replaced with actual API call)
    setTimeout(() => {
      setMessages(prev => [...prev, { 
        text: "Thank you for your message. A support agent will respond shortly.", 
        isUser: false, 
        timestamp: new Date() 
      }]);
    }, 1000);
  };

  const ChatContent = () => (
    <div className="flex flex-col h-full">
      <div className="flex-grow overflow-auto p-4 space-y-4">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.isUser 
                  ? 'bg-blue-600 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p>{message.text}</p>
              <span className={`text-xs ${message.isUser ? 'text-blue-100' : 'text-gray-500'} block mt-1`}>
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="border-t p-4">
        <div className="flex gap-2">
          <Textarea
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message here..."
            className="resize-none"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
          />
          <Button 
            onClick={handleSendMessage}
            size="icon"
            className="shrink-0"
          >
            <Send size={18} />
          </Button>
        </div>
      </div>
    </div>
  );

  // Use different components based on screen size
  if (isMobile) {
    return (
      <>
        <Button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-16 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-50 ${isMobileOrTablet ? 'mb-[60px]' : ''}`}
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>

        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="h-[80vh]">
            <DrawerHeader className="border-b">
              <DrawerTitle className="flex justify-between items-center">
                <span>Support Chat</span>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </DrawerTitle>
            </DrawerHeader>
            <div className="h-full pt-2">
              <ChatContent />
            </div>
          </DrawerContent>
        </Drawer>
      </>
    );
  }

  if (isTablet) {
    return (
      <>
        <Button
          onClick={() => setIsOpen(true)}
          className={`fixed bottom-16 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-50 ${isMobileOrTablet ? 'mb-[60px]' : ''}`}
          size="icon"
        >
          <MessageCircle className="h-6 w-6 text-white" />
        </Button>

        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent className="sm:max-w-[400px] h-full">
            <SheetHeader>
              <SheetTitle className="flex justify-between items-center">
                <span>Support Chat</span>
                <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </SheetTitle>
            </SheetHeader>
            <div className="h-[calc(100%-60px)] pt-2">
              <ChatContent />
            </div>
          </SheetContent>
        </Sheet>
      </>
    );
  }

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 z-50"
        size="icon"
      >
        <MessageCircle className="h-6 w-6 text-white" />
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[500px] h-[600px]">
          <div className="flex flex-col h-full pt-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Support Chat</h2>
            </div>
            <div className="h-full overflow-hidden">
              <ChatContent />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default SupportChat;
