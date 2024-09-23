import { PrismaClient } from "@prisma/client"
import { verifySession } from "../libs/session"
import { cache } from "react"
import { taintUniqueValue } from "next/dist/server/app-render/rsc/taint"
const prisma = new PrismaClient()
export const getUser = cache(async () => {
    const session = await verifySession()
    await prisma.$connect()
    const data = await prisma.user.findUnique({
        where: {
            id: session?.userId as string
        },
    })
    const userData = userDTO(data)
    return userData
})


const userDTO = (user) => {
    taintUniqueValue(
        'Do not pass a user session token to the client.',
        user,
        user.session.token
    )
    return {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        auditTrail: canViewAudit(user.auditTrail, user.role)
    }
}
function canViewAudit(auditTrail, role) {
    return role === 'admin' ? auditTrail : null
}
