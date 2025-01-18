import React from "react";
import "./Profile.css";
import { getDataUser } from "@/action/info";
import { CiSettings } from "react-icons/ci";
import { SlArrowDown } from "react-icons/sl";
import Link from "next/link";
import { deleteSession } from "@/app/libs/session";
import { LiaSignOutAltSolid } from "react-icons/lia";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import { CgProfile } from "react-icons/cg";
export default async function Profile() {
  const dataUser = await getDataUser();

  return (
    <div className="relative">
      <Popover>
        <PopoverTrigger className="flex items-center md:gap-2 gap-1">
          <Image
            src={dataUser?.image || "/static/images/profileImage2.jpg"}
            height={40}
            width={40}
            alt="Profile"
            className="rounded-full h-8 w-8 md:h-10 md:w-10 object-cover"
          />
          <SlArrowDown className="text-white text-sm" />
        </PopoverTrigger>
        <PopoverContent className="p-0 rounded-xl overflow-hidden" align="end">
          <div className="text-center px-4 py-2">{dataUser?.email}</div>
          <div>
            <Link
              href={"/dashboard/profile"}
              className="flex items-center gap-2 px-4 py-2 text-white hover:bg-indigo-700 transition-all duration-500"
            >
              <CgProfile />
              Profile
            </Link>
          </div>
          <div>
            <Link
              href={"/dashboard/setting"}
              className="flex items-center gap-2 px-4 py-2 text-white hover:bg-indigo-700 transition-all duration-500"
            >
              <CiSettings />
              Setting
            </Link>
          </div>
          <div>
            <form
              action={async () => {
                "use server";
                await deleteSession();
              }}
              className="w-full"
            >
              <button
              name="Sign Out"
                type="submit"
                className="flex items-center gap-2 px-4 py-2 text-white hover:bg-red-600  w-full transition-all duration-500"
              >
                <LiaSignOutAltSolid />
                Sign Out
              </button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
