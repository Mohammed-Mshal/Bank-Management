import { type NextRequest, NextResponse } from "next/server"
import { verifySession } from "./app/libs/session"
export async function middleware(request: NextRequest) {
    const authRoutes = '/auth'
    const protectedRoute = ['/dashboard']
    const currentPath = request.nextUrl.pathname
    const isProtectedRoute = protectedRoute.includes(currentPath)
    if (isProtectedRoute && !currentPath.startsWith(authRoutes)) {
        const session = await verifySession();
        if (!session?.userId) {
            return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
        }
    }
    return NextResponse.next()
}


export const config = {
    matcher: [
        '/',
        '/:path*'
    ],
}