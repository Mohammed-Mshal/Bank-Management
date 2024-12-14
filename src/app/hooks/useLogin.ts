import { useState } from "react"
import checkEnvironment from "../libs/checkEnvironment";
import { useRouter } from "next/navigation";

export function useLogin() {
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)
    const route=useRouter()
    const login = async (email: string, password: string) => {
        try {
            if (!email || !password) {
                setError('Please Fill All Fields')
            }
            setLoading(true)
            const data = await fetch(`${checkEnvironment()}/api/user/login`, {
                method: 'POST',
                headers: {
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            })
            const resData = await data.json()
            if (!data.ok) {
                setError(resData.error)
                setLoading(false)
            }
            setError(null)
            setLoading(false);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.log(error);
            setLoading(false);
            
        }
        route.push('/dashboard')
    }
    return { login, error, loading }
}