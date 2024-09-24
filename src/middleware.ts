import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"
import { decrypt } from "./app/libs/session"
export async function middleware(request: NextRequest) {

    return NextResponse.next()
}


export const config = {
    matcher: [
        '/',
        '/:path*'
    ],
}