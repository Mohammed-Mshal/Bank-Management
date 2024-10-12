import Link from "next/link";
import React from "react";
import { CgProfile } from "react-icons/cg";
import { CiSettings } from "react-icons/ci";
import { LiaSignOutAltSolid } from "react-icons/lia";
import { deleteSession } from "../libs/session";

export default function ProfileMenu() {
  return (
    <ul
      className={`listProfileMenu w-screen max-w-40 z-30 overflow-hidden listNotification absolute right-0 top-[calc(100%+10px)] bg-white bg-opacity-5 backdrop-blur-xl rounded-xl transition-all flex flex-col`}
    >
      <li>
        <Link
          href={"/profile"}
          className="flex items-center gap-2 px-4 py-2 text-white hover:bg-indigo-700 transition-all duration-500"
        >
          <CgProfile />
          Profile
        </Link>
      </li>
      <li>
        <Link
          href={"#"}
          className="flex items-center gap-2 px-4 py-2 text-white hover:bg-indigo-700 transition-all duration-500"
        >
          <CiSettings />
          Setting
        </Link>
      </li>
      <li>
        <form
          action={async () => {
            "use server";
            await deleteSession();
          }}
          className="w-full"
        >
          <button
            type="submit"
            className="flex items-center gap-2 px-4 py-2 text-white hover:bg-red-600  w-full transition-all duration-500"
          >
            <LiaSignOutAltSolid />
            Sign Out
          </button>
        </form>
      </li>
    </ul>
  );
}
