import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Sign In to Khizo AI | AI Photo Editor & Image Enhancement',
  description:
    'Sign in to your Khizo AI account. Access AI-powered image editing tools — photo restoration, background removal, object removal, generative fill, and object recoloring.',
  alternates: {
    canonical: 'https://khizo.dev/sign-in',
  },
  openGraph: {
    title: 'Sign In to Khizo AI | AI Photo Editor & Image Enhancement',
    description:
      'Sign in to your Khizo AI account and start editing images with AI — restore photos, remove backgrounds, and more.',
    url: 'https://khizo.dev/sign-in',
  },
}

export default function SignInLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
