"use client";

import React, { useState } from 'react';
import { RevealOnScroll } from './RevealOnScroll';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  {
    question: "What types of images does Khizo AI support?",
    answer: "Khizo AI supports all major image formats including PNG, JPG, JPEG, WebP, and TIFF. You can upload images up to 25 megapixels in resolution. For best results, we recommend using high-quality source images, though our AI restoration tool can also enhance lower-quality photos.",
  },
  {
    question: "How does the credit system work?",
    answer: "Each transformation uses a certain number of credits depending on the complexity: Background removal uses 1 credit, Object removal uses 2 credits, Generative fill uses 3 credits, and so on. Free accounts receive 10 credits to start. You can purchase additional credits or upgrade to a Pro or Premium plan for more credits per month.",
  },
  {
    question: "Is my data secure and private?",
    answer: "Absolutely. Your images are encrypted during upload and processing. We never share your images with third parties, and all uploaded images are automatically deleted from our servers after 24 hours.  We use enterprise-grade encryption for all data at rest and in transit.",
  },
  {
    question: "How fast is the AI processing?",
    answer: "Most transformations complete in under 5 seconds thanks to our GPU-accelerated cloud infrastructure. Processing time may vary slightly based on image size and the complexity of the transformation. Our distributed pipeline ensures consistent speed whether you're processing a single image or a large batch.",
  },
  {
    question: "Can I use Khizo AI for commercial projects?",
    answer: "Yes! All output images are fully yours to use for both personal and commercial purposes. There are no watermarks on any plan, and no attribution required. This includes using outputs for marketing materials, e-commerce product photos, social media content, print media, and more.",
  },
  {
    question: "What makes Khizo AI different from other AI image tools?",
    answer: "Khizo AI combines multiple state-of-the-art AI models into a single, intuitive interface. Instead of switching between different apps for restoration, removal, and generation, you get everything in one place. Our models are constantly updated with the latest research, and we offer some of the fastest processing times in the industry.",
  },
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 relative overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-indigo-100/40 dark:bg-indigo-900/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-violet-100/40 dark:bg-violet-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-block px-4 py-1.5 mb-4 text-sm font-semibold rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300">
              FAQ
            </span>
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-slate-900 dark:text-white">
              Frequently asked questions
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400">
              Everything you need to know about Khizo AI. Can&apos;t find what you&apos;re looking for? Contact us.
            </p>
          </div>
        </RevealOnScroll>

        <div className="flex flex-col gap-3">
          {faqItems.map((item, idx) => (
            <RevealOnScroll key={idx} delay={idx * 60}>
              <div
                className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                  openIndex === idx
                    ? "bg-indigo-50/50 dark:bg-indigo-900/10 border-indigo-200 dark:border-indigo-800 shadow-lg shadow-indigo-100/50 dark:shadow-indigo-900/20"
                    : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                }`}
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full flex items-center gap-4 px-6 py-5 text-left"
                >
                  <div className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    openIndex === idx
                      ? "bg-indigo-100 dark:bg-indigo-800/50 text-indigo-600 dark:text-indigo-400"
                      : "bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500"
                  }`}>
                    <HelpCircle size={16} />
                  </div>
                  <span className={`flex-1 font-semibold transition-colors ${
                    openIndex === idx
                      ? "text-indigo-900 dark:text-indigo-100"
                      : "text-slate-700 dark:text-slate-300"
                  }`}>
                    {item.question}
                  </span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-slate-400 dark:text-slate-500 transition-transform duration-300 ${
                      openIndex === idx ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === idx ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <div className="px-6 pb-5 pl-[4.5rem]">
                    <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
