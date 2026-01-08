import React from 'react';

export const HeroAnimation: React.FC<{ className?: string }> = ({ className = "" }) => {
  return (
    <div className={`w-full flex justify-center items-center ${className}`}>
      <svg 
        viewBox="0 0 800 500" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[1000px] overflow-visible"
      >
        <defs>
          <linearGradient id="photoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4338ca" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.2" />
          </linearGradient>
          <linearGradient id="scanBeam" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
          <filter id="glow-strong" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Grid */}
        <g opacity="0.1" className="text-slate-400 dark:text-slate-600">
             <path d="M100 100 L700 100 M100 200 L700 200 M100 300 L700 300 M100 400 L700 400" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
             <path d="M200 50 L200 450 M400 50 L400 450 M600 50 L600 450" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
        </g>

        {/* Floating Tool Icons (Left) */}
        <g className="animate-float" style={{ animationDuration: '7s' }}>
            <rect x="120" y="180" width="60" height="60" rx="12" fill="white" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M140 200 L140 230 L170 230" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" />
            <path d="M160 220 L160 190 L130 190" stroke="#6366f1" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        </g>

        <g className="animate-float-delayed" style={{ animationDuration: '8s' }}>
            <rect x="150" y="300" width="50" height="50" rx="10" fill="white" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="2" />
            <path d="M175 315 L175 335 M165 325 L185 325" stroke="#a855f7" strokeWidth="2" />
            <circle cx="175" cy="325" r="8" stroke="#a855f7" strokeWidth="2" />
        </g>

        {/* Main Central Photo Frame */}
        <g transform="translate(250, 100)">
            <rect x="10" y="10" width="300" height="200" rx="8" fill="black" opacity="0.1" />
            <rect x="0" y="0" width="300" height="200" rx="8" fill="white" className="dark:fill-slate-900" stroke="#e2e8f0" strokeWidth="2" />
            
            <g clipPath="url(#frameClip)">
                <defs>
                   <clipPath id="frameClip">
                      <rect x="0" y="0" width="300" height="200" rx="8" />
                   </clipPath>
                </defs>
                
                <rect x="0" y="0" width="300" height="120" fill="url(#photoGradient)" opacity="0.5" />
                <circle cx="220" cy="60" r="30" fill="#fcd34d" opacity="0.8" className="animate-pulse-slow" />
                <path d="M-20 220 L80 100 L180 220 Z" fill="#c4b5fd" opacity="0.6" />
                <path d="M120 220 L220 80 L320 220 Z" fill="#a78bfa" opacity="0.6" />
                <path d="M200 220 L280 140 L360 220 Z" fill="#8b5cf6" opacity="0.6" />
            </g>

            <path d="M-10 -10 L20 -10 M-10 -10 L-10 20" stroke="#6366f1" strokeWidth="3" fill="none" />
            <path d="M310 -10 L280 -10 M310 -10 L310 20" stroke="#6366f1" strokeWidth="3" fill="none" />
            <path d="M310 210 L280 210 M310 210 L310 180" stroke="#6366f1" strokeWidth="3" fill="none" />
            <path d="M-10 210 L20 210 M-10 210 L-10 180" stroke="#6366f1" strokeWidth="3" fill="none" />

            <g className="animate-scan">
                <rect x="-20" y="98" width="340" height="4" fill="url(#scanBeam)" filter="url(#glow-strong)" />
            </g>
        </g>

        {/* Floating Tool Icons (Right) */}
        <g className="animate-float" style={{ animationDuration: '6s', animationDelay: '1s' }}>
             <rect x="600" y="150" width="70" height="70" rx="12" fill="white" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="2" />
             <rect x="615" y="165" width="40" height="40" rx="4" fill="#e0e7ff" className="dark:fill-indigo-900/50" />
             <rect x="625" y="175" width="40" height="40" rx="4" fill="#c7d2fe" className="dark:fill-indigo-800/50" stroke="white" strokeWidth="2" />
        </g>

        <g className="animate-float-delayed" style={{ animationDuration: '9s' }}>
             <rect x="580" y="280" width="50" height="50" rx="25" fill="white" className="dark:fill-slate-800" stroke="#cbd5e1" strokeWidth="2" />
             <circle cx="595" cy="295" r="5" fill="#f87171" />
             <circle cx="615" cy="295" r="5" fill="#60a5fa" />
             <circle cx="605" cy="315" r="5" fill="#34d399" />
        </g>

        {/* Connection Lines */}
        <path d="M180 210 C 220 210, 230 180, 250 150" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-slate-700" />
        <path d="M600 185 C 580 185, 570 150, 550 150" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="4 4" className="dark:stroke-slate-700" />

      </svg>
    </div>
  );
};
