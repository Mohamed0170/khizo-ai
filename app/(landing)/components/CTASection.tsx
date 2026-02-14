"use client";

import React from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import Link from 'next/link';

const APP_URL = "/sign-up";

export const CTASection: React.FC = () => {
  return (
    <section className="py-20 md:py-32 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 md:px-6">
        <RevealOnScroll>
          <div className="relative p-8 md:p-20 rounded-[2rem] md:rounded-[3rem] overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 via-violet-600 to-purple-700 dark:from-indigo-700 dark:via-violet-700 dark:to-purple-800" />
            
            {/* Animated mesh pattern */}
            <div className="absolute inset-0 opacity-[0.07]" style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, white 1px, transparent 1px), radial-gradient(circle at 75% 75%, white 1px, transparent 1px)`,
              backgroundSize: '40px 40px',
            }} />

            {/* Glowing orbs */}
            <div className="absolute -top-20 -left-20 w-60 h-60 bg-white/20 rounded-full blur-[80px] animate-pulse" />
            <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-violet-400/30 rounded-full blur-[80px] animate-pulse [animation-delay:1s]" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-[100px]" />
            
            {/* Shine effect */}
            <div className="absolute top-0 -left-[100%] w-1/2 h-full bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-12 animate-shine" />

            {/* Content */}
            <div className="relative z-10 text-center">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 text-sm text-white/90 mb-8 backdrop-blur-sm">
                <Sparkles size={14} className="text-amber-300" />
                Start with 10 free credits
              </div>

              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 text-white leading-tight">
                Ready to transform
                <br />
                your creative workflow?
              </h2>
              
              <p className="text-base md:text-lg text-indigo-100/90 mb-10 max-w-2xl mx-auto leading-relaxed">
                Join thousands of creators, designers, and businesses using Khizo AI to produce stunning visuals in seconds — no design skills required.
              </p>

              {/* CTA buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <Link
                  href={APP_URL}
                  className="group relative w-full sm:w-auto px-10 py-4 bg-white text-indigo-600 hover:bg-indigo-50 rounded-full font-bold text-lg transition-all shadow-xl shadow-indigo-900/30 hover:shadow-2xl hover:-translate-y-1 active:scale-95 overflow-hidden inline-flex items-center justify-center gap-2"
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-shine bg-gradient-to-r from-transparent via-indigo-100 to-transparent skew-x-12 z-10" />
                  <span className="relative z-20">Get Started Free</span>
                  <ArrowRight size={20} className="relative z-20 group-hover:translate-x-1 transition-transform" />
                </Link>

                <Link
                  href="#features"
                  className="w-full sm:w-auto px-10 py-4 rounded-full font-semibold text-lg text-white/90 border border-white/20 hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2 backdrop-blur-sm"
                >
                  See Features
                </Link>
              </div>

              {/* Trust badges */}
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-white/60 text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <Shield size={14} />
                  <span>Secure & Private</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Zap size={14} />
                  <span>GPU Accelerated</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Sparkles size={14} />
                  <span>No Watermarks</span>
                </div>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
