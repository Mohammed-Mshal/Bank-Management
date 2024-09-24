import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { decrypt } from "./app/libs/session"
export async function middleware(request: NextRequest) {
    const authRoutes = '/auth'
    const protectedRoute = ['/dashboard']
    const currentPath = request.nextUrl.pathname
    const isProtectedRoute = protectedRoute.includes(currentPath)
    if (isProtectedRoute) {
        const cookie = cookies().get('session')?.value
        const session = await decrypt(cookie)
        if (!session) {
            return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
        }
        else {
            return NextResponse.next()

        }
    }
    if (currentPath.startsWith(authRoutes)) {
        const cookie = cookies().get('session')?.value
        const session = await decrypt(cookie)
        if (session) {
            return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
        }
        else {
            return NextResponse.next()

        }
    }
    if (currentPath === '/') {
        const cookie = cookies().get('session')?.value
        const session = await decrypt(cookie)
        if (session) {
            return NextResponse.redirect(new URL('/dashboard', request.nextUrl))
        }
        else {
            return NextResponse.redirect(new URL('/auth/login', request.nextUrl))

        }
    }
    return NextResponse.next()
}


export const config = {
    matcher: [
        '/',
    ],
}