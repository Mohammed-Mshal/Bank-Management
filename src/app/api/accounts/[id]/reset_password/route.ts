import { verifySession } from "@/app/libs/session";
import { PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

const prisma = new PrismaClient()
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await prisma.$connect()
        const session = await verifySession()
        const userId: string = <string>session?.userId;
        const accountId: string = (await params).id;
        const reqBody: { oldPassword:string, newPassword:string } = await req.json()
        if (!userId) {
            return NextResponse.json({
                message: 'User Id Not Exist'
            }, {
                status: 401,
                statusText: 'FAIL'
            })
        }
        const userExist = await prisma.customer.findUnique({
            where: {
                id: userId
            },
            include: {
                Account: {
                    where: {
                        id: accountId
                    }
                }
            }
        })
        if (!userExist) {
            return NextResponse.json({
                message: 'Customer Not Exist'
            }, {
                status: 401,
                statusText: 'ERROR'
            })
        }
        if (!userExist.Account) {
            return NextResponse.json({
                message: 'Account Not Exist For This Customer'
            }, {
                status: 401,
                statusText: 'ERROR'
            })
        }
        const { oldPassword, newPassword }: {
            oldPassword: string, newPassword: string
        } = reqBody
        if (!oldPassword || !newPassword) {
            return NextResponse.json({
                message: 'Inputs required Is missing'
            }, {
                status: 401,
                statusText: 'ERROR'
            })
        }
        const isOldPasswordExist = await compare(oldPassword, userExist.Account[0].password)
        if (!isOldPasswordExist) {
            return NextResponse.json({
                message: 'Password Account Not Valid'
            }, {
                status: 401,
                statusText: 'ERROR'
            })
        }
        const hashingNewPassword = await hash(newPassword, await genSalt(12))
        await prisma.account.update({
            where: {
                id: userExist.Account[0].id
            },
            data: {
                password: hashingNewPassword
            }
        })
        prisma.$disconnect()

        return NextResponse.json({ message: 'Password Changed Is Successful' }, { status: 200, statusText: 'SUCCESSFUL' })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        prisma.$disconnect()

        return NextResponse.json({ message: error?.message }, { status: 400, statusText: 'FAIL' })

    }
}