import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  Sparkles, 
  ArrowRight, 
  Globe, 
  Compass, 
  Map, 
  DollarSign, 
  Share2, 
  CheckCircle2, 
  Star, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Zap,
  TrendingUp,
  ShieldCheck,
  Users
} from 'lucide-react';

export const LandingPage = () => {
  const { setCurrentScreen, setActiveTripId } = useTripContext();
  const [activeTab, setActiveTab] = useState('itinerary');

  const handleDemoClick = () => {
    setActiveTripId("trip-japan-2026");
    setCurrentScreen('itinerary-view');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-12 pb-20 md:pt-20 md:pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle background glow blobs */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-400/20 rounded-full blur-3xl pointer-events-none -z-10"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-indigo-400/15 rounded-full blur-3xl pointer-events-none -z-10"></div>

        <div className="text-center max-w-3xl mx-auto space-y-6">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs sm:text-sm font-semibold shadow-sm animate-bounce-subtle">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span>The Ultimate Travel Planning Engine for Hackathons & Beyond</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight text-slate-900">
            Craft Unforgettable <span className="gradient-text">Multi-City Journeys</span> with Precision
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-slate-600 font-normal leading-relaxed">
            Organize multi-city routes, estimate daily budgets in real-time, build interactive day-by-day timelines, and share beautifully designed travel itineraries.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setCurrentScreen('create-trip')}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-bold px-8 py-4 rounded-2xl shadow-glow hover:scale-[1.02] transition-all text-base"
            >
              Start Planning Free
              <ArrowRight className="w-5 h-5" />
            </button>

            <button
              onClick={handleDemoClick}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-800 font-semibold px-7 py-4 rounded-2xl border border-slate-200 shadow-soft transition-all text-base"
            >
              <Compass className="w-5 h-5 text-brand-600" />
              Explore Live Japan Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="pt-6 flex items-center justify-center gap-6 text-slate-500 text-xs sm:text-sm">
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> No Credit Card Needed
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Real-time Budget Engine
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-500" /> Offline Sync
            </span>
          </div>
        </div>

        {/* HERO FEATURE CARD SHOWCASE (Japan Trip Floating Preview) */}
        <div className="mt-14 relative max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-4 sm:p-8 shadow-card border border-slate-200/80">
            
            {/* Top Card Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-brand-500 to-indigo-600 flex items-center justify-center text-white font-black text-xl shadow-md">
                  JP
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold uppercase tracking-wider">
                      Upcoming • 10 Days
                    </span>
                    <span className="text-xs text-slate-500">Oct 10 - Oct 20, 2026</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">Grand Japan Odyssey: Tokyo & Kyoto</h3>
                </div>
              </div>
              <button
                onClick={handleDemoClick}
                className="flex items-center gap-1.5 text-sm font-bold text-brand-600 hover:text-brand-700 bg-brand-50 hover:bg-brand-100 px-4 py-2 rounded-xl transition-colors"
              >
                View Full Itinerary
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Content Split: Cities + Timeline Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              
              {/* City 1: Tokyo */}
              <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-900 text-white">
                <img
                  src="https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80"
                  alt="Tokyo"
                  className="w-full h-48 object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-xs font-bold text-brand-300 uppercase tracking-wider">Stop 1 • 5 Days</span>
                  <h4 className="text-lg font-extrabold text-white">Tokyo</h4>
                  <p className="text-xs text-slate-300 mt-1">TRUNK Hotel Shibuya • Shibuya Sky & Tsukiji</p>
                </div>
              </div>

              {/* City 2: Kyoto */}
              <div className="relative group rounded-2xl overflow-hidden shadow-sm border border-slate-100 bg-slate-900 text-white">
                <img
                  src="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=600&q=80"
                  alt="Kyoto"
                  className="w-full h-48 object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent p-4 flex flex-col justify-end">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">Stop 2 • 5 Days</span>
                  <h4 className="text-lg font-extrabold text-white">Kyoto</h4>
                  <p className="text-xs text-slate-300 mt-1">Sowaka Ryokan Gion • Fushimi Inari & Tea</p>
                </div>
              </div>

              {/* Quick Budget & Activity Stats */}
              <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold uppercase">
                    <span>Trip Budget Progress</span>
                    <span className="text-slate-900 font-extrabold">$2,150 / $3,500</span>
                  </div>
                  <div className="w-full h-3 bg-slate-200 rounded-full mt-2 overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-brand-500 to-emerald-500 w-[61%] rounded-full"></div>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between text-sm py-1.5 border-b border-slate-200/50">
                    <span className="text-slate-600 flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-brand-500" /> Planned Activities
                    </span>
                    <span className="font-bold text-slate-900">14 Spots</span>
                  </div>
                  <div className="flex items-center justify-between text-sm py-1.5">
                    <span className="text-slate-600 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-indigo-500" /> Co-Travelers
                    </span>
                    <span className="font-bold text-slate-900">2 Travelers</span>
                  </div>
                </div>

                <button
                  onClick={() => setCurrentScreen('itinerary-builder')}
                  className="w-full mt-3 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  Customize Itinerary
                </button>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* METRICS BANNER */}
      <section className="bg-white border-y border-slate-200/80 py-10">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">28,400+</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Active Travelers</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-brand-600">84,100+</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Trips Created</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-slate-900">140+</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">Global Cities Catalog</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-amber-500">4.9 / 5.0</div>
            <div className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">User Rating</div>
          </div>
        </div>
      </section>

      {/* FEATURE HIGHLIGHTS */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Built for Modern Explorers
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3">
            Everything you need for seamless multi-city travel
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-soft hover:shadow-card transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Map className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Multi-Step Trip Wizard</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Define your travel dates, add multiple destination cities, adjust stay lengths, and organize transport seamlessly.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-soft hover:shadow-card transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Real-Time Budget Engine</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Track accommodation, flights, food, and activities in real time. Smart alert warnings prevent overspending.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-7 border border-slate-200/80 shadow-soft hover:shadow-card transition-all duration-300 group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
              <Share2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">One-Click Social Sharing</h3>
            <p className="text-slate-600 text-sm leading-relaxed">
              Generate gorgeous public itinerary share pages for friends, family, or your social audience.
            </p>
          </div>

        </div>
      </section>

      {/* FINAL CALL TO ACTION BANNER */}
      <section className="pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-8 sm:p-14 text-white text-center shadow-card relative overflow-hidden">
          <div className="relative z-10 max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Ready to plan your next dream vacation?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg">
              Join thousands of travelers using GlobeTrotter to curate multi-city adventures in minutes.
            </p>
            <div className="pt-2">
              <button
                onClick={() => setCurrentScreen('create-trip')}
                className="bg-brand-500 hover:bg-brand-400 text-white font-extrabold px-8 py-4 rounded-2xl shadow-glow text-base transition-all hover:scale-105 inline-flex items-center gap-2"
              >
                Create Your Trip Now
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
