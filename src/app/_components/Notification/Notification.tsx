"use client";
import Link from "next/link";
import React from "react";
import { RiNotificationFill } from "react-icons/ri";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNotification } from "@/app/hooks/useNotification";
import LoadingData from "../loadingData";
export default function Notification() {
  const { isLoading, error, listNotification, getNotification } =
    useNotification();
  return (
    <Popover
      onOpenChange={async (isOpen) => {
        isOpen &&
          listNotification &&
          listNotification.length === 0 &&
          (await getNotification(3, 1, null, 'disc', null, null));
      }}
    >
      <PopoverTrigger name="Notifications">
        <RiNotificationFill className="text-white -z-10 btnNotification text-lg bg-white bg-opacity-5 backdrop-blur-lg rounded-full md:w-10 w-8  md:h-10 h-8  md:p-3 p-2 cursor-pointer " />
      </PopoverTrigger>
      <PopoverContent align="end" className="rounded-xl overflow-hidden">
        {isLoading ? (
          <LoadingData />
        ) : error ? (
          <h2 className="text-center px-4 text-xl text-red-600">{error}</h2>
        ) : listNotification?.length > 0 ? (
          listNotification.map((notification, index) => {
            return (
              <div
                key={notification.id}
                className={`${listNotification?.length - 1 !== index &&
                  "border-b border-gray-500"
                  } py-2 `}
              >
                <div className="flex flex-col max-w-full px-3 group transition-all cursor-pointer relative">
                  <span className="text-indigo-300 text-lg group-hover:text-indigo-500 transition-all">
                    {notification.titleMessage}
                  </span>
                  <span className="line-clamp-1 text-white text-opacity-70">
                    {notification.textMessage}
                  </span>
                  <span className="text-sm text-end text-white text-opacity-40">
                    {new Date(notification.createdAt).toUTCString()}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <h2 className="text-md text-white text-opacity-70">
              There are no Notification Yet
            </h2>
          </div>
        )}
        {isLoading
          ? null
          : listNotification?.length > 0 && (
            <div className="">
              <Link
                href={"/dashboard/notifications"}
                className="text-center text-white text-opacity-60 hover:text-opacity-100 flex flex-col max-w-full px-3 group transition-all cursor-pointer"
              >
                See All Notification
              </Link>
            </div>
          )}
      </PopoverContent>
    </Popover>
  );
}
