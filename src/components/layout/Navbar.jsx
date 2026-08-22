import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  Compass, 
  Map, 
  Calendar as CalendarIcon, 
  PieChart, 
  PlusCircle, 
  Compass as DiscoverIcon, 
  User, 
  ShieldAlert, 
  Globe, 
  LogOut, 
  LayoutDashboard,
  Sparkles,
  ChevronDown,
  Share2,
  LogIn
} from 'lucide-react';

export const Navbar = () => {
  const { currentScreen, setCurrentScreen, user, isAuthenticated, logout } = useTripContext();
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [discoverDropdownOpen, setDiscoverDropdownOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full glass-panel border-b border-slate-200/80 shadow-sm transition-all duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand Logo */}
        <div 
          onClick={() => setCurrentScreen(isAuthenticated ? 'dashboard' : 'landing')} 
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-indigo-600 flex items-center justify-center text-white shadow-glow group-hover:scale-105 transition-transform duration-200">
            <Compass className="w-6 h-6 animate-spin-slow" />
          </div>
          <div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1">
              Globe<span className="gradient-text">Trotter</span>
            </span>
            <p className="text-[11px] text-slate-500 font-medium -mt-1 hidden sm:block">AI-Powered Multi-City Planner</p>
          </div>
        </div>

        {/* Navigation Items */}
        {isAuthenticated && (
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentScreen === 'dashboard'
                  ? 'bg-brand-50 text-brand-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </button>

            <button
              onClick={() => setCurrentScreen('my-trips')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentScreen === 'my-trips'
                  ? 'bg-brand-50 text-brand-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Map className="w-4 h-4" />
              My Trips
            </button>

            <button
              onClick={() => setCurrentScreen('itinerary-builder')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentScreen === 'itinerary-builder' || currentScreen === 'itinerary-view'
                  ? 'bg-brand-50 text-brand-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              Itinerary
            </button>

            {/* Discovery Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDiscoverDropdownOpen(!discoverDropdownOpen)}
                onBlur={() => setTimeout(() => setDiscoverDropdownOpen(false), 200)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  currentScreen === 'city-discovery' || currentScreen === 'activity-discovery'
                    ? 'bg-brand-50 text-brand-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <DiscoverIcon className="w-4 h-4" />
                Discover
                <ChevronDown className="w-3.5 h-3.5 opacity-60" />
              </button>

              {discoverDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-card border border-slate-100 py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <button
                    onClick={() => {
                      setCurrentScreen('city-discovery');
                      setDiscoverDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Globe className="w-4 h-4 text-brand-500" />
                    Explore Cities
                  </button>
                  <button
                    onClick={() => {
                      setCurrentScreen('activity-discovery');
                      setDiscoverDropdownOpen(false);
                    }}
                    className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    Browse Activities
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setCurrentScreen('budget')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentScreen === 'budget'
                  ? 'bg-brand-50 text-brand-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <PieChart className="w-4 h-4" />
              Budget
            </button>

            <button
              onClick={() => setCurrentScreen('calendar')}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                currentScreen === 'calendar'
                  ? 'bg-brand-50 text-brand-600 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              Calendar
            </button>
          </nav>
        )}

        {/* Right CTA & Profile Dropdown */}
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => setCurrentScreen('create-trip')}
                className="flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-sm hover:shadow-glow transition-all duration-200"
              >
                <PlusCircle className="w-4 h-4" />
                <span className="hidden sm:inline">Plan Trip</span>
              </button>

              {/* Profile Menu Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                  onBlur={() => setTimeout(() => setProfileDropdownOpen(false), 200)}
                  className="flex items-center gap-2 p-1 rounded-full border border-slate-200 hover:border-brand-300 transition-colors"
                >
                  <img
                    src={user?.avatar || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80"}
                    alt={user?.name || "User"}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/20"
                  />
                  <ChevronDown className="w-3.5 h-3.5 text-slate-500 hidden sm:block mr-1" />
                </button>

                {profileDropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-card border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-sm font-bold text-slate-900">{user?.name || "Explorer"}</p>
                      <p className="text-xs text-slate-500 truncate">{user?.email || "traveler@globetrotter.io"}</p>
                    </div>

                    <div className="py-1">
                      <button
                        onClick={() => {
                          setCurrentScreen('profile');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                      >
                        <User className="w-4 h-4 text-slate-400" />
                        Profile & Preferences
                      </button>

                      <button
                        onClick={() => {
                          setCurrentScreen('public-share');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
                      >
                        <Share2 className="w-4 h-4 text-slate-400" />
                        Public Shared Trip View
                      </button>

                      <button
                        onClick={() => {
                          setCurrentScreen('admin');
                          setProfileDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 flex items-center gap-2.5"
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
                        className="w-full px-4 py-2 text-left text-sm text-rose-600 hover:bg-rose-50 flex items-center gap-2.5 font-medium"
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
              className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white text-sm font-semibold px-4 py-2 rounded-xl transition-all"
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
