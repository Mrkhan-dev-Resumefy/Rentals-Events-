import React from 'react';
import { 
  ShieldCheck, Sparkles, 
  Wind, Zap, CheckCircle2, CloudRain, Calendar, ArrowRight 
} from 'lucide-react';
import { SAFETY_PILLARS, SAFETY_CHECKLIST, WEATHER_POLICY } from '../data/safetyData';

interface SafetyViewProps {
  onNavigate: (view: string) => void;
  onOpenBookingModal: () => void;
}

export const SafetyView: React.FC<SafetyViewProps> = ({ onNavigate, onOpenBookingModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-28">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
          <span>Equipment Standards &amp; Sanitization</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#0b192c] tracking-tight">
          Commercial Safety &amp; Sanitization
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          From commercial-grade heavy-duty vinyl and 18-inch forged steel ground stakes to hospital-grade child-safe sanitization, we take equipment care seriously.
        </p>
      </div>

      {/* Primary Sanitization & Rigging Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-900 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>100% Child-Safe EPA Botanical Sanitization</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b192c]">
            Hospital-Grade Hygiene &amp; Rigorous Site Setup
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Every bouncy castle and popcorn cart kettle is thoroughly cleaned, vacuumed, and treated with non-toxic botanical virucide solutions before and after every booking. Our dispatch drivers anchor equipment with deep 18-inch forged steel stakes on grass lawns or 150lb calibrated sandbag ballasts on hard surfaces.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Commercial 18oz lead-free, flame-retardant vinyl</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Full on-site GFCI electrical circuit safety testing</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-4 bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-3 text-center">
          <ShieldCheck className="w-10 h-10 text-blue-700 mx-auto" />
          <h3 className="font-bold text-sm text-[#0b192c]">Zero-Penalty Weather Policy</h3>
          <p className="text-xs text-slate-600">
            If severe rain or high winds over 15 mph are forecast on your party morning, reschedule for free with zero change fees.
          </p>
          <button
            onClick={() => onNavigate('cancellation')}
            className="w-full py-2.5 bg-[#0b192c] hover:bg-[#122543] text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-xs"
          >
            Read Weather Policy Details
          </button>
        </div>
      </div>

      {/* Safety Pillars Grid */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Protocols &amp; Checklists
          </span>
          <h2 className="text-3xl font-black text-[#0b192c]">
            Equipment Maintenance Standards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {SAFETY_PILLARS.map((pillar, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold border border-blue-100">
                  {idx === 0 && <ShieldCheck className="w-5 h-5" />}
                  {idx === 1 && <Sparkles className="w-5 h-5" />}
                  {idx === 2 && <Wind className="w-5 h-5" />}
                  {idx === 3 && <Zap className="w-5 h-5" />}
                </div>
                <h3 className="font-bold text-[#0b192c] text-base leading-snug">
                  {pillar.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {pillar.description}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold text-blue-900 uppercase tracking-wider bg-blue-50 px-2.5 py-1 rounded-md border border-blue-100 inline-block">
                  {pillar.badge}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Operational Checklist & Weather Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-sm space-y-6">
          <div className="space-y-1">
            <h3 className="text-2xl font-black text-[#0b192c]">
              Driver Setup &amp; Inspection Checklist
            </h3>
            <p className="text-xs text-slate-500">
              Completed by our dispatch crew at every event before handover.
            </p>
          </div>

          <ul className="space-y-3">
            {SAFETY_CHECKLIST.map((item, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                  ✓
                </div>
                <span className="text-xs sm:text-sm text-slate-700 font-medium leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#0b192c] text-white rounded-3xl p-8 border border-slate-800 shadow-xl space-y-4">
            <div className="flex items-center gap-2 text-blue-400">
              <CloudRain className="w-5 h-5" />
              <span className="text-xs font-bold uppercase tracking-wider">Weather Protocols</span>
            </div>
            <h3 className="text-2xl font-black text-white">
              {WEATHER_POLICY.headline}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              {WEATHER_POLICY.description}
            </p>
            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
              <p><strong className="text-white">Wind Cutoff:</strong> {WEATHER_POLICY.windThreshold}</p>
              <p><strong className="text-white">Rain Policy:</strong> {WEATHER_POLICY.rainPolicy}</p>
              <p><strong className="text-white">Safe Temperature:</strong> {WEATHER_POLICY.temperature}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-3 text-center">
            <h4 className="font-bold text-[#0b192c] text-base">Ready to Book with Confidence?</h4>
            <p className="text-xs text-slate-600">
              Check equipment availability and hold your event date on our calendar.
            </p>
            <button
              onClick={onOpenBookingModal}
              className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book with Calendly</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
