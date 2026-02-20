export default function JsonLd() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Khizo AI",
    description:
      "AI-powered image editing tool for photo restoration, background removal, object removal, object recoloring, and generative fill.",
    url: "https://khizo.dev",
    applicationCategory: "MultimediaApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      description: "Free tier with 10 credits",
    },
    featureList: [
      "AI Image Restoration",
      "Generative Fill",
      "Object Removal",
      "Object Recolor",
      "Background Removal",
      "Multi-format Download (PNG, JPG, JPEG, WEBP, AVIF, GIF, TIFF, SVG)",
    ],
    screenshot: "https://khizo.dev/og-image.png",
    creator: {
      "@type": "Organization",
      name: "Khizo AI",
      url: "https://khizo.dev",
    },
  };

  const faqData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What image formats does Khizo AI support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Khizo AI supports PNG, JPG, JPEG, WEBP, AVIF, GIF, TIFF, and SVG formats for download.",
        },
      },
      {
        "@type": "Question",
        name: "Is Khizo AI free to use?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, Khizo AI offers a free tier with 10 credits. Additional credits can be purchased through Pro and Premium plans.",
        },
      },
      {
        "@type": "Question",
        name: "What AI tools does Khizo AI offer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Khizo AI offers Image Restoration, Generative Fill, Object Removal, Object Recolor, and Background Removal tools.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
