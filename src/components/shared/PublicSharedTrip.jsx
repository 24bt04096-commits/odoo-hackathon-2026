import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { Share2, Copy, Check, Heart, Sparkles, MapPin, Calendar, Globe, Bookmark } from 'lucide-react';

export const PublicSharedTrip = () => {
  const { activeTrip, user, addToast, createTrip, formatCurrency } = useTripContext();
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(false);

  if (!activeTrip) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <p className="text-sm font-semibold text-slate-500">No active trip selected.</p>
      </div>
    );
  }

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    addToast('Public trip share link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 3000);
  };

  const handleCloneTrip = () => {
    createTrip({
      title: `Copy of ${activeTrip.title}`,
      subtitle: activeTrip.subtitle,
      startDate: '2026-12-01',
      endDate: '2026-12-10',
      totalDays: activeTrip.totalDays,
      totalBudget: activeTrip.totalBudget,
      cities: activeTrip.cities
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* Public Banner */}
      <div className="bg-slate-900 text-white py-3 px-4 border-b border-slate-800 text-center text-xs font-semibold flex items-center justify-center gap-2">
        <Globe className="w-4 h-4 text-brand-400" />
        <span>You are viewing a public travel share link by {user.name}</span>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* Profile Travel Card Header */}
        <div className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-card">
          <div className="relative h-64 sm:h-80 bg-slate-900">
            <img src={activeTrip.coverImage} alt={activeTrip.title} className="w-full h-full object-cover opacity-75" />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent"></div>

            <div className="absolute top-4 right-4 flex items-center gap-2">
              <button
                onClick={() => setLiked(!liked)}
                className={`p-2.5 rounded-full backdrop-blur-md transition-colors ${
                  liked ? 'bg-rose-500 text-white' : 'bg-slate-900/60 text-white hover:bg-slate-900'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-white' : ''}`} />
              </button>
            </div>

            <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <img src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-white object-cover" />
                  <div>
                    <span className="text-xs font-bold text-slate-200 block">{user.name}</span>
                    <span className="text-[10px] text-brand-300">Published Travel Explorer</span>
                  </div>
                </div>

                <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight drop-shadow-sm">
                  {activeTrip.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-300">{activeTrip.subtitle}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyLink}
                  className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs px-4 py-3 rounded-2xl shadow-soft flex items-center gap-1.5 transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-brand-600" />}
                  {copied ? 'Link Copied!' : 'Copy Share Link'}
                </button>

                <button
                  onClick={handleCloneTrip}
                  className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-glow flex items-center gap-1.5 transition-colors"
                >
                  <Bookmark className="w-4 h-4" />
                  Clone & Save Trip
                </button>
              </div>
            </div>
          </div>

          <div className="p-6 bg-slate-50 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            <div>
              <span className="text-xs text-slate-400 font-medium">Duration</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{activeTrip.totalDays} Days</p>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">Est. Budget</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{formatCurrency(activeTrip.totalBudget)}</p>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">Destinations</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{activeTrip.cities.length} Cities</p>
            </div>
            <div>
              <span className="text-xs text-slate-400 font-medium">Travelers</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">{activeTrip.travelers.length} Co-Explorers</p>
            </div>
          </div>
        </div>

        {/* Itinerary Preview Timeline */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-slate-900">Public Route Timeline</h2>
          {activeTrip.itinerary.map((day) => (
            <div key={day.dayNumber} className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-xs font-bold text-brand-600 uppercase">
                  Day {day.dayNumber} • {day.city}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{day.date}</span>
              </div>

              <div className="space-y-2">
                {day.activities.map((act) => (
                  <div key={act.id} className="p-3.5 rounded-xl bg-slate-50 flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center gap-3">
                      <span className="text-brand-600 font-bold">{act.time}</span>
                      <span className="text-slate-900 font-bold">{act.title}</span>
                    </div>
                    <span className="text-slate-500">📍 {act.location}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
