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
    default: "Khizo AI — Free AI Image Editor | Photo Restore, Background Removal & Generative Fill",
    template: "%s | Khizo AI",
  },
  description:
    "Free AI image editor — restore old photos, remove backgrounds, delete unwanted objects, recolor elements, and use generative fill. Download in PNG, JPG, WEBP, AVIF & more. No design skills needed.",
  keywords: [
    "AI image editor",
    "free AI photo editor",
    "image restoration",
    "restore old photos",
    "background removal",
    "remove background from image",
    "object removal",
    "remove objects from photos",
    "object recolor",
    "generative fill",
    "AI photo enhancement",
    "photo editing online",
    "free online image editor",
    "Khizo AI",
    "image download PNG JPG WEBP AVIF",
    "AI background remover",
    "photo restoration tool",
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
    title: "Khizo AI — Free AI Image Editor | Restore, Remove & Enhance Photos",
    description:
      "Edit photos with AI for free. Restore old images, remove backgrounds, delete objects, recolor elements, and use generative fill — all online.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khizo AI — Free AI Image Editor | Restore, Remove & Enhance Photos",
    description:
      "Free AI photo editor online. Restore old photos, remove backgrounds, delete objects, and recolor elements. Download in PNG, JPG, WEBP & more.",
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
        variables: { colorPrimary: '#624cf5' },
        elements: {
          footer: 'hidden',
        },
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
