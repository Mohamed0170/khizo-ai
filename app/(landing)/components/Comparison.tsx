"use client";

import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { Check, X, Minus } from 'lucide-react';

type CellValue = "yes" | "no" | "partial" | string;

interface ComparisonFeature {
  name: string;
  khizo: CellValue;
  desktop: CellValue;
  online: CellValue;
  freeTools: CellValue;
}

const comparisonData: ComparisonFeature[] = [
  { name: "AI Object Removal", khizo: "yes", desktop: "yes", online: "partial", freeTools: "partial" },
  { name: "Generative Fill", khizo: "yes", desktop: "yes", online: "no", freeTools: "no" },
  { name: "Background Removal", khizo: "yes", desktop: "yes", online: "yes", freeTools: "partial" },
  { name: "Image Restoration", khizo: "yes", desktop: "partial", online: "no", freeTools: "no" },
  { name: "Smart Recolor", khizo: "yes", desktop: "yes", online: "no", freeTools: "no" },
  { name: "Batch Processing", khizo: "yes", desktop: "yes", online: "no", freeTools: "no" },
  { name: "No Software Install", khizo: "yes", desktop: "no", online: "yes", freeTools: "yes" },
  { name: "Processing Speed", khizo: "< 5 sec", desktop: "10-30 sec", online: "5-15 sec", freeTools: "15-60 sec" },
  { name: "Free Plan Available", khizo: "yes", desktop: "no", online: "partial", freeTools: "yes" },
  { name: "No Watermarks", khizo: "yes", desktop: "yes", online: "partial", freeTools: "no" },
];

const competitors = [
  { key: "khizo", label: "Khizo AI", highlighted: true },
  { key: "desktop", label: "Desktop Editors", highlighted: false },
  { key: "online", label: "Online Editors", highlighted: false },
  { key: "freeTools", label: "Free Tools", highlighted: false },
];

const CellDisplay: React.FC<{ value: CellValue; highlighted?: boolean }> = ({ value, highlighted }) => {
  if (value === "yes") {
    return (
      <div className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto ${
        highlighted
          ? "bg-emerald-100 dark:bg-emerald-900/40"
          : "bg-slate-100 dark:bg-slate-700"
      }`}>
        <Check size={14} className={highlighted ? "text-emerald-600 dark:text-emerald-400" : "text-emerald-500 dark:text-emerald-500"} />
      </div>
    );
  }
  if (value === "no") {
    return (
      <div className="w-7 h-7 rounded-full flex items-center justify-center mx-auto bg-slate-100 dark:bg-slate-700">
        <X size={14} className="text-slate-400 dark:text-slate-500" />
      </div>
    );
  }
  if (value === "partial") {
    return (
      <div className="w-7 h-7 rounded-full flex items-center justify-center mx-auto bg-amber-50 dark:bg-amber-900/30">
        <Minus size={14} className="text-amber-500 dark:text-amber-400" />
      </div>
    );
  }
  // Text value (like processing speed)
  return (
    <span className={`text-xs font-medium ${
      highlighted ? "text-indigo-600 dark:text-indigo-400" : "text-slate-600 dark:text-slate-400"
    }`}>
      {value}
    </span>
  );
};

export const Comparison: React.FC = () => {
  return (
    <section id="comparison" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold rounded-full bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300">
              Comparison
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Why choose Khizo AI?
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              See how we compare to other popular image editing solutions.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-slate-900/30">
            {/* Scrollable on mobile */}
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                {/* Header */}
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-5 px-6 text-sm font-semibold text-slate-500 dark:text-slate-400 w-[200px]">
                      Feature
                    </th>
                    {competitors.map((comp) => (
                      <th key={comp.key} className="py-5 px-4 text-center">
                        <div className={`inline-flex flex-col items-center gap-1.5 ${
                          comp.highlighted ? "" : ""
                        }`}>
                          {comp.highlighted && (
                            <span className="px-2 py-0.5 rounded-full bg-indigo-100 dark:bg-indigo-900/40 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                              Best
                            </span>
                          )}
                          <span className={`text-sm font-bold ${
                            comp.highlighted
                              ? "text-indigo-600 dark:text-indigo-400"
                              : "text-slate-700 dark:text-slate-300"
                          }`}>
                            {comp.label}
                          </span>
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                {/* Body */}
                <tbody>
                  {comparisonData.map((row, idx) => (
                    <tr
                      key={idx}
                      className={`border-b border-slate-100 dark:border-slate-800 last:border-0 ${
                        idx % 2 === 0 ? "bg-slate-50/50 dark:bg-slate-800/20" : ""
                      }`}
                    >
                      <td className="py-4 px-6 text-sm font-medium text-slate-700 dark:text-slate-300">
                        {row.name}
                      </td>
                      {competitors.map((comp) => (
                        <td key={comp.key} className={`py-4 px-4 text-center ${
                          comp.highlighted ? "bg-indigo-50/50 dark:bg-indigo-900/5" : ""
                        }`}>
                          <CellDisplay
                            value={row[comp.key as keyof ComparisonFeature] as CellValue}
                            highlighted={comp.highlighted}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </RevealOnScroll>

        {/* Bottom note */}
        <RevealOnScroll delay={200}>
          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
            Comparison based on feature availability and average processing times as of 2026. Individual results may vary.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
