import React from "react";
import { deleteSession } from "../../libs/session";
import { LiaSignOutAltSolid } from "react-icons/lia";
import "./Aside.css";
import AsideItems from "../AsideItems";
export default function AsideDashboard() {
  return (
    <aside
      className={`lg:sticky fixed top-0 h-screen group px-2 py-4 flex transition-all duration-500 overflow-hidden`}
    >
      <div className="containerAside px-3 py-4 bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl flex-1 flex flex-col">
        <AsideItems />
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
