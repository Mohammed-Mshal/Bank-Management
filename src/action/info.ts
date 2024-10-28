"use server"
import { verifySession } from "@/app/libs/session"
import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
export async function getDataUser() {
    try {
        await prisma.$connect()
        const session = await verifySession()
        if (!session?.userId) {
            throw new Error('user not Authentication')
        }
        const userInfo = await prisma.customer.findUnique({
            where: {
                id: session?.userId as string
            },
            select: {
                password: false,
                Account: true,
                address: true,
                firstName: true,
                lastName: true,
                email: true,
                image: true,
                phoneNumber: true,
                Loan: true,
                dateOfBirth: true,
                upadtedAt: true,
                createdAt: true,
            }
        })
        if (!userInfo) {
            throw new Error('User Is Not Exist')
        }

        await prisma.$disconnect()
        return userInfo
    } catch (error) {
        await prisma.$disconnect()
        console.log(error);
    }
};