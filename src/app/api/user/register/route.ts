import { createSession } from '@/app/libs/session'
import { PrismaClient } from '@prisma/client'
import { hash } from "bcryptjs"
import { NextRequest, NextResponse } from 'next/server'
const prisma = new PrismaClient()
export async function POST(req: NextRequest) {
    try {
        await prisma.$connect()
        const { firstName, lastName, email, password } = await req.json()

        if (!firstName || !lastName || !email || !password) {
            return NextResponse.json({
                data: null,
                message: "Please Fill All Fields"
            }, {
                status: 400,
                statusText: 'ERROR'
            })
        }

        const isExistingUser = await prisma.customer.findFirst({
            where: {
                email: email as string
            }
        })

        if (isExistingUser) {
            return NextResponse.json({
                data: null,
                message: "Email Is Already Exist"
            }, {
                status: 400,
                statusText: 'ERROR'
            })
        }
        const hashingPassword = await hash(password, 12)
        const userCreated = await prisma.customer.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashingPassword,
                image: 'https://ik.imagekit.io/alphaTeam/Bank_Management/default.jpg',
                address: '',
                dateOfBirth: '',
                phoneNumber: '',
                imageId: '',
                gender: '',
                residentialAddress: ""
            }
        })
        await prisma.$disconnect()
        await createSession(userCreated.id)
        return NextResponse.json({
            data: null,
            message: 'Account Is Created'
        }, {
            status: 200,
            statusText: 'SUCCESS'
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {

        await prisma.$disconnect()
        return NextResponse.json({
            data: null,
            message: error.message
        }, {
            status: 500,
            statusText: 'ERROR'
        })
    }
}