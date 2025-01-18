import { verifySession } from "@/app/libs/session";
import { PrismaClient } from "@prisma/client";
import { compare, genSalt, hash } from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import isMongoId from 'validator/lib/isMongoId'
const prisma = new PrismaClient()
export async function PATCH(req: NextRequest) {
    try {
        const session = await verifySession()
        await prisma.$connect()
        if (!session) {
            return NextResponse.json({
                message: 'Unauthorized'
            }, {
                status: 401,
                statusText: 'ERROR'
            })
        }
        const userId = session.userId as string
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
        const customerInfo = await prisma.customer.findUnique({
            where: {
                id: userId as string
            },
            select: {
                password: true
            }
        })
        if (!customerInfo) {
            return NextResponse.json({
                message: 'User Not Found'
            }, {
                status: 404,
                statusText: 'ERROR'
            })
        }
        const { oldPassword, newPassword } = await req.json()
        if (!oldPassword || !newPassword) {
            return NextResponse.json({
                message: 'Please Fill All Fields'
            }, {
                status: 204,
                statusText: 'ERROR'
            })
        }

        const isPasswordValid = await compare(oldPassword, customerInfo.password)
        if (!isPasswordValid) {
            return NextResponse.json({
                message: 'Password Is Not Valid'
            }, {
                status: 401,
                statusText: 'ERROR'
            })
        }
        const newPasswordHashing = await hash(newPassword, await genSalt(12))
        await prisma.customer.update({
            where: {
                id: userId as string
            },
            data: {
                password: newPasswordHashing
            }
        })
        await prisma.$disconnect()
        return NextResponse.json({
            message: 'Password Changed is Successful'
        }, {
            status: 200,
            statusText: 'SUCCESSFUL'
        })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        await prisma.$disconnect()
        return NextResponse.json({
            message: error.message as string
        }, {
            status: 500,
            statusText: 'FAIL'
        })
    }
}