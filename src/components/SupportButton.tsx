
import { useState } from 'react';
import { MessageCircleQuestion } from 'lucide-react';
import ChatBox from './ChatBox';

const SupportButton = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {isChatOpen ? (
        <ChatBox onClose={() => setIsChatOpen(false)} />
      ) : (
        <button
          onClick={() => setIsChatOpen(true)}
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:shadow-xl"
          aria-label="Open support chat"
        >
          <MessageCircleQuestion size={20} />
          <span className="text-sm font-medium">Got Questions? Let Me Help!</span>
        </button>
      )}
    </div>
  );
};

export default SupportButton;
