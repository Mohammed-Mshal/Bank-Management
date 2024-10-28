import { useState } from "react"

export function useCreateAccount() {
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)

    const createAccount = async (accountType,
        accountPassword,
        accountDescription) => {
        try {
            if (!accountType || !accountPassword || !accountDescription) {
                setError('Please Fill All Fields')
            }
            setLoading(true)
            const data = await fetch('/api/accounts', {
                method: 'POST',
                headers: {
                },
                body: JSON.stringify({
                    typeAccount: accountType,
                    passwordAccount: accountPassword,
                    descriptionAccount: accountDescription
                })
            })
            const resData = await data.json()
            if (data.status === 400) {
                setError(resData.error)
                setLoading(false)
            }
            setError(null)
            setLoading(false)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.message)
        }
    }
    return { createAccount, error, loading }
}