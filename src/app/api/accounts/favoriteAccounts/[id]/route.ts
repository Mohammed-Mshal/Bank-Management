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
                message: "User is Not Found",
                data: null
            }, {
                status: 401,
                statusText: "FAIL"
            })
        }
        const idCustomer = session.userId as string
        if (!isMongoId(idCustomer)) {
            return NextResponse.json({
                message: "Id Account Is Not Valid",
                data: null
            }, {
                status: 400,
                statusText: "FAIL"
            })
        }
        const idAccount = (await params).id
        if (!idAccount) {
            return NextResponse.json({
                message: "Id Account Is Required",
                data: null
            }, {
                status: 400,
                statusText: "FAIL"
            })
        }
        const account = await prisma.favoriteAccount.findUnique({
            where: {
                id: idAccount,
                customerId: idCustomer
            }
        })
        if (!account) {
            return NextResponse.json({
                message: "Account Is Not Found",
                data: null
            }, {
                status: 400,
                statusText: "FAIL"
            })
        }
        await prisma.favoriteAccount.delete({
            where: {
                id: idAccount as string,
            }
        })
        await prisma.$disconnect()
        return NextResponse.json({
            message: "Account Deleting Successful",
            data: null
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
            statusText: 'ERROR'
        })
    }

}