import React from 'react'
import { Metadata } from 'next'
import JsonLd from '@/components/shared/JsonLd'
import { AuthRedirect } from './components/AuthRedirect'

export const metadata: Metadata = {
  title: 'Khizo AI — AI Image Editor | Photo Restore, Background Removal & More',
  description:
    'Edit images with AI. Khizo AI offers photo restoration, background removal, object removal, generative fill, and object recoloring. Download in PNG, JPG, WEBP, AVIF, GIF, TIFF, and SVG. The best online AI photo editor.',
  alternates: {
    canonical: 'https://khizo.dev',
  },
  openGraph: {
    title: 'Khizo AI — AI Image Editor | Restore, Remove & Enhance Photos',
    description:
      'Transform images with AI. Restore old photos, remove backgrounds, recolor objects, and generate new content — no design skills needed.',
    url: 'https://khizo.dev',
  },
}

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <JsonLd />
      <AuthRedirect />
      {children}
    </div>
  )
}

export default LandingLayout
