import React from 'react';
import { useTripContext } from '../../context/TripContext';
import { StatCard } from '../common/StatCard';
import { 
  PlusCircle, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Compass, 
  Globe, 
  ArrowRight, 
  Sparkles, 
  Clock, 
  ChevronRight,
  TrendingUp,
  Bookmark
} from 'lucide-react';

export const DashboardPage = () => {
  const { 
    user, 
    trips, 
    activeTrip, 
    setActiveTripId, 
    setCurrentScreen, 
    destinations, 
    formatCurrency 
  } = useTripContext();

  const upcomingTrip = trips.find((t) => t.status === 'upcoming') || trips[0];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-brand-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-card relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-500/20 text-brand-300 text-xs font-semibold border border-brand-500/30">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            Traveler Dashboard
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Ready for your next journey, {user.name.split(' ')[0]}?
          </h1>
          <p className="text-slate-300 text-sm max-w-xl">
            You have <span className="font-bold text-amber-400">{trips.length} active itineraries</span> saved. Explore recommended destinations or create a new multi-city trip.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <button
            onClick={() => setCurrentScreen('create-trip')}
            className="bg-brand-500 hover:bg-brand-400 text-white font-bold px-5 py-3 rounded-2xl shadow-glow text-sm flex items-center gap-2 transition-all hover:scale-105"
          >
            <PlusCircle className="w-5 h-5" />
            Create New Trip
          </button>
        </div>
      </div>

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Trips"
          value={trips.length}
          subtitle="2 Upcoming • 1 Draft"
          icon={MapPin}
          color="brand"
        />
        <StatCard
          title="Countries Visited"
          value={user.stats.countriesVisited}
          subtitle="Goal: 30 by 2027"
          icon={Globe}
          color="emerald"
        />
        <StatCard
          title="Total Planned Budget"
          value={formatCurrency(trips.reduce((acc, t) => acc + t.totalBudget, 0))}
          subtitle="Spent: $3,000"
          icon={DollarSign}
          color="amber"
        />
        <StatCard
          title="Saved Destinations"
          value={user.stats.savedPlaces}
          subtitle="Explore recommendations"
          icon={Bookmark}
          color="indigo"
        />
      </div>

      {/* Featured Upcoming Trip Card */}
      {upcomingTrip && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div>
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full uppercase tracking-wider">
                Next Upcoming Trip
              </span>
              <h2 className="text-2xl font-bold text-slate-900 mt-2">{upcomingTrip.title}</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-brand-500" /> {upcomingTrip.startDate} to {upcomingTrip.endDate} • {upcomingTrip.totalDays} Days
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  setActiveTripId(upcomingTrip.id);
                  setCurrentScreen('itinerary-builder');
                }}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center gap-1.5"
              >
                Open Builder
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setActiveTripId(upcomingTrip.id);
                  setCurrentScreen('itinerary-view');
                }}
                className="bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs px-4 py-2.5 rounded-xl transition-colors"
              >
                View Full Summary
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
            {/* Cities in trip */}
            <div className="md:col-span-2 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Route Destinations</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {upcomingTrip.cities.map((city, idx) => (
                  <div key={city.id} className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-brand-500 text-white font-extrabold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-900">{city.name}</h5>
                      <p className="text-xs text-slate-500">{city.daysCount} Days • {city.hotel}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Widget */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200/60 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Budget Spent</span>
                <div className="mt-2 flex items-baseline justify-between">
                  <span className="text-xl font-extrabold text-slate-900">{formatCurrency(upcomingTrip.spentBudget)}</span>
                  <span className="text-xs text-slate-500 font-semibold">of {formatCurrency(upcomingTrip.totalBudget)}</span>
                </div>
                <div className="w-full h-2.5 bg-slate-200 rounded-full mt-2 overflow-hidden">
                  <div 
                    className="h-full bg-brand-500 rounded-full" 
                    style={{ width: `${Math.min(100, (upcomingTrip.spentBudget / upcomingTrip.totalBudget) * 100)}%` }}
                  ></div>
                </div>
              </div>
              <button
                onClick={() => setCurrentScreen('budget')}
                className="mt-4 text-xs font-bold text-brand-600 hover:text-brand-700 flex items-center gap-1 justify-center py-2 bg-white rounded-xl border border-brand-200"
              >
                View Detailed Budget Dashboard
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Recommended Destinations Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-slate-900">Recommended Destinations</h3>
            <p className="text-xs text-slate-500">Handpicked top spots for your next multi-city route</p>
          </div>
          <button
            onClick={() => setCurrentScreen('city-discovery')}
            className="text-xs font-bold text-brand-600 hover:underline flex items-center gap-1"
          >
            Explore All Catalog
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {destinations.slice(0, 3).map((dest) => (
            <div key={dest.id} className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card transition-all group">
              <div className="relative h-44 overflow-hidden">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                  ⭐ {dest.rating}
                </div>
                <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full">
                  Avg. {formatCurrency(dest.avgDailyCost)} / day
                </div>
              </div>
              <div className="p-5 space-y-3">
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{dest.name}, {dest.country}</h4>
                  <p className="text-xs text-slate-500 line-clamp-1">{dest.tagline}</p>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                  <span className="text-xs text-slate-500">{dest.bestSeason}</span>
                  <button
                    onClick={() => {
                      setCurrentScreen('create-trip');
                    }}
                    className="text-xs font-bold text-brand-600 hover:text-brand-700 bg-brand-50 px-3 py-1.5 rounded-lg"
                  >
                    + Add to Trip
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
