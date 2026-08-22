import React from 'react';
import { useTripContext } from '../../context/TripContext';
import { Calendar as CalendarIcon, Clock, MapPin, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

export const CalendarView = () => {
  const { activeTrip, formatCurrency } = useTripContext();

  if (!activeTrip) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <p className="text-sm font-semibold text-slate-500">No active trip selected.</p>
      </div>
    );
  }

  const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 bg-indigo-50 border border-indigo-200 px-3 py-1 rounded-full">
            Timeline Calendar Schedule
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900 mt-2">October 2026 Schedule</h1>
          <p className="text-sm text-slate-500 mt-0.5">{activeTrip.title} • {activeTrip.totalDays} Days</p>
        </div>

        <div className="flex items-center gap-2">
          <button className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs font-bold text-slate-800 px-3">October 2026</span>
          <button className="p-2 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Calendar Grid Visualizer */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-4">
        <div className="grid grid-cols-7 gap-2 text-center pb-2 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase">
          {daysOfWeek.map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-2">
          {/* Simulated month calendar cells */}
          {Array.from({ length: 31 }, (_, i) => i + 1).map((dayNum) => {
            const isTripDay = dayNum >= 10 && dayNum <= 20;
            const tripDayIndex = dayNum - 9;
            const dayData = isTripDay ? activeTrip.itinerary.find((d) => d.dayNumber === tripDayIndex) : null;

            return (
              <div
                key={dayNum}
                className={`min-h-[90px] p-2.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                  isTripDay
                    ? 'bg-brand-50/80 border-brand-300 shadow-xs'
                    : 'bg-slate-50/50 border-slate-100 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className={isTripDay ? 'text-brand-700 font-extrabold' : 'text-slate-500'}>
                    Oct {dayNum}
                  </span>
                  {isTripDay && (
                    <span className="text-[10px] bg-brand-600 text-white px-1.5 py-0.5 rounded font-extrabold">
                      D{tripDayIndex}
                    </span>
                  )}
                </div>

                {isTripDay && dayData && (
                  <div className="space-y-1 mt-1">
                    <span className="text-[10px] font-bold text-slate-900 block truncate">
                      📍 {dayData.city}
                    </span>
                    <span className="text-[9px] text-brand-600 block font-semibold truncate">
                      {dayData.activities.length} Activities
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};
