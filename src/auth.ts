/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { CredentialsSignin, User } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialProvider from 'next-auth/providers/credentials'
import { compare } from "bcryptjs";
import { PrismaClient, User as userModel } from "@prisma/client";
import { JWT } from "next-auth/jwt";
import { AdapterUser } from "next-auth/adapters";
const prisma = new PrismaClient()

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialProvider({
      name: 'credentials',
      type: 'credentials',
      credentials: ({
        email: { name: 'email', label: 'Email' },
        password: { name: 'password', label: 'Password' }
      }),
      authorize: async (credentials) => {
        const email = credentials.email as string | undefined
        const password = credentials.password as string | undefined
        if (!email || !password) {
          throw new CredentialsSignin('Please Fill all Field')
        }
        await prisma.$connect()
        const isExistingUser = await prisma.user.findUnique({
          where: { email }
        })
        if (!isExistingUser) {
          throw new Error('Email Is not Exist')
        }
        const isValidPassword = await compare(password, isExistingUser.password)
        if (!isValidPassword) {
          throw new Error('Password Is Not Valid')
        }
        const userData = {
          id: isExistingUser.id,
          firstName: isExistingUser.firstName,
          lastName: isExistingUser.lastName,
          email: isExistingUser.email,
          image: isExistingUser.image,
          role: isExistingUser.role
        }
        return userData
      },
    })
  ],
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/signup',
  },
  callbacks: ({
    async jwt({ token, user }: { token: JWT, user: userModel | User | AdapterUser }) {
      if (user) {
        const myUser: userModel = user as userModel
        token.role = myUser.role
      }
      return token
    },
    async session({ session, token }: {
      session: any
      token: any
    }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === 'google') {
        try {
          const { name, email, image, id } = user
          if (email) {
            await prisma.$connect()
            const isExistingUser = await prisma.user.findUnique({
              where: { email }
            })
            if (!isExistingUser) {
              await prisma.user.create({
                data: {
                  firstName: name!,
                  lastName: '',
                  password: '',
                  email,
                  image: image!,
                  authProviderId: id!
                }
              })
              await prisma.$disconnect()

              return true
            }
            else {
              return true
            }
          }
          else {
            console.log('lllll');
            
            throw new Error('Some Data Is Missing')

          }
        } catch (error) {
          console.log(error);

          throw new Error('Error While Creating User')
        }
      }
      else if (account?.provider === 'credentials') {
        return true
      } else {
        return false
      }
    }
  })
})