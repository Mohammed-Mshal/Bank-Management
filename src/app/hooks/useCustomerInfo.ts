import { useState } from "react";
import checkEnvironment from "../libs/checkEnvironment";
export interface CustomerInfo {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    image: string;
    phoneNumber: string;
    address: string;
    dateOfBirth: string | Date | undefined;
    gender: string;
    residentialAddress: string;
}
export function useCustomerInfo() {
    const [userInfo, setUserInfo] = useState<CustomerInfo>({
        id: "",
        firstName: "",
        lastName: "",
        email: "",
        image: "",
        phoneNumber: "",
        address: "",
        dateOfBirth: undefined,
        gender: '',
        residentialAddress: ''
    });
    const [isLoading, setIsLoading] = useState<boolean | null>(null);
    const [error, setError] = useState<string | null>(null);
    const getInfoCustomer = async () => {
        try {
            setIsLoading(true);
            const response = await fetch(`/api/user`, {
                method: "GET",
                cache: 'no-store',
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json()
            if (response.status === 200) {

                setUserInfo({ ...data.userInfo, dateOfBirth: data.userInfo.dateOfBirth as Date })
                setError(null)
                setIsLoading(false)
                console.log(data);
            }
            else {
                setIsLoading(false);
                setError(data.message)
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            setIsLoading(false)
            setError(error.message)
        }
    }
    return { userInfo, isLoading, error, getInfoCustomer }
}