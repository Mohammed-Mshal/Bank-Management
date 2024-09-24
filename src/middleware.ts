import { type NextRequest, NextResponse } from "next/server"
import { verifySession } from "./app/libs/session"
export async function middleware(request: NextRequest) {
  
}


export const config = {
    matcher: [
        '/',
        '/:path*'
    ],
}