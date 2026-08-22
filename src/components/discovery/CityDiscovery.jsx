import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { Search, MapPin, Star, Plus, Globe, Calendar, DollarSign, Check } from 'lucide-react';

export const CityDiscovery = () => {
  const { destinations, trips, activeTrip, createTrip, addToast, formatCurrency, setCurrentScreen } = useTripContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedDestModal, setSelectedDestModal] = useState(null);

  const regions = ['All', 'East Asia', 'Western Europe', 'Southern Europe', 'Southeast Asia', 'Northern Europe'];

  const filteredDestinations = destinations.filter((dest) => {
    const matchesRegion = selectedRegion === 'All' || dest.region === selectedRegion;
    const matchesSearch =
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.country.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.travelStyle.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesRegion && matchesSearch;
  });

  const handleQuickAddCity = (dest) => {
    setSelectedDestModal(dest);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
          Global Destination Explorer
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Discover World-Class Cities for Your Trip
        </h1>
        <p className="text-sm text-slate-500">
          Browse curated destinations, daily cost averages, top landmarks, and add them directly to your active itinerary.
        </p>
      </div>

      {/* Search Bar & Region Filters */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft space-y-4">
        <div className="relative max-w-xl mx-auto">
          <Search className="w-5 h-5 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            placeholder="Search by city, country, or travel style (e.g. Kyoto, Culture, Food)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
          />
        </div>

        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
          {regions.map((reg) => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap ${
                selectedRegion === reg
                  ? 'bg-brand-600 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Destination Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDestinations.map((dest) => (
          <div
            key={dest.id}
            className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between group"
          >
            <div>
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img
                  src={dest.heroImage}
                  alt={dest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                />
                <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold px-2.5 py-1 rounded-full border border-white/20">
                  📍 {dest.country}
                </div>
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-extrabold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm">
                  <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
                  {dest.rating}
                </div>
                <div className="absolute bottom-3 left-3 bg-slate-900/90 backdrop-blur-md text-emerald-400 text-xs font-extrabold px-3 py-1 rounded-full border border-emerald-500/30">
                  Avg. {formatCurrency(dest.avgDailyCost)} / day
                </div>
              </div>

              <div className="p-5 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{dest.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-2">{dest.description}</p>
                </div>

                <div className="flex flex-wrap gap-1">
                  {dest.travelStyle.map((style, i) => (
                    <span key={i} className="text-[10px] font-semibold px-2 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
                      {style}
                    </span>
                  ))}
                </div>

                <div className="pt-2 border-t border-slate-100 space-y-1">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Top Attractions</span>
                  <div className="flex flex-wrap gap-1 text-xs text-slate-600">
                    {dest.topSpots.map((spot, i) => (
                      <span key={i} className="bg-slate-100 px-2 py-0.5 rounded text-[11px]">
                        • {spot}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="p-5 pt-0">
              <button
                onClick={() => handleQuickAddCity(dest)}
                className="w-full py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-xs"
              >
                <Plus className="w-4 h-4" />
                Add {dest.name} to Trip
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* QUICK ADD TO TRIP MODAL */}
      {selectedDestModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-card border border-slate-200 space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Add {selectedDestModal.name}</h3>
            <p className="text-xs text-slate-500">
              Select which trip you'd like to add {selectedDestModal.name} to:
            </p>

            <div className="space-y-2">
              {trips.map((t) => (
                <button
                  key={t.id}
                  onClick={() => {
                    addToast(`Added ${selectedDestModal.name} to "${t.title}"!`, 'success');
                    setSelectedDestModal(null);
                    setCurrentScreen('itinerary-builder');
                  }}
                  className="w-full p-3 rounded-xl bg-slate-50 hover:bg-brand-50 border border-slate-200 text-left text-xs font-bold text-slate-900 transition-colors flex items-center justify-between"
                >
                  <span>{t.title}</span>
                  <Plus className="w-4 h-4 text-brand-600" />
                </button>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedDestModal(null)}
                className="px-4 py-2 text-xs font-bold text-slate-500 hover:bg-slate-100 rounded-xl"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
