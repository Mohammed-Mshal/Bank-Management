"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiNotificationFill } from "react-icons/ri";
const listNotification: {
  id: string;
  contentNotification: string;
  titleNotification: string;
  dateNotification: string;
}[] = [
  {
    id: "1",
    titleNotification: "New Notification",
    contentNotification:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas officia suscipit harum reiciendis omnis. Iste error fugiat suscipit accusantium at placeat, sit similique nulla exercitationem fuga! Vero aut eos dolorem.",
    dateNotification: "17Mar, 10:45AM",
  },
  {
    id: "2",
    titleNotification: "New Notification",
    contentNotification:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas officia suscipit harum reiciendis omnis. Iste error fugiat suscipit accusantium at placeat, sit similique nulla exercitationem fuga! Vero aut eos dolorem.",
    dateNotification: "17Mar, 10:45AM",
  },
];
export default function Notification() {
  const [openNotification, setOpenNotification] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    document.addEventListener("click", (e: MouseEvent | any) => {
      !e.target?.parentNode?.classList.contains("containerNotification") &&
        !e.target?.parentElement?.classList?.contains("listNotification") &&
        !e.target?.parentElement?.classList?.contains("btnNotification") &&
        !e.target?.classList?.contains("listNotification") &&
        setOpenNotification(false);
    });
  });
  return (
    <div className="relative containerNotification">
      <RiNotificationFill
        onClick={() => {
          setOpenNotification(!openNotification);
        }}
        className="text-white -z-10 btnNotification text-lg bg-white bg-opacity-20 backdrop-blur-lg rounded-full md:w-10 w-8  md:h-10 h-8  md:p-3 p-2 cursor-pointer "
      />
      <ul
        className={`${
          openNotification ? "min-h-24 opacity-100 py-4" : "h-0 opacity-0  py-0"
        } w-screen max-w-xs overflow-hidden listNotification absolute md:right-0 -right-16 top-[calc(100%+10px)] bg-white bg-opacity-20 backdrop-blur-xl rounded-xl transition-all flex flex-col`}
      >
        {listNotification?.length > 0 ? (
          listNotification.map((notification, index) => {
            return (
              <li
                key={notification.id}
                className={`${
                  listNotification?.length - 1 !== index &&
                  "border-b border-gray-500"
                } py-2 `}
              >
                <Link
                  href={"#"}
                  className="flex flex-col max-w-full px-3 group transition-all cursor-pointer"
                >
                  <h4 className="text-indigo-300 text-lg group-hover:text-indigo-500 transition-all">
                    {notification.titleNotification}
                  </h4>
                  <p className="line-clamp-1 text-white text-opacity-70">
                    {notification.contentNotification}
                  </p>
                  <span className="text-sm text-end text-white text-opacity-40">
                    {notification.dateNotification}
                  </span>
                </Link>
              </li>
            );
          })
        ) : (
          <li className="flex-1 flex items-center justify-center">
            <h2 className="text-md text-white text-opacity-70">
              There are no Notification Yet
            </h2>
          </li>
        )}
        {listNotification?.length > 0 && (
          <li className="">
            <Link
              href={"/notification"}
              className="text-center text-white text-opacity-60 hover:text-opacity-100 flex flex-col max-w-full px-3 group transition-all cursor-pointer"
            >
              See All Notification
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
}
