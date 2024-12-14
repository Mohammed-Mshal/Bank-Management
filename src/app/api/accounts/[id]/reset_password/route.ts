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
        const reqBody: { oldPassword, newPassword } = await req.json()
        if (!userId) {
            throw Error('User Id Not Exist')
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
            throw Error('Customer Not Exist')
        }
        if (!userExist.Account) {
            throw Error('Account Not Exist For This Customer')
        }
        const { oldPassword, newPassword }: {
            oldPassword: string, newPassword: string
        } = reqBody
        if (!oldPassword || !newPassword) {
            throw Error('Inputs required Is missing')
        }
        const isOldPasswordExist = await compare(oldPassword, userExist.Account[0].password)
        if (!isOldPasswordExist) {
            throw Error('Password Account Not Valid')
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

        return NextResponse.json({ error: error?.message }, { status: 400, statusText: 'FAIL' })

    }
}