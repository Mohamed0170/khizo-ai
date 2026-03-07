import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/sign-in", "/sign-up", "/transformations/add/"],
        disallow: ["/api/", "/profile/", "/dashboard/", "/credits/", "/transformations/[id]"],
      },
      {
        userAgent: "Googlebot-Video",
        disallow: ["/"],
      },
    ],
    sitemap: "https://khizo.dev/sitemap.xml",
  };
}
