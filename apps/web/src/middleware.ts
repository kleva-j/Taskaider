import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { getBaseUrl } from "@/lib/auth";

export default authMiddleware({
  afterAuth(auth, _req, _evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({
        returnBackUrl: `${getBaseUrl()}/sign-in`,
      });
    }
  },
  publicRoutes: [
    "/",
    "/sign-in",
    "/sign-up",
    "/api/random",
    "/api/webhook/clerk",
  ],
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
