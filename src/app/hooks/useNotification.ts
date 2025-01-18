import { Notification } from "@prisma/client";
import { useState } from "react";

export const useNotification = () => {
    const [isLoading, setIsLoading] = useState<boolean | null>(null);
    const [error, setError] = useState(null);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [listNotification, setListNotification] = useState<Notification[]>([])
    const [totalPages, setTotalPages] = useState<number>(0)
    const getNotification = async (limit: number | null=null, skip: number | null=null,idAccount:string|null=null,sortedAs:string|null='desc',startDate:string | unknown,endDate:string | unknown) => {
        try {
            setIsLoading(true)
            setListNotification([])
            const res = await fetch(`/api/notifications?${startDate?`startDate=${startDate}&`:''}${endDate?`endDate=${endDate}&`:''}${idAccount?`idAccount=${idAccount}&`:''}${limit? `limit=${limit}&`:''}${skip? `skip=${skip}&`:''}${sortedAs? `sorted=${sortedAs}`:''}`, {
                method: 'GET',
                headers: {
                    'Content-type': 'application/json'
                },
                cache:'default'
            })
            const resJson = await res.json()
            setIsLoading(false)
            if (!res.ok) {
                setError(resJson.message)
                return
            }
            setError(null)
            setListNotification(resJson.data.notifications)
            setTotalPages(resJson.data.totalPages)
            return resJson.data.notifications
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // setError(error.message)
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