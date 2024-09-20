import { auth } from "@/auth"
import { cache } from "react";

export const getSession = cache(async () => {
    try {
        const session = auth()
        return session
    } catch (error) {
        console.log(error);

    }
})