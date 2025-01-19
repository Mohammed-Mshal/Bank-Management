import React from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CiMenuKebab } from "react-icons/ci";
import FormEditDescription from "./FormEditDescription";
import FormResetPasswordAccount from "./FormResetPasswordAccount";
import Swal from "sweetalert2";
import { Button } from "@/components/ui/button";
import { useAccount } from "../hooks/useAccount";

export default function AccountSetting({ idAccount }: { idAccount: string }) {
    const { getAccounts } = useAccount()
    const handleDeleteTransaction = async (id: string, password: string) => {
        try {
            const res = await fetch(`/api/accounts/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password
                })
            });
            const json = await res.json();
            if (!res.ok) {
                Swal.fire({
                    icon: "error",
                    text: json.message as string,
                    customClass: {
                        container: "bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl",
                        popup: "bg-[#1A1A1A] rounded-2xl text-white",
                        confirmButton: "bg-indigo-800",
                        htmlContainer: 'text-white'
                    },
                });
                return;
            }
            Swal.fire({
                icon: "success",
                text: json.message as string,
                customClass: {
                    container: "bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl",
                    popup: "bg-[#1A1A1A] rounded-2xl text-white",
                    confirmButton: "bg-indigo-800",
                    htmlContainer: 'text-white'
                },
            });
            await getAccounts()

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            Swal.fire({
                icon: "error",
                text: error.message as string,
                customClass: {
                    container: "bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl",
                    popup: "bg-[#1A1A1A] rounded-2xl",
                    confirmButton: "bg-indigo-800",
                },
            });
        }
    };
    return (
        <Popover>
            <PopoverTrigger className="flex items-center md:gap-2 gap-1" name="Account Settings">
                <CiMenuKebab />
            </PopoverTrigger>
            <PopoverContent className="p-0 rounded-xl overflow-hidden" align="end">
                <FormEditDescription idAccount={idAccount} />
                <FormResetPasswordAccount idAccount={idAccount} />
                <Button name="Delete" className="flex items-center justify-start gap-2 px-4 py-2 text-white bg-transparent hover:bg-red-700 transition-all duration-500 w-full rounded-none"
                    onClick={() => {
                        Swal.fire({
                            title: "Do you want to Delete This Account?",
                            showCancelButton: true,
                            input: 'password',
                            inputPlaceholder: 'Account Password',
                            confirmButtonText: "Delete",
                            customClass: {
                                container:
                                    "bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl",
                                popup: "bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl",
                                title: "text-white",
                                confirmButton: "bg-red-500 hover:bg-red-800 transition-all",
                                cancelButton: "bg-gray-500 hover:bg-gray-600 transition-all",
                                input: 'focus:shadow-none focus:outline-none rounded-xl focus:border-white border-white border-opacity-60 text-white'
                            },
                        }).then((result) => {
                            if (result.isConfirmed) {
                                handleDeleteTransaction(idAccount, result.value);
                            }
                        });
                    }}
                >
                    Delete
                </Button>
            </PopoverContent>
        </Popover>
    )
}
