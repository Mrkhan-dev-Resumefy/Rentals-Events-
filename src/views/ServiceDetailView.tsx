import React from 'react';
import { ArrowLeft, Calendar, Sparkles, ShieldCheck } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServiceItem } from '../types';
import { SafetySection } from '../components/SafetySection';

interface ServiceDetailViewProps {
  serviceId: string;
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenBookingModal: (serviceId?: string, preselectedDate?: string) => void;
}

export const ServiceDetailView: React.FC<ServiceDetailViewProps> = ({
  serviceId,
  onNavigate,
  onOpenBookingModal,
}) => {
  const service: ServiceItem = SERVICES_DATA.find(s => s.id === serviceId) || SERVICES_DATA[0];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-14 pb-24">
      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button
          onClick={() => onNavigate('services')}
          className="flex items-center gap-1 text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Equipment</span>
        </button>
        <span>/</span>
        <span className="capitalize">{service.category}</span>
        <span>/</span>
        <span className="text-[#0b192c] truncate max-w-xs">{service.name}</span>
      </div>

      {/* Main Hero & Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          <div className="relative aspect-16/10 rounded-3xl overflow-hidden shadow-lg border border-slate-200 bg-slate-100">
            <img
              src={service.heroImage}
              alt={service.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-transparent" />
            {service.badge && (
              <div className="absolute top-4 left-4 bg-[#0b192c] text-blue-300 text-xs font-bold uppercase px-3 py-1 rounded-xl shadow-md border border-slate-800">
                {service.badge}
              </div>
            )}
          </div>

          {/* Secondary images */}
          {service.gallery && service.gallery.length > 0 && (
            <div className="grid grid-cols-3 gap-3">
              {service.gallery.map((imgUrl, i) => (
                <div
                  key={i}
                  className="relative aspect-4/3 rounded-2xl overflow-hidden border border-slate-200 shadow-sm bg-slate-100 hover:scale-105 transition-all duration-200 group cursor-pointer"
                >
                  <img
                    src={imgUrl}
                    alt={`${service.name} preview ${i + 1}`}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Key Details & Booking Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              <span className="capitalize">{service.category}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#0b192c] tracking-tight leading-tight">
              {service.name}
            </h1>
            <p className="text-slate-600 text-sm leading-relaxed">
              {service.fullDescription}
            </p>
          </div>

          {/* Booking Action Card */}
          <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div>
                <span className="text-xs text-slate-500">Dispatch Status</span>
                <p className="font-bold text-sm text-emerald-800 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Available for 2026 Bookings
                </p>
              </div>
              <span className="text-xs font-mono bg-blue-50 text-blue-900 px-2.5 py-1 rounded-lg border border-blue-200 font-bold">
                Calendly Direct
              </span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Check real-time date availability on our Calendly schedule or submit a direct delivery request.
            </p>

            <div className="space-y-2 pt-1">
              <button
                onClick={() => onOpenBookingModal(service.id)}
                className="w-full py-3.5 px-4 bg-[#0b192c] hover:bg-[#122543] active:scale-95 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>{service.ctaText}</span>
              </button>

              <button
                onClick={() => onNavigate('contact')}
                className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl border border-slate-200 active:scale-95 transition-colors cursor-pointer"
              >
                Ask Dispatch a Question About This Item
              </button>
            </div>

            <div className="pt-2 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
              <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Free bad-weather rescheduling</span>
              <span>• Sanitized & certified</span>
            </div>
          </div>

          {/* Recommended For List */}
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200 space-y-2.5">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#0b192c]">
              Ideal Occasions & Event Types:
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {service.recommendedFor.map((rec, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 bg-white text-slate-700 rounded-lg text-xs font-semibold border border-slate-200 shadow-sm"
                >
                  {rec}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Specifications & Setup Requirements */}
      <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-md space-y-6">
        <div className="border-b border-slate-100 pb-4">
          <h3 className="text-2xl font-black text-[#0b192c]">
            Technical Specifications & Venue Requirements
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Please ensure your venue meets these clear guidelines prior to arrival.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {service.specifications.map((spec, i) => (
            <div key={i} className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
              <span className="text-[11px] uppercase font-bold text-blue-900 block">
                {spec.label}
              </span>
              <p className="text-sm font-semibold text-[#0b192c]">
                {spec.value}
              </p>
            </div>
          ))}
        </div>

        {/* Requirements Details */}
        {service.requirements && (
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <h4 className="text-sm font-bold uppercase tracking-wider text-blue-900">
              Site & Power Logistics
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-[#0b192c] block mb-1">Space:</span>
                <span className="text-slate-600">{service.requirements.space}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-[#0b192c] block mb-1">Surface:</span>
                <span className="text-slate-600">{service.requirements.surface}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-[#0b192c] block mb-1">Power:</span>
                <span className="text-slate-600">{service.requirements.power}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-[#0b192c] block mb-1">Access:</span>
                <span className="text-slate-600">{service.requirements.access}</span>
              </div>
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200">
                <span className="font-bold text-[#0b192c] block mb-1">Weather:</span>
                <span className="text-slate-600">{service.requirements.weather}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Safety Section */}
      <SafetySection />

      {/* Item FAQs if present */}
      {service.faqs && service.faqs.length > 0 && (
        <div className="space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
              Specific Inquiries
            </span>
            <h3 className="text-2xl font-bold text-[#0b192c]">
              Questions About {service.name}
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {service.faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-2"
              >
                <h4 className="font-bold text-sm text-[#0b192c]">{faq.question}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
