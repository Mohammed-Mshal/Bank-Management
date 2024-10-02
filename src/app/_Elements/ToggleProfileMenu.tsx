"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { SlArrowDown } from "react-icons/sl";

export default function ToggleProfileMenu() {
  const [openProfileMenu, setOpenProfileMenu] = useState(false);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    document.addEventListener("click", (e: MouseEvent | any) => {
      !e.target?.parentNode?.classList?.contains("toggleProfileMenu") &&
      !e.target?.classList?.contains("toggleProfileMenu") &&
        setOpenProfileMenu(false);
    });
  });
  return (
    <div
      className={`toggleProfileMenu ${
        openProfileMenu ? "menuOpen" : ""
      } flex items-center md:gap-2 gap-1`}
      onClick={() => {
        setOpenProfileMenu(!openProfileMenu);
      }}
    >
      <Image
        src={"/static/images/profileImage2.jpg"}
        height={40}
        width={40}
        alt="Profile"
        className="rounded-full h-8 w-8 md:h-10 md:w-10 object-cover"
      />
      <SlArrowDown className="text-white text-sm" />
    </div>
  );
}
