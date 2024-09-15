import { getToken } from "next-auth/jwt";
import { withAuth } from "next-auth/middleware";
import { NextRequest, NextResponse } from "next/server";


export default withAuth(async function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname //get current path name
    const isAuth = await getToken({ req: request }) //check if is Auth
    const protectedRoutes = ['/profile'] //Array of all protected route
    const isAuthRoute = pathname.startsWith('/auth') //auth route
    const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route)) || pathname === '/'// check if use go to protected route

    if (!isAuth && isProtectedRoute) {
        return NextResponse.redirect(new URL('/landing', request.url))
    }
    if (isAuthRoute && isAuth) {
        return NextResponse.redirect(new URL('/', request.url))

    }
}, {
    callbacks: {
        // if user authorized
        async authorized() {
            return true;
        },
    }
})

// Array of routes that middleware will work on it
export const config = {
    matcher: [
        '/:path*'
    ]
}

