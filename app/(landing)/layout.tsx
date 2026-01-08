import React from 'react'

export const metadata = {
  title: 'Khizo AI - Transform Your Creative Vision',
  description: 'The all-in-one AI creative suite. Restore photos, remove objects, and generate new content with a single click.',
}

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      {children}
    </div>
  )
}

export default LandingLayout
