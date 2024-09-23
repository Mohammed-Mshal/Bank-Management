import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { decrypt } from "./app/libs/session"
export async function middleware(request: NextRequest) {
    const authRoutes = '/auth'
    const protectedRoute = ['/']
    const currentPath = request.nextUrl.pathname
    const isProtectedRoute = protectedRoute.includes(currentPath)    
    console.log(currentPath);
    
    if (isProtectedRoute && !currentPath.startsWith(authRoutes)) {
        const cookie = cookies().get('session')?.value
        const session = await decrypt(cookie)
        if (!session?.userId) {
            return NextResponse.redirect(new URL('/auth/login', request.nextUrl))
        }
    }
    return NextResponse.next()
}


export const config = {
    matcher: [
        '/:path*'
    ],
}