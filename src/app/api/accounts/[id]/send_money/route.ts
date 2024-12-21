import { verifySession } from "@/app/libs/session";
import { PrismaClient } from "@prisma/client";
import { compare } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import isMongoId from 'validator/lib/isMongoId';

const prisma = new PrismaClient()

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await prisma.$connect()
        const session = await verifySession()
        if (!session) {
            throw Error('Not Authorized')
        }
        const { totalBalance, password, descriptionOfTransfer }:
            { totalBalance: number, password: string, descriptionOfTransfer: string } = await req.json()
        const accountId = (await params).id;
        const userId = session?.userId;
        if (!userId) {
            throw Error('Not User Id Not Exist')
        }
        if (!isMongoId(accountId)) {

            throw Error('Account Id Is Not Valid')
        }
        const account = await prisma.account.findUnique({
            where: {
                id: accountId,
                customerId: userId
            }
        })
        if (!account) {
            throw Error('Your Account not Exist')
        }
        if (!descriptionOfTransfer) {
            throw Error('Description Transfer Is Required')
        }
        const isPasswordExist = await compare(password, account.password)
        if (!isPasswordExist) {
            throw Error('Password Is Not Valid')
        }
        if (account.accountStatus !== 'VERIFY') {
            throw Error('Account Not Verify Yet')
        }
        if (account.balance < totalBalance) {
            throw Error('Account hasn`t Enough Of Money')
        }
        const ReceiverAccountId = req.nextUrl.searchParams.get('ReceiverAccount')
        if (!ReceiverAccountId) {
            throw Error('Receiver Account Id Is Require')
        }
        if (!isMongoId(ReceiverAccountId)) {

            throw Error('Receiver Account Id Is Not Valid')
        }
        const ReceiverAccount = await prisma.account.findUnique({
            where: {
                id: ReceiverAccountId
            }
        })
        if (!ReceiverAccount) {
            throw Error('Receiver Account not Exist')
        }
        if (ReceiverAccount.accountStatus !== 'VERIFY') {
            throw Error('Account Not Verify Yet')
        }
        await prisma.account.update({
            where: { id: account.id },
            data: {
                balance: account.balance - totalBalance,

            }
        })
        await prisma.notification.create({
            data: {
                titleMessage: 'Transfer Money',
                textMessage: `Transfer Money To Account Id:${ReceiverAccount.id} Is Complete`,
                customerId: account.customerId
            }
        })
        await prisma.account.update({
            where: { id: ReceiverAccount.id },
            data: {
                balance: ReceiverAccount.balance + totalBalance,

            }
        })
        await prisma.notification.create({
            data: {
                titleMessage: 'Receive Money',
                textMessage: `You Receive Money From Account Id:${account.id}`,
                customerId: ReceiverAccount.customerId
            }
        })
        await prisma.transaction.create({
            data: {
                amount: totalBalance,
                description: descriptionOfTransfer,
                accountId: account.id,
                idReceiverAccount: ReceiverAccount.id,
                idReceiverCustomer: ReceiverAccount.customerId
            }
        })
        await prisma.$disconnect()
        return NextResponse.json({
            message: 'Money Transfer Has Successful'
        }, {
            status: 200
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        await prisma.$disconnect()
        return NextResponse.json({
            message: error.message as string
        }, {
            status: 400
        })

    }
}
