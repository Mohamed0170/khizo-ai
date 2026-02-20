import React from 'react'
import { Metadata } from 'next'
import JsonLd from '@/components/shared/JsonLd'

export const metadata: Metadata = {
  title: 'Khizo AI - Free AI-Powered Image Editing & Enhancement Tool',
  description:
    'Transform your images with Khizo AI. Restore old photos, remove backgrounds, recolor objects, generative fill, and more. Download in PNG, JPG, WEBP, AVIF, GIF, TIFF, SVG, JPEG formats. Free online AI image editor.',
  alternates: {
    canonical: 'https://khizo.dev',
  },
}

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen">
      <JsonLd />
      {children}
    </div>
  )
}

export default LandingLayout
