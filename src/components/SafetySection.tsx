import React from 'react';
import { ShieldCheck, CheckCircle2, CloudRain, Zap, Sparkles } from 'lucide-react';
import { SAFETY_CHECKLIST, WEATHER_POLICY } from '../data/safetyData';

export const SafetySection: React.FC = () => {
  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/5 p-6 sm:p-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-100 pb-6">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>Rigging, Sanitization &amp; Weather Standards</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-[#0b192c] tracking-tight">
            Commercial Standards for Complete Peace of Mind
          </h3>
        </div>

        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 text-blue-900 px-4 py-2 rounded-xl text-xs font-bold">
          <Sparkles className="w-4 h-4 text-blue-600" />
          <span>Hospital-Grade EPA Sanitization</span>
        </div>
      </div>

      {/* 4 Key Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 hover:border-blue-300 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-[#0b192c] text-blue-400 flex items-center justify-center font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-[#0b192c]">Commercial Grade Rigging</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            18oz lead-free, fire-retardant commercial vinyl. Anchored with 18-inch heavy duty steel ground stakes or 150lb sandbag ballasts.
          </p>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 hover:border-blue-300 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-[#0b192c] text-blue-400 flex items-center justify-center font-bold">
            <Sparkles className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-[#0b192c]">Sanitized Before Every Hire</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Every bouncy castle and popcorn cart kettle is thoroughly sanitized with EPA-approved, 100% kid-safe botanical solutions.
          </p>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 hover:border-blue-300 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-[#0b192c] text-blue-400 flex items-center justify-center font-bold">
            <CloudRain className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-[#0b192c]">Weather Protection</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Free date rescheduling up to 7:00 AM on event day in cases of severe torrential rain or sustained high winds exceeding 15mph.
          </p>
        </div>

        <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-2 hover:border-blue-300 transition-colors">
          <div className="w-9 h-9 rounded-xl bg-[#0b192c] text-blue-400 flex items-center justify-center font-bold">
            <Zap className="w-5 h-5" />
          </div>
          <h4 className="font-bold text-sm text-[#0b192c]">GFCI Electrical Tested</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            Waterproof commercial GFCI extension cords and heavy-duty blowers tested on-site before handing over operation to the host.
          </p>
        </div>
      </div>

      {/* Safety checklist grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2 border-t border-slate-100">
        <div className="space-y-3">
          <h4 className="font-bold text-sm text-[#0b192c] flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>Inspection &amp; Operational Standards</span>
          </h4>
          <ul className="space-y-2 text-xs text-slate-600">
            {SAFETY_CHECKLIST.slice(0, 4).map((item, idx) => (
              <li key={idx} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-xl border border-slate-200">
                <span className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-[10px] font-bold shrink-0 mt-0.5">
                  ✓
                </span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-bold text-sm text-[#0b192c] flex items-center gap-2">
            <CloudRain className="w-4 h-4 text-blue-700" />
            <span>Weather Policy &amp; Wind Thresholds</span>
          </h4>
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 text-xs text-slate-600">
            <p>
              <strong className="text-[#0b192c]">Wind Safety Limit:</strong> {WEATHER_POLICY.windThreshold}
            </p>
            <p>
              <strong className="text-[#0b192c]">Rain &amp; Storms:</strong> {WEATHER_POLICY.rainPolicy}
            </p>
            <p className="text-slate-500 text-[11px] pt-1">
              Your safety comes first. We never force outdoor inflatable setups in hazardous weather conditions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
