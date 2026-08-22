import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  MapPin, 
  Calendar, 
  DollarSign, 
  Sparkles, 
  Plus, 
  Trash2, 
  Compass, 
  CheckCircle2 
} from 'lucide-react';

export const CreateTripWizard = () => {
  const { createTrip, destinations, activitiesCatalog, formatCurrency } = useTripContext();
  
  const [step, setStep] = useState(1);

  // Form State
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [startDate, setStartDate] = useState('2026-11-01');
  const [endDate, setEndDate] = useState('2026-11-10');
  const [totalBudget, setTotalBudget] = useState(3000);
  const [coverImage, setCoverImage] = useState(
    'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1200&q=80'
  );

  const [selectedCities, setSelectedCities] = useState([
    { id: 'dest-tokyo', name: 'Tokyo', daysCount: 5, order: 1, hotel: 'Shibuya Boutique Hotel' },
    { id: 'dest-kyoto', name: 'Kyoto', daysCount: 5, order: 2, hotel: 'Traditional Ryokan Gion' }
  ]);

  const [selectedActivityIds, setSelectedActivityIds] = useState([
    'act-tokyo-1', 'act-tokyo-2', 'act-kyoto-1'
  ]);

  // Step 2 handlers: Add/Remove city
  const handleAddCity = (dest) => {
    if (selectedCities.some((c) => c.id === dest.id)) return;
    setSelectedCities((prev) => [
      ...prev,
      {
        id: dest.id,
        name: dest.name,
        daysCount: 4,
        order: prev.length + 1,
        hotel: `${dest.name} Central Hotel`
      }
    ]);
  };

  const handleRemoveCity = (destId) => {
    if (selectedCities.length <= 1) return;
    setSelectedCities((prev) => prev.filter((c) => c.id !== destId));
  };

  const handleCityDaysChange = (destId, newDays) => {
    setSelectedCities((prev) =>
      prev.map((c) => (c.id === destId ? { ...c, daysCount: Math.max(1, Number(newDays)) } : c))
    );
  };

  // Activity toggle handler
  const handleToggleActivity = (actId) => {
    setSelectedActivityIds((prev) =>
      prev.includes(actId) ? prev.filter((id) => id !== actId) : [...prev, actId]
    );
  };

  const handleFinalSubmit = () => {
    // Generate initial itinerary days based on selected cities & activities
    let currentDay = 1;
    const initialItinerary = [];

    selectedCities.forEach((city) => {
      for (let i = 0; i < city.daysCount; i++) {
        const cityActs = activitiesCatalog.filter(
          (a) => a.cityName === city.name && selectedActivityIds.includes(a.id)
        );

        initialItinerary.push({
          dayNumber: currentDay,
          date: `2026-11-${String(currentDay).padStart(2, '0')}`,
          city: city.name,
          title: `Exploring ${city.name} - Day ${i + 1}`,
          activities: cityActs.slice(i, i + 2).map((act, actIdx) => ({
            id: `act-wizard-${Date.now()}-${currentDay}-${actIdx}`,
            time: act.recommendedTimeSlot ? act.recommendedTimeSlot.split(' - ')[0] : '10:00',
            title: act.title,
            category: act.category,
            cost: act.cost,
            location: act.locationName,
            notes: act.description
          }))
        });
        currentDay++;
      }
    });

    createTrip({
      title: title || `${selectedCities.map((c) => c.name).join(' & ')} Trip`,
      subtitle: subtitle || `Multi-city travel featuring ${selectedCities.length} destinations`,
      startDate,
      endDate,
      totalDays: selectedCities.reduce((acc, c) => acc + c.daysCount, 0),
      totalBudget: Number(totalBudget),
      coverImage,
      cities: selectedCities,
      itinerary: initialItinerary
    });
  };

  const stepsList = [
    { num: 1, name: 'Basic Info' },
    { num: 2, name: 'Destinations' },
    { num: 3, name: 'Activities' },
    { num: 4, name: 'Budget' },
    { num: 5, name: 'Review & Launch' }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      
      {/* Wizard Title Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 border border-brand-200 px-3 py-1 rounded-full">
          Step {step} of 5
        </span>
        <h1 className="text-3xl font-extrabold text-slate-900">Create a New Multi-City Trip</h1>
        <p className="text-sm text-slate-500 max-w-md mx-auto">
          Follow our 5-step smart wizard to build your dream itinerary in minutes.
        </p>
      </div>

      {/* Step Progress Bar */}
      <div className="bg-white rounded-2xl p-4 border border-slate-200/80 shadow-soft">
        <div className="flex items-center justify-between">
          {stepsList.map((s, idx) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center gap-1.5 cursor-pointer" onClick={() => s.num < step && setStep(s.num)}>
                <div
                  className={`w-9 h-9 rounded-xl font-extrabold text-sm flex items-center justify-center transition-all ${
                    s.num === step
                      ? 'bg-brand-600 text-white shadow-glow scale-105'
                      : s.num < step
                      ? 'bg-emerald-500 text-white'
                      : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {s.num < step ? <Check className="w-5 h-5" /> : s.num}
                </div>
                <span className={`text-[11px] font-semibold hidden sm:block ${s.num === step ? 'text-brand-600' : 'text-slate-500'}`}>
                  {s.name}
                </span>
              </div>

              {idx < stepsList.length - 1 && (
                <div className={`flex-1 h-1 rounded-full mx-2 ${s.num < step ? 'bg-emerald-500' : 'bg-slate-100'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* STEP CONTENT CONTAINER */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft">
        
        {/* STEP 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Step 1: Trip Details & Dates</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Trip Title</label>
                <input
                  type="text"
                  placeholder="e.g. Grand Japan Odyssey"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Subtitle / Vision</label>
                <input
                  type="text"
                  placeholder="e.g. Modern metropolis & ancient zen sanctuaries"
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-500 mb-1">End Date</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Destinations */}
        {step === 2 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Step 2: Add Destination Cities</h3>
            
            {/* Active Selected Cities List */}
            <div className="space-y-3">
              <label className="block text-xs font-bold uppercase text-slate-500">Selected Route ({selectedCities.length} Cities)</label>
              {selectedCities.map((city, idx) => (
                <div key={city.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center">
                      #{idx + 1}
                    </span>
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{city.name}</h4>
                      <p className="text-xs text-slate-500">{city.hotel}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <span className="text-xs text-slate-500 font-medium">Days:</span>
                      <input
                        type="number"
                        min="1"
                        max="30"
                        value={city.daysCount}
                        onChange={(e) => handleCityDaysChange(city.id, e.target.value)}
                        className="w-16 px-2 py-1 bg-white border border-slate-200 rounded-lg text-xs font-bold text-center"
                      />
                    </div>
                    {selectedCities.length > 1 && (
                      <button
                        onClick={() => handleRemoveCity(city.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Catalog Add Options */}
            <div className="pt-4 space-y-2">
              <label className="block text-xs font-bold uppercase text-slate-500">Pick From Destinations Catalog</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {destinations.map((d) => {
                  const isAdded = selectedCities.some((c) => c.id === d.id);
                  return (
                    <button
                      key={d.id}
                      disabled={isAdded}
                      onClick={() => handleAddCity(d)}
                      className={`p-3 rounded-xl border text-left flex items-center justify-between text-xs font-bold transition-all ${
                        isAdded
                          ? 'bg-slate-100 border-slate-200 text-slate-400 cursor-not-allowed'
                          : 'bg-white hover:bg-brand-50 border-slate-200 hover:border-brand-300 text-slate-800'
                      }`}
                    >
                      <span>{d.name}</span>
                      {isAdded ? <Check className="w-4 h-4 text-emerald-500" /> : <Plus className="w-4 h-4 text-brand-600" />}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Activities */}
        {step === 3 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Step 3: Select Featured Activities</h3>
            
            <p className="text-xs text-slate-500">
              Select key experiences to automatically seed into your day-by-day itinerary.
            </p>

            <div className="space-y-3">
              {activitiesCatalog.map((act) => {
                const isSelected = selectedActivityIds.includes(act.id);
                return (
                  <div
                    key={act.id}
                    onClick={() => handleToggleActivity(act.id)}
                    className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-brand-50/70 border-brand-300 shadow-sm'
                        : 'bg-white border-slate-200/80 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <img src={act.image} alt={act.title} className="w-12 h-12 rounded-xl object-cover" />
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-white px-2 py-0.5 rounded border border-brand-200">
                          {act.cityName} • {act.category}
                        </span>
                        <h4 className="font-bold text-slate-900 text-sm mt-0.5">{act.title}</h4>
                        <p className="text-xs text-slate-500">{act.durationHours} hrs • {formatCurrency(act.cost)}</p>
                      </div>
                    </div>

                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center ${
                      isSelected ? 'bg-brand-600 border-brand-600 text-white' : 'border-slate-300'
                    }`}>
                      {isSelected && <Check className="w-4 h-4" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* STEP 4: Budget */}
        {step === 4 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Step 4: Set Target Budget</h3>
            
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Total Target Trip Budget</label>
              <div className="relative">
                <span className="absolute left-4 top-3 text-slate-400 font-extrabold">$</span>
                <input
                  type="number"
                  step="100"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(e.target.value)}
                  className="w-full pl-8 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-extrabold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Estimated Allocation Preview */}
            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/60 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">Automated Smart Category Breakdown</h4>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-medium">Accommodation (45%)</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">{formatCurrency(totalBudget * 0.45)}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-medium">Flights & Transit (30%)</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">{formatCurrency(totalBudget * 0.30)}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-medium">Food & Dining (15%)</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">{formatCurrency(totalBudget * 0.15)}</p>
                </div>
                <div className="p-3 bg-white rounded-xl border border-slate-200">
                  <span className="text-slate-500 font-medium">Activities (10%)</span>
                  <p className="text-sm font-bold text-slate-900 mt-1">{formatCurrency(totalBudget * 0.10)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Review & Launch */}
        {step === 5 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Step 5: Review & Launch Trip</h3>
            
            <div className="p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-brand-950 text-white space-y-4 shadow-card">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Ready to Launch</span>
                <h2 className="text-2xl font-extrabold text-white mt-1">{title || "New Multi-City Trip"}</h2>
                <p className="text-xs text-slate-300 mt-0.5">{startDate} to {endDate}</p>
              </div>

              <div className="pt-4 border-t border-slate-800 grid grid-cols-3 gap-4 text-center">
                <div>
                  <span className="text-xs text-slate-400 font-medium">Route</span>
                  <p className="text-sm font-bold text-white mt-0.5">{selectedCities.length} Cities</p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium">Total Days</span>
                  <p className="text-sm font-bold text-white mt-0.5">
                    {selectedCities.reduce((acc, c) => acc + c.daysCount, 0)} Days
                  </p>
                </div>
                <div>
                  <span className="text-xs text-slate-400 font-medium">Budget</span>
                  <p className="text-sm font-bold text-amber-400 mt-0.5">{formatCurrency(totalBudget)}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CONTROLS FOOTER */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100 mt-6">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="flex items-center gap-1 text-sm font-bold text-slate-600 hover:text-slate-900 px-4 py-2 rounded-xl"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous
            </button>
          ) : (
            <div></div>
          )}

          {step < 5 ? (
            <button
              onClick={() => setStep(step + 1)}
              className="flex items-center gap-1.5 bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-6 py-2.5 rounded-xl shadow-sm transition-colors"
            >
              Next Step
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={handleFinalSubmit}
              className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-extrabold text-sm px-8 py-3 rounded-xl shadow-glow transition-transform hover:scale-105"
            >
              <Sparkles className="w-4 h-4 text-amber-300" />
              Launch Itinerary Builder Now
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
