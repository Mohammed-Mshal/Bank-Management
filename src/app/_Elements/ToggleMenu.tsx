"use client";
import React, { useState } from "react";
import { CiMenuFries } from "react-icons/ci";

export default function ToggleMenu() {
  const [toggleMenu, setToggleMenu] = useState(false);

  return (
    <div
      className={`toggle_aside  ${
        toggleMenu ? "flex-1 flex justify-center" : "flex-initial menuOpen"
      }`}
    >
      <button
        onClick={() => {
          setToggleMenu(!toggleMenu);
        }}
        className="btn_toggle text-xl flex items-center outline-none"
        title="toggle"
      >
        <CiMenuFries />
      </button>
    </div>
  );
}
