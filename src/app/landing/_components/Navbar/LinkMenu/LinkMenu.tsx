"use client";
import Link from "next/link";
import React from "react";
import { IoIosClose } from "react-icons/io";

const linksNavbar = [
  {
    anchorLink: "/landing/#services",
    textLink: "Services",
  },
  {
    anchorLink: "/landing/#services",
    textLink: "Features",
  },
  {
    anchorLink: "/landing/#services",
    textLink: "Contact Us",
  },
];
function LinkMenu({
  isMenuOpen,
  toggleMenu,
}: {
  isMenuOpen: boolean;
  toggleMenu: () => void;
}) {
  return (
    <div className="navLink">
      <div className={`containerLinks ${isMenuOpen && "show"}`}>
        <IoIosClose
          className="absolute top-4 left-4 flex md:hidden text-3xl cursor-pointer"
          onClick={() => toggleMenu()}
        />
        <ul className="links flex gap-12">
          {linksNavbar.map((link, index) => {
            return (
              <li key={index}>
                <Link href={link.anchorLink}>{link.textLink}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default LinkMenu;
