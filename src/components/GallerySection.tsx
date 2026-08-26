import React, { useState } from 'react';
import { Camera, X, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { GALLERY_DATA } from '../data/galleryData';

export const GallerySection: React.FC<{
  limit?: number;
  showHeader?: boolean;
}> = ({ limit, showHeader = true }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories = [
    { id: 'all', label: 'All Event Photos' },
    { id: 'jumping-castles', label: 'Bouncy Castles' },
    { id: 'popcorn-carts', label: 'Vintage Popcorn Carts' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? GALLERY_DATA
    : GALLERY_DATA.filter(item => item.category === selectedCategory);

  const displayItems = limit ? filteredItems.slice(0, limit) : filteredItems;

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(activeLightboxIndex === 0 ? displayItems.length - 1 : activeLightboxIndex - 1);
    }
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(activeLightboxIndex === displayItems.length - 1 ? 0 : activeLightboxIndex + 1);
    }
  };

  return (
    <div className="space-y-8">
      {showHeader && (
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold uppercase tracking-wider">
            <Camera className="w-3.5 h-3.5 text-blue-700" />
            <span>Verified Event Showcase</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-[#0b192c] tracking-tight">
            See Our Setups in Action
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            From backyard birthday bouncy castles to vintage movie-theater popcorn cart stations.
          </p>
        </div>
      )}

      {/* Category Pills */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#0b192c] text-white shadow-sm'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayItems.map((item, idx) => (
          <div
            key={item.id}
            onClick={() => openLightbox(idx)}
            className="group relative rounded-2xl overflow-hidden bg-slate-100 aspect-4/3 cursor-pointer shadow-sm border border-slate-200 hover:shadow-lg hover:border-blue-300 transition-all duration-200"
          >
            <div className="relative w-full h-full overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 shadow-sm text-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <Eye className="w-4 h-4 text-slate-800" />
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 text-white space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/50 text-blue-300 backdrop-blur-xs">
                    {item.categoryLabel}
                  </span>
                  <span className="text-[11px] text-slate-300 font-medium">
                    {item.eventType}
                  </span>
                </div>
                <h3 className="text-base font-bold leading-tight text-white group-hover:text-blue-300 transition-colors">
                  {item.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          onClick={closeLightbox}
          className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-slate-900 rounded-3xl overflow-hidden shadow-2xl border border-slate-800"
          >
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Close image preview"
            >
              <X className="w-5 h-5" />
            </button>

            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-slate-800/80 hover:bg-slate-700 text-white flex items-center justify-center transition-colors cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="relative aspect-16/10 bg-black flex items-center justify-center">
              <img
                src={displayItems[activeLightboxIndex].image}
                alt={displayItems[activeLightboxIndex].title}
                className="max-h-[75vh] w-full object-contain"
              />
            </div>

            <div className="p-5 bg-slate-900 text-white flex items-center justify-between">
              <div>
                <span className="text-xs text-blue-400 font-bold uppercase">
                  {displayItems[activeLightboxIndex].categoryLabel} • {displayItems[activeLightboxIndex].eventType}
                </span>
                <h4 className="text-lg font-bold">
                  {displayItems[activeLightboxIndex].title}
                </h4>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                {activeLightboxIndex + 1} / {displayItems.length}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
