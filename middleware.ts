import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";
 
export default authMiddleware({
  publicRoutes: ["/", "/sign-in(.*)", "/sign-up(.*)", "/api/webhooks(.*)", "/api/sync-credits(.*)"],
  ignoredRoutes: ["/api/webhooks(.*)", "/api/sync-credits(.*)"],
  afterAuth(auth, req) {
    // If user is signed in and trying to access the landing page, redirect to dashboard
    if (auth.userId && req.nextUrl.pathname === "/") {
      const dashboard = new URL("/dashboard", req.url);
      return NextResponse.redirect(dashboard);
    }
    
    // Allow public routes
    return NextResponse.next();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};