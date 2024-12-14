import { verifySession } from "@/app/libs/session";
import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import isMongoId from 'validator/lib/isMongoId'
import ImageKit from "imagekit";
const imageKit = new ImageKit({
    publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,
    privateKey: process.env.PRIVATE_KEY as string,
    urlEndpoint: process.env.NEXT_PUBLIC_URL_ENDPOINT as string,
});
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
        const userId = session.userId
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
        const user = await prisma.customer.findUnique({
            where: {
                id: userId as string
            }
        })
        const data = await req.formData()
        const file: File | null = data.get('profile_image') as unknown as File

        let imageUrl: string = '';
        let imageId: string = '';
        if (file) {

            const bytes = await file.arrayBuffer()
            const bufferImageProfile = Buffer.from(bytes)
            console.log('ssss');
            user?.imageId && user?.imageId.length > 0 &&
                await imageKit.deleteFile(user?.imageId as string)
            const resultUploading = await imageKit.upload({
                useUniqueFileName: false,
                file: bufferImageProfile,
                fileName: `${userId}.${file.type.split('/')[1]}`,
                folder: 'Bank_Management',
                checks: `"file.size" < "2mb"`,
                extensions: [
                    {
                        name: "google-auto-tagging",
                        maxTags: 5,
                        minConfidence: 95,
                    }
                ],
            })
            imageUrl = resultUploading.url as string
            imageId = resultUploading.fileId as string

        }
        const dateOfBirth = <string>data.get('dateOfBirth')
        const phoneNumber = <string>data.get('phoneNumber')
        const address = <string>data.get('address')
        const firstName = <string>data.get('firstName')
        const lastName = <string>data.get('lastName')
        const gender = <string>data.get('gender')
        const residentialAddress = <string>data.get('residentialAddress')
        const defaultImage: string | null = <string>data.get('image')
        if (defaultImage != null) {
            user?.imageId && user?.imageId.length > 0 &&
                await imageKit.deleteFile(user?.imageId as string)
        }

        imageUrl.length > 0 ?
            await prisma.customer.update({
                where: {
                    id: userId as string
                },
                data: {
                    dateOfBirth,
                    phoneNumber,
                    address,
                    firstName,
                    lastName,
                    residentialAddress,
                    gender: gender,
                    image: imageUrl,
                    imageId: imageId,
                }
            }) : defaultImage != null ? await prisma.customer.update({
                where: {
                    id: userId as string
                },
                data: {
                    dateOfBirth,
                    phoneNumber,
                    address,
                    gender: gender,
                    residentialAddress,
                    firstName,
                    lastName,
                    imageId: '',
                    image: 'https://ik.imagekit.io/alphaTeam/Bank_Management/default.jpg'
                }
            }) : await prisma.customer.update({
                where: {
                    id: userId as string
                },
                data: {
                    dateOfBirth,
                    phoneNumber,
                    address,
                    gender: gender,
                    residentialAddress,
                    firstName,
                    lastName,
                }
            })
        return NextResponse.json({
            message: 'Edit Profile Successful'
        }, {
            status: 200,
            statusText: 'SUCCESS'
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