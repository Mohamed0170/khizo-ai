"use client";

import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { Upload, Wand2, Download, MousePointerClick } from 'lucide-react';

interface Step {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  accentColor: string;
  illustration: React.ReactNode;
}

const steps: Step[] = [
  {
    number: "01",
    title: "Upload Your Image",
    description: "Drag and drop any image or paste from clipboard. We support PNG, JPG, WebP, and TIFF formats up to 25MP resolution.",
    icon: <Upload size={24} />,
    accentColor: "indigo",
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Upload box */}
        <div className="w-40 h-32 rounded-2xl border-2 border-dashed border-indigo-300 dark:border-indigo-600 bg-indigo-50/50 dark:bg-indigo-900/20 flex flex-col items-center justify-center gap-3 group-hover:border-indigo-400 dark:group-hover:border-indigo-500 transition-colors">
          <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-800/50 flex items-center justify-center">
            <Upload size={20} className="text-indigo-500 dark:text-indigo-400 animate-bounce" />
          </div>
          <div className="text-center">
            <p className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400">Drop image here</p>
            <p className="text-[9px] text-slate-400 dark:text-slate-500 mt-0.5">PNG, JPG, WebP</p>
          </div>
        </div>
        {/* Floating file icons */}
        <div className="absolute top-6 right-8 w-8 h-10 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm flex items-center justify-center animate-float [animation-delay:0.3s]">
          <span className="text-[8px] font-bold text-blue-500">JPG</span>
        </div>
        <div className="absolute bottom-8 left-8 w-8 h-10 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 shadow-sm flex items-center justify-center animate-float [animation-delay:0.7s]">
          <span className="text-[8px] font-bold text-emerald-500">PNG</span>
        </div>
      </div>
    ),
  },
  {
    number: "02",
    title: "Choose Your Tool",
    description: "Select from our suite of AI tools — restore, remove objects, fill backgrounds, recolor, or extract subjects. Each is optimized for specific tasks.",
    icon: <MousePointerClick size={24} />,
    accentColor: "violet",
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Tool grid */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Restore", color: "bg-blue-400" },
            { label: "Remove", color: "bg-red-400" },
            { label: "Fill", color: "bg-amber-400" },
            { label: "Recolor", color: "bg-purple-400" },
            { label: "Extract", color: "bg-emerald-400" },
            { label: "Enhance", color: "bg-cyan-400" },
          ].map((tool, i) => (
            <div
              key={i}
              className={`w-16 h-14 rounded-xl ${i === 1 ? 'ring-2 ring-violet-500 ring-offset-2 dark:ring-offset-slate-800 scale-105' : ''} bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex flex-col items-center justify-center gap-1 shadow-sm hover:shadow-md transition-all cursor-pointer`}
            >
              <div className={`w-4 h-4 rounded-full ${tool.color}`} />
              <span className="text-[8px] font-medium text-slate-600 dark:text-slate-300">{tool.label}</span>
            </div>
          ))}
        </div>
        {/* Cursor */}
        <div className="absolute top-12 right-12">
          <MousePointerClick size={20} className="text-violet-500 dark:text-violet-400 animate-pulse" />
        </div>
      </div>
    ),
  },
  {
    number: "03",
    title: "AI Does the Magic",
    description: "Our AI processes your image in seconds using GPU-accelerated cloud infrastructure. Watch the transformation happen in real-time with live preview.",
    icon: <Wand2 size={24} />,
    accentColor: "amber",
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Processing animation */}
        <div className="relative">
          <div className="w-32 h-24 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 border border-slate-200 dark:border-slate-600 overflow-hidden">
            {/* Scanning line */}
            <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent animate-scan" />
            {/* Sparkle particles */}
            <div className="absolute top-3 left-4 w-1.5 h-1.5 bg-amber-400 rounded-full animate-ping" />
            <div className="absolute top-8 right-6 w-1 h-1 bg-violet-400 rounded-full animate-ping [animation-delay:0.5s]" />
            <div className="absolute bottom-5 left-8 w-1 h-1 bg-indigo-400 rounded-full animate-ping [animation-delay:1s]" />
          </div>
          {/* Progress bar */}
          <div className="mt-3 w-32 h-2 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-amber-400 to-orange-500 animate-progress" />
          </div>
          <p className="text-[10px] text-amber-600 dark:text-amber-400 font-medium mt-1.5 text-center">Processing...</p>
        </div>
        {/* Wand */}
        <div className="absolute top-6 right-10 text-amber-400 animate-pulse">
          <Wand2 size={22} />
        </div>
      </div>
    ),
  },
  {
    number: "04",
    title: "Download & Share",
    description: "Export your transformed image in full resolution. Download as PNG, JPG, or WebP. Share directly to social media or save to your cloud storage.",
    icon: <Download size={24} />,
    accentColor: "emerald",
    illustration: (
      <div className="relative w-full h-full flex items-center justify-center">
        {/* Completed image */}
        <div className="relative">
          <div className="w-36 h-28 rounded-xl bg-gradient-to-br from-emerald-100 to-cyan-100 dark:from-emerald-800/40 dark:to-cyan-800/40 border border-emerald-200 dark:border-emerald-700 shadow-lg shadow-emerald-100 dark:shadow-emerald-900/30 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
            {/* Check badge */}
            <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center shadow-sm">
              <span className="text-white text-xs font-bold">✓</span>
            </div>
          </div>
          {/* Download button */}
          <div className="mt-3 mx-auto w-28 h-8 rounded-lg bg-emerald-500 flex items-center justify-center gap-1.5 shadow-md shadow-emerald-200 dark:shadow-emerald-900/30 animate-pulse">
            <Download size={12} className="text-white" />
            <span className="text-[11px] font-semibold text-white">Download</span>
          </div>
        </div>
        {/* Format badges */}
        <div className="absolute bottom-8 left-6 flex flex-col gap-1.5">
          {["PNG", "JPG", "WebP"].map((fmt, i) => (
            <div key={fmt} className="px-2 py-0.5 rounded bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-[8px] font-bold text-slate-500 dark:text-slate-400 shadow-sm animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
              {fmt}
            </div>
          ))}
        </div>
      </div>
    ),
  },
];

