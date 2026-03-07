export default function JsonLd() {
  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Khizo AI",
    url: "https://khizo.dev",
    description:
      "AI image editor — restore old photos, remove backgrounds, delete objects, recolor elements, and use generative fill.",
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://khizo.dev/dashboard?q={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

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
      description: "Tier with 10 credits",
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

  const navigationData = {
    "@context": "https://schema.org",
    "@type": "SiteNavigationElement",
    name: [
      "Home",
      "Sign In",
      "Sign Up",
      "Image Restore",
      "Generative Fill",
      "Object Remove",
      "Object Recolor",
      "Background Remove",
      "Pricing",
    ],
    url: [
      "https://khizo.dev",
      "https://khizo.dev/sign-in",
      "https://khizo.dev/sign-up",
      "https://khizo.dev/transformations/add/restore",
      "https://khizo.dev/transformations/add/fill",
      "https://khizo.dev/transformations/add/remove",
      "https://khizo.dev/transformations/add/recolor",
      "https://khizo.dev/transformations/add/removeBackground",
      "https://khizo.dev/#pricing",
    ],
  };

  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://khizo.dev",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Sign In",
        item: "https://khizo.dev/sign-in",
      },
      {
        "@type": "ListItem",
        position: 3,
        name: "Sign Up",
        item: "https://khizo.dev/sign-up",
      },
      {
        "@type": "ListItem",
        position: 4,
        name: "Image Restore",
        item: "https://khizo.dev/transformations/add/restore",
      },
      {
        "@type": "ListItem",
        position: 5,
        name: "Generative Fill",
        item: "https://khizo.dev/transformations/add/fill",
      },
      {
        "@type": "ListItem",
        position: 6,
        name: "Object Remove",
        item: "https://khizo.dev/transformations/add/remove",
      },
      {
        "@type": "ListItem",
        position: 7,
        name: "Object Recolor",
        item: "https://khizo.dev/transformations/add/recolor",
      },
      {
        "@type": "ListItem",
        position: 8,
        name: "Background Remove",
        item: "https://khizo.dev/transformations/add/removeBackground",
      },
    ],
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Khizo AI",
    url: "https://khizo.dev",
    logo: "https://khizo.dev/icon.svg",
    sameAs: [],
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(navigationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqData) }}
      />
    </>
  );
}
