import { useState } from "react"
import toast from "react-hot-toast";
import { useStore } from "./useStore";

export function useAccount() {
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)
    // const [accounts, setAccounts] = useState<[Account] | null>(null)
    const {setAccounts}=useStore()
    const createAccount = async (accountType, accountPassword, accountDescription) => {
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
            toast.success(resData.message,{
                position:'top-center',
                duration:4000
            })
            await getAccounts()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setLoading(false)
            // setError(error.message)
        }
    }
    const getAccounts = async (numberAccounts?) => {
        try {
            setAccounts([])
            setLoading(true)
            const res = await fetch(`/api/accounts?${numberAccounts ?`limit=${numberAccounts}`:''}`, {
                method: 'GET',
                headers: {
                    "Content-Type": 'application/json'
                }
            })
            const data = await res.json()

            if (!res.ok) {
                setError(data.error)
                setLoading(false)
                return
            }
            setError(null)
            setLoading(false)
            setAccounts(data.accountsUser)
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setLoading(false)
            // setError(error.message)
        }
    }
    return { createAccount, getAccounts, error, loading }
}