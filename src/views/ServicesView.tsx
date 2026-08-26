import React from 'react';
import { motion } from 'motion/react';
import { Layers, Calendar, Check, ArrowRight, ShieldCheck, Zap, Truck, CheckCircle2 } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { PACKAGES_DATA } from '../data/packagesData';
import { ServiceItem } from '../types';

interface ServicesViewProps {
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenBookingModal: (serviceId?: string, preselectedDate?: string, preselectedServices?: string[]) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({
  onNavigate,
  onOpenBookingModal,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14 pb-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.45, ease: 'easeOut' }}
        className="text-center max-w-3xl mx-auto space-y-4"
      >
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3.5 h-3.5 text-blue-700" />
          <span>Full Equipment Specifications</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#0b192c] tracking-tight">
          Commercial Bouncy Castle &amp; Popcorn Cart
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Commercial-grade sanitized equipment delivered, anchored, and tested on-site by our punctual dispatch crew. Available individually or bundled in our Party Combo.
        </p>
      </motion.div>

      {/* Services Showcase Cards */}
      <div className="space-y-12">
        {SERVICES_DATA.map((service: ServiceItem, index: number) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.55, delay: index * 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
            className={`bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 flex flex-col ${
              index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'
            } gap-8 items-center hover:border-blue-300 hover:shadow-md transition-all`}
          >
            {/* Left/Right Visual */}
            <div className="w-full lg:w-1/2 aspect-16/10 rounded-2xl overflow-hidden bg-slate-100 relative group shrink-0">
              <img
                src={service.heroImage}
                alt={service.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {service.badge && (
                <div className="absolute top-3 left-3 bg-[#0b192c] text-blue-300 text-xs font-bold uppercase px-3 py-1 rounded-md shadow-md border border-slate-800">
                  {service.badge}
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="w-full lg:w-1/2 space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
                  {service.category === 'inflatables' ? 'Commercial Inflatable' : 'Vintage Concession Station'}
                </span>
                <h2 className="text-2xl sm:text-3xl font-black text-[#0b192c] leading-tight">
                  {service.name}
                </h2>
              </div>

              <p className="text-sm text-slate-600 leading-relaxed">
                {service.fullDescription}
              </p>

              {/* Technical Specifications Grid */}
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs">
                {service.specifications.map((spec, i) => (
                  <div key={i}>
                    <span className="text-[10px] text-slate-500 block uppercase font-bold">{spec.label}</span>
                    <span className="font-semibold text-slate-800">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Key Features Bullets */}
              <div className="space-y-1.5">
                <p className="text-xs font-bold text-[#0b192c] uppercase tracking-wider">Features &amp; Safety:</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600">
                  {service.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex items-center gap-3">
                <button
                  onClick={() => onOpenBookingModal(service.id)}
                  className="px-6 py-3.5 bg-[#0b192c] hover:bg-[#122543] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>{service.ctaText} (Calendly)</span>
                </button>
                <button
                  onClick={() => onNavigate('service-detail', service.id)}
                  className="px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer border border-slate-200"
                >
                  View Full Specs &amp; Requirements →
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Combo Banner */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="bg-gradient-to-r from-[#0b192c] via-[#122543] to-[#0b192c] text-white rounded-3xl p-8 sm:p-10 shadow-lg border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-6"
      >
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-400">Save with Our Party Combo</span>
          <h3 className="text-2xl sm:text-3xl font-black text-white">
            Need Both the Bouncy Castle &amp; Popcorn Cart?
          </h3>
          <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
            Book our Ultimate Bounce &amp; Pop Party Combo for a single coordinated delivery and discounted package pricing.
          </p>
        </div>

        <button
          onClick={() => onNavigate('packages')}
          className="px-7 py-4 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm rounded-xl shadow-md transition-all shrink-0 cursor-pointer flex items-center gap-2"
        >
          <span>View Party Combo</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
};
