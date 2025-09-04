import { useState, useEffect } from 'react';
import { X, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useUserPreferences, UserPreferences } from '@/hooks/useUserPreferences';

// Cookie utility functions
const setCookie = (name: string, value: string, days: number) => {
  const expires = new Date();
  expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
};

const getCookie = (name: string): string | null => {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
};

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  isFirstTime?: boolean;
}

const SettingsModal = ({ isOpen, onClose, isFirstTime }: SettingsModalProps) => {
  const { preferences, savePreferences } = useUserPreferences();
  const [localPreferences, setLocalPreferences] = useState<UserPreferences>(preferences);

  // Check if this is the first time visiting the website
  const isFirstTimeVisitor = () => {
    return getCookie('hasVisitedBefore') === null;
  };

  // Mark user as having visited before
  const markAsVisited = () => {
    setCookie('hasVisitedBefore', 'true', 365); // Remember for 1 year
  };

  // Update local preferences when modal opens or preferences change
  useEffect(() => {
    if (isOpen) {
      setLocalPreferences(preferences);
    }
  }, [isOpen, preferences]);

  // Handle preference change
  const handlePreferenceChange = (type: keyof UserPreferences, value: string) => {
    const newPreferences = { ...localPreferences, [type]: value };
    setLocalPreferences(newPreferences);
  };

  // Save preferences and close modal
  const handleSave = () => {
    savePreferences(localPreferences);
    markAsVisited(); // Mark user as having visited before
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-[99999] flex items-center justify-center p-2 sm:p-4"
      onClick={isFirstTime ? undefined : onClose} // Prevent closing by clicking outside for first-time visitors
    >
      <div className="bg-white rounded-lg shadow-xl w-full max-w-[500px] max-h-[90vh] mx-2 sm:mx-4 relative flex flex-col">
                            {/* Header */}
                    <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-200">
                      <h2 className="text-lg font-semibold text-blue-600">
                        {isFirstTime ? 'Welcome! Let\'s personalize your experience' : 'To improve your journey...'}
                      </h2>
                      {!isFirstTime && (
                        <button
                          onClick={onClose}
                          className="text-blue-600 hover:text-blue-800 transition-colors"
                        >
                          <X size={20} />
                        </button>
                      )}
                    </div>

        {/* Content */}
        <div className="flex-1 p-3 sm:p-4 space-y-3 sm:space-y-4 overflow-y-auto">
          {/* Language Preference */}
          <div className="space-y-1.5 sm:space-y-2">
            <h3 className="text-sm font-medium text-gray-900">Language Preference</h3>
            <div className="space-y-1.5">
              {['English', 'Korean', 'Japanese', 'Chinese'].map((language) => (
                <label key={language} className="flex items-center space-x-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="language"
                      value={language}
                      checked={localPreferences.language === language}
                      onChange={(e) => handlePreferenceChange('language', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-3.5 h-3.5 rounded-full border-2 border-blue-600 flex items-center justify-center ${
                      localPreferences.language === language ? 'bg-blue-600' : 'bg-white'
                    }`}>
                      {localPreferences.language === language && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-700">{language}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Island Preference */}
          <div className="space-y-1.5 sm:space-y-2">
            <h3 className="text-sm font-medium text-gray-900">Island Preference</h3>
            <div className="space-y-1.5">
              {['All Islands', 'Saipan', 'Tinian', 'Rota'].map((island) => (
                <label key={island} className="flex items-center space-x-2 cursor-pointer">
                  <div className="relative">
                    <input
                      type="radio"
                      name="island"
                      value={island}
                      checked={localPreferences.island === island}
                      onChange={(e) => handlePreferenceChange('island', e.target.value)}
                      className="sr-only"
                    />
                    <div className={`w-3.5 h-3.5 rounded-full border-2 border-blue-600 flex items-center justify-center ${
                      localPreferences.island === island ? 'bg-blue-600' : 'bg-white'
                    }`}>
                      {localPreferences.island === island && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
                      )}
                    </div>
                  </div>
                  <span className="text-sm text-gray-700">{island}</span>
                </label>
              ))}
            </div>
          </div>


        </div>

        {/* Footer */}
        <div className="px-3 sm:px-4 py-3 border-t border-gray-200">
          <Button
            onClick={handleSave}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm py-2"
          >
            Save Preferences
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
