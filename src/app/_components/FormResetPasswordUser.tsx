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
import { useResetPasswordUser } from "../hooks/useResetPasswordUser";
import toast from "react-hot-toast";

export default function FormResetPassword() {
    const [oldPassword, setOldPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const { isLoading, error, resetPassword} = useResetPasswordUser();
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger className="rounded-lg bg-black hover:bg-opacity-40 transition-all cursor-pointer px-4 lg:py-4 py-2 col-span-2 sm:col-span-1 text-white text-md ">
                Reset Password
            </DialogTrigger>
            <DialogContent className="max-w-[400px] w-[calc(100vw-40px)] rounded-xl">
                <DialogDescription />
                <DialogHeader>
                    <DialogTitle className="text-center">Reset Password</DialogTitle>
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
                        await resetPassword(oldPassword, newPassword);
                        if (!isLoading&&!error) {
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
