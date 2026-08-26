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
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200/80 py-2.5'
          : 'bg-white border-b border-slate-200/80 py-3'
      }`}
    >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand & Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 rounded-xl bg-[#0b192c] flex items-center justify-center text-white font-black text-lg shadow-xs border border-slate-800 group-hover:bg-[#122543] transition-colors">
              <span className="text-blue-400">E</span>
            </div>

            <div>
              <span className="text-xl font-black tracking-tight text-[#0b192c]">
                EventsRentals<span className="text-blue-600">.io</span>
              </span>
              <p className="text-[10px] text-slate-500 font-medium leading-none hidden sm:block">
                Bouncy Castles &amp; Popcorn Carts
              </p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/90 p-1.5 rounded-2xl border border-slate-200/80 text-xs font-semibold text-slate-700">
            {navLinks.map((link) => (
              <button
                key={link.id}
                type="button"
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer ${
                  currentView === link.id
                    ? 'bg-white text-[#0b192c] shadow-xs font-bold'
                    : 'text-slate-600 hover:text-[#0b192c] hover:bg-white/50'
                }`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Primary Action Button */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => onOpenBookingModal()}
              className="px-5 py-2.5 bg-[#0b192c] hover:bg-[#122543] active:scale-95 text-white font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Book Event</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => onOpenBookingModal()}
              className="px-3.5 py-2 bg-[#0b192c] text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              <span>Book</span>
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 border border-slate-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-slate-200 shadow-xl px-4 py-4 space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm font-semibold text-slate-700">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`text-left px-3 py-2.5 rounded-xl border cursor-pointer transition-colors ${
                    currentView === link.id
                      ? 'bg-blue-50 border-blue-200 text-blue-900 font-bold'
                      : 'border-slate-100 hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {link.label}
                </button>
              ))}
            </div>

            {/* Quick 2 Services Links */}
            <div className="pt-2 border-t border-slate-100 space-y-1">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-1">
                Our 2 Rental Services
              </p>
              {SERVICES_DATA.map((service) => (
                <button
                  key={service.id}
                  onClick={() => handleNavClick('service-detail', service.id)}
                  className="w-full text-left px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between"
                >
                  <span>{service.name}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBookingModal();
                }}
                className="w-full py-3 bg-[#0b192c] text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 shadow-md cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Check Live Availability (Calendly)</span>
              </button>
            </div>
          </div>
        )}
      </header>
  );
};
