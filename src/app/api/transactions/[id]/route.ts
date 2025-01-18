import { verifySession } from '@/app/libs/session';
import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import isMongoId from 'validator/lib/isMongoId';

const prisma = new PrismaClient()
export async function DELETE(req: NextRequest,{ params }: { params: Promise<{ id: string }> }){
    try {
        await prisma.$connect()
        const session=await verifySession()
        if (!session) {
            return NextResponse.json({
                message:'You Are Not logged In'
            },{
                status:401,
                statusText:'FAIL'
            })
        }
        const userId=session?.userId as string
        if(!userId||!isMongoId(userId)){
            return NextResponse.json({
                message:'Id User Not Valid'
            },{
                status:401,
                statusText:'FAIL'
            })
        }
        const idTransaction=(await params)?.id;
        if (!idTransaction) {
            return NextResponse.json({
                message:'Id Transaction Is Required'
            },{
                status:400,
                statusText:'FAIL'
            })
        }
        const transaction = await prisma.transaction.findFirst({
            where: {
                id:idTransaction
            },
            select: {
                id: true
            }
        })
        if (!transaction) {
            return NextResponse.json({
                message:'Transaction Is Not Exist'
            },{
                status:400,
                statusText:'FAIL'
            })
        }
        await prisma.transaction.delete({
            where: {
                id:idTransaction
            }
        })
        await prisma.$disconnect()
        return NextResponse.json({
            message:'Delete Transaction Is Complete'
        },{
            status:200,
            statusText:'SUCCESS'
        })
    } catch (error) {
        await prisma.$disconnect()
        console.log(error);
    }
}