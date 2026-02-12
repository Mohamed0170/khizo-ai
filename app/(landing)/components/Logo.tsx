import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "w-8 h-8" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <svg 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        <defs>
          <linearGradient id="khizo-gradient" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
            <stop stopColor="#4F46E5" />
            <stop offset="1" stopColor="#7C3AED" />
          </linearGradient>
        </defs>
        
        <g fill="url(#khizo-gradient)">
          <rect x="12" y="-4" width="8" height="40" rx="2" transform="rotate(45 16 16)" />
          <rect x="12" y="-4" width="8" height="40" rx="2" transform="rotate(-45 16 16)" />
        </g>
      </svg>
    </div>
  );
};
