import React, { useEffect, useState } from 'react';
import { 
  X, Calendar, CheckCircle2, 
  ExternalLink, AlertCircle, Sparkles, ShieldCheck, Clock
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { CALENDLY_CONFIG, BUSINESS_CONFIG } from '../data/businessConfig';
import { SERVICES_DATA } from '../data/servicesData';
import { useToast } from '../context/ToastContext';

declare global {
  interface Window {
    Calendly?: {
      initPopupWidget: (options: { url: string }) => void;
      initInlineWidget: (options: { url: string; parentElement: HTMLElement | null }) => void;
      showPopupWidget: (url: string) => void;
      closePopupWidget: () => void;
    };
  }
}

interface CalendlyModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId?: string;
  serviceName?: string;
  preselectedDate?: string;
  preselectedServices?: string[];
  initialGuestCount?: string;
  initialEventType?: string;
}

export const CalendlyModal: React.FC<CalendlyModalProps> = ({
  isOpen,
  onClose,
  serviceId,
  serviceName,
  preselectedDate,
  preselectedServices = [],
  initialGuestCount = '25-50',
  initialEventType = 'Birthday Party',
}) => {
  const [selectedDate, setSelectedDate] = useState<string>(preselectedDate || '');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [eventType, setEventType] = useState(initialEventType);
  const [guestCount, setGuestCount] = useState(initialGuestCount);
  const [setupSurface, setSetupSurface] = useState('Grass / Turf (Steel Stakes)');
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>(
    preselectedServices.length > 0 
      ? preselectedServices 
      : (serviceId ? [serviceId] : ['standard-jumping-castle'])
  );
  
  const [activeTab, setActiveTab] = useState<'interactive' | 'calendly-embed'>('interactive');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { bookingSuccess } = useToast();

  // Sync state when props change
  useEffect(() => {
    if (preselectedDate) setSelectedDate(preselectedDate);
    if (serviceId) {
      setSelectedServices(prev => prev.includes(serviceId) ? prev : [...prev, serviceId]);
    }
    if (preselectedServices.length > 0) {
      setSelectedServices(preselectedServices);
    }
  }, [serviceId, preselectedDate, preselectedServices]);

  // Determine appropriate Calendly URL based on service
  const getCalendlyUrl = () => {
    if (selectedServices.length > 1) {
      return CALENDLY_CONFIG.serviceFlows['ultimate-bounce-and-pop-combo'] || CALENDLY_CONFIG.baseUrl;
    }
    const singleService = selectedServices[0] || serviceId;
    if (singleService && CALENDLY_CONFIG.serviceFlows[singleService as keyof typeof CALENDLY_CONFIG.serviceFlows]) {
      return CALENDLY_CONFIG.serviceFlows[singleService as keyof typeof CALENDLY_CONFIG.serviceFlows];
    }
    return CALENDLY_CONFIG.baseUrl;
  };

  const calendlyUrl = getCalendlyUrl();

  const handleLaunchOfficialPopup = () => {
    if (window.Calendly) {
      try {
        const queryParams = new URLSearchParams();
        if (fullName) queryParams.set('name', fullName);
        if (email) queryParams.set('email', email);
        if (selectedDate) queryParams.set('date', selectedDate);
        
        const fullUrl = `${calendlyUrl}?${queryParams.toString()}`;
        window.Calendly.initPopupWidget({ url: fullUrl });
        return;
      } catch (e) {
        console.warn('Calendly popup failed, redirecting:', e);
      }
    }
    // Fallback: Open in clean popup window or new tab
    window.open(calendlyUrl, '_blank', 'noopener,noreferrer');
  };

  const toggleServiceSelection = (id: string) => {
    setSelectedServices(prev => 
      prev.includes(id) 
        ? (prev.length > 1 ? prev.filter(s => s !== id) : prev) 
        : [...prev, id]
    );
  };

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);

      const serviceNames = selectedServices
        .map(id => SERVICES_DATA.find(s => s.id === id)?.name || id)
        .join(', ');

      bookingSuccess(
        'Delivery Hold Secured!',
        `Your reservation for ${serviceNames} on ${selectedDate || 'your selected date'} has been routed to dispatch. Confirmation sent to ${email}.`
      );

      try {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch {
        // Fallback gracefully
      }
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto">
      <div 
        className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-6 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0b192c] text-white p-5 sm:p-6 flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 bg-blue-950/80 px-2 py-0.5 rounded border border-blue-800">
                Live Calendly Booking
              </span>
              <span className="text-[11px] text-slate-400">
                Punctual Delivery &amp; Full Setup
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white">
              {serviceName || 'Reserve Your Bouncy Castle & Popcorn Cart'}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="bg-slate-100 p-1.5 flex gap-1 border-b border-slate-200 text-xs font-bold shrink-0">
          <button
            onClick={() => setActiveTab('interactive')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer ${
              activeTab === 'interactive' 
                ? 'bg-white text-[#0b192c] shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Quick Dispatch Form &amp; Date Hold
          </button>
          <button
            onClick={() => setActiveTab('calendly-embed')}
            className={`flex-1 py-2 px-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'calendly-embed' 
                ? 'bg-white text-[#0b192c] shadow-xs' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5 text-blue-700" />
            <span>Calendly Live Calendar View</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {activeTab === 'calendly-embed' ? (
            /* Calendly External / Embed Screen */
            <div className="text-center py-10 space-y-6">
              <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-700 flex items-center justify-center mx-auto border border-blue-200">
                <Calendar className="w-8 h-8" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h3 className="text-xl font-black text-[#0b192c]">
                  Open Synchronized Calendly Calendar
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Select your exact delivery date and setup window on our official schedule.
                </p>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  onClick={handleLaunchOfficialPopup}
                  className="w-full sm:w-auto px-6 py-3.5 bg-[#0b192c] hover:bg-[#122543] active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4 text-blue-400" />
                  <span>Launch Official Calendly Popup</span>
                </button>
                <button
                  onClick={() => setActiveTab('interactive')}
                  className="w-full sm:w-auto px-5 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
                >
                  Use Direct Quick Form
                </button>
              </div>
            </div>
          ) : isSubmitted ? (
            /* Confirmation Success State */
            <div className="text-center py-10 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-black text-[#0b192c]">
                  Date Hold Confirmed!
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
                  Thank you, <strong>{fullName || 'Party Host'}</strong>. Your equipment delivery hold has been routed to our dispatch team for <strong>{selectedDate || 'your date'}</strong>.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 max-w-md mx-auto text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Contact:</span>
                  <span className="font-semibold text-slate-800">{email} • {phone}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Event Date:</span>
                  <span className="font-semibold text-slate-800">{selectedDate} ({selectedTimeSlot})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Equipment:</span>
                  <span className="font-semibold text-slate-800">
                    {selectedServices.map(id => SERVICES_DATA.find(s => s.id === id)?.name || id).join(' + ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Setup Surface:</span>
                  <span className="font-semibold text-slate-800">{setupSurface}</span>
                </div>
              </div>

              <button
                onClick={onClose}
                className="px-6 py-3 bg-[#0b192c] hover:bg-[#122543] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer transition-all"
              >
                Done &amp; Return to Page
              </button>
            </div>
          ) : (
            /* Interactive Direct Booking Form */
            <form onSubmit={handleBookingSubmit} className="space-y-6">
              {/* Service Toggle Pills */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Selected Rental Equipment:</span>
                  <span className="text-[11px] text-blue-700 font-normal">Click to toggle</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SERVICES_DATA.map((service) => {
                    const isSelected = selectedServices.includes(service.id);
                    return (
                      <button
                        type="button"
                        key={service.id}
                        onClick={() => toggleServiceSelection(service.id)}
                        className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-blue-50/80 border-blue-600 text-blue-950 font-bold ring-1 ring-blue-500/30'
                            : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <img
                            src={service.heroImage}
                            alt=""
                            className="w-10 h-10 rounded-xl object-cover"
                          />
                          <div>
                            <p className="text-xs leading-tight">{service.name}</p>
                            <span className="text-[10px] text-slate-500 capitalize">{service.category}</span>
                          </div>
                        </div>
                        {isSelected && (
                          <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Date & Time Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Event Date *</label>
                  <input
                    type="date"
                    required
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Preferred Setup Time *</label>
                  <select
                    value={selectedTimeSlot}
                    onChange={(e) => setSelectedTimeSlot(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option>08:00 AM – 10:00 AM (Early Setup)</option>
                    <option>10:00 AM – 12:00 PM (Morning Party)</option>
                    <option>12:00 PM – 02:00 PM (Afternoon Party)</option>
                    <option>02:00 PM – 04:00 PM (Late Afternoon)</option>
                    <option>04:00 PM – 06:00 PM (Evening Event)</option>
                  </select>
                </div>
              </div>

              {/* Host Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Host Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
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
              </div>

              {/* Surface & Location Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Setup Surface Type *</label>
                  <select
                    value={setupSurface}
                    onChange={(e) => setSetupSurface(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  >
                    <option>Grass / Turf (18&quot; Steel Stakes)</option>
                    <option>Concrete / Asphalt (150lb Sandbag Ballasts)</option>
                    <option>Pavers / Patio (Sandbag Ballasts)</option>
                    <option>Indoor Gym / Hall</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700">Delivery Address / City *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1245 Maplewood Ave, North Suburbs"
                    value={eventLocation}
                    onChange={(e) => setEventLocation(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              {/* Special Instructions */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Special Venue Notes (Gate width, power outlet location, etc.)
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. Gate is 4ft wide, power outlet is on back patio within 30ft..."
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  className="w-full p-3 bg-slate-50 border border-slate-300 rounded-xl text-xs text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:flex-1 py-4 bg-[#0b192c] hover:bg-[#122543] active:scale-95 text-white font-bold text-sm rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  <Calendar className="w-4 h-4 text-blue-400" />
                  <span>{isSubmitting ? 'Routing to Dispatch...' : 'Confirm Delivery Date Hold'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleLaunchOfficialPopup}
                  className="w-full sm:w-auto px-5 py-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-600" />
                  <span>Open Calendly Window</span>
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Modal Trust Footer */}
        <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-slate-500 shrink-0">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            45–60 min punctual setup buffer on every booking
          </span>
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            100% child-safe hospital-grade sanitization
          </span>
        </div>
      </div>
    </div>
  );
};
