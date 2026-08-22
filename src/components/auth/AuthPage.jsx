import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { Compass, Lock, Mail, User, Phone, MapPin, Globe, FileText, ArrowRight, AlertCircle, CheckCircle } from 'lucide-react';

export const AuthPage = () => {
  const { login, signup, setCurrentScreen, addToast } = useTripContext();
  
  // Screen Mode: false = Screen 1 (Login), true = Screen 2 (Registration)
  const [isRegistration, setIsRegistration] = useState(false);

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

  // Screen 1 Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    
    if (!username.trim()) {
      setErrors({ username: 'Username or Email is required.' });
      return;
    }
    if (!password) {
      setErrors({ password: 'Password is required.' });
      return;
    }

    setIsLoading(true);
    try {
      const result = await login(username.trim(), password);
      setIsLoading(false);
      if (!result.success) {
        setErrors({ auth: result.error });
        addToast(result.error, 'error');
      }
    } catch (err) {
      setIsLoading(false);
      setErrors({ auth: 'Authentication error occurred.' });
    }
  };

  // Screen 2 Registration Submit
  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const errs = {};
    if (!firstName.trim()) errs.firstName = 'First Name is required.';
    if (!lastName.trim()) errs.lastName = 'Last Name is required.';
    if (!emailAddress.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress.trim())) {
      errs.emailAddress = 'Valid Email Address is required.';
    }
    if (!regPassword || regPassword.length < 6) {
      errs.regPassword = 'Password (at least 6 chars) is required.';
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
      setErrors({ auth: 'Registration failed.' });
    }
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
                Organize itineraries, manage travel budgets, and share itineraries with friends.
              </p>
            </div>
          </div>

          <div className="space-y-3 pt-6 relative z-10 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Unlimited trips & discovery catalogs</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Real-time budget & expense tracking</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Collaborative trip planning</span>
            </div>
          </div>
        </div>

        {/* Right Interactive Form Section (7 cols) */}
        <div className="md:col-span-7 p-6 sm:p-10 flex flex-col justify-between bg-white">
          <div>
            
            {/* Form Top Header & Navigation Toggle */}
            <div className="flex items-center justify-between mb-6 border-b border-slate-100 pb-4">
              <div>
                <h3 className="text-xl font-bold text-slate-900">
                  {isRegistration ? 'Registration Screen (Screen 2)' : 'Login Screen (Screen 1)'}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  {isRegistration ? 'Fill details to register a new user' : 'Enter credentials to access your trips'}
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
                {isRegistration ? 'Login Screen' : 'Register Users'}
              </button>
            </div>

            {/* Error Alert */}
            {errors.auth && (
              <div className="mb-4 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-semibold flex items-center gap-2.5 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-rose-500 shrink-0" />
                <span>{errors.auth}</span>
              </div>
            )}

            {/* ========================================================= */}
            {/* SCREEN 1: LOGIN SCREEN                                   */}
            {/* ========================================================= */}
            {!isRegistration ? (
              <div className="animate-in fade-in duration-200">
                
                {/* Circular Photo Avatar */}
                <div className="text-center mb-6">
                  <div className="w-24 h-24 mx-auto rounded-full border-4 border-slate-100 shadow-md p-1 bg-slate-50 relative overflow-hidden flex items-center justify-center">
                    {photoUrl ? (
                      <img src={photoUrl} alt="Photo" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <User className="w-10 h-10 text-slate-400" />
                    )}
                  </div>
                  <span className="inline-block mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                    Photo
                  </span>
                </div>

                <form onSubmit={handleLoginSubmit} className="space-y-4">
                  {/* Username Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Username
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setErrors((prev) => ({ ...prev, username: null, auth: null }));
                        }}
                        placeholder="Username or Email"
                        className={`w-full pl-10 pr-4 py-2.5 bg-slate-50 border rounded-xl text-sm font-medium focus:outline-none focus:ring-2 ${
                          errors.username ? 'border-rose-400 focus:ring-rose-400' : 'border-slate-200 focus:ring-brand-500'
                        }`}
                      />
                    </div>
                    {errors.username && (
                      <p className="text-xs text-rose-500 font-medium mt-1">{errors.username}</p>
                    )}
                  </div>

                  {/* Password Field */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Password
                    </label>
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
                      className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Login Button</span>
                          <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-xs text-slate-500">
                    First time user?{' '}
                    <button
                      type="button"
                      onClick={() => setIsRegistration(true)}
                      className="font-bold text-brand-600 hover:underline ml-1"
                    >
                      Register Users (Screen 2)
                    </button>
                  </p>
                </div>

              </div>
            ) : (
              
              /* ========================================================= */
              /* SCREEN 2: REGISTRATION SCREEN                             */
              /* ========================================================= */
              <div className="animate-in fade-in duration-200">
                
                {/* Circular Photo Avatar Selector */}
                <div className="text-center mb-5">
                  <div className="w-20 h-20 mx-auto rounded-full border-4 border-slate-100 shadow-md p-0.5 bg-slate-50 relative overflow-hidden flex items-center justify-center mb-2">
                    <img src={photoUrl} alt="Photo" className="w-full h-full object-cover rounded-full" />
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Photo:</span>
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
                  
                  {/* Row 1: First Name & Last Name */}
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

                  {/* Row 2: Email Address & Phone Number */}
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

                  {/* Row 3: City & Country */}
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

                  {/* Row 4: Additional Information */}
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                      Additional Information ....
                    </label>
                    <div className="relative">
                      <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                      <textarea
                        rows={2}
                        value={additionalInfo}
                        onChange={(e) => setAdditionalInfo(e.target.value)}
                        placeholder="Additional Information ...."
                        className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:outline-none focus:ring-2 focus:ring-brand-500 resize-none"
                      ></textarea>
                    </div>
                  </div>

                  {/* Register Users Button */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-bold rounded-xl shadow-md transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-70"
                    >
                      {isLoading ? (
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <span>Register Users</span>
                          <CheckCircle className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <div className="mt-4 text-center">
                  <p className="text-xs text-slate-500">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => setIsRegistration(false)}
                      className="font-bold text-brand-600 hover:underline ml-1"
                    >
                      Login Screen (Screen 1)
                    </button>
                  </p>
                </div>

              </div>
            )}

          </div>

          <div className="pt-4 border-t border-slate-100 text-center">
            <p className="text-[11px] text-slate-400">
              Protected by GlobeTrotter 256-bit SSL Security.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