export const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-violet-200/20 dark:bg-violet-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
              Simple Process
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              How it works
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Transform any image in four simple steps. No design skills needed.
            </p>
          </div>
        </RevealOnScroll>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-[2px] -translate-y-1/2 bg-gradient-to-r from-indigo-200 via-violet-200 via-amber-200 to-emerald-200 dark:from-indigo-800 dark:via-violet-800 dark:via-amber-800 dark:to-emerald-800 z-0" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, idx) => (
              <RevealOnScroll key={idx} delay={idx * 120}>
                <div className="group relative flex flex-col h-full">
                  {/* Step number */}
                  <div className="flex items-center gap-3 mb-4 relative z-10">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg
                      ${step.accentColor === 'indigo' ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/40 dark:text-indigo-400' : ''}
                      ${step.accentColor === 'violet' ? 'bg-violet-100 text-violet-600 dark:bg-violet-900/40 dark:text-violet-400' : ''}
                      ${step.accentColor === 'amber' ? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400' : ''}
                      ${step.accentColor === 'emerald' ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400' : ''}
                    `}>
                      {step.number}
                    </div>
                    <div className="flex-1 h-[1px] bg-slate-200 dark:bg-slate-800 lg:hidden" />
                  </div>

                  {/* Card */}
                  <div className="flex-1 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 overflow-hidden hover:shadow-xl hover:shadow-slate-200/50 dark:hover:shadow-slate-900/30 hover:-translate-y-1">
                    {/* Illustration */}
                    <div className="h-44 relative bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-700/50 overflow-hidden">
                      {step.illustration}
                    </div>
                    {/* Text */}
                    <div className="p-5">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes scan {
          0%, 100% { top: 0; }
          50% { top: calc(100% - 2px); }
        }
        @keyframes progress {
          0% { width: 0%; }
          50% { width: 80%; }
          100% { width: 100%; }
        }
        .animate-scan {
          animation: scan 2s ease-in-out infinite;
        }
        .animate-progress {
          animation: progress 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};
