/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { createSession } from '@/app/libs/session'
import { PrismaClient } from '@prisma/client'
import { compare, hash } from "bcryptjs"
import { redirect } from 'next/navigation'
const prisma = new PrismaClient()

export async function register(state, formData: FormData) {
    try {
        await prisma.$connect()
        const firstName: string = <string>formData.get('firstName')
        const lastName: string = <string>formData.get('lastName')
        const email: string = <string>formData.get('email')
        const password: string = <string>formData.get('password')
        if (!firstName || !lastName || !email || !password) {
            return {
                errors: 'Please Fill All Fields',
            }
        }

        const isExistingUser = await prisma.customer.findUnique({
            where: { email }
        })
        if (isExistingUser) {
            return {
                errors: 'Email Is Already Exist',
            }
        }
        const hashingPassword = await hash(password, 12)
        const userCreated = await prisma.customer.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashingPassword,
                image: '',
                address: '',
                dateOfBirth: '',
                phoneNumber: '',
                imageId:'',
                gender:'',
                residentialAddress:''
            }
        })
        await createSession(userCreated.id)
    } catch (error) {
        await prisma.$disconnect()
        return {
            errors: 'Error While Creating Account',
        }
    }
    await prisma.$disconnect()
    redirect('/dashboard')
}
export async function login(state, formData: FormData) {

    try {
        await prisma.$connect()
        const email: string = <string>formData.get('email')
        const password: string = <string>formData.get('password')
        if (!email || !password) {
            return {
                errors: 'Please Fill All Fields',
            }
        }
        const isExistingUser = await prisma.customer.findUnique({
            where: { email }
        })
        if (!isExistingUser) {
            return {
                errors: 'Email Is Not Exist',
            }
        }
        const isValidPassword = await compare(password, isExistingUser.password)
        if (!isValidPassword) {
            return {
                errors: 'Password Is Not Valid'
            }
        }
        await createSession(isExistingUser.id)
    } catch (errors) {
        return {
            errors: <string>errors
        }
    }
    await prisma.$disconnect()
    redirect('/dashboard')
}
