"use client";
import React, { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { CiMenuFries } from "react-icons/ci";
import { useStore } from "@/app/hooks/useStore";

export default function ToggleMenu() {
  const { asideStatusCollapse, unCollapseAside, collapseAside } = useStore()
  useEffect(() => {
    document?.querySelector(".main_content")?.addEventListener("click", () => {
      !asideStatusCollapse && collapseAside();
    })
  });
  return (
    <div
      className={`toggle_aside  ${asideStatusCollapse
        ? "lg:flex-1 lg:flex lg:justify-center flex-none"
        : "flex-initial menuOpen"
        }`}
    >
      <button
        name="Toggle Aside"
        onClick={() => {
          asideStatusCollapse ? unCollapseAside() : collapseAside();
        }}
        className="btn_toggle text-xl flex items-center outline-none"
        title="toggle"
      >
        {!asideStatusCollapse ? <CgClose /> : <CiMenuFries />}
      </button>
    </div>
  );
}
