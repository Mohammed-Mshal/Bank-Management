import { type NextRequest, NextResponse } from "next/server"
import { verifySession } from "./app/libs/session"
export async function middleware(request: NextRequest) {
    const protectedRoute = ['/dashboard']
    const currentPath = request.nextUrl.pathname
    const isProtectedRoute = protectedRoute.includes(currentPath)
    if (isProtectedRoute) {
        const session = await verifySession();
        if (!session) {
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