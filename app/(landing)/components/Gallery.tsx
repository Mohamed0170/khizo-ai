"use client";

import React, { useState } from 'react';
import { RevealOnScroll } from './RevealOnScroll';

type Category = "all" | "restore" | "remove" | "fill" | "recolor" | "background";

interface GalleryItem {
  id: number;
  category: Category;
  label: string;
  beforeGradient: string;
  afterGradient: string;
  beforeOverlay: React.ReactNode;
  afterOverlay: React.ReactNode;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    category: "restore",
    label: "Photo Restoration",
    beforeGradient: "from-amber-100 to-orange-200 dark:from-amber-900/50 dark:to-orange-800/50",
    afterGradient: "from-blue-200 to-cyan-200 dark:from-blue-700 dark:to-cyan-600",
    beforeOverlay: (
      <>
        <div className="absolute top-2 left-4 w-[1.5px] h-12 bg-slate-400/50 rotate-12" />
        <div className="absolute top-6 right-5 w-[1.5px] h-8 bg-slate-400/40 -rotate-6" />
        <div className="absolute bottom-8 left-3 w-10 h-[1.5px] bg-slate-400/30 rotate-3" />
        <div className="absolute inset-0 bg-yellow-900/10" />
        <span className="absolute bottom-2 left-2 text-[9px] font-bold text-slate-500/60 uppercase">Damaged</span>
      </>
    ),
    afterOverlay: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
        <span className="absolute bottom-2 right-2 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Restored</span>
      </>
    ),
  },
  {
    id: 2,
    category: "remove",
    label: "Object Removal",
    beforeGradient: "from-sky-100 to-emerald-100 dark:from-sky-800/50 dark:to-emerald-800/50",
    afterGradient: "from-sky-100 to-emerald-100 dark:from-sky-800/50 dark:to-emerald-800/50",
    beforeOverlay: (
      <>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 border-2 border-dashed border-red-400 rounded-lg flex items-center justify-center">
          <div className="w-6 h-6 bg-slate-500/50 rounded" />
        </div>
        <span className="absolute bottom-2 left-2 text-[9px] font-bold text-red-500/70 uppercase">Unwanted</span>
      </>
    ),
    afterOverlay: (
      <>
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
          <span className="text-white text-[9px] font-bold">✓</span>
        </div>
        <span className="absolute bottom-2 right-2 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">Clean</span>
      </>
    ),
  },
  {
    id: 3,
    category: "fill",
    label: "Generative Fill",
    beforeGradient: "from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800",
    afterGradient: "from-indigo-100 to-violet-200 dark:from-indigo-800/50 dark:to-violet-700/50",
    beforeOverlay: (
      <>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 border-l-2 border-dashed border-amber-400/60 bg-slate-300/30 dark:bg-slate-600/30" />
        <span className="absolute bottom-2 left-2 text-[9px] font-bold text-slate-500/60 uppercase">Original</span>
      </>
    ),
    afterOverlay: (
      <>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-violet-200/20 dark:to-violet-600/20" />
        <span className="absolute bottom-2 right-2 text-[9px] font-bold text-violet-600 dark:text-violet-400 uppercase">Expanded</span>
      </>
    ),
  },
  {
    id: 4,
    category: "recolor",
    label: "Smart Recolor",
    beforeGradient: "from-red-200 to-pink-200 dark:from-red-800/50 dark:to-pink-800/50",
    afterGradient: "from-blue-200 to-cyan-200 dark:from-blue-700/50 dark:to-cyan-600/50",
    beforeOverlay: (
      <>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-red-400/60 dark:bg-red-500/50" />
        <span className="absolute bottom-2 left-2 text-[9px] font-bold text-red-500/70 uppercase">Red</span>
      </>
    ),
    afterOverlay: (
      <>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-blue-400/60 dark:bg-blue-500/50" />
        <span className="absolute bottom-2 right-2 text-[9px] font-bold text-blue-600 dark:text-blue-400 uppercase">Blue</span>
      </>
    ),
  },
  {
    id: 5,
    category: "background",
    label: "Background Remove",
    beforeGradient: "from-orange-200 to-pink-200 dark:from-orange-800/40 dark:to-pink-800/40",
    afterGradient: "from-white to-slate-100 dark:from-slate-800 dark:to-slate-700",
    beforeOverlay: (
      <>
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-16 bg-slate-600/60 dark:bg-slate-400/50 rounded-t-full" />
        <span className="absolute bottom-2 left-2 text-[9px] font-bold text-slate-500/60 uppercase">With BG</span>
      </>
    ),
    afterOverlay: (
      <>
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, #e5e7eb 25%, transparent 25%), linear-gradient(-45deg, #e5e7eb 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #e5e7eb 75%), linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)`,
          backgroundSize: '8px 8px',
          backgroundPosition: '0 0, 0 4px, 4px -4px, -4px 0px',
          opacity: 0.5,
        }} />
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-10 h-16 bg-slate-600/60 dark:bg-slate-400/50 rounded-t-full z-10" />
        <span className="absolute bottom-2 right-2 text-[9px] font-bold text-emerald-600 dark:text-emerald-400 uppercase z-10">Removed</span>
      </>
    ),
  },
  {
    id: 6,
    category: "restore",
    label: "Color Enhancement",
    beforeGradient: "from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-600",
    afterGradient: "from-rose-200 to-amber-200 dark:from-rose-700 dark:to-amber-600",
    beforeOverlay: (
      <>
        <div className="absolute inset-0 grayscale bg-gradient-to-br from-slate-300 to-slate-400 dark:from-slate-600 dark:to-slate-500 opacity-50" />
        <span className="absolute bottom-2 left-2 text-[9px] font-bold text-slate-500/60 uppercase">Faded</span>
      </>
    ),
    afterOverlay: (
      <>
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
        <span className="absolute bottom-2 right-2 text-[9px] font-bold text-amber-600 dark:text-amber-400 uppercase">Vibrant</span>
      </>
    ),
  },
];

