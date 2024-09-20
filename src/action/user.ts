/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { PrismaClient } from '@prisma/client'
import { signIn } from "@/auth"
import { compare, hash } from "bcryptjs"
import { redirect } from 'next/navigation'
const prisma = new PrismaClient()

export async function register(prevState: any, formData: FormData) {
    try {
        const firstName: string = <string>formData.get('firstName')
        const lastName: string = <string>formData.get('lastName')
        const email: string = <string>formData.get('email')
        const password: string = <string>formData.get('password')
        if (!firstName || !lastName || !email || !password) {
            return {
                message: 'Please Fill All Fields',
            }
        }
        await prisma.$connect()
        const isExistingUser = await prisma.user.findUnique({
            where: { email }
        })
        if (isExistingUser) {
            console.log('Email Is Already Exist');
            return {
                message: 'Email Is Already Exist',
            }
        }
        const hashingPassword = await hash(password, 12)
        await prisma.user.create({
            data: {
                firstName,
                lastName,
                email,
                password: hashingPassword,
                image: '',
                authProviderId: ''
            }
        })
        await prisma.$disconnect()
    } catch (error) {
        await prisma.$disconnect()
        return {
            message: 'Error While Creating Account',
        }
    }
    redirect('/auth/login')
}
export async function login(prevState: any, formData: FormData) {

    try {
        const email: string = <string>formData.get('email')
        const password: string = <string>formData.get('password')
        if (!email || !password) {
            return {
                message: 'Please Fill All Fields',
            }
        }
        await prisma.$connect()
        const isExistingUser = await prisma.user.findUnique({
            where: { email }
        })
        if (!isExistingUser) {
            return {
                message: 'Email Is Not Exist',
            }
        }
        const isValidPassword = await compare(password, isExistingUser.password)
        if (!isValidPassword) {
            return {
                message: 'Password Is Not Valid'
            }
        }
        await signIn('credentials', {
            email,
            password,
            redirect: false,
        })
    } catch (error) {
        return {
            message: <string>error
        }
    }
    redirect('/')
}