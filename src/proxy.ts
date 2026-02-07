import createMiddleware from 'next-intl/middleware';
import { NextRequest } from 'next/server';
import { routing } from './i18n/routing';

// create next-intl middleware instance
const intlMiddleware = createMiddleware({
    ...routing,
    localeDetection: false
});

export default function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // get token from cookie
    const token = request.cookies.get('auth_token')?.value;

    // define your routes
    const isAuthPage = pathname.includes('/login');
    // const isProtectedRoute =
    //     pathname.includes('/dashboard') ||
    //     pathname.includes('/profile');

    // no token → redirect to login
    // if (!token && !isAuthPage) {
    //     const url = request.nextUrl.clone();
    //     url.pathname = '/login';
    //     return NextResponse.redirect(url);
    // }

    // already logged in → prevent login page
    // if (token && isAuthPage) {
    //     const url = request.nextUrl.clone();
    //     url.pathname = '/';
    //     return NextResponse.redirect(url);
    // }

    // run next-intl middleware normally
    return intlMiddleware(request);
}

export const config = {
    matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
};


// import createMiddleware from 'next-intl/middleware';
// import { routing } from './i18n/routing';

// export default createMiddleware({ ...routing, localeDetection: false });

// export const config = {
//     matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)'
// }