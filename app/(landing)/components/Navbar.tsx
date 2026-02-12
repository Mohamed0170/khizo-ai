"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { Logo } from './Logo';
import Link from 'next/link';

const APP_URL = "/sign-in";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    } else {
      setIsDark(false);
      document.documentElement.classList.remove('dark');
    }

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark');
      localStorage.theme = 'light';
      setIsDark(false);
    } else {
      document.documentElement.classList.add('dark');
      localStorage.theme = 'dark';
      setIsDark(true);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled 
          ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-slate-200/50 dark:border-slate-800/50 shadow-sm' 
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Logo className="w-8 h-8 md:w-9 md:h-9" />
          <span className="font-bold text-xl md:text-2xl tracking-tight text-indigo-600 dark:text-indigo-400">Khizo AI</span>
        </Link>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          <Link 
            href={APP_URL}
            className="relative px-5 py-2 rounded-full font-medium text-slate-600 dark:text-slate-300 transition-all duration-300 group overflow-hidden hover:text-indigo-600 dark:hover:text-indigo-300"
          >
            <span className="absolute inset-0 w-full h-full bg-indigo-100/50 dark:bg-indigo-500/10 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full origin-center"></span>
            <span className="relative z-10">Sign in</span>
          </Link>

          <Link 
            href="/sign-up"
            className="group relative inline-flex items-center justify-center px-6 py-2 overflow-hidden rounded-full font-medium text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-indigo-600 to-violet-600"></span>
            <span className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full animate-shine skew-x-12"></span>
            <span className="relative flex items-center gap-2">
              Get Started
            </span>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex items-center gap-4 md:hidden">
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          <button 
            className="p-2 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 p-4 flex flex-col gap-4 shadow-xl animate-fade-in-down">
          <Link 
            href={APP_URL} 
            className="w-full text-center py-2 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium hover:bg-indigo-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            Sign in
          </Link>
          <Link 
            href="/sign-up"
            className="w-full block text-center py-3.5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-xl text-white font-medium shadow-md active:scale-95 transition-transform"
          >
            Get Started
          </Link>
        </div>
      )}
    </nav>
  );
};
