import { createSession } from '@/app/libs/session'
import { PrismaClient } from '@prisma/client'
import { compare } from "bcryptjs"
import { NextRequest, NextResponse } from 'next/server'
const prisma = new PrismaClient()
export async function POST(req: NextRequest) {
    try {
        await prisma.$connect()
        const data = await req.json()
        const email: string | null = data?.email
        const password: string | null = data?.password

        if (!email || !password) {
            return NextResponse.json({
                message: 'Please Fill All Fields',
            }, {
                status: 400,
                statusText: 'ERROR'
            })
        }
        const isExistingUser = await prisma.customer.findUnique({
            where: { email }
        })
        if (!isExistingUser) {
            return NextResponse.json({
                message: 'Email Is Not Exist',
            }, {
                status: 401,
                statusText: 'ERROR'
            })
        }
        const isValidPassword = await compare(password, isExistingUser.password)
        if (!isValidPassword) {
            return NextResponse.json({
                message: 'Password Is Not Valid',
            }, {
                status: 401,
                statusText: 'ERROR'
            })
        }
        console.log(isValidPassword);
        
        await prisma.$disconnect()
        await createSession(isExistingUser.id)
        return NextResponse.json({
            data: 'Login Successful',

        }, {
            status: 200,
            statusText: 'SUCCESSFUL'
        })

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        await prisma.$disconnect()
        return NextResponse.json({
            message: error.message as string,
        }, {
            status: 500,
            statusText: 'FAIL'
        })
    }
}
