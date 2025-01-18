import { verifySession } from "@/app/libs/session";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import isMongoId from 'validator/lib/isMongoId';

const prisma = new PrismaClient()
export async function GET(req: NextRequest) {
    try {
        await prisma.$connect()
        const session = await verifySession()
        const userId=session?.userId as string
        if (!session || !session.userId) {
            return NextResponse.json({
                message: 'Unauthorized'
            }, {
                status: 401,
                statusText: 'FAIL'
            })
        }
        if (!isMongoId(userId)) {
            return NextResponse.json({
                message: 'Id Not Valid'
            }, {
                status: 401,
                statusText: 'FAIL'
            })
        }
        prisma.$connect()
        const idAccount = req.nextUrl.searchParams.get('idAccount')
        const sorted = req.nextUrl.searchParams.get('sorted')||'desc'
        const limit = req.nextUrl.searchParams.get('limit') || 20
        const page = req.nextUrl.searchParams.get('skip') || 1
        const skip = (+page - 1) * +limit
        const startDate = req.nextUrl.searchParams.get('startDate') ? new Date(req.nextUrl.searchParams.get('startDate')as string)  : new Date(Date.now() - (7 * 24 * 60 * 60 * 1000))
        const endDate = req.nextUrl.searchParams.get('endDate') ? new Date(new Date(req.nextUrl.searchParams.get('endDate')as string).setUTCHours(23,59,59))  : new Date(Date.now())
        if (idAccount) {
                if (!isMongoId(idAccount)) {
                    return NextResponse.json({
                        message: 'Id Account Not Valid'
                    }, {
                        status: 401,
                        statusText: 'ERROR'
                    })
                }
                const isUserOwnerAccount=await prisma.account.findUnique({
                    where:{
                        id:idAccount,
                        customerId:userId as string
                    },
                    select:{
                        id:true
                    }
                })
                
                if (!isUserOwnerAccount) {
                    return NextResponse.json({
                        message: 'Unauthorize'
                    }, {
                        status: 401,
                        statusText: 'ERROR'
                    })
                }
                const totalNotification = await prisma.notification.findMany({
                    where: {
                        customer:{
                            Account:{
                                every:{
                                    id:idAccount
                                }
                            }
                        },
                        createdAt: {
                            gte: startDate,
                            lte: endDate
                        }
                    },
                    select: {
                        id: true
                    }
                })
                const notificationAccount = await prisma.notification.findMany({
                    skip,
                    take: +limit,
                    where: {
                        customer:{
                            Account:{
                                every:{
                                    id:idAccount
                                }
                            }
                        },
                        createdAt: {
                            gte: startDate,
                            lte: endDate
                        }
                    },
                    orderBy: {createdAt: sorted=='desc'?'desc':'asc' },
                })
                prisma.$disconnect()
                return NextResponse.json({
                    data: {
                        totalNotification:
                        totalNotification.length/+limit,
                        notification: notificationAccount
                    }
                }, {
                    status: 200,
                    statusText: 'SUCCESS'
                })
            }
        const totalNotifications = await prisma.notification.findMany({
            where: {
                customerId: session.userId as string,
                createdAt:{
                    gte:startDate,
                    lte:endDate
                }
            },
            select: {
                id: true
            }
            
        })

        const notifications = await prisma.notification.findMany({
            where: {
                customerId: session.userId as string,
                createdAt:{
                    gte:startDate,
                    lte:endDate
                }
            },
            take: +limit,
            skip: skip ,
            orderBy: { createdAt: sorted=='desc'?'desc':'asc' },
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