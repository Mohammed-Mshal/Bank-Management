import React from "react";
import { BiSearch } from "react-icons/bi";
import { RiNotificationFill } from "react-icons/ri";
import TitlePage from "../_Elements/TitlePage";

export default function HeaderDashboard() {
  return (
    <div className=" px-3 py-4 ">
      <div className="navbar_dashboard flex justify-between items-center">
        <TitlePage />
        <div className="flex items-center gap-2">
          <form
            action=""
            className="relative bg-white bg-opacity-20 backdrop-blur-lg rounded-lg outline-none text-white px-4 py-2 flex items-center gap-2"
          >
            <label htmlFor="search" className="cursor-pointer">
              <BiSearch />
            </label>
            <input
              title="search"
              type="search"
              name="Search"
              placeholder="Type Searching"
              id="search"
              className="outline-none bg-transparent"
            />
          </form>
          <RiNotificationFill className="text-white text-lg bg-white bg-opacity-20 backdrop-blur-lg rounded-full w-10 h-10 p-3 cursor-pointer" />
        </div>
      </div>
    </div>
  );
}
