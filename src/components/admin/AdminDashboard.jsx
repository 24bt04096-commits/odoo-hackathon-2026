import React from 'react';
import { useTripContext } from '../../context/TripContext';
import { StatCard } from '../common/StatCard';
import { Shield, Users, Globe, DollarSign, TrendingUp, Sparkles, Activity, Layers } from 'lucide-react';

export const AdminDashboard = () => {
  const { adminMetrics } = useTripContext();

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Admin Header */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-card flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
            <Shield className="w-3.5 h-3.5" />
            Platform Admin Panel
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">GlobeTrotter SaaS Analytics</h1>
          <p className="text-slate-300 text-sm">Real-time telemetry, user acquisition metrics, and popular travel trends.</p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-400 bg-emerald-950/80 px-3 py-1.5 rounded-full border border-emerald-500/40 flex items-center gap-1.5">
            <Activity className="w-3.5 h-3.5" /> System Health 99.99%
          </span>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Registered Users"
          value={adminMetrics.totalUsers.toLocaleString()}
          subtitle="+1,420 this month"
          icon={Users}
          color="brand"
          trend="+18.4%"
        />
        <StatCard
          title="Active Itineraries"
          value={adminMetrics.activeTripsCount.toLocaleString()}
          subtitle="Currently active"
          icon={Globe}
          color="emerald"
        />
        <StatCard
          title="Gross Booking Value"
          value={adminMetrics.grossBookingValue}
          subtitle="Annualized GBV"
          icon={DollarSign}
          color="indigo"
        />
        <StatCard
          title="Total Trips Created"
          value={adminMetrics.totalTripsCreated.toLocaleString()}
          subtitle="Platform lifetime"
          icon={Layers}
          color="amber"
        />
      </div>

      {/* Charts Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* User Growth SVG Area Chart (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <div>
              <h3 className="text-xl font-bold text-slate-900">User Growth Trend</h3>
              <p className="text-xs text-slate-500">Monthly active registered accounts</p>
            </div>
            <span className="text-xs font-bold text-brand-600 bg-brand-50 px-2.5 py-1 rounded-lg">2026 YTD</span>
          </div>

          {/* SVG Area Chart */}
          <div className="h-64 relative flex items-end justify-between pt-6 px-2">
            <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" viewBox="0 0 500 200">
              <defs>
                <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0c8de9" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#0c8de9" stopOpacity="0.0" />
                </linearGradient>
              </defs>
              <path
                d="M 20 160 Q 100 130 180 110 T 340 60 T 480 30 L 480 190 L 20 190 Z"
                fill="url(#growthGradient)"
              />
              <path
                d="M 20 160 Q 100 130 180 110 T 340 60 T 480 30"
                fill="none"
                stroke="#0c8de9"
                strokeWidth="4"
              />
            </svg>

            {adminMetrics.userGrowthData.map((d, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center gap-2">
                <span className="text-[10px] font-bold text-slate-700 bg-white px-2 py-0.5 rounded shadow-xs border border-slate-200">
                  {(d.users / 1000).toFixed(1)}k
                </span>
                <span className="text-xs text-slate-400 font-medium">{d.month}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Destinations Breakdown (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900">Top Destinations</h3>
            <span className="text-xs text-slate-400 font-semibold">% Share</span>
          </div>

          <div className="space-y-4">
            {adminMetrics.popularDestinationsChart.map((item, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-900">📍 {item.city}</span>
                  <span className="text-brand-600">{item.count.toLocaleString()} trips ({item.percent}%)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-brand-600 to-indigo-500 rounded-full"
                    style={{ width: `${item.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
