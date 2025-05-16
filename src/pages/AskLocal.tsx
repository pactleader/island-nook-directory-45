
import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const AskLocal = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  
  // FAQ data
  const faqs: FAQ[] = [
    {
      question: "What's the best time of year to visit the Northern Mariana Islands?",
      answer: "The best time to visit is during the dry season between December and June. The weather is generally mild with less rainfall, making it ideal for outdoor activities. However, the islands are beautiful year-round, and visiting during the wet season (July to November) often means fewer tourists and lower prices.",
      category: "travel"
    },
    {
      question: "Do I need a visa to visit the Northern Mariana Islands?",
      answer: "Since the Northern Mariana Islands are a U.S. commonwealth, the same visa requirements for entering the United States apply. Visitors from countries under the Visa Waiver Program can enter without a visa for up to 90 days. Others must obtain a U.S. visa before arrival.",
      category: "travel"
    },
    {
      question: "What's the local currency and do places accept credit cards?",
      answer: "The U.S. Dollar is the official currency. Major credit cards are widely accepted at hotels, restaurants, and larger shops, especially in tourist areas. However, it's advisable to carry some cash for smaller establishments and local markets.",
      category: "money"
    },
    {
      question: "Is tap water safe to drink?",
      answer: "Tap water is generally safe to drink in the major tourist areas, as it's treated according to U.S. standards. However, many visitors prefer bottled water, which is readily available in stores and hotels.",
      category: "health"
    },
    {
      question: "What languages are spoken in the Northern Mariana Islands?",
      answer: "English and Chamorro are the official languages, with Carolinian also recognized. English is widely spoken, especially in tourist areas. Basic English will get you by in most situations, but locals appreciate visitors who learn a few Chamorro phrases.",
      category: "culture"
    },
    {
      question: "What are the must-try local dishes?",
      answer: "Don't miss trying kelaguen (marinated meat dish), red rice, chicken estufao (braised chicken), and kadon pika (spicy stew). Seafood is also excellent, with fresh fish dishes widely available. For dessert, try apigigi (young coconut wrapped in banana leaves) or latiya (layered cake with custard).",
      category: "food"
    },
    {
      question: "What are the main islands to visit?",
      answer: "The three main islands are Saipan, Tinian, and Rota. Saipan is the largest and most developed, with the most tourist facilities. Tinian has historical WWII sites, while Rota offers a more untouched natural experience. Each island has its own charm and attractions.",
      category: "travel"
    },
    {
      question: "Is public transportation available?",
      answer: "Public transportation is limited. Taxis are available but can be expensive. Many visitors rent cars, which is the most convenient way to explore the islands. Some hotels offer shuttle services to major attractions. On Saipan, there are also 'dollar shuttles' that run along Beach Road.",
      category: "transportation"
    },
    {
      question: "What's the tipping etiquette?",
      answer: "As part of the U.S., similar tipping practices apply. It's customary to tip 15-20% at restaurants, $1-2 per bag for bellhops, and $2-5 per day for housekeeping. Taxi drivers typically receive 10-15% of the fare.",
      category: "money"
    },
    {
      question: "Are there any cultural customs I should be aware of?",
      answer: "Respect for elders is important in Chamorro culture. When entering someone's home, it's customary to remove your shoes. Dress modestly when visiting villages or churches. It's also polite to ask permission before taking photos of locals, especially in rural areas.",
      category: "culture"
    }
  ];
  
  // Get unique categories
  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  
  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter(faq => {
    // Filter by search query
    const matchesSearch = !searchQuery || 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by category
    const matchesCategory = !activeCategory || faq.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });
  
  // Toggle FAQ expansion
  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-4">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Ask a Local</h1>
            <p className="text-gray-600">Get answers to common questions about the Northern Mariana Islands</p>
          </div>
          
          {/* Search Bar */}
          <div className="mb-8">
            <div className="glass-card p-6 rounded-xl">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search FAQs or ask a question..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input-field pr-10 w-full"
                />
                <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              
              {/* Categories */}
              <div className="mt-4">
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setActiveCategory(null)}
                    className={`filter-chip ${!activeCategory ? 'active' : ''}`}
                  >
                    All
                  </button>
                  {categories.map((category, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveCategory(category)}
                      className={`filter-chip ${activeCategory === category ? 'active' : ''}`}
                    >
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQs */}
          <div className="space-y-4 mb-10">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Frequently Asked Questions</h2>
            {filteredFAQs.length > 0 ? (
              filteredFAQs.map((faq, index) => (
                <div key={index} className="glass-card rounded-lg overflow-hidden">
                  <button
                    className="w-full p-5 text-left flex justify-between items-center"
                    onClick={() => toggleExpand(index)}
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    {expandedIndex === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </button>
                  {expandedIndex === index && (
                    <div className="p-5 pt-0 border-t border-gray-100">
                      <p className="text-gray-700">{faq.answer}</p>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="glass-card p-8 text-center">
                <MessageCircle size={32} className="mx-auto text-gray-400 mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No FAQs Found</h3>
                <p className="text-gray-600">
                  We couldn't find any FAQs matching your search. Try different keywords or ask a new question.
                </p>
              </div>
            )}
          </div>
          
          {/* Ask a Question Section */}
          <div className="glass-card p-6 rounded-xl mb-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Still have questions?</h2>
            <p className="text-gray-700 mb-6">
              Our community of locals is happy to help with your specific questions about the Northern Mariana Islands.
            </p>
            
            <form className="space-y-4">
              <div>
                <label htmlFor="question" className="block mb-2 text-sm font-medium text-gray-900">Your Question</label>
                <textarea
                  id="question"
                  rows={4}
                  placeholder="Type your question here..."
                  className="input-field w-full"
                ></textarea>
              </div>
              <div className="flex flex-col md:flex-row md:space-x-4 space-y-4 md:space-y-0">
                <div className="flex-1">
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                  <input
                    type="text"
                    id="name"
                    placeholder="Your name"
                    className="input-field w-full"
                  />
                </div>
                <div className="flex-1">
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                  <input
                    type="email"
                    id="email"
                    placeholder="Your email"
                    className="input-field w-full"
                  />
                </div>
              </div>
              <div className="pt-2">
                <button type="submit" className="btn-primary">
                  Submit Question
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AskLocal;
