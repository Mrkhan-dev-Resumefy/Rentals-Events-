import React from 'react';
import { Sparkles, Calendar, Clock, Truck, FileCheck, Layers, CheckCircle2, ShieldCheck } from 'lucide-react';
import { AvailabilityChecker } from '../components/AvailabilityChecker';

export const HowItWorksView: React.FC<{
  onOpenBookingModal: (serviceId?: string, date?: string) => void;
  onNavigate: (view: string) => void;
}> = ({ onOpenBookingModal, onNavigate }) => {
  const steps = [
    {
      num: '01',
      title: 'Select Equipment or Combo',
      desc: 'Choose our commercial bouncy castle, vintage popcorn cart, or both together in our discounted Ultimate Party Combo.',
      icon: Layers,
      highlight: 'Clear space and electrical requirements provided for your venue.'
    },
    {
      num: '02',
      title: 'Hold Date in Calendly',
      desc: 'Pick your celebration date. Our live Calendly calendar checks real-time inventory and lets you hold your delivery window with zero double-booking.',
      icon: Calendar,
      highlight: 'Instant date reservation with direct dispatch confirmation.'
    },
    {
      num: '03',
      title: 'Confirm Surface & Access',
      desc: 'Tell us your setup surface (grass lawn vs concrete driveway), standard 110V electrical outlet proximity, and preferred delivery time.',
      icon: FileCheck,
      highlight: 'Delivery crew prepares ground stakes or sandbag weights accordingly.'
    },
    {
      num: '04',
      title: 'We Deliver, Stake & Rig',
      desc: 'Our uniformed crew arrives 45 to 60 minutes early to position, anchor with 18" stakes or 150lb sandbags, test the blower, and demonstrate popcorn machine operation.',
      icon: Truck,
      highlight: 'Zero heavy lifting for you — hassle-free teardown when party ends.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <Clock className="w-3.5 h-3.5 text-blue-700" />
          <span>Streamlined 4-Step Process</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#0b192c] tracking-tight">
          How Rental Booking Works
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          We make bouncy castle and popcorn cart rentals transparent, simple, and completely reliable from first booking to final packdown.
        </p>
      </div>

      {/* Steps List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {steps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div
              key={idx}
              className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200 space-y-4 relative overflow-hidden group"
            >
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-2xl bg-[#0b192c] text-blue-400 flex items-center justify-center font-bold">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-4xl font-black text-blue-900 font-mono">
                  {step.num}
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="text-xl font-bold text-[#0b192c]">
                  {step.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-blue-950 font-semibold bg-blue-50/80 p-3 rounded-2xl border border-blue-100">
                <Sparkles className="w-4 h-4 text-blue-700 shrink-0" />
                <span>{step.highlight}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Day-of-Event Timeline Breakdown */}
      <div className="bg-[#0b192c] text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-2xl space-y-6">
        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Day-of Timeline
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white">
            What to Expect on Event Day
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t border-slate-800">
          <div className="space-y-2">
            <span className="text-blue-400 font-mono font-bold text-xs">45–60 MIN BEFORE START</span>
            <h4 className="font-bold text-base text-white">Arrival &amp; Precision Setup</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Driver verifies surface clearance, rolls out the protective ground tarp, positions the bouncy castle, and secures the 18&quot; steel stakes.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-blue-400 font-mono font-bold text-xs">15 MIN BEFORE START</span>
            <h4 className="font-bold text-base text-white">Sanitization &amp; Handover</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Technician conducts child-safe botanical wipe-down, tests continuous blower pressure, sets up the popcorn cart, and explains operation.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-blue-400 font-mono font-bold text-xs">EVENT END TIME</span>
            <h4 className="font-bold text-base text-white">Prompt Deflation &amp; Pickup</h4>
            <p className="text-xs text-slate-300 leading-relaxed">
              Crew returns on time, deflates the castle, packs away extension cords and stakes, collects the popcorn cart, and leaves your lawn clean.
            </p>
          </div>
        </div>
      </div>

      {/* Date Checker & CTA */}
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h3 className="text-2xl font-black text-[#0b192c]">
            Check Equipment Availability for Your Date
          </h3>
          <p className="text-slate-600 text-sm">
            Select your preferred event date to verify slot openings in Calendly.
          </p>
        </div>
        <AvailabilityChecker onCheckAvailability={(date, serviceId) => onOpenBookingModal(serviceId, date)} />
      </div>
    </div>
  );
};
