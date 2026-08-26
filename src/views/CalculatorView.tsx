import React, { useState } from 'react';
import { 
  Calculator, Calendar, CheckCircle2, 
  Sparkles, ArrowRight, ShieldCheck, RefreshCw 
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { useToast } from '../context/ToastContext';

interface CalculatorViewProps {
  onOpenBookingModal: (serviceId?: string, preselectedDate?: string, preselectedServices?: string[]) => void;
  onNavigate: (view: string) => void;
}

interface AddonOption {
  id: string;
  name: string;
  category: string;
  basePrice: number;
  unit: string;
  description: string;
}

export const CalculatorView: React.FC<CalculatorViewProps> = ({
  onOpenBookingModal,
  onNavigate,
}) => {
  const [eventType, setEventType] = useState('birthday');
  const [guestCount, setGuestCount] = useState<number>(45);
  const [durationHours, setDurationHours] = useState<number>(4);
  const [selectedItems, setSelectedItems] = useState<string[]>([
    'food-truck-arrangements',
    'classic-popcorn-machine'
  ]);
  const [includeAttendant, setIncludeAttendant] = useState(true);
  const [includeGenerator, setIncludeGenerator] = useState(false);
  const [targetDate, setTargetDate] = useState('');
  const { info } = useToast();

  const inventoryItems: AddonOption[] = [
    {
      id: 'food-truck-arrangements',
      name: 'Gourmet Food Truck Arrangement',
      category: 'Catering',
      basePrice: 650,
      unit: 'per event slot',
      description: 'Curated food truck partner, bespoke menu, and health permit coordination',
    },
    {
      id: 'commercial-jumping-castles',
      name: 'Standard Jumping Castle',
      category: 'Inflatables',
      basePrice: 280,
      unit: 'for 4 hours',
      description: '15x15ft commercial jumping castle, blower, safety stakes & setup',
    },
    {
      id: 'large-inflatables-combo',
      name: 'Large Inflatable Combo & Obstacle Slide',
      category: 'Inflatables',
      basePrice: 420,
      unit: 'for 4 hours',
      description: 'High-throughput dual-lane obstacle combo, climbing wall & slide',
    },
    {
      id: 'classic-popcorn-machine',
      name: 'Vintage Popcorn Machine & Cart',
      category: 'Concessions',
      basePrice: 140,
      unit: 'incl. 50 servings',
      description: 'Nostalgic cart, organic kernels, theater butter seasoning & bags',
    },
    {
      id: 'cotton-candy-station',
      name: 'Cotton Candy Spinner Station',
      category: 'Concessions',
      basePrice: 130,
      unit: 'incl. 50 servings',
      description: 'Commercial spinner, dual flavor sugars & safety dome shield',
    },
    {
      id: 'party-tents-furniture',
      name: 'High-Peak Canopy Tent & Tables Set',
      category: 'Event Gear',
      basePrice: 220,
      unit: '20x20ft tent + tables',
      description: 'Commercial shade canopy with 4 banquet tables and 32 folding chairs',
    },
  ];

  const toggleItem = (id: string) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter(i => i !== id) : prev;
      } else {
        return [...prev, id];
      }
    });
  };

  // Base pricing calculation
  const itemsSubtotal = selectedItems.reduce((sum, id) => {
    const item = inventoryItems.find(i => i.id === id);
    return sum + (item ? item.basePrice : 0);
  }, 0);

  // Extras
  const attendantCost = includeAttendant ? durationHours * 35 : 0;
  const generatorCost = includeGenerator ? 95 : 0;

  // Bundle discount
  const isMultiServiceBundle = selectedItems.length >= 2;
  const bundleDiscountPercent = selectedItems.length >= 3 ? 0.15 : (selectedItems.length === 2 ? 0.10 : 0);
  const discountAmount = Math.round(itemsSubtotal * bundleDiscountPercent);

  const estimatedTotal = Math.max(0, itemsSubtotal - discountAmount + attendantCost + generatorCost);

  const handleBookEstimate = () => {
    onOpenBookingModal(
      selectedItems[0],
      targetDate || undefined,
      selectedItems
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16 pb-28">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <Calculator className="w-3.5 h-3.5 text-blue-700" />
          <span>Interactive Package &amp; Cost Estimator</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-black text-[#0b192c] tracking-tight">
          Instant Event Cost Estimator
        </h1>
        <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
          Configure your jumping castles, food truck coordination, and concession machines. Enjoy automatic multi-item bundle savings and check live Calendly date availability.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Interactive Configurator */}
        <div className="lg:col-span-7 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-sm">
          {/* Step 1: Event Scope */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-black text-lg text-[#0b192c] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0b192c] text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>Event Occasion &amp; Sizing</span>
              </h3>
              <span className="text-xs text-slate-500 font-semibold">Step 1 of 3</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Occasion Type
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                >
                  <option value="birthday">Birthday Party</option>
                  <option value="school">School / Sports Carnival</option>
                  <option value="corporate">Corporate Event / Picnic</option>
                  <option value="festival">Festival / Block Party</option>
                  <option value="wedding">Wedding / Reception</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Guests: <span className="text-blue-700 font-bold">{guestCount}</span>
                </label>
                <input
                  type="range"
                  min="15"
                  max="350"
                  step="5"
                  value={guestCount}
                  onChange={(e) => setGuestCount(Number(e.target.value))}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#0b192c] mt-2.5"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Duration: <span className="text-blue-700 font-bold">{durationHours} Hours</span>
                </label>
                <select
                  value={durationHours}
                  onChange={(e) => setDurationHours(Number(e.target.value))}
                  className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
                >
                  <option value={3}>3 Hours (Standard)</option>
                  <option value={4}>4 Hours (Recommended)</option>
                  <option value={6}>6 Hours (Full Afternoon)</option>
                  <option value={8}>8 Hours (Full Day Gala)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Step 2: Equipment & Catering Selection */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="font-black text-lg text-[#0b192c] flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-[#0b192c] text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>Select Equipment &amp; Services</span>
              </h3>
              {bundleDiscountPercent > 0 && (
                <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">
                  {Math.round(bundleDiscountPercent * 100)}% Bundle Discount Applied!
                </span>
              )}
            </div>

            <div className="space-y-2.5">
              {inventoryItems.map((item) => {
                const isSelected = selectedItems.includes(item.id);
                return (
                  <div
                    key={item.id}
                    onClick={() => toggleItem(item.id)}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                      isSelected
                        ? 'bg-blue-50/70 border-blue-400 shadow-xs'
                        : 'bg-slate-50/60 border-slate-200 hover:bg-slate-100/70'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-5 h-5 rounded-md mt-0.5 flex items-center justify-center text-xs border ${
                        isSelected ? 'bg-[#0b192c] border-[#0b192c] text-white' : 'border-slate-300 bg-white'
                      }`}>
                        {isSelected && '✓'}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs sm:text-sm font-bold text-[#0b192c]">
                            {item.name}
                          </h4>
                          <span className="text-[10px] uppercase font-bold text-blue-900 bg-white px-1.5 py-0.5 rounded border border-blue-200">
                            {item.category}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 line-clamp-1 mt-0.5">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="font-mono font-bold text-xs sm:text-sm text-[#0b192c]">
                        ${item.basePrice}
                      </span>
                      <span className="block text-[10px] text-slate-500">
                        {item.unit}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 3: Add-on Logistics */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-black text-lg text-[#0b192c] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#0b192c] text-white text-xs flex items-center justify-center font-bold">3</span>
              <span>Site Logistics &amp; Crew Options</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setIncludeAttendant(!includeAttendant)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer ${
                  includeAttendant ? 'bg-blue-50/70 border-blue-400 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5 text-xs">
                  <input
                    type="checkbox"
                    checked={includeAttendant}
                    onChange={() => {}}
                    className="rounded text-blue-700"
                  />
                  <div>
                    <span className="font-bold text-[#0b192c] block">Dedicated Crew Attendant</span>
                    <span className="text-[11px] text-slate-500">Supervises safety &amp; operates carts ($35/hr)</span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#0b192c]">+${durationHours * 35}</span>
              </label>

              <label
                onClick={() => setIncludeGenerator(!includeGenerator)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer ${
                  includeGenerator ? 'bg-blue-50/70 border-blue-400 font-semibold' : 'bg-slate-50 border-slate-200 text-slate-700'
                }`}
              >
                <div className="flex items-center gap-2.5 text-xs">
                  <input
                    type="checkbox"
                    checked={includeGenerator}
                    onChange={() => {}}
                    className="rounded text-blue-700"
                  />
                  <div>
                    <span className="font-bold text-[#0b192c] block">Commercial Generator</span>
                    <span className="text-[11px] text-slate-500">For parks or sites without 110V power ($95)</span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-[#0b192c]">+$95</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right: Transparent Quote Summary Card */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6 sticky top-24">
          <div className="border-b border-slate-100 pb-4 space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">
                Custom Estimate
              </span>
              <span className="text-[11px] text-slate-500 font-mono">
                {selectedItems.length} items configured
              </span>
            </div>
            <h3 className="text-2xl font-black text-[#0b192c]">
              Estimated Event Total
            </h3>
          </div>

          {/* Breakdown List */}
          <div className="space-y-2.5 text-xs">
            {selectedItems.map(id => {
              const item = inventoryItems.find(i => i.id === id);
              if (!item) return null;
              return (
                <div key={id} className="flex items-center justify-between text-slate-700">
                  <span className="truncate max-w-[200px]">{item.name}</span>
                  <span className="font-mono font-semibold">${item.basePrice}</span>
                </div>
              );
            })}

            {includeAttendant && (
              <div className="flex items-center justify-between text-slate-700">
                <span>Dedicated Attendant ({durationHours} hrs)</span>
                <span className="font-mono font-semibold">${durationHours * 35}</span>
              </div>
            )}

            {includeGenerator && (
              <div className="flex items-center justify-between text-slate-700">
                <span>Park Generator Unit</span>
                <span className="font-mono font-semibold">$95</span>
              </div>
            )}

            {bundleDiscountPercent > 0 && (
              <div className="flex items-center justify-between text-emerald-800 font-bold bg-emerald-50 p-2 rounded-xl border border-emerald-100">
                <span>Turnkey Multi-Service Bundle ({Math.round(bundleDiscountPercent * 100)}% off)</span>
                <span className="font-mono">-${discountAmount}</span>
              </div>
            )}
          </div>

          {/* Total Price Display */}
          <div className="p-5 bg-slate-900 text-white rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-baseline justify-between">
              <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                Estimated Subtotal
              </span>
              <div className="text-right">
                <span className="text-3xl font-black font-mono text-white">
                  ${estimatedTotal}
                </span>
                <span className="text-[10px] text-slate-400 block">
                  * All taxes, sanitized setup &amp; anchoring included
                </span>
              </div>
            </div>
          </div>

          {/* Target Date Input */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Check Your Date On Calendly:
            </label>
            <input
              type="date"
              min={new Date().toISOString().split('T')[0]}
              value={targetDate}
              onChange={(e) => setTargetDate(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
            />
          </div>

          {/* Booking Action */}
          <div className="space-y-2 pt-1">
            <button
              onClick={handleBookEstimate}
              className="w-full py-3.5 px-4 bg-[#0b192c] hover:bg-[#122543] active:scale-95 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar className="w-4 h-4 text-blue-400" />
              <span>Lock in This Package in Calendly</span>
            </button>

            <button
              onClick={() => onNavigate('contact')}
              className="w-full py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-xl border border-slate-200 transition-colors cursor-pointer"
            >
              Send Custom Quote to Dispatch
            </button>
          </div>

          {/* Guarantees */}
          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
            <p className="flex items-center gap-1.5 text-emerald-800 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free bad-weather date rescheduling within 12 months</span>
            </p>
            <p>• Zero hidden fees or unexpected post-event surcharges</p>
          </div>
        </div>
      </div>
    </div>
  );
};
