import { verifySession } from "@/app/libs/session";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import isMongoId from 'validator/lib/isMongoId';

const prisma = new PrismaClient()
export async function GET(req: NextRequest) {
    try {
        const session = await verifySession()
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
        prisma.$connect()
        const idAccount = req.nextUrl.searchParams.get('idAccount')
        const limit = req.nextUrl.searchParams.get('limit') || 20
        const page = req.nextUrl.searchParams.get('page') || 1
        const skip = (+page - 1) * +limit
        const startDate = req.nextUrl.searchParams.get('startDate') ? new Date(req.nextUrl.searchParams.get('startDate') as string) : new Date(Date.now() - (7 * 24 * 60 * 60 * 1000))
        const endDate = req.nextUrl.searchParams.get('endDate') ? new Date(req.nextUrl.searchParams.get('endDate') as string) : new Date(Date.now())
        if (idAccount) {
            if (!isMongoId(idAccount)) {
                return NextResponse.json({
                    message: 'Id Account Not Valid'
                }, {
                    status: 401,
                    statusText: 'ERROR'
                })
            }
            const transactionsAccount = await prisma.transaction.findMany({
                skip,
                take: +limit,
                where: {
                    OR: [
                        {
                            accountId: idAccount,
                        },
                        {
                            idReceiverAccount: idAccount
                        }],
                    transactionDate: {
                        gte: startDate,
                        lte: endDate
                    }
                }
            })

            return NextResponse.json({
                data: {
                    transactions: transactionsAccount
                }
            }, {
                status: 200,
                statusText: 'SUCCESS'
            })
        }

        const transactionsUser = await prisma.transaction.findMany({
            skip,
            take: +limit,
            where: {
                OR: [
                    {
                        account: {
                            customerId: userId
                        },
                        idReceiverCustomer: userId,
                    },
                    {
                        idReceiverAccount: idAccount
                    }],
                transactionDate: {
                    gte: startDate,
                    lte: endDate
                }
            }
        })
        prisma.$disconnect()
        return NextResponse.json({
            data: {
                transactions: transactionsUser
            }
        }, {
            status: 200,
            statusText: 'SUCCESS'
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        prisma.$disconnect()
        return NextResponse.json({
            message: error.message
        }, {
            status: 500,
            statusText: 'FAIL'
        })
    }
}