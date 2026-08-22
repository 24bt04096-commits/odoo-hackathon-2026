import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  Plus, 
  Search, 
  Grid, 
  List as ListIcon, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Trash2, 
  ChevronRight, 
  Sparkles,
  Layers,
  MoreVertical
} from 'lucide-react';

export const MyTripsPage = () => {
  const { trips, setActiveTripId, setCurrentScreen, deleteTrip, formatCurrency } = useTripContext();
  
  const [filterTab, setFilterTab] = useState('all'); // all, upcoming, active, draft, completed
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid, list

  const filteredTrips = trips.filter((t) => {
    const matchesFilter = filterTab === 'all' || t.status === filterTab;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.cities.some((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header & Main CTAs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900">My Travel Itineraries</h1>
          <p className="text-sm text-slate-500 mt-1">Manage, edit, and organize all your saved multi-city routes.</p>
        </div>

        <button
          onClick={() => setCurrentScreen('create-trip')}
          className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-5 py-3 rounded-2xl shadow-sm flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Plan New Trip
        </button>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
          {['all', 'upcoming', 'active', 'draft', 'completed'].map((tab) => (
            <button
              key={tab}
              onClick={() => setFilterTab(tab)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-colors whitespace-nowrap ${
                filterTab === tab
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search & View Mode Switcher */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-2.5" />
            <input
              type="text"
              placeholder="Search by trip or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400'}`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-1.5 rounded-lg transition-colors ${viewMode === 'list' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-400'}`}
            >
              <ListIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>

      {/* Trips Display */}
      {filteredTrips.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200/80 shadow-soft max-w-md mx-auto space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mx-auto">
            <Layers className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">No Trips Found</h3>
          <p className="text-xs text-slate-500">
            No itineraries match your current filter criteria. Create a new trip or reset filters.
          </p>
          <button
            onClick={() => {
              setFilterTab('all');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((t) => (
            <div key={t.id} className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between group">
              <div>
                <div className="relative h-48 overflow-hidden bg-slate-900">
                  <img
                    src={t.coverImage}
                    alt={t.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                      {t.status}
                    </span>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTrip(t.id);
                    }}
                    className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/60 hover:bg-rose-600 text-white backdrop-blur-md transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <h3 className="text-lg font-extrabold drop-shadow-md">{t.title}</h3>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-500" /> {t.startDate}
                    </span>
                    <span className="font-bold text-slate-800">{t.totalDays} Days</span>
                  </div>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {t.cities.map((city) => (
                      <span key={city.id} className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-slate-100 text-slate-700 border border-slate-200/60">
                        📍 {city.name} ({city.daysCount}d)
                      </span>
                    ))}
                  </div>

                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400">Total Budget</span>
                      <p className="text-sm font-extrabold text-slate-900">{formatCurrency(t.totalBudget)}</p>
                    </div>
                    <div className="flex items-center -space-x-2">
                      {t.travelers.map((tr, i) => (
                        <img key={i} src={tr.avatar} alt={tr.name} className="w-7 h-7 rounded-full border-2 border-white object-cover" />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0 grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    setActiveTripId(t.id);
                    setCurrentScreen('itinerary-builder');
                  }}
                  className="py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  Builder
                </button>
                <button
                  onClick={() => {
                    setActiveTripId(t.id);
                    setCurrentScreen('itinerary-view');
                  }}
                  className="py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
                >
                  View Summary
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden divide-y divide-slate-100">
          {filteredTrips.map((t) => (
            <div key={t.id} className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-slate-50/80 transition-colors">
              <div className="flex items-center gap-4">
                <img src={t.coverImage} alt={t.title} className="w-16 h-16 rounded-2xl object-cover shrink-0" />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {t.status}
                    </span>
                    <span className="text-xs text-slate-500">{t.startDate} • {t.totalDays} Days</span>
                  </div>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">{t.title}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Route: {t.cities.map((c) => c.name).join(' → ')}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <span className="text-xs text-slate-500">Budget</span>
                  <p className="text-sm font-bold text-slate-900">{formatCurrency(t.totalBudget)}</p>
                </div>

                <button
                  onClick={() => {
                    setActiveTripId(t.id);
                    setCurrentScreen('itinerary-builder');
                  }}
                  className="px-4 py-2 bg-brand-600 text-white font-bold text-xs rounded-xl"
                >
                  Builder
                </button>
                <button
                  onClick={() => deleteTrip(t.id)}
                  className="p-2 text-slate-400 hover:text-rose-600 rounded-xl"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};
