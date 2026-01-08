"use client";

import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { Image, Sparkles, Eraser, Palette, Scissors, Zap, LucideIcon } from 'lucide-react';

interface FeatureItem {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

const features: FeatureItem[] = [
  {
    title: "Generative Fill",
    description: "Expand images or add new elements seamlessly with simple text prompts.",
    icon: Sparkles,
    color: "text-amber-500 bg-amber-50 dark:bg-amber-900/20"
  },
  {
    title: "Object Removal",
    description: "Clean up your photos by magically removing unwanted objects or people.",
    icon: Eraser,
    color: "text-red-500 bg-red-50 dark:bg-red-900/20"
  },
  {
    title: "Image Restore",
    description: "Bring old, blurry, or damaged photos back to life with high-definition clarity.",
    icon: Image,
    color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20"
  },
  {
    title: "Object Recolor",
    description: "Change the color of any object in your image instantly while preserving texture.",
    icon: Palette,
    color: "text-purple-500 bg-purple-50 dark:bg-purple-900/20"
  },
  {
    title: "Background Remove",
    description: "Extract subjects from their background with pixel-perfect precision.",
    icon: Scissors,
    color: "text-green-500 bg-green-50 dark:bg-green-900/20"
  },
  {
    title: "Lightning Fast",
    description: "Deliver results in seconds, not minutes.",
    icon: Zap,
    color: "text-yellow-500 bg-yellow-50 dark:bg-yellow-900/20"
  }
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden bg-slate-50 dark:bg-slate-950 transition-colors duration-300">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/50 via-slate-50 to-slate-50 dark:from-indigo-900/20 dark:via-slate-950 dark:to-slate-950 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Everything you need to create perfect images
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Khizo AI combines state-of-the-art models into a single, easy-to-use interface.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <RevealOnScroll key={idx} delay={idx * 100}>
              <div 
                className="group p-8 rounded-2xl bg-white dark:bg-slate-900 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 border border-slate-100 dark:border-slate-800 hover:shadow-xl hover:shadow-indigo-100 dark:hover:shadow-indigo-900/20 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 ${feature.color}`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">{feature.title}</h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
