import React from "react";
import ToggleMenu from "../../_Elements/ToggleMenu";
import ListOfItem from "../../_Elements/ListOfItem";
import { deleteSession } from "../../libs/session";
import { LiaSignOutAltSolid } from "react-icons/lia";
import "./Aside.css";
import SearchInput from "@/app/_Elements/SearchInput";
export default function AsideDashboard() {
  return (
    <aside
      className={`lg:sticky fixed top-0 h-screen group px-2 py-4 flex transition-all duration-500 overflow-hidden`}
    >
      <div className="containerAside px-3 py-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl flex-1 flex flex-col">
        <div
          className={`headerAside flex items-center justify-between text-white text-opacity-85`}
        >
          <h2
            className={`title_site text-3xl transition-all duration-500 text-nowrap overflow-hidden`}
          >
            Golden Bank
          </h2>
          <ToggleMenu />
        </div>
        <div className="mt-8 block lg:hidden">
          <SearchInput  id={'SearchAside'}/>
        </div>
        <ListOfItem />
        <form
          action={async () => {
            "use server";
            await deleteSession();
          }}
          className={` text-xl text-white rounded-xl transition-all duration-500 hover:bg-red-800 w-full mt-auto`}
        >
          <button className="flex items-center gap-2 w-full py-3 px-4">
            <LiaSignOutAltSolid className="iconItem" />
            <span className="transition-all duration-500 text-nowrap overflow-hidden titleLink">
              Sign out
            </span>
          </button>
        </form>
      </div>
    </aside>
  );
}
