
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight } from 'lucide-react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-md mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Welcome Back</h1>
            <p className="text-gray-600 mb-8 text-center">
              Sign in to your Island Nook account
            </p>
            
            <div className="glass-card p-6 rounded-xl mb-8">
              <form className="space-y-5">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      placeholder="you@example.com"
                      className="input-field pl-10 w-full"
                    />
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label htmlFor="password" className="text-sm font-medium text-gray-900">Password</label>
                    <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      placeholder="Enter your password"
                      className="input-field pl-10 pr-10 w-full"
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
                </div>
                
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                  />
                  <label htmlFor="remember" className="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                
                <button
                  type="submit"
                  className="btn-primary w-full"
                >
                  Sign In
                </button>
              </form>
              
              <div className="mt-6 flex items-center">
                <div className="flex-grow border-t border-gray-200"></div>
                <span className="px-4 text-sm text-gray-500">Or sign in with</span>
                <div className="flex-grow border-t border-gray-200"></div>
              </div>
              
              <div className="mt-6 grid grid-cols-2 gap-3">
                <button
                  type="button"
                  className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25C22.56 11.47 22.49 10.72 22.36 10H12V14.26H17.92C17.66 15.63 16.84 16.79 15.62 17.58V20.33H19.22C21.28 18.43 22.56 15.59 22.56 12.25Z" fill="#4285F4"/>
                    <path d="M12 23C14.96 23 17.46 22.02 19.22 20.33L15.62 17.58C14.63 18.25 13.38 18.65 12 18.65C9.24 18.65 6.88 16.81 5.93 14.26H2.21V17.08C3.95 20.67 7.68 23 12 23Z" fill="#34A853"/>
                    <path d="M5.93 14.25C5.7 13.58 5.57 12.85 5.57 12.1C5.57 11.36 5.7 10.62 5.93 9.95V7.13H2.21C1.45 8.63 1 10.3 1 12.1C1 13.9 1.45 15.56 2.21 17.07L5.93 14.25Z" fill="#FBBC05"/>
                    <path d="M12 5.55C13.57 5.55 14.97 6.08 16.08 7.13L19.26 3.95C17.46 2.3 14.96 1.3 12 1.3C7.68 1.3 3.95 3.63 2.21 7.23L5.93 10.05C6.88 7.5 9.24 5.55 12 5.55Z" fill="#EA4335"/>
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  className="flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                >
                  <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.0002 0.5C5.64733 0.5 0.5 5.64733 0.5 12.0002C0.5 17.1245 3.83449 21.4303 8.36553 22.9536C8.94008 23.0592 9.15283 22.7057 9.15283 22.392C9.15283 22.1085 9.13404 21.0996 9.13404 20.1509C6 20.6846 5.28109 19.4661 5.06734 18.8112C4.94291 18.4874 4.42498 17.5187 3.96233 17.2347C3.58075 17.0116 2.96577 16.478 3.94333 16.4589C4.87297 16.4396 5.54622 17.267 5.75876 17.6096C6.77043 19.2632 8.42483 18.8516 9.19179 18.538C9.29743 17.8053 9.60388 17.3039 9.92874 17.0209C7.34557 16.7375 4.64793 15.7886 4.64793 11.5371C4.64793 10.3186 5.09199 9.31715 5.77762 8.52259C5.65319 8.22694 5.25282 7.05387 5.89629 5.53075C5.89629 5.53075 6.8517 5.21749 9.15283 6.77777C10.1057 6.51067 11.0581 6.37712 12.0002 6.37712C12.9419 6.37712 13.8943 6.51067 14.8472 6.77777C17.1487 5.19848 18.1037 5.53075 18.1037 5.53075C18.7472 7.05387 18.3468 8.22694 18.2224 8.52259C18.908 9.31715 19.3521 10.2995 19.3521 11.5371C19.3521 15.8081 16.6353 16.7375 14.0521 17.0209C14.4525 17.3741 14.8053 18.0483 14.8053 19.1029C14.8053 20.6242 14.7865 21.9879 14.7865 22.392C14.7865 22.7057 14.9992 23.0782 15.5738 22.9536C17.8288 22.1824 19.7856 20.6842 21.1333 18.6722C22.4809 16.6601 23.15 14.2553 23.15 11.7857C23.15 5.47044 17.9776 0.5 12.0002 0.5Z" fill="black"/>
                  </svg>
                  GitHub
                </button>
              </div>
            </div>
            
            <p className="text-center text-gray-600">
              Don't have an account yet?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Create account <ArrowRight size={14} className="inline" />
              </Link>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Login;
