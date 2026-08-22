import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  Plus, 
  Search, 
  Filter, 
  Layers, 
  ArrowUpDown, 
  MapPin, 
  Calendar, 
  Compass, 
  Sparkles, 
  ChevronRight, 
  Globe, 
  Eye, 
  SlidersHorizontal,
  FolderTree,
  DollarSign
} from 'lucide-react';

export const DashboardPage = () => {
  const { 
    user, 
    trips, 
    setActiveTripId, 
    setCurrentScreen, 
    destinations, 
    formatCurrency 
  } = useTripContext();

  // Search & Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [sortBy, setSortBy] = useState('newest');
  const [groupBy, setGroupBy] = useState('status');

  // Top Regional Selections Preset Data
  const regionalSelections = [
    {
      id: 'europe',
      name: 'Europe',
      tagline: 'Historic Cities & Culture',
      places: '24+ Destinations',
      image: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'asia',
      name: 'Asia',
      tagline: 'Temples, Markets & Tech',
      places: '18+ Destinations',
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'americas',
      name: 'Americas',
      tagline: 'Metropolises & Wonders',
      places: '30+ Destinations',
      image: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'africa',
      name: 'Africa',
      tagline: 'Safaris & Ancient History',
      places: '12+ Destinations',
      image: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'oceania',
      name: 'Oceania',
      tagline: 'Beaches, Reefs & Nature',
      places: '15+ Destinations',
      image: 'https://images.unsplash.com/photo-1506973035872-a4ec16b8e8d9?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Filtered Trips Search Logic
  const filteredTrips = trips.filter((t) => {
    const matchesSearch = t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.cities.some(c => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 relative font-sans selection:bg-brand-500 selection:text-white">
      
      {/* ========================================================= */}
      {/* 1. BANNER IMAGE HERO BOX                                  */}
      {/* ========================================================= */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl min-h-[300px] sm:min-h-[360px] flex items-center p-6 sm:p-10 border border-slate-200/80 group">
        {/* Banner Cover Photo */}
        <img 
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80" 
          alt="Banner Image" 
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/75 to-slate-950/40"></div>

        {/* Banner Content Overlay */}
        <div className="relative z-10 space-y-4 max-w-2xl text-white">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brand-500/30 backdrop-blur-md border border-brand-400/40 text-brand-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            Main Landing Page (Screen 3)
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight leading-tight drop-shadow-md">
            Banner Image
          </h1>

          <p className="text-slate-200 text-sm sm:text-base font-medium leading-relaxed drop-shadow">
            Welcome back, <span className="text-amber-300 font-bold">{user.name}</span>! Plan your next multi-city journey, explore top regional destinations, and manage your saved itineraries.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs sm:text-sm font-semibold text-slate-300">
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
              <MapPin className="w-4 h-4 text-brand-400" /> {trips.length} Active Trips
            </span>
            <span className="flex items-center gap-1.5 bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/15">
              <Globe className="w-4 h-4 text-emerald-400" /> 5 Global Regions
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SEARCH BAR & FILTER CONTROL BAR                       */}
      {/* ========================================================= */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Search bar ...... */}
        <div className="relative w-full md:w-1/2">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search bar ......"
            className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
          />
        </div>

        {/* Action Controls: Group by | Filter | Sort by... */}
        <div className="flex items-center gap-2.5 w-full md:w-auto justify-end overflow-x-auto pb-1 md:pb-0">
          
          {/* Group by */}
          <div className="relative">
            <select
              value={groupBy}
              onChange={(e) => setGroupBy(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 pr-8 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
            >
              <option value="status">Group by: Status</option>
              <option value="region">Group by: Region</option>
              <option value="budget">Group by: Budget</option>
            </select>
            <FolderTree className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-3 pointer-events-none" />
          </div>

          {/* Filter */}
          <button
            type="button"
            onClick={() => setSelectedRegion(selectedRegion === 'All' ? 'Europe' : 'All')}
            className={`flex items-center gap-1.5 px-4 py-2.5 border rounded-xl text-xs font-bold transition-all ${
              selectedRegion !== 'All' 
                ? 'bg-brand-50 border-brand-300 text-brand-600' 
                : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
            }`}
          >
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Filter</span>
            {selectedRegion !== 'All' && <span className="w-2 h-2 rounded-full bg-brand-500"></span>}
          </button>

          {/* Sort by... */}
          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="appearance-none bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 pr-8 rounded-xl cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors"
            >
              <option value="newest">Sort by: Newest</option>
              <option value="budget">Sort by: Highest Budget</option>
              <option value="days">Sort by: Longest Duration</option>
            </select>
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-500 absolute right-3 top-3 pointer-events-none" />
          </div>

        </div>

      </div>

      {/* ========================================================= */}
      {/* 3. TOP REGIONAL SELECTIONS                                 */}
      {/* ========================================================= */}
      <div className="space-y-4">
        
        {/* Section Header with Horizontal Line */}
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
            Top Regional Selections
          </h2>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        {/* 5 Regional Selection Square/Rounded Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {regionalSelections.map((region) => (
            <div 
              key={region.id}
              onClick={() => setCurrentScreen('city-discovery')}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card hover:-translate-y-1 transition-all duration-200 group cursor-pointer flex flex-col"
            >
              <div className="relative h-32 overflow-hidden">
                <img 
                  src={region.image} 
                  alt={region.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-2.5 left-3 text-white">
                  <h3 className="text-base font-extrabold">{region.name}</h3>
                  <p className="text-[10px] text-slate-300 font-medium">{region.places}</p>
                </div>
              </div>
              <div className="p-3 bg-white flex-1 flex flex-col justify-between">
                <p className="text-[11px] text-slate-500 line-clamp-1">{region.tagline}</p>
                <span className="text-[11px] font-bold text-brand-600 group-hover:underline mt-2 flex items-center gap-0.5">
                  Explore <ChevronRight className="w-3 h-3" />
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* ========================================================= */}
      {/* 4. PREVIOUS TRIPS                                         */}
      {/* ========================================================= */}
      <div className="space-y-4">
        
        {/* Section Header with Horizontal Line */}
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
            Previous Trips
          </h2>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        {/* Previous Trips Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <div 
              key={trip.id}
              className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Trip Banner Image */}
                <div className="relative h-44 overflow-hidden">
                  <img 
                    src={trip.coverImage || "https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80"} 
                    alt={trip.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                    {trip.status}
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                    <DollarSign className="w-3.5 h-3.5 text-brand-600" />
                    Spent {formatCurrency(trip.spentBudget)} / {formatCurrency(trip.totalBudget)}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-brand-600 transition-colors">
                      {trip.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 flex items-center gap-1.5 font-medium">
                      <Calendar className="w-3.5 h-3.5 text-brand-500" />
                      {trip.startDate} to {trip.endDate} • {trip.totalDays} Days
                    </p>
                  </div>

                  {/* Cities Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {trip.cities.map((city) => (
                      <span 
                        key={city.id} 
                        className="text-[11px] font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200/60"
                      >
                        📍 {city.name} ({city.daysCount}d)
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-5 pt-0 border-t border-slate-100 flex items-center gap-2 mt-2">
                <button
                  onClick={() => {
                    setActiveTripId(trip.id);
                    setCurrentScreen('itinerary-builder');
                  }}
                  className="flex-1 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Open Builder</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => {
                    setActiveTripId(trip.id);
                    setCurrentScreen('itinerary-view');
                  }}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs px-3.5 py-2.5 rounded-xl transition-colors flex items-center gap-1"
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>View</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* ========================================================= */}
      {/* 5. FLOATING ACTION BUTTON: + PLAN A TRIP                  */}
      {/* ========================================================= */}
      <button
        onClick={() => setCurrentScreen('create-trip')}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-extrabold text-sm px-6 py-4 rounded-full shadow-glow flex items-center gap-2.5 transition-all duration-300 hover:scale-105 active:scale-95 ring-4 ring-white/90 border border-brand-400/50 cursor-pointer"
      >
        <Plus className="w-5 h-5 stroke-[3]" />
        <span>Plan a trip</span>
      </button>

    </div>
  );
};
