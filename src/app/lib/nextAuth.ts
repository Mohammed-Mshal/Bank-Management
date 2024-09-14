import { AuthOptions } from "next-auth"
import Google from "next-auth/providers/google"
export const authOptions: AuthOptions = {
    providers: [
        Google({
            clientId: <string>process.env.GOOGLE_CLIENT_ID,
            clientSecret: <string>process.env.GOOGLE_CLIENT_SECRET
        })
    ],
    session: {
        strategy: "jwt",
        maxAge: 1 * 24 * 60 * 60
    },
    jwt: {

    },
    callbacks: {

    },
    pages: {
        signIn: "/auth/signin"
    },
    secret: process.env.NEXTAUTH_SECRET
}