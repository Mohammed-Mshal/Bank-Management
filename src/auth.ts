import NextAuth, { CredentialsSignin } from "next-auth";
import GoogleProvider from 'next-auth/providers/google'
import CredentialProvider from 'next-auth/providers/credentials'
import { connectDB } from "./app/lib/db";
import UserModel from "./app/model/userModel";
import { compare } from "bcryptjs";
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
          throw new CredentialsSignin('Please Provide Email And Password')
        }
        await connectDB()
        const isExistingUser = await UserModel.findOne({ email })
        if (!isExistingUser) {
          throw new Error('Email Is Not Exist')
        }
        const isValidPassword = await compare(password, isExistingUser.password)
        if (!isValidPassword) {
          throw new Error("Password Is Not Valid")
        }
        const userData = {
          id: isExistingUser._id,
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
    async session({ session, token }) {
      if (token?.sub && token?.role) {
        session.user.id = token.sub
        session.user.role = token.role
      }
      return session
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    signIn: async ({ user, account }) => {
      if (account?.provider === 'google') {
        try {
          const { name, email, image, id } = user
          await connectDB()
          const isExistingUser = await UserModel.findOne({ email })
          if (!isExistingUser) {
            await UserModel.create({
              firstName: name,
              lastName: name,
              email,
              image,
              authProviderId: id
            })
            return true
          }
          else {
            return true
          }

        } catch (error) {
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