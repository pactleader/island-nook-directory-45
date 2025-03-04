
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Camera, Upload, ChevronRight, CheckCircle, Shield } from 'lucide-react';
import { toast } from "sonner";
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

// Steps in the profile setup process
const STEPS = [
  'Basic Information',
  'Contact Details',
  'Identity Verification'
];

const ProfileSetup = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState({
    fullName: localStorage.getItem('userName') || '',
    mailingAddress: '',
    village: '',
    island: 'Saipan',
    birthDate: '',
    phoneNumber: '',
    whatsappNumber: ''
  });
  const [idPhoto, setIdPhoto] = useState<string | null>(null);
  const [selfieWithId, setSelfieWithId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfileData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImageState: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageState(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleNextStep = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
      window.scrollTo(0, 0);
    } else {
      handleCompleteSetup();
    }
  };
  
  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleCompleteSetup = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Store profile data in localStorage for demo
      localStorage.setItem('profileData', JSON.stringify(profileData));
      localStorage.setItem('profileCompleted', 'true');
      localStorage.setItem('advertisingCredit', '5');
      
      if (idPhoto && selfieWithId) {
        localStorage.setItem('identityVerified', 'true');
        localStorage.setItem('advertisingCredit', '10');
        toast.success("Profile completed and identity verified! You've received $10 in advertising credit.");
      } else {
        toast.success("Profile completed! You've received $5 in advertising credit.");
      }
      
      navigate('/profile');
    }, 1500);
  };
  
  const renderBasicInfoStep = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={profileData.fullName}
          onChange={handleInputChange}
          className="input-field w-full"
          required
        />
      </div>
      
      <div>
        <label htmlFor="mailingAddress" className="block text-sm font-medium text-gray-700 mb-1">Mailing Address</label>
        <input
          type="text"
          id="mailingAddress"
          name="mailingAddress"
          value={profileData.mailingAddress}
          onChange={handleInputChange}
          className="input-field w-full"
          required
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="village" className="block text-sm font-medium text-gray-700 mb-1">Village</label>
          <input
            type="text"
            id="village"
            name="village"
            value={profileData.village}
            onChange={handleInputChange}
            className="input-field w-full"
            required
          />
        </div>
        
        <div>
          <label htmlFor="island" className="block text-sm font-medium text-gray-700 mb-1">Island</label>
          <select
            id="island"
            name="island"
            value={profileData.island}
            onChange={handleInputChange}
            className="input-field w-full"
            required
          >
            <option value="Saipan">Saipan</option>
            <option value="Tinian">Tinian</option>
            <option value="Rota">Rota</option>
            <option value="Northern Islands">Northern Islands</option>
          </select>
        </div>
      </div>
      
      <div>
        <label htmlFor="birthDate" className="block text-sm font-medium text-gray-700 mb-1">Birth Date</label>
        <input
          type="date"
          id="birthDate"
          name="birthDate"
          value={profileData.birthDate}
          onChange={handleInputChange}
          className="input-field w-full"
          required
        />
      </div>
    </div>
  );
  
  const renderContactDetailsStep = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={profileData.phoneNumber}
          onChange={handleInputChange}
          className="input-field w-full"
          placeholder="+1 (670) 123-4567"
          required
        />
      </div>
      
      <div>
        <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700 mb-1">WhatsApp Number (Optional)</label>
        <input
          type="tel"
          id="whatsappNumber"
          name="whatsappNumber"
          value={profileData.whatsappNumber}
          onChange={handleInputChange}
          className="input-field w-full"
          placeholder="+1 (670) 123-4567"
        />
      </div>
      
      <div className="bg-green-50 p-4 rounded-lg border border-green-100">
        <div className="flex items-start">
          <CheckCircle className="text-green-500 mt-0.5 mr-3 h-5 w-5" />
          <div>
            <h3 className="text-green-800 font-medium">Get $5 in free advertising credit!</h3>
            <p className="text-green-700 text-sm mt-1">
              Complete your profile to receive $5 in advertising credit for your listings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  const renderIdentityVerificationStep = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
        <div className="flex items-start">
          <Shield className="text-blue-500 mt-0.5 mr-3 h-5 w-5" />
          <div>
            <h3 className="text-blue-800 font-medium">Get verified for more benefits!</h3>
            <p className="text-blue-700 text-sm mt-1">
              Verify your identity to receive an additional $5 in advertising credit and get the verified badge on your profile.
            </p>
            <div className="mt-2 flex items-center">
              <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                <Shield className="h-3 w-3 mr-1" /> Verified User
              </Badge>
              <span className="text-xs text-blue-600 ml-2">This badge will appear on your profile</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Upload a photo of your ID</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {idPhoto ? (
              <div className="relative">
                <img src={idPhoto} alt="ID" className="mx-auto h-40 object-cover rounded" />
                <button 
                  onClick={() => setIdPhoto(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <div>
                <Upload className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">
                  Click to upload or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => handleFileUpload(e, setIdPhoto)}
                  accept="image/*"
                />
              </div>
            )}
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-3">Take a selfie with your ID</label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            {selfieWithId ? (
              <div className="relative">
                <img src={selfieWithId} alt="Selfie with ID" className="mx-auto h-40 object-cover rounded" />
                <button 
                  onClick={() => setSelfieWithId(null)}
                  className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            ) : (
              <div>
                <Camera className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-1 text-sm text-gray-500">
                  Take a selfie holding your ID next to your face
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF up to 10MB</p>
                <input
                  type="file"
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  onChange={(e) => handleFileUpload(e, setSelfieWithId)}
                  accept="image/*"
                />
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
        <h3 className="font-medium text-gray-700 mb-2">Why we need this</h3>
        <ul className="space-y-2 text-sm text-gray-600">
          <li className="flex items-start">
            <div className="flex-shrink-0 h-4 w-4 mt-0.5 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span>Build trust within our community</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-4 w-4 mt-0.5 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span>Prevent fake accounts and scams</span>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 h-4 w-4 mt-0.5 mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <span>Unlock additional benefits and features</span>
          </li>
        </ul>
      </div>
    </div>
  );
  
  const renderCurrentStep = () => {
    switch (currentStep) {
      case 0:
        return renderBasicInfoStep();
      case 1:
        return renderContactDetailsStep();
      case 2:
        return renderIdentityVerificationStep();
      default:
        return null;
    }
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8 text-center">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Complete Your Profile</h1>
              <p className="text-gray-600">Just a few more details to get your account set up</p>
            </div>
            
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                {STEPS.map((step, index) => (
                  <div key={index} className="flex flex-col items-center">
                    <div 
                      className={`flex items-center justify-center w-10 h-10 rounded-full text-white font-semibold ${
                        index <= currentStep ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    >
                      {index < currentStep ? (
                        <CheckCircle className="h-6 w-6" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className={`mt-2 text-sm ${index <= currentStep ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
              <div className="relative">
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-1 bg-gray-200"></div>
                <div 
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-blue-600 transition-all duration-300"
                  style={{ width: `${(currentStep / (STEPS.length - 1)) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div className="glass-card p-6 rounded-xl mb-8">
              {renderCurrentStep()}
              
              <Separator className="my-6" />
              
              <div className="flex justify-between">
                <Button
                  variant="outline"
                  onClick={handlePrevStep}
                  disabled={currentStep === 0 || isLoading}
                >
                  Back
                </Button>
                <Button
                  onClick={handleNextStep}
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : currentStep === STEPS.length - 1 ? 'Complete Setup' : 'Continue'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProfileSetup;
