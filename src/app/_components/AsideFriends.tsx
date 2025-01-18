"use client";
import React, { useEffect } from "react";
import TitleSection from "../_Elements/TitleSection";
import Image from "next/image";
import Link from "next/link";
import { ScrollArea } from "@/components/ui/scroll-area";
import LoadingData from "./loadingData";
import FormSendMoney from "./FormSendMoney";
import { useFavoriteAccounts } from "../hooks/useFavoriteAccounts";

export default function AsideFriends() {
  const { error, favoriteAccounts, getFavoriteAccount, isLoading } = useFavoriteAccounts()
  useEffect(() => {
    getFavoriteAccount();
  }, []);
  return (
    <ScrollArea className="aside-friends hidden xl:block flex-auto max-h-[400px] w-full max-w-sm bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl sticky top-10 overflow-y-auto">
      <div className="headerFriends sticky top-0 bg-[#1A1A1A] px-4 py-4">
        <TitleSection normalWord="Favorite Accounts" />
      </div>
      {isLoading ? (
        <LoadingData />
      ) : favoriteAccounts?.length > 0 ? (
        <ul className="listFriends px-4 pb-4 flex flex-col gap-4">
          {favoriteAccounts.map((account) => {
            return (
              <li key={account?.id} className="flex gap-2 items-center">
                <div className="containerImage">
                  <Image
                    src={account?.imageProfile}
                    alt="User"
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                </div>
                <div className="containerInfo flex-1 flex flex-col gap-2">
                  <h4 className="uppercase">
                    {account?.firstName} {account?.lastName}
                  </h4>
                  <div className="containerBTN flex gap-2">
                    <Link
                      href={`/customers/${account?.customerId}`}
                      className="bg-indigo-600 hover:bg-indigo-900 transition-all py-1 flex-1 flex justify-center items-center rounded-lg"
                    >
                      View Profile
                    </Link>
                    <FormSendMoney idReceiverAccount={account.idAccount} />
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      ) : error ? <h5 className="px-4 text-center text-gray-400">{error}</h5> : (
        <h5 className="px-4 text-center text-gray-400">
          You Don`t Have Any Favorite Account
        </h5>
      )}
    </ScrollArea>
  );
}
