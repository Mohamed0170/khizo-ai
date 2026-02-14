"use client";

import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { Image, Sparkles, Eraser, Palette, Scissors, Zap, LucideIcon, ArrowRight } from 'lucide-react';

interface FeatureItem {
  title: string;
  subtitle: string;
  description: string;
  icon: LucideIcon;
  accentColor: string;
}

const features: FeatureItem[] = [
  {
    title: "Generative Fill",
    subtitle: "Expand and create with AI.",
    description: "Extend your images beyond their borders or add entirely new elements using simple text prompts. Our AI understands context, lighting, and perspective — generating content that blends seamlessly with your original image. Perfect for social media banners, product mockups, and creative projects.",
    icon: Sparkles,
    accentColor: "amber",
  },
  {
    title: "Object Removal",
    subtitle: "Clean up any photo instantly.",
    description: "Select any unwanted object, person, or blemish and watch it vanish. Our AI analyzes the surrounding area and intelligently fills the gap with realistic content. No more distracting backgrounds or photobombers — just clean, professional results every time.",
    icon: Eraser,
    accentColor: "red",
  },
  {
    title: "Image Restore",
    subtitle: "Bring old memories back to life.",
    description: "Revive damaged, scratched, or faded photographs with AI-powered restoration. Our model repairs tears, removes noise, enhances resolution up to 4x, and restores colors to their original vibrancy. Turn your family archives into high-definition masterpieces.",
    icon: Image,
    accentColor: "blue",
  },
  {
    title: "Object Recolor",
    subtitle: "Any color, any object, instantly.",
    description: "Change the color of any object in your image while perfectly preserving its texture, shadows, and highlights. From recoloring a car to changing a dress color for an e-commerce catalog — the AI handles complex surfaces with natural, realistic results.",
    icon: Palette,
    accentColor: "purple",
  },
  {
    title: "Background Remove",
    subtitle: "Pixel-perfect extraction.",
    description: "Extract subjects from their backgrounds with incredible precision — even handling fine details like hair, fur, and transparent edges. Export as transparent PNG or replace with any custom background. Ideal for product photography, portraits, and design work.",
    icon: Scissors,
    accentColor: "emerald",
  },
  {
    title: "Lightning Fast",
    subtitle: "Results in seconds, not minutes.",
    description: "Powered by GPU-accelerated cloud infrastructure, every transformation is delivered in under 5 seconds. No software to install, no rendering queues. Our distributed pipeline handles images up to 25MP resolution with consistent speed — whether you're processing one image or a thousand.",
    icon: Zap,
    accentColor: "yellow",
  },
];

/* ───────── Illustration Components ───────── */

const GenerativeFillIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Original image box */}
    <div className="relative w-40 h-32 rounded-xl border-2 border-dashed border-amber-400/60 dark:border-amber-500/40 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800">
      {/* Inner content */}
      <div className="absolute inset-2 rounded-lg bg-gradient-to-br from-sky-200 to-indigo-300 dark:from-sky-700 dark:to-indigo-600 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-green-500/40" />
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-6 h-10 bg-slate-500/60 rounded-t-full" />
      </div>
      {/* Expanding arrows */}
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 flex items-center gap-1">
        <div className="w-6 h-[2px] bg-amber-400 dark:bg-amber-500" />
        <ArrowRight size={14} className="text-amber-400 dark:text-amber-500 animate-pulse" />
      </div>
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <div className="h-6 w-[2px] bg-amber-400 dark:bg-amber-500" />
        <ArrowRight size={14} className="text-amber-400 dark:text-amber-500 rotate-90 animate-pulse" />
      </div>
    </div>
    {/* Sparkle decorations */}
    <div className="absolute top-8 right-12 text-amber-400 animate-pulse">
      <Sparkles size={16} />
    </div>
    <div className="absolute bottom-12 right-16 text-amber-300 animate-pulse [animation-delay:0.7s]">
      <Sparkles size={12} />
    </div>
    {/* Label */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-amber-500/10 dark:bg-amber-500/20 border border-amber-400/30 text-[11px] font-medium text-amber-600 dark:text-amber-400">
      AI Outpainting
    </div>
  </div>
);

const ObjectRemovalIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Photo frame */}
    <div className="relative w-44 h-32 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 overflow-hidden border border-slate-200 dark:border-slate-600">
      <div className="absolute inset-0 bg-gradient-to-b from-sky-100 to-emerald-100 dark:from-sky-800/50 dark:to-emerald-800/50" />
      {/* Object with selection */}
      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2">
        <div className="w-10 h-10 rounded-lg border-2 border-dashed border-red-400 dark:border-red-500 flex items-center justify-center animate-pulse">
          <div className="w-6 h-6 bg-slate-400/60 dark:bg-slate-500/60 rounded" />
        </div>
      </div>
      {/* Arrow pointing to clean result */}
      <div className="absolute top-1/2 left-1/2 -translate-y-1/2">
        <ArrowRight size={18} className="text-slate-400 dark:text-slate-500" />
      </div>
      {/* Clean area */}
      <div className="absolute top-1/2 right-6 -translate-y-1/2 w-10 h-10 rounded-lg border-2 border-green-400/50 dark:border-green-500/40 bg-gradient-to-br from-sky-100/80 to-emerald-100/80 dark:from-sky-800/40 dark:to-emerald-800/40 flex items-center justify-center">
        <span className="text-green-500 text-lg">✓</span>
      </div>
    </div>
    {/* Label */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-red-500/10 dark:bg-red-500/20 border border-red-400/30 text-[11px] font-medium text-red-600 dark:text-red-400">
      Smart Remove
    </div>
  </div>
);

const ImageRestoreIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center gap-4">
    {/* Before */}
    <div className="relative flex flex-col items-center gap-2">
      <div className="w-20 h-24 rounded-lg bg-gradient-to-br from-amber-100 to-yellow-200 dark:from-amber-900/40 dark:to-yellow-800/40 border border-amber-200 dark:border-amber-700 overflow-hidden relative">
        {/* Scratches */}
        <div className="absolute top-1 left-3 w-[1.5px] h-8 bg-slate-400/40 rotate-12" />
        <div className="absolute top-4 right-2 w-[1.5px] h-6 bg-slate-400/40 -rotate-6" />
        <div className="absolute bottom-3 left-2 w-6 h-[1.5px] bg-slate-400/30 rotate-3" />
        <div className="absolute inset-0 bg-yellow-800/5" />
      </div>
      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Before</span>
    </div>
    {/* Arrow */}
    <div className="flex flex-col items-center gap-1">
      <ArrowRight size={20} className="text-blue-400 dark:text-blue-500" />
      <span className="text-[9px] text-blue-400 dark:text-blue-500 font-medium">AI</span>
    </div>
    {/* After */}
    <div className="relative flex flex-col items-center gap-2">
      <div className="w-20 h-24 rounded-lg bg-gradient-to-br from-blue-200 to-cyan-200 dark:from-blue-700 dark:to-cyan-600 border border-blue-300 dark:border-blue-600 overflow-hidden relative shadow-lg shadow-blue-200/50 dark:shadow-blue-900/30">
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
      </div>
      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">After</span>
    </div>
    {/* Label */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-blue-500/10 dark:bg-blue-500/20 border border-blue-400/30 text-[11px] font-medium text-blue-600 dark:text-blue-400">
      HD Restoration
    </div>
  </div>
);

const ObjectRecolorIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    {/* Object with color swatches */}
    <div className="relative">
      <div className="w-20 h-20 rounded-2xl bg-purple-400 dark:bg-purple-500 shadow-lg shadow-purple-200 dark:shadow-purple-900/40 flex items-center justify-center animate-[recolorCard_4s_ease-in-out_infinite]">
        <Palette size={28} className="text-white/80" />
      </div>
      {/* Color swatches orbiting */}
      <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-red-400 border-2 border-white dark:border-slate-800 shadow-sm" />
      <div className="absolute -bottom-3 -right-3 w-6 h-6 rounded-full bg-blue-400 border-2 border-white dark:border-slate-800 shadow-sm" />
      <div className="absolute -bottom-3 -left-3 w-6 h-6 rounded-full bg-green-400 border-2 border-white dark:border-slate-800 shadow-sm" />
      <div className="absolute -top-3 -left-3 w-6 h-6 rounded-full bg-amber-400 border-2 border-white dark:border-slate-800 shadow-sm" />
      {/* Connection lines */}
      <div className="absolute -top-1 -right-1 w-3 h-3 border-t border-r border-slate-300 dark:border-slate-600 rounded-tr" />
      <div className="absolute -bottom-1 -right-1 w-3 h-3 border-b border-r border-slate-300 dark:border-slate-600 rounded-br" />
      <div className="absolute -bottom-1 -left-1 w-3 h-3 border-b border-l border-slate-300 dark:border-slate-600 rounded-bl" />
      <div className="absolute -top-1 -left-1 w-3 h-3 border-t border-l border-slate-300 dark:border-slate-600 rounded-tl" />
    </div>
    {/* Label */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-purple-500/10 dark:bg-purple-500/20 border border-purple-400/30 text-[11px] font-medium text-purple-600 dark:text-purple-400">
      Smart Recolor
    </div>
    <style jsx>{`
      @keyframes recolorCard {
        0%, 100% { background-color: rgb(192 132 252); }
        25% { background-color: rgb(248 113 113); }
        50% { background-color: rgb(96 165 250); }
        75% { background-color: rgb(74 222 128); }
      }
    `}</style>
  </div>
);

const BackgroundRemoveIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center gap-3">
    {/* Before - with background */}
    <div className="relative flex flex-col items-center gap-2">
      <div className="w-20 h-24 rounded-lg bg-gradient-to-b from-orange-200 to-pink-200 dark:from-orange-800/40 dark:to-pink-800/40 border border-slate-200 dark:border-slate-600 flex items-end justify-center overflow-hidden">
        <div className="w-8 h-14 bg-slate-600 dark:bg-slate-400 rounded-t-full mb-1" />
      </div>
      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Original</span>
    </div>
    {/* Arrow */}
    <ArrowRight size={20} className="text-emerald-400 dark:text-emerald-500 shrink-0" />
    {/* After - transparent background */}
    <div className="relative flex flex-col items-center gap-2">
      <div className="w-20 h-24 rounded-lg border border-slate-200 dark:border-slate-600 overflow-hidden relative">
        {/* Checkerboard */}
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
            linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
            linear-gradient(-45deg, transparent 75%, #e5e7eb 75%)
          `,
          backgroundSize: '10px 10px',
          backgroundPosition: '0 0, 0 5px, 5px -5px, -5px 0px'
        }} />
        <div className="absolute inset-0 dark:opacity-20" />
        {/* Subject */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-14 bg-slate-600 dark:bg-slate-400 rounded-t-full" />
        {/* Check mark */}
        <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
          <span className="text-white text-[10px] font-bold">✓</span>
        </div>
      </div>
      <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">Removed</span>
    </div>
    {/* Label */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-400/30 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
      Transparent PNG
    </div>
  </div>
);

const LightningFastIllustration = () => (
  <div className="relative w-full h-full flex items-center justify-center">
    <div className="relative flex flex-col items-center">
      {/* Big number */}
      <div className="flex items-baseline gap-1">
        <span className="text-6xl font-black text-slate-800 dark:text-slate-200 tracking-tighter">&lt;5</span>
        <span className="text-2xl font-bold text-yellow-500 dark:text-yellow-400">s</span>
      </div>
      <span className="text-sm text-slate-500 dark:text-slate-400 mt-1">processing time</span>
      {/* Speed bars */}
      <div className="flex items-end gap-1.5 mt-4 h-8">
        {[30, 50, 70, 90, 100, 90, 70].map((h, i) => (
          <div
            key={i}
            className="w-2 rounded-full bg-gradient-to-t from-yellow-500 to-amber-300 dark:from-yellow-600 dark:to-amber-400 animate-pulse"
            style={{ height: `${h}%`, animationDelay: `${i * 0.12}s` }}
          />
        ))}
      </div>
    </div>
    {/* Zap icons */}
    <div className="absolute top-8 right-10 text-yellow-400 animate-pulse">
      <Zap size={18} className="fill-yellow-400" />
    </div>
    <div className="absolute bottom-12 left-10 text-yellow-300 animate-pulse [animation-delay:0.5s]">
      <Zap size={14} className="fill-yellow-300" />
    </div>
    {/* Label */}
    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-yellow-500/10 dark:bg-yellow-500/20 border border-yellow-400/30 text-[11px] font-medium text-yellow-600 dark:text-yellow-400">
      GPU Accelerated
    </div>
  </div>
);

const illustrations: Record<string, React.FC> = {
  "Generative Fill": GenerativeFillIllustration,
  "Object Removal": ObjectRemovalIllustration,
  "Image Restore": ImageRestoreIllustration,
  "Object Recolor": ObjectRecolorIllustration,
  "Background Remove": BackgroundRemoveIllustration,
  "Lightning Fast": LightningFastIllustration,
};

/* ───────── Main Features Section ───────── */

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/50 via-slate-50 to-slate-50 dark:from-indigo-900/20 dark:via-slate-950 dark:to-slate-950 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300">
              Powerful Features
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Everything you need to create perfect images
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Khizo AI combines state-of-the-art models into a single, easy-to-use interface.
            </p>
          </div>
        </RevealOnScroll>

        <div className="flex flex-col gap-6">
          {features.map((feature, idx) => {
            const Illustration = illustrations[feature.title];
            const num = String(idx + 1).padStart(2, '0');
            
            return (
              <RevealOnScroll key={idx} delay={idx * 80}>
                <div className="group rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden">
                  {/* Number header */}
                  <div className="flex items-center gap-4 px-8 md:px-12 pt-8 md:pt-10">
                    <span className="text-3xl md:text-4xl font-black text-slate-200 dark:text-slate-800 select-none">
                      {num}
                    </span>
                    <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800" />
                  </div>

                  {/* Content: text left, illustration right */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 px-8 md:px-12 pb-8 md:pb-10 pt-6">
                    {/* Left — Text */}
                    <div className="flex flex-col justify-center">
                      <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white mb-3 leading-tight">
                        {feature.title}
                      </h3>
                      <p className="text-base md:text-lg font-medium text-slate-500 dark:text-slate-400 mb-4">
                        {feature.subtitle}
                      </p>
                      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Right — Illustration */}
                    <div className="relative min-h-[220px] md:min-h-[260px] rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-700/50 overflow-hidden">
                      {Illustration && <Illustration />}
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};
