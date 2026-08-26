import React, { useState } from 'react';
import { Check, ArrowRight, Layers } from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData';
import { useToast } from '../context/ToastContext';

interface MultiServiceCustomizerProps {
  onRequestPackage: (selectedServiceIds: string[]) => void;
}

export const MultiServiceCustomizer: React.FC<MultiServiceCustomizerProps> = ({
  onRequestPackage,
}) => {
  const [selectedIds, setSelectedIds] = useState<string[]>([
    'food-truck-arrangements',
    'standard-jumping-castle',
    'standard-popcorn-cart',
  ]);
  const { info } = useToast();

  const toggleService = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id)
        ? (prev.length > 1 ? prev.filter(s => s !== id) : prev)
        : [...prev, id]
    );
  };

  const selectedServices = SERVICES_DATA.filter(s => selectedIds.includes(s.id));

  return (
    <div className="rounded-3xl bg-white border border-slate-200/90 shadow-xl shadow-slate-900/5 p-6 sm:p-10">
      <div className="space-y-6">
        <div className="max-w-3xl space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <Layers className="w-3.5 h-3.5 text-blue-700" />
            <span>Turnkey Multi-Service Package Builder</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#0b192c] tracking-tight">
            Bundle Equipment & Catering for Single-Source Delivery
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select the services you need for your celebration. We synchronize delivery windows, electrical testing, and on-site dispatch under one trusted contract.
          </p>
        </div>

        {/* Service Toggle Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {SERVICES_DATA.map(service => {
            const isSelected = selectedIds.includes(service.id);
            return (
              <div
                key={service.id}
                onClick={() => toggleService(service.id)}
                className={`cursor-pointer rounded-2xl p-4 border transition-all duration-150 flex flex-col justify-between group ${
                  isSelected
                    ? 'bg-blue-50/70 border-blue-500 shadow-sm ring-1 ring-blue-300'
                    : 'bg-slate-50/70 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600 px-2 py-0.5 rounded bg-white border border-slate-200">
                      {service.category}
                    </span>
                    <div className={`w-5 h-5 rounded-lg flex items-center justify-center border transition-all ${
                      isSelected
                        ? 'bg-[#0b192c] border-[#0b192c] text-white shadow-sm'
                        : 'border-slate-300 bg-white text-transparent'
                    }`}>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                  </div>
                  <h4 className={`text-sm font-bold leading-snug mb-1 transition-colors ${isSelected ? 'text-[#0b192c]' : 'text-slate-900'}`}>
                    {service.name.split('(')[0]}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {service.shortDescription}
                  </p>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-[11px]">
                  <span className={isSelected ? 'text-blue-900 font-bold' : 'text-slate-500'}>
                    {isSelected ? '✓ Included in bundle' : '+ Tap to add'}
                  </span>
                  <span className="text-slate-400 text-[10px] font-medium">
                    {service.isCore ? 'Popular' : 'Add-on'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Summary Bar & CTA */}
        <div className="bg-[#0b192c] rounded-2xl p-5 sm:p-6 text-white flex flex-col lg:flex-row lg:items-center justify-between gap-5 shadow-lg">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                Active Package Selection
              </span>
              <span className="text-xs text-slate-300 font-medium">
                ({selectedIds.length} {selectedIds.length === 1 ? 'Service' : 'Services'} Selected)
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {selectedServices.map(s => (
                <span
                  key={s.id}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-800 text-blue-200 border border-slate-700"
                >
                  <span>{s.name.split('(')[0]}</span>
                </span>
              ))}
            </div>
            <p className="text-[11px] text-slate-400">
              Includes synchronized delivery windows, single dispatch lead, and certified equipment setup.
            </p>
          </div>

          <div className="shrink-0">
            <button
              onClick={() => {
                onRequestPackage(selectedIds);
                info('Package Loaded', `${selectedIds.length} services loaded into your booking reservation.`);
              }}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Reserve Configured Bundle</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
