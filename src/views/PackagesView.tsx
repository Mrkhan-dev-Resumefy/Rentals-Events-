import React from 'react';
import { Sparkles, Calendar, CheckCircle2, Users, Clock, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { PACKAGES_DATA } from '../data/packagesData';

interface PackagesViewProps {
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenBookingModal: (serviceId?: string, preselectedDate?: string, preselectedServices?: string[]) => void;
}

export const PackagesView: React.FC<PackagesViewProps> = ({
  onNavigate,
  onOpenBookingModal,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 text-blue-700" />
          <span>All-In-One Party Package</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#0b192c] tracking-tight">
          Ultimate Bounce &amp; Pop Party Combo
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          The complete children&apos;s entertainment bundle. Pair our sanitized commercial bouncy castle with our vintage retro popcorn cart for maximum fun and combo savings.
        </p>
      </div>

      {/* Featured Combo Card */}
      {PACKAGES_DATA.map((pkg) => (
        <div
          key={pkg.id}
          className="bg-white rounded-3xl overflow-hidden border border-blue-200 ring-2 ring-blue-100 shadow-xl p-8 sm:p-12 space-y-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual & Highlights */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden shadow-md">
                <img
                  src={pkg.image}
                  alt={pkg.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#0b192c] text-blue-300 text-xs font-bold uppercase px-3 py-1 rounded-md shadow-md border border-slate-800">
                  {pkg.badge}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-3.5 rounded-2xl border border-slate-200 text-xs">
                <div className="flex items-center gap-2 text-slate-700">
                  <Users className="w-4 h-4 text-blue-700 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Party Size</span>
                    <span className="font-bold text-slate-800">{pkg.estimatedGuests}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-slate-700">
                  <Clock className="w-4 h-4 text-blue-700 shrink-0" />
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase font-bold">Duration</span>
                    <span className="font-bold text-slate-800">{pkg.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Details & Inclusions */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <h2 className="text-3xl font-black text-[#0b192c] tracking-tight">
                  {pkg.name}
                </h2>
                <p className="text-sm font-semibold text-blue-900 mt-1">
                  {pkg.tagline}
                </p>
                <p className="text-sm text-slate-600 leading-relaxed mt-3">
                  {pkg.description}
                </p>
              </div>

              <div className="space-y-2.5">
                <p className="text-xs font-bold uppercase tracking-wider text-[#0b192c]">
                  Everything Included in the Combo:
                </p>
                <ul className="space-y-2 text-xs sm:text-sm text-slate-700">
                  {pkg.includedServices.map((inc, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{inc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center gap-3 border-t border-slate-100">
                <button
                  onClick={() => onOpenBookingModal(undefined, undefined, ['standard-jumping-castle', 'standard-popcorn-cart'])}
                  className="w-full sm:w-auto px-8 py-4 bg-[#0b192c] hover:bg-[#122543] active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>Book Party Combo on Calendly</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('services')}
                  className="w-full sm:w-auto px-6 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer text-center"
                >
                  View Individual Specs
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Trust Highlights for Combos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto font-bold">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-[#0b192c] text-sm">Single Coordinated Delivery</h3>
          <p className="text-xs text-slate-600">Both the castle and popcorn cart arrive together 45–60 min before your party start.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto font-bold">
            <Check className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-[#0b192c] text-sm">100 Fresh Servings Included</h3>
          <p className="text-xs text-slate-600">Pre-measured popping corn, golden coconut oil, theater seasoning, and vintage striped bags.</p>
        </div>

        <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-2">
          <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto font-bold">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-[#0b192c] text-sm">Free Weather Rescheduling</h3>
          <p className="text-xs text-slate-600">Zero penalty if storms or rain occur on your party morning. Move to any available open date.</p>
        </div>
      </div>
    </div>
  );
};
