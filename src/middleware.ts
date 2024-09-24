import { NextRequest } from "next/server"
import { updateCookies } from "./app/libs/session"
export async function middleware(request: NextRequest) {
    return await updateCookies(request)
}