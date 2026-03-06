import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/profile/", "/dashboard/", "/credits/", "/transformations/"],
      },
      {
        userAgent: "Googlebot-Video",
        disallow: ["/"],
      },
    ],
    sitemap: "https://khizo.dev/sitemap.xml",
  };
}
