import React, { useState } from 'react';
import { 
  Sparkles, Calendar, ArrowRight, 
  Users, CheckCircle2, Heart, Award, GraduationCap, Building2, PartyPopper 
} from 'lucide-react';
import { EVENT_TYPES_DATA } from '../data/eventTypesData';
import { EventTypeItem } from '../types';

interface OccasionsViewProps {
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenBookingModal: (serviceId?: string, preselectedDate?: string, preselectedServices?: string[]) => void;
}

export const OccasionsView: React.FC<OccasionsViewProps> = ({
  onNavigate,
  onOpenBookingModal,
}) => {
  const [selectedOccasion, setSelectedOccasion] = useState<string>('all');

  const occasionCategories = [
    { id: 'all', label: 'All Event Types', icon: Sparkles },
    { id: 'birthday-parties', label: 'Birthday Parties', icon: PartyPopper },
    { id: 'school-events', label: 'Schools & Sports Days', icon: GraduationCap },
    { id: 'corporate-events', label: 'Corporate & Picnics', icon: Building2 },
    { id: 'festivals', label: 'Festivals & Fairs', icon: Award },
    { id: 'weddings', label: 'Weddings & Receptions', icon: Heart },
  ];

  const filteredEvents = selectedOccasion === 'all'
    ? EVENT_TYPES_DATA
    : EVENT_TYPES_DATA.filter(item => item.id === selectedOccasion || item.slug === selectedOccasion);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-28">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <PartyPopper className="w-3.5 h-3.5 text-blue-700" />
          <span>Curated Event Solutions</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#0b192c] tracking-tight">
          Tailored Rentals for Every Occasion
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          From high-energy elementary school carnivals to elegant corporate retreats and backyard birthday wonderlands, we coordinate the ideal equipment and catering packages.
        </p>
      </div>

      {/* Occasion Filter Tabs */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {occasionCategories.map(cat => {
          const Icon = cat.icon;
          const isActive = selectedOccasion === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedOccasion(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                isActive
                  ? 'bg-[#0b192c] text-white shadow-sm'
                  : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-blue-300' : 'text-blue-700'}`} />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Occasions Grid */}
      <div className="space-y-12">
        {filteredEvents.map((occasion: EventTypeItem, index: number) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={occasion.id}
              className="bg-white rounded-3xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md hover:border-blue-300 transition-all duration-200 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-8"
            >
              {/* Image Column */}
              <div className={`lg:col-span-6 relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-100 ${
                isEven ? 'lg:order-1' : 'lg:order-2'
              }`}>
                <img
                  src={occasion.image}
                  alt={occasion.name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white">
                  <span className="text-xs font-semibold px-2.5 py-1 bg-black/60 backdrop-blur-xs rounded-lg text-blue-300">
                    {occasion.attendeeRange}
                  </span>
                  <span className="text-xs font-medium text-slate-200">
                    Turnkey Package Available
                  </span>
                </div>
              </div>

              {/* Text / Action Column */}
              <div className={`lg:col-span-6 space-y-5 ${
                isEven ? 'lg:order-2' : 'lg:order-1'
              }`}>
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700">
                    <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                    <span>{occasion.tagline}</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black text-[#0b192c]">
                    {occasion.name}
                  </h2>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    {occasion.description}
                  </p>
                </div>

                {/* Popular Inclusions */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0b192c] block">
                    Recommended Equipment &amp; Services:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {occasion.popularServices.map((srv, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white text-slate-800 rounded-lg text-xs font-semibold border border-slate-200 shadow-xs flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>{srv}</span>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Logistics Highlight & CTAs */}
                <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                  <button
                    onClick={() => onOpenBookingModal()}
                    className="flex-1 py-3 px-4 bg-[#0b192c] hover:bg-[#122543] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-blue-400" />
                    <span>Check Date for {occasion.name.split(' ')[0]}</span>
                  </button>

                  <button
                    onClick={() => onNavigate('packages')}
                    className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs sm:text-sm rounded-xl border border-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Curated Packages</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Custom Consultation Strip */}
      <div className="bg-gradient-to-r from-slate-900 via-[#0b192c] to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
            Custom Event Coordination
          </span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Hosting a Large-Scale Festival or Unique Venue?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Our dispatch specialists create custom layouts, coordinate multi-truck villages, provide power distribution, and draft risk assessments.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <button
            onClick={() => onNavigate('calculator')}
            className="px-6 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all cursor-pointer text-center"
          >
            Use Instant Estimator
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-6 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs sm:text-sm rounded-xl border border-slate-700 transition-colors cursor-pointer text-center"
          >
            Message Dispatch
          </button>
        </div>
      </div>
    </div>
  );
};
