import { useState } from "react";
import toast from "react-hot-toast";

export const useResetPasswordUser=()=>{
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState(null);
    const [successful, setSuccessful] = useState(null);
    const resetPassword=async(oldPassword:string,newPassword:string)=>{
        try {
            setIsLoading(true)
            setError(null)
            setSuccessful(null)
            const res=await fetch('/api/user/reset-password',{
                method:'PATCH',
                headers:{
                    'Content-Type':"application/json"
                },
                body:JSON.stringify({
                    oldPassword,
                    newPassword
                })
            })
            const data=await res.json()
            if (!res.ok) {
                setIsLoading(false)
                setError(data.message)
                return
            }
            setSuccessful(data.message)
            toast.success(data.message,{
                duration:3000,
                position:'top-center'
            })
            setIsLoading(false)
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            console.log(error);
            setIsLoading(false)
        }
    }
    return{isLoading,error,resetPassword,successful}
}