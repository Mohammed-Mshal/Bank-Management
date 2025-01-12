import { useState } from "react"
export const useTransactions=()=>{
    const [isLoading,setIsLoading]=useState(false);
    const [error,setError]=useState(false);
    const [listTransactions,setListTransactions]=useState([])
    const [totalPages,setTotalPages]=useState(0)
    const getTransactions= async (limit: number | null=null, skip: number | null=null,idAccount:string|null=null,sortedAs:string|null='desc',sortedBy:string|null='date',startDate:string | unknown,endDate:string | unknown) => {
        try {
            setListTransactions([])
            setIsLoading(true)
            const res = await fetch(`/api/transactions?${startDate?`startDate=${startDate}&`:''}${endDate?`endDate=${endDate}&`:''}${idAccount?`idAccount=${idAccount}&`:''}${limit? `limit=${limit}&`:''}${skip? `skip=${skip}&`:''}${sortedAs? `sorted=${sortedAs}&`:''}${sortedBy? `sortedBy=${sortedBy}`:''}`, {
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
            setError(false)
            setListTransactions(resJson.data.transactions)
            setTotalPages(resJson.data.totalTransactions)
            return resJson.data.transactions
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            // setError(error.message)
            setIsLoading(false)
        }
    }
    return {isLoading,error,listTransactions,totalPages,getTransactions}
}
