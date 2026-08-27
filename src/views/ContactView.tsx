import React, { useState } from 'react';
import { 
  Mail, Phone, MapPin, Clock, Send, 
  CheckCircle2, Calendar, MessageSquare, ShieldCheck, Sparkles 
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { SERVICES_DATA } from '../data/servicesData';
import { useToast } from '../context/ToastContext';

export const ContactView: React.FC<{
  onOpenBookingModal: () => void;
}> = ({ onOpenBookingModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Birthday Party');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [guestCount, setGuestCount] = useState('25-50');
  const [selectedServices, setSelectedServices] = useState<string[]>(['standard-jumping-castle']);
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const { success } = useToast();

  const toggleService = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(s => s !== id) : prev) 
        : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSending(true);
    setTimeout(() => {
      setIsSending(false);
      setIsSubmitted(true);
      success(
        'Inquiry Sent Successfully!',
        `Thank you ${name || ''}, our dispatch coordinator will reply to ${email || 'your email'} within 2 business hours.`,
        6000
      );
      try {
        confetti({
          particleCount: 70,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback
      }
    }, 450);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <MessageSquare className="w-3.5 h-3.5 text-blue-700" />
          <span>Dispatch Office &amp; Inquiries</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#0b192c] tracking-tight">
          Get in Touch With Dispatch
        </h1>
        <p className="text-slate-600 text-base leading-relaxed">
          Have venue questions regarding grass vs concrete staking, electrical power clearance, or date availability? Message our dispatch team below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: Contact Info & Service Area Info */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 space-y-6 border border-slate-200 shadow-sm">
            <h3 className="text-xl font-black text-[#0b192c]">Direct Dispatch Office</h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We respond to all party inquiries within 2 business hours during operating hours.
            </p>

            <div className="space-y-4 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0b192c] block">Service Region</strong>
                  <span>{BUSINESS_CONFIG.serviceAreaPlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0b192c] block">Telephone Dispatch</strong>
                  <span>{BUSINESS_CONFIG.phonePlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0b192c] block">Email Coordination</strong>
                  <span>{BUSINESS_CONFIG.emailPlaceholder}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-blue-700 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#0b192c] block">Operating Hours</strong>
                  <span>{BUSINESS_CONFIG.operatingHours}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100">
              <button
                onClick={onOpenBookingModal}
                className="w-full py-3 bg-[#0b192c] hover:bg-[#122543] active:scale-95 text-white font-bold text-xs rounded-xl transition-all shadow-md cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-blue-400" />
                <span>Check Real-Time Calendly Dates</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right: Interactive Message Form */}
        <div className="lg:col-span-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
            {isSubmitted ? (
              <div className="text-center py-12 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-black text-[#0b192c]">Inquiry Received!</h3>
                <p className="text-slate-600 text-sm max-w-md mx-auto">
                  Thank you, <strong>{name}</strong>. Our dispatch coordinator is reviewing your date and will contact you at <strong>{email}</strong> within 2 hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-6 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl cursor-pointer"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#0b192c]">
                    Send a Message to Dispatch
                  </h3>
                  <p className="text-xs text-slate-500 mt-1">
                    Fill out your party details for custom scheduling or site inquiries.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Sarah Jenkins"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. sarah@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. (555) 000-1234"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-700">Target Event Date</label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>

                {/* Service Selection */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-700">
                    Rental Equipment Needed:
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {SERVICES_DATA.map((srv) => (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => toggleService(srv.id)}
                        className={`p-3 rounded-xl border text-left flex items-center justify-between cursor-pointer transition-all ${
                          selectedServices.includes(srv.id)
                            ? 'bg-blue-50 border-blue-600 text-blue-950 font-bold'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <span className="text-xs">{srv.name}</span>
                        {selectedServices.includes(srv.id) && (
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Message Box */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">
                    Venue Address / Surface Details / Questions
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tell us about your venue surface (grass lawn vs concrete), start time, or any specific logistics..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full py-4 bg-[#0b192c] hover:bg-[#122543] active:scale-95 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-blue-400" />
                  <span>{isSending ? 'Sending to Dispatch...' : 'Submit Inquiry'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
