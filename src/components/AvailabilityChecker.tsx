import React, { useState } from 'react';
import { Calendar, ArrowRight, ShieldCheck, CheckCircle2, Search } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

interface AvailabilityCheckerProps {
  onCheckAvailability: (selectedDate: string, serviceId?: string) => void;
}

export const AvailabilityChecker: React.FC<AvailabilityCheckerProps> = ({
  onCheckAvailability,
}) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [guests, setGuests] = useState('25-50');

  const todayStr = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate) {
      // Default to upcoming Saturday if left blank
      const nextSat = new Date();
      nextSat.setDate(nextSat.getDate() + ((6 - nextSat.getDay() + 7) % 7 || 7));
      onCheckAvailability(nextSat.toISOString().split('T')[0], selectedService !== 'all' ? selectedService : undefined);
      return;
    }
    onCheckAvailability(selectedDate, selectedService !== 'all' ? selectedService : undefined);
  };

  return (
    <div className="liquid-glass p-6 sm:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-6 pb-4 border-b border-white/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="liquid-glass-pill inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-blue-900 text-xs font-bold uppercase tracking-wider">
              <Search className="w-3.5 h-3.5 text-blue-700" />
              <span>Real-Time Availability Checker</span>
            </span>
            <span className="text-xs text-slate-500 hidden sm:inline">• Live Calendly Synchronization</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#0b192c] tracking-tight">
            Check Equipment Delivery Dates
          </h3>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 bg-emerald-50/80 backdrop-blur-md border border-emerald-200/80 px-3.5 py-1.5 rounded-full w-fit shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>2026 Reservation Slots Open</span>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
        {/* Service Dropdown */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Select Equipment
          </label>
          <select
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
            className="liquid-glass-input w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 cursor-pointer"
          >
            <option value="all">★ All Equipment / Combo Package</option>
            {SERVICES_DATA.map(s => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Date Selector */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Target Event Date
          </label>
          <input
            type="date"
            min={todayStr}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="liquid-glass-input w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 cursor-pointer"
          />
        </div>

        {/* Estimated Guests */}
        <div className="space-y-1.5">
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
            Estimated Guests
          </label>
          <select
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            className="liquid-glass-input w-full px-4 py-3 rounded-2xl text-xs sm:text-sm font-semibold text-slate-900 cursor-pointer"
          >
            <option value="10-25">10 – 25 Guests (Backyard Party)</option>
            <option value="25-50">25 – 50 Guests (Standard Party)</option>
            <option value="50-100">50 – 100 Guests (Medium Event)</option>
            <option value="100+">100+ Guests (School / Community)</option>
          </select>
        </div>

        {/* Submit Action */}
        <div>
          <button
            type="submit"
            className="liquid-btn-dark w-full py-3.5 px-6 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>Check Calendly Availability</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </form>

      {/* Trust Line */}
      <div className="mt-5 pt-3 border-t border-white/60 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            Zero Double-Booking Risk
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-700">
            <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
            100% Free Bad-Weather Rescheduling
          </span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono bg-white/40 px-2.5 py-0.5 rounded-full border border-white/60">
          Instant Dispatch Hold • No Waiting
        </span>
      </div>
    </div>
  );
};
