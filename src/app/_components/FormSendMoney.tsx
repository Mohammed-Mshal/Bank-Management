"use client";
import React, { useEffect, useState } from "react";

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
import { useSendMoney } from "../hooks/useSendMoeny";

export default function FormSendMoney({
  idReceiverAccount,
}: {
  idReceiverAccount: string;
}) {
  const [accountPassword, setAccountPassword] = useState<null | string>(null);
  const [totalMoney, setTotalMoney] = useState<null | number>(null);
  const [descriptionTransfer, setDescriptionTransfer] = useState<string>("");
  const [idAccount, setIdAccount] = useState<null | string>(null);
  const { isLoading, sendMoney, successful } = useSendMoney();
  const { accounts, getAccounts } = useAccount();
  const [openDialog, setOpenDialog] = useState(false);
  useEffect(() => {
    getAccounts();
  }, []);
  useEffect(() => {
    setAccountPassword(null)
    setTotalMoney(null)
    setDescriptionTransfer('')
    setIdAccount(null)
  }, [openDialog]);
  useEffect(() => {
    if (successful) {
      setOpenDialog(false);
    }
  }, [successful]);
  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog} >
      <DialogTrigger className="cardInfo border border-indigo-600 hover:border-indigo-800 hover:bg-indigo-900 transition-all py-1 flex-1 flex justify-center items-center rounded-lg">
        Send Money
      </DialogTrigger>
      <DialogContent className="max-w-[400px] w-[calc(100vw-40px)] rounded-xl">
        <DialogDescription />
        <DialogHeader>
          <DialogTitle className="text-center">Send Money</DialogTitle>
        </DialogHeader>
        <form
          className="flex flex-col items-start gap-5 mt-2"
          onSubmit={async (e) => {
            e.preventDefault();
            await sendMoney(
              idAccount,
              idReceiverAccount,
              accountPassword,
              totalMoney,
              descriptionTransfer
            );
            await getAccounts()

          }}
        >
          <div className="containerSelect flex-1 w-full flex flex-col">
            <label htmlFor="account_type" className="mb-2 w-fit">
              Select Account
            </label>
            <Select
              name="selectAccountId"
              onValueChange={(value) => {
                setIdAccount(value);
              }}
            >
              <SelectTrigger className="w-full outline-none" id="account_type">
                <SelectValue placeholder="Select a Account" />
              </SelectTrigger>
              <SelectContent>
                {accounts &&
                  accounts.map((account) => {
                    return (
                      <SelectItem value={account.id} key={account.id}>
                        {account.id}
                      </SelectItem>
                    );
                  })}
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
          <div className="containerTotalMoney w-full flex flex-col">
            <label htmlFor="totalMoney" className="mb-2 w-fit">
              Total Money
            </label>
            <input
              type="number"
              name="totalMoney"
              id="totalMoney"
              onChange={(e) => setTotalMoney(e.currentTarget.valueAsNumber)}
              className="py-1 px-4 rounded-lg border bg-transparent w-full outline-none "
            />
          </div>
          <div className="containerDescription w-full flex flex-col">
            <label htmlFor="description" className="mb-2 w-fit">
              Description of Transfer
            </label>
            <textarea
              id="description"
              name="description"
              onChange={(e) => setDescriptionTransfer(e.currentTarget.value)}
              className="py-1 px-4 rounded-lg border bg-transparent w-full outline-none h-28 resize-none"
              maxLength={100}
            ></textarea>
          </div>
          <button
            disabled={isLoading}
            type="submit"
            className={` ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-indigo-800 hover:shadow-indigo-600"
            } w-full py-2 text-center rounded-xl  hover:shadow-md transition-all`}
          >
            {isLoading ? "Loading..." : "Send"}
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
