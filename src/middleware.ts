import { NextRequest, NextResponse } from "next/server"
import { getSession } from "./app/lib/getSession"
export { auth } from "@/auth"
export async function middleware(request: NextRequest) {
    const authRoutes = '/auth'
    const protectedRoute = '/'
    const session = await getSession()
    if (request.nextUrl.pathname.startsWith(authRoutes)) {
        if (session?.user) {
            return NextResponse.redirect(new URL('/', request.url))
        }
    }
    if (request.nextUrl.pathname.startsWith(protectedRoute) && !request.nextUrl.pathname.startsWith('/auth')) {
        if (!session?.user) {
            return NextResponse.redirect(new URL('/auth/login', request.url))
        }
    }
}


export const config = {
    matcher: [
        '/auth/:path*',
        '/:path*'
    ],
}