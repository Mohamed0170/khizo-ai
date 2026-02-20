import type { Metadata, Viewport } from "next";
import { IBM_Plex_Sans } from "next/font/google";
import { cn } from "@/lib/utils";
import { ClerkProvider } from "@clerk/nextjs";

import "./globals.css";

const IBMPlex = IBM_Plex_Sans({ 
  subsets: ["latin"],
  weight: ['400', '500', '600', '700'],
  variable: '--font-ibm-plex',
  display: 'swap',
  preload: true,
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#020617' },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://khizo.dev"),
  title: {
    default: "Khizo AI - AI-Powered Image Editing & Enhancement Tool",
    template: "%s | Khizo AI",
  },
  description:
    "Transform your images with AI-powered tools. Restore old photos, remove backgrounds, recolor objects, remove unwanted objects, and use generative fill. Free online image editor with multi-format download support.",
  keywords: [
    "AI image editor",
    "image restoration",
    "background removal",
    "object removal",
    "object recolor",
    "generative fill",
    "photo enhancement",
    "AI photo editor",
    "free image editor",
    "online image editor",
    "Khizo AI",
    "image download PNG JPG WEBP",
  ],
  authors: [{ name: "Khizo AI", url: "https://khizo.dev" }],
  creator: "Khizo AI",
  publisher: "Khizo AI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large" as const,
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://khizo.dev",
    siteName: "Khizo AI",
    title: "Khizo AI - AI-Powered Image Editing & Enhancement Tool",
    description:
      "Transform your images with AI-powered tools. Restore, enhance, remove backgrounds, recolor objects, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khizo AI - AI-Powered Image Editing & Enhancement Tool",
    description:
      "Transform your images with AI-powered tools. Free online image editor with multi-format download.",
  },
  alternates: {
    canonical: "https://khizo.dev",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
  },
  verification: {
    google: "zSONJu1Kvs-J8nbMk5Cnmf3LIE3y5wNQ5hYheGy3u7s",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider 
      afterSignOutUrl="/"
      appearance={{
        variables: { colorPrimary: '#624cf5' }
      }}
    >
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="shortcut icon" href="/favicon.svg" type="image/svg+xml" />
          <link rel="dns-prefetch" href="https://res.cloudinary.com" />
          <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="anonymous" />
          <link rel="dns-prefetch" href="https://api.cloudinary.com" />
          <link rel="preconnect" href="https://api.cloudinary.com" crossOrigin="anonymous" />
          <link rel="manifest" href="/manifest.json" />
          <script
            dangerouslySetInnerHTML={{
              __html: `
                (function() {
                  try {
                    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                      document.documentElement.classList.add('dark');
                    } else {
                      document.documentElement.classList.remove('dark');
                    }
                  } catch(e) {}
                })();
              `,
            }}
          />
        </head>
        <body className={cn("font-IBMPlex antialiased", IBMPlex.variable)}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
