"use client";
import React, { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useAccount } from "../hooks/useAccount";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsPlusCircle } from "react-icons/bs";

export default function FormCreateAccount() {
  const [accountType, setAccountType] = useState<null | string>(null);
  const [accountPassword, setAccountPassword] = useState<null | string>(null);
  const [accountDescription, setAccountDescription] = useState<null | string>(
    null
  );
  const { createAccount, error, loading,getAccounts } = useAccount();
  const [openDialog, setOpenDialog] = useState(false);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger className="cardInfo" name="Create Account">
        <BsPlusCircle className="hover:scale-110 hover:text-indigo-600 transition-all text-3xl" />
      </DialogTrigger>
      <DialogContent className="max-w-[400px] w-[calc(100vw-40px)] rounded-xl">
        <DialogDescription />
        <DialogHeader>
          <DialogTitle className="text-center">Create Account</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col items-start gap-5 mt-2"
          onSubmit={async (e) => {
            e.preventDefault();
            await createAccount(
              accountType,
              accountPassword,
              accountDescription
            );
            if (!error) {
              setOpenDialog(false);
              await getAccounts()
            }
          }}
        >
          <div className="containerSelect flex-1 w-full flex flex-col">
            <label htmlFor="account_type" className="mb-2 w-fit">
              Account Type
            </label>
            <Select
              name="accountType"
              onValueChange={(value) => {
                setAccountType(value);
              }}
            >
              <SelectTrigger className="w-full outline-none" id="account_type">
                <SelectValue placeholder="Select a Account Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SAVING">Saving Account</SelectItem>
                <SelectItem value="CHECKING">Checking Account</SelectItem>
                <SelectGroup></SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="containerPassword w-full flex flex-col">
            <label htmlFor="password" className="mb-2 w-fit">
              Password Of Transaction
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onChange={(e) => setAccountPassword(e.currentTarget.value)}
              className="py-1 px-4 rounded-lg border bg-transparent w-full outline-none"
            />
          </div>
          <div className="containerDescription w-full flex flex-col">
            <label htmlFor="description" className="mb-2 w-fit">
              Description of Using Account
            </label>
            <textarea
              id="description"
              name="description"
              onChange={(e) => setAccountDescription(e.currentTarget.value)}
              className="py-1 px-4 rounded-lg border bg-transparent w-full outline-none h-28 resize-none"
              maxLength={100}
            ></textarea>
          </div>
          {error && <p className="text-red-500 text-center w-full">{error}</p>}
          <button
          name="Create Account"
            disabled={loading}
            type="submit"
            className={` ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-800 hover:shadow-indigo-600"
            } w-full py-2 text-center rounded-xl  hover:shadow-md transition-all`}
          >
            {loading ? "Creating..." : "Create Account"}
          </button>
        </form>{" "}
      </DialogContent>
    </Dialog>
  );
}
