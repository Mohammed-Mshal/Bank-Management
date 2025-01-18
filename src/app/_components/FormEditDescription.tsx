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
import { useEditDescription } from "../hooks/useEditDescription";

export default function FormEditDescription({ idAccount }: { idAccount: string }) {
    const [newDescription, setNewDescription] = useState('')
    const { isLoading, error, editDescription } = useEditDescription();
    const [openDialog, setOpenDialog] = useState(false);
    return (
        <Dialog open={openDialog} onOpenChange={setOpenDialog}>
            <DialogTrigger className="flex items-center gap-2 px-4 py-2 text-white hover:bg-indigo-700 transition-all duration-500 w-full">
                Edit Description
            </DialogTrigger>
            <DialogContent className="max-w-[400px] w-[calc(100vw-40px)] rounded-xl">
                <DialogDescription />
                <DialogHeader>
                    <DialogTitle className="text-center">Edit Description</DialogTitle>
                </DialogHeader>
                <form
                    className="flex flex-col items-start gap-5 mt-2"
                    onSubmit={async (e) => {
                        e.preventDefault();
                        if (newDescription.length === 0) {
                            toast.error('Please Fill All Field', {
                                position: 'top-center',
                            })
                            return
                        }
                        await editDescription(idAccount, newDescription);
                        if (!isLoading && !error) {
                            setOpenDialog(false)
                        }

                    }}
                >
                    <div className="containerConfirmPassword w-full flex flex-col">
                        <label htmlFor="description" className="mb-2 w-fit">
                            New Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            onChange={(e) => setNewDescription(e.currentTarget.value)}
                            className="py-1 px-4 rounded-lg border bg-transparent w-full outline-none h-28 resize-none"
                            maxLength={100}
                        ></textarea>
                    </div>
                    {error && <p className="text-red-500 text-center w-full">{error}</p>}
                    <button
                    name="Change"
                        disabled={isLoading}
                        type="submit"
                        className={` ${isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-indigo-800 hover:shadow-indigo-600"
                            } w-full py-2 text-center rounded-xl  hover:shadow-md transition-all`}
                    >
                        {isLoading ? "Loading..." : "Change"}
                    </button>
                </form>
            </DialogContent>
        </Dialog>
    );
}
