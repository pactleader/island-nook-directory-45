
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface AdLoadingScreenProps {
  onComplete: () => void;
  adMessage?: string;
}

const AdLoadingScreen = ({ 
  onComplete, 
  adMessage = "Today's sponsors are our partners: CNMI's SBDC and NMC" 
}: AdLoadingScreenProps) => {
  const [timeLeft, setTimeLeft] = useState(3);
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setShowContinue(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 z-50 flex flex-col items-center justify-center">
      <div className="text-center max-w-xl px-4">
        <div className="mb-8 text-gray-800 font-medium">
          <h2 className="text-2xl mb-4 font-bold">Advertisement</h2>
          <p className="text-xl">{adMessage}</p>
        </div>
        
        {!showContinue ? (
          <div className="mt-4">
            <p className="text-gray-500">Page loading in {timeLeft} seconds...</p>
            <div className="mt-2 w-48 h-2 bg-gray-200 rounded-full mx-auto overflow-hidden">
              <div 
                className="h-full bg-gray-800 transition-all duration-1000 ease-linear" 
                style={{ width: `${((3 - timeLeft) / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        ) : (
          <Button 
            onClick={onComplete}
            className="mt-4 bg-gray-900 hover:bg-gray-800 text-white py-2 px-6"
          >
            Continue, now that the page has loaded
          </Button>
        )}
      </div>
      
      <p className="absolute bottom-4 text-sm text-gray-500">
        <a href="/advertise" className="underline hover:text-gray-700">
          Learn how to advertise your business here
        </a>
      </p>
    </div>
  );
};

export default AdLoadingScreen;
