import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { User, Mail, Globe, DollarSign, Bell, Shield, Heart, Save, Check } from 'lucide-react';

export const ProfileSettings = () => {
  const { user, setUser, addToast } = useTripContext();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [homeCity, setHomeCity] = useState(user.homeCity);
  const [bio, setBio] = useState(user.bio);
  const [currency, setCurrency] = useState(user.currency || 'USD');
  const [travelStyles, setTravelStyles] = useState(user.travelStyle || ['Cultural Explorer', 'Foodie']);

  const availableStyles = ['Cultural Explorer', 'Foodie', 'Slow Travel', 'Luxury', 'Backpacker', 'Wellness & Spa', 'Nature & Hiking'];

  const handleToggleStyle = (style) => {
    setTravelStyles((prev) =>
      prev.includes(style) ? prev.filter((s) => s !== style) : [...prev, style]
    );
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser((prev) => ({
      ...prev,
      name,
      email,
      homeCity,
      bio,
      currency,
      travelStyle: travelStyles
    }));
    addToast('Profile & preferences saved successfully!', 'success');
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-8">
      
      {/* Profile Header */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
        <img
          src={user.avatar}
          alt={user.name}
          className="w-24 h-24 rounded-full object-cover ring-4 ring-brand-500/20 shadow-md shrink-0"
        />
        <div className="space-y-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
              Pro Explorer
            </span>
            <span className="text-xs text-slate-400">Member since {user.memberSince}</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900">{user.name}</h1>
          <p className="text-xs text-slate-500">{user.homeCity} • {user.email}</p>
          <div className="pt-2 flex items-center justify-center sm:justify-start gap-4 text-xs font-bold text-slate-700">
            <span>🌍 {user.stats.countriesVisited} Countries</span>
            <span>✈️ {user.stats.tripsCompleted} Completed Trips</span>
            <span>📍 {user.stats.savedPlaces} Saved Places</span>
          </div>
        </div>
      </div>

      {/* Settings Form */}
      <form onSubmit={handleSave} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
        <h3 className="text-xl font-bold text-slate-900 border-b border-slate-100 pb-3">Personal Info & Preferences</h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Home City & Country</label>
            <input
              type="text"
              value={homeCity}
              onChange={(e) => setHomeCity(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Preferred Display Currency</label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:ring-2 focus:ring-brand-500 focus:outline-none"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="GBP">GBP (£)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Traveler Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows="3"
            className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:ring-2 focus:ring-brand-500 focus:outline-none"
          ></textarea>
        </div>

        {/* Travel Style Selector */}
        <div className="space-y-2">
          <label className="block text-xs font-bold uppercase text-slate-500">Travel Style Badges</label>
          <div className="flex flex-wrap gap-2">
            {availableStyles.map((style) => {
              const isSelected = travelStyles.includes(style);
              return (
                <button
                  type="button"
                  key={style}
                  onClick={() => handleToggleStyle(style)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-brand-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {isSelected && <Check className="w-3.5 h-3.5" />}
                  {style}
                </button>
              );
            })}
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100 flex justify-end">
          <button
            type="submit"
            className="bg-brand-600 hover:bg-brand-700 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-sm transition-all flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Save Profile Settings
          </button>
        </div>
      </form>

    </div>
  );
};
