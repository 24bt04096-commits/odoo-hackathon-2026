import React from 'react';
import { useTripContext } from '../../context/TripContext';
import { StatCard } from '../common/StatCard';
import { 
  DollarSign, 
  PieChart, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle2, 
  Sparkles, 
  CreditCard, 
  Briefcase 
} from 'lucide-react';

export const BudgetDashboard = () => {
  const { activeTrip, formatCurrency } = useTripContext();

  if (!activeTrip) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <p className="text-sm font-semibold text-slate-500">No active trip selected.</p>
      </div>
    );
  }

  const percentSpent = Math.min(100, Math.round((activeTrip.spentBudget / activeTrip.totalBudget) * 100));
  const remainingBudget = Math.max(0, activeTrip.totalBudget - activeTrip.spentBudget);
  const isOverBudget = activeTrip.spentBudget > activeTrip.totalBudget;

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8">
      
      {/* Header Banner */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded bg-brand-50 text-brand-700 border border-brand-200">
              Financial Tracker
            </span>
            <span className="text-xs text-slate-500">{activeTrip.title}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900">Trip Budget & Expenses</h1>
          <p className="text-sm text-slate-500">Real-time breakdown of planned versus actual travel spending.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className={`px-4 py-2.5 rounded-2xl border text-xs font-bold flex items-center gap-2 ${
            isOverBudget
              ? 'bg-rose-50 border-rose-200 text-rose-700'
              : 'bg-emerald-50 border-emerald-200 text-emerald-700'
          }`}>
            {isOverBudget ? (
              <AlertTriangle className="w-4 h-4 text-rose-600" />
            ) : (
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            )}
            {isOverBudget ? 'Budget Alert: Exceeded' : 'On Track • 61% Utilized'}
          </div>
        </div>
      </div>

      {/* 4 Stat Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <StatCard
          title="Total Planned Budget"
          value={formatCurrency(activeTrip.totalBudget)}
          subtitle="Target threshold"
          icon={DollarSign}
          color="brand"
        />
        <StatCard
          title="Current Spent"
          value={formatCurrency(activeTrip.spentBudget)}
          subtitle={`${percentSpent}% of total`}
          icon={CreditCard}
          color="emerald"
        />
        <StatCard
          title="Remaining Balance"
          value={formatCurrency(remainingBudget)}
          subtitle="Safe to allocate"
          icon={Briefcase}
          color="indigo"
        />
        <StatCard
          title="Avg. Daily Spend"
          value={formatCurrency(Math.round(activeTrip.spentBudget / activeTrip.totalDays))}
          subtitle={`${activeTrip.totalDays} Days total`}
          icon={TrendingUp}
          color="amber"
        />
      </div>

      {/* Main Breakdown Split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Category Breakdown (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900">Category Allocations</h3>
            <span className="text-xs text-slate-400 font-semibold">Planned vs Spent</span>
          </div>

          <div className="space-y-5">
            {activeTrip.budgetBreakdown.map((cat, idx) => {
              const catPercent = Math.min(100, Math.round((cat.spent / cat.planned) * 100));
              return (
                <div key={idx} className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-bold">
                    <span className="text-slate-900 flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }}></span>
                      {cat.category}
                    </span>
                    <span className="text-slate-600">
                      {formatCurrency(cat.spent)} <span className="text-slate-400 font-normal">/ {formatCurrency(cat.planned)}</span>
                    </span>
                  </div>

                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${catPercent}%`, backgroundColor: cat.color }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Smart Tips & Insights (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-soft space-y-6">
          <div className="flex items-center gap-2 text-slate-900 font-bold border-b border-slate-100 pb-4">
            <Sparkles className="w-5 h-5 text-amber-500 fill-amber-400" />
            <h3 className="text-lg">Smart Budget Insights</h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-brand-50/70 border border-brand-200 space-y-1">
              <h4 className="font-bold text-brand-900">Flight Savings Detected</h4>
              <p className="text-brand-700 leading-relaxed">
                Your Shinkansen bullet train transit is $80 under original flight projections!
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200 space-y-1">
              <h4 className="font-bold text-amber-900">Food Budget Tip</h4>
              <p className="text-amber-800 leading-relaxed">
                Reserving Tsukiji omakase sushi tours 2 weeks in advance saves up to 15% on booking fees.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200 space-y-1">
              <h4 className="font-bold text-emerald-900">Currency Rate Lock</h4>
              <p className="text-emerald-800 leading-relaxed">
                JPY exchange rate is currently favorable ($1 = 152 JPY).
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
