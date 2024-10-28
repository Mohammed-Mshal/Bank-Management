import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { decrypt, updateCookies } from "./app/libs/session"
export async function middleware(request: NextRequest) {
    const authRoutes = '/auth'
    const protectedRoute = ['/dashboard']
    const currentPath = request.nextUrl.pathname
    const isProtectedRoute = protectedRoute.includes(currentPath)
    if (isProtectedRoute && !currentPath.startsWith(authRoutes)) {
        const cookie = (await cookies()).get('session')?.value
        const session = await decrypt(cookie)
        if (!session?.userId) {
            return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
        }
    }
    if (currentPath.startsWith(authRoutes)) {
        const cookie = (await cookies()).get('session')?.value
        const session = await decrypt(cookie)
        if (session?.userId) {
            return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
        }
    }
    if (currentPath === '/') {
        const cookie = (await cookies()).get('session')?.value
        const session = await decrypt(cookie)
        if (session?.userId) {
            return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
        }
        else {
            return NextResponse.redirect(new URL('/auth/login', request.nextUrl))

        }
    }

    return await updateCookies(request)
}


export const config = {
    matcher: [
        '/',
        '/:path*'
    ],
}