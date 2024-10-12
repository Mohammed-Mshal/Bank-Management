"use client";
import React from "react";
import { RiArrowUpSFill, RiArrowDownSFill } from "react-icons/ri";
import Link from "next/link";
import { usePathname } from "next/navigation";
type propsCardInfo = {
  iconCard: JSX.Element;
  titleInfo: string;
  valueInfo: number;
  typeValue: string;
  preValue: number;
  link: string;
};
export default function CardInfoAccount({
  iconCard,
  titleInfo,
  valueInfo,
  typeValue,
  preValue,
  link,
}: propsCardInfo) {
  const currentPath = usePathname();
  return (
    <li
      className={`cardInfo 
      ${
        currentPath === link ||
        (currentPath === "/dashboard" &&
          titleInfo === "income" &&
          "before:opacity-100")
      }
      transition-all ease-in-out duration-500 overflow-hidden
      bg-gradient-to-b before:bg-gradient-to-b
      from-gray-600 to-black relative before:absolute before:top-0 before:left-0 before:h-full
      before:w-full before:opacity-0 before:transition-all before:ease-in-out before:duration-500
      before:from-indigo-500 before:to-black hover:before:opacity-100 before:-z-10
      text-white backdrop-blur-lg rounded-2xl 2xl:w-[calc(100%/4-20px)]
      xl:w-[calc(100%/3-20px)] w-[calc(100%/2-20px)] flex-auto 
      border-gray-800 border-2  `}
    >
      <Link href={link} className="flex flex-col lg:gap-6 gap-2 md:p-4 p-2">
        <div className="headerCard flex justify-between items-center text-2xl">
          <h5 className="xl:text-2xl lg:text-xl md:text-xl text-lg hidden sm:block">Total {titleInfo}</h5>
          <div className="containerIcon bg-white bg-opacity-5 p-2 rounded-full">
            {iconCard}
          </div>
        </div>
        <div className="infoAccount">
          <div className="valueInfo flex items-center justify-between gap-4 my-2">
            <h2 className="xl:text-4xl lg:text-3xl md:text-2xl sm:text-md text-sm">
              {typeValue}
              {valueInfo.toLocaleString("en")}
            </h2>
            <h4
              className={`${
                (valueInfo - preValue) / (preValue / 100) > 0
                  ? "text-green-500"
                  : "text-red-500"
              } flex items-center gap-1 lg:text-xl md:text-lg text-xs`}
            >
              %{((valueInfo - preValue) / (preValue / 100)).toFixed(3)}
              {(valueInfo - preValue) / (preValue / 100) > 0 ? (
                <RiArrowUpSFill className="text-xl" />
              ) : (
                <RiArrowDownSFill className="text-xl" />
              )}
            </h4>
          </div>
          <p className="hidden lg:block">Compared To Last Month</p>
        </div>
      </Link>
    </li>
  );
}
