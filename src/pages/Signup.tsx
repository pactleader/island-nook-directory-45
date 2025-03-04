import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, ArrowRight, Facebook } from 'lucide-react';
import { toast } from "sonner";
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!termsAccepted) {
      toast.error("Please accept the terms and conditions.");
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Accept any dummy credentials for demo purposes
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userName', name);
      localStorage.setItem('userEmail', email);
      
      toast.success("Account created successfully!");
      navigate('/profile/setup');
    }, 1000);
  };
  
  const handleSocialSignup = (provider: string) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      
      // Set dummy signup data
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userEmail', `demo@${provider.toLowerCase()}.com`);
      localStorage.setItem('authProvider', provider);
      
      toast.success(`Successfully signed up with ${provider}!`);
      navigate('/profile/setup');
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Create an Account</h1>
            <p className="text-gray-600 mb-8 text-center">
              Join our community to explore the Northern Mariana Islands
            </p>
            
            <div className="glass-card p-6 rounded-xl mb-8">
              <form className="space-y-5" onSubmit={handleSignup}>
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      placeholder="Your full name"
                      className="input-field pl-10 w-full"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                      className="input-field pl-10 w-full"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Create a password"
                      className="input-field pl-10 pr-10 w-full"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                  <p className="mt-1.5 text-xs text-gray-500">
                    Password must be at least 8 characters long and include a mix of letters, numbers, and symbols.
                  </p>
                </div>
                
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      placeholder="Confirm your password"
                      className="input-field pl-10 pr-10 w-full"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="terms"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    I agree to the <a href="#" className="text-blue-600 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a>
                  </label>
                </div>
                
                <Button 
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
                </Button>
              </form>
              
              <div className="mt-6 flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="px-4 text-sm text-gray-500">Or continue with</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex justify-center items-center"
                  onClick={() => handleSocialSignup('Google')}
                  disabled={isLoading}
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.84 16.79 15.62 17.58V20.33H19.22C21.28 18.43 22.56 15.59 22.56 12.25Z" fill="#4285F4"/>
                    <path d="M12 23C14.96 23 17.46 22.02 19.22 20.33L15.62 17.58C14.63 18.25 13.38 18.65 12 18.65C9.24 18.65 6.88 16.81 5.93 14.26H2.21V17.08C3.95 20.67 7.68 23 12 23Z" fill="#34A853"/>
                    <path d="M5.93 14.25C5.7 13.58 5.57 12.85 5.57 12.1C5.57 11.36 5.7 10.62 5.93 9.95V7.13H2.21C1.45 8.63 1 10.3 1 12.1C1 13.9 1.45 15.56 2.21 17.07L5.93 14.25Z" fill="#FBBC05"/>
                    <path d="M12 5.55C13.57 5.55 14.97 6.08 16.08 7.13L19.26 3.95C17.46 2.3 14.96 1.3 12 1.3C7.68 1.3 3.95 3.63 2.21 7.23L5.93 10.05C6.88 7.5 9.24 5.55 12 5.55Z" fill="#EA4335"/>
                  </svg>
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="flex justify-center items-center"
                  onClick={() => handleSocialSignup('Facebook')}
                  disabled={isLoading}
                >
                  <Facebook className="w-5 h-5 mr-2 text-[#1877F2]" />
                  Facebook
                </Button>
              </div>
            </div>
            
            <p className="text-center text-gray-600">
              Already have an account?{' '}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign in <ArrowRight size={14} className="inline" />
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Signup;
