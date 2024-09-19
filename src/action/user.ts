'use server'

import { connectDB } from "@/app/lib/db"
import UserModel from "@/app/model/userModel"
import { signIn } from "@/auth"
import { compare, hash } from "bcryptjs"
import { redirect } from "next/navigation"

export async function register(prevState: { message: string }, formData: FormData) {
    try {
        const firstName: string = <string>formData.get('firstName')
        const lastName: string = <string>formData.get('lastName')
        const email: string = <string>formData.get('email')
        const password: string = <string>formData.get('password')
        if (!firstName || !lastName || !email || !password) {
            return {
                message: 'Please Fill All Field',
            }
        }
        await connectDB()
        const isExistingUser = await UserModel.findOne({ email })
        if (isExistingUser) {
            return {
                message: 'Email Is Already Exist',
            }
        }
        const hashingPassword = await hash(password, 12)

        await UserModel.create({ firstName, lastName, email, password: hashingPassword })

        redirect('/auth/login')
    } catch (error) {
        return {
            message: 'Error While Creating Account',
        }
    }
}
export async function login(prevState: { message: string }, formData: FormData) {
    try {
        const email: string = <string>formData.get('email')
        const password: string = <string>formData.get('password')
        if (!email || !password) {
            return {
                message: 'Please Fill All Field',
            }
        }
        await connectDB()
        const isExistingUser = await UserModel.findOne({ email })
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