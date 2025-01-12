"use client";
import LoadingData from "@/app/_components/loadingData";
import NotificationItem from "@/app/_components/NotificationItem";
import { useNotification } from "@/app/hooks/useNotification";
import React, { useEffect, useState } from "react";

export default function Notifications() {
  const [currentPage, setCurrentPage] = useState(1);
  const funControlCurrentPage = () => {
    getNotification(10, 1);
  };
  const { isLoading, error, listNotification, getNotification, totalPages } =
    useNotification();
  useEffect(() => {

    getNotification(10, currentPage);
  }, [currentPage])
  return (
    <div className="wrapper-notifications mx-auto max-w-5xl bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl py-8 px-4 lg:px-8 my-6 shadow-[rgba(255,255,255,.1)] shadow-lg">
      <div className="container-notifications flex flex-col items-center gap-8">
        {listNotification.map((notification, index) => {
          return (
            <NotificationItem
              key={notification.id}
              id={notification.id}
              indexItem={index}
              textMessage={notification.textMessage}
              titleMessage={notification.titleMessage}
              totalList={listNotification.length}
              createdAt={notification.createdAt}
              funControlCurrentPage={funControlCurrentPage}
            />
          );
        })}
        {error && (
          <h2 className="text-center px-4 text-xl text-red-600">{error}</h2>
        )}
        {isLoading && <LoadingData />}
        <div className="flex gap-8">
          {currentPage - 1 > 0 && (
            <button
              className="flex items-center justify-center gap-2 bg-black bg-opacity-70  rounded-lg py-3 px-4 transition-all duration-500 hover:bg-black hover:bg-opacity-40 w-40"
              onClick={() => {
                setCurrentPage((pre) => pre - 1);
                getNotification(10, currentPage - 1);
              }}
            >
              Previews
            </button>
          )}
          {totalPages > currentPage && (
            <button
              className="flex items-center justify-center gap-2 bg-indigo-600  rounded-lg py-3 px-4 transition-all duration-500 hover:bg-indigo-800 w-40"
              onClick={() => {
                setCurrentPage((pre) => pre + 1);
                getNotification(10, currentPage + 1);
              }}
            >
              Next
            </button>
          )}

        </div>
      </div>
    </div>
  );
}
