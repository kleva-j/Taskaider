import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { getBaseUrl } from "@/lib/auth";

const ignoredRoutes = ["/api/webhook/clerk", "/api/random"];

export default authMiddleware({
  afterAuth(auth, _req, _evt) {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({
        returnBackUrl: `${getBaseUrl()}/sign-in`,
      });
    }
  },
  publicRoutes: ["/", "/sign-in", "/sign-up"].concat(ignoredRoutes),
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"].concat(
    ignoredRoutes,
  ),
};
