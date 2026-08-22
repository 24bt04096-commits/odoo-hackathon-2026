import React, { useState } from 'react';
import { useTripContext } from '../../context/TripContext';
import { 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  Users, 
  Globe, 
  Activity, 
  TrendingUp, 
  PieChart as PieChartIcon, 
  MapPin, 
  Sparkles, 
  Lock, 
  ArrowLeft, 
  UserCheck, 
  Trash2, 
  Eye, 
  BarChart3, 
  FileText
} from 'lucide-react';

export const AdminDashboard = () => {
  const { user, setCurrentScreen, adminMetrics, inquiries = [], updateInquiryStatus, addToast } = useTripContext();

  const [activeTab, setActiveTab] = useState('inquiries'); // inquiries, manage-users, popular-cities, popular-activities, user-trends
  const [searchQuery, setSearchQuery] = useState('');
  const [groupBy, setGroupBy] = useState('User Role');
  const [filterBy, setFilterBy] = useState('All');
  const [sortBy, setSortBy] = useState('Newest');

  // Enforce Admin Access Constraint (Only admin role or alex.rivera@globetrotter.io / admin email)
  const isAdmin = user?.role === 'admin' || user?.isAdmin || user?.email === 'alex.rivera@globetrotter.io' || user?.email === 'admin@globetrotter.io';

  // Sample User Database for Manage Users section
  const [userList, setUserList] = useState([
    { id: 'usr-1', name: 'Alex Rivera', email: 'alex.rivera@globetrotter.io', role: 'Admin', tripsCount: 14, joined: 'Jan 2026', status: 'Active' },
    { id: 'usr-2', name: 'Elena Rostova', email: 'elena.rostova@globetrotter.io', role: 'Traveler', tripsCount: 8, joined: 'Feb 2026', status: 'Active' },
    { id: 'usr-3', name: 'Marcus Vance', email: 'marcus.vance@globetrotter.io', role: 'Traveler', tripsCount: 11, joined: 'Feb 2026', status: 'Active' },
    { id: 'usr-4', name: 'Sophia Chen', email: 'sophia.chen@globetrotter.io', role: 'Traveler', tripsCount: 6, joined: 'Mar 2026', status: 'Active' },
    { id: 'usr-5', name: 'David Miller', email: 'david.miller@globetrotter.io', role: 'Traveler', tripsCount: 3, joined: 'Apr 2026', status: 'Suspended' },
  ]);

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-8 max-w-lg w-full border border-slate-200 shadow-card text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-rose-50 text-rose-600 border border-rose-200 mx-auto flex items-center justify-center shadow-xs">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-rose-50 text-rose-600 border border-rose-200">
              403 Restricted Access
            </span>
            <h2 className="text-2xl font-black text-slate-900">Admin Privilege Required</h2>
            <p className="text-xs text-slate-500 font-medium leading-relaxed">
              Not everyone can use the Admin Panel. Access is strictly restricted to authorized Administrators. Please switch to an Admin account or return to your traveler dashboard.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row gap-3 justify-center">
            <button
              onClick={() => setCurrentScreen('dashboard')}
              className="px-5 py-3 bg-slate-900 hover:bg-slate-800 text-white font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              Return to Dashboard
            </button>
            <button
              onClick={() => {
                addToast('Demonstration Admin Access Granted for Alex Rivera!', 'success');
                if (user) user.role = 'admin';
              }}
              className="px-5 py-3 bg-brand-600 hover:bg-brand-700 text-white font-extrabold text-xs rounded-xl shadow-glow transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              Unlock Admin Demo Mode
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 font-sans">
      
      {/* Header Tag */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-indigo-600" />
            Admin Telemetry & Supabase Database
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">System Telemetry & Inquiry Submissions</h1>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200 flex items-center gap-1.5 shadow-xs">
            <Activity className="w-3.5 h-3.5 text-emerald-500 animate-pulse" /> Supabase Live ({inquiries.length} Inquiries)
          </span>
        </div>
      </div>

      {/* TOP CONTROL BAR */}
      <div className="bg-white rounded-3xl p-4 sm:p-5 border border-slate-200/80 shadow-soft flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-4 top-3.5 pointer-events-none" />
          <input
            type="text"
            placeholder="Search inquiries or users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs sm:text-sm font-extrabold text-slate-900 focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
          />
        </div>

        <div className="w-full md:w-auto">
          <select
            value={filterBy}
            onChange={(e) => setFilterBy(e.target.value)}
            className="w-full md:w-44 px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-xs font-bold text-slate-800 focus:ring-2 focus:ring-brand-500 focus:outline-none cursor-pointer"
          >
            <option value="All">Filter: All Statuses</option>
            <option value="new">Filter: New Only</option>
            <option value="contacted">Filter: Contacted</option>
            <option value="resolved">Filter: Resolved</option>
          </select>
        </div>
      </div>

      {/* 5 HORIZONTAL PILL TABS */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3">
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-4 py-3.5 rounded-2xl font-black text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 ${
            activeTab === 'inquiries'
              ? 'bg-brand-600 text-white border-brand-600 shadow-glow'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <FileText className="w-4 h-4 text-amber-300" />
          Inquiries ({inquiries.length})
        </button>

        <button
          onClick={() => setActiveTab('manage-users')}
          className={`px-4 py-3.5 rounded-2xl font-black text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 ${
            activeTab === 'manage-users'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Users className="w-4 h-4 text-indigo-400" />
          Manage Users
        </button>

        <button
          onClick={() => setActiveTab('popular-cities')}
          className={`px-4 py-3.5 rounded-2xl font-black text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 ${
            activeTab === 'popular-cities'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Globe className="w-4 h-4 text-emerald-400" />
          Popular cities
        </button>

        <button
          onClick={() => setActiveTab('popular-activities')}
          className={`px-4 py-3.5 rounded-2xl font-black text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 ${
            activeTab === 'popular-activities'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <Sparkles className="w-4 h-4 text-amber-400" />
          Popular Activites
        </button>

        <button
          onClick={() => setActiveTab('user-trends')}
          className={`px-4 py-3.5 rounded-2xl font-black text-xs sm:text-sm border transition-all flex items-center justify-center gap-2 ${
            activeTab === 'user-trends'
              ? 'bg-slate-900 text-white border-slate-900 shadow-md'
              : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-brand-400" />
          User Trends
        </button>
      </div>

      {/* ========================================================= */}
      {/* MAIN DASHBOARD CONTENT GRID (LEFT VISUALS + RIGHT NOTES)   */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Visual Analytics Box matching wireframe graphics */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Main Visual Box containing Pie Chart + Line Graph + Bar Chart */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-8">
            
            {/* Top Visual: Pie Chart Section */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/60 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <PieChartIcon className="w-4 h-4 text-indigo-600" />
                  Category Breakdown & Share
                </h3>
                <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full">
                  Real-time Data
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                {/* SVG Pie Chart */}
                <div className="sm:col-span-6 flex justify-center py-2">
                  <svg className="w-44 h-44 drop-shadow-md" viewBox="0 0 100 100">
                    {/* Slice 1: Green 35% */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#22c55e" strokeWidth="22" strokeDasharray="83.5 155" strokeDashoffset="0" />
                    {/* Slice 2: Blue 40% */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#0c8de9" strokeWidth="22" strokeDasharray="95.5 143" strokeDashoffset="-83.5" />
                    {/* Slice 3: Red 15% */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#ef4444" strokeWidth="22" strokeDasharray="35.8 203" strokeDashoffset="-179" />
                    {/* Slice 4: Amber 10% */}
                    <circle cx="50" cy="50" r="38" fill="transparent" stroke="#f59e0b" strokeWidth="22" strokeDasharray="23.8 215" strokeDashoffset="-214.8" />
                  </svg>
                </div>

                {/* Legend Dots matching wireframe dots (🔴 🟢 🔵 🟠) */}
                <div className="sm:col-span-6 space-y-3">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className="w-3.5 h-3.5 rounded-full bg-emerald-500"></span> European Alps Tours
                    </span>
                    <span className="text-emerald-600">35%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className="w-3.5 h-3.5 rounded-full bg-brand-500"></span> East Asia Expeditions
                    </span>
                    <span className="text-brand-600">40%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className="w-3.5 h-3.5 rounded-full bg-rose-500"></span> Coastal & Beach Resorts
                    </span>
                    <span className="text-rose-600">15%</span>
                  </div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="flex items-center gap-2 text-slate-700">
                      <span className="w-3.5 h-3.5 rounded-full bg-amber-500"></span> Outdoor Paragliding & Hiking
                    </span>
                    <span className="text-amber-600">10%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Middle Visual: Line Graph Section (🔴--🔴--🔴--🔴 matching wireframe nodes) */}
            <div className="bg-slate-50/80 rounded-2xl p-6 border border-slate-200/60 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-rose-500" />
                  User Activity & Engagement Line Graph
                </h3>
                <span className="text-xs font-semibold text-slate-400">Monthly Node Velocity</span>
              </div>

              {/* Line Graph SVG with Red Nodes */}
              <div className="h-44 relative flex items-end justify-between pt-6 px-4">
                <svg className="absolute inset-0 w-full h-full p-4 overflow-visible" viewBox="0 0 500 160">
                  {/* Axis line */}
                  <line x1="20" y1="140" x2="480" y2="140" stroke="#cbd5e1" strokeWidth="2" />
                  <line x1="20" y1="20" x2="20" y2="140" stroke="#cbd5e1" strokeWidth="2" />
                  
                  {/* Red Line */}
                  <path
                    d="M 40 110 L 120 70 L 200 90 L 290 40 L 380 50 L 460 30"
                    fill="none"
                    stroke="#dc2626"
                    strokeWidth="3"
                  />
                  {/* Red Data Nodes matching wireframe drawing */}
                  <circle cx="40" cy="110" r="7" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="120" cy="70" r="7" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="200" cy="90" r="7" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="290" cy="40" r="7" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="380" cy="50" r="7" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                  <circle cx="460" cy="30" r="7" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
                </svg>

                <div className="w-full flex justify-between text-[11px] font-bold text-slate-500 pt-32">
                  <span>Jan</span>
                  <span>Feb</span>
                  <span>Mar</span>
                  <span>Apr</span>
                  <span>May</span>
                  <span>Jun</span>
                </div>
              </div>
            </div>

            {/* Bottom Visual: Bar Chart + Active Tab Specific Content */}
            <div className="space-y-4">
              
              {/* Tab Header Title */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                  {activeTab.replace('-', ' ')}
                </h3>
                <span className="text-xs font-extrabold text-brand-600 bg-brand-50 px-3 py-1 rounded-full border border-brand-200">
                  {activeTab === 'inquiries' && `${inquiries.length} Supabase Records`}
                  {activeTab === 'manage-users' && '5 Total Accounts'}
                  {activeTab === 'popular-cities' && 'Top Destination Ranking'}
                  {activeTab === 'popular-activities' && 'Top Activity Ranking'}
                  {activeTab === 'user-trends' && 'Annual Analytics Breakdown'}
                </span>
              </div>

              {/* TAB 0: INQUIRIES FROM SUPABASE */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  {inquiries.length === 0 ? (
                    <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200">
                      <FileText className="w-10 h-10 text-slate-400 mx-auto mb-2" />
                      <p className="text-sm font-bold text-slate-700">No inquiries found in Supabase.</p>
                      <p className="text-xs text-slate-500 mt-1">Submit an inquiry using the "Inquiry" button on top to view it here!</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs font-semibold">
                        <thead className="bg-slate-100 text-slate-700 uppercase font-black">
                          <tr>
                            <th className="p-3 rounded-l-xl">Traveler Name</th>
                            <th className="p-3">Email & Phone</th>
                            <th className="p-3">Destination</th>
                            <th className="p-3">Dates & Guests</th>
                            <th className="p-3">Message</th>
                            <th className="p-3">Status</th>
                            <th className="p-3 text-right rounded-r-xl">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {inquiries
                            .filter(inq => filterBy === 'All' || inq.status === filterBy)
                            .map((inq) => (
                              <tr key={inq.id} className="hover:bg-slate-50 transition-colors">
                                <td className="p-3 font-extrabold text-slate-900">
                                  {inq.first_name || inq.firstName || 'Traveler'} {inq.last_name || inq.lastName || ''}
                                </td>
                                <td className="p-3">
                                  <div className="text-slate-900 font-bold">{inq.email}</div>
                                  <div className="text-[10px] text-slate-500">{inq.phone || 'No phone'}</div>
                                </td>
                                <td className="p-3 font-bold text-brand-600">
                                  {inq.destination_interest || inq.destinationInterest || 'General'}
                                </td>
                                <td className="p-3 text-slate-700">
                                  <div>{inq.travel_dates || inq.travelDates || 'Flexible'}</div>
                                  <div className="text-[10px] font-bold text-slate-500">{inq.number_of_guests || 1} Guests • {inq.budget_range || '$1,000+'}</div>
                                </td>
                                <td className="p-3 text-slate-600 max-w-xs truncate" title={inq.message}>
                                  {inq.message}
                                </td>
                                <td className="p-3">
                                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-black uppercase ${
                                    inq.status === 'new' ? 'bg-amber-100 text-amber-800' :
                                    inq.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                                    'bg-emerald-100 text-emerald-800'
                                  }`}>
                                    {inq.status || 'new'}
                                  </span>
                                </td>
                                <td className="p-3 text-right">
                                  <select
                                    value={inq.status || 'new'}
                                    onChange={(e) => updateInquiryStatus(inq.id, e.target.value)}
                                    className="px-2 py-1 bg-slate-100 border border-slate-200 rounded-lg text-[10px] font-bold text-slate-800 focus:ring-1 focus:ring-brand-500"
                                  >
                                    <option value="new">New</option>
                                    <option value="contacted">Contacted</option>
                                    <option value="resolved">Resolved</option>
                                  </select>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* TAB 1: MANAGE USERS */}
              {activeTab === 'manage-users' && (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-semibold">
                    <thead className="bg-slate-100 text-slate-700 uppercase font-black">
                      <tr>
                        <th className="p-3 rounded-l-xl">User Name</th>
                        <th className="p-3">Email Address</th>
                        <th className="p-3">Role</th>
                        <th className="p-3">Trips</th>
                        <th className="p-3">Status</th>
                        <th className="p-3 text-right rounded-r-xl">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {userList.map((u) => (
                        <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                          <td className="p-3 font-extrabold text-slate-900 flex items-center gap-2">
                            <span className="w-7 h-7 rounded-full bg-brand-600 text-white font-bold inline-flex items-center justify-center">
                              {u.name[0]}
                            </span>
                            {u.name}
                          </td>
                          <td className="p-3 text-slate-500">{u.email}</td>
                          <td className="p-3">
                            <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                              u.role === 'Admin' ? 'bg-indigo-100 text-indigo-700' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {u.role}
                            </span>
                          </td>
                          <td className="p-3 font-bold text-slate-900">{u.tripsCount}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-black uppercase ${
                              u.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
                            }`}>
                              {u.status}
                            </span>
                          </td>
                          <td className="p-3 text-right space-x-1">
                            <button 
                              onClick={() => addToast(`Viewing trips created by ${u.name}`, 'info')}
                              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>
                            <button 
                              onClick={() => {
                                setUserList(prev => prev.filter(x => x.id !== u.id));
                                addToast(`Removed user ${u.name}`, 'success');
                              }}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* TAB 2: POPULAR CITIES */}
              {activeTab === 'popular-cities' && (
                <div className="space-y-3">
                  {[
                    { city: 'Tokyo, Japan', trips: 1420, percent: 88 },
                    { city: 'Zurich & Interlaken, Switzerland', trips: 1180, percent: 76 },
                    { city: 'Paris, France', trips: 950, percent: 62 },
                    { city: 'Kyoto, Japan', trips: 890, percent: 58 },
                    { city: 'Amalfi Coast, Italy', trips: 720, percent: 48 },
                  ].map((c, i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-1">
                      <div className="flex justify-between text-xs font-black text-slate-900">
                        <span>📍 #{i+1} {c.city}</span>
                        <span className="text-brand-600">{c.trips} Total Visits</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-emerald-500 to-brand-600 rounded-full" style={{ width: `${c.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 3: POPULAR ACTIVITIES */}
              {activeTab === 'popular-activities' && (
                <div className="space-y-3">
                  {[
                    { title: 'Tandem Paragliding Flight over Lauterbrunnen', category: 'Outdoor Activity', popularity: 96 },
                    { title: 'Tokyo Shibuya Sky Sunset Observation Deck', category: 'Sightseeing', popularity: 92 },
                    { title: 'Nozomi Bullet Train Scenic Transit', category: 'Transit', popularity: 84 },
                    { title: 'Capri Island Private Boat Coastal Cave Swim', category: 'Water Sport', popularity: 78 },
                  ].map((act, i) => (
                    <div key={i} className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80 flex items-center justify-between text-xs">
                      <div>
                        <h4 className="font-black text-slate-900">{act.title}</h4>
                        <span className="text-[10px] font-bold text-slate-400 uppercase">{act.category}</span>
                      </div>
                      <span className="px-3 py-1 bg-amber-50 text-amber-700 font-extrabold rounded-full border border-amber-200">
                        ⭐ {act.popularity}% Popularity
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* TAB 4: USER TRENDS AND ANALYTICS */}
              {activeTab === 'user-trends' && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-[10px] font-black uppercase text-slate-400">Monthly Retention</p>
                    <p className="text-2xl font-black text-slate-900 mt-1">94.2%</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-[10px] font-black uppercase text-slate-400">Average Trip Duration</p>
                    <p className="text-2xl font-black text-brand-600 mt-1">8.5 Days</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200">
                    <p className="text-[10px] font-black uppercase text-slate-400">Avg Budget Per Trip</p>
                    <p className="text-2xl font-black text-emerald-600 mt-1">$2,450</p>
                  </div>
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Right Column: Wireframe Description Note Box */}
        <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <FileText className="w-4 h-4 text-brand-600" />
            <h3 className="text-base font-black text-slate-900">Admin Section Guidelines</h3>
          </div>

          <div className="space-y-4 text-xs font-semibold text-slate-700 leading-relaxed">
            
            {/* Manage User Section note */}
            <div className="p-4 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 space-y-1">
              <h4 className="font-black text-indigo-950 uppercase tracking-wider text-[11px]">
                Manage User Section:
              </h4>
              <p className="text-indigo-900">
                This Section is responsible for the managing the users and their actions. This section will allow the admin the access to view all the trips made by the user. Also other functionalities are welcome...
              </p>
            </div>

            {/* Popular cities note */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 space-y-1">
              <h4 className="font-black text-emerald-950 uppercase tracking-wider text-[11px]">
                Popular cities:
              </h4>
              <p className="text-emerald-900">
                Lists all the popular cities where the users are visiting based on the current user trends.
              </p>
            </div>

            {/* Popular Activites note */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 space-y-1">
              <h4 className="font-black text-amber-950 uppercase tracking-wider text-[11px]">
                Popular Activites:
              </h4>
              <p className="text-amber-900">
                List all the popular activites that the users are doing based on the current user trend data.
              </p>
            </div>

            {/* User trends and Analytics note */}
            <div className="p-4 rounded-2xl bg-brand-50/60 border border-brand-200/80 space-y-1">
              <h4 className="font-black text-brand-950 uppercase tracking-wider text-[11px]">
                User trends and Analytics:
              </h4>
              <p className="text-brand-900">
                This section will major focus on the providing analysis accross various points and give useful information to the user.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
