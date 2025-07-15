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
    <div className="min-h-screen bg-gradient-to-br from-primary-100 to-primary-200 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Logo and Header */}
        <div className="text-center">
          <div className="flex justify-center">
            <div className="flex items-center space-x-2">
              <Heart className="h-12 w-12 text-primary-500" />
              <div>
                <h1 className="text-3xl font-bold text-gray-800">छांव</h1>
                <p className="text-sm text-gray-600">स्वास्थ्य शिविर प्रबंधन</p>
              </div>
            </div>
          </div>
          <h2 className="mt-6 text-2xl font-semibold text-gray-900">
            अपने खाते में लॉगिन करें
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            प्रबंधन पैनल में जाने के लिए अपनी जानकारी भरें
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                ईमेल पता
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`input-field ${errors.email ? 'border-red-500 focus:ring-red-500' : ''}`}
                placeholder="admin@example.com"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password */}
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

            {/* Demo Credentials */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-blue-800 mb-2">डेमो जानकारी:</h4>
              <div className="text-xs text-blue-700 space-y-1">
                <p><strong>ईमेल:</strong> admin@example.com</p>
                <p><strong>पासवर्ड:</strong> password123</p>
                <p className="text-blue-600">कोई भी ईमेल और पासवर्ड डेमो के लिए काम करेगा</p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full btn-primary py-3 ${
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
          </form>
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-gray-500">संचालित</p>
          <p className="text-sm font-semibold text-gray-700">एसएसआईपीएमटी, रायपुर</p>
          <p className="text-xs text-gray-500">स्वास्थ्य एवं परिवार कल्याण मंत्रालय, भारत सरकार</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
