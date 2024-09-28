import React from "react";
import { RiNotificationFill } from "react-icons/ri";



export default function Notification() {
  return (
    <div>
      <RiNotificationFill className="text-white text-lg bg-white bg-opacity-20 backdrop-blur-lg rounded-full w-10 h-10 p-3 cursor-pointer" />
      <ul className="listNotification">

      </ul>
    </div>
  );
}
