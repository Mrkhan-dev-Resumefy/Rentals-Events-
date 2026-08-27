import React from 'react';
import { Calendar, Phone, MapPin, Award, CheckCircle, ArrowRight, ShieldCheck, Mail } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { SERVICES_DATA } from '../data/servicesData';

interface FooterProps {
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenBookingModal: (serviceId?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBookingModal,
}) => {
  return (
    <footer className="bg-[#0b192c]/95 backdrop-blur-2xl text-slate-300 border-t border-white/15 pt-14 pb-12 relative overflow-hidden">
      {/* Subtle Liquid Ambient Shimmer */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
        {/* Top Call to Action Banner - Apple Liquid Glass Dark Card */}
        <div className="liquid-glass-dark rounded-3xl p-6 sm:p-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-blue-300 bg-blue-500/20 px-3 py-1 rounded-full border border-blue-400/30 backdrop-blur-md">
                <Award className="w-3.5 h-3.5 text-blue-400" />
                <span>Commercial Bouncy Castle &amp; Popcorn Rentals</span>
              </span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Ready to Lock in Your Event Date?
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl leading-relaxed">
              Check real-time equipment availability and hold your setup delivery window directly in our Calendly schedule with zero double-booking risk.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button
              onClick={() => onOpenBookingModal()}
              className="liquid-btn-primary px-6 py-3.5 text-white font-bold text-xs sm:text-sm rounded-2xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              <span>Check Dates on Calendly</span>
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="px-6 py-3.5 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-xs sm:text-sm rounded-2xl backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Contact Dispatch</span>
            </button>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div
              onClick={() => onNavigate('home')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-b from-blue-500 to-[#0b192c] p-[1px] shadow-[0_8px_20px_-4px_rgba(37,99,235,0.5)]">
                <div className="w-full h-full rounded-[15px] bg-[#0b192c]/90 backdrop-blur-md flex items-center justify-center text-white font-extrabold text-lg">
                  <span className="text-blue-400">E</span>
                </div>
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                EventsRentals<span className="text-blue-400">.io</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Clean commercial bouncy castles and vintage retro popcorn carts. Delivered, safely anchored, and sanitized for your special day.
            </p>

            <div className="space-y-2 text-xs text-slate-300">
              <p className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{BUSINESS_CONFIG.serviceAreaPlaceholder}</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{BUSINESS_CONFIG.phonePlaceholder}</span>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>{BUSINESS_CONFIG.emailPlaceholder}</span>
              </p>
            </div>
          </div>

          {/* Our 2 Services */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-blue-400">
              Our 2 Rental Services
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              {SERVICES_DATA.map((service) => (
                <li key={service.id}>
                  <button
                    onClick={() => onNavigate('service-detail', service.id)}
                    className="hover:text-white transition-colors cursor-pointer text-left"
                  >
                    {service.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className="hover:text-white text-blue-300 font-semibold transition-colors cursor-pointer"
                >
                  Ultimate Bounce &amp; Pop Combo
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-white transition-colors cursor-pointer text-slate-300 font-medium"
                >
                  View Full Technical Specs →
                </button>
              </li>
            </ul>
          </div>

          {/* Explore Pages */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-blue-400">
              Explore Pages
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Photo Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('how-it-works')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  How Booking Works
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('reviews')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Verified Reviews
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('safety')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Sanitization &amp; Safety Standards
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Frequently Asked Questions
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Contact Dispatch
                </button>
              </li>
            </ul>
          </div>

          {/* Dispatch Standards */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-xs uppercase tracking-wider text-blue-400">
              Rental Guarantees
            </h4>
            <div className="space-y-2 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Commercial 18oz Lead-Free Vinyl</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Hospital-Grade EPA Sanitization</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>18&quot; Steel Stakes &amp; Calibrated Sandbags</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>100% Free Bad-Weather Rescheduling</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <span>Punctual Delivery 45–60 Min Early</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} EventsRentals.io. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigate('cancellation')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Weather &amp; Reschedule Policy
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
