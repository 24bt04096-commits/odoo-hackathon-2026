import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  User, 
  Mail, 
  MapPin, 
  Phone, 
  Globe, 
  DollarSign, 
  Edit3, 
  Save, 
  Check, 
  Sparkles, 
  Calendar, 
  Eye, 
  Camera, 
  Heart,
  ChevronRight
} from 'lucide-react';

export const ProfileSettings = () => {
  const { user, setUser, trips, setActiveTripId, setCurrentScreen, addToast, formatCurrency } = useTripContext();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Alex Rivera');
  const [email, setEmail] = useState(user?.email || 'alex.rivera@globetrotter.io');
  const [phone, setPhone] = useState(user?.phone || '+1 (555) 234-5678');
  const [homeCity, setHomeCity] = useState(user?.homeCity || 'San Francisco, USA');
  const [bio, setBio] = useState(user?.bio || 'Passionate world traveler, photographer, and culture enthusiast.');
  const [currency, setCurrency] = useState(user?.currency || 'USD');
  const [avatar, setAvatar] = useState(user?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80');

  // Preplanned Trips (Upcoming / Active)
  const preplannedTrips = [
    {
      id: 'pre-1',
      title: 'Swiss Alps & Rhine Express',
      dates: '2026-11-01 to 2026-11-10',
      days: '9 Days',
      route: 'Zurich → Zermatt',
      budget: 4200,
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'pre-2',
      title: 'Grand Japan Sakura Odyssey',
      dates: '2026-10-10 to 2026-10-20',
      days: '10 Days',
      route: 'Tokyo → Kyoto',
      budget: 3500,
      image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'pre-3',
      title: 'European Romance: Paris & Amalfi',
      dates: '2026-06-12 to 2026-06-22',
      days: '10 Days',
      route: 'Paris → Amalfi Coast',
      budget: 4800,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80'
    }
  ];

  // Previous Trips (Completed)
  const previousTrips = [
    {
      id: 'prev-1',
      title: 'Mediterranean Coastal Sunset Tour',
      dates: '2026-05-10 to 2026-05-17',
      days: '7 Days',
      route: 'Positano → Capri',
      budget: 2800,
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'prev-2',
      title: 'Parisian Art & Gastronomy Escapade',
      dates: '2026-03-01 to 2026-03-06',
      days: '5 Days',
      route: 'Paris',
      budget: 1900,
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'prev-3',
      title: 'Icelandic Northern Lights Expedition',
      dates: '2026-01-15 to 2026-01-22',
      days: '7 Days',
      route: 'Reykjavik → Vik',
      budget: 3100,
      image: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?auto=format&fit=crop&w=600&q=80'
    }
  ];

  const handleSaveProfile = (e) => {
    e?.preventDefault();
    setUser((prev) => ({
      ...prev,
      name,
      email,
      phone,
      homeCity,
      bio,
      currency,
      avatar
    }));
    setIsEditing(false);
    addToast('User details updated successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto space-y-10 font-sans">
      
      {/* Screen Title Tag */}
      <div className="space-y-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 text-brand-600 border border-brand-200 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
          User Profile Pages (Screen 7)
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">User Profile & Itineraries</h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Manage your personal account information and view all preplanned and previous travel itineraries.
        </p>
      </div>

      {/* ========================================================= */}
      {/* SECTION 1: TOP PROFILE HEADER CARD                        */}
      {/* Image of the User | User Details with edit options       */}
      {/* ========================================================= */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-start gap-8 relative overflow-hidden">
        
        {/* Left: Image of the User */}
        <div className="flex flex-col items-center gap-3 shrink-0 mx-auto md:mx-0">
          <div className="relative group">
            <div className="w-36 h-36 rounded-full overflow-hidden border-4 border-white shadow-xl ring-4 ring-brand-500/20 bg-slate-900">
              <img 
                src={avatar} 
                alt="Image of the User" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            {isEditing && (
              <button 
                type="button"
                onClick={() => {
                  const newUrl = prompt('Enter image URL for user avatar:', avatar);
                  if (newUrl) setAvatar(newUrl);
                }}
                className="absolute bottom-1 right-1 p-2.5 rounded-full bg-brand-600 text-white shadow-lg hover:bg-brand-700 transition-all hover:scale-110"
                title="Change Avatar Image"
              >
                <Camera className="w-4 h-4" />
              </button>
            )}
          </div>
          <span className="text-[11px] font-extrabold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
            Image of the User
          </span>
        </div>

        {/* Right: User Details with appropriate option to edit those information.... */}
        <div className="flex-1 space-y-4 w-full">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                User Details
              </h2>
              <p className="text-xs text-slate-500">
                User Details with appropriate option to edit those information....
              </p>
            </div>

            {/* Edit / Save Options Button */}
            {!isEditing ? (
              <button
                type="button"
                onClick={() => setIsEditing(true)}
                className="px-4 py-2.5 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-glow transition-all hover:scale-105 flex items-center justify-center gap-2 self-start sm:self-auto"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Edit Information</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={handleSaveProfile}
                className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-sm transition-all hover:scale-105 flex items-center justify-center gap-2 self-start sm:self-auto"
              >
                <Save className="w-3.5 h-3.5" />
                <span>Save Information</span>
              </button>
            )}
          </div>

          {/* User Fields Grid */}
          {!isEditing ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-slate-400">Full Name</span>
                <p className="text-sm font-black text-slate-800">{name}</p>
              </div>

              <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-slate-400">Email Address</span>
                <p className="text-sm font-black text-slate-800">{email}</p>
              </div>

              <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-slate-400">Phone Number</span>
                <p className="text-sm font-black text-slate-800">{phone}</p>
              </div>

              <div className="bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-slate-400">Home City & Country</span>
                <p className="text-sm font-black text-slate-800">{homeCity}</p>
              </div>

              <div className="sm:col-span-2 bg-slate-50/80 p-3.5 rounded-2xl border border-slate-100 space-y-1">
                <span className="text-[10px] font-extrabold uppercase text-slate-400">Traveler Bio & Preferences</span>
                <p className="text-xs font-semibold text-slate-700 leading-relaxed">{bio}</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSaveProfile} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Home City & Country</label>
                <input
                  type="text"
                  value={homeCity}
                  onChange={(e) => setHomeCity(e.target.value)}
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-[10px] font-extrabold uppercase text-slate-500 mb-1">Traveler Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows="2"
                  className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none"
                ></textarea>
              </div>
            </form>
          )}

        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 2: PREPLANNED TRIPS (3-CARD GRID WITH VIEW BUTTON) */}
      {/* ========================================================= */}
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Preplanned Trips</h2>
          <span className="text-xs font-bold text-slate-500">Upcoming & Active Itineraries</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {preplannedTrips.map((trip) => (
            <div 
              key={trip.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img 
                    src={trip.image} 
                    alt={trip.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-brand-600 text-white backdrop-blur-md">
                    Preplanned
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-brand-500" />
                      {trip.dates}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">
                    {trip.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <span className="font-semibold text-slate-600">Route: {trip.route}</span>
                    <span className="font-extrabold text-emerald-600">{formatCurrency(trip.budget)}</span>
                  </div>
                </div>
              </div>

              {/* Bottom View Button matching wireframe */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTripId(trip.id);
                    setCurrentScreen('itinerary-builder');
                  }}
                  className="w-full py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-2xl shadow-glow transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* ========================================================= */}
      {/* SECTION 3: PREVIOUS TRIPS (3-CARD GRID WITH VIEW BUTTON)   */}
      {/* ========================================================= */}
      <div className="space-y-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <h2 className="text-2xl font-black text-slate-900 tracking-tight">Previous Trips</h2>
          <span className="text-xs font-bold text-slate-500">Historical Travels</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previousTrips.map((trip) => (
            <div 
              key={trip.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-soft hover:shadow-card transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="relative h-44 overflow-hidden bg-slate-900">
                  <img 
                    src={trip.image} 
                    alt={trip.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-3 left-3 text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-700 text-white backdrop-blur-md">
                    Completed
                  </span>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500 font-bold">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {trip.dates}
                    </span>
                  </div>

                  <h3 className="text-lg font-black text-slate-900 group-hover:text-brand-600 transition-colors leading-snug">
                    {trip.title}
                  </h3>

                  <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-100">
                    <span className="font-semibold text-slate-600">Route: {trip.route}</span>
                    <span className="font-extrabold text-slate-800">{formatCurrency(trip.budget)}</span>
                  </div>
                </div>
              </div>

              {/* Bottom View Button matching wireframe */}
              <div className="p-5 pt-0">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTripId(trip.id);
                    setCurrentScreen('itinerary-view');
                  }}
                  className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs rounded-2xl transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  <span>View</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
