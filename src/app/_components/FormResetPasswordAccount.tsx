"use client";
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import toast from "react-hot-toast";
import { useResetPasswordAccount } from "../hooks/useResetPasswordAccount";

export default function FormResetPasswordAccount({ idAccount }: { idAccount: string }) {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const { isLoading, error, resetPassword } = useResetPasswordAccount();
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger className="flex items-center gap-2 px-4 py-2 text-white hover:bg-indigo-700 transition-all duration-500 w-full">
                Reset Password
            </DialogTrigger>
            <DialogContent className="max-w-[400px] w-[calc(100vw-40px)] rounded-xl">
                <DialogDescription />
                <DialogHeader>
                    <DialogTitle className="text-center">Reset Password Account</DialogTitle>
                </DialogHeader>
                <form
                    className="flex flex-col items-start gap-5 mt-2"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (oldPassword.length === 0 || newPassword.length === 0 || confirmPassword.length === 0) {
                            toast.error('Please Fill All Field', {
                                position: 'top-center',
                            })
                            return
                        }
                        if (typeof newPassword !== 'string' || typeof confirmPassword !== 'string' || newPassword !== confirmPassword) {
                            toast.error('New Password Not the same Confirm Password', {
                                position: 'top-center',
                            })
                            return
                        }
                        await resetPassword(idAccount, oldPassword, newPassword);
                        if (!isLoading && !error) {
                            setOpenDialog(false)
                        }

                    }}
                >
                    <div className="containerOldPassword w-full flex flex-col">
                        <label htmlFor="oldPassword" className="mb-2 w-fit">
                            Old Password
                        </label>
                        <input
                            type="password"
                            name="oldPassword"
                            id="oldPassword"
                            onChange={(e) => setOldPassword(e.currentTarget.value)}
                            className="py-1 px-4 rounded-lg border bg-transparent w-full outline-none"
                        />
                    </div>
                    <div className="containerNewPassword w-full flex flex-col">
                        <label htmlFor="newPassword" className="mb-2 w-fit">
                            New Password
                        </label>
                        <input
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            onChange={(e) => setNewPassword(e.currentTarget.value)}
                            className="py-1 px-4 rounded-lg border bg-transparent w-full outline-none"
                        />
                    </div>
                    <div className="containerConfirmPassword w-full flex flex-col">
                        <label htmlFor="confirmPassword" className="mb-2 w-fit">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            id="confirmPassword"
                            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
                            className="py-1 px-4 rounded-lg border bg-transparent w-full outline-none"
                        />
                    </div>
                    {error && <p className="text-red-500 text-center w-full">{error}</p>}
                    <button
                    name="Reset"
                        disabled={isLoading}
                        type="submit"
                        className={` ${isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-800 hover:shadow-indigo-600"
                            } w-full py-2 text-center rounded-xl  hover:shadow-md transition-all`}
                    >
                        {isLoading ? "Loading..." : "Reset"}
                    </button>
                </form>{" "}
            </DialogContent>
        </Dialog>
    );
}
