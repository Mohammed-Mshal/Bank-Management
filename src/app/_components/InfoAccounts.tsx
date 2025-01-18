"use client";
import React, { useEffect } from "react";
import CardInfoAccount from "../_Elements/CardInfoAccount";
import FormCreateAccount from "./FormCreateAccount";
import "swiper/css";
import { useAccount } from "../hooks/useAccount";
import Link from "next/link";
import LoadingData from "./loadingData";
import { useStore } from "../hooks/useStore";

export default function InfoAccounts() {
  const { error, getAccounts, loading } = useAccount();

  const { accounts } = useStore()
  useEffect(() => {
    getAccounts(3);
  }, []);
  return (
    <div className="max-h-full">
      <div className="flex justify-between pb-4 items-center">
        <h2 className="md:text-2xl text-xl">Overview Accounts</h2>
        <div className="flex items-center gap-4">
          <Link
            href={"/dashboard/accounts"}
            className="font-bold lg:text-xl text-lg hover:text-indigo-600 transition-all"
          >
            See All Accounts
          </Link>
          <FormCreateAccount />
        </div>
      </div>
      {loading || accounts?.length === 0 ? (
        <LoadingData />
      ) : accounts && accounts?.length > 0 ? (
        <div className="flex flex-wrap justify-center w-full max-h-full gap-y-6 gap-x-4 mb-4">
          {accounts?.map((info) => {
            return (
              <CardInfoAccount
                key={info.id}
                typeValue={"SY"}
                idAccount={info.id}
                balanceAccount={info.balance}
                typeAccount={info.accountType}
                accountStatus={info.accountStatus}
              />
            );
          })}
        </div>
      ) : (
        <h4 className="text-center text-opacity-80  mb-6">
          You Don&apos;t Have Account yet
        </h4>
      )}
      {error && (
        <p className="text-center text-red-500 font-bold text-xl">{error}</p>
      )}
    </div>
  );
}
