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
  FileText,
  ChevronRight,
  Eye,
  Share2
} from 'lucide-react';

export const ItineraryBuilder = () => {
  const { activeTrip, setCurrentScreen, formatCurrency } = useTripContext();

  // Initial Sections state matching Screen 5 wireframe drawing
  const [sections, setSections] = useState([
    {
      id: 'sec-1',
      title: 'Section 1: Travel & Flight Logistics',
      description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity',
      startDate: '2026-11-01',
      endDate: '2026-11-03',
      budget: 850
    },
    {
      id: 'sec-2',
      title: 'Section 2: Hotel & Boutique Stay',
      description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity',
      startDate: '2026-11-03',
      endDate: '2026-11-07',
      budget: 1200
    },
    {
      id: 'sec-3',
      title: 'Section 3: Guided Sightseeing & Cultural Tours',
      description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity',
      startDate: '2026-11-07',
      endDate: '2026-11-10',
      budget: 450
    }
  ]);

  // Handler to add another section dynamically
  const handleAddSection = () => {
    const nextNum = sections.length + 1;
    const newSection = {
      id: `sec-${Date.now()}`,
      title: `Section ${nextNum}: Custom Activity or Logistics`,
      description: 'All the necessary information about this section. This can be anything like travel section, hotel or any other activity',
      startDate: '2026-11-10',
      endDate: '2026-11-12',
      budget: 300
    };
    setSections([...sections, newSection]);
  };

  // Handler to remove a section
  const handleRemoveSection = (id) => {
    if (sections.length <= 1) return;
    setSections(sections.filter(s => s.id !== id));
  };

  // Handler to update section fields
  const handleUpdateSection = (id, field, value) => {
    setSections(sections.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 font-sans">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 border border-brand-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Build Itenary Screen (Screen 5)
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {activeTrip ? activeTrip.title : 'Build Itinerary Screen'}
          </h1>
          <p className="text-xs text-slate-500">
            Organize your itinerary sections (travel, hotels, activities) with date ranges and allocated budgets.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
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
      {/* SECTIONS STACK                                            */}
      {/* ========================================================= */}
      <div className="space-y-6">
        
        {sections.map((sec, idx) => (
          <div 
            key={sec.id}
            className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft hover:shadow-card transition-all space-y-5 group relative"
          >
            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-xl bg-brand-600 text-white font-extrabold text-xs flex items-center justify-center">
                  #{idx + 1}
                </span>
                <input
                  type="text"
                  value={sec.title}
                  onChange={(e) => handleUpdateSection(sec.id, 'title', e.target.value)}
                  className="text-lg font-extrabold text-slate-900 bg-transparent hover:bg-slate-50 focus:bg-slate-50 border border-transparent hover:border-slate-200 focus:border-brand-300 rounded-lg px-2 py-1 focus:outline-none transition-all"
                />
              </div>

              {sections.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSection(sec.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  title="Remove Section"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Section Description Textarea */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Section Details & Information:
              </label>
              <textarea
                rows="3"
                value={sec.description}
                onChange={(e) => handleUpdateSection(sec.id, 'description', e.target.value)}
                placeholder="All the necessary information about this section. This can be anything like travel section, hotel or any other activity"
                className="w-full px-4 py-3 bg-slate-50/70 border border-slate-200/80 rounded-2xl text-xs sm:text-sm font-medium text-slate-700 placeholder:text-slate-400 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all leading-relaxed"
              ></textarea>
            </div>

            {/* Bottom Controls Pill Boxes: Date Range & Budget */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              {/* Date Range: xxx to yyy */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-600" />
                  Date Range: {sec.startDate} to {sec.endDate}
                </span>
                <div className="flex items-center gap-2">
                  <input
                    type="date"
                    value={sec.startDate}
                    onChange={(e) => handleUpdateSection(sec.id, 'startDate', e.target.value)}
                    className="w-1/2 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                  <span className="text-xs text-slate-400 font-bold">to</span>
                  <input
                    type="date"
                    value={sec.endDate}
                    onChange={(e) => handleUpdateSection(sec.id, 'endDate', e.target.value)}
                    className="w-1/2 px-2.5 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-800"
                  />
                </div>
              </div>

              {/* Budget of this section */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col justify-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
                  Budget of this section: {formatCurrency(sec.budget)}
                </span>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-slate-400 text-xs font-extrabold">$</span>
                  <input
                    type="number"
                    step="50"
                    value={sec.budget}
                    onChange={(e) => handleUpdateSection(sec.id, 'budget', Number(e.target.value))}
                    className="w-full pl-7 pr-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-extrabold text-slate-900"
                  />
                </div>
              </div>

            </div>

          </div>
        ))}

      </div>

      {/* ========================================================= */}
      {/* BOTTOM ACTION BUTTON: + ADD ANOTHER SECTION               */}
      {/* ========================================================= */}
      <div className="pt-4 flex justify-center">
        <button
          type="button"
          onClick={handleAddSection}
          className="w-full sm:w-auto bg-white hover:bg-slate-50 border-2 border-slate-300 hover:border-brand-500 text-slate-800 hover:text-brand-600 font-extrabold text-base px-10 py-4 rounded-2xl shadow-soft hover:shadow-card transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer"
        >
          <Plus className="w-5 h-5 text-brand-600 stroke-[3]" />
          <span>+ Add another Section</span>
        </button>
      </div>

    </div>
  );
};
