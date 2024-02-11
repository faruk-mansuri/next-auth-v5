import authConfig from '@/auth.config';
import NextAuth from 'next-auth';
import {
  DEFAULT_LOGIN_REDIRECT,
  apiAuthPrefix,
  authRoutes,
  publicRoutes,
} from './routes';
const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isLoggedIn = !!req.auth;

  const isApiAuthRoute = pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(pathname);
  const isAuthRoute = authRoutes.includes(pathname);

  if (isApiAuthRoute) return null;

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, req.nextUrl));
    }
    return null;
  }

  if (!isLoggedIn && !isPublicRoute) {
    let callbackUrl = pathname;

    if (req.nextUrl.search) {
      callbackUrl += req.nextUrl.search;
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl);
    // encodeURIComponent() use to convert string into a format that can be safely included in a URL
    return Response.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallbackUrl}`, req.nextUrl)
    );
  }

  return null;
});

// Optionally, don't invoke Middleware on some paths
// it's a matcher for anything you want to invoke middleware
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
