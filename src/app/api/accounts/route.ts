import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/app/libs/session";
import { AccountType, PrismaClient } from "@prisma/client";
import { genSalt, hash } from "bcryptjs";
const prisma = new PrismaClient()
export async function POST(req: NextRequest) {
    try {
        await prisma.$connect()
        const session = await verifySession()
        if (!session || !session.userId) {
            throw new Error('User Not Authorized')
        }
        const userVerify = await prisma.customer.findUnique({
            where: {
                id: <string>session.userId
            }
        })
        if (!userVerify) {
            throw new Error('user Not Exist')
        }
        const { typeAccount, passwordAccount, descriptionAccount }:
            { typeAccount: AccountType, descriptionAccount: string, passwordAccount: string } = await req.json()
        if (!typeAccount || !passwordAccount || !descriptionAccount) {
            throw new Error('Please Fill All Fields')
        }
        const saltPassword = await genSalt(12)
        const hashingPassword = await hash(passwordAccount, saltPassword)
        await prisma.account.create({
            data: {
                accountType: typeAccount,
                accountUsingDescription: descriptionAccount,
                password: hashingPassword,
                balance: 50000,
                accountStatus: "VERIFY",
                customerId: userVerify.id
            }
        })
        prisma.$disconnect()

        return NextResponse.json({ message:"Account Is Created" }, { status: 200, statusText: 'Account is Created' })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        prisma.$disconnect()

        return NextResponse.json({ message: error?.message }, { status: 400, })
    }
}
export async function GET(req: NextRequest) {
    try {
        await prisma.$connect()
        const session = await verifySession()
        const idUser = session?.userId
        const accountType: AccountType | null = <AccountType>req.nextUrl.searchParams.get('account_type')
        const limit = req.nextUrl.searchParams.get('limit') || 10
        const page = req.nextUrl.searchParams.get('page') || 1
        const skip = (+page - 1) * +limit
        if (!idUser) {
            throw Error("User Not Authorized")
        }
        const isUserExist = await prisma.customer.findUnique({
            where: {
                id: <string>idUser
            },
            select: {
                id: true
            }
        })
        if (!isUserExist) {
            throw Error("User Not Authorized")
        }
        const accountsUser = accountType === 'CHECKING' ? await prisma.account.findMany({
            where: {
                customerId: isUserExist.id,
                accountType: 'CHECKING'
            },
            take: +limit,
            skip
        }) : accountType === 'SAVING' ? await prisma.account.findMany({
            where: {
                customerId: isUserExist.id,
                accountType: 'SAVING'

            },
            take: +limit,
            skip
        }) : await prisma.account.findMany({
            where: {
                customerId: isUserExist.id
            },
            take: +limit,
            skip
        })
        prisma.$disconnect()
        return NextResponse.json({
            accountsUser

        }, {
            status: 200,
            statusText: 'SUCCESSFUL'
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        prisma.$disconnect()
        return NextResponse.json({
            error: error.message as string
        }, {
            status: 400,
        })
    }
}