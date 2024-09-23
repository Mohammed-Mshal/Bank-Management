import 'server-only'
import { jwtVerify, SignJWT } from "jose";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
const key = new TextEncoder().encode(process.env.SECRET)
const cookie = {
    name: 'session',
    options: {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        path: '/'
    },
    duration: 24 * 60 * 60 * 1000
}
export async function encrypt(payload) {
    return new SignJWT(payload)
        .setProtectedHeader({
            alg: 'HS256'
        })
        .setIssuedAt()
        .setExpirationTime('1day')
        .sign(key)
}
export async function decrypt(session) {
    try {
        const { payload } = await jwtVerify(session, key, { algorithms: ['HS256'] })
        return payload
    } catch (error) {
        return null
    }

}
export async function createSession(userId, role) {
    const expires = new Date(Date.now() + cookie.duration)
    const session = await encrypt({ userId, role, expires })
    const sessionCookie = { ...cookie.options, expires } as Partial<ResponseCookie>
    cookies().set(cookie.name, session, sessionCookie)

}
export async function verifySession() {
    const userCookie = cookies().get(cookie.name)?.value;
    const session = await decrypt(userCookie)
    if (!session?.userId) {
        redirect('/auth/login')
    }
    return { userId: session.userId, role: session.role }
}
export async function deleteSession() {
    cookies().delete(cookie.name)
    redirect('/auth/login')
}