import { useState } from 'react';
import { Eye, EyeOff, Lock, Mail, Building2 } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      await login(email, password);
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0a192f] p-4">
      <div className="w-full max-w-[420px]">
        {/* Logo and Company Name */}
        <div className="flex items-center justify-center mb-8">
          <Building2 className="h-12 w-12 text-[hsl(var(--primary))]" />
          <span className="ml-3 text-4xl font-bold text-white">Enkardia</span>
        </div>

        {/* Login Card - Enhanced shadow and border */}
        <div className="bg-white/95 rounded-2xl overflow-hidden
                      shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/20">
          {/* Card Header - Subtle gradient */}
          <div className="px-8 pt-8 pb-6 border-b border-gray-100
                        bg-gradient-to-b from-white to-gray-50/50">
            <h1 className="text-2xl font-bold text-gray-900 text-center">Welcome Back</h1>
            <p className="mt-2 text-gray-600 text-center">
              Sign in to access your dashboard
            </p>
          </div>

          {/* Card Body */}
          <div className="p-8">
            {error && (
              <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-r-lg animate-shake">
                <div className="flex items-center gap-2 text-red-700">
                  <div className="h-2 w-2 rounded-full bg-red-500" />
                  <p className="text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400
                                   transition-colors group-focus-within:text-[hsl(var(--primary))]" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg 
                               text-gray-900 bg-white
                               focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]
                               focus:border-transparent
                               hover:bg-[#f8faff] hover:border-[#1e2a4a]
                               transition-all duration-150"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400
                                   transition-colors group-focus-within:text-[hsl(var(--primary))]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-2.5 border border-gray-200 rounded-lg 
                               text-gray-900 bg-white
                               focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))]
                               focus:border-transparent
                               hover:bg-[#f8faff] hover:border-[#1e2a4a]
                               transition-all duration-150"
                      placeholder="Enter your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 
                               hover:text-gray-600 focus:outline-none
                               active:scale-95 transition-all duration-150"
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded-md border-gray-300 text-[hsl(var(--primary))]
                             focus:ring-[hsl(var(--primary))] transition-colors
                             cursor-pointer hover:border-[#1e2a4a]"
                  />
                  <label htmlFor="remember" 
                    className="ml-2 text-sm text-gray-700 cursor-pointer
                             hover:text-gray-900 transition-colors">
                    Remember me
                  </label>
                </div>
                <button
                  type="button"
                  onClick={() => window.location.href = '/forgot-password'}
                  className="text-sm font-medium text-[hsl(var(--primary))] 
                           hover:text-[hsl(var(--primary))/.8]
                           transition-colors focus:outline-none
                           hover:underline decoration-2 underline-offset-2"
                >
                  Forgot Password?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[hsl(var(--primary))] text-white rounded-lg
                         font-medium 
                         hover:bg-[#1e2a4a] hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]
                         focus:outline-none focus:ring-2 focus:ring-[hsl(var(--primary))] focus:ring-offset-2
                         transform transition-all duration-150
                         hover:translate-y-[-1px]
                         active:translate-y-[1px] active:shadow-sm"
              >
                Sign In
              </button>
            </form>
          </div>

          {/* Card Footer - Enhanced gradient */}
          <div className="px-8 py-6 border-t border-gray-100
                        bg-gradient-to-b from-gray-50/50 to-gray-100/50">
            <div className="text-center text-sm text-gray-600">
              <p>
                Need an account?{' '}
                <a href="/contact" 
                  className="text-[hsl(var(--primary))] font-medium
                           hover:text-[#1e2a4a]
                           transition-colors focus:outline-none
                           hover:underline decoration-2 underline-offset-2">
                  Contact our team
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Footer Links - Enhanced hover states */}
        <div className="mt-8 text-center text-sm text-gray-400">
          <div className="flex items-center justify-center space-x-4">
            <a href="/terms" 
              className="hover:text-[#a8b3cf] transition-colors duration-200
                       hover:underline decoration-2 underline-offset-4">
              Terms
            </a>
            <span>•</span>
            <a href="/privacy" 
              className="hover:text-white transition-colors duration-200
                       hover:underline decoration-2 underline-offset-4">
              Privacy
            </a>
            <span>•</span>
            <a href="/help" 
              className="hover:text-white transition-colors duration-200
                       hover:underline decoration-2 underline-offset-4">
              Help
            </a>
          </div>
          <p className="mt-4">© 2024 Enkardia. All rights reserved.</p>
        </div>

        <div className="mt-4 p-4 bg-[#1e2a4a]/5 rounded-lg">
          <p className="text-sm font-medium text-gray-900 mb-2">Demo Accounts:</p>
          <div className="space-y-2 text-sm text-gray-600">
            <div>
              <p className="font-medium">Client Access:</p>
              <p>Email: client@example.com</p>
              <p>Password: password123</p>
            </div>
            <div>
              <p className="font-medium">Admin Access:</p>
              <p>Email: admin@example.com</p>
              <p>Password: password345</p>
            </div>
            <div>
              <p className="font-medium">Master Access:</p>
              <p>Email: master@example.com</p>
              <p>Password: password678</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 