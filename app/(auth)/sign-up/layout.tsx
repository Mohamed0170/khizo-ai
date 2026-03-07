import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Create Free Account | Khizo AI - AI Image Editor',
  description:
    'Sign up for Khizo AI for free. Get 10 credits to start editing images with AI — restore old photos, remove backgrounds, recolor objects, and use generative fill.',
  alternates: {
    canonical: 'https://khizo.dev/sign-up',
  },
  openGraph: {
    title: 'Create Free Account | Khizo AI - AI Image Editor',
    description:
      'Join Khizo AI for free. Edit images with AI — photo restoration, background removal, object recoloring, and generative fill. 10 free credits included.',
    url: 'https://khizo.dev/sign-up',
  },
}

export default function SignUpLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
