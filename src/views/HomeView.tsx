import React, { useState } from 'react';
import { 
  Calendar, ArrowRight, ShieldCheck, Clock, CheckCircle2, 
  Star, HelpCircle, ChevronDown, Check, Layers, Award, Sparkles 
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { PACKAGES_DATA } from '../data/packagesData';
import { TESTIMONIALS_DATA, FAQ_DATA } from '../data/faqData';
import { AvailabilityChecker } from '../components/AvailabilityChecker';
import { GallerySection } from '../components/GallerySection';
import { SafetySection } from '../components/SafetySection';
import heroMontageImg from '../assets/images/regenerated_image_1787122820695.jpg';

interface HomeViewProps {
  onNavigate: (view: string, serviceId?: string) => void;
  onOpenBookingModal: (serviceId?: string, preselectedDate?: string, preselectedServices?: string[]) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenBookingModal,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handleDateCheck = (date: string, serviceId?: string) => {
    onOpenBookingModal(serviceId, date);
  };

  const trustHighlights = [
    {
      title: 'Heavy-Duty 18oz Commercial Vinyl',
      desc: 'Lead-free, flame-retardant commercial grade construction with deep 18" forged steel ground stakes.'
    },
    {
      title: 'Punctual Dispatch Guarantee',
      desc: 'Our crew arrives 45–60 minutes before your party start time for inflation, anchoring, and testing.'
    },
    {
      title: 'Hospital-Grade Sanitization',
      desc: 'Units and popcorn kettles are thoroughly sanitized with non-toxic, kid-safe EPA botanical solutions.'
    },
    {
      title: 'Direct Calendly Sync',
      desc: 'Real-time equipment availability checker with zero double-booking risk and instant date hold.'
    },
    {
      title: 'Free Bad-Weather Rescheduling',
      desc: 'Zero-penalty date rescheduling guaranteed up to 7:00 AM on event day if severe storms occur.'
    },
    {
      title: 'All-Inclusive Supplies & Setup',
      desc: 'Includes high-output safety blower, heavy cords, fresh gourmet corn, popping oil, and retro bags.'
    }
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-20">
      {/* 1. HERO SECTION - Crisp, High-Trust Slate Navy */}
      <section className="relative pt-6 pb-8 lg:pt-10 lg:pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Col: Headlines & Booking Actions */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge Pill - Apple Liquid Glass */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full liquid-glass-pill text-blue-950 text-xs font-bold uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Commercial Fleet • Certified On-Time Dispatch</span>
              </div>

              {/* Main Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-[#0b192c]">
                COMMERCIAL BOUNCY CASTLES &amp; VINTAGE POPCORN CARTS
              </h1>

              {/* Clean Subhead */}
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 font-normal">
                Make your celebration unforgettable. Heavy-duty sanitized bouncy castles and classic movie-theater popcorn carts, delivered and safely anchored for your event.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-2">
                <button
                  onClick={() => onOpenBookingModal()}
                  className="liquid-btn-dark w-full sm:w-auto px-8 py-4 text-white font-bold text-base rounded-2xl flex items-center justify-center gap-2.5 cursor-pointer active:scale-95"
                >
                  <Calendar className="w-5 h-5 text-blue-400" />
                  <span>Check Dates &amp; Book</span>
                  <ArrowRight className="w-5 h-5" />
                </button>

                <button
                  onClick={() => onNavigate('packages')}
                  className="liquid-glass-interactive w-full sm:w-auto px-7 py-4 text-[#0b192c] font-bold text-base rounded-2xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-5 h-5 text-blue-600" />
                  <span>View Party Combo</span>
                </button>
              </div>

              {/* 4 Trust Metrics */}
              <div className="pt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 border-t border-white/60 text-left max-w-xl mx-auto lg:mx-0">
                <div
                  onClick={() => onNavigate('safety')}
                  className="liquid-glass-interactive p-3.5 rounded-2xl cursor-pointer"
                >
                  <span className="text-xs font-bold uppercase text-blue-900 block">Rigging</span>
                  <p className="text-[11px] text-slate-600 mt-0.5 font-medium">18&quot; Steel Stakes →</p>
                </div>
                <div
                  onClick={() => onNavigate('how-it-works')}
                  className="liquid-glass-interactive p-3.5 rounded-2xl cursor-pointer"
                >
                  <span className="text-xs font-bold uppercase text-blue-900 block">Punctual</span>
                  <p className="text-[11px] text-slate-600 mt-0.5 font-medium">45m Early Setup →</p>
                </div>
                <div
                  onClick={() => onNavigate('safety')}
                  className="liquid-glass-interactive p-3.5 rounded-2xl cursor-pointer"
                >
                  <span className="text-xs font-bold uppercase text-blue-900 block">Sanitized</span>
                  <p className="text-[11px] text-slate-600 mt-0.5 font-medium">100% Clean Gear →</p>
                </div>
                <div
                  onClick={() => onNavigate('reviews')}
                  className="liquid-glass-interactive p-3.5 rounded-2xl cursor-pointer"
                >
                  <span className="text-xs font-bold uppercase text-blue-900 block">Rating</span>
                  <p className="text-[11px] text-slate-600 mt-0.5 font-medium">5.0★ Reviews →</p>
                </div>
              </div>
            </div>

            {/* Right Col: Hero Visual Card with Liquid Frame */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-md lg:max-w-none">
                <div className="liquid-glass rounded-3xl p-2.5 overflow-hidden">
                  <div className="relative w-full aspect-4/3 rounded-2xl overflow-hidden bg-slate-900 shadow-inner">
                    <img
                      src={heroMontageImg}
                      alt="Commercial Bouncy Castle and Vintage Popcorn Cart Setup"
                      className="w-full h-full object-cover"
                      loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-transparent to-transparent pointer-events-none" />
                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <div className="inline-block bg-blue-600/90 backdrop-blur-md text-white text-[10px] font-bold uppercase px-2.5 py-0.5 rounded-md mb-1 border border-blue-400/30">
                        Turnkey Commercial Fleet
                      </div>
                      <p className="font-bold text-sm text-white">Commercial Inflatables &amp; Fresh Hot Popcorn</p>
                    </div>
                  </div>
                </div>

                {/* Floating Liquid Verified Badge */}
                <div className="absolute -top-3 -right-3 liquid-glass rounded-2xl p-3 flex items-center gap-2.5 animate-subtle-float">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/10 text-emerald-600 border border-emerald-300/40 flex items-center justify-center font-bold shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-[#0b192c]">Safety Anchored</p>
                    <p className="text-[10px] text-slate-500 font-medium">Commercial turf stakes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Availability Checker Bar */}
          <div className="mt-12 sm:mt-14">
            <AvailabilityChecker onCheckAvailability={handleDateCheck} />
          </div>
        </div>
      </section>

      {/* 2. THE 2 CORE SERVICES CATALOG */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full liquid-glass-pill text-blue-900 text-xs font-bold uppercase tracking-wider">
              <Layers className="w-3.5 h-3.5 text-blue-700" />
              <span>Our 2 Rental Services</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b192c] tracking-tight">
              Featured Party Rentals
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              Clean commercial equipment with transparent space and power requirements. Delivered and set up by our dispatch crew.
            </p>
          </div>

          <button
            onClick={() => onNavigate('services')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors group cursor-pointer"
          >
            <span>View Full Specifications</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* 2 Services Grid - Apple Liquid Glass Interactive Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_DATA.map((service) => (
            <div
              key={service.id}
              className="liquid-glass-interactive rounded-3xl overflow-hidden flex flex-col group p-2"
            >
              {/* Card Image */}
              <div className="relative aspect-16/10 rounded-2xl overflow-hidden bg-slate-900">
                <img
                  src={service.heroImage}
                  alt={service.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent pointer-events-none" />
                {service.badge && (
                  <div className="absolute top-3 left-3 bg-[#0b192c]/85 backdrop-blur-md text-blue-300 text-xs font-bold uppercase px-3 py-1 rounded-xl shadow-md border border-white/20">
                    {service.badge}
                  </div>
                )}
                <div className="absolute bottom-3 left-4 right-4 text-white">
                  <h3 className="text-xl font-bold leading-snug drop-shadow-sm">{service.name}</h3>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 sm:p-6 flex flex-col justify-between grow space-y-5">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {service.shortDescription}
                </p>

                {/* Key Specs - Frosted inner pill */}
                <div className="grid grid-cols-2 gap-2 bg-white/50 backdrop-blur-md p-3.5 rounded-2xl border border-white/80 text-xs">
                  {service.specifications.slice(0, 4).map((spec, i) => (
                    <div key={i}>
                      <span className="text-[10px] text-slate-500 block uppercase font-bold">{spec.label}</span>
                      <span className="font-semibold text-slate-800 text-xs">{spec.value}</span>
                    </div>
                  ))}
                </div>

                {/* What's Included Bullets */}
                <div className="space-y-1.5">
                  <p className="text-xs font-bold text-[#0b192c] uppercase tracking-wider">What&apos;s Included:</p>
                  <ul className="text-xs text-slate-600 space-y-1.5">
                    {service.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <Check className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Card Actions */}
                <div className="pt-3 flex items-center gap-3 border-t border-white/60">
                  <button
                    onClick={() => onNavigate('service-detail', service.id)}
                    className="flex-1 py-3 px-4 rounded-xl bg-white/70 hover:bg-white text-slate-800 font-bold text-xs transition-all text-center cursor-pointer border border-white/90 shadow-xs active:scale-95"
                  >
                    Details &amp; Specs
                  </button>
                  <button
                    onClick={() => onOpenBookingModal(service.id)}
                    className="liquid-btn-dark flex-1 py-3 px-4 rounded-xl text-white font-bold text-xs transition-all text-center cursor-pointer flex items-center justify-center gap-1.5 active:scale-95"
                  >
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{service.ctaText}</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. ULTIMATE PARTY COMBO FEATURE - Liquid Glass Dark */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {PACKAGES_DATA.slice(0, 1).map((pkg) => (
          <div
            key={pkg.id}
            className="liquid-glass-dark text-white rounded-3xl p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8"
          >
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>{pkg.badge}</span>
              </div>
              <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                {pkg.name}
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {pkg.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 pt-2">
                {pkg.includedServices.slice(0, 4).map((inc, i) => (
                  <div key={i} className="flex items-center gap-2 justify-center lg:justify-start">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
                    <span>{inc}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 shrink-0">
              <button
                onClick={() => onOpenBookingModal(undefined, undefined, ['standard-jumping-castle', 'standard-popcorn-cart'])}
                className="liquid-btn-primary px-8 py-4 text-white font-bold text-base rounded-2xl flex items-center gap-2 cursor-pointer active:scale-95"
              >
                <Calendar className="w-5 h-5" />
                <span>Book Combo on Calendly</span>
              </button>
              <button
                onClick={() => onNavigate('packages')}
                className="text-xs text-slate-300 hover:text-white font-semibold underline underline-offset-4 cursor-pointer"
              >
                View combo details &amp; pricing →
              </button>
            </div>
          </div>
        ))}
      </section>

      {/* 4. HOW BOOKING WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full liquid-glass-pill text-blue-900 text-xs font-bold uppercase tracking-wider">
            <Clock className="w-3.5 h-3.5 text-blue-700" />
            <span>Frictionless 4-Step Flow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b192c] tracking-tight">
            How Rental Booking Works
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From live calendar reservation to certified on-site rigging, your event logistics are simple.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Choose Castle or Cart',
              desc: 'Select our commercial bouncy castle, vintage popcorn cart, or save with the 2-in-1 combo.'
            },
            {
              step: '02',
              title: 'Select Date in Calendly',
              desc: 'Check live dispatch schedule and hold your delivery window with zero double-booking.'
            },
            {
              step: '03',
              title: 'Confirm Setup Specs',
              desc: 'Specify grass or concrete surface, standard power outlet proximity, and party start time.'
            },
            {
              step: '04',
              title: 'We Deliver & Rig Safely',
              desc: 'Uniformed crew arrives 45–60 min early to inflate, anchor, test power, and demonstrate operation.'
            }
          ].map((item, idx) => (
            <div
              key={idx}
              className="liquid-glass-interactive rounded-3xl p-6 sm:p-7 space-y-2.5"
            >
              <span className="text-3xl sm:text-4xl font-black text-blue-900 block mb-2 font-mono drop-shadow-xs">
                {item.step}
              </span>
              <h3 className="text-base font-bold text-[#0b192c] mb-1">
                {item.title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 5. PHOTO GALLERY PREVIEW */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full liquid-glass-pill text-blue-900 text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-blue-700" />
              <span>Event Showcase</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0b192c] tracking-tight">
              Real Event Photos
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
              See our commercial bouncy castles and vintage popcorn carts set up at real birthday parties and school events.
            </p>
          </div>

          <button
            onClick={() => onNavigate('gallery')}
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors group cursor-pointer"
          >
            <span>View Full Photo Gallery</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        <GallerySection limit={4} />
      </section>

      {/* 6. SANITIZATION & SAFETY STANDARDS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SafetySection />
      </section>

      {/* 7. WHY CHOOSE EVENTSRENTALS.IO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-10">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full liquid-glass-pill text-blue-900 text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
            <span>Why Hosts Choose Us</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b192c] tracking-tight">
            Commercial Quality &amp; Reliability
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Commercial equipment integrity, certified punctuality, and transparent dispatch communication.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {trustHighlights.map((item, idx) => (
            <div
              key={idx}
              className="liquid-glass-interactive rounded-3xl p-6 sm:p-7 space-y-3"
            >
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-b from-[#0b192c] to-[#122543] text-blue-400 flex items-center justify-center font-bold shadow-xs border border-white/20">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#0b192c] text-base">{item.title}</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 8. VERIFIED REVIEWS */}
      <section className="py-16 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Verified Host Feedback
              </span>
              <h2 className="text-3xl font-black text-[#0b192c]">
                Trusted by Parents &amp; Schools (5.0★)
              </h2>
            </div>
            <button
              onClick={() => onNavigate('reviews')}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-blue-700 hover:text-blue-800 transition-colors cursor-pointer"
            >
              <span>Read All Verified Customer Stories</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS_DATA.map((t) => (
              <div
                key={t.id}
                className="liquid-glass-interactive rounded-3xl p-6 space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-500" />
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                    &ldquo;{t.content}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-white/60 flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.author}
                    className="w-10 h-10 rounded-full object-cover border border-white/80 shadow-xs"
                  />
                  <div>
                    <h3 className="font-bold text-xs text-[#0b192c]">{t.author}</h3>
                    <p className="text-[11px] text-slate-500">{t.role} • {t.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ SECTION */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-8">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full liquid-glass-pill text-blue-900 text-xs font-bold uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b192c] tracking-tight">
            Clear Answers on Setup &amp; Weather
          </h2>
        </div>

        <div className="space-y-3">
          {FAQ_DATA.slice(0, 5).map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="liquid-glass rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm text-[#0b192c] hover:text-blue-700 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown className={`w-4 h-4 shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-blue-700' : 'text-slate-400'}`} />
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-white/60 animate-fast-in">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-6">
          <button
            onClick={() => onNavigate('faq')}
            className="text-xs font-bold text-blue-700 hover:text-blue-800 underline underline-offset-4 cursor-pointer"
          >
            View all FAQ answers &amp; policy details →
          </button>
        </div>
      </section>

      {/* 10. FINAL DARK BLUE LIQUID GLASS CALL TO ACTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="liquid-glass-dark text-white rounded-3xl p-8 sm:p-14 text-center space-y-6">
          <div className="max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Direct Dispatch &amp; Schedule Hold
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight">
              Ready to Plan Your Event? <br />
              <span className="text-blue-400">Lock In Your Date Today.</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Check real-time equipment availability for your target date or schedule a quick dispatch booking via Calendly.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => onOpenBookingModal()}
              className="liquid-btn-primary w-full sm:w-auto px-8 py-4 text-white font-bold text-base rounded-2xl flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Calendar className="w-5 h-5 text-white" />
              <span>Book Your Event Now</span>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-7 py-4 bg-white/10 hover:bg-white/20 text-white font-bold text-base rounded-2xl border border-white/20 backdrop-blur-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <span>Contact Dispatch Team</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
