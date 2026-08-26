import React from 'react';
import { GallerySection } from '../components/GallerySection';
import { Calendar } from 'lucide-react';

export const GalleryView: React.FC<{ onOpenBookingModal: () => void }> = ({ onOpenBookingModal }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12 pb-24">
      <GallerySection showHeader={true} />

      <div className="bg-[#0b192c] text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-5 border border-slate-800 shadow-2xl">
        <h3 className="text-2xl sm:text-3xl font-black text-white">
          Like what you see for your upcoming celebration?
        </h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Let&apos;s check equipment availability for your target event date and hold your preferred jumping castle or catering setup in Calendly.
        </p>
        <button
          onClick={onOpenBookingModal}
          className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-white" />
          <span>Check Your Event Date Now</span>
        </button>
      </div>
    </div>
  );
};
