"use client";

import React from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from './components/Navbar';
import { RevealOnScroll } from './components/RevealOnScroll';
import { HeroAnimation } from './components/HeroAnimation';
import { Logo } from './components/Logo';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import Link from 'next/link';

// Lazy load heavy sections - only load when user scrolls to them
const AppDemo = dynamic(() => import('./components/AppDemo').then(m => ({ default: m.AppDemo })), {
  loading: () => <div className="h-[400px]" />,
});
const Features = dynamic(() => import('./components/Features').then(m => ({ default: m.Features })), {
  loading: () => <div className="h-96" />,
});
const HowItWorks = dynamic(() => import('./components/HowItWorks').then(m => ({ default: m.HowItWorks })), {
  loading: () => <div className="h-96" />,
});
const Gallery = dynamic(() => import('./components/Gallery').then(m => ({ default: m.Gallery })), {
  loading: () => <div className="h-96" />,
});
const Comparison = dynamic(() => import('./components/Comparison').then(m => ({ default: m.Comparison })), {
  loading: () => <div className="h-96" />,
});
const Pricing = dynamic(() => import('./components/Pricing').then(m => ({ default: m.Pricing })), {
  loading: () => <div className="h-96" />,
});
const FAQ = dynamic(() => import('./components/FAQ').then(m => ({ default: m.FAQ })), {
  loading: () => <div className="h-96" />,
});
const CTASection = dynamic(() => import('./components/CTASection').then(m => ({ default: m.CTASection })), {
  loading: () => <div className="h-64" />,
});
const Footer = dynamic(() => import('./components/Footer').then(m => ({ default: m.Footer })), {
  loading: () => <div className="h-48" />,
});

