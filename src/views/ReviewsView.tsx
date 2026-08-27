import React from 'react';
import { 
  Star, ShieldCheck, CheckCircle2, 
  Sparkles, Calendar, MessageSquare, Quote 
} from 'lucide-react';
import { REVIEWS_DATA, ExtendedReviewItem } from '../data/reviewsData';

interface ReviewsViewProps {
  onOpenBookingModal: () => void;
  onNavigate: (view: string) => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({
  onOpenBookingModal,
  onNavigate,
}) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-28">
      {/* Editorial Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
          <span>Verified Client Testimonials</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#0b192c] tracking-tight">
          Trusted by Parents, Schools &amp; Event Hosts
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Read real reviews from party hosts who count on our punctual dispatch, heavy-duty commercial bouncy castles, and fresh hot popcorn carts.
        </p>
      </div>

      {/* Aggregate Rating Banner */}
      <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="flex items-center gap-6">
          <div className="w-20 h-20 rounded-2xl bg-[#0b192c] text-white flex flex-col items-center justify-center font-mono shrink-0 shadow-md">
            <span className="text-3xl font-black">5.0</span>
            <span className="text-[10px] text-blue-300 uppercase tracking-wider font-sans">Out of 5</span>
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-amber-400 fill-amber-400" />
              ))}
            </div>
            <h3 className="text-xl font-bold text-[#0b192c]">
              100% 5-Star Customer Satisfaction
            </h3>
            <p className="text-xs text-slate-500">
              Verified parent and school feedback across birthday parties, church carnivals, and neighborhood gatherings.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onOpenBookingModal}
            className="px-6 py-3.5 bg-[#0b192c] hover:bg-[#122543] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-blue-400" />
            <span>Check Your Event Date</span>
          </button>
        </div>
      </div>

      {/* Reviews Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {REVIEWS_DATA.map((rev: ExtendedReviewItem) => (
          <div
            key={rev.id}
            className="bg-white rounded-3xl p-7 border border-slate-200 shadow-sm hover:shadow-lg hover:border-blue-300 transition-all duration-200 flex flex-col justify-between space-y-6 group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
                {rev.verified && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Verified Booking</span>
                  </span>
                )}
              </div>

              {rev.photoUrl && (
                <div className="aspect-16/9 rounded-2xl overflow-hidden bg-slate-100 border border-slate-100">
                  <img
                    src={rev.photoUrl}
                    alt={`${rev.author} event setup`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
              )}

              <blockquote className="text-xs sm:text-sm text-slate-700 leading-relaxed italic">
                &ldquo;{rev.content}&rdquo;
              </blockquote>
            </div>

            <div className="pt-4 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-3">
                <img
                  src={rev.avatar}
                  alt={rev.author}
                  className="w-10 h-10 rounded-full object-cover border border-slate-200"
                />
                <div>
                  <h4 className="font-bold text-sm text-[#0b192c]">{rev.author}</h4>
                  <p className="text-[11px] text-slate-500">{rev.role}</p>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium">
                <span>{rev.location}</span>
                <span>{rev.dateStr}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Trust CTA */}
      <div className="bg-[#0b192c] text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto space-y-5 border border-slate-800 shadow-2xl">
        <h3 className="text-2xl sm:text-3xl font-black text-white">
          Join hundreds of happy party hosts
        </h3>
        <p className="text-slate-300 text-sm max-w-xl mx-auto">
          Reserve your commercial bouncy castle or vintage popcorn cart in under 2 minutes with live date holds.
        </p>
        <button
          onClick={onOpenBookingModal}
          className="px-7 py-3.5 bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg transition-all inline-flex items-center gap-2 cursor-pointer"
        >
          <Calendar className="w-4 h-4 text-white" />
          <span>Book with Calendly</span>
        </button>
      </div>
    </div>
  );
};
