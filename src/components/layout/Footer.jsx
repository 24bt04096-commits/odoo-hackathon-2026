import React from 'react';
import { useTripContext } from '../../context/TripContext';
import { Compass, Heart, Github, Globe, Shield, Sparkles } from 'lucide-react';

export const Footer = () => {
  const { setCurrentScreen } = useTripContext();

  return (
    <footer className="bg-slate-900 text-slate-400 pt-12 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-brand-500 flex items-center justify-center text-white">
                <Compass className="w-5 h-5" />
              </div>
              <span className="text-xl font-bold text-white tracking-tight">GlobeTrotter</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Empowering travelers to build, budget, and share stunning multi-city itineraries with modern intelligent tools.
            </p>
            <div className="flex items-center gap-3 text-slate-400">
              <span className="text-xs px-2.5 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 text-amber-400" />
                Hackathon Edition
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Core Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentScreen('landing')} className="hover:text-white transition-colors">
                  Landing Showcase
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('dashboard')} className="hover:text-white transition-colors">
                  Traveler Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('create-trip')} className="hover:text-white transition-colors">
                  Multi-step Trip Wizard
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('itinerary-builder')} className="hover:text-white transition-colors">
                  Itinerary Builder
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('my-trips')} className="hover:text-white transition-colors">
                  Trip Management
                </button>
              </li>
            </ul>
          </div>

          {/* Discovery & Tools */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Explore & Tools</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentScreen('city-discovery')} className="hover:text-white transition-colors">
                  City Discovery Catalog
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('activity-discovery')} className="hover:text-white transition-colors">
                  Activity Explorer
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('budget')} className="hover:text-white transition-colors">
                  Financial Budget Tracker
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('calendar')} className="hover:text-white transition-colors">
                  Calendar & Timeline
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('public-share')} className="hover:text-white transition-colors">
                  Public Shared Trip View
                </button>
              </li>
            </ul>
          </div>

          {/* Admin & Account */}
          <div>
            <h4 className="text-white font-semibold text-sm tracking-wider uppercase mb-4">Account & SaaS</h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button onClick={() => setCurrentScreen('profile')} className="hover:text-white transition-colors">
                  Profile & Preferences
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('admin')} className="hover:text-white transition-colors flex items-center gap-1.5 text-indigo-400">
                  <Shield className="w-3.5 h-3.5" />
                  Admin Analytics Dashboard
                </button>
              </li>
              <li>
                <button onClick={() => setCurrentScreen('auth')} className="hover:text-white transition-colors">
                  Auth & Sign In
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 GlobeTrotter Inc. Built for modern travel adventurers.</p>
          <div className="flex items-center gap-1 text-slate-400">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
            <span>for the Hackathon</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
