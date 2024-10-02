import 'server-only'
import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from 'next/server';
const key = new TextEncoder().encode(process.env.SECRET)

export async function encrypt(payload) {
    return await new SignJWT(payload)
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
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, role, expires })
    cookies().set('session', session, { httpOnly: true, expires, sameSite: 'lax', path: '/' })
}


export async function verifySession() {
    const userCookie = cookies().get('session')?.value;
    if (userCookie) {
        const session = await decrypt(userCookie)
        return session
    }
    return null
}

export async function updateCookies(request: NextRequest) {
    const session = request.cookies.get('session')?.value
    if (!session) return;
    const parsed = await decrypt(session) as JWTPayload
    parsed.expires = new Date(Date.now() + 24 * 60 * 60 * 1000)

    const res = NextResponse.next()
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly: true,
        expires: parsed.expires as Date
    })    
    return res
}
export async function deleteSession() {
    cookies().delete('session')
    redirect('/auth/login')
}