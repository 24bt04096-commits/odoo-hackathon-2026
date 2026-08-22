import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  Plus, 
  Trash2, 
  MapPin, 
  Clock, 
  DollarSign, 
  ChevronRight, 
  ArrowUp, 
  ArrowDown, 
  Sparkles, 
  Eye, 
  Calendar, 
  X,
  Share2
} from 'lucide-react';

export const ItineraryBuilder = () => {
  const { activeTrip, removeActivityFromTrip, addActivityToTrip, setCurrentScreen, formatCurrency } = useTripContext();

  const [selectedDayNumber, setSelectedDayNumber] = useState(1);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // Modal Form State
  const [actTitle, setActTitle] = useState('');
  const [actCategory, setActCategory] = useState('Sightseeing');
  const [actTime, setActTime] = useState('11:00');
  const [actCost, setActCost] = useState('25');
  const [actLocation, setActLocation] = useState('City Spot');
  const [actNotes, setActNotes] = useState('');

  if (!activeTrip) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold">No Active Trip Selected</h2>
          <button
            onClick={() => setCurrentScreen('create-trip')}
            className="px-4 py-2 bg-brand-600 text-white font-bold rounded-xl"
          >
            Create New Trip
          </button>
        </div>
      </div>
    );
  }

  // Active day object
  const activeDay = activeTrip.itinerary.find((d) => d.dayNumber === selectedDayNumber) || {
    dayNumber: selectedDayNumber,
    date: activeTrip.startDate,
    city: activeTrip.cities[0]?.name || "Destination",
    title: `Day ${selectedDayNumber}`,
    activities: []
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    addActivityToTrip(activeTrip.id, selectedDayNumber, {
      title: actTitle || "New Activity Spot",
      category: actCategory,
      time: actTime,
      cost: Number(actCost),
      locationName: actLocation,
      notes: actNotes
    });
    setActTitle('');
    setActNotes('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
      
      {/* Trip Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
              Interactive Builder
            </span>
            <span className="text-xs text-slate-500">{activeTrip.startDate} - {activeTrip.endDate} ({activeTrip.totalDays} Days)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">{activeTrip.title}</h1>
          <p className="text-xs text-slate-500">
            Route: {activeTrip.cities.map((c) => `${c.name} (${c.daysCount}d)`).join(' → ')}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentScreen('itinerary-view')}
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-3 rounded-xl transition-colors"
          >
            <Eye className="w-4 h-4 text-brand-300" />
            Presentation View
          </button>

          <button
            onClick={() => setCurrentScreen('public-share')}
            className="flex items-center gap-2 bg-brand-50 hover:bg-brand-100 text-brand-700 font-bold text-xs px-4 py-3 rounded-xl transition-colors border border-brand-200"
          >
            <Share2 className="w-4 h-4" />
            Share Trip
          </button>
        </div>
      </div>

      {/* 2-COLUMN BUILDER WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT PANEL: Day Selector Timeline (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-white rounded-3xl p-5 border border-slate-200/80 shadow-soft space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold uppercase tracking-wider text-slate-900">Trip Days</h3>
              <span className="text-xs text-slate-500 font-medium">{activeTrip.totalDays} Days Total</span>
            </div>

            <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
              {Array.from({ length: activeTrip.totalDays }, (_, i) => i + 1).map((dayNum) => {
                const dayData = activeTrip.itinerary.find((d) => d.dayNumber === dayNum);
                const isSelected = selectedDayNumber === dayNum;
                const actCount = dayData ? dayData.activities.length : 0;

                return (
                  <button
                    key={dayNum}
                    onClick={() => setSelectedDayNumber(dayNum)}
                    className={`w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      isSelected
                        ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                        : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-7 h-7 rounded-lg text-xs font-black flex items-center justify-center ${
                        isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-700'
                      }`}>
                        D{dayNum}
                      </div>
                      <div>
                        <h4 className="text-xs font-bold">{dayData ? dayData.title : `Day ${dayNum}`}</h4>
                        <p className={`text-[11px] ${isSelected ? 'text-brand-100' : 'text-slate-500'}`}>
                          {dayData ? dayData.city : 'Destination'}
                        </p>
                      </div>
                    </div>

                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isSelected ? 'bg-white/20 text-white' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {actCount} spots
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT PANEL: Day Timeline Activities (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
            
            {/* Day Title & Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-200">
                  Day {selectedDayNumber} • {activeDay.city}
                </span>
                <h2 className="text-xl font-bold text-slate-900 mt-1">{activeDay.title}</h2>
              </div>

              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add Activity
              </button>
            </div>

            {/* Activities List */}
            {activeDay.activities.length === 0 ? (
              <div className="p-8 text-center border-2 border-dashed border-slate-200 rounded-2xl space-y-3">
                <p className="text-sm font-semibold text-slate-600">No activities planned for Day {selectedDayNumber} yet.</p>
                <button
                  onClick={() => setIsAddModalOpen(true)}
                  className="text-xs font-bold text-brand-600 underline"
                >
                  + Add your first activity spot
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {activeDay.activities.map((act, idx) => (
                  <div
                    key={act.id}
                    className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start justify-between gap-4 group hover:bg-white hover:shadow-card transition-all"
                  >
                    <div className="flex items-start gap-4">
                      <div className="text-center shrink-0">
                        <span className="text-xs font-extrabold text-brand-600 block">{act.time}</span>
                        <div className="w-0.5 h-10 bg-brand-200 mx-auto mt-1 rounded-full"></div>
                      </div>

                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
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
                          <MapPin className="w-3 h-3 text-slate-400" /> {act.location}
                        </p>
                        {act.notes && (
                          <p className="text-xs text-slate-600 bg-white p-2 rounded-lg border border-slate-100 mt-2 italic">
                            "{act.notes}"
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={() => removeActivityFromTrip(activeTrip.id, selectedDayNumber, act.id)}
                      className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors opacity-70 group-hover:opacity-100"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>

      </div>

      {/* ADD ACTIVITY MODAL DIALOG */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-card border border-slate-200 space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-lg font-bold text-slate-900">Add Spot to Day {selectedDayNumber}</h3>
              <button onClick={() => setIsAddModalOpen(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Activity Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Shibuya Sky Sunset Deck"
                  value={actTitle}
                  onChange={(e) => setActTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Time Slot</label>
                  <input
                    type="text"
                    placeholder="17:00"
                    value={actTime}
                    onChange={(e) => setActTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Estimated Cost ($)</label>
                  <input
                    type="number"
                    placeholder="20"
                    value={actCost}
                    onChange={(e) => setActCost(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Category</label>
                <select
                  value={actCategory}
                  onChange={(e) => setActCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                >
                  <option value="Sightseeing">Sightseeing</option>
                  <option value="Food & Drink">Food & Drink</option>
                  <option value="Culture">Culture</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Transport">Transport</option>
                  <option value="Stay">Stay / Hotel</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Location / Landmark</label>
                <input
                  type="text"
                  placeholder="e.g. Shibuya Scramble Square"
                  value={actLocation}
                  onChange={(e) => setActLocation(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Notes / Reminders</label>
                <textarea
                  placeholder="e.g. Booked online tickets for 17:15 slot"
                  value={actNotes}
                  onChange={(e) => setActNotes(e.target.value)}
                  rows="2"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-100 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-xs rounded-xl shadow-sm"
                >
                  Save Activity
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
