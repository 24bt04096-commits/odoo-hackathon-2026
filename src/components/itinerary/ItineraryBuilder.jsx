import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  Plus, 
  Trash2, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  ChevronRight, 
  Eye, 
  ArrowUp,
  ArrowDown,
  X,
  Save,
  Check,
  Building,
  Layers
} from 'lucide-react';

export const ItineraryBuilder = () => {
  const { activeTrip, updateTrip, destinations, activitiesCatalog, setCurrentScreen, formatCurrency, addToast } = useTripContext();

  // Initial Stops state initialized from activeTrip.cities or default fallback stops
  const [stops, setStops] = useState(() => {
    if (activeTrip && activeTrip.cities && activeTrip.cities.length > 0) {
      return activeTrip.cities.map((c, idx) => ({
        id: c.id || `stop-${idx + 1}`,
        cityName: c.name || 'Paris',
        startDate: activeTrip.startDate || '2026-11-01',
        endDate: activeTrip.endDate || '2026-11-05',
        budget: 800,
        notes: `Exploring ${c.name || 'Paris'} sights and local highlights.`,
        activities: [
          { id: `act-${idx}-1`, title: `${c.name || 'City'} Guided Landmark Walking Tour`, category: 'Sightseeing', cost: 45, time: '10:00' },
          { id: `act-${idx}-2`, title: `Local Culinary & Gastronomy Tasting`, category: 'Food & Dining', cost: 35, time: '13:30' }
        ]
      }));
    }

    return [
      {
        id: 'stop-1',
        cityName: 'Paris',
        startDate: '2026-11-01',
        endDate: '2026-11-05',
        budget: 950,
        notes: 'Arrival in Paris, Louvre Museum tour, and Eiffel Tower dinner.',
        activities: [
          { id: 'act-p1', title: 'Eiffel Tower Summit & Champagne Tasting', category: 'Sightseeing', cost: 50, time: '10:00' },
          { id: 'act-p2', title: 'Louvre Guided Masterpieces Tour', category: 'Culture', cost: 35, time: '14:30' }
        ]
      },
      {
        id: 'stop-2',
        cityName: 'Tokyo',
        startDate: '2026-11-06',
        endDate: '2026-11-10',
        budget: 1100,
        notes: 'Bullet train to Tokyo, Senso-ji temple visit, and Shibuya food tour.',
        activities: [
          { id: 'act-t1', title: 'Asakusa Senso-ji Temple & Street Food', category: 'Culture', cost: 25, time: '09:30' },
          { id: 'act-t2', title: 'Shibuya Crossing & Robot Restaurant Show', category: 'Entertainment', cost: 65, time: '18:00' }
        ]
      }
    ];
  });

  // State for Activity Assignment Modal
  const [activeAssignStopId, setActiveAssignStopId] = useState(null);
  const [customActTitle, setCustomActTitle] = useState('');
  const [customActCategory, setCustomActCategory] = useState('Sightseeing');
  const [customActCost, setCustomActCost] = useState(40);
  const [customActTime, setCustomActTime] = useState('11:00');

  // Key Function 1: "Add Stop"
  const handleAddStop = () => {
    const nextCity = destinations[stops.length % destinations.length]?.name || 'Rome';
    const newStop = {
      id: `stop-${Date.now()}`,
      cityName: nextCity,
      startDate: '2026-11-11',
      endDate: '2026-11-15',
      budget: 650,
      notes: `Custom stop for exploring ${nextCity}.`,
      activities: [
        { id: `act-${Date.now()}-1`, title: `${nextCity} Historic Center Discovery`, category: 'Sightseeing', cost: 30, time: '10:00' }
      ]
    };
    setStops([...stops, newStop]);
    if (addToast) addToast(`Added new stop for ${nextCity}!`, 'success');
  };

  // Remove Stop
  const handleRemoveStop = (stopId) => {
    if (stops.length <= 1) return;
    setStops(stops.filter(s => s.id !== stopId));
  };

  // Update Stop Fields
  const handleUpdateStop = (stopId, field, value) => {
    setStops(stops.map(s => s.id === stopId ? { ...s, [field]: value } : s));
  };

  // Key Function 4: "Reorder Cities" (Move Up / Move Down)
  const handleMoveStopUp = (index) => {
    if (index === 0) return;
    const updated = [...stops];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setStops(updated);
  };

  const handleMoveStopDown = (index) => {
    if (index === stops.length - 1) return;
    const updated = [...stops];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setStops(updated);
  };

  // Key Function 3: "Assign Activities to Each Stop"
  const handleAssignCatalogActivity = (stopId, actItem) => {
    setStops(stops.map(s => {
      if (s.id !== stopId) return s;
      const newAct = {
        id: `act-assign-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
        title: actItem.title,
        category: actItem.category || 'Sightseeing',
        cost: actItem.cost || actItem.price || 35,
        time: '12:00'
      };
      return { ...s, activities: [...s.activities, newAct] };
    }));
    setActiveAssignStopId(null);
    if (addToast) addToast(`Assigned "${actItem.title}" to stop!`, 'success');
  };

  const handleAddCustomActivity = (e) => {
    e.preventDefault();
    if (!activeAssignStopId || !customActTitle.trim()) return;

    setStops(stops.map(s => {
      if (s.id !== activeAssignStopId) return s;
      const newAct = {
        id: `act-custom-${Date.now()}`,
        title: customActTitle,
        category: customActCategory,
        cost: Number(customActCost) || 0,
        time: customActTime
      };
      return { ...s, activities: [...s.activities, newAct] };
    }));

    setCustomActTitle('');
    setActiveAssignStopId(null);
    if (addToast) addToast(`Added "${customActTitle}" to stop!`, 'success');
  };

  const handleRemoveActivityFromStop = (stopId, actId) => {
    setStops(stops.map(s => {
      if (s.id !== stopId) return s;
      return { ...s, activities: s.activities.filter(a => a.id !== actId) };
    }));
  };

  // Save changes to active trip
  const handleSaveItinerary = () => {
    if (!activeTrip) return;
    const updatedCities = stops.map((s, idx) => ({
      id: `dest-${s.cityName.toLowerCase()}`,
      name: s.cityName,
      daysCount: 4,
      order: idx + 1,
      hotel: `${s.cityName} City Hotel`
    }));

    updateTrip(activeTrip.id, {
      cities: updatedCities
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 border border-brand-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Itinerary Builder Screen (Screen 5)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {activeTrip ? activeTrip.title : 'Itinerary Builder'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Add city stops, select travel dates, assign activities to each stop, and reorder cities to construct your day-wise plan.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleSaveItinerary}
            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs px-4 py-2.5 rounded-xl shadow-glow transition-all"
          >
            <Save className="w-4 h-4" />
            <span>Save Plan</span>
          </button>

          <button
            onClick={() => setCurrentScreen('itinerary-view')}
            className="flex items-center gap-1.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs px-4 py-2.5 rounded-xl transition-colors shadow-sm"
          >
            <Eye className="w-4 h-4 text-brand-300" />
            <span>View Summary</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* CITY STOPS STACK WITH REORDER & ACTIVITY ASSIGNMENT       */}
      {/* ========================================================= */}
      <div className="space-y-6">
        
        {stops.map((stop, idx) => (
          <div 
            key={stop.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft hover:shadow-card transition-all space-y-6 group relative"
          >
            
            {/* Stop Header Row with Reorder Controls */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              
              {/* Stop Badge & City Name Selector */}
              <div className="flex items-center gap-3 flex-1">
                <span className="w-9 h-9 rounded-2xl bg-brand-600 text-white font-black text-xs flex items-center justify-center shadow-glow shrink-0">
                  #{idx + 1}
                </span>

                {/* City Selector */}
                <div className="relative flex-1 max-w-xs">
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-0.5">
                    Select City Stop:
                  </label>
                  <select
                    value={stop.cityName}
                    onChange={(e) => handleUpdateStop(stop.id, 'cityName', e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-extrabold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
                  >
                    {destinations.map((d) => (
                      <option key={d.id} value={d.name}>
                        📍 {d.name}, {d.country}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Action Buttons: Reorder Cities (Up/Down) & Delete Stop */}
              <div className="flex items-center gap-1.5 shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mr-1 hidden sm:inline">
                  Reorder:
                </span>
                
                {/* Move Up */}
                <button
                  type="button"
                  disabled={idx === 0}
                  onClick={() => handleMoveStopUp(idx)}
                  className={`p-2 rounded-xl border transition-colors ${
                    idx === 0
                      ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                      : 'bg-slate-100 hover:bg-brand-50 hover:text-brand-600 border-slate-200 text-slate-700'
                  }`}
                  title="Move Stop Up"
                >
                  <ArrowUp className="w-4 h-4" />
                </button>

                {/* Move Down */}
                <button
                  type="button"
                  disabled={idx === stops.length - 1}
                  onClick={() => handleMoveStopDown(idx)}
                  className={`p-2 rounded-xl border transition-colors ${
                    idx === stops.length - 1
                      ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                      : 'bg-slate-100 hover:bg-brand-50 hover:text-brand-600 border-slate-200 text-slate-700'
                  }`}
                  title="Move Stop Down"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                {/* Remove Stop */}
                {stops.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveStop(stop.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors ml-2"
                    title="Remove Stop"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>

            {/* Travel Dates & Allocated Budget Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Select Travel Dates for this Stop */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-600" />
                  Select Travel Dates for Stop:
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={stop.startDate}
                    onChange={(e) => handleUpdateStop(stop.id, 'startDate', e.target.value)}
                    className="w-1/2 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                  <span className="text-xs text-slate-400 font-bold">to</span>
                  <input
                    type="date"
                    value={stop.endDate}
                    onChange={(e) => handleUpdateStop(stop.id, 'endDate', e.target.value)}
                    className="w-1/2 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Stop Budget */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  Allocated Budget for Stop: {formatCurrency(stop.budget)}
                </span>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-400 text-xs font-extrabold">$</span>
                  <input
                    type="number"
                    step="50"
                    value={stop.budget}
                    onChange={(e) => handleUpdateStop(stop.id, 'budget', Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-extrabold text-slate-900"
                  />
                </div>
              </div>

            </div>

            {/* Stop Notes / Description */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Stop Notes & Description:
              </label>
              <textarea
                rows="2"
                value={stop.notes}
                onChange={(e) => handleUpdateStop(stop.id, 'notes', e.target.value)}
                placeholder="Notes for hotel booking, transportation details, or highlights for this stop..."
                className="w-full px-4 py-2.5 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs font-medium text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
              ></textarea>
            </div>

            {/* Key Function 3: Assigned Activities Section */}
            <div className="space-y-3 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Assigned Activities ({stop.activities ? stop.activities.length : 0}):
                </span>
                
                <button
                  type="button"
                  onClick={() => setActiveAssignStopId(stop.id)}
                  className="px-3 py-1.5 bg-brand-50 hover:bg-brand-100 text-brand-700 border border-brand-200 font-extrabold text-xs rounded-xl transition-all flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Assign Activity to Stop</span>
                </button>
              </div>

              {/* List of assigned activities for this stop */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {stop.activities && stop.activities.length > 0 ? (
                  stop.activities.map((act) => (
                    <div 
                      key={act.id} 
                      className="bg-slate-50/90 border border-slate-200 rounded-2xl p-3 flex items-center justify-between gap-3 group/act"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-1.5 py-0.5 rounded border border-brand-200">
                            {act.time || '10:00'}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-500">
                            {act.category || 'Sightseeing'}
                          </span>
                        </div>
                        <h5 className="text-xs font-bold text-slate-900 truncate">{act.title}</h5>
                        <p className="text-[11px] font-extrabold text-emerald-700">
                          {act.cost ? formatCurrency(act.cost) : 'Free'}
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleRemoveActivityFromStop(stop.id, act.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors shrink-0"
                        title="Remove Activity"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="col-span-full py-4 text-center border-2 border-dashed border-slate-200 rounded-2xl text-xs text-slate-400 font-medium">
                    No activities assigned to this stop yet. Click "+ Assign Activity to Stop" above!
                  </div>
                )}
              </div>
            </div>

          </div>
        ))}

      </div>

      {/* ========================================================= */}
      {/* KEY FUNCTION 1: Explicit "+ Add Stop" BUTTON               */}
      {/* ========================================================= */}
      <div className="pt-4 flex justify-center">
        <button
          type="button"
          onClick={handleAddStop}
          className="w-full sm:w-auto bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-brand-500 text-slate-900 hover:text-brand-600 font-black text-base px-10 py-4 rounded-2xl shadow-soft hover:shadow-card transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <Plus className="w-5 h-5 text-brand-600 stroke-[3]" />
          <span>+ Add Stop</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* ASSIGN ACTIVITY MODAL                                     */}
      {/* ========================================================= */}
      {activeAssignStopId && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-xl w-full border border-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in-95 duration-200">
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">Assign Activity to Stop</h3>
                <p className="text-xs text-slate-500">Pick from recommendations catalog or create a custom activity.</p>
              </div>
              <button
                onClick={() => setActiveAssignStopId(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Catalog Recommendations */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Recommended Activities:
              </h4>
              <div className="grid grid-cols-1 gap-2 max-h-48 overflow-y-auto pr-1">
                {activitiesCatalog.slice(0, 5).map((act) => (
                  <div
                    key={act.id}
                    className="p-3 bg-slate-50 hover:bg-brand-50 border border-slate-200 hover:border-brand-300 rounded-xl flex items-center justify-between gap-3 transition-colors group cursor-pointer"
                    onClick={() => handleAssignCatalogActivity(activeAssignStopId, act)}
                  >
                    <div className="space-y-0.5">
                      <h5 className="text-xs font-bold text-slate-900 group-hover:text-brand-600">{act.title}</h5>
                      <p className="text-[10px] text-slate-500">{act.category} • {formatCurrency(act.cost || act.price || 30)}</p>
                    </div>
                    <button
                      type="button"
                      className="px-3 py-1 bg-brand-600 text-white font-extrabold text-[11px] rounded-lg shadow-glow"
                    >
                      + Assign
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Custom Activity Form */}
            <div className="border-t border-slate-100 pt-4 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600">
                Or Add Custom Activity:
              </h4>
              
              <form onSubmit={handleAddCustomActivity} className="space-y-3">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                    Activity Title:
                  </label>
                  <input
                    type="text"
                    required
                    value={customActTitle}
                    onChange={(e) => setCustomActTitle(e.target.value)}
                    placeholder="e.g. Sunset Boat Cruise & Wine Tasting"
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                      Time:
                    </label>
                    <input
                      type="time"
                      value={customActTime}
                      onChange={(e) => setCustomActTime(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                      Category:
                    </label>
                    <select
                      value={customActCategory}
                      onChange={(e) => setCustomActCategory(e.target.value)}
                      className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                    >
                      <option value="Sightseeing">Sightseeing</option>
                      <option value="Food & Dining">Food & Dining</option>
                      <option value="Culture">Culture</option>
                      <option value="Adventure">Adventure</option>
                      <option value="Relaxation">Relaxation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold uppercase text-slate-500 mb-1">
                      Cost ($):
                    </label>
                    <input
                      type="number"
                      value={customActCost}
                      onChange={(e) => setCustomActCost(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                    />
                  </div>
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveAssignStopId(null)}
                    className="px-4 py-2 bg-slate-100 text-slate-700 font-bold text-xs rounded-xl"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-glow"
                  >
                    Add Custom Activity
                  </button>
                </div>
              </form>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
