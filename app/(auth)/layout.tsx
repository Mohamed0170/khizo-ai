import React from 'react'
import Link from 'next/link'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className="auth">
      {/* Branding Panel - visible on lg+ */}
      <div className="auth-brand">
        <div className="auth-brand-bg" />
        <div className="relative z-10 flex flex-col items-center text-center px-8">
          <Link href="/" className="mb-8">
            <div className="flex items-center gap-3">
              <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g fill="white">
                  <rect x="12" y="-4" width="8" height="40" rx="2" transform="rotate(45 16 16)" />
                  <rect x="12" y="-4" width="8" height="40" rx="2" transform="rotate(-45 16 16)" />
                </g>
              </svg>
              <span className="text-3xl font-bold text-white tracking-tight">Khizo AI</span>
            </div>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mb-3 leading-tight">
            AI-Powered Image Editing<br />Made Simple
          </h1>
          <p className="text-white/70 text-sm sm:text-base max-w-xs">
            Restore old photos, remove backgrounds, recolor objects, and create stunning visuals &mdash; all powered by advanced AI.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {['Image Restore', 'Generative Fill', 'Object Remove', 'Recolor', 'BG Remove'].map((f) => (
              <span key={f} className="px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-xs font-medium border border-white/10">
                {f}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Form Panel */}
      <div className="auth-form">
        {children}
      </div>
    </main>
  )
}

export default Layout