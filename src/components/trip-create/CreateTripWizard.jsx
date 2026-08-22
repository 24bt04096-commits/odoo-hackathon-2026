import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  Plus, 
  Check, 
  MapPin, 
  Calendar, 
  Sparkles, 
  Compass, 
  Clock, 
  DollarSign, 
  Star,
  ChevronRight,
  Send,
  Building,
  CheckCircle2
} from 'lucide-react';

export const CreateTripWizard = () => {
  const { createTrip, destinations, activitiesCatalog, formatCurrency } = useTripContext();

  // Form State matching Screen 4 wireframe
  const [tripTitle, setTripTitle] = useState('My Multi-City Escapade');
  const [tripDescription, setTripDescription] = useState('A scenic multi-city getaway exploring historic landmarks, cultural spots, and local gastronomy.');
  const [selectedPlace, setSelectedPlace] = useState('dest-paris');
  const [startDate, setStartDate] = useState('2026-11-01');
  const [endDate, setEndDate] = useState('2026-11-10');
  const [coverImage, setCoverImage] = useState('https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=1200&q=80');
  const [addedSuggestions, setAddedSuggestions] = useState(['act-paris-1', 'act-tokyo-1']);

  // Preset cover photos gallery for quick selection
  const presetCovers = [
    { label: 'Paris Eiffel', url: 'https://images.unsplash.com/photo-1499856871958-5b9627545d1a?auto=format&fit=crop&w=600&q=80' },
    { label: 'Tokyo Skyline', url: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80' },
    { label: 'Rome Colosseum', url: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=600&q=80' },
    { label: 'Swiss Alps', url: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80' },
    { label: 'Tropical Beach', url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80' },
  ];

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setCoverImage(imageUrl);
    }
  };

  const toggleSuggestion = (id) => {
    setAddedSuggestions((prev) => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleCreateTrip = (e) => {
    e.preventDefault();

    const selectedDest = destinations.find(d => d.id === selectedPlace) || destinations[0];

    const initialCities = [
      {
        id: selectedDest.id,
        name: selectedDest.name,
        daysCount: 5,
        order: 1,
        hotel: `${selectedDest.name} Grand Hotel`
      }
    ];

    const selectedActs = suggestedPlacesAndActivities.filter(a => addedSuggestions.includes(a.id));

    const initialItinerary = [
      {
        dayNumber: 1,
        date: startDate,
        city: selectedDest.name,
        title: `Welcome to ${selectedDest.name}`,
        activities: selectedActs.slice(0, 2).map((act, idx) => ({
          id: `act-init-${idx}`,
          time: idx === 0 ? '10:00' : '14:30',
          title: act.title,
          category: act.category,
          cost: act.cost,
          location: selectedDest.name,
          notes: 'Added from suggestions catalog'
        }))
      }
    ];

    createTrip({
      title: tripTitle || `Trip to ${selectedDest.name}`,
      subtitle: tripDescription || `Exploring ${selectedDest.name} and surrounding highlights`,
      startDate,
      endDate,
      totalDays: 5,
      totalBudget: 2500,
      coverImage: coverImage || selectedDest.heroImage,
      cities: initialCities,
      itinerary: initialItinerary
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 font-sans">
      
      {/* Screen Title Header */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 border border-brand-200 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          Create a new Trip (Screen 4)
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Create a new Trip</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Specify your trip title, travel dates, trip description, cover image, and select suggested places to visit.
        </p>
      </div>

      {/* ========================================================= */}
      {/* 1. PLAN A NEW TRIP FORM SECTION                          */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
        
        <div className="border-b border-slate-100 pb-4">
          <h2 className="text-xl font-extrabold text-slate-900">Plan a new trip</h2>
          <p className="text-xs text-slate-500 mt-0.5">Enter core travel details to generate your customized itinerary.</p>
        </div>

        <form onSubmit={handleCreateTrip} className="space-y-5">
          
          {/* Trip Title */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Trip Title:
            </label>
            <input
              type="text"
              required
              value={tripTitle}
              onChange={(e) => setTripTitle(e.target.value)}
              placeholder="e.g. European Summer Escapade"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
            />
          </div>

          {/* Trip Description */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Trip Description:
            </label>
            <textarea
              rows={3}
              value={tripDescription}
              onChange={(e) => setTripDescription(e.target.value)}
              placeholder="Provide a short description or travel goals for this trip..."
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all resize-none"
            />
          </div>

          {/* Select a Place : */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
              Select a Place / Destination:
            </label>
            <div className="relative">
              <select
                value={selectedPlace}
                onChange={(e) => setSelectedPlace(e.target.value)}
                className="w-full appearance-none px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all cursor-pointer"
              >
                {destinations.map((d) => (
                  <option key={d.id} value={d.id}>
                    📍 {d.name}, {d.country} (Avg. {formatCurrency(d.avgDailyCost)}/day)
                  </option>
                ))}
              </select>
              <MapPin className="w-4 h-4 text-slate-400 absolute right-4 top-3.5 pointer-events-none" />
            </div>
          </div>

          {/* Start Date & End Date Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Start Date: */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                Start Date:
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
                />
              </div>
            </div>

            {/* End Date: */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1.5">
                End Date:
              </label>
              <div className="relative">
                <input
                  type="date"
                  required
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
                />
              </div>
            </div>

          </div>

          {/* Cover Photo Upload / Selection (Optional) */}
          <div className="space-y-3 pt-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">
              Cover Photo (Optional):
            </label>
            
            {/* Preview Banner */}
            <div className="relative h-36 rounded-2xl overflow-hidden border border-slate-200 group">
              <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center text-white text-xs font-bold gap-2">
                <span>Selected Cover Preview</span>
              </div>
            </div>

            {/* Preset Image Options */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <span className="text-xs font-bold text-slate-400 mr-1">Preset Options:</span>
              {presetCovers.map((preset, idx) => (
                <button
                  type="button"
                  key={idx}
                  onClick={() => setCoverImage(preset.url)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-xl border transition-all ${
                    coverImage === preset.url
                      ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                      : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {/* Upload File / Custom Image URL Input */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <label className="w-full sm:w-auto bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold px-4 py-2.5 rounded-xl border border-slate-300 cursor-pointer text-center transition-colors">
                📁 Upload Custom Image File
                <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
              </label>
              <span className="text-xs font-semibold text-slate-400">or</span>
              <input
                type="url"
                value={coverImage}
                onChange={(e) => setCoverImage(e.target.value)}
                placeholder="Paste Image URL..."
                className="w-full flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
              />
            </div>
          </div>

          {/* Form Submit Button */}
          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="w-full sm:w-auto bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-700 hover:to-brand-600 text-white font-extrabold text-sm px-8 py-3.5 rounded-xl shadow-glow transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Create Trip & Launch Builder</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </form>

      </div>

      {/* ========================================================= */}
      {/* 2. SUGGESTIONS FOR PLACES / ACTIVITIES GRID              */}
      {/* ========================================================= */}
      <div className="space-y-6">
        
        {/* Section Header with Horizontal Line */}
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-extrabold tracking-tight text-slate-900 whitespace-nowrap">
            Suggestion for Places to Visit/Activites to preform
          </h2>
          <div className="h-px bg-slate-200 flex-1"></div>
        </div>

        {/* 6 Grid Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {suggestedPlacesAndActivities.map((item) => {
            const isAdded = addedSuggestions.includes(item.id);
            return (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between group"
              >
                <div>
                  {/* Card Cover Image */}
                  <div className="relative h-44 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-slate-900/80 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full flex items-center gap-1">
                      <span>📍 {item.cityName}</span>
                    </div>
                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md text-slate-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{item.rating}</span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 space-y-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                      {item.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-semibold">
                      Estimated Cost: <span className="text-slate-900 font-extrabold">{formatCurrency(item.cost)}</span>
                    </p>
                  </div>
                </div>

                {/* Card Action Footer */}
                <div className="p-5 pt-0 border-t border-slate-100 mt-2 pt-3">
                  <button
                    type="button"
                    onClick={() => toggleSuggestion(item.id)}
                    className={`w-full text-xs font-bold py-2.5 px-4 rounded-xl transition-all flex items-center justify-center gap-1.5 ${
                      isAdded
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-100 hover:bg-brand-50 hover:text-brand-600 border border-slate-200'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Added to Trip Suggestions</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4 text-brand-600" />
                        <span>+ Add to Trip</span>
                      </>
                    )}
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>

    </div>
  );
};
