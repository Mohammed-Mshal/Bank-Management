"use client";
import TitleSection from "@/app/_Elements/TitleSection";
import checkEnvironment from "@/app/libs/checkEnvironment";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Loading from "../loading";
import { useCustomerInfo } from "@/app/hooks/useCustomerInfo";
import FormSettings from "@/app/_components/FormSettings";

export default function Setting() {
  // const { error, getInfoCustomer, isLoading, userInfo } = useCustomerInfo();
  // useEffect(() => {
  //   getInfoCustomer();
  // }, []);
  return (
    <div className="flex-1 py-4">
      <div className="headerAccounts flex justify-between items-center">
        <TitleSection markerWord={"Customer"} normalWord="Settings" />
      </div>
      {/* {isLoading ? (
        <Loading />
      ) : error ? (
        <h2 className="text-center text-3xl text-red-500">{error}</h2>
      ) : (
        <FormSettings customerInfo={userInfo}/>
      )} */}
      <FormSettings />
    </div>
  );
}
