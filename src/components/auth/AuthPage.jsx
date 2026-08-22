import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { Compass, Mail, Lock, User, ArrowRight, CheckCircle, Sparkles, KeyRound, AlertCircle, X } from 'lucide-react';

export const AuthPage = () => {
  const { login, signup, loginDemoUser, setCurrentScreen, addToast } = useTripContext();
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('alex.rivera@globetrotter.io');
  const [password, setPassword] = useState('password123');
  const [name, setName] = useState('Alex Rivera');
  
  // Validation & Modal State
  const [errors, setErrors] = useState({});
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const errs = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!email.trim()) {
      errs.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please enter a valid email address.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6) {
      errs.password = 'Password must be at least 6 characters long.';
    }

    if (isSignUp && !name.trim()) {
      errs.name = 'Full Name is required for signup.';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setErrors({});

    try {
      let result;
      if (isSignUp) {
        result = await signup(name.trim(), email.trim(), password);
      } else {
        result = await login(email.trim(), password);
      }

      setIsLoading(false);
      if (!result.success) {
        setErrors({ auth: result.error });
        addToast(result.error, 'error');
      }
    } catch (err) {
      setIsLoading(false);
      setErrors({ auth: 'Authentication error occurred.' });
      addToast('Authentication error occurred.', 'error');
    }
  };

  const handleForgotPassword = (e) => {
    e.preventDefault();
    if (!resetEmail.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resetEmail.trim())) {
      addToast('Please enter a valid email address for password reset.', 'error');
      return;
    }
    addToast(`Password reset link sent to ${resetEmail}! Check your inbox.`, 'success');
    setShowForgotModal(false);
    setResetEmail('');
  };

  const handleDemoTraveler = () => {
    loginDemoUser({
      name: 'Alex Rivera',
      email: 'alex.rivera@globetrotter.io',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
      role: 'Traveler',
      memberSince: '2024',
      homeCity: 'San Francisco, CA',
      currency: 'USD',
      travelStyle: ['Cultural Explorer', 'Foodie'],
      stats: { countriesVisited: 14, tripsCompleted: 9, savedPlaces: 52 }
    });
  };

  const handleDemoAdmin = () => {
    loginDemoUser({
      name: 'Sarah Chen (Admin)',
      email: 'admin@globetrotter.io',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
      role: 'Admin',
      memberSince: '2023',
      homeCity: 'New York, NY',
      currency: 'USD',
      travelStyle: ['Luxury', 'Business'],
      stats: { countriesVisited: 28, tripsCompleted: 24, savedPlaces: 110 }
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="bg-white rounded-3xl shadow-card border border-slate-200/80 overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 relative">
        
        {/* Left Branding Panel */}
        <div className="bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="space-y-6 relative z-10">
            <div 
              onClick={() => setCurrentScreen('landing')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-500 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform">
                <Compass className="w-6 h-6 animate-spin-slow" />
              </div>
              <span className="text-2xl font-extrabold tracking-tight">GlobeTrotter</span>
            </div>

            <div className="space-y-3 pt-6">
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight leading-tight">
                {isSignUp ? 'Start Your Next Multi-City Adventure' : 'Welcome Back to GlobeTrotter'}
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Organize itineraries, manage travel budgets, and share itineraries with friends.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-8 relative z-10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Free tier includes unlimited trips & city catalogs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Real-time currency & expense budget updates</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
              <span>Collaborative trip planning with co-travelers</span>
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="p-8 sm:p-10 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-2xl font-bold text-slate-900">
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  {isSignUp ? 'Enter your details to register.' : 'Enter registered credentials to access your trips.'}
                </p>
              </div>
              <button
                onClick={() => {
                  setIsSignUp(!isSignUp);
                  setErrors({});
                }}
                className="text-xs font-bold text-brand-600 hover:underline"
              >
                {isSignUp ? 'Sign In instead' : 'Need an account?'}
              </button>
            </div>

            {/* Global Authentication Error Alert */}
            {errors.auth && (
              <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-start gap-2.5 animate-in fade-in duration-150">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                <div className="flex-grow">
                  <span>{errors.auth}</span>
                </div>
              </div>
            )}

            {/* Quick Demo Shortcuts */}
            <div className="mb-6 p-3 rounded-2xl bg-brand-50/70 border border-brand-100 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-brand-700">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 1-Click Demo Login
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={handleDemoTraveler}
                  className="py-2 px-3 rounded-xl bg-white hover:bg-brand-100 text-slate-800 text-xs font-bold shadow-xs border border-brand-200 text-center transition-colors"
                >
                  Traveler Demo
                </button>
                <button
                  type="button"
                  onClick={handleDemoAdmin}
                  className="py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold text-center transition-colors"
                >
                  Admin Demo
                </button>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value);
                        setErrors((prev) => ({ ...prev, name: null, auth: null }));
                      }}
                      placeholder="Alex Rivera"
                      className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 ${
                        errors.name ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-brand-500'
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setErrors((prev) => ({ ...prev, email: null, auth: null }));
                    }}
                    placeholder="alex@example.com"
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 ${
                      errors.email ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-brand-500'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.email}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">
                    Password
                  </label>
                  {!isSignUp && (
                    <button
                      type="button"
                      onClick={() => setShowForgotModal(true)}
                      className="text-xs text-brand-600 font-semibold hover:underline"
                    >
                      Forgot Password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setErrors((prev) => ({ ...prev, password: null, auth: null }));
                    }}
                    placeholder="••••••••••••"
                    className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 ${
                      errors.password ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-brand-500'
                    }`}
                  />
                </div>
                {errors.password && (
                  <p className="text-xs text-rose-500 font-medium mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.password}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    {isSignUp ? 'Create Free Account' : 'Sign In'}
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="pt-6 border-t border-slate-100 text-center">
            <p className="text-xs text-slate-500">
              Protected by GlobeTrotter 256-bit SSL Security.
            </p>
          </div>
        </div>

      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-card border border-slate-100 relative animate-in fade-in zoom-in-95 duration-200">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-brand-50 text-brand-600 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-900">Reset Your Password</h3>
                <p className="text-xs text-slate-500">Enter your email to receive a password reset link.</p>
              </div>
            </div>

            <form onSubmit={handleForgotPassword} className="space-y-4 pt-2">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
                  Registered Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="email"
                    required
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    placeholder="alex@example.com"
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-xs"
                >
                  Send Reset Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
