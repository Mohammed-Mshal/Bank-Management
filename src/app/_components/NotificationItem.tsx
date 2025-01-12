"use client";
import React from "react";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
export default function NotificationItem({
  id,
  totalList,
  indexItem,
  titleMessage,
  textMessage,
  createdAt,
  funControlCurrentPage,
}: {
  id: string;
  totalList: number;
  indexItem: number;
  titleMessage: string;
  textMessage: string;
  createdAt: Date;
  funControlCurrentPage:()=>void;
}) {
  const handleDeleteNotification = async (id: string) => {
    try {
      const res = await fetch(`/api/notifications/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const json = await res.json();
      if (!res.ok) {
        Swal.fire({
          icon: "error",
          text: json.message as string,
          customClass: {
            container: "bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl",
            popup: "bg-[#1A1A1A] rounded-2xl",
            confirmButton: "bg-indigo-800",
          },
        });
        return;
      }
      Swal.fire({
        icon: "success",
        text: json.message as string,
        customClass: {
          container: "bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl",
          popup: "bg-[#1A1A1A] rounded-2xl",
          confirmButton: "bg-indigo-800",
        },
      });
      funControlCurrentPage();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      Swal.fire({
        icon: "error",
        text: error.message as string,
        customClass: {
          container: "bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl",
          popup: "bg-[#1A1A1A] rounded-2xl",
          confirmButton: "bg-indigo-800",
        },
      });
    }
  };
  return (
    <div
      key={id}
      className={`${
        totalList - 1 !== indexItem && "border-b border-gray-500"
      } py-2 w-full`}
    >
      <div className="flex flex-col max-w-full px-3 group transition-all relative">
        <div className="flex items-center justify-between">
          <span className="text-indigo-300 text-lg group-hover:text-indigo-500 transition-all">
            {titleMessage}
          </span>
          <button
            type="button"
            className="text-red-600 text-xl cursor-pointer lg:opacity-0 group-hover:opacity-100 transition-all"
            title="Remove Notification"
            onClick={() => {
              Swal.fire({
                title: "Do you want to save the changes?",
                showCancelButton: true,
                confirmButtonText: "Delete",
                customClass: {
                  container:
                    "bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl",
                  popup: "bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl",
                  title: "text-white",
                  confirmButton: "bg-red-500 hover:bg-red-800 transition-all",
                  cancelButton: "bg-gray-500 hover:bg-gray-600 transition-all",
                },
              }).then((result) => {
                if (result.isConfirmed) {
                  handleDeleteNotification(id);
                }
              });
            }}
          >
            <MdDelete />
          </button>
        </div>
        <span className="text-white text-opacity-70">{textMessage}</span>
        <span className="text-sm text-end text-white text-opacity-40">
          {new Date(createdAt).toUTCString()}
        </span>
      </div>
    </div>
  );
}
