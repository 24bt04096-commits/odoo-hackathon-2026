import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  Search, 
  Sparkles, 
  Clock, 
  MapPin, 
  DollarSign, 
  ArrowDown, 
  Edit3, 
  Share2, 
  CheckCircle2, 
  Calendar,
  Layers,
  ChevronRight
} from 'lucide-react';

export const ItineraryView = () => {
  const { activeTrip, setCurrentScreen, formatCurrency } = useTripContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('Day');
  const [filterBy, setFilterBy] = useState('All');
  const [sortBy, setSortBy] = useState('Default');

  // Fallback itinerary data matching wireframe Screen 9
  const defaultItineraryData = [
    {
      dayNumber: 1,
      dayTitle: 'Day 1 — Arrival & Historic City Core',
      city: 'Interlaken / Zurich',
      date: 'Nov 1, 2026',
      activities: [
        {
          id: 'day1-1',
          time: '09:00 AM',
          title: 'Morning Guided Old Town City Walking Tour',
          category: 'Sightseeing',
          location: 'Historic City Square',
          expense: 45,
          expenseCategory: 'Tour Ticket',
          notes: 'Includes English speaking guide and entry to historical cathedral tower.'
        },
        {
          id: 'day1-2',
          time: '01:00 PM',
          title: 'Traditional Gourmet Lunch & Culinary Tasting',
          category: 'Food & Drink',
          location: 'Bistro du Marché',
          expense: 35,
          expenseCategory: 'Meals & Dining',
          notes: '3-course local tasting menu with artisanal beverages included.'
        },
        {
          id: 'day1-3',
          time: '04:30 PM',
          title: 'Tandem Paragliding Flight over Alpine Valleys',
          category: 'Outdoor Activity',
          location: 'Höhematte Launch Pad',
          expense: 180,
          expenseCategory: 'Activity Fee',
          notes: 'Tandem flight with certified pilot + GoPro video recording package.'
        }
      ]
    },
    {
      dayNumber: 2,
      dayTitle: 'Day 2 — Alpine Excursion & Summit Views',
      city: 'Grindelwald / Jungfrau',
      date: 'Nov 2, 2026',
      activities: [
        {
          id: 'day2-1',
          time: '08:30 AM',
          title: 'Scenic Mountain Railway Train & Cable Car Ascent',
          category: 'Transit & Pass',
          location: 'Grindelwald Terminal',
          expense: 65,
          expenseCategory: 'Transportation',
          notes: 'Round-trip Eiger Express cable car and mountain cogwheel railway pass.'
        },
        {
          id: 'day2-2',
          time: '11:30 AM',
          title: 'Summit Glacier Panorama Trail Hiking Experience',
          category: 'Hiking & Nature',
          location: 'Kleine Scheidegg Trailhead',
          expense: 0,
          expenseCategory: 'Free Entry',
          notes: 'Self-guided scenic trail with view of Eiger North Face.'
        },
        {
          id: 'day2-3',
          time: '07:00 PM',
          title: 'Sunset Alpine Chalet Dinner & Local Wine Pairing',
          category: 'Dining & Relax',
          location: 'Restaurant Mountain View',
          expense: 90,
          expenseCategory: 'Meals & Dining',
          notes: 'Traditional Swiss fondue dinner paired with regional Valais wines.'
        }
      ]
    }
  ];

  const displayItinerary = activeTrip?.itinerary && activeTrip.itinerary.length > 0 
    ? activeTrip.itinerary 
    : defaultItineraryData;

  const tripTitle = activeTrip?.title || 'Swiss Alps & Rhine Express';

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-8 font-sans">
      
      {/* Header Badge & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 border border-brand-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            Itinerary View Screen with budget section (Screen 9)
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Itinerary View & Budget Breakdown</h1>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setCurrentScreen('itinerary-builder')}
            className="px-4 py-2.5 bg-white border border-slate-200 text-slate-700 font-extrabold text-xs rounded-xl shadow-xs hover:bg-slate-100 transition-colors flex items-center gap-1.5"
          >
            <Edit3 className="w-3.5 h-3.5 text-brand-600" />
            Edit Itinerary
          </button>
          <button
            type="button"
            onClick={() => setCurrentScreen('public-share')}
            className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-glow transition-all flex items-center gap-1.5"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share Itinerary
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TOP CONTROL BAR MATCHING WIREFRAME                        */}
      {/* [ Search bar ......               ] | Group by | Filter | Sort by... */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-center gap-3">
        
        {/* Search bar ...... */}
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search bar ......"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-extrabold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
          />
        </div>

        {/* Group by */}
        <div className="w-full md:w-auto">
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="w-full md:w-36 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
          >
            <option value="Day">Group by: Day</option>
            <option value="Category">Group by: Category</option>
            <option value="Expense">Group by: Expense</option>
          </select>
        </div>

        {/* Filter */}
        <div className="w-full md:w-auto">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="w-full md:w-36 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
          >
            <option value="All">Filter: All</option>
            <option value="Paid">Filter: Paid Only</option>
            <option value="Free">Filter: Free Only</option>
          </select>
        </div>

        {/* Sort by... */}
        <div className="w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-36 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
          >
            <option value="Default">Sort by: Time</option>
            <option value="High">Sort by: Expense (High)</option>
            <option value="Low">Sort by: Expense (Low)</option>
          </select>
        </div>

      </div>

      {/* ========================================================= */}
      {/* MAIN TITLE: Itinerary for a selected place               */}
      {/* ========================================================= */}
      <div className="text-center py-4 bg-white rounded-3xl border border-slate-200/80 shadow-soft space-y-1">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
          Itinerary for a selected place
        </h2>
        <p className="text-xs font-bold text-brand-600 uppercase tracking-widest">
          {tripTitle}
        </p>
      </div>

      {/* ========================================================= */}
      {/* COLUMN HEADERS & TIMELINE WITH EXPENSE SECTION            */}
      {/* Left: Physical Activity (with downward arrows)            */}
      {/* Right: Expense                                           */}
      {/* ========================================================= */}
      <div className="space-y-8">
        
        {/* Column Header Titles */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 px-4 hidden md:flex items-center text-xs font-black uppercase tracking-wider text-slate-400">
          <div className="md:col-span-2">Day Badge</div>
          <div className="md:col-span-7 text-center">Physical Activity</div>
          <div className="md:col-span-3 text-right">Expense</div>
        </div>

        {/* Render Day Breakdown */}
        {displayItinerary.map((dayItem, dayIdx) => {
          const dayNum = dayItem.dayNumber || dayIdx + 1;
          const activities = dayItem.activities && dayItem.activities.length > 0
            ? dayItem.activities
            : defaultItineraryData[0].activities;

          return (
            <div 
              key={`day-${dayNum}`}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6"
            >
              
              {/* Day Header Row */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  {/* Day 1 / Day 2 Badge matching wireframe */}
                  <span className="px-4 py-2 bg-brand-600 text-white font-black text-xs rounded-xl shadow-glow">
                    Day {dayNum}
                  </span>
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {dayItem.title || dayItem.dayTitle || `Day ${dayNum} Schedule`}
                  </h3>
                </div>

                <div className="text-right text-xs">
                  <span className="font-extrabold text-slate-500">{dayItem.date || `Day ${dayNum}`}</span>
                </div>
              </div>

              {/* Physical Activity (Left) vs Expense (Right) Grid */}
              <div className="space-y-6">
                {activities.map((act, actIdx) => {
                  const isLast = actIdx === activities.length - 1;
                  const expenseVal = act.cost !== undefined ? act.cost : (act.expense || 0);

                  return (
                    <div key={act.id || `act-${actIdx}`} className="space-y-4">
                      
                      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                        
                        {/* Physical Activity Box (Left Column) */}
                        <div className="md:col-span-8 bg-slate-50/90 border border-slate-200/80 rounded-2xl p-4 sm:p-5 hover:border-brand-300 hover:shadow-sm transition-all space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-white text-slate-700 border border-slate-200">
                              Physical Activity
                            </span>
                            {act.time && (
                              <span className="text-xs font-bold text-brand-600 flex items-center gap-1">
                                <Clock className="w-3.5 h-3.5" />
                                {act.time}
                              </span>
                            )}
                          </div>

                          <h4 className="text-base font-black text-slate-900 leading-snug">
                            {act.title}
                          </h4>

                          <div className="flex items-center gap-4 text-xs text-slate-500 font-semibold pt-1">
                            {act.location && (
                              <span className="flex items-center gap-1">
                                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                                {act.location}
                              </span>
                            )}
                            {act.category && (
                              <span className="text-slate-400">• {act.category}</span>
                            )}
                          </div>
                        </div>

                        {/* Expense Box (Right Column) */}
                        <div className="md:col-span-4 bg-emerald-50/60 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex flex-col justify-center text-right space-y-1">
                          <span className="text-[10px] font-black uppercase tracking-wider text-emerald-700">
                            Expense
                          </span>
                          <p className="text-xl sm:text-2xl font-black text-emerald-700">
                            {expenseVal === 0 ? 'Free' : formatCurrency(expenseVal)}
                          </p>
                          <span className="text-[11px] font-semibold text-emerald-600">
                            {act.expenseCategory || (expenseVal === 0 ? 'No Cost' : 'Activity Budget')}
                          </span>
                        </div>

                      </div>

                      {/* Downward Arrow Connectors matching wireframe */}
                      {!isLast && (
                        <div className="flex items-center justify-center md:justify-start md:pl-28 py-1">
                          <div className="p-2 rounded-full bg-brand-50 border border-brand-200 text-brand-600 shadow-xs">
                            <ArrowDown className="w-4 h-4 animate-bounce" />
                          </div>
                        </div>
                      )}

                    </div>
                  );
                })}
              </div>

            </div>
          );
        })}

      </div>

    </div>
  );
};
