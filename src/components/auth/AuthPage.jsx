import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { supabaseResetPassword } from '../../lib/supabase';
import { Compass, Lock, Mail, User, Phone, MapPin, Globe, FileText, ArrowRight, AlertCircle, CheckCircle, KeyRound, X } from 'lucide-react';

export const AuthPage = () => {
  const { login, signup, setCurrentScreen, addToast } = useTripContext();
  
  // Screen Mode: false = Screen 1 (Login), true = Screen 2 (Registration)
  const [isRegistration, setIsRegistration] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotSuccess, setForgotSuccess] = useState(false);

  // Screen 1 Login Fields
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Screen 2 Registration Fields
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [photoUrl, setPhotoUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80');

  // Photo Presets
  const avatarPresets = [
    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=250&q=80',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=250&q=80'
  ];

  // Errors & Loading State
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Screen 1 Login Submit with Validation
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const errs = {};

    const cleanInput = username.trim();
    if (!cleanInput) {
      errs.username = 'Email or Username is required.';
    } else if (cleanInput.includes('@') && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(cleanInput)) {
      errs.username = 'Please enter a valid email address format.';
    }

    if (!password) {
      errs.password = 'Password is required.';
    } else if (password.length < 6 && !cleanInput.includes('admin') && !cleanInput.includes('alex.rivera')) {
      errs.password = 'Password must be at least 6 characters long.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(cleanInput, password);
      setIsLoading(false);
      if (!result.success) {
        setErrors({ auth: result.error });
        addToast(result.error, 'error');
      }
    } catch (err) {
      setIsLoading(false);
      setErrors({ auth: 'Authentication error occurred. Please try again.' });
    }
  };

  // Screen 2 Registration Submit with Validation
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const errs = {};
    if (!firstName.trim()) errs.firstName = 'First Name is required.';
    if (!lastName.trim()) errs.lastName = 'Last Name is required.';
    if (!emailAddress.trim()) {
      errs.emailAddress = 'Email Address is required.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.trim())) {
      errs.emailAddress = 'Please enter a valid email address (e.g. user@example.com).';
    }
    if (!regPassword) {
      errs.regPassword = 'Password is required.';
    } else if (regPassword.length < 6) {
      errs.regPassword = 'Password must be at least 6 characters long.';
    }

    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }

    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();

    setIsLoading(true);
    try {
      const result = await signup({
        name: fullName,
        firstName: firstName.trim(),
        lastName: lastName.trim(),
        email: emailAddress.trim(),
        phone: phoneNumber.trim(),
        city: city.trim(),
        country: country.trim(),
        additionalInfo: additionalInfo.trim(),
        avatar: photoUrl,
        password: regPassword
      });

      setIsLoading(false);
      if (!result.success) {
        setErrors({ auth: result.error });
        addToast(result.error, 'error');
      }
    } catch (err) {
      setIsLoading(false);
      setErrors({ auth: 'Registration failed. Please check your network connection.' });
    }
  };

  // Handle Forgot Password Submit via Supabase Auth
  const handleForgotSubmit = async (e) => {
    e.preventDefault();
    if (!forgotEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(forgotEmail.trim())) {
      addToast('Please enter a valid email address.', 'error');
      return;
    }

    setForgotLoading(true);
    const res = await supabaseResetPassword(forgotEmail);
    setForgotLoading(false);
    setForgotSuccess(true);
    addToast(`Password reset link sent to ${forgotEmail}!`, 'success');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans selection:bg-brand-500 selection:text-white">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 relative transition-all duration-300">
        
        {/* Left Branding Hero Section (5 cols) */}
        <div className="md:col-span-5 bg-gradient-to-br from-slate-900 via-brand-950 to-slate-900 p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
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

            <div className="space-y-3 pt-4">
              <h2 className="text-2xl font-extrabold tracking-tight leading-tight">
                {isRegistration ? 'Create Your Explorer Profile' : 'Welcome Back to GlobeTrotter'}
              </h2>
              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                Entry point to authenticate users, manage personal travel plans, budget tracking, and custom itineraries.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-6 relative z-10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Supabase authenticated security</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Multi-city itineraries & budget tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Community travel reviews & discovery</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Form Section (7 cols) */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            
            {/* Form Top Header & Switcher */}
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {isRegistration ? 'Create Your Account' : 'Sign In to Your Account'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isRegistration ? 'Fill details below to create a new traveler account' : 'Authenticate to access and manage your personal travel plans'}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsRegistration(!isRegistration);
                  setErrors({});
                }}
                className="text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-3.5 py-2 rounded-xl transition-colors shrink-0"
              >
                {isRegistration ? 'Sign In' : 'Sign Up'}
              </button>
            </div>

            {/* Error Alert Banner */}
            {errors.auth && (
              <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{errors.auth}</span>
              </div>
            )}

            {/* ========================================================= */}
            {/* SCREEN 1: LOGIN FORM                                      */}
            {/* ========================================================= */}
            {!isRegistration ? (
              <div className="animate-in fade-in duration-200">
                
                {/* Circular Avatar Badge */}
                <div className="text-center mb-6">
                  <div className="w-20 h-20 mx-auto rounded-full border-4 border-slate-100 shadow-md p-1 bg-slate-50 relative overflow-hidden flex items-center justify-center">
                    {photoUrl ? (
                      <img src={photoUrl} alt="User Avatar" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <User className="w-10 h-10 text-slate-400" />
                    )}
                  </div>
                  <span className="inline-block mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Traveler Account
                  </span>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Email & Password Input Fields */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Email or Username
                    </label>
                    <div className="relative">
                      <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setErrors((prev) => ({ ...prev, username: null, auth: null }));
                        }}
                        placeholder="user@globetrotter.io"
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 ${
                          errors.username ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-brand-500'
                        }`}
                      />
                    </div>
                    {errors.username && (
                      <p className="text-xs text-rose-500 font-medium mt-1">{errors.username}</p>
                    )}
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
                        Password
                      </label>
                      {/* Forgot Password Button */}
                      <button
                        type="button"
                        onClick={() => {
                          setForgotEmail(username);
                          setForgotSuccess(false);
                          setShowForgotModal(true);
                        }}
                        className="text-xs font-bold text-brand-600 hover:text-brand-700 hover:underline"
                      >
                        Forgot Password?
                      </button>
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
                      <p className="text-xs text-rose-500 font-medium mt-1">{errors.password}</p>
                    )}
                  </div>

                  {/* Login Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl shadow-md hover:shadow-glow transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Login</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                {/* Signup Link */}
                <div className="mt-6 text-center border-t border-slate-100 pt-4">
                  <p className="text-xs text-slate-500">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsRegistration(true)}
                      className="font-extrabold text-brand-600 hover:underline ml-1"
                    >
                      Sign Up for free
                    </button>
                  </p>
                </div>

              </div>
            ) : (
              
              /* ========================================================= */
              /* SCREEN 2: SIGNUP / REGISTRATION FORM                     */
              /* ========================================================= */
              <div className="animate-in fade-in duration-200">
                
                {/* Circular Photo Avatar Selector */}
                <div className="text-center mb-5">
                  <div className="w-16 h-16 mx-auto rounded-full border-4 border-slate-100 shadow-md p-0.5 bg-slate-50 relative overflow-hidden flex items-center justify-center mb-2">
                    <img src={photoUrl} alt="Photo" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Avatar:</span>
                    {avatarPresets.map((url, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setPhotoUrl(url)}
                        className={`w-6 h-6 rounded-full overflow-hidden border transition-all ${
                          photoUrl === url ? 'border-brand-600 ring-2 ring-brand-500/50 scale-110' : 'border-slate-200 opacity-60 hover:opacity-100'
                        }`}
                      >
                        <img src={url} alt={`Avatar ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>

                <form onSubmit={handleRegisterSubmit} className="space-y-3.5">
                  
                  {/* First Name & Last Name */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        First Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e) => {
                            setFirstName(e.target.value);
                            setErrors((prev) => ({ ...prev, firstName: null }));
                          }}
                          placeholder="First Name"
                          className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 ${
                            errors.firstName ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-brand-500'
                          }`}
                        />
                      </div>
                      {errors.firstName && <p className="text-xs text-rose-500 mt-1">{errors.firstName}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Last Name
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={lastName}
                          onChange={(e) => {
                            setLastName(e.target.value);
                            setErrors((prev) => ({ ...prev, lastName: null }));
                          }}
                          placeholder="Last Name"
                          className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 ${
                            errors.lastName ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-brand-500'
                          }`}
                        />
                      </div>
                      {errors.lastName && <p className="text-xs text-rose-500 mt-1">{errors.lastName}</p>}
                    </div>
                  </div>

                  {/* Email & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="email"
                          value={emailAddress}
                          onChange={(e) => {
                            setEmailAddress(e.target.value);
                            setErrors((prev) => ({ ...prev, emailAddress: null }));
                          }}
                          placeholder="Email Address"
                          className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 ${
                            errors.emailAddress ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-brand-500'
                          }`}
                        />
                      </div>
                      {errors.emailAddress && <p className="text-xs text-rose-500 mt-1">{errors.emailAddress}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="tel"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          placeholder="Phone Number"
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* City & Country */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        City
                      </label>
                      <div className="relative">
                        <MapPin className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="City"
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                        Country
                      </label>
                      <div className="relative">
                        <Globe className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => setCountry(e.target.value)}
                          placeholder="Country"
                          className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <input
                        type="password"
                        value={regPassword}
                        onChange={(e) => {
                          setRegPassword(e.target.value);
                          setErrors((prev) => ({ ...prev, regPassword: null }));
                        }}
                        placeholder="Password (min 6 characters)"
                        className={`w-full pl-9 pr-3 py-2 bg-slate-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 ${
                          errors.regPassword ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-brand-500'
                        }`}
                      />
                    </div>
                    {errors.regPassword && <p className="text-xs text-rose-500 mt-1">{errors.regPassword}</p>}
                  </div>

                  {/* Additional Information */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Additional Information
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <textarea
                        rows={2}
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        placeholder="Travel preferences, dietary rules, or notes..."
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                      ></textarea>
                    </div>
                  </div>

                  {/* Sign Up Submit Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold rounded-xl shadow-md hover:shadow-glow transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Create Account</span>
                          <CheckCircle className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-4 text-center border-t border-slate-100 pt-3">
                  <p className="text-xs text-slate-500">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setIsRegistration(false)}
                      className="font-extrabold text-brand-600 hover:underline ml-1"
                    >
                      Sign In instead
                    </button>
                  </p>
                </div>

              </div>
            )}

          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              Protected by Supabase & GlobeTrotter 256-bit SSL Security.
            </p>
          </div>
        </div>

      </div>

      {/* ========================================================= */}
      {/* FORGOT PASSWORD MODAL                                    */}
      {/* ========================================================= */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-100 space-y-5 relative">
            <button
              onClick={() => setShowForgotModal(false)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-brand-50 border border-brand-200 text-brand-600 flex items-center justify-center">
                <KeyRound className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-lg font-black text-slate-900">Reset Your Password</h3>
                <p className="text-xs text-slate-500">Enter your email to receive recovery instructions</p>
              </div>
            </div>

            {forgotSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium space-y-2">
                <div className="flex items-center gap-2 font-bold text-emerald-900">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Password Reset Email Sent</span>
                </div>
                <p>We sent a secure password reset link to <strong>{forgotEmail}</strong>. Please check your inbox or spam folder.</p>
                <button
                  type="button"
                  onClick={() => setShowForgotModal(false)}
                  className="w-full mt-2 py-2 bg-emerald-600 text-white font-bold rounded-xl text-xs"
                >
                  Return to Sign In
                </button>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                    <input
                      type="email"
                      required
                      value={forgotEmail}
                      onChange={(e) => setForgotEmail(e.target.value)}
                      placeholder="user@globetrotter.io"
                      className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowForgotModal(false)}
                    className="px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={forgotLoading}
                    className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-glow transition-all flex items-center gap-1.5"
                  >
                    {forgotLoading ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <span>Send Reset Link</span>
                    )}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
};
