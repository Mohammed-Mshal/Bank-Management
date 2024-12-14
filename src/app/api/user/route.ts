import { verifySession } from "@/app/libs/session";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import isMongoId from 'validator/lib/isMongoId'

const prisma = new PrismaClient()

export async function GET() {
    try {
        const session = await verifySession()
        await prisma.$connect()
        if (!session) {
            return NextResponse.json({
                message: 'Unauthorized'
            }, {
                status: 401,
                statusText: 'ERROR'
            })
        }
        const userId = session.userId
        if (!userId) {
            return NextResponse.json({
                message: 'Unauthorized'
            }, {
                status: 401,
                statusText: 'ERROR'
            })
        }
        if (!isMongoId(userId)) {
            return NextResponse.json({
                message: 'Unauthorized'
            }, {
                status: 401,
                statusText: 'ERROR'
            })
        }
        const userInfo = await prisma.customer.findUnique({
            where: {
                id: userId as string
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                image: true,
                gender: true,
                phoneNumber: true,
                address: true,
                dateOfBirth: true,
                residentialAddress: true,

            }
        })
        await prisma.$disconnect()
        return NextResponse.json({
            userInfo
        }, {
            status: 200,
            statusText: 'SUCCESSFUL'
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        await prisma.$disconnect()
        return NextResponse.json({
            message: error.message as string
        }, {
            status: 500,
            statusText: 'FAIL'
        })
    }
}