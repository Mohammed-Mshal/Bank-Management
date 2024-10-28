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
        console.log(typeAccount, passwordAccount, descriptionAccount);
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
                balance: 0,
                accountStatus: "PENDING",
                customerId: userVerify.id
            }
        })

        return NextResponse.json({ data: null }, { status: 200, statusText: 'Account is Created' })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        return NextResponse.json({ error: error?.message }, { status: 400, })
    }
}