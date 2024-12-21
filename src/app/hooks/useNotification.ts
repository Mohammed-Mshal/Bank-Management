import { Notification } from "@prisma/client";
import { useState } from "react";

export const useNotification = () => {
    const [isLoading, setIsLoading] = useState<boolean | null>(null);
    const [error, setError] = useState(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [listNotification, setListNotification] = useState<Notification[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)
    const getNotification = async (limit?: number | null, skip?: number | null) => {
        try {
            setIsLoading(true)
            if (skip === 1) {
                setListNotification([])
            }
            const res = await fetch(`/api/notifications?${limit && `limit=${limit}`}&${skip && `skip=${skip}`}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
                cache: 'no-cache'
            })
            const resJson = await res.json()
            setIsLoading(false)
            if (!res.ok) {
                setError(resJson.message)
                return
            }
            setError(null)
            setListNotification(pre => [...pre, ...resJson.data.notifications])
            setTotalPages(resJson.data.totalPages)
            return resJson.data.notifications
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setError(error.message)
            setIsLoading(false)
        }
    }
    return {
        isLoading,
        error,
        listNotification,
        getNotification,
        totalPages
    }
}