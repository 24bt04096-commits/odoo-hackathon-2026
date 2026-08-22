import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  Plus, 
  Search, 
  Calendar, 
  MapPin, 
  DollarSign, 
  Trash2, 
  ChevronRight, 
  Sparkles,
  Layers,
  Filter as FilterIcon,
  ArrowUpDown,
  Clock,
  CheckCircle2,
  PlayCircle,
  Clock3,
  Edit3,
  X,
  Save
} from 'lucide-react';

export const MyTripsPage = () => {
  const { trips, setActiveTripId, setCurrentScreen, deleteTrip, updateTrip, formatCurrency } = useTripContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('Status');
  const [filterBy, setFilterBy] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  // Edit Modal State
  const [editingTrip, setEditingTrip] = useState(null);
  const [editTitle, setEditTitle] = useState('');
  const [editStartDate, setEditStartDate] = useState('');
  const [editEndDate, setEditEndDate] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editCoverImage, setEditCoverImage] = useState('');

  const openEditModal = (trip) => {
    setEditingTrip(trip);
    setEditTitle(trip.title || '');
    setEditStartDate(trip.startDate || '');
    setEditEndDate(trip.endDate || '');
    setEditDescription(trip.subtitle || trip.description || '');
    setEditCoverImage(trip.coverImage || '');
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editingTrip) return;
    updateTrip(editingTrip.id, {
      title: editTitle,
      startDate: editStartDate,
      endDate: editEndDate,
      subtitle: editDescription,
      description: editDescription,
      coverImage: editCoverImage
    });
    setEditingTrip(null);
  };

  // Filter & Search Logic
  const filteredTrips = trips.filter((t) => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.cities.some((c) => c.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    if (!matchesSearch) return false;

    if (filterBy === 'All') return true;
    if (filterBy === 'Ongoing' && (t.status === 'active' || t.status === 'Ongoing')) return true;
    if (filterBy === 'Up-coming' && (t.status === 'upcoming' || t.status === 'Up-coming' || t.status === 'draft')) return true;
    if (filterBy === 'Completed' && (t.status === 'completed' || t.status === 'Completed')) return true;

    return true;
  });

  // Sort Logic
  const sortedTrips = [...filteredTrips].sort((a, b) => {
    if (sortBy === 'Newest') return new Date(b.startDate) - new Date(a.startDate);
    if (sortBy === 'Oldest') return new Date(a.startDate) - new Date(b.startDate);
    if (sortBy === 'BudgetHigh') return b.totalBudget - a.totalBudget;
    if (sortBy === 'BudgetLow') return a.totalBudget - b.totalBudget;
    return 0;
  });

  // Group Trips by Section (Ongoing, Up-coming, Completed)
  const ongoingTrips = sortedTrips.filter((t) => t.status === 'active' || t.status === 'Ongoing');
  const upcomingTrips = sortedTrips.filter((t) => t.status === 'upcoming' || t.status === 'Up-coming' || t.status === 'draft' || (!t.status));
  const completedTrips = sortedTrips.filter((t) => t.status === 'completed' || t.status === 'Completed');

  // Helper render component for Trip Overview Card matching wireframe "Short Over View of the Trip"
  const renderTripCard = (t, statusTag, tagBg) => {
    const destCount = t.cities ? t.cities.length : 1;

    return (
      <div 
        key={t.id}
        className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-soft hover:shadow-card transition-all space-y-4 group relative"
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-5">
          
          {/* Left: Image & Trip Overview Info */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
            <div className="relative w-full sm:w-44 h-32 rounded-2xl overflow-hidden shrink-0 bg-slate-900">
              <img 
                src={t.coverImage || 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80'} 
                alt={t.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <span className={`absolute top-2.5 left-2.5 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full text-white backdrop-blur-md ${tagBg}`}>
                {statusTag}
              </span>
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-[11px] font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200 flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {t.startDate} to {t.endDate || '2026-11-10'}
                </span>
                <span className="text-xs text-slate-500 font-semibold">• {t.totalDays || 5} Days</span>
                {/* Destination Count Badge */}
                <span className="text-[11px] font-bold text-indigo-700 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-indigo-600" />
                  Destination Count: {destCount}
                </span>
              </div>

              <h3 className="text-xl font-black text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">
                {t.title}
              </h3>

              <p className="text-xs text-slate-500 font-medium">
                Short Over View of the Trip: {t.subtitle || t.description || `Multi-destination itinerary through ${t.cities ? t.cities.map(c => c.name).join(' & ') : 'selected places'}`}
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                  Route: {t.cities ? t.cities.map(c => c.name).join(' → ') : 'Single Location'}
                </span>
                <span className="text-[11px] font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                  Budget: {formatCurrency(t.totalBudget)}
                </span>
              </div>
            </div>
          </div>

          {/* Right: Actions (Itinerary Builder, View Summary, Edit, Delete) */}
          <div className="flex sm:flex-col items-center justify-end gap-2 shrink-0 border-t sm:border-t-0 sm:border-l border-slate-100 pt-3 sm:pt-0 sm:pl-5">
            <button
              type="button"
              onClick={() => {
                setActiveTripId(t.id);
                setCurrentScreen('itinerary-builder');
              }}
              className="w-full sm:w-36 py-2 px-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-glow transition-all hover:scale-105 flex items-center justify-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Itinerary Builder</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveTripId(t.id);
                setCurrentScreen('itinerary-view');
              }}
              className="w-full sm:w-36 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
            >
              <span>View Summary</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-center gap-1.5 w-full sm:w-36 justify-between pt-1">
              <button
                type="button"
                onClick={() => openEditModal(t)}
                className="flex-1 py-1.5 px-3 bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1"
                title="Edit Trip Details"
              >
                <Edit3 className="w-3.5 h-3.5 text-amber-600" />
                <span>Edit</span>
              </button>

              <button
                type="button"
                onClick={() => deleteTrip(t.id)}
                className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                title="Delete Trip"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8 font-sans">
      
      {/* Screen Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 border border-brand-200 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            User Trip Listing (Screen 6)
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Trip Listing</h1>
          <p className="text-xs sm:text-sm text-slate-500">
            View and manage all your ongoing, upcoming, and completed travel itineraries.
          </p>
        </div>

        <button
          onClick={() => setCurrentScreen('create-trip')}
          className="bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs px-5 py-3 rounded-2xl shadow-glow flex items-center justify-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-4 h-4" />
          <span>Plan New Trip</span>
        </button>
      </div>

      {/* ========================================================= */}
      {/* TOP CONTROL BAR MATCHING WIREFRAME                        */}
      {/* Search bar | Group by | Filter | Sort by...              */}
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
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-medium text-slate-900 placeholder:text-slate-400 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
          />
        </div>

        {/* Group by */}
        <div className="w-full md:w-auto">
          <select
            value={groupBy}
            onChange={(e) => setGroupBy(e.target.value)}
            className="w-full md:w-36 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all cursor-pointer"
          >
            <option value="Status">Group by: Status</option>
            <option value="Destination">Group by: Destination</option>
            <option value="Year">Group by: Year</option>
          </select>
        </div>

        {/* Filter */}
        <div className="w-full md:w-auto">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="w-full md:w-36 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all cursor-pointer"
          >
            <option value="All">Filter: All Trips</option>
            <option value="Ongoing">Filter: Ongoing</option>
            <option value="Up-coming">Filter: Up-coming</option>
            <option value="Completed">Filter: Completed</option>
          </select>
        </div>

        {/* Sort by... */}
        <div className="w-full md:w-auto">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-36 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all cursor-pointer"
          >
            <option value="Newest">Sort by: Newest</option>
            <option value="Oldest">Sort by: Oldest</option>
            <option value="BudgetHigh">Sort by: Budget (High)</option>
            <option value="BudgetLow">Sort by: Budget (Low)</option>
          </select>
        </div>

      </div>

      {/* ========================================================= */}
      {/* 1. ONGOING TRIPS SECTION                                  */}
      {/* ========================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"></span>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Ongoing</h2>
        </div>

        {ongoingTrips.length > 0 ? (
          ongoingTrips.map(t => renderTripCard(t, 'Ongoing', 'bg-emerald-600/90'))
        ) : (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
            {renderTripCard(
              {
                id: 'trip-ongoing-demo',
                title: 'Grand Japan Odyssey',
                subtitle: 'Active multi-city tour in Tokyo & Kyoto',
                startDate: '2026-08-20',
                endDate: '2026-08-30',
                totalDays: 10,
                totalBudget: 3500,
                status: 'Ongoing',
                coverImage: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80',
                cities: [{ id: '1', name: 'Tokyo' }, { id: '2', name: 'Kyoto' }]
              },
              'Ongoing',
              'bg-emerald-600/90'
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 2. UP-COMING TRIPS SECTION                                */}
      {/* ========================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-brand-500"></span>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Up-coming</h2>
        </div>

        {upcomingTrips.length > 0 ? (
          upcomingTrips.map(t => renderTripCard(t, 'Up-coming', 'bg-brand-600/90'))
        ) : (
          <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-3">
            {renderTripCard(
              {
                id: 'trip-upcoming-demo',
                title: 'Swiss Alps & Rhine Express',
                subtitle: 'Upcoming scenic mountain railway journey',
                startDate: '2026-11-01',
                endDate: '2026-11-10',
                totalDays: 9,
                totalBudget: 4200,
                status: 'Up-coming',
                coverImage: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80',
                cities: [{ id: '1', name: 'Zurich' }, { id: '2', name: 'Zermatt' }]
              },
              'Up-coming',
              'bg-brand-600/90'
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* 3. COMPLETED TRIPS SECTION                                */}
      {/* ========================================================= */}
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-slate-400"></span>
          <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">Completed</h2>
        </div>

        <div className="space-y-4">
          {completedTrips.length > 0 ? (
            completedTrips.map(t => renderTripCard(t, 'Completed', 'bg-slate-700/90'))
          ) : (
            <>
              {renderTripCard(
                {
                  id: 'trip-completed-demo-1',
                  title: 'Mediterranean Coastal Sunset Tour',
                  subtitle: 'Completed 7-day cruise across Amalfi Coast',
                  startDate: '2026-05-10',
                  endDate: '2026-05-17',
                  totalDays: 7,
                  totalBudget: 2800,
                  status: 'Completed',
                  coverImage: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80',
                  cities: [{ id: '1', name: 'Positano' }, { id: '2', name: 'Capri' }]
                },
                'Completed',
                'bg-slate-700/90'
              )}

              {renderTripCard(
                {
                  id: 'trip-completed-demo-2',
                  title: 'Parisian Art & Gastronomy Escapade',
                  subtitle: 'Completed cultural tour of Louvre & Montmartre',
                  startDate: '2026-03-01',
                  endDate: '2026-03-06',
                  totalDays: 5,
                  totalBudget: 1900,
                  status: 'Completed',
                  coverImage: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80',
                  cities: [{ id: '1', name: 'Paris' }]
                },
                'Completed',
                'bg-slate-700/90'
              )}
            </>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* EDIT TRIP MODAL DIALOG                                    */}
      {/* ========================================================= */}
      {editingTrip && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-slate-200 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <Edit3 className="w-5 h-5 text-brand-600" />
                <h3 className="text-xl font-extrabold text-slate-900">Edit Trip Details</h3>
              </div>
              <button
                onClick={() => setEditingTrip(null)}
                className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Trip Name / Title:
                </label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Trip Description:
                </label>
                <textarea
                  rows="3"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none"
                ></textarea>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    Start Date:
                  </label>
                  <input
                    type="date"
                    required
                    value={editStartDate}
                    onChange={(e) => setEditStartDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                    End Date:
                  </label>
                  <input
                    type="date"
                    required
                    value={editEndDate}
                    onChange={(e) => setEditEndDate(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-1">
                  Cover Photo Image URL:
                </label>
                <input
                  type="url"
                  value={editCoverImage}
                  onChange={(e) => setEditCoverImage(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900"
                />
              </div>

              <div className="pt-3 flex justify-end gap-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setEditingTrip(null)}
                  className="px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-glow flex items-center gap-1.5"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
