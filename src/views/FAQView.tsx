import React, { useState } from 'react';
import { HelpCircle, ChevronDown, Calendar, Phone } from 'lucide-react';
import { FAQ_DATA } from '../data/faqData';
import { SafetySection } from '../components/SafetySection';

export const FAQView: React.FC<{
  onOpenBookingModal: () => void;
  onNavigate: (view: string) => void;
}> = ({ onOpenBookingModal, onNavigate }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'booking', label: 'Booking & Calendly' },
    { id: 'equipment', label: 'Equipment & Space' },
    { id: 'weather', label: 'Weather & Safety' },
    { id: 'logistics', label: 'Delivery & Setup' },
  ];

  const filteredFaqs = activeCategory === 'all'
    ? FAQ_DATA
    : FAQ_DATA.filter(f => f.category === activeCategory);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <HelpCircle className="w-3.5 h-3.5 text-blue-700" />
          <span>Knowledge Base &amp; Policies</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#0b192c] tracking-tight">
          Frequently Asked Questions
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Clear answers regarding Calendly holds, bad-weather rescheduling, electrical outlets, and bouncy castle setup logistics.
        </p>
      </div>

      {/* Category Filter */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategory(cat.id);
              setOpenIndex(null);
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
              activeCategory === cat.id
                ? 'bg-[#0b192c] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion */}
      <div className="max-w-3xl mx-auto space-y-3">
        {filteredFaqs.map((faq, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggle(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-[#0b192c] hover:text-blue-700 transition-colors cursor-pointer"
              >
                <span>{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 shrink-0 transition-transform ${
                    isOpen ? 'rotate-180 text-blue-700' : 'text-slate-400'
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Safety Standards Section */}
      <div className="pt-8">
        <SafetySection />
      </div>

      {/* Dispatch Support Banner */}
      <div className="bg-[#0b192c] text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-5 border border-slate-800 shadow-2xl">
        <h3 className="text-2xl sm:text-3xl font-black text-white">
          Still Have a Question for Dispatch?
        </h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Our team is available 7 days a week from 7:00 AM to 9:00 PM to help with venue dimensions, power logistics, or date inquiries.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBookingModal}
            className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Check Calendly Availability</span>
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="px-7 py-3.5 bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm rounded-xl border border-slate-700 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <Phone className="w-4 h-4 text-blue-400" />
            <span>Contact Dispatch</span>
          </button>
        </div>
      </div>
    </div>
  );
};
