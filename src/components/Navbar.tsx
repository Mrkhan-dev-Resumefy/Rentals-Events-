import React, { useState, useEffect } from 'react';
import { 
  Menu, X, Calendar, ArrowRight 
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenBookingModal: (serviceId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  onOpenBookingModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (view: string, serviceId?: string) => {
    onNavigate(view, serviceId);
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Rentals & Specs' },
    { id: 'packages', label: 'Party Combo' },
    { id: 'gallery', label: 'Photo Gallery' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'reviews', label: 'Reviews' },
    { id: 'safety', label: 'Sanitization & Safety' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/75 backdrop-blur-2xl shadow-[0_12px_40px_-10px_rgba(11,25,44,0.08)] border-b border-white/80 py-2.5'
          : 'bg-white/60 backdrop-blur-xl border-b border-white/70 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Apple Liquid Glass Brand & Logo */}
        <div
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          {/* Crystalline Liquid Emblem */}
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-b from-blue-600 via-blue-700 to-[#0b192c] p-[1px] shadow-[0_8px_20px_-4px_rgba(37,99,235,0.4),inset_0_1px_1px_rgba(255,255,255,0.6)] group-hover:scale-105 transition-transform duration-300">
            <div className="w-full h-full rounded-[15px] bg-[#0b192c]/85 backdrop-blur-md flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-white/40 pointer-events-none" />
              <span className="text-white font-black text-lg tracking-tighter drop-shadow-sm">
                E<span className="text-blue-400">.</span>
              </span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl font-black tracking-tight text-[#0b192c]">
                EventsRentals<span className="text-blue-600 font-extrabold">.io</span>
              </span>
              <span className="hidden xl:inline-flex items-center px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider bg-blue-50/80 text-blue-800 border border-blue-200/70 backdrop-blur-md">
                Commercial Fleet
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none hidden sm:block">
              Bouncy Castles &amp; Popcorn Carts
            </p>
          </div>
        </div>

        {/* Desktop Liquid Glass Navigation Pills */}
        <nav className="hidden lg:flex items-center gap-1 bg-white/60 backdrop-blur-xl p-1.5 rounded-2xl border border-white/90 shadow-[0_4px_16px_rgba(11,25,44,0.04),inset_0_1px_1px_rgba(255,255,255,0.9)] text-xs font-semibold text-slate-700">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`relative px-3.5 py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-white text-[#0b192c] font-bold shadow-[0_2px_8px_rgba(11,25,44,0.08),inset_0_1px_1px_rgba(255,255,255,0.95)] border border-white/80'
                    : 'text-slate-600 hover:text-[#0b192c] hover:bg-white/50'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Primary Action Button - Apple Liquid Glass Style */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={() => onOpenBookingModal()}
            className="liquid-btn-dark px-5 py-2.5 text-white font-bold text-xs rounded-xl flex items-center gap-2 cursor-pointer active:scale-95"
          >
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>Book Equipment</span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={() => onOpenBookingModal()}
            className="liquid-btn-primary px-3.5 py-2 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
          >
            <Calendar className="w-3.5 h-3.5 text-white" />
            <span>Book</span>
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 bg-white/70 backdrop-blur-md hover:bg-white border border-white/90 shadow-xs cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Liquid Glass Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/85 backdrop-blur-2xl border-b border-white/80 shadow-2xl px-4 py-4 space-y-3 animate-fast-in">
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-slate-700">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left px-3.5 py-2.5 rounded-xl border cursor-pointer transition-all ${
                  currentView === link.id
                    ? 'bg-white border-blue-300 text-blue-950 font-bold shadow-[0_2px_8px_rgba(37,99,235,0.08)]'
                    : 'bg-white/50 border-white/80 hover:bg-white text-slate-700'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Quick 2 Services Links */}
          <div className="pt-2 border-t border-slate-200/60 space-y-1">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 px-1">
              Commercial Fleet
            </p>
            {SERVICES_DATA.map((service) => (
              <button
                key={service.id}
                onClick={() => handleNavClick('service-detail', service.id)}
                className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-800 bg-white/40 hover:bg-white/80 rounded-xl border border-white/60 flex items-center justify-between transition-colors"
              >
                <span>{service.name}</span>
                <ArrowRight className="w-3.5 h-3.5 text-blue-600" />
              </button>
            ))}
          </div>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBookingModal();
              }}
              className="liquid-btn-dark w-full py-3 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 cursor-pointer shadow-md"
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Check Live Calendly Schedule</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
