import Link from "next/link";
import React from "react";
import { RiNotificationFill } from "react-icons/ri";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
  return (
    <Popover>
      <PopoverTrigger>
        <RiNotificationFill className="text-white -z-10 btnNotification text-lg bg-white bg-opacity-5 backdrop-blur-lg rounded-full md:w-10 w-8  md:h-10 h-8  md:p-3 p-2 cursor-pointer " />
      </PopoverTrigger>
      <PopoverContent align="end" className="rounded-xl overflow-hidden">
        {listNotification?.length > 0 ? (
          listNotification.map((notification, index) => {
            return (
              <div
                key={notification.id}
                className={`${
                  listNotification?.length - 1 !== index &&
                  "border-b border-gray-500"
                } py-2 `}
              >
                <div className="flex flex-col max-w-full px-3 group transition-all cursor-pointer relative">
                  <Link href={"#"} className="absolute top-0 left-0 h-full w-full"></Link>
                  <span className="text-indigo-300 text-lg group-hover:text-indigo-500 transition-all">
                    {notification.titleNotification}
                  </span>
                  <span className="line-clamp-1 text-white text-opacity-70">
                    {notification.contentNotification}
                  </span>
                  <span className="text-sm text-end text-white text-opacity-40">
                    {notification.dateNotification}
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
        {listNotification?.length > 0 && (
          <div className="">
            <Link
              href={"/notification"}
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
