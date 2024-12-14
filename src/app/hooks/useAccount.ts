import { Account } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react"
import checkEnvironment from "../libs/checkEnvironment";

export function useAccount() {
    const [error, setError] = useState<null | string>(null)
    const [loading, setLoading] = useState(false)
    const [accounts, setAccounts] = useState<[Account] | null>(null)

    const router = useRouter();

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
            router.refresh();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.message)
        }
    }
    const getAccounts = async (numberAccounts?) => {
        try {
            setLoading(true)
            const res = await axios(`/api/accounts?${numberAccounts && `limit=${numberAccounts}`}`, {
                method: 'get',
                responseType: 'json',
                baseURL: checkEnvironment(),
            })

            if (res.status === 400) {
                setError(res.data.error)
                setLoading(false)
            }
            setError(null)
            setLoading(false)
            setAccounts(res.data.accountsUser)
            router.refresh();
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setLoading(false)
            setError(error.message)
        }
    }
    return { createAccount, getAccounts, error, loading, accounts }
}