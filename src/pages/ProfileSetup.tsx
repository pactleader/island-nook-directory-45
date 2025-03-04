
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Camera, BadgeCheck } from 'lucide-react';
import { toast } from 'sonner';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ProfileSetup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    mailingAddress: '',
    village: '',
    island: 'Saipan',
    birthDate: '',
    phoneNumber: '',
    whatsappNumber: '',
  });
  const [idVerification, setIdVerification] = useState({
    idPhoto: null,
    selfieWithId: null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleIslandChange = (value: string) => {
    setFormData(prev => ({ ...prev, island: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would send this data to the backend
    localStorage.setItem('userProfile', JSON.stringify(formData));
    localStorage.setItem('advertisingCredit', '5'); // Initial $5 credit
    toast.success("Profile completed! You've earned $5 in advertising credit!");
    navigate('/profile');
  };

  const handleIdVerification = () => {
    // In a real app, this would handle ID verification
    localStorage.setItem('advertisingCredit', '10'); // Additional $5 credit
    localStorage.setItem('isVerified', 'true');
    toast.success("Identity verified! You've earned an additional $5 in advertising credit!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow container mx-auto px-4 py-8 mt-16">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-center mb-2">Complete Your Profile</h1>
          <p className="text-center text-gray-600 mb-8">
            Complete your profile to receive $5 in advertising credit!
          </p>

          <Card className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name</Label>
                  <Input
                    id="fullName"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="mailingAddress">Mailing Address</Label>
                  <Input
                    id="mailingAddress"
                    name="mailingAddress"
                    value={formData.mailingAddress}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="village">Village</Label>
                  <Input
                    id="village"
                    name="village"
                    value={formData.village}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="island">Island</Label>
                  <Select value={formData.island} onValueChange={handleIslandChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select island" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Saipan">Saipan</SelectItem>
                      <SelectItem value="Tinian">Tinian</SelectItem>
                      <SelectItem value="Rota">Rota</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="birthDate">Birth Date</Label>
                  <Input
                    id="birthDate"
                    name="birthDate"
                    type="date"
                    value={formData.birthDate}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="phoneNumber">Phone Number</Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="whatsappNumber">WhatsApp Number</Label>
                  <Input
                    id="whatsappNumber"
                    name="whatsappNumber"
                    type="tel"
                    value={formData.whatsappNumber}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <Button type="submit" className="w-full">
                Complete Profile
              </Button>
            </form>
          </Card>

          <Card className="mt-8 p-6">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BadgeCheck className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div>
                <h2 className="text-lg font-semibold mb-2">Get Verified - Earn $5 More!</h2>
                <p className="text-gray-600 mb-4">
                  Upload a photo of your ID and a selfie with your ID to get verified. 
                  You'll receive an additional $5 in advertising credit and a verified badge on your profile.
                </p>
                <div className="flex items-center gap-2 mb-4">
                  <span>Verified Badge:</span>
                  <div className="flex items-center gap-1 bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                    <BadgeCheck className="w-4 h-4" />
                    <span className="text-sm font-medium">Verified</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <Button variant="outline" className="w-full" onClick={() => {}}>
                    <Camera className="w-4 h-4 mr-2" />
                    Upload ID Photo
                  </Button>
                  <Button variant="outline" className="w-full" onClick={() => {}}>
                    <Camera className="w-4 h-4 mr-2" />
                    Take Selfie with ID
                  </Button>
                  <Button 
                    className="w-full"
                    onClick={handleIdVerification}
                  >
                    Submit for Verification
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default ProfileSetup;
