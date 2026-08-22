import React, { useState, useRef, useEffect } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  Compass, 
  Map, 
  Calendar as CalendarIcon, 
  PieChart, 
  PlusCircle, 
  Compass as DiscoverIcon, 
  User, 
  Users,
  ShieldAlert, 
  Globe, 
  LogOut, 
  LayoutDashboard,
  Sparkles,
  ChevronDown,
  Share2,
  LogIn
} from 'lucide-react';

export const Navbar = ({ onOpenInquiry }) => {
  const { currentScreen, setCurrentScreen, user, isAuthenticated, logout } = useTripContext();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [discoverDropdownOpen, setDiscoverDropdownOpen] = useState(false);

  const discoverRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (discoverRef.current && !discoverRef.current.contains(event.target)) {
        setDiscoverDropdownOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentScreen(isAuthenticated ? 'dashboard' : 'landing')} 
          className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform duration-200">
            <Compass className="w-5 h-5 animate-spin-slow" />
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-lg font-extrabold tracking-tight text-slate-900">
              Globe<span className="gradient-text">Trotter</span>
            </span>
            <span className="hidden xl:inline-block px-1.5 py-0.5 text-[10px] font-bold text-brand-600 bg-brand-50 border border-brand-200/60 rounded-md uppercase tracking-wider">
              AI
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-1 xl:gap-1.5 py-1">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                currentScreen === 'dashboard'
                  ? 'bg-brand-50 text-brand-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-brand-500" />
              <span>Dashboard</span>
            </button>

            <button
              onClick={() => setCurrentScreen('my-trips')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                currentScreen === 'my-trips'
                  ? 'bg-brand-50 text-brand-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Map className="w-4 h-4 text-indigo-500" />
              <span>My Trips</span>
            </button>

            <button
              onClick={() => setCurrentScreen('itinerary-builder')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                currentScreen === 'itinerary-builder' || currentScreen === 'itinerary-view'
                  ? 'bg-brand-50 text-brand-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Itinerary</span>
            </button>

            {/* Discovery Dropdown Container */}
            <div className="relative" ref={discoverRef}>
              <button
                onClick={() => setDiscoverDropdownOpen(!discoverDropdownOpen)}
                className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  currentScreen === 'city-discovery' || currentScreen === 'activity-discovery' || discoverDropdownOpen
                    ? 'bg-brand-50 text-brand-600 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                }`}
              >
                <DiscoverIcon className="w-4 h-4 text-emerald-500" />
                <span>Discover</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${discoverDropdownOpen ? 'rotate-180 text-brand-600' : 'opacity-60'}`} />
              </button>

              {discoverDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Categories
                  </div>
                  <button
                    onClick={() => {
                      setCurrentScreen('city-discovery');
                      setDiscoverDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs font-medium flex items-center gap-2.5 transition-colors ${
                      currentScreen === 'city-discovery' ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-brand-50 flex items-center justify-center text-brand-600">
                      <Globe className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Explore Cities</div>
                      <div className="text-[10px] text-slate-400">Popular destinations & guides</div>
                    </div>
                  </button>

                  <button
                    onClick={() => {
                      setCurrentScreen('activity-discovery');
                      setDiscoverDropdownOpen(false);
                    }}
                    className={`w-full px-3.5 py-2 text-left text-xs font-medium flex items-center gap-2.5 transition-colors ${
                      currentScreen === 'activity-discovery' ? 'bg-brand-50 text-brand-700 font-semibold' : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="w-7 h-7 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">Browse Activities</div>
                      <div className="text-[10px] text-slate-400">Tours, food, and culture</div>
                    </div>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setCurrentScreen('community')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                currentScreen === 'community'
                  ? 'bg-brand-50 text-brand-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <Users className="w-4 h-4 text-blue-500" />
              <span>Community</span>
            </button>

            <button
              onClick={() => setCurrentScreen('budget')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                currentScreen === 'budget'
                  ? 'bg-brand-50 text-brand-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <PieChart className="w-4 h-4 text-violet-500" />
              <span>Budget</span>
            </button>

            <button
              onClick={() => setCurrentScreen('calendar')}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                currentScreen === 'calendar'
                  ? 'bg-brand-50 text-brand-600 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
              }`}
            >
              <CalendarIcon className="w-4 h-4 text-rose-500" />
              <span>Calendar</span>
            </button>
          </nav>
        )}

        {/* Right CTA & Profile Dropdown */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={onOpenInquiry}
            className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold px-3 py-2 rounded-xl transition-all whitespace-nowrap shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span className="hidden sm:inline">Inquiry</span>
          </button>

          {isAuthenticated ? (
            <>
              <button
                onClick={() => setCurrentScreen('create-trip')}
                className="flex items-center gap-1.5 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white text-xs font-bold px-3.5 py-2 rounded-xl shadow-sm hover:shadow-glow transition-all duration-200 whitespace-nowrap"
              >
                <PlusCircle className="w-4 h-4 shrink-0" />
                <span className="hidden sm:inline">Plan Trip</span>
              </button>

              {/* Profile Menu Dropdown Container */}
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  className="flex items-center gap-1.5 p-1 rounded-full border border-slate-200 hover:border-brand-300 transition-colors bg-slate-50"
                >
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"}
                    alt={user?.name || "User"}
                    className="w-7 h-7 rounded-full object-cover ring-2 ring-brand-500/20"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 mr-0.5" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-200/90 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-bold text-slate-900">{user?.name || "Explorer"}</p>
                      <p className="text-[11px] text-slate-500 truncate">{user?.email || "traveler@globetrotter.io"}</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setCurrentScreen('profile');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        Profile & Preferences
                      </button>

                      <button
                        onClick={() => {
                          setCurrentScreen('public-share');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                      >
                        <Share2 className="w-4 h-4 text-slate-400" />
                        Public Shared Trip View
                      </button>

                      <button
                        onClick={() => {
                          setCurrentScreen('admin');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-slate-700 hover:bg-slate-50 flex items-center gap-2.5 font-medium"
                      >
                        <ShieldAlert className="w-4 h-4 text-indigo-500" />
                        Admin Analytics
                      </button>
                    </div>

                    <div className="pt-1 border-t border-slate-100">
                      <button
                        onClick={() => {
                          setProfileDropdownOpen(false);
                          logout();
                        }}
                        className="w-full px-4 py-2 text-left text-xs text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 font-semibold"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out / Switch Account
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          ) : (
            <button
              onClick={() => setCurrentScreen('auth')}
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all whitespace-nowrap"
            >
              <LogIn className="w-4 h-4" />
              Sign In
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
