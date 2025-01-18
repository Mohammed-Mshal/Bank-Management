import React from "react";
import TitlePage from "../_Elements/TitlePage";
import Notification from "./Notification/Notification";
import Profile from "./ProfileMenu/Profile";
import ToggleMenu from "../_Elements/ToggleMenu";
export default async function SecondNavbar() {
  return (
    <div className=" px-3 py-4 border-b-2 border-white border-opacity-20 ">
      <div className="navbar_dashboard flex justify-between items-center">
        <TitlePage />
        <div className="flex items-center gap-2">
          <Notification />
          <Profile />
          <div className="flex items-center cursor-pointer lg:hidden text-white justify-stretch">
            <ToggleMenu />
          </div>
        </div>
      </div>
    </div>
  );
}
