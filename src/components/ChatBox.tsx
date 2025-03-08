
import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Bot } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  timestamp: Date;
}

interface ChatBoxProps {
  onClose: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onClose }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'bot',
      text: 'Hi there! I'm your virtual assistant. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Predefined responses for demo purposes
  const demoResponses: Record<string, string> = {
    'property': 'Our property listings include homes, apartments, and commercial real estate across the Northern Mariana Islands. You can browse all properties at /properties.',
    'vehicle': 'We have a wide range of vehicles available for sale or rent. Check out our vehicle listings at /vehicles to find cars, trucks, and more.',
    'business': 'Local businesses in CNMI can be found in our business directory at /businesses. This includes restaurants, shops, and various services.',
    'event': 'Upcoming events in the islands can be viewed at /events. This includes festivals, community gatherings, and more.',
    'hotel': 'Looking for accommodation? Browse our hotel listings at /hotels to find the perfect place to stay during your visit.',
    'government': 'Information about government services can be found at /government-services.',
    'account': 'You can create an account by clicking on Sign Up in the navigation menu. This will allow you to save favorites and create listings.',
    'listing': 'To create a listing, log in to your account and go to /create-listing. You can list properties, vehicles, businesses, and more.',
    'contact': 'For direct support, please email support@cnmicentral.com or call (670) 123-4567.',
    'payment': 'We accept various payment methods including credit cards, PayPal, and bank transfers for premium listings.',
    'hours': 'Our customer service is available Monday to Friday, 8:00 AM to 5:00 PM ChST (Chamorro Standard Time).',
  };

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Simulate AWS Bedrock response
  const simulateAIResponse = (query: string) => {
    setIsTyping(true);
    
    // Simulate network delay
    setTimeout(() => {
      const lowercaseQuery = query.toLowerCase();
      let response = "I'm not sure I understand. Could you please rephrase your question?";
      
      // Check for keywords in the query
      for (const [keyword, answer] of Object.entries(demoResponses)) {
        if (lowercaseQuery.includes(keyword)) {
          response = answer;
          break;
        }
      }
      
      // Add new message from bot
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: response,
          timestamp: new Date(),
        },
      ]);
      
      setIsTyping(false);
    }, 1500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      sender: 'user',
      text: input,
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate AI response
    simulateAIResponse(input);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="bg-white rounded-lg shadow-2xl w-80 sm:w-96 flex flex-col border border-gray-200 animate-fade-in">
      {/* Header */}
      <div className="bg-gray-900 text-white p-3 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Bot size={20} />
          <h3 className="font-semibold">CNMI Support</h3>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-300 hover:text-white transition-colors"
          aria-label="Close chat"
        >
          <X size={18} />
        </button>
      </div>
      
      {/* Messages */}
      <div className="flex-1 p-3 overflow-y-auto max-h-96 space-y-3">
        {messages.map((message, index) => (
          <div 
            key={index} 
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div 
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user' 
                  ? 'bg-gray-900 text-white rounded-br-none' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-none'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className="text-xs mt-1 block opacity-70">{formatTime(message.timestamp)}</span>
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg rounded-bl-none max-w-[80%]">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      {/* Input */}
      <form onSubmit={handleSubmit} className="border-t border-gray-200 p-3 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your question..."
          className="flex-1 p-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-gray-400"
        />
        <Button
          type="submit" 
          size="sm"
          variant="default"
          className="bg-gray-900 hover:bg-gray-800"
          disabled={isTyping}
        >
          <Send size={16} />
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;