const categories: { key: Category; label: string }[] = [
  { key: "all", label: "All" },
  { key: "restore", label: "Restore" },
  { key: "remove", label: "Remove" },
  { key: "fill", label: "Fill" },
  { key: "recolor", label: "Recolor" },
  { key: "background", label: "Background" },
];

export const Gallery: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<Category>("all");

  const filtered = activeCategory === "all"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeCategory);

  return (
    <section id="gallery" className="py-24 relative overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
      <div className="absolute top-0 right-0 w-96 h-96 bg-violet-200/30 dark:bg-violet-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/30 dark:bg-indigo-900/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold rounded-full bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300">
              Showcase
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              See the magic in action
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Explore before & after examples across all our AI-powered tools.
            </p>
          </div>
        </RevealOnScroll>

        {/* Filter Tabs */}
        <RevealOnScroll delay={100}>
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.key}
                onClick={() => setActiveCategory(cat.key)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === cat.key
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-indigo-900/40"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </RevealOnScroll>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, idx) => (
            <RevealOnScroll key={item.id} delay={idx * 80}>
              <div className="group rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/30 transition-all duration-500 hover:-translate-y-1">
                {/* Before / After slider */}
                <div className="relative h-56 overflow-hidden">
                  {/* Before side */}
                  <div className={`absolute inset-0 w-1/2 bg-gradient-to-br ${item.beforeGradient} overflow-hidden`}>
                    {item.beforeOverlay}
                  </div>
                  {/* After side */}
                  <div className={`absolute top-0 right-0 bottom-0 w-1/2 bg-gradient-to-br ${item.afterGradient} overflow-hidden`}>
                    {item.afterOverlay}
                  </div>
                  {/* Divider */}
                  <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white dark:bg-slate-600 z-20">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white dark:bg-slate-700 border-2 border-slate-200 dark:border-slate-600 flex items-center justify-center shadow-md">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-slate-500 dark:text-slate-400">
                        <path d="M8 6L4 12L8 18M16 6L20 12L16 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                  {/* Labels */}
                  <div className="absolute top-3 left-3 px-2 py-0.5 rounded bg-black/30 backdrop-blur-sm text-[10px] font-semibold text-white uppercase tracking-wider z-20">
                    Before
                  </div>
                  <div className="absolute top-3 right-3 px-2 py-0.5 rounded bg-black/30 backdrop-blur-sm text-[10px] font-semibold text-white uppercase tracking-wider z-20">
                    After
                  </div>
                </div>
                {/* Card footer */}
                <div className="px-5 py-4 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    {item.label}
                  </span>
                  <span className="text-[11px] px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-medium capitalize">
                    {item.category}
                  </span>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
