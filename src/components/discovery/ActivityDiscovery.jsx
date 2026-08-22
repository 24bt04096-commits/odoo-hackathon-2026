import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { Search, Sparkles, Clock, MapPin, Plus, Star, DollarSign } from 'lucide-react';

export const ActivityDiscovery = () => {
  const { activitiesCatalog, activeTrip, addActivityToTrip, formatCurrency, setCurrentScreen } = useTripContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Culture', 'Sightseeing', 'Food & Drink', 'Relaxation', 'Nature & Hiking'];

  const filteredActivities = activitiesCatalog.filter((act) => {
    const matchesCategory = selectedCategory === 'All' || act.category === selectedCategory;
    const matchesSearch =
      act.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.cityName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      act.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1 rounded-full flex items-center gap-1.5 w-max mx-auto">
          <Sparkles className="w-3.5 h-3.5 fill-amber-400" />
          Curated Travel Experiences
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Browse Handpicked Activities & Tours
        </h1>
        <p className="text-sm text-slate-500">
          Discover top-rated experiences and add them directly into your active itinerary days.
        </p>
      </div>

      {/* Search & Categories */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft space-y-4">
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search activities by keyword, city, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Activities Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredActivities.map((act) => (
          <div
            key={act.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-48 overflow-hidden bg-slate-900">
                <img
                  src={act.image}
                  alt={act.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border border-white/20">
                  {act.cityName} • {act.category}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {act.rating}
                </div>
                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md text-emerald-400 text-xs font-extrabold px-2.5 py-1 rounded-full border border-emerald-500/30">
                  {act.cost === 0 ? 'Free Entry' : formatCurrency(act.cost)}
                </div>
              </div>

              <div className="p-5 space-y-3">
                <h3 className="text-lg font-bold text-slate-900 leading-snug">{act.title}</h3>
                <p className="text-xs text-slate-500 line-clamp-2">{act.description}</p>
                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <span className="flex items-center gap-1 font-semibold text-slate-700">
                    <Clock className="w-3.5 h-3.5 text-brand-500" /> {act.durationHours} hrs
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" /> {act.locationName}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => {
                  if (activeTrip) {
                    addActivityToTrip(activeTrip.id, 1, act);
                    setCurrentScreen('itinerary-builder');
                  }
                }}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                Add to Itinerary (Day 1)
              </button>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
};
