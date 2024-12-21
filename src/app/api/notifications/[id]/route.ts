import { verifySession } from "@/app/libs/session";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import isMongoId from 'validator/lib/isMongoId';
const prisma = new PrismaClient()


export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await prisma.$connect()
        const session = await verifySession()
        if (!session || !session.userId) {
            return NextResponse.json({
                data: null,
                message: 'Unauthorized'
            }, {
                status: 401,
                statusText: 'FAIL'
            })
        }
        if (!isMongoId(session.userId)) {
            return NextResponse.json({
                data: null,
                message: 'Id Not Valid'
            }, {
                status: 401,
                statusText: 'FAIL'
            })
        }
        const idNotification = (await params).id
        if (!idNotification) {
            return NextResponse.json({
                data: null,
                message: 'Id Notification Is Required'
            }, {
                status: 400,
                statusText: 'FAIL'
            })
        }
        const notificationDetails = await prisma.notification.findUnique({
            where: {
                id: idNotification
            }
        })
        if (!notificationDetails) {
            return NextResponse.json({
                data: null,
                message: 'Notification Not Exist'
            }, {
                status: 400,
                statusText: 'FAIL'
            })
        }
        if (notificationDetails?.customerId !== session.userId) {
            return NextResponse.json({
                data: null,
                message: 'Operation Not Authorization'
            }, {
                status: 401,
                statusText: 'FAIL'
            })
        }
        await prisma.notification.delete({
            where: {
                id: idNotification
            }
        })
        await prisma.$disconnect()
        return NextResponse.json({
            data: null,
            message: 'Notification Deleted'
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