import { authMiddleware } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";

// Routes that should completely bypass Clerk (no auth processing at all)
// These are safe for Googlebot since they never require auth checks
const bypassRoutes = [
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

  // Completely skip Clerk for SEO/auth routes — allows Googlebot to crawl freely
  if (shouldBypass(pathname)) {
    return NextResponse.next();
  }

  // All other routes (including "/") go through Clerk auth
  // "/" is a publicRoute so it won't block Googlebot, but allows server-side auth() to work
  return authMiddleware({
    publicRoutes: ["/"],
    ignoredRoutes: [
      "/api/webhooks(.*)",
      "/api/sync-credits(.*)",
    ],
    afterAuth(auth, req) {
      // Redirect signed-in users from landing page to dashboard
      if (auth.userId && req.nextUrl.pathname === "/") {
        const dashboard = new URL("/dashboard", req.url);
        return NextResponse.redirect(dashboard);
      }
      return NextResponse.next();
    }
  })(req, {} as any);
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};