import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";

interface LoadingScreenProps {
  onContinue: () => void;
}

const LoadingScreen = ({ onContinue }: LoadingScreenProps) => {
  const [showContinue, setShowContinue] = useState(false);

  useEffect(() => {
    // Show continue button after 3 seconds
    const timer = setTimeout(() => {
      setShowContinue(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Sponsors</h2>
        <div className="space-y-4 mb-6">
          <div className="p-4 bg-blue-50 rounded-lg">
            <h3 className="font-semibold text-blue-900">CNMI's SBDC</h3>
            <p className="text-blue-700">Supporting local businesses and entrepreneurs</p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg">
            <h3 className="font-semibold text-green-900">NMC</h3>
            <p className="text-green-700">Northern Marianas College - Empowering our community through education</p>
          </div>
        </div>
        {showContinue && (
          <Button
            onClick={onContinue}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
          >
            Continue, now that the page has loaded
          </Button>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen; 