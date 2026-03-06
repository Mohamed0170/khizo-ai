import { authMiddleware } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";

// Routes that should completely bypass Clerk (no auth processing at all)
const bypassRoutes = [
  "/",
  "/sign-in",
  "/sign-up",
  "/sitemap.xml",
  "/robots.txt",
  "/manifest.json",
  "/google",
  "/opengraph-image",
  "/twitter-image",
  "/favicon",
  "/icon",
];

function shouldBypass(pathname: string): boolean {
  return bypassRoutes.some(
    (route) => pathname === route || pathname.startsWith(route + "/") || pathname.startsWith(route + ".")
  );
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Completely skip Clerk for public/SEO routes — allows Googlebot to crawl freely
  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  // All other routes go through Clerk auth
  return authMiddleware({
    publicRoutes: [],
    ignoredRoutes: [
      "/api/webhooks(.*)",
      "/api/sync-credits(.*)",
    ],
  })(req, {} as any);
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};