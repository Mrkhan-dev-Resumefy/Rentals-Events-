import React from 'react';
import { 
  ShieldCheck, Clock, Sparkles, Calendar, 
  Warehouse, Users, CheckCircle2 
} from 'lucide-react';
import { ABOUT_DATA } from '../data/aboutData';
import { BUSINESS_CONFIG } from '../data/businessConfig';

interface AboutViewProps {
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenBookingModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onOpenBookingModal }) => {
  const stats = [
    { value: '450+', label: 'Events Hosted' },
    { value: '100%', label: 'Punctual Dispatch' },
    { value: '5.0★', label: 'Average Rating' },
    { value: '2 hrs', label: 'Response Guarantee' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20 pb-28">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <Warehouse className="w-3.5 h-3.5 text-blue-700" />
          <span>Our Story &amp; Fleet Operations</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#0b192c] tracking-tight">
          Commercial Reliability. Spotless Hygiene.
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          {ABOUT_DATA.tagline}
        </p>
      </div>

      {/* Origin & Mission Highlight */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-sm grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
              Why We Started
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#0b192c]">
              Built to Eliminate Event Day Stress
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {ABOUT_DATA.mission}
            </p>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              {ABOUT_DATA.story}
            </p>
          </div>

          <div className="pt-2 flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>18&quot; Forged Steel Ground Staking</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Hospital-Grade Botanical Sanitization</span>
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Punctual Setup Guarantee</span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="lg:col-span-5 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-200 space-y-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-blue-900">
            Operations by the Numbers
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
                <span className="text-2xl sm:text-3xl font-black text-[#0b192c] block font-mono">
                  {stat.value}
                </span>
                <span className="text-xs font-semibold text-slate-600 mt-1 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
          <div className="p-4 bg-blue-50/80 rounded-2xl border border-blue-100 text-xs text-blue-950 flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-blue-700 shrink-0" />
            <span>Serving {BUSINESS_CONFIG.serviceAreaPlaceholder} with primary &amp; surrounding suburb delivery.</span>
          </div>
        </div>
      </div>

      {/* 4 Core Pillars */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Our Standard
          </span>
          <h2 className="text-3xl font-black text-[#0b192c]">
            The EventsRentals.io Operating Principles
          </h2>
          <p className="text-slate-600 text-sm">
            Every bouncy castle and popcorn cart is held to rigorous commercial benchmarks.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {ABOUT_DATA.pillars.map((val, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md hover:border-blue-300 transition-all duration-200 space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold border border-blue-100">
                {idx === 0 && <Clock className="w-5 h-5" />}
                {idx === 1 && <ShieldCheck className="w-5 h-5" />}
                {idx === 2 && <Sparkles className="w-5 h-5" />}
                {idx === 3 && <Calendar className="w-5 h-5" />}
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-blue-700 tracking-wider block">
                  {val.subtitle}
                </span>
                <h3 className="font-bold text-[#0b192c] text-base">{val.title}</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">{val.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team / Leadership */}
      <div className="space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-800">
            Leadership
          </span>
          <h2 className="text-3xl font-black text-[#0b192c]">
            Meet the Operations Team
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {ABOUT_DATA.team.map((member, idx) => (
            <div
              key={idx}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs flex items-center gap-5"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
              />
              <div className="space-y-1">
                <h3 className="font-bold text-[#0b192c] text-base">{member.name}</h3>
                <p className="text-xs font-semibold text-blue-700">{member.role}</p>
                <p className="text-xs text-slate-600 leading-relaxed">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-[#0b192c] text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-5 border border-slate-800 shadow-2xl">
        <h3 className="text-2xl sm:text-3xl font-black text-white">
          Ready to Plan Your Next Celebration?
        </h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Hold your event date in under 2 minutes with live Calendly equipment reservations.
        </p>
        <button
          onClick={onOpenBookingModal}
          className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-white" />
          <span>Check Calendly Availability</span>
        </button>
      </div>
    </div>
  );
};
