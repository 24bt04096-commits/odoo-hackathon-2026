import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  Calendar as CalendarIcon, 
  Map, 
  Clock, 
  MapPin, 
  DollarSign, 
  Edit3, 
  Share2, 
  Sparkles, 
  Navigation,
  Globe,
  Layers
} from 'lucide-react';

export const ItineraryView = () => {
  const { activeTrip, setCurrentScreen, formatCurrency } = useTripContext();
  const [viewMode, setViewMode] = useState('timeline'); // timeline, calendar, map

  if (!activeTrip) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <button onClick={() => setCurrentScreen('my-trips')} className="px-4 py-2 bg-brand-600 text-white font-bold rounded-xl">
          Back to My Trips
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-16">
      
      {/* Rich Cover Banner */}
      <div className="relative h-72 sm:h-96 bg-slate-900 text-white overflow-hidden">
        <img
          src={activeTrip.coverImage}
          alt={activeTrip.title}
          className="w-full h-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>

        <div className="absolute bottom-6 left-0 right-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-extrabold uppercase px-3 py-1 rounded-full bg-brand-500 text-white">
                {activeTrip.status}
              </span>
              <span className="text-xs font-medium text-slate-300">
                {activeTrip.startDate} — {activeTrip.endDate} ({activeTrip.totalDays} Days)
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight drop-shadow-md">{activeTrip.title}</h1>
            <p className="text-sm text-slate-300 font-medium">{activeTrip.subtitle}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setCurrentScreen('itinerary-builder')}
              className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs px-4 py-3 rounded-2xl shadow-soft flex items-center gap-1.5 transition-colors"
            >
              <Edit3 className="w-4 h-4 text-brand-600" />
              Edit Itinerary
            </button>
            <button
              onClick={() => setCurrentScreen('public-share')}
              className="bg-brand-600 hover:bg-brand-500 text-white font-bold text-xs px-4 py-3 rounded-2xl shadow-glow flex items-center gap-1.5 transition-colors"
            >
              <Share2 className="w-4 h-4" />
              Public Share Page
            </button>
          </div>
        </div>
      </div>

      {/* Main Body */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 space-y-8">
        
        {/* View Mode Bar */}
        <div className="bg-white rounded-2xl p-3 border border-slate-200/80 shadow-soft flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('timeline')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                viewMode === 'timeline'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Clock className="w-4 h-4" />
              Timeline View
            </button>

            <button
              onClick={() => setViewMode('calendar')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                viewMode === 'calendar'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <CalendarIcon className="w-4 h-4" />
              Calendar View
            </button>

            <button
              onClick={() => setViewMode('map')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-colors ${
                viewMode === 'map'
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Map className="w-4 h-4 text-emerald-400" />
              Map & Route View
            </button>
          </div>

          <div className="hidden sm:flex items-center gap-3 text-xs text-slate-500 font-medium">
            <span>Budget: <strong className="text-slate-900">{formatCurrency(activeTrip.totalBudget)}</strong></span>
            <span>•</span>
            <span>Co-Travelers: <strong className="text-slate-900">{activeTrip.travelers.length}</strong></span>
          </div>
        </div>

        {/* TIMELINE MODE */}
        {viewMode === 'timeline' && (
          <div className="space-y-8">
            {activeTrip.itinerary.map((day) => (
              <div key={day.dayNumber} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                      Day {day.dayNumber} • {day.city}
                    </span>
                    <h3 className="text-2xl font-bold text-slate-900 mt-2">{day.title}</h3>
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">{day.date}</span>
                </div>

                <div className="space-y-4">
                  {day.activities.length === 0 ? (
                    <p className="text-xs text-slate-400 italic">No scheduled activities for this day yet.</p>
                  ) : (
                    day.activities.map((act) => (
                      <div key={act.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/60 flex items-start gap-4">
                        <div className="w-16 text-center shrink-0">
                          <span className="text-xs font-extrabold text-brand-600">{act.time}</span>
                        </div>
                        <div className="space-y-1 flex-1">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-white text-slate-700 border border-slate-200">
                              {act.category}
                            </span>
                            {act.cost > 0 && (
                              <span className="text-xs font-bold text-emerald-600">
                                {formatCurrency(act.cost)}
                              </span>
                            )}
                          </div>
                          <h4 className="font-bold text-slate-900 text-base">{act.title}</h4>
                          <p className="text-xs text-slate-500 flex items-center gap-1">
                            <MapPin className="w-3.5 h-3.5 text-slate-400" /> {act.location}
                          </p>
                          {act.notes && (
                            <p className="text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-100 mt-2">
                              {act.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CALENDAR MODE */}
        {viewMode === 'calendar' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Trip Calendar Schedule</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {activeTrip.itinerary.map((day) => (
                <div key={day.dayNumber} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-600">Day {day.dayNumber}</span>
                    <span className="text-slate-400">{day.date}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900">{day.title}</h4>
                  <p className="text-xs text-slate-500">📍 {day.city}</p>
                  <div className="pt-2 space-y-1">
                    {day.activities.map((a) => (
                      <div key={a.id} className="text-[11px] p-1.5 bg-white rounded-lg border border-slate-200 text-slate-700 truncate">
                        • {a.time} - {a.title}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SIMULATED MAP & ROUTE VIEW */}
        {viewMode === 'map' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-slate-900">Interactive Route Map View</h3>
                <p className="text-xs text-slate-500">Simulated multi-city transit route & coordinates</p>
              </div>
              <span className="text-xs font-bold bg-emerald-50 text-emerald-600 px-3 py-1 rounded-full border border-emerald-200">
                GPS Connected
              </span>
            </div>

            {/* Map Canvas Visualizer */}
            <div className="relative h-96 rounded-2xl bg-slate-900 overflow-hidden border border-slate-800 p-6 flex flex-col justify-between text-white">
              <div className="absolute inset-0 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>

              <div className="relative z-10 flex items-center justify-between">
                <span className="text-xs font-extrabold uppercase tracking-wider bg-slate-800 px-3 py-1 rounded-full text-brand-300">
                  Route Visualizer • {activeTrip.cities.length} Stops
                </span>
                <span className="text-xs text-slate-400">Scale: 1:500,000</span>
              </div>

              {/* Connected Route Line Simulation */}
              <div className="relative z-10 grid grid-cols-2 gap-8 my-auto max-w-xl mx-auto w-full text-center">
                {activeTrip.cities.map((city, idx) => (
                  <div key={city.id} className="relative bg-slate-800/90 backdrop-blur-md p-4 rounded-2xl border border-slate-700 shadow-card">
                    <span className="w-6 h-6 rounded-full bg-brand-500 text-white font-extrabold text-xs inline-flex items-center justify-center mb-2">
                      {idx + 1}
                    </span>
                    <h4 className="text-lg font-bold text-white">{city.name}</h4>
                    <p className="text-xs text-slate-400 mt-1">{city.daysCount} Days Stay</p>
                    <p className="text-[11px] text-brand-400 mt-0.5">{city.hotel}</p>
                  </div>
                ))}
              </div>

              <div className="relative z-10 flex items-center justify-between text-xs text-slate-400">
                <span>Shinkansen Bullet Train Transit: 2h 15m</span>
                <span className="flex items-center gap-1 text-emerald-400">
                  <Navigation className="w-3.5 h-3.5" /> Direct Connection Ready
                </span>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
