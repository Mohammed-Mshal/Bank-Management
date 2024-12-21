import { verifySession } from "@/app/libs/session";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import isMongoId from 'validator/lib/isMongoId';

const prisma = new PrismaClient()
export async function GET(req: NextRequest) {
    try {
        await prisma.$connect()
        const session = await verifySession()
        if (!session || !session.userId) {
            return NextResponse.json({
                message: 'Unauthorized'
            }, {
                status: 401,
                statusText: 'FAIL'
            })
        }
        if (!isMongoId(session.userId)) {
            return NextResponse.json({
                message: 'Id Not Valid'
            }, {
                status: 401,
                statusText: 'FAIL'
            })
        }

        const limit = req?.nextUrl?.searchParams?.get('limit')
        const skip = req?.nextUrl?.searchParams?.get('skip')
        const totalNotifications = await prisma.notification.findMany({
            where: {
                customerId: session.userId as string
            },
            select: {
                id: true
            }
        })

        const notifications = await prisma.notification.findMany({
            where: {
                customerId: session.userId as string
            },
            take: limit ? +limit : 10,
            skip: skip && limit ? (+skip - 1) * +limit : 0,
            orderBy: { createdAt: 'desc' }
        })

        return NextResponse.json({
            data: {
                notifications,
                totalPages: limit ? totalNotifications.length / +limit : totalNotifications.length / 10
            }
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