"use client";
import FormCreateAccount from "@/app/_components/FormCreateAccount";
import React, { useEffect } from "react";
import TitleSection from "../_Elements/TitleSection";
import { useAccount } from "../hooks/useAccount";
import Loading from "../dashboard/loading";
import CardInfoAccount from "../_Elements/CardInfoAccount";
export default function AccountsList() {
  const { accounts, error, getAccounts, loading } = useAccount();
  useEffect(() => {
    getAccounts();
  }, []);
  return (
    <div className="flex-1 py-4">
      <div className="headerAccounts flex justify-between items-center">
        <TitleSection markerWord={"All"} normalWord="Accounts" />
        <div className="flex items-center gap-4">
          <FormCreateAccount />
        </div>
      </div>
      {loading ? (
        <Loading />
      ) : accounts && accounts?.length > 0 ? (
        <div className="flex flex-wrap justify-center w-full max-h-full gap-y-6 gap-x-4 my-4">
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
      ) : !error ? (
        <h4 className="text-center text-opacity-80  mb-6">
          You Don&apos;t Have Account yet
        </h4>
      ) : (
        <p className="text-center text-red-500 font-bold text-xl">{error}</p>
      )}
    </div>
  );
}
