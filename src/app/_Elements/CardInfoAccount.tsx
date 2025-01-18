import React from "react";
import { AccountStatus } from "@prisma/client";
import AccountSetting from "../_components/AccountSetting";

type propsCardInfo = {
  typeValue: string;
  idAccount: string;
  typeAccount: string;
  balanceAccount: number;
  accountStatus: AccountStatus;
};
export default function CardInfoAccount({
  typeValue,
  idAccount,
  balanceAccount,
  typeAccount,
  accountStatus,
}: propsCardInfo) {
  return (
    <div
      className={`cardInfo 
        min-h-32
      transition-all ease-in-out duration-500 overflow-hidden
      bg-gradient-to-b before:bg-gradient-to-b
      from-gray-600 to-black relative before:absolute before:top-0 before:left-0 before:h-full
      before:w-full before:opacity-0 before:transition-all before:ease-in-out before:duration-500
      before:from-indigo-500 before:to-black hover:before:opacity-100 before:-z-10
      text-white backdrop-blur-lg rounded-2xl flex-1 max-w-[500px] min-w-[300px] 
      border-gray-800 border-2`}
    >
      <div
        className="flex flex-col lg:gap-6 gap-2 md:p-4 p-2"
      >
        <div className="headerCard flex justify-between items-center">
          <h5 className="xl:text-2xl lg:text-xl md:text-xl text-lg block">
            {typeAccount}
          </h5>
          <AccountSetting idAccount={idAccount} />
        </div>
        <div className="flex justify-between items-end">
          <div className="infoAccount">
            <div className="valueInfo flex items-center justify-between gap-4 my-2">
              <h2 className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-md text-sm">
                {typeValue}
                {balanceAccount.toLocaleString("en")}
              </h2>
            </div>
            <p className="block">ID:{idAccount}</p>
          </div>
          <span
            className={`${accountStatus === AccountStatus.BANDING
              ? "text-red-500"
              : accountStatus === AccountStatus.PENDING
                ? "text-yellow-500"
                : "text-green-600"
              }`}
          >
            {accountStatus}
          </span>
        </div>
      </div>
    </div>
  );
}
