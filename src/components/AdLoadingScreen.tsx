
import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
  const [open, setOpen] = useState(true);

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

  const handleClose = () => {
    setOpen(false);
    onComplete();
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      setOpen(open);
      if (!open) onComplete();
    }}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl">Advertisement</DialogTitle>
        </DialogHeader>
        
        <div className="text-center py-6">
          <p className="text-xl mb-6">{adMessage}</p>
          
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
            <DialogFooter className="sm:justify-center">
              <Button onClick={handleClose}>
                Continue, now that the page has loaded
              </Button>
            </DialogFooter>
          )}
        </div>
        
        <p className="text-center text-sm text-gray-500">
          <a href="/advertise" className="underline hover:text-gray-700">
            Learn how to advertise your business here
          </a>
        </p>
      </DialogContent>
    </Dialog>
  );
};

export default AdLoadingScreen;
