"use client";

import React from 'react';
import { 
  Home, 
  Image as ImageIcon, 
  Sparkles, 
  Eraser, 
  Palette, 
  Scissors, 
  User, 
  ShoppingBag, 
  Search
} from 'lucide-react';
import { Logo } from './Logo';

export const AppDemo: React.FC = () => {
  return (
    <div className="relative w-full max-w-6xl mx-auto perspective-1000">
      {/* Glow Effect behind the app */}
      <div className="absolute -inset-1 bg-gradient-to-r from-indigo-400 to-violet-400 rounded-2xl blur-lg opacity-30"></div>
      
      {/* The App Container */}
      <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden flex h-[500px] md:h-[600px] lg:h-[700px] w-full border border-slate-200/60 transition-colors duration-300 text-slate-900">
        
        {/* Sidebar */}
        <div className="w-16 md:w-20 lg:w-64 bg-white border-r border-gray-100 flex flex-col py-6 transition-all duration-300">
          <div className="px-0 md:px-0 lg:px-8 mb-8 flex items-center justify-center lg:justify-start gap-3">
             <div className="lg:hidden">
                <Logo className="w-8 h-8" />
             </div>
             <div className="hidden lg:flex items-center gap-2">
                <Logo className="w-8 h-8" />
                <span className="font-bold text-indigo-600 text-lg">Khizo AI</span>
             </div>
          </div>

          <div className="flex-1 flex flex-col gap-2 px-2 lg:px-3">
            {/* Active Item */}
            <div className="flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-4 py-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-200 cursor-pointer transition-transform hover:scale-[1.02]">
              <Home size={20} />
              <span className="hidden lg:block font-medium">Home</span>
            </div>

            {/* Inactive Items */}
            {[
              { icon: ImageIcon, label: "Image Restore" },
              { icon: Sparkles, label: "Generative Fill" },
              { icon: Eraser, label: "Object Remove" },
              { icon: Palette, label: "Object Recolor" },
              { icon: Scissors, label: "Background Remove" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-indigo-600 rounded-xl cursor-pointer transition-colors group">
                <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                <span className="hidden lg:block font-medium">{item.label}</span>
              </div>
            ))}
            
            <div className="mt-8">
               {[
              { icon: User, label: "Profile" },
              { icon: ShoppingBag, label: "Buy Credits" },
            ].map((item, idx) => (
              <div key={idx} className="flex items-center justify-center lg:justify-start gap-3 px-0 lg:px-4 py-3 text-gray-500 hover:bg-gray-50 hover:text-indigo-600 rounded-xl cursor-pointer transition-colors">
                <item.icon size={20} />
                <span className="hidden lg:block font-medium">{item.label}</span>
              </div>
            ))}
            </div>
          </div>

          <div className="px-0 lg:px-8 mt-auto flex items-center justify-center lg:justify-start gap-3">
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs border border-white shadow-sm">K</div>
            <span className="hidden lg:block font-medium text-gray-700">Khizo AI user</span>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 bg-gray-50 p-4 md:p-6 lg:p-8 overflow-y-auto scrollbar-hide transition-colors duration-300">
          
          {/* Hero Banner inside App */}
          <div className="w-full bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] rounded-3xl p-6 md:p-8 lg:p-12 text-center text-white relative overflow-hidden shadow-xl shadow-indigo-200/50">
             {/* Decorative stars/sparkles in banner */}
             <Sparkles className="absolute top-8 left-8 text-white/20 w-16 h-16 -rotate-12 animate-pulse-slow" />
             <Sparkles className="absolute bottom-8 right-8 text-white/20 w-10 h-10 rotate-12" />

            <h1 className="text-xl md:text-3xl lg:text-4xl font-bold mb-6 md:mb-8 relative z-10">
              Unleash Your Creative <br className="hidden md:block"/> Vision with Khizo AI
            </h1>

            <div className="flex flex-wrap justify-center gap-3 md:gap-6 lg:gap-8 relative z-10">
              {[
                { icon: ImageIcon, label: "Image Restore" },
                { icon: Sparkles, label: "Generative Fill" },
                { icon: Eraser, label: "Remove" },
                { icon: Palette, label: "Recolor" },
              ].map((action, i) => (
                 <div key={i} className="flex flex-col items-center gap-2 group cursor-pointer">
                    <div className="w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:bg-white group-hover:text-indigo-600 group-hover:scale-110 transition-all duration-300">
                      <action.icon size={20} className="md:w-6 md:h-6" />
                    </div>
                    <span className="text-[10px] md:text-xs font-medium opacity-90">{action.label}</span>
                 </div>
              ))}
            </div>
          </div>

          {/* Recent Edits Section */}
          <div className="mt-8 md:mt-12">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h2 className="text-xl md:text-2xl font-bold text-slate-800">Recent Edits</h2>
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm transition-all hover:border-indigo-200"
                />
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 h-48 md:h-64 lg:h-80 flex flex-col items-center justify-center text-gray-400 shadow-sm border-dashed border-2">
              <ImageIcon className="w-12 h-12 mb-3 opacity-20" />
              <span className="font-medium text-sm">No recent projects found</span>
              <button className="mt-4 text-indigo-600 text-sm font-medium hover:underline">Start a new project</button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
