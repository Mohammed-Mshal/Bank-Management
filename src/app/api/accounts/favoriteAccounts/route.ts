import { verifySession } from "@/app/libs/session";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
export async function GET() {
    try {
        await prisma.$connect()
        const session = await verifySession()
        if (!session || !session.userId) {
            return NextResponse.json({
                message: "User is Not Found",
                data: null
            }, {
                status: 401,
                statusText: "FAIL"
            })
        }
        const userVerify = await prisma.customer.findUnique({
            where: {
                id: <string>session.userId
            },
            select: {
                FavoriteAccounts: true
            }
        })
        if (!userVerify) {
            return NextResponse.json({
                message: "User is Not Found",
                data: null
            }, {
                status: 401,
                statusText: "FAIL"
            })
        }
        await prisma.$disconnect()
        return NextResponse.json({
            data: userVerify.FavoriteAccounts
        }, {
            status: 200,
            statusText: "SUCCESS"
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        await prisma.$disconnect()
        return NextResponse.json({
            message: "User is Not Found",
            data: null
        }, {
            status: 500,
            statusText: "ERROR"
        })
    }
}
export async function POST(req: NextRequest) {
    try {
        await prisma.$connect()
        const session = await verifySession()
        if (!session || !session.userId) {
            return NextResponse.json({
                message: "User is Not Found",
                data: null
            }, {
                status: 401,
                statusText: "FAIL"
            })
        }
        const idCustomer = session.userId
        const { idFavoriteAccount } = await req.json()
        if (!idFavoriteAccount) {
            return NextResponse.json({
                message: "Id Account Is Required",
                data: null
            }, {
                status: 400,
                statusText: "FAIL"
            })
        }

        const favoriteAccount = await prisma.favoriteAccount.findFirst({
            where: {
                idAccount: idFavoriteAccount,
                customerId: idCustomer
            }
        })
        if (favoriteAccount) {
            return NextResponse.json({
                message: "This Account Is Already Exist In Your Favorite Accounts",
                data: null
            }, {
                status: 405,
                statusText: "FAIL"
            })
        }
        const accountDetails = await prisma.account.findUnique({
            where: {
                id: idFavoriteAccount,
                customerId: {
                    not: idCustomer
                }
            },
            select: {
                id: true,
                customer: {
                    select: {
                        firstName: true,
                        lastName: true,
                        image: true,
                    }
                }
            }
        })
        if (!accountDetails) {
            return NextResponse.json({
                message: "Can't Add This Account",
                data: null
            }, {
                status: 405,
                statusText: "FAIL"
            })
        }
        await prisma.favoriteAccount.create({
            data: {
                idAccount: accountDetails.id,
                customerId: idCustomer as string,
                firstName: accountDetails?.customer.firstName as string,
                lastName: accountDetails?.customer.lastName as string,
                imageProfile: accountDetails?.customer.image as string,

            }
        })
        await prisma.$disconnect()
        return NextResponse.json({
            data: accountDetails
        }, {
            status: 200,
            statusText: "SUCCESS"
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        await prisma.$disconnect()
        return NextResponse.json({
            message: error.message,
            data: null
        }, {
            status: 500,
            statusText: "ERROR"
        })
    }
}