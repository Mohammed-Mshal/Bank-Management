import { verifySession } from "@/app/libs/session";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import isMongoId from 'validator/lib/isMongoId';

const prisma = new PrismaClient()

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        const session = await verifySession()
        await prisma.$connect()
        if (!session) {
            throw Error('User Not Authorized')
        }
        const idAccount = (await params).id
        const userId = session.userId;
        const accountInfo = await prisma.account.findUnique({
            where: {
                id: idAccount
            }
        })
        await prisma.$disconnect()
        if (accountInfo?.customerId === userId) {
            return NextResponse.json({
                accountInfo: {
                    id: accountInfo?.id,
                    accountStatus: accountInfo?.accountStatus,
                    accountType: accountInfo?.accountType,
                    accountUsingDescription: accountInfo?.accountUsingDescription,
                    balance: accountInfo?.balance,
                    createdAt: accountInfo?.createdAt,
                    updatedAt: accountInfo?.updatedAt,
                }
            }, {
                status: 200
            })
        }
        else {
            return NextResponse.json({
                accountInfo: {
                    id: accountInfo?.id,
                    accountStatus: accountInfo?.accountStatus,
                    accountType: accountInfo?.accountType,
                    customerId: accountInfo?.customerId
                }
            }, {
                status: 200
            })
        }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        await prisma.$disconnect()

        return NextResponse.json({
            error: error?.message
        }, {
            status: 400
        })

    }
}
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await prisma.$connect();
        const session = await verifySession();
        const { description }: { description: string } = await req.json()
        if (!session) {
            return NextResponse.json({
                error: 'User Not Authorized'
            }, {
                status: 401, statusText: 'ERROR'
            })
        }
        const userId = session.userId
        if (!userId) {
            return NextResponse.json({
                error: 'User Not Authorized'
            }, {
                status: 401, statusText: 'ERROR'
            })
        }
        const idAccount = (await params).id
        if (!isMongoId(idAccount)) {
            return NextResponse.json({
                error: 'Id Account Not Valid'
            }, {
                status: 204, statusText: 'ERROR'
            })
        }
        const isAccountExist = await prisma.account.findUnique({
            where: {
                id: idAccount,
                customerId: userId
            }
        })
        if (!isAccountExist) {
            return NextResponse.json({
                error: 'Account Not Exist'
            }, {
                status: 204,
                statusText: 'ERROR'
            })
        }
        await prisma.account.update({
            where: {
                id: idAccount
            }, data: {
                accountUsingDescription: description
            }
        })
        prisma.$disconnect()

        return NextResponse.json({
            error: 'Description Has Changed Successful'
        }, {
            status: 200, statusText: 'SUCCESS'
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        await prisma.$disconnect()
        return NextResponse.json({
            error: error.message
        }, {
            status: 500, statusText: 'FAIL'

        })
    }
}
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await prisma.$connect();
        const session = await verifySession();
        const { password }: { password: string } = await req.json()
        if (!session) {
            return NextResponse.json({
                error: 'User Not Authorized'
            }, {
                status: 401, statusText: 'ERROR'
            })
        }
        const userId = session.userId
        if (!userId) {
            return NextResponse.json({
                error: 'User Not Authorized'
            }, {
                status: 401, statusText: 'ERROR'
            })
        }
        const idAccount = (await params).id
        if (!isMongoId(idAccount)) {
            return NextResponse.json({
                error: 'Id Account Not Valid'
            }, {
                status: 204, statusText: 'ERROR'
            })
        }
        const accountWillDelete = await prisma.account.findUnique({
            where: {
                id: idAccount,
                customerId: userId
            }
        })
        if (!accountWillDelete) {
            return NextResponse.json({
                error: 'Account Not found'
            }, {
                status: 204, statusText: 'ERROR'
            })
        }
        const isValidPassword: boolean = await compare(password, accountWillDelete.password);
        if (!isValidPassword) {
            return NextResponse.json({
                error: 'Password Is Not Valid'
            }, {
                status: 401, statusText: 'ERROR'
            })
        }
        await prisma.account.delete({
            where: {
                id: idAccount,
                customerId: userId
            },
        })
        return NextResponse.json({
            error: 'Account Has Deleted Successful'
        }, {
            status: 200, statusText: 'SUCCESS'
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        await prisma.$disconnect()
        return NextResponse.json({
            error: error.message
        }, {
            status: 500, statusText: 'FAIL'

        })
    }
}