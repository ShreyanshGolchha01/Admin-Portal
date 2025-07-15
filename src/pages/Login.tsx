import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { Heart, Eye, EyeOff } from 'lucide-react';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isLoading, setIsLoading] = useState(false);

    // Check if user is already authenticated
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (isAuthenticated) {
    return <Navigate to="/admin/dashboard" replace />;
  }

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};

    if (!email.trim()) {
      newErrors.email = 'ईमेल आवश्यक है';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'ईमेल सही नहीं है';
    }

    if (!password.trim()) {
      newErrors.password = 'पासवर्ड आवश्यक है';
    } else if (password.length < 6) {
      newErrors.password = 'पासवर्ड कम से कम 6 अक्षर का होना चाहिए';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // For demo purposes, any valid email/password combination works
      localStorage.setItem('isAuthenticated', 'true');
      window.location.href = '/admin/dashboard';
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Section */}
      <div className="hidden lg:flex lg:w-1/2 bg-blue-600 flex-col justify-between p-12">
        <div className="flex-grow flex flex-col items-center justify-center">
          <h1 className="text-6xl font-bold text-white mb-6">छाँव</h1>
          <p className="text-2xl text-white/90 text-center">स्वास्थ्य शिविर प्रबंधन प्रणाली</p>
        </div>
        
      </div>

      {/* Right Section */}
      <div className="w-full lg:w-1/2 flex flex-col min-h-screen">
        <div className="flex-grow flex items-center justify-center p-8 bg-gray-50">
          <div className="w-full max-w-md">
            {/* Logo and Header (only visible on mobile) */}
            <div className="text-center lg:hidden mb-8">
              <div className="flex justify-center">
                <div className="flex items-center space-x-2">
                  <Heart className="h-12 w-12 text-blue-600" />
                  <div>
                    <h1 className="text-3xl font-bold text-gray-800">छाँव</h1>
                    <p className="text-sm text-gray-600">स्वास्थ्य शिविर प्रबंधन</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-gray-900">
                एडमिन लॉगिन
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                कृपया अपनी जानकारी दर्ज करें
              </p>
            </div>

            {/* Login Form */}
            <div className="bg-white rounded-xl shadow-sm p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    यूज़रनेम / मोबाइल नंबर
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="अपना यूज़रनेम दर्ज करें"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                    पासवर्ड
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`input-field pr-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="अपना पासवर्ड लिखें"
                    />
                    <button
                      type="button"
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-400" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                  )}
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={`w-full bg-blue-600 text-white rounded-lg py-3 font-medium hover:bg-blue-700 transition-colors ${
                      isLoading ? 'opacity-75 cursor-not-allowed' : ''
                    }`}
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        लॉगिन हो रहा है...
                      </div>
                    ) : (
                      'लॉगिन करें'
                    )}
                  </button>
                </div>

                {/* Demo Credentials */}
                <div className="text-center">
                  <p className="text-xs text-gray-500">
                    डेमो के लिए कोई भी ईमेल और पासवर्ड काम करेगा
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-8 text-center">
          <p className="text-xs text-gray-500">संचालित</p>
          <p className="text-sm font-semibold text-gray-700">SSIPMT, RAIPUR</p>
          <p className="text-xs text-gray-500">स्वास्थ्य एवं परिवार कल्याण मंत्रालय, छत्तीसगढ सरकार</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