const APP_URL = "/sign-up";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 selection:bg-indigo-200 dark:selection:bg-indigo-900 selection:text-indigo-900 dark:selection:text-indigo-100 overflow-x-hidden transition-colors duration-300 font-IBMPlex">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-12 md:pt-48 md:pb-24 overflow-hidden min-h-[90vh] flex flex-col justify-center">
        
        {/* Background Video */}
        <div className="absolute inset-0 w-full h-full overflow-hidden -z-20">
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            preload="none"
            loading="lazy"
            className="absolute inset-0 w-full h-full object-cover opacity-60 dark:opacity-20"
          >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-white-lines-fading-in-and-out-2747-large.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/95 via-slate-50/80 to-slate-50/95 dark:from-slate-950/95 dark:via-slate-950/80 dark:to-slate-950/95 transition-colors duration-300"></div>
        </div>

        {/* Decorative Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-300/20 dark:bg-indigo-900/20 rounded-full blur-[120px] -z-10 opacity-60 animate-pulse-slow"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 text-center relative z-10">
          
          {/* Animated Hero Graphic */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] md:w-[120%] h-[120%] -z-10 opacity-30 dark:opacity-20 pointer-events-none flex items-center justify-center">
             <HeroAnimation />
          </div>

          <RevealOnScroll delay={100}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 dark:bg-slate-900/80 border border-indigo-100 dark:border-indigo-900/50 text-sm text-indigo-700 dark:text-indigo-300 mb-8 shadow-sm hover:shadow-md transition-all cursor-pointer backdrop-blur-sm group">
              <span className="flex h-2 w-2 rounded-full bg-indigo-500 animate-pulse"></span>
              Khizo 1.0 is available now
              <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </RevealOnScroll>

          <div className="max-w-4xl mx-auto mb-12 relative z-10">
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight mb-8 text-slate-900 dark:text-white leading-[1.1] drop-shadow-sm">
              <div className="inline-block overflow-hidden pb-2">
                <span className="inline-block opacity-0 animate-text-reveal" style={{ animationDelay: '0.1s' }}>Unleash</span>&nbsp;
                <span className="inline-block opacity-0 animate-text-reveal" style={{ animationDelay: '0.2s' }}>Your</span>&nbsp;
                <span className="inline-block opacity-0 animate-text-reveal" style={{ animationDelay: '0.3s' }}>Creative</span>
              </div>
              <br className="hidden md:block" />
              <div className="inline-block overflow-hidden pb-4">
                <span className="inline-block opacity-0 animate-text-reveal" style={{ animationDelay: '0.4s' }}>Vision</span>&nbsp;
                <span className="inline-block opacity-0 animate-text-reveal" style={{ animationDelay: '0.5s' }}>with</span>&nbsp;
                <div className="relative inline-block">
                  <span className="inline-block animate-text-reveal text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 dark:from-indigo-400 dark:via-violet-400 dark:to-indigo-400 bg-300% animate-gradient" style={{ animationDelay: '0.6s' }}>
                     Khizo AI
                  </span>
                  <svg 
                    className="absolute -bottom-3 w-[120%] -left-[10%] h-4 md:h-6 opacity-0 animate-text-reveal"
                    style={{ animationDelay: '0.7s', filter: 'drop-shadow(0 0 4px rgba(139, 92, 246, 0.5))' }}
                    viewBox="0 0 200 9" 
                    fill="none" 
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <defs>
                      <linearGradient id="neonGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="#06b6d4" />
                        <stop offset="50%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                      </linearGradient>
                    </defs>
                    <path 
                      d="M2 7C45 2 75 10 105 7C145 3 175 10 198 4" 
                      stroke="url(#neonGradient)" 
                      strokeWidth="4" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </h1>

            <RevealOnScroll delay={800}>
              <p className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed px-4">
                The all-in-one AI creative suite. Restore photos, remove objects, and generate new content with a single click.
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={900}>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 px-4">
                <Link 
                  href={APP_URL}
                  className="group relative w-full sm:w-auto px-10 py-5 rounded-full font-bold text-lg transition-all shadow-[0_4px_20px_-5px_rgba(79,70,229,0.4)] hover:shadow-[0_8px_25px_-5px_rgba(79,70,229,0.5)] dark:shadow-indigo-900/40 hover:-translate-y-1 flex items-center justify-center gap-2 active:scale-95 overflow-hidden text-white"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 bg-[length:200%_auto] animate-gradient"></div>
                  <div className="absolute top-0 inset-x-0 h-1/2 bg-gradient-to-b from-white/20 to-transparent opacity-50"></div>
                  <div className="absolute inset-0 -translate-x-full animate-shine bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12 z-10" />
                  <span className="relative flex items-center justify-center gap-2 z-20">
                    Start Creating for Free
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
              </div>
            </RevealOnScroll>

            {/* Social Proof / Trust */}
            <RevealOnScroll delay={1100}>
              <div className="flex justify-center gap-6 md:gap-12 text-slate-500 dark:text-slate-400 text-xs md:text-sm font-medium items-center flex-wrap px-4">
                <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-900/50 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  4.9/5 Rating
                </div>
                <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-900/50 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                  <ShieldCheck className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  Secure Processing
                </div>
                <div className="flex items-center gap-2 bg-white/50 dark:bg-slate-900/50 px-3 py-1 rounded-full border border-slate-100 dark:border-slate-800 shadow-sm backdrop-blur-sm">
                  <Zap className="w-4 h-4 text-indigo-500 dark:text-indigo-400" />
                  Real-time Rendering
                </div>
              </div>
            </RevealOnScroll>
          </div>

        </div>
      </section>

      {/* App Demo Mockup Section */}
      <section id="demo" className="relative -mt-32 md:-mt-48 px-4 md:px-0 z-20 mb-32">
        <RevealOnScroll delay={200}>
          <div className="max-w-6xl mx-auto animate-float">
            <AppDemo />
          </div>
        </RevealOnScroll>
        
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-3/4 h-24 bg-gradient-to-t from-indigo-200/0 via-indigo-200/20 to-indigo-200/0 blur-2xl -mt-10 dark:opacity-30"></div>
      </section>

      <Features />

      <HowItWorks />

      <Gallery />

      <Comparison />

      <Pricing />

      <FAQ />

      <CTASection />

      {/* Footer */}
      <Footer />
    </div>
  );
}
