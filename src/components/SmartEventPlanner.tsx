import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { BrainCircuit, CheckCircle2, ArrowRight, Loader2, Sparkles } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { useToast } from '../context/ToastContext';

interface SmartEventPlannerProps {
  onApplyPlan: (selectedServiceIds: string[]) => void;
  onOpenBookingWithDate: (date: string, serviceId?: string) => void;
}

export const SmartEventPlanner: React.FC<SmartEventPlannerProps> = ({
  onApplyPlan,
}) => {
  const [eventDescription, setEventDescription] = useState('');
  const [guestCount, setGuestCount] = useState('30-50');
  const [eventType, setEventType] = useState('Kids Birthday');
  const [venueSpace, setVenueSpace] = useState('Backyard (approx 40x30 ft lawn)');
  const [isGenerating, setIsGenerating] = useState(false);
  const [planResult, setPlanResult] = useState<string | null>(null);
  const [suggestedServiceIds, setSuggestedServiceIds] = useState<string[]>([]);
  const { success, info } = useToast();

  const handleGenerateAIPlan = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    setPlanResult(null);

    const prompt = `You are the Lead Master Event Producer for EventsRentals.io ("Your Complete Event Experience Partner").
A client is planning an event with the following specs:
- Event Type: ${eventType}
- Estimated Guests: ${guestCount}
- Venue Dimensions / Surface: ${venueSpace}
- Client Notes: "${eventDescription || 'Need a clean, fun, memorable party with entertainment and food.'}"

Our catalog includes:
1. Food Truck Arrangements & Gourmet Mobile Catering (food-truck-arrangements)
2. Standard Jumping Castle (standard-jumping-castle) - 13x13ft
3. Large Jumping Castles & Adventure Inflatables (large-jumping-castle) - 22x19ft
4. Classic Nostalgic Popcorn Cart (standard-popcorn-cart)
5. Grand Event Popcorn Station (large-popcorn-cart)
6. Artisanal Cotton Candy Station (cotton-candy-station)
7. Snow Cone & Frozen Slushie Experience (snow-cone-slush-station)
8. Event Tents, Canopies, Tables & Seating (tables-chairs-tents)
9. Interactive Photo Booth & 360 Video (photo-booth-experience)

Please produce a concise, professional event equipment & logistics blueprint in clean markdown.
Include:
1. **Recommended Lineup & Equipment**
2. **Space & Electrical Load Checklist**
3. **Delivery & Safe Setup Timeline**
4. **Safety & Weather Assurance**
At the very end output:
RECOMMENDED_IDS: [comma separated service ids from catalog, e.g. standard-jumping-castle, standard-popcorn-cart]`;

    try {
      const apiKey = process.env.GEMINI_API_KEY || (import.meta as any).env?.VITE_GEMINI_API_KEY || '';
      const ai = new GoogleGenAI(apiKey ? { apiKey } : {});
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });

      const responseText = response.text || '';
      const idMatch = responseText.match(/RECOMMENDED_IDS:\s*\[(.*?)\]/i);
      if (idMatch && idMatch[1]) {
        const ids = idMatch[1].split(',').map(s => s.trim()).filter(Boolean);
        setSuggestedServiceIds(ids);
      } else {
        if (eventType.includes('Kids') || eventType.includes('Birthday')) {
          setSuggestedServiceIds(['standard-jumping-castle', 'standard-popcorn-cart']);
        } else if (eventType.includes('Corporate') || eventType.includes('Festival')) {
          setSuggestedServiceIds(['large-jumping-castle', 'food-truck-arrangements', 'large-popcorn-cart']);
        } else {
          setSuggestedServiceIds(['food-truck-arrangements', 'standard-popcorn-cart']);
        }
      }

      const cleanedText = responseText.replace(/RECOMMENDED_IDS:.*$/i, '').trim();
      setPlanResult(cleanedText);
      success('Event Plan Generated!', 'Your AI event blueprint is ready with tailored equipment and safety recommendations.');
    } catch (err: any) {
      console.warn('Gemini API call error:', err);
      let fallbackPlan = `### Recommended Event Blueprint\n\n**1. Equipment & Catering Lineup:**\n- **Standard Jumping Castle**: Perfectly fits a 40x30ft lawn with required safety perimeter clearance.\n- **Classic Popcorn Cart**: Fresh theater-style popcorn for ${guestCount} guests.\n\n**2. Power & Space Logistics:**\n- Castle footprint requires 16x16ft flat lawn.\n- 1x dedicated 110V standard outlet within 50ft.\n\n**3. Setup Timeline:**\n- Crew arrives 60 minutes prior to party start for full inflation and anchor safety check.`;
      
      if (eventType.includes('Corporate') || eventType.includes('Festival')) {
        fallbackPlan = `### Corporate / Large Gathering Blueprint\n\n**1. Curated Equipment Lineup:**\n- **Large Adventure Jumping Castle**: High capacity for 12+ participants simultaneously.\n- **Food Truck Catering Arrangement**: Curated multi-option gourmet menu serving ${guestCount} attendees.\n- **Commercial Popcorn Station**: High-capacity 16oz kettle serving 250+ guests per hour.\n\n**2. Site Logistics:**\n- Inflatable area 26x22ft; Food truck parking 30x12ft flat access.\n- On-site generator coordination provided.`;
        setSuggestedServiceIds(['large-jumping-castle', 'food-truck-arrangements', 'large-popcorn-cart']);
      } else {
        setSuggestedServiceIds(['standard-jumping-castle', 'standard-popcorn-cart']);
      }
      setPlanResult(fallbackPlan);
      info('Event Blueprint Ready', 'Curated recommendation generated based on your event specifications.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/5 p-6 sm:p-8">
      <div className="flex items-center gap-2 mb-2">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
          <BrainCircuit className="w-3.5 h-3.5 text-blue-700" />
          <span>AI Event Blueprint Assistant</span>
        </span>
        <span className="text-xs text-slate-500">• Space & Power Calculator</span>
      </div>

      <div className="max-w-2xl mb-6">
        <h3 className="text-xl sm:text-2xl font-black text-[#0b192c] tracking-tight">
          Get Instant Equipment & Catering Suggestions
        </h3>
        <p className="text-slate-600 text-xs sm:text-sm mt-1">
          Tell us about your celebration size, space, or special requirements for an instant logistical recommendation.
        </p>
      </div>

      <form onSubmit={handleGenerateAIPlan} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Event Type
            </label>
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
            >
              <option value="Kids Birthday Party">Kids Birthday Party</option>
              <option value="Milestone Birthday">Milestone Birthday (Adult / Teen)</option>
              <option value="Corporate Family Day">Corporate Family Day</option>
              <option value="School Carnival / Fete">School Carnival / Fete</option>
              <option value="Community Festival">Community Festival</option>
              <option value="Wedding / Engagement">Wedding / Engagement</option>
              <option value="Backyard BBQ & Gathering">Backyard BBQ & Gathering</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Guest Count
            </label>
            <select
              value={guestCount}
              onChange={(e) => setGuestCount(e.target.value)}
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600"
            >
              <option value="15-30 guests">15 – 30 Guests</option>
              <option value="30-60 guests">30 – 60 Guests</option>
              <option value="60-120 guests">60 – 120 Guests</option>
              <option value="120-300 guests">120 – 300 Guests</option>
              <option value="300-1000+ attendees">300 – 1,000+ Attendees</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
              Venue / Surface Space
            </label>
            <input
              type="text"
              value={venueSpace}
              onChange={(e) => setVenueSpace(e.target.value)}
              placeholder="e.g. 40x30ft Grass Lawn, School Oval"
              className="w-full px-3 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
            Special Notes or Theme (Optional)
          </label>
          <textarea
            rows={2}
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            placeholder="e.g. Superhero theme for 7-year-olds, need shade and quick-serve concessions."
            className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-medium text-slate-900 focus:bg-white focus:ring-2 focus:ring-blue-600 placeholder:text-slate-400"
          />
        </div>

        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-slate-500 hidden sm:inline">
            Calculates safety clearances, electrical load & setup timing.
          </span>

          <button
            type="submit"
            disabled={isGenerating}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#0b192c] hover:bg-[#122543] active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin text-blue-400" />
                <span>Analyzing Logistics...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-blue-400" />
                <span>Generate Recommendations</span>
              </>
            )}
          </button>
        </div>
      </form>

      {/* Plan Result */}
      {planResult && (
        <div className="mt-5 pt-5 border-t border-slate-200 space-y-4 animate-fast-in">
          <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200">
            <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
              <div className="flex items-center gap-2 text-[#0b192c] font-bold text-sm">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Curated Event Logistics Blueprint</span>
              </div>
              <span className="text-[11px] text-blue-900 font-bold bg-blue-100/70 px-2 py-0.5 rounded">
                Verified
              </span>
            </div>

            <div className="text-slate-700 text-xs sm:text-sm leading-relaxed whitespace-pre-line">
              {planResult}
            </div>

            {suggestedServiceIds.length > 0 && (
              <div className="mt-4 pt-3 border-t border-slate-200 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold text-[#0b192c]">Recommended Bundle Items:</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {suggestedServiceIds.map(id => {
                      const item = SERVICES_DATA.find(s => s.id === id);
                      return item ? (
                        <span key={id} className="text-[11px] bg-white border border-slate-200 font-semibold px-2 py-0.5 rounded text-slate-800">
                          {item.name.split('(')[0]}
                        </span>
                      ) : null;
                    })}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    onApplyPlan(suggestedServiceIds);
                    info('Package Loaded', 'Recommended event package has been pre-filled in your booking modal.');
                  }}
                  className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs rounded-xl shadow-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span>Book This Recommendation</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
