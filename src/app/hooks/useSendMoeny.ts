import { useRouter } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

export const useSendMoney = () => {
    const [error, setError] = useState<null | string>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [successful, setSuccessful] = useState<null | string>(null)
    const router = useRouter()
    const sendMoney = async (idAccount?, idReceiverAccount?, password?, totalMoney?, descriptionTransfer?) => {
        try {
            setError(null)
            setIsLoading(true)
            setSuccessful(null)
            const res = await fetch(`/api/accounts/${idAccount}/send_money?ReceiverAccount=${idReceiverAccount}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    totalBalance: totalMoney,
                    password: password,
                    descriptionOfTransfer: descriptionTransfer
                })
            })
            const data = await res.json()
            setIsLoading(false)
            if (!res.ok) {
                setError(data.message)
                setSuccessful(null)
                toast.error(data.message);
                return;
            }
            setSuccessful(data.message)
            toast.success(data.message);
            router.refresh()
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setIsLoading(false)
            setSuccessful(null)
            // setError(error.message)
        }
    }

    return { error, successful, isLoading, sendMoney }
}