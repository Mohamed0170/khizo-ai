"use client";

import React from 'react';
import { Check, X, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { RevealOnScroll } from './RevealOnScroll';

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    price: 0,
    period: "",
    credits: 10,
    featured: false,
    inclusions: [
      { label: "10 Free Credits", included: true },
      { label: "Basic Access to Services", included: true },
      { label: "Standard Processing Speed", included: true },
      { label: "Priority Customer Support", included: false },
      { label: "Priority Updates", included: false },
    ],
    cta: "Get Started Free",
  },
  {
    name: "Pro",
    description: "Best for creators & professionals",
    price: 40,
    period: "/mo",
    credits: 120,
    featured: true,
    inclusions: [
      { label: "120 Credits per month", included: true },
      { label: "Full Access to Services", included: true },
      { label: "Faster Processing Speed", included: true },
      { label: "Priority Customer Support", included: true },
      { label: "Priority Updates", included: false },
    ],
    cta: "Start Pro Plan",
  },
  {
    name: "Premium",
    description: "For teams & power users",
    price: 199,
    period: "/mo",
    credits: 2000,
    featured: false,
    inclusions: [
      { label: "2,000 Credits per month", included: true },
      { label: "Full Access to Services", included: true },
      { label: "Fastest Processing Speed", included: true },
      { label: "Priority Customer Support", included: true },
      { label: "Priority Updates", included: true },
    ],
    cta: "Go Premium",
  },
];

export const Pricing: React.FC = () => {
  return (
    <section id="pricing" className="py-20 md:py-32 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-indigo-200/20 dark:bg-indigo-900/10 rounded-full blur-[120px] -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <RevealOnScroll>
          <div className="text-center mb-16 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/50 border border-indigo-100 dark:border-indigo-900/50 text-sm text-indigo-600 dark:text-indigo-400 mb-6">
              <Sparkles size={14} />
              Simple Pricing
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4 tracking-tight">
              Choose Your{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600 dark:from-indigo-400 dark:to-violet-400">
                Creative Plan
              </span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-base md:text-lg max-w-2xl mx-auto">
              Start for free, upgrade when you need more power.
            </p>
          </div>
        </RevealOnScroll>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            return (
              <RevealOnScroll key={plan.name} delay={index * 150}>
                <div
                  className={`relative h-full rounded-2xl transition-all duration-300 hover:-translate-y-2 group ${
                    plan.featured
                      ? 'md:-mt-4 md:mb-4'
                      : ''
                  }`}
                >
                  {/* Featured badge */}
                  {plan.featured && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                      <div className="px-4 py-1 rounded-full bg-gradient-to-r from-indigo-600 to-violet-600 text-white text-xs font-bold shadow-lg shadow-indigo-500/30 whitespace-nowrap">
                        Most Popular
                      </div>
                    </div>
                  )}

                  {/* Card glow effect */}
                  {plan.featured && (
                    <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-indigo-500 via-violet-500 to-indigo-500 opacity-100 dark:opacity-70 -z-10"></div>
                  )}

                  <div
                    className={`relative h-full rounded-2xl p-6 lg:p-8 flex flex-col ${
                      plan.featured
                        ? 'bg-white dark:bg-slate-900 shadow-2xl shadow-indigo-200/50 dark:shadow-indigo-900/30'
                        : 'bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-lg hover:shadow-xl'
                    }`}
                  >
                    {/* Plan header */}
                    <div className="mb-6">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                        {plan.name}
                      </h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {plan.description}
                      </p>
                    </div>

                    {/* Price */}
                    <div className="mb-6 pb-6 border-b border-slate-100 dark:border-slate-800">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white">
                          ${plan.price}
                        </span>
                        {plan.period && (
                          <span className="text-slate-500 dark:text-slate-400 text-sm">
                            {plan.period}
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                        {plan.credits.toLocaleString()} credits{plan.price > 0 ? ' per month' : ''}
                      </p>
                    </div>

                    {/* Inclusions */}
                    <ul className="space-y-3 mb-8 flex-1">
                      {plan.inclusions.map((item) => (
                        <li key={item.label} className="flex items-start gap-3">
                          {item.included ? (
                            <div className="mt-0.5 w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center flex-shrink-0">
                              <Check size={12} className="text-emerald-600 dark:text-emerald-400" />
                            </div>
                          ) : (
                            <div className="mt-0.5 w-5 h-5 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center flex-shrink-0">
                              <X size={12} className="text-slate-400 dark:text-slate-600" />
                            </div>
                          )}
                          <span
                            className={`text-sm ${
                              item.included
                                ? 'text-slate-700 dark:text-slate-300'
                                : 'text-slate-400 dark:text-slate-600'
                            }`}
                          >
                            {item.label}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <Link
                      href="/sign-up"
                      className={`block w-full text-center py-3 px-6 rounded-xl font-semibold text-sm transition-all duration-300 ${
                        plan.featured
                          ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:-translate-y-0.5 active:scale-[0.98]'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-[0.98]'
                      }`}
                    >
                      {plan.cta}
                    </Link>
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Bottom note */}
        <RevealOnScroll delay={500}>
          <p className="text-center text-xs text-slate-400 dark:text-slate-500 mt-10 max-w-md mx-auto">
            All plans include access to our core AI tools. Credits are used per transformation. 
            Unused credits do not roll over.
          </p>
        </RevealOnScroll>
      </div>
    </section>
  );
};
