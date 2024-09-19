import { auth } from "@/auth"

export async function getSession () {
    try {
        const session = auth()
        return session
    } catch (error) {
        console.log(error);
        
    }
}