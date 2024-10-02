"use client";
import React, { useEffect, useState } from "react";
import { CgClose } from "react-icons/cg";
import { CiMenuFries } from "react-icons/ci";

export default function ToggleMenu() {
  const [toggleMenu, setToggleMenu] = useState(false);
  useEffect(() => {
    document?.querySelector(".main_content")?.addEventListener("click", () => {
      !toggleMenu && setToggleMenu(true);
    });
  });
  return (
    <div
      className={`toggle_aside  ${
        toggleMenu
          ? "lg:flex-1 lg:flex lg:justify-center flex-none"
          : "flex-initial menuOpen"
      }`}
    >
      <button
        onClick={() => {
          setToggleMenu(!toggleMenu);
        }}
        className="btn_toggle text-xl flex items-center outline-none"
        title="toggle"
      >
        {!toggleMenu ? <CgClose /> : <CiMenuFries />}
      </button>
    </div>
  );
}
