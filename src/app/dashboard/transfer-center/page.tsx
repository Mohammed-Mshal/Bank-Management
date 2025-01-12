"use client";
import FormSendMoney from "@/app/_components/FormSendMoney";
import LoadingData from "@/app/_components/loadingData";
import { useFavoriteAccounts } from "@/app/hooks/useFavoriteAccounts";
import Image from "next/image";
import React, { Dispatch, SetStateAction, useState } from "react";
import toast from "react-hot-toast";

export default function TransferCenter() {
  const [accountDetails, setAccountDetails] = useState<null | {
    id: string;
    accountStatus: string;
    accountType: string;
    customerId: string;
    customerImage: string;
    firstName: string;
    lastName: string;
  }>(null);
  const [idAccount, setIdAccount] = useState("");
  const [isLoadingSearch, setIsLoadingSearch] = useState(false);
  const [errorSearching, setErrorSearching] = useState<null | string>(null);
  const [isLoadingFavorite, setIsLoadingFavorite] = useState(false);
  const { favoriteAccounts, getFavoriteAccount } = useFavoriteAccounts()
  const handleSearch = async () => {
    try {
      setErrorSearching(null);
      setIsLoadingSearch(true);
      if (!idAccount) {
        setIsLoadingSearch(false);
        setErrorSearching("Please Fill All Fields Required");
        return;
      }
      const res = await fetch(`/api/accounts/${idAccount}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorSearching(json.message);
        setIsLoadingSearch(false);
        return;
      }
      setAccountDetails(json.data.accountInfo);
      await getFavoriteAccount()
      setIsLoadingSearch(false);
      return;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoadingSearch(false);
      setErrorSearching(error.message);
    }
  };

  return (
    <div className=" mx-auto max-w-5xl bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl py-8 px-4 lg:px-8 my-6 shadow-[rgba(255,255,255,.1)] shadow-lg">
      <form action="" className="flex flex-col gap-4">
        <label htmlFor="idAccount" className="text-lg lg:text-xl">
          Enter Id To Search About Account
        </label>
        <div className="flex gap-4">
          <input
            type="text"
            id="idAccount"
            placeholder="Id Account"
            onChange={(e) => setIdAccount(e.target.value)}
            className="xl:text-2xl lg:text-xl text-lg outline-none px-4 flex-1 py-2"
          />
          <button
            type="button"
            onClick={async (e) => {
              e.preventDefault();
              await handleSearch();
            }}
            className="bg-indigo-600 hover:bg-indigo-800 transition-all cursor-pointer px-8 lg:py-4 py-2 rounded-lg col-span-2 sm:col-span-1"
          >
            Search
          </button>
        </div>
        {isLoadingSearch ? (
          <LoadingData />
        ) : errorSearching ? (
          <h2 className="text-center text-red-600 text-2xl font-bold">
            {errorSearching}
          </h2>
        ) : (
          accountDetails && (
            <div key={accountDetails?.id} className="flex gap-2">
              <div className="containerImage flex h-32 w-32 overflow-hidden rounded-full">
                <Image
                  src={accountDetails.customerImage}
                  alt="User"
                  width={128}
                  height={128}
                  className=" object-cover"
                />
              </div>
              <div className="containerInfo flex-1 flex flex-col justify-center  gap-4">
                <h4 className="uppercase text-2xl">
                  {accountDetails?.firstName} {accountDetails?.lastName}
                </h4>
                <div className="containerBTN flex gap-2">
                  {favoriteAccounts.find((e) => e.idAccount === accountDetails.id) ?
                    <ButtonRemoveToFavorite isLoadingFavorite={isLoadingFavorite} setIsLoadingFavorite={setIsLoadingFavorite} idFavoriteAccount={favoriteAccounts.find((e) => e.idAccount === accountDetails.id)?.customerId} />
                    : <ButtonAddToFavorite isLoadingFavorite={isLoadingFavorite} setIsLoadingFavorite={setIsLoadingFavorite} idFavoriteAccount={accountDetails.id} />}

                  <FormSendMoney idReceiverAccount={accountDetails.id} />
                </div>
              </div>
            </div>
          )
        )}
      </form>
    </div>
  );
}


const ButtonAddToFavorite = ({ idFavoriteAccount, isLoadingFavorite, setIsLoadingFavorite }: { idFavoriteAccount: string, isLoadingFavorite: boolean, setIsLoadingFavorite: Dispatch<SetStateAction<boolean>> }) => {
  const { getFavoriteAccount } = useFavoriteAccounts()
  const handleAddToFavorite = async (idFavoriteAccount: string) => {
    try {
      setIsLoadingFavorite(true)
      const res = await fetch('/api/accounts/favoriteAccounts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          idFavoriteAccount
        })
      })
      const data = await res.json()
      setIsLoadingFavorite(false)
      if (!res.ok) {
        toast.error(data.message)
        return;
      }
      await getFavoriteAccount()
      toast.success(data.message)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setIsLoadingFavorite(false)
      toast.error(error.message)
    }
  }
  return <button
    className={` ${isLoadingFavorite ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-800 border-indigo-600 hover:border-indigo-800'}  transition-all cursor-pointer  py-2 rounded-lg cardInfo border  flex-1 flex justify-center items-center`}
    disabled={isLoadingFavorite}
    onClick={() => {
      handleAddToFavorite(idFavoriteAccount)
    }}
  >
    Add To Favorite
  </button>
}
const ButtonRemoveToFavorite = ({ idFavoriteAccount, isLoadingFavorite, setIsLoadingFavorite }: { idFavoriteAccount: string | null | undefined, isLoadingFavorite: boolean, setIsLoadingFavorite: Dispatch<SetStateAction<boolean>> }) => {
  const { getFavoriteAccount } = useFavoriteAccounts()
  return <button
    className={` ${isLoadingFavorite ? 'bg-slate-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-800 border-indigo-600 hover:border-indigo-800'}  transition-all cursor-pointer  py-2 rounded-lg cardInfo border  flex-1 flex justify-center items-center`}
    disabled={isLoadingFavorite}
    onClick={async () => {
      try {
        setIsLoadingFavorite(true)
        if (!idFavoriteAccount || typeof idFavoriteAccount === 'undefined') {
          setIsLoadingFavorite(false)
          toast.error('Id Required')
        }
        const res = await fetch(`/api/accounts/favoriteAccounts/${idFavoriteAccount}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        const data = await res.json()
        setIsLoadingFavorite(false)
        if (!res.ok) {
          toast.error(data.message)
          return;
        }
        await getFavoriteAccount()
        toast.success(data.message)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        setIsLoadingFavorite(false)
        toast.error(error.message)
      }
    }}
  >
    Remove From Favorite
  </button>
}