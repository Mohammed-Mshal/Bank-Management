import { useState } from "react"
import { useRouter } from "next/navigation";

export function useSignup() {
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)
    const route = useRouter()
    const signup = async (firstName?: string | null, lastName?: string | null, email?: string | null, password?: string | null) => {
        try {
            if (!firstName || !lastName || !email || !password) {
                setError('Please Fill All Fields')
            }
            console.log(firstName,lastName,email,password);
            
            setLoading(true)
            setError(null)
            const data = await fetch(`/api/user/register`, {
                method: 'POST',
                headers: {
                },
                body: JSON.stringify({
                    firstName,
                    lastName,
                    email,
                    password
                })
            })
            const resData = await data.json()
            if (!data.ok) {
                setError(resData.message)
                setLoading(false)
                return
            }
            setError(null)
            setLoading(false);
            route.push('/dashboard')

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setLoading(false);
            setError(error.message);

        }
    }
    return { signup, error, loading }
}